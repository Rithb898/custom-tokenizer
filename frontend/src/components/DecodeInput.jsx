import { Eye, Trash2 } from "lucide-react";
import React from "react";

function DecodeInput({ tokenIds, setTokenIds, onDecode, decodedText, onClear }) {
  return (
    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Eye className="text-green-400" />
          Token Decoding
        </h2>
        {tokenIds && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 hover:text-red-200 rounded-lg transition-all cursor-pointer"
          >
            <Trash2 size={16} />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-4">
        <textarea
          value={tokenIds}
          onChange={(e) => setTokenIds(e.target.value)}
          placeholder="Enter token IDs (comma-separated): 1, 2, 3"
          className="w-full h-24 bg-white/5 border border-white/20 rounded-lg p-4 text-white placeholder-white/50 resize-none"
        />

        <button
          onClick={onDecode}
          disabled={!tokenIds.trim()}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white py-2 rounded-lg font-semibold transition-colors cursor-pointer"
        >
          Decode
        </button>

        {decodedText && (
          <div>
            <h3 className="text-white font-semibold mb-2">Decoded Text:</h3>
            <div className="bg-black/20 rounded-lg p-4 text-white">
              {decodedText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DecodeInput;
