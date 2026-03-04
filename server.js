import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Replace with your real OpenAI API key here
const OPENAI_KEY = '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';

// Endpoint that your HTML frontend calls
app.post('/chat', async (req, res) => {
  try {
    const messages = req.body.messages; // messages from frontend
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    const answer = data.choices[0].message.content;
    res.json({ reply: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
