import { useState, useEffect, useRef } from "react";
import { VoiceOrb, OrbState } from "@/components/VoiceOrb";
import { ConversationFeed } from "@/components/ConversationFeed";
import { TaskCard } from "@/components/TaskCard";
import { DataWidget } from "@/components/DataWidget";
import { WakeWordConfig } from "@/components/WakeWordConfig";
import { Mic, MicOff, Settings, Shield, Globe, Database, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Home() {
  const [orbState, setOrbState] = useState<OrbState>("standby");
  const [wakeWord, setWakeWord] = useState("Jarvis");
  const [isAlwaysOn, setIsAlwaysOn] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Astra OS initialized. Standing by for wake word...", timestamp: new Date().toLocaleTimeString() }
  ]);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);
  const [toolStatus, setToolStatus] = useState<string | null>(null);

  // Simulated Speech-to-Text Buffer
  const [sttBuffer, setSttBuffer] = useState("");
  const inactivityTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Proactive behavior simulation
    const timer = setTimeout(() => {
      setActiveTask({
        id: "t1",
        title: "Database Discrepancy",
        description: "Found conflicting entries in your Q4 projections. Run cross-reference search?",
        type: "data",
        time: "READY"
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Inactivity Logic
  useEffect(() => {
    if (orbState === "listening" || orbState === "processing") {
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => {
         if (isAlwaysOn) {
            setOrbState("standby");
            setSttBuffer("");
         }
      }, 10000); // 10s inactivity returns to standby
    }
    return () => clearTimeout(inactivityTimer.current);
  }, [orbState, isAlwaysOn]);

  const simulateWakeDetection = () => {
    if (orbState === "standby") {
      // Audio cue simulation (visual only here)
      setOrbState("listening");
      setMessages(prev => [...prev, {
        id: "sys-" + Date.now(),
        role: "assistant",
        content: `Wake word "${wakeWord}" detected. Listening...`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
  };

  const simulateAISearch = async (query: string) => {
    setOrbState("processing");
    setToolStatus("SEARCHING WEB...");
    await new Promise(r => setTimeout(r, 1500));
    setToolStatus("QUERYING DATABASES...");
    await new Promise(r => setTimeout(r, 1200));
    setToolStatus("AGGREGATING DATA...");
    await new Promise(r => setTimeout(r, 1000));
    setToolStatus(null);
    setOrbState("speaking");

    const response = "I've analyzed the web and internal databases. Here's the compiled dataset for your request.";
    
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      role: "assistant", 
      content: response, 
      timestamp: new Date().toLocaleTimeString() 
    }]);

    setActiveData({
      id: "d" + Date.now(),
      source: "GLOBAL AGGREGATED",
      query: query,
      summary: "Consolidated report from 12 sources including market indices and proprietary databases.",
      dataPoints: [
        { label: "Confidence", value: "98.4%" },
        { label: "Sources", value: "12 Verified" },
        { label: "Latency", value: "240ms" },
        { label: "Integrity", value: "High" }
      ]
    });
    
    setTimeout(() => {
      if (isAlwaysOn) setOrbState("standby");
    }, 2000);
  };

  const handleMicToggle = () => {
    if (orbState === "listening") {
      setOrbState(isAlwaysOn ? "standby" : "standby"); // Force standby
      if (sttBuffer.length > 0) {
        processUserQuery(sttBuffer);
      }
    } else {
      setOrbState("listening");
      setSttBuffer("");
      // Simulate real-time streaming STT
      let i = 0;
      const text = "Compile a report on current AI hardware trends";
      const interval = setInterval(() => {
        setSttBuffer(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
    }
  };

  const processUserQuery = (query: string) => {
    setMessages(prev => [...prev, { 
      id: Date.now().toString(), 
      role: "user", 
      content: query, 
      timestamp: new Date().toLocaleTimeString() 
    }]);
    simulateAISearch(query);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Privacy Indicator Layer */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 flex">
        <div className={`flex-1 transition-colors duration-500 ${orbState === "listening" ? 'bg-primary' : 'bg-emerald-500/30'}`} />
      </div>

      {/* Header */}
      <header className="relative z-20 p-4 pt-6 flex justify-between items-center glass-panel m-4 rounded-2xl border-primary/20">
        <div className="flex items-center gap-3">
           <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-300 ${orbState !== "standby" ? 'text-primary animate-pulse' : 'text-emerald-500'}`}>
              <Shield className="w-full h-full" />
           </div>
           <div>
             <h1 className="font-display font-bold tracking-tighter text-white text-lg leading-none">ASTRA</h1>
             <span className="text-[10px] font-tech text-primary uppercase tracking-[0.2em]">Quantum Core V4</span>
           </div>
        </div>
        
        <div className="hidden md:flex gap-6 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground font-mono">STATUS</span>
            <span className={`text-xs font-tech transition-colors ${orbState === "standby" ? "text-emerald-400" : "text-primary"}`}>
              {orbState === "standby" ? "PASSIVE LISTENING" : "ACTIVE PROCESSING"}
            </span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-muted-foreground font-mono">WAKE WORD</span>
            <span className="text-xs text-white font-tech">"{wakeWord.toUpperCase()}"</span>
          </div>
        </div>

        <WakeWordConfig 
           wakeWord={wakeWord} 
           setWakeWord={setWakeWord} 
           isAlwaysOn={isAlwaysOn} 
           setIsAlwaysOn={setIsAlwaysOn}
        />
      </header>

      {/* Main Interface */}
      <main className="flex-1 relative z-10 flex flex-col max-w-2xl mx-auto w-full px-4">
        
        {/* Status Bar */}
        <AnimatePresence>
          {toolStatus && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-primary animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-primary animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-primary animate-bounce" />
              </div>
              <span className="text-[10px] font-display tracking-widest text-primary uppercase">{toolStatus}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-4 overflow-y-auto max-h-[40vh] py-2 scrollbar-hide">
          {activeTask && (
            <TaskCard 
              task={activeTask} 
              onAction={(action) => {
                if (action === "approve") {
                  setOrbState("listening");
                  setSttBuffer("Execute cross-reference search on Q4 projections.");
                  setTimeout(() => processUserQuery("Execute cross-reference search on Q4 projections."), 1000);
                }
                setActiveTask(null);
              }} 
            />
          )}
          {activeData && <DataWidget result={activeData} />}
        </div>

        <div className="flex-1 flex flex-col justify-end pb-32">
          <div className="relative">
            <VoiceOrb state={orbState} />
            
            {/* Real-time STT Preview */}
            <AnimatePresence>
              {orbState === "listening" && sttBuffer && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 text-center pb-8"
                >
                  <p className="text-lg font-tech text-primary/80 italic">"{sttBuffer}"</p>
                </motion.div>
              )}
            </AnimatePresence>
            
             {/* Standby Message */}
             <AnimatePresence>
              {orbState === "standby" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 text-center pb-8"
                >
                  <Button 
                    variant="ghost" 
                    className="text-xs font-mono text-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10"
                    onClick={simulateWakeDetection}
                  >
                    <Zap className="w-3 h-3 mr-2" />
                    SIMULATE WAKE WORD "{wakeWord.toUpperCase()}"
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-48 relative">
             <ConversationFeed messages={messages} />
          </div>
        </div>
      </main>

      {/* Interaction Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-8 z-30 flex flex-col items-center bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="flex items-center gap-8 mb-4">
          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Globe className="w-4 h-4 text-white" />
            <span className="text-[8px] font-tech uppercase tracking-tighter">Web</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Database className="w-4 h-4 text-white" />
            <span className="text-[8px] font-tech uppercase tracking-tighter">Vault</span>
          </div>
          
          <Button 
            size="lg"
            className={`
              h-20 w-20 rounded-full border-2 transition-all duration-500 group relative
              ${orbState === "listening"
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_40px_var(--color-primary)]" 
                : "bg-white/5 border-white/10 text-white hover:border-primary/50 hover:text-primary"}
            `}
            onClick={handleMicToggle}
          >
            <div className="absolute inset-0 rounded-full border border-primary/20 group-hover:animate-ping" />
            {orbState === "listening" ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10 opacity-50" />}
          </Button>

          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity">
            <Cpu className="w-4 h-4 text-white" />
            <span className="text-[8px] font-tech uppercase tracking-tighter">Tool</span>
          </div>
          <div className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity text-primary">
            <Shield className="w-4 h-4" />
            <span className="text-[8px] font-tech uppercase tracking-tighter">Safe</span>
          </div>
        </div>
        
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
          {orbState === "standby" ? "PASSIVE MONITORING ENABLED" : "ACTIVE SESSION RECORDING"}
        </p>
      </div>

    </div>
  );
}
