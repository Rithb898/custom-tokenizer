import { Hash, Copy } from "lucide-react";
import React, { useState } from "react";

function TokenDisplay({ tokens = [] }) {
  const [copied, setCopied] = useState(false);

  const colors = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
  ];

  const getTokenColor = (tokenId) => {
    return colors[tokenId % colors.length];
  };

  const copyTokenIds = async () => {
    const tokenIds = tokens.map((item) => item.tokenId).join(", ");
    await navigator.clipboard.writeText(tokenIds);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <Hash className="text-blue-400" />
        Token Display {tokens.length > 0 ? `(${tokens.length})` : ""}
      </h2>

      {tokens.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-black/10 rounded-lg">
            {tokens.map((item, index) => (
              <div
                key={index}
                className="px-3 py-2 rounded-full text-black text-sm font-medium shadow-md hover:scale-105 transition-transform cursor-pointer group relative"
                style={{ backgroundColor: getTokenColor(item.tokenId) }}
                title={`Token: "${item.token}" | ID: ${item.tokenId}`}
              >
                <span className="font-mono">{item.token}</span>
                <span className="ml-1 text-xs opacity-75">#{item.tokenId}</span>
              </div>
            ))}
          </div>

          <div className="bg-black/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-white/70 text-sm">Token IDs:</div>
              <button
                onClick={copyTokenIds}
                className="flex items-center gap-1 px-2 py-1 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Copy token IDs"
              >
                <Copy size={14} />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="font-mono text-white">
              [{tokens.map((item) => item.tokenId).join(", ")}]
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white/50 text-center py-8">
          No tokens to display
        </div>
      )}
    </div>
  );
}

export default TokenDisplay;
