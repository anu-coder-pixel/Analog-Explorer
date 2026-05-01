import React from 'react';

export function FrequencyMixerCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#3b82f6] font-bold tracking-[0.2em] text-sm uppercase">
          Frequency Mixer (Up/Down Conversion)
        </h4>
      </div>

      <svg
        viewBox="0 0 800 300"
        className="w-full h-auto min-w-[700px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
           <filter id="glow-yellow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections */}
        <line x1="120" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="330" y1="120" x2="480" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="580" y1="120" x2="680" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="315" y1="135" x2="315" y2="200" stroke="#334155" strokeWidth="2" />

        {/* RF Input Circle */}
        <g filter="url(#glow-green)">
          <circle cx="80" cy="120" r="40" stroke="#10b981" strokeWidth="2" />
          <text x="80" y="115" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">RF Input</text>
          <text x="80" y="130" textAnchor="middle" fill="#10b981" className="text-[9px]">ωc (Carrier)</text>
        </g>

        {/* Mixer Multiplier Node */}
        <g transform="translate(300, 105)" filter="url(#glow-blue)">
          <circle cx="15" cy="15" r="15" fill="transparent" stroke="#3b82f6" strokeWidth="2" />
          <line x1="5" y1="5" x2="25" y2="25" stroke="#3b82f6" strokeWidth="2" />
          <line x1="25" y1="5" x2="5" y2="25" stroke="#3b82f6" strokeWidth="2" />
          <text x="15" y="-15" textAnchor="middle" fill="#3b82f6" className="text-[10px] font-extrabold uppercase tracking-widest">Mixer / Multiplier</text>
        </g>

        {/* Local Oscillator (LO) */}
        <g transform="translate(285, 200)" filter="url(#glow-yellow)">
          <rect x="0" y="0" width="60" height="40" rx="8" fill="transparent" stroke="#eab308" strokeWidth="2" />
          <text x="30" y="20" textAnchor="middle" fill="#eab308" className="text-[10px] font-bold">Local</text>
          <text x="30" y="32" textAnchor="middle" fill="#eab308" className="text-[10px] font-bold">Osc (LO)</text>
          <text x="30" y="55" textAnchor="middle" fill="#94a3b8" className="text-[9px]">ωmix Frequency</text>
        </g>

        {/* BPF Box */}
        <g filter="url(#glow-purple)">
          <rect x="480" y="95" width="100" height="50" rx="12" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2" />
          <text x="530" y="118" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Bandpass</text>
          <text x="530" y="132" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Filter (IF)</text>
          <text x="530" y="165" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Tuned at ωI</text>
        </g>

        {/* IF Output Circle */}
        <g filter="url(#glow-green)">
          <circle cx="720" cy="120" r="40" stroke="#10b981" strokeWidth="2" />
          <text x="720" y="115" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">IF Output</text>
          <text x="720" y="130" textAnchor="middle" fill="#10b981" className="text-[8px]">New Carrier ωI</text>
        </g>

        {/* Bottom Labels */}
        <text x="80" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">① Signal In</text>
        <text x="315" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">② Frequency Mixing</text>
        <text x="530" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">③ IF Extraction</text>
        <text x="720" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">④ Signalized Out</text>
      </svg>
    </div>
  );
}
