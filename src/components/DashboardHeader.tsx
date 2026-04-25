import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center p-[var(--spacing-phi-3)] border-b border-white/10 gap-[var(--spacing-phi-3)] bg-space-black/40 backdrop-blur-md">
      <div className="flex items-center gap-[var(--spacing-phi-3)]">
        <div className="w-[var(--spacing-phi-1)] h-phi-4 bg-nasa-blue shadow-[0_0_15px_#003399]" />
        <div>
          <h1 className="text-[var(--spacing-phi-4)] leading-none font-bold uppercase tracking-tighter drop-shadow-sm flex">
            {"Geogaddi".split('').map((letter, i) => (
              <span key={i} style={{ color: i % 2 === 0 ? '#FC3D21' : '#FF8C00' }}>
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-[10px] font-mono text-white/50 uppercase tracking-[0.2em] mt-1.5">
            5-Channel Cryptographic Steganography · NASA NHB 8071.1
          </p>
        </div>
      </div>
      
      <div className="flex gap-[var(--spacing-phi-3)] items-center flex-wrap">
        <div className="flex items-center group">
          <span className="status-led led-caution animate-pulse shadow-[0_0_12px_#FFB800]" />
          <span className="text-[10px] font-mono text-amber font-bold uppercase tracking-wider group-hover:text-white transition-colors">Interface Heat</span>
        </div>
        <div className="flex items-center group">
          <span className="status-led led-nominal animate-pulse shadow-[0_0_12px_#00FF41]" />
          <span className="text-[10px] font-mono text-telemetry-green font-bold uppercase tracking-wider group-hover:text-white transition-colors">Nominal</span>
        </div>
        <div className="flex items-center group">
          <span className="status-led led-active shadow-[0_0_12px_#0066FF]" />
          <span className="text-[10px] font-mono text-accent-blue font-bold uppercase tracking-wider group-hover:text-white transition-colors">Encrypted</span>
        </div>
        <div className="flex items-center group">
          <span className="status-led led-nominal shadow-[0_0_12px_#00FF41]" />
          <span className="text-[10px] font-mono text-telemetry-green font-bold uppercase tracking-wider group-hover:text-white transition-colors">Channel 5 Secure</span>
        </div>
        <div className="hidden lg:flex items-center bg-white/5 px-[var(--spacing-phi-2)] py-[var(--spacing-phi-1)] border border-white/10 ring-1 ring-inset ring-white/5">
          <span className="text-[10px] font-mono text-white/40 uppercase mr-[var(--spacing-phi-1)]">Timechain:</span>
          <span className="text-[10px] font-mono text-white/90 font-medium leading-relaxed">
            {new Date().toISOString().slice(0, 19).replace('T', ' ')}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
