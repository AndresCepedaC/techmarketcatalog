// Vercel Serverless Function — POST /api/chat
// Proxies chat requests to Groq API keeping the API key server-side only.

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const WHATSAPP_LINK = 'https://wa.me/573005054912';

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }

    const { messages, activeProduct } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Missing or invalid "messages" array in request body.' });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
        console.error('[api/chat] GROQ_API_KEY is not configured in environment variables.');
        return res.status(500).json({ error: 'Server misconfiguration: AI service key not set.' });
    }

    try {
        // Build system prompt with product catalog context
        const catalogSummary = messages.find(m => m.role === 'system')?.content || '';

        const groqPayload = {
            model: GROQ_MODEL,
            messages,
            temperature: 0.7,
            max_tokens: 512,
        };

        const groqRes = await fetch(GROQ_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groqPayload),
        });

        if (!groqRes.ok) {
            const errorBody = await groqRes.text();
            console.error(`[api/chat] Groq API error HTTP ${groqRes.status}:`, errorBody);
            return res.status(502).json({
                error: `AI service returned HTTP ${groqRes.status}`,
                detail: errorBody,
            });
        }

        const data = await groqRes.json();
        const reply = data.choices?.[0]?.message?.content || 'No pude generar una respuesta.';

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('[api/chat] Unexpected error:', error);
        return res.status(500).json({
            error: 'Internal server error while contacting AI service.',
            detail: error.message,
        });
    }
}
