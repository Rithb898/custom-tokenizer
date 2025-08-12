# CLI - Custom Word Tokenizer

Command-line interface for the Custom Word Tokenizer with interactive and direct command modes.

## Features

- Interactive shell mode
- Direct command execution
- Persistent vocabulary storage
- Special tokens: `[PAD]` (0), `[UNK]` (1), `[START]` (2), `[END]` (3)
- Wikipedia's 100 most common words preloaded
- Token visualization in table format

## Installation

```bash
pnpm install
```

## Usage

### Interactive Mode
```bash
pnpm start
# or
node index.js
```

### Direct Commands
```bash
# Encode text to token IDs
node index.js encode "hello world"

# Decode token IDs to text
node index.js decode "[5, 6, 7]"

# Use special tokens
node index.js encode "[START] hello world [END]"
node index.js decode "[2, 5, 6, 3]"

# Visualize tokens in table format
node index.js visualize "hello world"

# Learn new vocabulary
node index.js learn "machine learning artificial intelligence"
```

## Commands

| Command | Description | Example |
|---------|-------------|---------|
| `encode <text>` | Convert text to token IDs | `encode "hello world"` |
| `decode <ids>` | Convert token IDs to text | `decode "[1, 2]"` |
| `visualize <text>` | Show tokens in table | `visualize "hello"` |
| `learn <text>` | Add new words to vocab | `learn "new words"` |
| `exit` | Exit interactive mode | `exit` |

## Files

- `index.js` - Main CLI entry point
- `tokenizer/CustomWordTokenizer.js` - Core tokenizer logic
- `commonWords.js` - Wikipedia's 100 most common words
- `tokenizer-vocab.json` - Persistent vocabulary storage

## Dependencies

- `readline` - Interactive command-line interface
- `chalk` - Terminal and colors for enhanced ux