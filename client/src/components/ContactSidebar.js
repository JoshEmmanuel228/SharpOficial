import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Phone, Mail, ChevronLeft, Smartphone } from 'lucide-react';

const ContactSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(0);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarWidth(sidebarRef.current.offsetWidth);
        }
        // Optional: Update on resize
        const handleResize = () => {
            if (sidebarRef.current) {
                setSidebarWidth(sidebarRef.current.offsetWidth);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="fixed bottom-0 z-50 flex items-end transition-all duration-500 ease-in-out"
            style={{
                left: isOpen ? '0px' : `-${sidebarWidth}px`,
                // Make sure it's visible initially if width is 0 (first render) to avoid jumping
                visibility: sidebarWidth === 0 ? 'hidden' : 'visible'
            }}
        >
            {/* Sidebar Content */}
            <div
                ref={sidebarRef}
                className={`
                    relative bg-black/20 backdrop-blur-xl border-t border-r border-cyan-500/30
                    rounded-tr-2xl p-6 flex flex-col items-center gap-6
                    shadow-[0_0_30px_rgba(6,182,212,0.2)]
                `}
                style={{
                    boxShadow: 'inset 0 0 20px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.2)'
                }}
            >
                {/* Holographic Header */}
                <div className="text-center mb-2 relative">
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-400 tracking-wider">
                        CONTACTANOS
                    </h3>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col gap-4 w-full">
                    {/* WhatsApp */}
                    <a
                        href="https://wa.me/5215616417138"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300"
                    >
                        <div className="p-2 rounded-full bg-green-500/20 group-hover:bg-green-500/40 transition-colors">
                            <MessageCircle size={20} className="text-green-400" />
                        </div>
                        <span className="text-green-100 font-medium group-hover:text-white group-hover:scale-105 transition-all">
                            WhatsApp
                        </span>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:5616417138"
                        className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300"
                    >
                        <div className="p-2 rounded-full bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-colors">
                            <Phone size={20} className="text-cyan-400" />
                        </div>
                        <span className="text-cyan-100 font-medium group-hover:text-white group-hover:scale-105 transition-all">
                            Llamada
                        </span>
                    </a>

                    {/* Email */}
                    <a
                        href="mailto:mexaion018@gmail.com"
                        className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
                    >
                        <div className="p-2 rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 transition-colors">
                            <Mail size={20} className="text-purple-400" />
                        </div>
                        <span className="text-purple-100 font-medium group-hover:text-white group-hover:scale-105 transition-all">
                            Correo
                        </span>
                    </a>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-3xl -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-3xl -z-10 pointer-events-none"></div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleSidebar}
                className={`
                    flex items-center justify-center
                    bg-black/40 backdrop-blur-md border border-cyan-500/50 
                    border-l-0 /* Remove left border to merge with sidebar */
                    text-cyan-400 p-2 rounded-tr-lg rounded-br-none hover:bg-cyan-900/40 
                    transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]
                    h-auto self-end mb-0
                `}
            >
                {isOpen ? <ChevronLeft size={24} /> : <Smartphone size={24} />}
            </button>
        </div>
    );
};

export default ContactSidebar;
