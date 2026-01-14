import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import products from '../data/products.json';
import cultures from '../data/cultures.json';

// Initialize Gemini AI lazily
let genAI: GoogleGenerativeAI | null = null;

// System context about SHARP OFFICIAL
const systemContext = `Eres un asistente virtual para SHARP OFFICIAL, una plataforma digital dedicada a las subculturas: Reggae, Punk, Skinhead y Rock.

INFORMACIÓN DE LAS CULTURAS:

REGGAE:
- Origen: Jamaica, finales de los años 60
- Música: Ska, rocksteady, reggae. Fusión de R&B, jazz, música caribeña
- Cultura rastafari: Espiritualidad, paz, unidad, Haile Selassie I
- Temas: Injusticia social, resistencia, amor, libertad, igualdad
- Reconocimiento UNESCO como patrimonio cultural inmaterial

PUNK:
- Origen: EE.UU. y UK, mediados de los años 70
- Actitud: Rebelde, antisistema, DIY (hazlo tú mismo)
- Música: Cruda, directa, rápida. Ramones, The Stooges
- Valores: Libertad individual, rechazo a la autoridad, autenticidad
- Estética: Mohicanos, ropa rasgada, tachuelas

SKINHEAD:
- Origen: UK, finales de los 60, MULTICULTURAL (británicos + jamaicanos)
- Música: Ska, rocksteady, early reggae. Trojan Records
- Valores: Orgullo obrero, camaradería, "Spirit of '69"
- Estética: Dr. Martens, Ben Sherman, Fred Perry, cabello rapado
- IMPORTANTE: El movimiento original era apolítico y multicultural
- Divisiones: Tradicionales, SHARP (antirracistas), RASH (izquierda)

ROCK:
- Origen: EE.UU., años 50
- Música: Guitarra eléctrica, 4/4, The Beatles, Led Zeppelin, Rolling Stones
- Valores: Rebeldía, individualismo, crítica social
- Subgéneros: Psicodélico, hard rock, punk, heavy metal, progresivo
- Estética: Chaquetas de cuero, botas, logotipos de bandas

Tu trabajo es:
- Responder preguntas sobre estas culturas
- Ser amigable, informativo y preciso
- Usar un tono casual pero respetuoso
- Corregir malentendidos sobre estas subculturas
- Promover la plataforma SHARP OFFICIAL

Responde en español de forma concisa y clara.

INFORMACIÓN DE PRODUCTOS EN VENTA:
${products.map(p => `- ${p.name} (ID: ${p.id}): Precio $${p.price}, Estilo ${p.style}. Descripción: ${p.description}. LINK DE COMPRA: http://localhost:3000/shop/${p.id}`).join('\n')}

INFORMACIÓN DETALLADA DE CULTURAS:
${cultures.map(c => `
CULTURA: ${c.name.toUpperCase()}
Descripción: ${c.description}
Orígenes: ${c.characteristics.origins.join(' ')}
Temas: ${c.characteristics.themes.join(', ')}
Estilo Musical: ${c.characteristics.musicalStyle}
`).join('\n')}
`;

// @desc    Chat with AI
// @route   POST /api/chat
// @access  Public
export const chatWithAI = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                error: 'API key not configured',
                response: 'Lo siento, el servicio de chat no está configurado correctamente. Por favor, contacta al administrador.'
            });
        }

        // Initialize if not already done
        if (!genAI) {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        }

        // Get generative model - using gemini-flash-latest (alias for stable model)
        const model = genAI!.getGenerativeModel({ model: 'gemini-flash-latest' });

        // Create chat with context
        const chat = model.startChat({
            history: [
                {
                    role: 'user',
                    parts: [{ text: systemContext }],
                },
                {
                    role: 'model',
                    parts: [{ text: 'Entendido. Soy el asistente de SHARP OFFICIAL y estoy listo para ayudar con información sobre Reggae, Punk, Skinhead y Rock. ¿En qué puedo ayudarte?' }],
                },
            ],
        });

        // Send message and get response
        const result = await chat.sendMessage(message);
        const response = result.response.text();

        res.json({ response });
    } catch (error: any) {
        console.error('Error in chat:', error);
        res.status(500).json({
            error: 'Error processing message',
            details: error.message,
            response: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.'
        });
    }
};
