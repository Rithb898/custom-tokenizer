class CustomWordTokenizer {
  constructor() {
    this.wordToToken = {};
    this.tokenToWord = {};
    this.nextTokenId = 5; // Reserve 0-4 for special tokens
    this.initSpecialTokens();
    this.loadFromStorage();
  }

  initSpecialTokens() {
    const specialTokens = {
      '[PAD]': 0,
      '[UNK]': 1,
      '[START]': 2,
      '[END]': 3
    };
    
    Object.entries(specialTokens).forEach(([token, id]) => {
      this.wordToToken[token] = id;
      this.tokenToWord[id] = token;
    });
  }

  preloadCommonWords(words) {
    words.forEach(word => {
      if (!(word in this.wordToToken)) {
        this.wordToToken[word] = this.nextTokenId;
        this.tokenToWord[this.nextTokenId] = word;
        this.nextTokenId++;
      }
    });
    this.saveToStorage();
  }

  learn(text) {
    const tokens = this._tokenize(text);
    let hasNewTokens = false;
    tokens.forEach(token => {
      if (!(token in this.wordToToken)) {
        this.wordToToken[token] = this.nextTokenId;
        this.tokenToWord[this.nextTokenId] = token;
        this.nextTokenId++;
        hasNewTokens = true;
      }
    });
    if (hasNewTokens) this.saveToStorage();
  }

  encode(text) {
    const tokens = this._tokenize(text);
    this.learn(text);
    return tokens.map(token => this.wordToToken[token]);
  }

  decode(tokenIds) {
    return tokenIds.map(id => this.tokenToWord[id] || this.tokenToWord[1]).join(' ');
  }

  _tokenize(text) {
    // First extract special tokens, then tokenize the rest
    const specialTokenPattern = /\[(PAD|UNK|START|END)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = specialTokenPattern.exec(text)) !== null) {
      // Add text before special token
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index);
        parts.push(...beforeText.toLowerCase().match(/[a-z0-9]+|[^a-z0-9\s]/g) || []);
      }
      // Add special token
      parts.push(match[0]);
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      parts.push(...remainingText.toLowerCase().match(/[a-z0-9]+|[^a-z0-9\s]/g) || []);
    }
    
    return parts.filter(Boolean);
  }

  visualizeTokens(text) {
    const tokens = this._tokenize(text);
    this.learn(text);
    return tokens.map(token => ({
      token,
      tokenId: this.wordToToken[token],
    }));
  }

  saveToStorage() {
    localStorage.setItem('tokenizer-vocab', JSON.stringify({
      wordToToken: this.wordToToken,
      tokenToWord: this.tokenToWord,
      nextTokenId: this.nextTokenId
    }));
  }

  loadFromStorage() {
    const saved = localStorage.getItem('tokenizer-vocab');
    if (saved) {
      const data = JSON.parse(saved);
      this.wordToToken = { ...this.wordToToken, ...data.wordToToken };
      this.tokenToWord = { ...this.tokenToWord, ...data.tokenToWord };
      this.nextTokenId = data.nextTokenId || 5;
    }
  }
}

export default CustomWordTokenizer;
