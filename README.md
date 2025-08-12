# Custom Word Tokenizer

A full-stack tokenizer application with CLI, frontend, and backend components for encoding/decoding text into token IDs.

## Project Structure

```
custom-tokenizer/
├── cli/           # Command-line interface
├── frontend/      # React web application
└── backend/       # Express.js REST API
```

## Features

- **Encode**: Convert text to token IDs
- **Decode**: Convert token IDs back to text  
- **Visualize**: Display tokens in table format
- **Learn**: Add new words to vocabulary
- **Special Tokens**: `[PAD]`, `[UNK]`, `[START]`, `[END]` support
- Preloaded with Wikipedia's 100 most common words
- Web interface and CLI access

## Live Demo

- **Frontend**: https://custom-tokenizer-rith.vercel.app/
- **Backend API**: https://custom-tokenizer.onrender.com

## Quick Start

### CLI Usage

```bash
cd cli
pnpm install
pnpm start

# Or direct commands
node index.js encode "hello world!"
node index.js encode "[START] hello world [END]"
node index.js decode "[2, 5, 6, 3]"
node index.js decode "[0, 1, 2, 3]"  # Special tokens
```

### Frontend Usage

```bash
cd frontend
pnpm install
pnpm dev
```

### Backend Usage

```bash
cd backend
pnpm install
pnpm start
```

## CLI Commands

- `encode <text>` - Encode text into token IDs
- `decode <ids>` - Decode token IDs back to text
- `visualize <text>` - Show tokens in table format
- `learn <text>` - Add new words to vocabulary
- `exit` - Exit interactive mode

## Special Tokens

| Token | ID | Usage Example |
|-------|----|--------------|
| `[PAD]` | 0 | `node index.js encode "[PAD]"` |
| `[UNK]` | 1 | `node index.js encode "[UNK]"` |
| `[START]` | 2 | `node index.js encode "[START] text"` |
| `[END]` | 3 | `node index.js encode "text [END]"` |

## Detailed Documentation

For detailed information about each component, check the individual README files:

- 📁 [CLI Documentation](./cli/README.md) - Command-line interface usage and API
- 🌐 [Frontend Documentation](./frontend/README.md) - React web application setup and features
- 🔧 [Backend Documentation](./backend/README.md) - REST API endpoints and setup