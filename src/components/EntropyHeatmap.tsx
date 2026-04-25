import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface EntropyHeatmapProps {
  input: string;
}

const EntropyHeatmap: React.FC<EntropyHeatmapProps> = ({ input }) => {
  const grid = useMemo(() => {
    // Generate a 12x12 grid of "complexity cells"
    const cells = [];
    const seed = input.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    
    // Character variety factors
    const hasUpper = /[A-Z]/.test(input);
    const hasLower = /[a-z]/.test(input);
    const hasNumber = /[0-9]/.test(input);
    const hasSpecial = /[^A-Za-z0-9]/.test(input);
    const varietyCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    
    for (let i = 0; i < 144; i++) {
      // Calculate heat value for this pixel
      // Base noise + pattern influenced by input
      const noise = Math.sin(i * 0.5 + seed * 0.1) * 0.5 + 0.5;
      const inputInfluence = input.length > 0 ? (input.charCodeAt(i % input.length) % 10) / 10 : 0;
      
      // Calculate thermal intensity
      let intensity = (noise * 0.3) + (inputInfluence * 0.7);
      intensity *= (input.length / 20); // Normalize by length (cap at 20 chars)
      intensity *= (varietyCount / 4);  // Normalize by variety
      
      cells.push(Math.min(1, intensity));
    }
    return cells;
  }, [input]);

  const getHeatColor = (intensity: number) => {
    if (intensity < 0.2) return 'bg-nasa-blue/20 shadow-[inset_0_0_2px_rgba(0,102,255,0.2)]';
    if (intensity < 0.4) return 'bg-instrument-blue/60 shadow-[0_0_5px_rgba(0,240,255,0.3)]';
    if (intensity < 0.6) return 'bg-telemetry-green lg:shadow-[0_0_8px_rgba(1,255,145,0.4)]';
    if (intensity < 0.8) return 'bg-amber shadow-[0_0_10px_rgba(255,184,0,0.5)]';
    return 'bg-nasa-red shadow-[0_0_15px_rgba(252,61,33,0.6)] animate-pulse';
  };

  return (
    <div className="relative p-2 border border-white/5 rounded-sm bg-black/40 backdrop-blur-sm overflow-hidden group">
      <div className="flex justify-between items-center mb-2 px-1">
        <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Entropy HUD</span>
        <div className="flex gap-0.5">
          {[1,2,3].map(i => <div key={i} className={`w-1 h-3 ${input.length > i*4 ? 'bg-telemetry-green' : 'bg-white/10'}`} />)}
        </div>
      </div>
      
      <div className="grid grid-cols-12 gap-0.5 h-[120px]">
        {grid.map((intensity, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ 
              scale: 0.8 + (intensity * 0.2),
              opacity: 0.2 + (intensity * 0.8)
            }}
            className={`w-full h-full rounded-[1px] transition-colors duration-500 ${getHeatColor(intensity)}`}
          />
        ))}
      </div>
      
      <div className="mt-2 flex justify-between items-center px-1">
        <span className="text-[7px] font-mono text-white/30 uppercase">Complexity Vector</span>
        <span className="text-[7px] font-mono text-telemetry-green uppercase">
          {Math.floor(input.length * grid.reduce((a,b) => a+b, 0) / 144 * 100)}%
        </span>
      </div>

      {/* Scanning lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-1 bg-white/20 absolute top-0 animate-[scan_3s_linear_infinite]" />
      </div>
    </div>
  );
};

export default EntropyHeatmap;
