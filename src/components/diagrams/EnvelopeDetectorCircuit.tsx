import React from 'react';

export function EnvelopeDetectorCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#10b981] font-bold tracking-[0.2em] text-sm uppercase">
          Envelope Detector (AM Demodulator)
        </h4>
      </div>

      <svg
        viewBox="0 0 800 240"
        className="w-full h-auto min-w-[700px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Horizontal Lines (Wires) */}
        {/* Main path */}
        <line x1="120" y1="120" x2="250" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="280" y1="120" x2="355" y2="120" stroke="#f97316" strokeWidth="2" />
        <line x1="365" y1="120" x2="455" y2="120" stroke="#38bdf8" strokeWidth="2" />
        <line x1="455" y1="120" x2="520" y2="120" stroke="#334155" strokeWidth="2" />
        <line x1="640" y1="120" x2="680" y2="120" stroke="#334155" strokeWidth="2" />

        {/* Lower ground path */}
        <line x1="240" y1="180" x2="520" y2="180" stroke="#334155" strokeWidth="2" />
        <line x1="520" y1="180" x2="580" y2="180" stroke="#334155" strokeWidth="1" />

        {/* Vertical lines to Ground/Components */}
        <line x1="360" y1="120" x2="360" y2="180" stroke="#38bdf8" strokeWidth="2" />
        <line x1="520" y1="120" x2="520" y2="180" stroke="#a855f7" strokeWidth="2" />

        {/* Input Circle */}
        <g filter="url(#glow-green)">
          <circle cx="80" cy="120" r="40" stroke="#10b981" strokeWidth="2" />
          <text x="80" y="115" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">s(t)</text>
          <text x="80" y="130" textAnchor="middle" fill="#10b981" className="text-[9px]">AM Input</text>
        </g>

        {/* Diode */}
        <g transform="translate(250, 105)" filter="url(#glow-orange)">
          <path d="M0 0 L25 15 L0 30 Z" fill="#f97316" />
          <line x1="25" y1="0" x2="25" y2="30" stroke="#f97316" strokeWidth="3" />
          <text x="12" y="45" textAnchor="middle" fill="#f97316" className="text-[10px] font-bold">Diode (D)</text>
          <text x="12" y="58" textAnchor="middle" fill="#94a3b8" className="text-[8px]">Half-wave rectifier</text>
        </g>

        {/* Capacitor */}
        <g transform="translate(345, 100)" filter="url(#glow-blue)">
          <line x1="0" y1="20" x2="30" y2="20" stroke="#38bdf8" strokeWidth="3" />
          <line x1="0" y1="25" x2="30" y2="25" stroke="#38bdf8" strokeWidth="3" />
          <text x="45" y="27" textAnchor="start" fill="#38bdf8" className="text-[10px] font-bold">C</text>
          <text x="45" y="40" textAnchor="start" fill="#94a3b8" className="text-[8px]">Capacitor</text>
        </g>

        {/* Resistor */}
        <g transform="translate(510, 105)" filter="url(#glow-purple)">
          <rect x="-10" y="15" width="20" height="40" rx="4" fill="transparent" stroke="#a855f7" strokeWidth="2" />
          <text x="25" y="40" textAnchor="start" fill="#a855f7" className="text-[10px] font-bold">R</text>
          <text x="25" y="53" textAnchor="start" fill="#94a3b8" className="text-[8px]">Resistor</text>
        </g>

        {/* Low Pass Filter Box */}
        <g filter="url(#glow-blue)">
          <rect x="580" y="95" width="100" height="50" rx="12" fill="#1e40af" stroke="#3b82f6" strokeWidth="2" />
          <text x="630" y="118" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Low Pass</text>
          <text x="630" y="132" textAnchor="middle" fill="#fff" className="text-[10px] font-bold">Filter</text>
        </g>

        {/* Output Circle */}
        <g filter="url(#glow-green)">
          <circle cx="720" cy="120" r="40" stroke="#10b981" strokeWidth="2" />
          <text x="720" y="115" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold">m(t)</text>
          <text x="720" y="130" textAnchor="middle" fill="#10b981" className="text-[8px]">Recovered Message</text>
        </g>

        {/* Ground Symbol */}
        <g transform="translate(360, 180)">
          <line x1="-15" y1="0" x2="15" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-10" y1="5" x2="10" y2="5" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-5" y1="10" x2="5" y2="10" stroke="#94a3b8" strokeWidth="2" />
          <text x="0" y="30" textAnchor="middle" fill="#94a3b8" className="text-[10px] uppercase tracking-wider">GND</text>
        </g>

        {/* Horizontal line between C and R top */}
        <line x1="360" y1="65" x2="520" y2="65" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />

        {/* Bottom Labels */}
        <text x="80" y="215" textAnchor="middle" fill="#94a3b8" className="text-[9px]">① AM In</text>
        <text x="262" y="215" textAnchor="middle" fill="#94a3b8" className="text-[9px]">② Rectify</text>
        <text x="440" y="215" textAnchor="middle" fill="#94a3b8" className="text-[9px]">③ RC Smoothing</text>
        <text x="630" y="215" textAnchor="middle" fill="#94a3b8" className="text-[9px]">④ LPF</text>
        <text x="720" y="215" textAnchor="middle" fill="#94a3b8" className="text-[9px]">⑤ m(t) Out</text>
      </svg>
    </div>
  );
}
