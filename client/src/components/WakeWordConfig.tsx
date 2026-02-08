import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Mic, Volume2 } from "lucide-react";

interface WakeWordConfigProps {
  wakeWord: string;
  setWakeWord: (word: string) => void;
  isAlwaysOn: boolean;
  setIsAlwaysOn: (isOn: boolean) => void;
}

export function WakeWordConfig({ wakeWord, setWakeWord, isAlwaysOn, setIsAlwaysOn }: WakeWordConfigProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 group">
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black/90 border-white/10 text-white backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="font-display tracking-widest text-primary">SYSTEM CONFIGURATION</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base font-tech text-white">Passive Listening</Label>
              <p className="text-xs text-gray-400">Assistant monitors for wake word in background</p>
            </div>
            <Switch checked={isAlwaysOn} onCheckedChange={setIsAlwaysOn} />
          </div>

          <div className="space-y-2">
            <Label className="font-tech text-white">Wake Phrase</Label>
            <div className="flex gap-2">
              <Input 
                value={wakeWord} 
                onChange={(e) => setWakeWord(e.target.value)} 
                className="bg-white/5 border-white/10 font-mono text-primary"
              />
              <Button size="icon" variant="outline" className="border-white/10" onClick={() => {}}>
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
              Default: "JARVIS" • Sensitivity: HIGH
            </p>
          </div>

          <div className="space-y-2">
             <Label className="font-tech text-white">Voice Synthesis</Label>
             <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="justify-start border-primary/40 bg-primary/10 text-primary">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Male (Jarvis)
                </Button>
                <Button variant="outline" className="justify-start border-white/10 text-gray-400">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Female (Friday)
                </Button>
             </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
           <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
           <Button className="bg-primary text-black hover:bg-primary/80" onClick={() => setIsOpen(false)}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
