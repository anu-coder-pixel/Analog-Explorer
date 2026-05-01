import React from 'react';

export function AMDemodulatorCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#38bdf8] font-bold tracking-[0.2em] text-sm uppercase">
          Amplified AM Demodulator (Detector + Amplifier)
        </h4>
      </div>

      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto min-w-[700px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- RAILS --- */}
        {/* +5V Rail */}
        <line x1="450" y1="50" x2="600" y2="50" stroke="#334155" strokeWidth="2" />
        <circle cx="525" cy="50" r="4" fill="#38bdf8" />
        <text x="525" y="35" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">+5V</text>

        {/* Ground Symbols */}
        <g transform="translate(150, 360)">
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-7" y1="5" x2="7" y2="5" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-4" y1="10" x2="4" y2="10" stroke="#94a3b8" strokeWidth="2" />
        </g>
        <g transform="translate(250, 360)">
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-7" y1="5" x2="7" y2="5" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-4" y1="10" x2="4" y2="10" stroke="#94a3b8" strokeWidth="2" />
        </g>
        <g transform="translate(550, 360)">
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-7" y1="5" x2="7" y2="5" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-4" y1="10" x2="4" y2="10" stroke="#94a3b8" strokeWidth="2" />
        </g>

        {/* --- DETECTOR STAGE --- */}

        {/* AM Input */}
        <g transform="translate(50, 100)" filter="url(#glow-emerald)">
          <circle cx="0" cy="0" r="3" fill="#10b981" />
          <text x="10" y="-15" textAnchor="start" fill="#10b981" className="text-[12px] font-bold">AM INPUT</text>
          <line x1="0" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Diode D1 */}
        <g transform="translate(150, 100)" filter="url(#glow-orange)">
          <line x1="0" y1="0" x2="0" y2="30" stroke="#f97316" strokeWidth="2" />
          <path d="M-10 30 L10 30 L0 50 Z" fill="#f97316" />
          <line x1="-10" y1="50" x2="10" y2="50" stroke="#f97316" strokeWidth="3" />
          <text x="25" y="40" textAnchor="start" fill="#f97316" className="text-[11px] font-bold">D1</text>
          <text x="25" y="53" textAnchor="start" fill="#94a3b8" className="text-[9px]">1N4148</text>
          <line x1="0" y1="50" x2="0" y2="100" stroke="#334155" strokeWidth="2" />
        </g>

        {/* R1 Load Resistor */}
        <g transform="translate(150, 200)">
          <path d="M0 0 L5 10 L15 -10 L25 10 L35 -10 L45 10 L50 0" stroke="#3b82f6" strokeWidth="2" fill="none" transform="rotate(90 0 0) translate(-25, -25)" />
          <text x="-45" y="30" fill="#3b82f6" className="text-[11px] font-bold">R1</text>
          <text x="-45" y="43" fill="#94a3b8" className="text-[9px]">470K</text>
          <line x1="0" y1="50" x2="0" y2="160" stroke="#334155" strokeWidth="1" />
        </g>

        {/* C1 Filter Capacitor */}
        <g transform="translate(250, 200)">
          <line x1="-15" y1="15" x2="15" y2="15" stroke="#38bdf8" strokeWidth="2" />
          <line x1="-15" y1="20" x2="15" y2="20" stroke="#38bdf8" strokeWidth="2" />
          <text x="20" y="15" fill="#38bdf8" className="text-[11px] font-bold">C1</text>
          <text x="20" y="28" fill="#94a3b8" className="text-[9px]">0.01uF</text>
          <line x1="0" y1="-50" x2="0" y2="15" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="20" x2="0" y2="160" stroke="#334155" strokeWidth="1" />
        </g>

        {/* --- COUPLING STAGE --- */}

        {/* R2 Horizontal */}
        <g transform="translate(300, 150)">
          <path d="M0 0 L10 5 L15 -5 L25 5 L30 -5 L40 5 L50 0" stroke="#3b82f6" strokeWidth="2" fill="none" transform="scale(0.8)" />
          <text x="10" y="-15" textAnchor="middle" fill="#3b82f6" className="text-[11px] font-bold">R2</text>
          <text x="10" y="25" textAnchor="middle" fill="#94a3b8" className="text-[9px]">47K</text>
          <line x1="-150" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="40" y1="0" x2="60" y2="0" stroke="#334155" strokeWidth="1" />
        </g>

        {/* C2 Horizontal */}
        <g transform="translate(370, 150)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#38bdf8" strokeWidth="2" />
          <line x1="5" y1="-15" x2="5" y2="15" stroke="#38bdf8" strokeWidth="2" />
          <text x="2" y="-20" textAnchor="middle" fill="#38bdf8" className="text-[11px] font-bold">C2</text>
          <text x="2" y="30" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0.1uF</text>
          <line x1="5" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="1" />
        </g>

        {/* --- AMPLIFIER STAGE --- */}

        {/* Transistor T1 (BC548) */}
        <g transform="translate(550, 150)" filter="url(#glow-blue)">
          <circle cx="0" cy="0" r="30" stroke="#3b82f6" strokeWidth="2" fill="transparent" />
          {/* Base */}
          <line x1="-30" y1="0" x2="-12" y2="0" stroke="#3b82f6" strokeWidth="2" />
          <line x1="-12" y1="-12" x2="-12" y2="12" stroke="#3b82f6" strokeWidth="3" />
          {/* Collector */}
          <line x1="-12" y1="-8" x2="12" y2="-22" stroke="#3b82f6" strokeWidth="2" />
          <line x1="12" y1="-22" x2="12" y2="-30" stroke="#3b82f6" strokeWidth="2" />
          {/* Emitter */}
          <line x1="-12" y1="8" x2="12" y2="22" stroke="#3b82f6" strokeWidth="2" />
          <line x1="12" y1="22" x2="12" y2="30" stroke="#3b82f6" strokeWidth="2" />
          <path d="M8 18 L16 26 L12 16 Z" fill="#3b82f6" />
          <text x="35" y="0" fill="#3b82f6" className="text-[11px] font-bold">T1</text>
          <text x="35" y="12" fill="#94a3b8" className="text-[9px]">BC548</text>
        </g>

        {/* R3 Base Bias */}
        <g transform="translate(470, 100)">
          <path d="M0 0 L5 10 L15 -10 L25 10 L35 -10 L45 10 L50 0" stroke="#3b82f6" strokeWidth="2" fill="none" transform="rotate(90 0 0) translate(-25, -25)" />
          <text x="-25" y="30" fill="#3b82f6" className="text-[11px] font-bold">R3</text>
          <text x="-25" y="43" fill="#94a3b8" className="text-[9px]">1M</text>
          <line x1="0" y1="50" x2="0" y2="50" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <circle cx="0" cy="50" r="2.5" fill="#334155" />
          <line x1="0" y1="50" x2="55" y2="50" stroke="#334155" strokeWidth="1" />
        </g>

        {/* R4 Collector Resistor */}
        <g transform="translate(562, 100)">
          <path d="M0 0 L5 10 L15 -10 L25 10 L35 -10 L45 10 L50 0" stroke="#3b82f6" strokeWidth="2" fill="none" transform="rotate(90 0 0) translate(-25, -25)" />
          <text x="25" y="30" fill="#3b82f6" className="text-[11px] font-bold">R4</text>
          <text x="25" y="43" fill="#94a3b8" className="text-[9px]">1K</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="50" x2="0" y2="20" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Emitter to GND */}
        <line x1="562" y1="180" x2="562" y2="360" stroke="#334155" strokeWidth="1" />

        {/* --- OUTPUT STAGE --- */}

        {/* C3 Horizontal */}
        <g transform="translate(680, 120)">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#38bdf8" strokeWidth="2" />
          <line x1="5" y1="-15" x2="5" y2="15" stroke="#38bdf8" strokeWidth="2" />
          <text x="2" y="-20" textAnchor="middle" fill="#38bdf8" className="text-[11px] font-bold">C3</text>
          <text x="2" y="30" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0.1uF</text>
          <line x1="-118" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="5" y1="0" x2="70" y2="0" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Output Node */}
        <g transform="translate(750, 120)" filter="url(#glow-emerald)">
          <circle cx="0" cy="0" r="3" fill="#10b981" />
          <text x="10" y="-10" textAnchor="start" fill="#10b981" className="text-[11px] font-bold">MESSAGE WAVE</text>
          <text x="10" y="5" textAnchor="start" fill="#10b981" className="text-[11px] font-bold">OUTPUT</text>
        </g>

        {/* Connections */}
        <circle cx="150" y="100" r="3" fill="#334155" /> {/* Diode input node */}
        <circle cx="150" y="150" r="3" fill="#334155" /> {/* R1/C1 node */}
        <circle cx="250" y="150" r="3" fill="#334155" /> {/* C1/R2 node */}
        <circle cx="470" y="150" r="3" fill="#334155" /> {/* R3/Base node */}
        <circle cx="562" y="120" r="3" fill="#334155" /> {/* R4/Collector node */}
        <circle cx="525" cy="50" r="3" fill="#334155" /> {/* Vcc node */}

      </svg>
    </div>
  );
}
