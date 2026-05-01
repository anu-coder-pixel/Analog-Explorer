import React from 'react';

export function AMExperimentCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#3b82f6] font-bold tracking-[0.2em] text-sm uppercase">
          Lab Experiment: Diode AM Modulator
        </h4>
        <p className="text-slate-500 text-[10px] mt-1 tracking-widest">REAL-TIME CIRCUIT SCHEMATIC</p>
      </div>

      <svg
        viewBox="0 0 800 450"
        className="w-full h-auto min-w-[700px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- SOURCES --- */}
        {/* V1 - Message */}
        <g transform="translate(80, 150)" filter="url(#glow-cyan)">
          <circle cx="0" cy="0" r="25" stroke="#06b6d4" strokeWidth="2.5" />
          <path d="M-12 0 Q-6 -12 0 0 T12 0" stroke="#06b6d4" strokeWidth="2" fill="none" />
          <text x="0" y="45" textAnchor="middle" fill="#06b6d4" className="text-[12px] font-bold">V1</text>
          <text x="0" y="60" textAnchor="middle" fill="#94a3b8" className="text-[9px]">2V, 1kHz</text>
          <line x1="0" y1="-25" x2="0" y2="-60" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="25" x2="0" y2="100" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* V2 - Carrier */}
        <g transform="translate(80, 300)" filter="url(#glow-blue)">
          <circle cx="0" cy="0" r="25" stroke="#3b82f6" strokeWidth="2.5" />
          <path d="M-15 0 L-10 -10 L0 10 L10 -10 L15 0" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="0" y="45" textAnchor="middle" fill="#3b82f6" className="text-[12px] font-bold">V2</text>
          <text x="0" y="60" textAnchor="middle" fill="#94a3b8" className="text-[9px]">4V, 20kHz</text>
          <line x1="0" y1="-25" x2="0" y2="-60" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="25" x2="0" y2="70" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* --- JUNCTIONS & MIXING --- */}
        {/* R3 */}
        <g transform="translate(180, 150)">
          <path d="M0 0 L10 -10 L20 10 L30 -10 L40 10 L50 -10 L60 0" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="30" y="-20" textAnchor="middle" fill="#3b82f6" className="text-[12px] font-bold">R3 (1k)</text>
          <line x1="-100" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="0" x2="120" y2="0" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* R4 */}
        <g transform="translate(180, 300)">
          <path d="M0 0 L10 -10 L20 10 L30 -10 L40 10 L50 -10 L60 0" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="30" y="-20" textAnchor="middle" fill="#3b82f6" className="text-[12px] font-bold">R4 (1k)</text>
          <line x1="-100" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="60" y1="0" x2="120" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="120" y1="0" x2="120" y2="-150" stroke="#334155" strokeWidth="1.5" />
        </g>

        <circle cx="280" cy="150" r="4" fill="#334155" /> {/* Summing junction */}

        {/* --- DIODE & FILTER --- */}
        {/* R1 Shunt */}
        <g transform="translate(350, 200)">
          <path d="M0 0 L-10 10 L10 20 L-10 30 L10 40 L-10 50 L0 60" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="35" y="35" fill="#3b82f6" className="text-[12px] font-bold">R1 (2.2k)</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="60" x2="0" y2="170" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* D1 Series */}
        <g transform="translate(420, 150)" filter="url(#glow-cyan)">
          <path d="M0 -20 L30 0 L0 20 Z" stroke="#06b6d4" strokeWidth="2.5" fill="#06b6d4" fillOpacity="0.2" />
          <line x1="30" y1="-20" x2="30" y2="20" stroke="#06b6d4" strokeWidth="3" />
          <text x="15" y="-30" textAnchor="middle" fill="#06b6d4" className="text-[12px] font-bold">D1</text>
          <line x1="-140" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="30" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* R2 Shunt */}
        <g transform="translate(520, 200)">
          <path d="M0 0 L-10 10 L10 20 L-10 30 L10 40 L-10 50 L0 60" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="35" y="35" fill="#3b82f6" className="text-[12px] font-bold">R2 (1k)</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="60" x2="0" y2="170" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* C1 Shunt */}
        <g transform="translate(620, 200)">
          <line x1="-20" y1="25" x2="20" y2="25" stroke="#06b6d4" strokeWidth="3" />
          <line x1="-20" y1="35" x2="20" y2="35" stroke="#06b6d4" strokeWidth="3" />
          <text x="35" y="35" fill="#06b6d4" className="text-[12px] font-bold">C1 (1μF)</text>
          <line x1="0" y1="-50" x2="0" y2="25" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="35" x2="0" y2="170" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* L1 Shunt */}
        <g transform="translate(720, 200)">
          <path d="M0 0 C15 0 15 15 0 15 C15 15 15 30 0 30 C15 30 15 45 0 45 C15 45 15 60 0 60" stroke="#06b6d4" strokeWidth="2.5" fill="none" />
          <text x="35" y="35" fill="#06b6d4" className="text-[12px] font-bold">L1 (1mH)</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="60" x2="0" y2="170" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* --- RAILS --- */}
        {/* Output Junction */}
        <circle cx="750" cy="150" r="5" fill="#3b82f6" />
        <line x1="520" y1="150" x2="800" y2="150" stroke="#334155" strokeWidth="1.5" />
        <text x="760" y="140" fill="#3b82f6" className="text-[14px] font-bold">AM Output</text>

        {/* Ground Rail */}
        <line x1="50" y1="370" x2="750" y2="370" stroke="#334155" strokeWidth="2" />
        <g transform="translate(400, 370)">
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-12" y1="8" x2="12" y2="8" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-6" y1="16" x2="6" y2="16" stroke="#94a3b8" strokeWidth="2" />
        </g>

        {/* Source Grounds */}
        <g transform="translate(80, 250)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="-10" y1="5" x2="10" y2="5" stroke="#334155" strokeWidth="1.5" />
          <line x1="-5" y1="10" x2="5" y2="10" stroke="#334155" strokeWidth="1.5" />
        </g>
        <g transform="translate(80, 370)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="-10" y1="5" x2="10" y2="5" stroke="#334155" strokeWidth="1.5" />
          <line x1="-5" y1="10" x2="5" y2="10" stroke="#334155" strokeWidth="1.5" />
        </g>

      </svg>
    </div>
  );
}
