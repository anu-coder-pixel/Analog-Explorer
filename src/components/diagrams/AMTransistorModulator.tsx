import React from 'react';

export function AMTransistorModulator() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#ec4899] font-bold tracking-[0.2em] text-sm uppercase">
          Transistor AM Modulator (Emitter Modulation)
        </h4>
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
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- RAILS --- */}
        {/* Top Vcc rail */}
        <line x1="300" y1="50" x2="500" y2="50" stroke="#334155" strokeWidth="2" />
        <circle cx="400" cy="50" r="4" fill="#ec4899" />
        <text x="400" y="35" textAnchor="middle" fill="#ec4899" className="text-sm font-bold">Vcc</text>

        {/* Bottom Ground Rail */}
        <line x1="100" y1="400" x2="700" y2="400" stroke="#334155" strokeWidth="2" />
        <g transform="translate(400, 400)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-10" y1="5" x2="10" y2="5" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-5" y1="10" x2="5" y2="10" stroke="#94a3b8" strokeWidth="2" />
          <text x="0" y="30" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-bold">GND</text>
        </g>

        {/* --- COMPONENTS --- */}

        {/* Transistor NPN */}
        <g transform="translate(400, 200)" filter="url(#glow-pink)">
          <circle cx="0" cy="0" r="35" stroke="#ec4899" strokeWidth="2" fill="transparent" />
          {/* Base */}
          <line x1="-35" y1="0" x2="-15" y2="0" stroke="#ec4899" strokeWidth="2" />
          <line x1="-15" y1="-15" x2="-15" y2="15" stroke="#ec4899" strokeWidth="3" />
          {/* Collector */}
          <line x1="-15" y1="-10" x2="15" y2="-25" stroke="#ec4899" strokeWidth="2" />
          <line x1="15" y1="-25" x2="15" y2="-35" stroke="#ec4899" strokeWidth="2" />
          {/* Emitter */}
          <line x1="-15" y1="10" x2="15" y2="25" stroke="#ec4899" strokeWidth="2" />
          <line x1="15" y1="25" x2="15" y2="35" stroke="#ec4899" strokeWidth="2" />
          {/* Arrow */}
          <path d="M10 22 L18 28 L14 18 Z" fill="#ec4899" />
        </g>

        {/* Biasing Resistors R1, R2 */}
        {/* R1 */}
        <g transform="translate(300, 100)">
          <path d="M0 0 L10 5 L-10 15 L10 25 L-10 35 L10 45 L0 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="-35" y="30" fill="#3b82f6" className="text-[12px] font-bold">R1</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="50" x2="0" y2="100" stroke="#334155" strokeWidth="1" />
        </g>
        {/* R2 */}
        <g transform="translate(300, 270)">
          <path d="M0 0 L10 5 L-10 15 L10 25 L-10 35 L10 45 L0 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="-35" y="30" fill="#3b82f6" className="text-[12px] font-bold">R2</text>
          <line x1="0" y1="50" x2="0" y2="130" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Collector Resistor Rc */}
        <g transform="translate(500, 100)">
          <path d="M0 0 L10 5 L-10 15 L10 25 L-10 35 L10 45 L0 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="25" y="30" fill="#3b82f6" className="text-[12px] font-bold">Rc</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="50" x2="0" y2="65" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Emitter Stage: Re, Signal, Ce */}
        {/* Re */}
        <g transform="translate(500, 280)">
          <path d="M0 0 L10 5 L-10 15 L10 25 L-10 35 L10 45 L0 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="25" y="30" fill="#3b82f6" className="text-[12px] font-bold">RE</text>
          <line x1="0" y1="-45" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
        </g>
        {/* Message Signal Source */}
        <g transform="translate(500, 360)" filter="url(#glow-cyan)">
          <circle cx="0" cy="0" r="15" stroke="#06b6d4" strokeWidth="2" />
          <path d="M-8 0 Q-4 -8 0 0 T8 0" stroke="#06b6d4" strokeWidth="1.5" fill="none" />
          <text x="22" y="5" fill="#06b6d4" className="text-[10px] font-bold">Signal</text>
          <line x1="0" y1="-30" x2="0" y2="-15" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="15" x2="0" y2="40" stroke="#334155" strokeWidth="1" />
        </g>
        {/* Ce Bypass */}
        <g transform="translate(630, 310)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#06b6d4" strokeWidth="2" />
          <line x1="-15" y1="5" x2="15" y2="5" stroke="#06b6d4" strokeWidth="2" />
          <text x="20" y="10" fill="#06b6d4" className="text-[12px] font-bold">CE</text>
          <line x1="0" y1="-75" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="5" x2="0" y2="90" stroke="#334155" strokeWidth="1" />
        </g>

        {/* --- INPUTS AND OUTPUTS --- */}

        {/* Carrier Input */}
        <g transform="translate(100, 300)" filter="url(#glow-blue)">
          <circle cx="0" cy="0" r="20" stroke="#3b82f6" strokeWidth="2" />
          <path d="M-10 0 Q-5 -10 0 0 T10 0" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
          <text x="-65" y="0" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-bold" transform="rotate(-90 -65 0)">Carrier Signal</text>
          <line x1="0" y1="-100" x2="0" y2="-20" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="20" x2="0" y2="100" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="-100" x2="150" y2="-100" stroke="#334155" strokeWidth="1" />
        </g>
        
        {/* Cin */}
        <g transform="translate(200, 200)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#06b6d4" strokeWidth="2" />
          <line x1="5" y1="-15" x2="5" y2="15" stroke="#06b6d4" strokeWidth="2" />
          <text x="0" y="35" textAnchor="middle" fill="#06b6d4" className="text-[11px] font-bold">Cin</text>
          <line x1="-50" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="5" y1="0" x2="165" y2="0" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Output Section */}
        {/* Cc */}
        <g transform="translate(630, 200)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#06b6d4" strokeWidth="2" />
          <line x1="5" y1="-15" x2="5" y2="15" stroke="#06b6d4" strokeWidth="2" />
          <text x="0" y="35" textAnchor="middle" fill="#06b6d4" className="text-[11px] font-bold">Cc</text>
          <line x1="-115" y1="-35" x2="-115" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="-115" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="5" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="1" />
        </g>
        {/* RL Load */}
        <g transform="translate(700, 270)">
          <path d="M0 0 L10 5 L-10 15 L10 25 L-10 35 L10 45 L0 50" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="25" y="30" fill="#3b82f6" className="text-[12px] font-bold">RL</text>
          <line x1="0" y1="-100" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="50" x2="0" y2="130" stroke="#334155" strokeWidth="1" />
        </g>
        {/* Output Label */}
        <g transform="translate(730, 200)" filter="url(#glow-pink)">
          <circle cx="0" cy="0" r="4" fill="#ec4899" />
          <text x="15" y="5" fill="#ec4899" className="text-[13px] font-bold">Vmod</text>
          <text x="15" y="25" fill="#94a3b8" className="text-[9px]">Modulated Output</text>
        </g>

        {/* Junctions */}
        <circle cx="300" cy="200" r="3" fill="#334155" /> {/* Base Bias junction */}
        <circle cx="415" cy="165" r="3" fill="#334155" /> {/* Collector junction */}
        <circle cx="415" cy="235" r="3" fill="#334155" /> {/* Emitter junction */}
        <circle cx="700" cy="200" r="3" fill="#334155" /> {/* Output junction */}
        <circle cx="500" cy="400" r="2.5" fill="#334155" /> {/* Ground junctions */}
        <circle cx="630" cy="400" r="2.5" fill="#334155" />
        <circle cx="700" cy="400" r="2.5" fill="#334155" />
        <circle cx="300" cy="50" r="2.5" fill="#334155" />
        <circle cx="500" cy="50" r="2.5" fill="#334155" />
        <circle cx="300" cy="400" r="2.5" fill="#334155" />

      </svg>
    </div>
  );
}
