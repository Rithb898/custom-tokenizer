import React from "react";
import { Zap, Trash2 } from "lucide-react";

function EncodeInput({ inputText, setInputText }) {
  const examples = [
    "Hello world!",
    "Price: $29.99 (50% off)",
    "React & Node.js are great!",
    "rithcoderr@gmail.com logged in",
    "AI Will take your job",
  ];

  return (
    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="text-yellow-400" />
          Text Encoding
        </h2>
        {inputText && (
          <button
            onClick={() => setInputText("")}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 hover:text-red-200 rounded-lg transition-all cursor-pointer"
          >
            <Trash2 size={16} />
            Clear
          </button>
        )}
      </div>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to encode..."
        className="w-full flex-1 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 resize-none"
      />

      <div className="flex flex-wrap gap-2 mt-4">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setInputText(example)}
            className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 rounded-lg transition-all cursor-pointer text-sm"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

export default EncodeInput;
