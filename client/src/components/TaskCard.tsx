import { motion } from "framer-motion";
import { Check, X, Clock, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Task {
  id: string;
  title: string;
  description: string;
  type: "meeting" | "data" | "reminder";
  time?: string;
}

export function TaskCard({ task, onAction }: { task: Task; onAction: (action: "approve" | "dismiss") => void }) {
  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="glass-panel p-4 rounded-xl border border-primary/20 relative overflow-hidden group tech-border"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 blur-3xl rounded-full -mr-10 -mt-10" />
      
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <span className="bg-primary/20 text-primary text-[10px] font-display uppercase px-2 py-0.5 rounded-sm tracking-widest border border-primary/30">
            Proactive
          </span>
          {task.type === "data" && <Database className="w-3 h-3 text-primary" />}
          {task.type === "meeting" && <Clock className="w-3 h-3 text-primary" />}
        </div>
        <span className="text-xs font-mono text-muted-foreground">{task.time}</span>
      </div>

      <h3 className="text-lg font-display text-white mb-1">{task.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{task.description}</p>

      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50"
          onClick={() => onAction("approve")}
        >
          <Check className="w-4 h-4 mr-1" />
          Authorize
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="flex-1 border-white/10 hover:bg-white/5 text-gray-400"
          onClick={() => onAction("dismiss")}
        >
          <X className="w-4 h-4 mr-1" />
          Dismiss
        </Button>
      </div>
    </motion.div>
  );
}
