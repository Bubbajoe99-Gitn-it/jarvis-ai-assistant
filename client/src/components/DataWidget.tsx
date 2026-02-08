import { motion } from "framer-motion";
import { ExternalLink, Table } from "lucide-react";

interface DataResult {
  id: string;
  source: string;
  query: string;
  summary: string;
  dataPoints: { label: string; value: string }[];
}

export function DataWidget({ result }: { result: DataResult }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-panel p-0 rounded-xl overflow-hidden my-4 border border-emerald-500/30"
    >
      <div className="bg-emerald-950/30 p-3 border-b border-emerald-500/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-display tracking-widest text-emerald-400 uppercase">
            Dataset Generated
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-600">{result.source}</span>
      </div>

      <div className="p-4">
        <h4 className="text-sm font-semibold text-white mb-2">Query: "{result.query}"</h4>
        <p className="text-xs text-gray-400 mb-4">{result.summary}</p>

        <div className="grid grid-cols-2 gap-2">
          {result.dataPoints.map((dp, i) => (
            <div key={i} className="bg-black/40 p-2 rounded border border-white/5">
              <div className="text-[10px] uppercase text-gray-500 font-mono">{dp.label}</div>
              <div className="text-sm font-tech text-emerald-300">{dp.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex justify-end">
          <button className="text-xs flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors">
            View Full Report <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
