import React from 'react';

export function PhaseShiftSSBCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-6 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-6">
        <h4 className="text-[#8b5cf6] font-bold tracking-[0.2em] text-xs uppercase">
          Detailed SSB Modulator (Phase-Shift Method)
        </h4>
      </div>

      <svg
        viewBox="0 0 1000 650"
        className="w-full h-auto min-w-[950px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- GRID / RAILS --- */}
        <g opacity="0.1">
          <line x1="0" y1="50" x2="1000" y2="50" stroke="#94a3b8" strokeWidth="1" />
          <line x1="0" y1="600" x2="1000" y2="600" stroke="#94a3b8" strokeWidth="1" />
        </g>

        {/* --- INPUT MODULES --- */}
        
        {/* MESSAGE Generator */}
        <g transform="translate(40, 60)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          <circle cx="35" cy="25" r="10" fill="#ef4444" />
          <text x="35" y="-10" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">MESSAGE</text>
          <line x1="70" y1="25" x2="100" y2="25" stroke="#475569" strokeWidth="1.5" />
        </g>

        {/* CARRIER Generator */}
        <g transform="translate(250, 150)">
          <rect x="0" y="0" width="70" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          <circle cx="35" cy="25" r="10" fill="#ef4444" />
          <text x="35" y="-10" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">CARRIER</text>
          <line x1="70" y1="25" x2="110" y2="25" stroke="#475569" strokeWidth="1.5" />
        </g>

        {/* --- WIDEBAND 90 PHASE SHIFTER (U3 Stage) --- */}
        <g transform="translate(180, 450)">
          <text x="0" y="-80" textAnchor="middle" fill="#8b5cf6" className="text-[10px] font-bold">WIDEBAND 90° PHASE SHIFTER</text>
          
          {/* Op Amp U3 (LF351N) */}
          <path d="M40 0 L80 25 L40 50 Z" stroke="#8b5cf6" strokeWidth="2" fill="#0f172a" filter="url(#glow-purple)" />
          <text x="52" y="30" fill="#8b5cf6" className="text-[9px] font-bold">U3</text>
          <text x="45" y="65" fill="#94a3b8" className="text-[8px]">LF351N</text>

          {/* U3 Passive Components */}
          {/* R9 */}
          <g transform="translate(-10, 25)">
            <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
            <text x="15" y="-10" textAnchor="middle" fill="#94a3b8" className="text-[8px]">R9 10k</text>
            <line x1="-30" y1="0" x2="0" y2="0" stroke="#475569" />
          </g>
          {/* R16 Feedback */}
          <g transform="translate(40, -40)">
            <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
            <text x="15" y="-10" textAnchor="middle" fill="#94a3b8" className="text-[8px]">R16 10k</text>
            <line x1="-15" y1="0" x2="0" y2="0" stroke="#475569" />
            <line x1="30" y1="0" x2="55" y2="0" stroke="#475569" />
            <line x1="-15" y1="0" x2="-15" y2="50" stroke="#475569" />
            <line x1="55" y1="0" x2="55" y2="65" stroke="#475569" />
          </g>
          {/* R17 and C11 */}
          <g transform="translate(-10, 60)">
             <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
             <text x="15" y="15" textAnchor="middle" fill="#94a3b8" className="text-[8px]">R17 1.59k</text>
             <line x1="-30" y1="0" x2="0" y2="0" stroke="#475569" />
             <line x1="-30" y1="-35" x2="-30" y2="0" stroke="#475569" />
             <g transform="translate(15, 20)">
                <line x1="-8" y1="5" x2="8" y2="5" stroke="#38bdf8" strokeWidth="2" />
                <line x1="-8" y1="10" x2="8" y2="10" stroke="#38bdf8" strokeWidth="2" />
                <text x="12" y="12" fill="#94a3b8" className="text-[8px]">C11 10nF</text>
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#475569" />
                <line x1="0" y1="10" x2="0" y2="30" stroke="#475569" />
             </g>
          </g>
          
          <line x1="80" y1="25" x2="150" y2="25" stroke="#475569" strokeWidth="1.5" />
        </g>

        {/* --- CARRIER 90 PHASE SHIFTER (RC Network) --- */}
        <g transform="translate(360, 150)">
          <text x="40" y="-20" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-bold uppercase tracking-tight">90° Phase Shifter</text>
          {/* C4, R3, R8, C8 */}
          <line x1="0" y1="25" x2="30" y2="25" stroke="#475569" />
          <g transform="translate(35, 15)">
            <line x1="0" y1="0" x2="0" y2="15" stroke="#38bdf8" strokeWidth="2" />
            <line x1="5" y1="0" x2="5" y2="15" stroke="#38bdf8" strokeWidth="2" />
            <text x="8" y="5" fill="#94a3b8" className="text-[7px]">C4 0.1uF</text>
            <line x1="-35" y1="10" x2="0" y2="10" stroke="#475569" />
          </g>
          <g transform="translate(50, 25)">
             <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
             <text x="15" y="-10" textAnchor="middle" fill="#94a3b8" className="text-[8px]">R3 15.92k</text>
          </g>
          <line x1="80" y1="25" x2="100" y2="25" stroke="#475569" />
          
          <g transform="translate(45, 120)">
             <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
             <text x="15" y="-10" textAnchor="middle" fill="#94a3b8" className="text-[8px]">R8 15.92k</text>
             <line x1="-45" y1="0" x2="0" y2="0" stroke="#475569" />
             <line x1="-45" y1="-95" x2="-45" y2="0" stroke="#475569" />
             <line x1="30" y1="0" x2="50" y2="0" stroke="#475569" />
             <g transform="translate(60, -10)">
               <line x1="0" y1="0" x2="0" y2="15" stroke="#38bdf8" strokeWidth="2" />
               <line x1="5" y1="0" x2="5" y2="15" stroke="#38bdf8" strokeWidth="2" />
               <text x="8" y="5" fill="#94a3b8" className="text-[7px]">C8 0.1uF</text>
               <line x1="2.5" y1="15" x2="2.5" y2="40" stroke="#475569" />
             </g>
          </g>
        </g>

        {/* --- DSB-SC MODULATORS (Multiplier IC AD633) --- */}

        {/* U1 Modulator */}
        <g transform="translate(550, 100)">
          <rect x="0" y="0" width="100" height="80" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2" filter="url(#glow-purple)" />
          <text x="50" y="30" textAnchor="middle" fill="#a855f7" className="text-[9px] font-bold uppercase tracking-widest">DSB-SC</text>
          <text x="50" y="45" textAnchor="middle" fill="#a855f7" className="text-[10px] font-bold">AD633</text>
          <text x="50" y="95" textAnchor="middle" fill="#94a3b8" className="text-[9px] font-bold">U1</text>
          
          {/* Pins */}
          <text x="10" y="15" fill="#475569" className="text-[7px]">X1</text>
          <text x="10" y="30" fill="#475569" className="text-[7px]">X2</text>
          <text x="10" y="45" fill="#475569" className="text-[7px]">Y1</text>
          <text x="10" y="60" fill="#475569" className="text-[7px]">Y2</text>
          <text x="80" y="15" fill="#475569" className="text-[7px]">Z</text>
          <text x="80" y="30" fill="#475569" className="text-[7px]">W</text>
          
          {/* External R4, R5, C3 bypass */}
          <g transform="translate(110, 20)">
            <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.2" fill="none" transform="rotate(90 15 0)" />
            <text x="10" y="10" fill="#94a3b8" className="text-[7px]">R4 1k</text>
            <path d="M0 40 L5 45 L10 35 L15 45 L20 35 L25 45 L30 40" stroke="#3b82f6" strokeWidth="1.2" fill="none" transform="rotate(90 15 40)" />
            <text x="10" y="50" fill="#94a3b8" className="text-[7px]">R5 1k</text>
            <line x1="15" y1="-10" x2="15" y2="80" stroke="#475569" strokeWidth="1" />
          </g>
          {/* C3 */}
          <g transform="translate(85, 50)">
             <line x1="0" y1="0" x2="10" y2="0" stroke="#38bdf8" strokeWidth="2" />
             <line x1="0" y1="3" x2="10" y2="3" stroke="#38bdf8" strokeWidth="2" />
             <text x="15" y="3" fill="#94a3b8" className="text-[7px]">C3 0.1uF</text>
          </g>
        </g>

        {/* U2 Modulator */}
        <g transform="translate(550, 300)">
          <rect x="0" y="0" width="100" height="80" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="2" filter="url(#glow-purple)" />
          <text x="50" y="30" textAnchor="middle" fill="#a855f7" className="text-[9px] font-bold uppercase tracking-widest">DSB-SC</text>
          <text x="50" y="45" textAnchor="middle" fill="#a855f7" className="text-[10px] font-bold">AD633</text>
          <text x="50" y="95" textAnchor="middle" fill="#94a3b8" className="text-[9px] font-bold">U2</text>

          {/* External R6, R7, C7 */}
          <g transform="translate(110, 20)">
            <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.2" fill="none" transform="rotate(90 15 0)" />
            <text x="10" y="15" fill="#94a3b8" className="text-[7px]">R6 1k</text>
            <path d="M0 40 L5 45 L10 35 L15 45 L20 35 L25 45 L30 40" stroke="#3b82f6" strokeWidth="1.2" fill="none" transform="rotate(90 15 40)" />
            <text x="10" y="55" fill="#94a3b8" className="text-[7px]">R7 1k</text>
            <line x1="15" y1="-10" x2="15" y2="80" stroke="#475569" strokeWidth="1" />
          </g>
        </g>

        {/* --- COMBINER STAGES (Adder and Subtractor) --- */}

        {/* Switch Selector */}
        <g transform="translate(730, 200)">
          <rect x="-10" y="0" width="20" height="150" rx="4" fill="#1e293b" stroke="#475569" />
          <circle cx="0" cy="20" r="4" fill="#ef4444" />
          <circle cx="0" cy="130" r="4" fill="#ef4444" />
          <line x1="0" y1="20" x2="0" y2="130" stroke="#f1f5f9" strokeDasharray="3,3" />
        </g>

        {/* Adder Stage U4 (LF351N) */}
        <g transform="translate(800, 100)">
          <path d="M40 0 L80 25 L40 50 Z" stroke="#3b82f6" strokeWidth="2" fill="#0f172a" filter="url(#glow-blue)" />
          <text x="52" y="30" fill="#3b82f6" className="text-[9px] font-bold">U4</text>
          <text x="45" y="-15" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-bold uppercase">Adder</text>
          
          <line x1="-70" y1="25" x2="40" y2="25" stroke="#475569" />
          <line x1="80" y1="25" x2="130" y2="25" stroke="#475569" strokeWidth="1.5" />
          
          <g transform="translate(10, -30)">
             <path d="M0 0 L5 5 L10 -5 L15 5 L20 -5 L25 5 L30 0" stroke="#3b82f6" strokeWidth="1.2" fill="none" />
             <text x="15" y="-8" textAnchor="middle" fill="#94a3b8" className="text-[7px]">R10 10k</text>
          </g>
        </g>

        {/* Subtractor Stage U5 (LF351N) */}
        <g transform="translate(800, 350)">
          <path d="M40 0 L80 25 L40 50 Z" stroke="#3b82f6" strokeWidth="2" fill="#0f172a" filter="url(#glow-blue)" />
          <text x="52" y="30" fill="#3b82f6" className="text-[9px] font-bold">U5</text>
          <text x="45" y="70" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-bold uppercase">Subtractor</text>
          
          <line x1="-70" y1="25" x2="40" y2="25" stroke="#475569" />
          <line x1="80" y1="25" x2="130" y2="25" stroke="#475569" strokeWidth="1.5" />
        </g>

        {/* --- ROUTING LINES (All as it is) --- */}
        
        {/* Message Signal Routing */}
        <line x1="110" y1="85" x2="530" y2="85" stroke="#475569" strokeWidth="1.2" />
        <line x1="110" y1="85" x2="110" y2="475" stroke="#475569" strokeWidth="1.2" />
        <line x1="110" y1="475" x2="150" y2="475" stroke="#475569" strokeWidth="1.2" />
        
        {/* Carrier Signal Routing */}
        <line x1="320" y1="175" x2="360" y2="175" stroke="#475569" strokeWidth="1.2" />
        <line x1="490" y1="175" x2="530" y2="175" stroke="#475569" strokeWidth="1.2" />
        <line x1="420" y1="270" x2="530" y2="270" stroke="#475569" strokeWidth="1.2" />

        {/* DSB-SC Outputs to Switch */}
        <line x1="650" y1="140" x2="730" y2="140" stroke="#475569" strokeWidth="1.4" />
        <line x1="650" y1="340" x2="730" y2="340" stroke="#475569" strokeWidth="1.4" />

        {/* Final Modulated Outputs */}
        <g transform="translate(950, 125)" filter="url(#glow-emerald)">
          <circle cx="0" cy="0" r="4" fill="#10b981" />
          <text x="10" y="5" fill="#10b981" className="text-[10px] font-bold uppercase">SSB Output</text>
        </g>

        {/* Junctions */}
        <circle cx="110" cy="85" r="3" fill="#475569" />
        <circle cx="530" cy="115" r="2.5" fill="#475569" />
        <circle cx="530" y="315" r="2.5" fill="#475569" />

      </svg>
    </div>
  );
}
