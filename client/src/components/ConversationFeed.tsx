import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function ConversationFeed({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col space-y-4 p-4 h-full overflow-y-auto mask-gradient-b">
      {messages.map((msg, index) => (
        <motion.div
          key={msg.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className={cn(
            "max-w-[85%] rounded-lg p-3 backdrop-blur-md border",
            msg.role === "user"
              ? "self-end bg-primary/10 border-primary/30 text-right rounded-br-none"
              : "self-start bg-card/60 border-white/5 text-left rounded-bl-none"
          )}
        >
          <div className={cn(
            "text-xs font-tech tracking-wider mb-1 opacity-70",
            msg.role === "user" ? "text-primary" : "text-emerald-400"
          )}>
            {msg.role === "user" ? "COMMAND" : "SYSTEM_RESPONSE"} // {msg.timestamp}
          </div>
          <p className={cn(
            "text-sm md:text-base leading-relaxed font-sans",
            msg.role === "user" ? "text-white" : "text-gray-100"
          )}>
            {msg.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
