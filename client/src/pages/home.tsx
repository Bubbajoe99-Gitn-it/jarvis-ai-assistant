import { useState, useEffect } from "react";
import { VoiceOrb } from "@/components/VoiceOrb";
import { ConversationFeed } from "@/components/ConversationFeed";
import { TaskCard } from "@/components/TaskCard";
import { DataWidget } from "@/components/DataWidget";
import { Mic, MicOff, Search, Settings, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define message type locally or import if shared
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Systems online. Good evening, sir. I'm ready for your commands.", timestamp: "20:04:12" }
  ]);
  const [activeTask, setActiveTask] = useState<any>(null);
  const [activeData, setActiveData] = useState<any>(null);

  // Simulate "Proactive" behavior
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveTask({
        id: "t1",
        title: "Market Analysis Required",
        description: "Competitor Q3 earnings report released. Shall I compile a comparison dataset?",
        type: "data",
        time: "JUST NOW"
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleMicToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate user input after a delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now().toString(), 
          role: "user", 
          content: "Search the latest Q3 earnings for TechCorp and create a summary table.", 
          timestamp: new Date().toLocaleTimeString() 
        }]);
        setIsListening(false);
        
        // Simulate AI Response
        setTimeout(() => {
           setMessages(prev => [...prev, { 
            id: (Date.now() + 1).toString(), 
            role: "assistant", 
            content: "Scanning external databases... I've found the Q3 report. Compiling dataset now.", 
            timestamp: new Date().toLocaleTimeString() 
          }]);
          
          setActiveData({
            id: "d1",
            source: "SEC EDGAR DATABASE",
            query: "TechCorp Q3 Earnings",
            summary: "Revenue up 15% YoY. Cloud division growth accelerated to 32%.",
            dataPoints: [
              { label: "Revenue", value: "$45.2B" },
              { label: "Net Income", value: "$12.4B" },
              { label: "EPS", value: "$3.45" },
              { label: "YoY Growth", value: "+15.2%" }
            ]
          });
          setActiveTask(null); // Clear task if it was related
        }, 1500);
        
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none z-0" />
      
      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center glass-panel m-4 rounded-full">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
           <span className="font-display font-bold tracking-widest text-primary text-sm">ASTRA OS</span>
        </div>
        <div className="flex gap-4 text-xs font-mono text-muted-foreground">
          <span>MEM: 64%</span>
          <span>NET: SECURE</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:text-primary">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col max-w-md mx-auto w-full px-4 pb-24">
        
        {/* Dynamic Widget Area (Tasks/Data) */}
        <div className="mb-4 min-h-[120px]">
          {activeTask && (
            <TaskCard 
              task={activeTask} 
              onAction={(action) => {
                if (action === "approve") handleMicToggle(); // Simulate talking
                setActiveTask(null);
              }} 
            />
          )}
          {activeData && <DataWidget result={activeData} />}
        </div>

        {/* Voice Interface */}
        <div className="flex-1 flex flex-col justify-end">
          <VoiceOrb isListening={isListening} />
          
          {/* Conversation History */}
          <div className="h-64 mt-4 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
             <ConversationFeed messages={messages} />
          </div>
        </div>

      </main>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-6 z-20 flex justify-center items-center bg-gradient-to-t from-background to-transparent pb-10">
        <Button 
          size="lg"
          className={`
            h-16 w-16 rounded-full border-2 transition-all duration-300 shadow-[0_0_30px_var(--color-primary)]
            ${isListening 
              ? "bg-red-500/20 border-red-500 text-red-500 hover:bg-red-500/30" 
              : "bg-primary/10 border-primary text-primary hover:bg-primary/20 hover:scale-105"}
          `}
          onClick={handleMicToggle}
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </Button>
      </div>

    </div>
  );
}
