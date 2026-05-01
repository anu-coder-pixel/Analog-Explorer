import React from 'react';

export function AMDemodExperimentCircuit() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#10b981] font-bold tracking-[0.2em] text-sm uppercase">
          Lab Experiment: AM Demodulator (Envelope Detector)
        </h4>
        <p className="text-slate-500 text-[10px] mt-1 tracking-widest">DIODE-RC FILTER SCHEMATIC</p>
      </div>

      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto min-w-[600px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-green" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- INPUT --- */}
        <g transform="translate(80, 150)" filter="url(#glow-cyan)">
          <circle cx="0" cy="0" r="20" stroke="#06b6d4" strokeWidth="2" />
          {/* AM Waveform icon inside source */}
          <path d="M-10 0 Q-5 -15 0 0 T10 0" stroke="#06b6d4" strokeWidth="1" fill="none" />
          <path d="M-10 0 Q-5 15 0 0 T10 0" stroke="#06b6d4" strokeWidth="1" opacity="0.5" fill="none" />
          <text x="0" y="40" textAnchor="middle" fill="#06b6d4" className="text-[12px] font-bold">I/P AM Wave</text>
          <line x1="0" y1="-20" x2="0" y2="-60" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="20" x2="0" y2="100" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* --- DIODE --- */}
        <g transform="translate(250, 150)" filter="url(#glow-green)">
          <path d="M0 -20 L30 0 L0 20 Z" stroke="#10b981" strokeWidth="2.5" fill="#10b981" fillOpacity="0.2" />
          <line x1="30" y1="-20" x2="30" y2="20" stroke="#10b981" strokeWidth="3" />
          <text x="15" y="-30" textAnchor="middle" fill="#10b981" className="text-[12px] font-bold">D1 (1N4007)</text>
          <line x1="-150" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="30" y1="0" x2="150" y2="0" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* --- RC FILTER --- */}
        {/* R Shunt */}
        <g transform="translate(450, 200)">
          <path d="M0 0 L-10 10 L10 20 L-10 30 L10 40 L-10 50 L0 60" stroke="#10b981" strokeWidth="2" fill="none" />
          <text x="35" y="35" fill="#10b981" className="text-[12px] font-bold">R (10kΩ)</text>
          <line x1="0" y1="-50" x2="0" y2="0" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="60" x2="0" y2="140" stroke="#334155" strokeWidth="1.5" />
        </g>

        {/* C Shunt */}
        <g transform="translate(600, 200)">
          <line x1="-20" y1="25" x2="20" y2="25" stroke="#06b6d4" strokeWidth="3" />
          <line x1="-20" y1="35" x2="20" y2="35" stroke="#06b6d4" strokeWidth="3" />
          <text x="35" y="35" fill="#06b6d4" className="text-[12px] font-bold">C (1μF)</text>
          <line x1="0" y1="-50" x2="0" y2="25" stroke="#334155" strokeWidth="1.5" />
          <line x1="0" y1="35" x2="0" y2="140" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="-50" r="4" fill="#334155" />
        </g>

        {/* --- OUTPUT --- */}
        <line x1="600" y1="150" x2="750" y2="150" stroke="#334155" strokeWidth="1.5" />
        <circle cx="750" cy="150" r="5" fill="#10b981" filter="url(#glow-green)" />
        <text x="760" y="145" fill="#10b981" className="text-[14px] font-bold text-left">Demodulated Signal</text>

        {/* Ground Rail */}
        <line x1="50" y1="340" x2="700" y2="340" stroke="#334155" strokeWidth="2" />
        <g transform="translate(375, 340)">
          <line x1="-20" y1="0" x2="20" y2="0" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-12" y1="8" x2="12" y2="8" stroke="#94a3b8" strokeWidth="2" />
          <line x1="-6" y1="16" x2="6" y2="16" stroke="#94a3b8" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
