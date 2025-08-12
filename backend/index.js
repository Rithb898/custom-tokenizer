import express from 'express';
import cors from 'cors';
import CustomWordTokenizer from './tokenizer/CustomWordTokenizer.js';
import commonWords from './commonWords.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize tokenizer
const tokenizer = new CustomWordTokenizer('./tokenizer-vocab.json');
tokenizer.preloadCommonWords(commonWords);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({
    api: "Custom Word Tokenizer",
    status: "running",
    routes: [
      "POST /api/encode - text → tokens",
      "POST /api/decode - tokens → text", 
      "POST /api/visualize - show token breakdown",
      "POST /api/learn - add words to vocab"
    ],
    examples: {
      encode: { text: "hello world" },
      decode: { tokens: [4, 5] },
      visualize: { text: "hello world" },
      learn: { text: "new words" }
    },
    tokens: { "[PAD]": 0, "[UNK]": 1, "[START]": 2, "[END]": 3 }
  });
})

app.post('/api/encode', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  
  const tokens = tokenizer.encode(text);
  res.json({ tokens });
});

app.post('/api/decode', (req, res) => {
  const { tokens } = req.body;
  if (!tokens || !Array.isArray(tokens)) {
    return res.status(400).json({ error: 'Tokens array is required' });
  }
  
  const text = tokenizer.decode(tokens);
  res.json({ text });
});

app.post('/api/visualize', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  
  const visualization = tokenizer.visualizeTokens(text);
  res.json({ visualization });
});

app.post('/api/learn', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });
  
  tokenizer.learn(text);
  res.json({ message: 'Learned new words' });
});

app.listen(PORT, () => {
  console.log(`Tokenizer API running on port ${PORT}`);
});