#!/usr/bin/env node
import path from 'path';
import readline from 'readline';
import chalk from 'chalk';
import CustomWordTokenizer from './tokenizer/CustomWordTokenizer.js';
import commonWords from './commonWords.js';

const vocabFile = path.resolve('./tokenizer-vocab.json');
const tokenizer = new CustomWordTokenizer(vocabFile);

// Preload Wikipedia's 100 most common words
tokenizer.preloadCommonWords(commonWords);

// ===== Command Runner =====
function runCommand(commandArgs) {
  const [command, ...args] = commandArgs;

  switch (command) {
    case 'encode':
      const encoded = tokenizer.encode(args.join(' '));
      console.log(chalk.green('✓ Encoded:'), chalk.cyan(JSON.stringify(encoded)));
      break;

    case 'decode': {
      const raw = args.join(' ')
        .replace(/[\[\]]/g, '') // remove brackets
        .split(',')             // split by commas
        .map(num => num.trim()) // trim spaces
        .filter(Boolean)        // remove empty
        .map(Number);           // convert to numbers

      const decoded = tokenizer.decode(raw);
      console.log(chalk.green('✓ Decoded:'), chalk.yellow(`"${decoded}"`));
      break;
    }

    case 'visualize':
      console.log(chalk.blue('📊 Token Visualization:'));
      console.table(tokenizer.visualizeTokens(args.join(' ')));
      break;

    case 'learn':
      tokenizer.learn(args.join(' '));
      console.log(chalk.green('✓ Learned new words'));
      break;

    case 'exit':
      console.log(chalk.magenta('👋 Goodbye!'));
      process.exit(0);
      break;

    default:
      console.log(chalk.red('❌ Unknown command'));
      console.log(chalk.gray('Available: encode, decode, visualize, learn, exit'));
  }
}

// ===== Dual Mode =====
const argsFromCLI = process.argv.slice(2);
if (argsFromCLI.length > 0) {
  runCommand(argsFromCLI);
  process.exit(0);
}

// ===== Interactive Mode =====
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.cyan('Tokenizer> ')
});

console.log(chalk.bold.blue('🚀 Custom Word Tokenizer CLI'));
console.log(chalk.gray('Commands: encode <text>, decode <ids>, visualize <text>, learn <text>, exit'));
rl.prompt();

rl.on('line', (line) => {
  const input = line.trim().split(' ');
  runCommand(input);
  rl.prompt();
});