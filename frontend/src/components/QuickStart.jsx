// components/QuickStart.jsx
import { Lightbulb, Play } from "lucide-react";

function QuickStart({ onLoadExample }) {
  return (
    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="text-yellow-400" />
        <h2 className="text-2xl font-bold text-white">Quick Start Guide</h2>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-blue-400 font-semibold mb-2">1. Encode Text</div>
            <div className="text-sm">Type in the left panel to see real-time tokenization</div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-green-400 font-semibold mb-2">2. Decode Tokens</div>
            <div className="text-sm">Copy token IDs and paste in right panel to decode</div>
          </div>
        </div>
        
        <button
          onClick={onLoadExample}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30 hover:text-blue-200 rounded-lg transition-all cursor-pointer"
        >
          <Play size={16} />
          Try Example
        </button>
      </div>
    </div>
  );
}

export default QuickStart;
