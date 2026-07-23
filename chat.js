// api/chat.js
//
// Serverless function (Vercel). Ini satu-satunya tempat API key Anthropic
// dipakai. Key disimpan sebagai environment variable di dashboard Vercel
// (ANTHROPIC_API_KEY), tidak pernah ada di kode atau di browser pengguna.

module.exports = async (req, res) => {
  // CORS dasar, biar frontend yang di-host di domain sama bisa manggil ini.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: { message: 'Method not allowed' } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { message: 'ANTHROPIC_API_KEY belum diset di environment variables Vercel.' } });
    return;
  }

  try {
    const { system, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: { message: 'Field "messages" wajib berupa array.' } });
      return;
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system: system || undefined,
        messages
      })
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: 'Proxy error: ' + err.message } });
  }
};
