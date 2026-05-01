import React from 'react';

export function DSBSCCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#f97316] font-bold tracking-[0.2em] text-sm uppercase">
          DSB-SC Modulator (Double Sideband Suppressed Carrier)
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
           <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connections */}
        <line x1="120" y1="120" x2="300" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="330" y1="120" x2="480" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="580" y1="120" x2="680" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="315" y1="135" x2="315" y2="200" stroke="#334155" strokeWidth="2" />

        {/* Message Input Circle */}
        <g filter="url(#glow-green)">
          <circle cx="80" cy="120" r="40" stroke="#10b981" strokeWidth="2" />
          <text x="80" y="115" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">m(t)</text>
          <text x="80" y="130" textAnchor="middle" fill="#10b981" className="text-[9px]">Baseband Message</text>
        </g>

        {/* Multiplier / Balanced Modulator */}
        <g transform="translate(300, 105)" filter="url(#glow-blue)">
          <circle cx="15" cy="15" r="15" fill="transparent" stroke="#3b82f6" strokeWidth="2" />
          <line x1="5" y1="5" x2="25" y2="25" stroke="#3b82f6" strokeWidth="2" />
          <line x1="25" y1="5" x2="5" y2="25" stroke="#3b82f6" strokeWidth="2" />
          <text x="15" y="-15" textAnchor="middle" fill="#3b82f6" className="text-[9px] font-extrabold uppercase tracking-widest text-center">Balanced Multiplier</text>
        </g>

        {/* Carrier Input */}
        <g transform="translate(265, 200)" filter="url(#glow-orange)">
          <circle cx="50" cy="20" r="20" stroke="#f97316" strokeWidth="2" />
          <path d="M40 20 Q50 0 60 20 T80 20" stroke="#f97316" strokeWidth="1.5" fill="none" transform="translate(-15,0)"/>
          <text x="50" y="55" textAnchor="middle" fill="#f97316" className="text-[10px] font-bold">Ac cos(ωc t)</text>
          <text x="50" y="68" textAnchor="middle" fill="#94a3b8" className="text-[8px]">RFC Loop / Carrier</text>
        </g>

        {/* BPF Box */}
        <g filter="url(#glow-purple)">
          <rect x="480" y="95" width="100" height="50" rx="12" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2" />
          <text x="530" y="118" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Bandpass</text>
          <text x="530" y="132" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Filter</text>
          <text x="530" y="165" textAnchor="middle" fill="#94a3b8" className="text-[9px]">Eliminates Harmonics</text>
        </g>

        {/* DSB-SC Output Circle */}
        <g filter="url(#glow-green)">
          <circle cx="720" cy="120" r="40" stroke="#10b981" strokeWidth="2" />
          <text x="720" y="115" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">φ_DSB(t)</text>
          <text x="720" y="130" textAnchor="middle" fill="#10b981" className="text-[8px]">Suppressed Carrier</text>
        </g>

        {/* Bottom Labels */}
        <text x="80" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">① Message Signal</text>
        <text x="315" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">② Product Modulation</text>
        <text x="530" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">③ Harmonic Filtering</text>
        <text x="720" y="270" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">④ DSB-SC Out</text>
      </svg>
    </div>
  );
}
