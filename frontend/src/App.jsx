import { useState, useEffect } from "react";
import { Github, Linkedin, Twitter, User } from "lucide-react";
import CustomWordTokenizer from "./utils/tokenizer";
import { commonWords } from "./utils/commonWords";
import EncodeInput from "./components/EncodeInput";
import DecodeInput from "./components/DecodeInput";
import TokenDisplay from "./components/TokenDisplay";
import QuickStart from "./components/QuickStart";

function App() {
  const [tokenizer, setTokenizer] = useState();
  const [inputText, setInputText] = useState("");
  const [tokenIds, setTokenIds] = useState("");
  const [tokens, setTokens] = useState([]);
  const [decodedText, setDecodedText] = useState("");

  useEffect(() => {
    const newTokenizer = new CustomWordTokenizer();
    newTokenizer.preloadCommonWords(commonWords);
    setTokenizer(newTokenizer);

    const savedText = localStorage.getItem("input-text");
    if (savedText) setInputText(savedText);
  }, []);

  useEffect(() => {
    localStorage.setItem("input-text", inputText);
    if (tokenizer && inputText.trim()) {
      const visualTokens = tokenizer.visualizeTokens(inputText);
      setTokens(visualTokens);
    } else {
      setTokens([]);
    }
  }, [inputText, tokenizer]);

  const handleDecode = () => {
    if (!tokenIds.trim()) return;
    const ids = tokenIds
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    const decoded = tokenizer.decode(ids);
    setDecodedText(decoded);
  };

  const clearDecode = () => {
    setTokenIds("");
    setDecodedText("");
  };

  const loadExample = () => {
    setInputText(
      "I told Git I wanted peace. it gave me merge conflicts.. This tokenizer learns from your text!"
    );
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      {/* Header */}

      <header className="flex justify-between items-center py-12 px-4">
        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Custom Tokenizer
          </h1>
          <p className="text-xl text-white/70 mt-2">
            A visual word-based tokenizer that learns from your text
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://rith.is-a.dev"
            target="_blank"
            rel="noopener noreferrer"
            title="Portfolio"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <User size={24} className="text-white" />
          </a>
          <a
            href="https://github.com/Rithb898/custom-tokenizer"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Github size={24} className="text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/rith-banerjee/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Linkedin size={24} className="text-white" />
          </a>
          <a
            href="https://x.com/rithcoderr"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <Twitter size={24} className="text-white" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <EncodeInput inputText={inputText} setInputText={setInputText} />
          </div>
          <div className="flex-1">
            <DecodeInput
              tokenIds={tokenIds}
              setTokenIds={setTokenIds}
              onDecode={handleDecode}
              decodedText={decodedText}
              onClear={clearDecode}
            />
          </div>
        </div>
        <div>
          <TokenDisplay tokens={tokens} />
        </div>
        <div>
          <QuickStart onLoadExample={loadExample} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-5">
        Made with ❤️ by{" "}
        <a href="https://github.com/Rithb898" className="text-mono">
          Rith
        </a>
      </div>
    </div>
  );
}

export default App;
