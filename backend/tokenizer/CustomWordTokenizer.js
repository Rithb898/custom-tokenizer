import fs from 'fs';

class CustomWordTokenizer {
  constructor(storagePath) {
    this.wordToToken = {};
    this.tokenToWord = {};
    this.nextTokenId = 1;
    this.storagePath = storagePath;
    this.loadFromStorage();
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
    return tokenIds.map(id => this.tokenToWord[id] || '[UNK]').join(' ');
  }

  _tokenize(text) {
    return text.toLowerCase().match(/[a-z0-9]+|[^a-z0-9\s]/g) || [];
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
    fs.writeFileSync(
      this.storagePath,
      JSON.stringify({
        wordToToken: this.wordToToken,
        tokenToWord: this.tokenToWord,
        nextTokenId: this.nextTokenId
      }, null, 2)
    );
  }

  loadFromStorage() {
    if (fs.existsSync(this.storagePath)) {
      try {
        const fileContent = fs.readFileSync(this.storagePath, 'utf8').trim();

        if (!fileContent) {
          console.warn('⚠️ Vocab file is empty. Starting fresh.');
          return;
        }

        const data = JSON.parse(fileContent);
        this.wordToToken = data.wordToToken || {};
        this.tokenToWord = data.tokenToWord || {};
        this.nextTokenId = data.nextTokenId || 1;

      } catch (err) {
        console.error('⚠️ Failed to read vocab file. Starting fresh.', err.message);
      }
    }
  }

}

export default CustomWordTokenizer;
