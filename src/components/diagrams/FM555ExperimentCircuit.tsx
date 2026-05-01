import React from 'react';

export function FM555ExperimentCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-purple-500 font-bold tracking-[0.2em] text-sm uppercase">
          Lab Experiment: 555 Timer FM Modulator (VCO)
        </h4>
        <p className="text-slate-500 text-[10px] mt-1 tracking-widest">ASTABLE MULTIVIBRATOR SCHEMATIC</p>
      </div>

      <svg
        viewBox="0 0 800 500"
        className="w-full h-auto min-w-[700px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- 555 TIMER IC BODY --- */}
        <rect x="250" y="100" width="300" height="300" rx="10" stroke="#6366f1" strokeWidth="3" fill="#6366f1" fillOpacity="0.05" filter="url(#glow-purple)" />
        <text x="400" y="250" textAnchor="middle" fill="#6366f1" className="text-2xl font-black italic opacity-40 uppercase">NE555</text>

        {/* PINS LEFT */}
        {/* Pin 8: VCC */}
        <text x="235" y="135" textAnchor="end" fill="#94a3b8" className="text-[12px]">VCC (8)</text>
        <line x1="200" y1="130" x2="250" y2="130" stroke="#334155" strokeWidth="2" />
        
        {/* Pin 7: DISCH */}
        <text x="235" y="185" textAnchor="end" fill="#94a3b8" className="text-[12px]">DISCH (7)</text>
        <line x1="250" y1="180" x2="200" y2="180" stroke="#334155" strokeWidth="2" />

        {/* Pin 6: THRESH */}
        <text x="235" y="285" textAnchor="end" fill="#94a3b8" className="text-[12px]">THRESH (6)</text>
        <line x1="250" y1="280" x2="200" y2="280" stroke="#334155" strokeWidth="2" />

        {/* Pin 2: TRIG */}
        <text x="235" y="335" textAnchor="end" fill="#94a3b8" className="text-[12px]">TRIG (2)</text>
        <line x1="250" y1="330" x2="200" y2="330" stroke="#334155" strokeWidth="2" />

        {/* PINS RIGHT */}
        {/* Pin 4: RESET */}
        <text x="565" y="135" textAnchor="start" fill="#94a3b8" className="text-[12px]">(4) RESET</text>
        <line x1="500" y1="130" x2="550" y2="130" stroke="#334155" strokeWidth="2" />

        {/* Pin 3: OUT */}
        <text x="565" y="215" textAnchor="start" fill="#6366f1" className="text-[14px] font-bold">(3) OUT</text>
        <line x1="550" y1="210" x2="650" y2="210" stroke="#6366f1" strokeWidth="3" filter="url(#glow-purple)" />

        {/* Pin 5: CV */}
        <text x="565" y="315" textAnchor="start" fill="#a855f7" className="text-[14px] font-bold">(5) CV</text>
        <line x1="550" y1="310" x2="620" y2="310" stroke="#a855f7" strokeWidth="2.5" />

        {/* Pin 1: GND */}
        <text x="565" y="385" textAnchor="start" fill="#94a3b8" className="text-[12px]">(1) GND</text>
        <line x1="500" y1="380" x2="550" y2="380" stroke="#334155" strokeWidth="2" />

        {/* --- EXTERNAL COMPONENTS --- */}
        {/* Ra */}
        <g transform="translate(140, 130)">
          <path d="M0 0 L-10 10 L10 20 L-10 30 L10 40 L-10 50 L0 60" stroke="#6366f1" strokeWidth="2" fill="none" />
          <text x="-40" y="35" textAnchor="end" fill="#6366f1" className="text-[12px] font-bold">Ra (4.7k)</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="60" x2="0" y2="50" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="50" x2="60" y2="50" stroke="#334155" strokeWidth="1.5" />
        </g>
        
        {/* Rb */}
        <g transform="translate(140, 180)">
          <path d="M0 0 L-10 10 L10 20 L-10 30 L10 40 L-10 50 L0 60" stroke="#6366f1" strokeWidth="2" fill="none" />
          <text x="-40" y="35" textAnchor="end" fill="#6366f1" className="text-[12px] font-bold">Rb (4.7k)</text>
          <line x1="0" y1="60" x2="0" y2="100" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="100" x2="60" y2="100" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="100" x2="60" y2="150" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* C */}
        <g transform="translate(140, 330)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#a855f7" strokeWidth="3" />
          <line x1="-15" y1="10" x2="15" y2="10" stroke="#a855f7" strokeWidth="3" />
          <text x="-40" y="10" textAnchor="end" fill="#a855f7" className="text-[12px] font-bold">C (0.1μF)</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="10" x2="0" y2="50" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* --- CONNECTIONS --- */}
        {/* VCC Rail */}
        <line x1="140" y1="50" x2="600" y2="50" stroke="#334155" strokeWidth="2" />
        <circle cx="140" cy="50" r="3" fill="#334155" />
        <text x="610" y="55" fill="#ef4444" className="text-[12px] font-bold">+5V</text>
        
        {/* VCC to Pins 8 & 4 */}
        <line x1="200" y1="50" x2="200" y2="130" stroke="#334155" strokeWidth="1.5" />
        <line x1="600" y1="50" x2="600" y2="130" stroke="#334155" strokeWidth="1.5" />
        <line x1="600" y1="130" x2="550" y2="130" stroke="#334155" strokeWidth="1.5" />

        {/* GND Rail */}
        <line x1="100" y1="430" x2="700" y2="430" stroke="#334155" strokeWidth="2" />
        <g transform="translate(400, 430)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-10" y1="6" x2="10" y2="6" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-5" y1="12" x2="5" y2="12" stroke="#94a3b8" strokeWidth="2" />
        </g>
        <line x1="140" y1="390" x2="140" y2="430" stroke="#334155" strokeWidth="1.5" />
        <line x1="550" y1="380" x2="600" y2="380" stroke="#334155" strokeWidth="1.5" />
        <line x1="600" y1="380" x2="600" y2="430" stroke="#334155" strokeWidth="1.5" />

        {/* Input Message to Pin 5 */}
        <g transform="translate(680, 310)">
          <circle cx="0" cy="0" r="15" stroke="#a855f7" strokeWidth="2" />
          <path d="M-8 0 Q-4 -8 0 0 T8 0" stroke="#a855f7" strokeWidth="1.5" fill="none" />
          <text x="0" y="30" textAnchor="middle" fill="#a855f7" className="text-[12px] font-bold">m(t)</text>
          <line x1="-15" y1="0" x2="-60" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="15" x2="0" y2="120" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* Output Junction */}
        <circle cx="680" cy="210" r="5" fill="#6366f1" filter="url(#glow-purple)" />
        <text x="695" y="215" fill="#6366f1" className="text-[14px] font-bold">FM Output</text>

      </svg>
    </div>
  );
}
