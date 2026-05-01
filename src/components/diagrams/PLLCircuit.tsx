import React from 'react';

export function PLLCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-pink-500 font-bold tracking-[0.2em] text-sm uppercase">
          Realistic Phase Locked Loop (PLL)
        </h4>
        <p className="text-slate-500 text-[10px] mt-1 tracking-widest">FEEDBACK CONTROL SCHEMATIC</p>
      </div>

      <svg
        viewBox="0 0 800 450"
        className="w-full h-auto min-w-[700px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- INPUT --- */}
        <g transform="translate(60, 150)" filter="url(#glow-cyan)">
          <path d="M-40 0 L0 0" stroke="#06b6d4" strokeWidth="2.5" />
          <text x="-40" y="-15" fill="#06b6d4" className="text-[12px] font-bold">Input f_in</text>
          <circle cx="0" cy="0" r="4" fill="#06b6d4" />
        </g>

        {/* --- PHASE DETECTOR (Multiplier) --- */}
        <g transform="translate(180, 150)">
          <rect x="-40" y="-40" width="80" height="80" rx="8" stroke="#ec4899" strokeWidth="2.5" fill="#ec4899" fillOpacity="0.1" filter="url(#glow-pink)" />
          <text x="0" y="5" textAnchor="middle" fill="#ec4899" className="text-xl font-bold">×</text>
          <text x="0" y="-50" textAnchor="middle" fill="#ec4899" className="text-[10px] uppercase font-bold tracking-widest">Phase Detector</text>
        </g>

        {/* --- LOOP FILTER (LPF) --- */}
        <g transform="translate(380, 150)">
          <rect x="-50" y="-40" width="100" height="80" rx="8" stroke="#3b82f6" strokeWidth="2" fill="#3b82f6" fillOpacity="0.1" />
          <path d="M-30 20 L0 -20 L30 20" stroke="#3b82f6" strokeWidth="2.5" fill="none" />
          <text x="0" y="55" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-bold tracking-widest uppercase">Loop Filter H(s)</text>
          
          {/* Internal Resistor/Capacitor icons for realism */}
          <path d="M-20 -10 L20 -10 L20 10 L-20 10 Z" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3" />
        </g>

        {/* --- VCO --- */}
        <g transform="translate(380, 320)">
          <rect x="-50" y="-40" width="100" height="80" rx="8" stroke="#a855f7" strokeWidth="2.5" fill="#a855f7" fillOpacity="0.1" />
          <text x="0" y="5" textAnchor="middle" fill="#a855f7" className="text-lg font-black">VCO</text>
          <path d="M-25 15 Q-12 -15 0 15 T25 15" stroke="#a855f7" strokeWidth="2" fill="none" opacity="0.6" />
        </g>

        {/* --- AMPLIFIER / BUFFER --- */}
        <g transform="translate(580, 150)">
          <path d="M-30 -30 L20 0 L-30 30 Z" stroke="#10b981" strokeWidth="2" fill="#10b981" fillOpacity="0.1" />
          <text x="-5" y="-40" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold tracking-widest uppercase">Buffer</text>
        </g>

        {/* --- CONNECTIONS --- */}
        {/* PD to Filter */}
        <line x1="220" y1="150" x2="330" y2="150" stroke="#334155" strokeWidth="2" />
        <circle cx="275" cy="150" r="3" fill="#334155" />
        <text x="275" y="140" textAnchor="middle" fill="#94a3b8" className="text-[10px] italic">v_e(t)</text>

        {/* Filter to VCO (Control Voltage) */}
        <path d="M430 150 L500 150 L500 320 L430 320" stroke="#334155" strokeWidth="2" fill="none" />
        <circle cx="500" cy="235" r="4" fill="#3b82f6" fillOpacity="0.8" />
        <text x="510" y="240" fill="#3b82f6" className="text-[10px] font-bold">Control Voltage e_o(t)</text>

        {/* Filter to Buffer */}
        <line x1="430" y1="150" x2="550" y2="150" stroke="#334155" strokeWidth="2" />

        {/* Buffer to Output */}
        <line x1="600" y1="150" x2="750" y2="150" stroke="#334155" strokeWidth="2.5" />
        <circle cx="750" cy="150" r="5" fill="#10b981" filter="url(#glow-pink)" />
        <text x="750" y="135" textAnchor="middle" fill="#10b981" className="text-[12px] font-bold">Demodulated O/P</text>

        {/* VCO Feedback Loop */}
        <path d="M330 320 L180 320 L180 190" stroke="#334155" strokeWidth="2" fill="none" />
        <text x="170" y="260" textAnchor="end" fill="#94a3b8" className="text-[10px] italic" transform="rotate(-90 170 260)">Feedback f_vco</text>

        {/* Labels at Junctions */}
        <text x="120" y="140" fill="#94a3b8" className="text-[9px]">A sin(ωt+θi)</text>
        <text x="185" y="300" fill="#94a3b8" className="text-[9px]">B cos(ωt+θv)</text>

      </svg>
      
      {/* Schematic Footer */}
      <div className="mt-6 flex justify-between items-end border-t border-slate-800 pt-6">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase italic opacity-50">Document: AC-PLL-SCHEMATIC-00X</p>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-500/50 to-transparent rounded-full" />
        </div>
        <div className="flex gap-4">
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
            <span className="text-[10px] text-pink-500 font-bold tracking-widest">LOCKED</span>
          </div>
          <div className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-md">
            <span className="text-[10px] text-cyan-500 font-bold tracking-widest">1.0 GHz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
