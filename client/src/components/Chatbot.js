import React, { useState, useRef, useEffect } from 'react';
import { BASE_URL } from '../config';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import chatBg from '../assets/images/chat-bg.jpg';

const Chatbot = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: '¡Hola! Soy el asistente de SHARP OFFICIAL. ¿En qué puedo ayudarte hoy? Puedo contarte sobre las culturas Reggae, Punk, Skinhead y Rock.'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            // Add AI response
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <div className="group relative">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-gradient-to-br from-secondary to-yellow-600 text-primary w-16 h-16 rounded-full shadow-2xl hover:shadow-secondary/50 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                        >
                            <MessageCircle size={28} className="animate-pulse" />
                        </button>

                        {/* Tooltip */}
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap border border-gray-700">
                                Habla con una IA
                                <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-6 right-6 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-700 overflow-hidden"
                    style={{
                        backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.95)), url(${chatBg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-secondary to-yellow-600 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-full">
                                <Bot size={24} className="text-secondary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-primary">SHARP AI</h3>
                                <p className="text-xs text-primary/80">Asistente Virtual</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-primary hover:bg-primary/20 p-2 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                        ? 'bg-gradient-to-br from-secondary to-yellow-600 text-primary'
                                        : 'bg-gray-800 text-white border border-gray-700'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                        {message.content.split(/(\[.*?\]\(https?:\/\/[^\s)]+\)|https?:\/\/[^\s]+)/g).map((part, i) => {
                                            let urlToParse = part;
                                            let displayText = part;

                                            // Check for Markdown link [text](url)
                                            const markdownMatch = part.match(/^\[(.*?)\]\((https?:\/\/[^\s)]+)\)$/);
                                            if (markdownMatch) {
                                                displayText = markdownMatch[1];
                                                urlToParse = markdownMatch[2];
                                            } else if (part.match(/^https?:\/\//)) {
                                                // Clean trailing punctuation and backticks for plain URLs
                                                urlToParse = part.replace(/[.,:;?!`'"()]+$/, '');
                                                displayText = urlToParse;
                                            } else {
                                                return part;
                                            }

                                            try {
                                                const urlUrl = new URL(urlToParse);
                                                // Check if it's an internal link
                                                const isInternal = urlToParse.includes('localhost:3000') || urlUrl.origin === window.location.origin;

                                                if (isInternal) {
                                                    const path = urlUrl.pathname + urlUrl.search + urlUrl.hash;
                                                    return (
                                                        <React.Fragment key={i}>
                                                            <button
                                                                onClick={() => {
                                                                    console.log('Chatbot navigating to:', path);
                                                                    navigate(path);
                                                                }}
                                                                className="text-secondary hover:underline break-all font-semibold text-left inline"
                                                            >
                                                                {displayText}
                                                            </button>
                                                        </React.Fragment>
                                                    );
                                                }

                                                return (
                                                    <React.Fragment key={i}>
                                                        <a href={urlToParse} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline break-all font-semibold">
                                                            {displayText}
                                                        </a>
                                                    </React.Fragment>
                                                );
                                            } catch (e) {
                                                console.warn('Failed to parse URL:', urlToParse);
                                                return part;
                                            }
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-800 rounded-2xl px-4 py-3 border border-gray-700">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 bg-gray-800 border-t border-gray-700">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 bg-gray-900 text-white px-4 py-3 rounded-xl border border-gray-700 focus:border-secondary focus:outline-none"
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="bg-gradient-to-br from-secondary to-yellow-600 text-primary px-4 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
