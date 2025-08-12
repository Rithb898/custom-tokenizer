# Backend - Custom Word Tokenizer

REST API backend for the Custom Word Tokenizer with Express.js server.

## Features

- **REST API**: Complete tokenization endpoints
- **Custom Tokenizer**: Word-based tokenization with vocabulary management
- **Special Tokens**: Built-in `[PAD]`, `[UNK]`, `[START]`, `[END]` support
- **Persistent Storage**: JSON-based vocabulary storage
- **CORS Support**: Cross-origin requests enabled

## API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/encode` | Convert text to token IDs | `{"text": "hello world"}` |
| POST | `/api/decode` | Convert token IDs back to text | `{"tokenIds": [1, 2, 3]}` |
| POST | `/api/visualize` | Get token visualization data | `{"text": "hello world"}` |
| POST | `/api/learn` | Add new words to vocabulary | `{"text": "new words"}` |

## Special Tokens

| Token | ID | Purpose |
|-------|----|---------|
| `[PAD]` | 0 | Padding sequences |
| `[UNK]` | 1 | Unknown words |
| `[START]` | 2 | Sequence beginning |
| `[END]` | 3 | Sequence ending |

## Example Usage

```bash
# Encode with special tokens
curl -X POST http://localhost:3001/api/encode \
  -H "Content-Type: application/json" \
  -d '{"text": "[START] hello world [END]"}'

# Decode special tokens
curl -X POST http://localhost:3001/api/decode \
  -H "Content-Type: application/json" \
  -d '{"tokens": [0, 1, 2, 3]}'
```

## Setup

```bash
pnpm install
```

## Development

```bash
# Start server
pnpm start

# Start with auto-reload
pnpm dev
```

Server runs on port 3001 by default.

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **CORS** - Cross-origin support
- **Custom Tokenizer** - Word tokenization engine