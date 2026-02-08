import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import orbImage from "@/assets/orb.png";

export type OrbState = "standby" | "listening" | "processing" | "speaking";

export function VoiceOrb({ state }: { state: OrbState }) {
  const isListening = state === "listening";
  const isProcessing = state === "processing";
  const isStandby = state === "standby";

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-8">
      {/* Standby Pulse Ring */}
      {isStandby && (
         <motion.div
           className="absolute inset-0 rounded-full border border-emerald-500/10"
           animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
         />
      )}

      {/* Active Listening/Processing Outer Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${isProcessing ? 'border-purple-500/40' : 'border-primary/20'}`}
        animate={{
          scale: isListening || isProcessing ? [1, 1.2, 1] : 1,
          opacity: isListening || isProcessing ? [0.5, 0, 0.5] : 0,
        }}
        transition={{
          duration: isProcessing ? 1 : 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Rotating Data Ring */}
      <motion.div
        className={`absolute inset-4 rounded-full border border-dashed ${isProcessing ? 'border-purple-400/40' : 'border-primary/40'}`}
        animate={{
          rotate: 360,
          opacity: isStandby ? 0.1 : 0.5
        }}
        transition={{
          duration: isProcessing ? 5 : 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Rotating Ring (Counter) */}
      <motion.div
        className={`absolute inset-8 rounded-full border border-dotted ${isProcessing ? 'border-purple-300/60' : 'border-primary/60'}`}
        animate={{
          rotate: -360,
          opacity: isStandby ? 0.1 : 0.6
        }}
        transition={{
          duration: isProcessing ? 3 : 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Core Image */}
      <motion.div
        className="relative z-10 w-48 h-48 rounded-full overflow-hidden flex items-center justify-center bg-black/50 backdrop-blur-sm"
        animate={{
          boxShadow: isProcessing 
            ? "0 0 60px var(--color-secondary)"
            : isListening 
              ? "0 0 50px var(--color-primary)" 
              : "0 0 10px var(--color-emerald-500)", // Standby glow
        }}
      >
        <img 
          src={orbImage} 
          alt="AI Core" 
          className={`w-full h-full object-cover mix-blend-screen transition-all duration-1000 ${isStandby ? 'opacity-30 grayscale-[0.5]' : 'opacity-80'}`}
        />
        
        {/* Voice Waveform Overlay */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center gap-1">
             {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-white"
                  animate={{
                    height: [10, 40, 10],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
             ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
