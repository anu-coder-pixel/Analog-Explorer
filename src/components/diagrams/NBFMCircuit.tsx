import React from 'react';

export const NBFMCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="600" height="400" viewBox="0 0 600 400" className="max-w-full h-auto">
        <defs>
          <symbol id="multiplier-nb" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="12" x2="28" y2="28" stroke="currentColor" strokeWidth="2"/>
            <line x1="28" y1="12" x2="12" y2="28" stroke="currentColor" strokeWidth="2"/>
          </symbol>
          <symbol id="opamp" viewBox="0 0 40 40">
            <polygon points="5,5 35,20 5,35" fill="none" stroke="currentColor" strokeWidth="2"/>
            <text x="7" y="15" className="text-[8px] fill-stone-400 font-bold">-</text>
            <text x="7" y="28" className="text-[8px] fill-stone-400 font-bold">+</text>
          </symbol>
        </defs>

        <rect width="600" height="400" fill="#fafaf9" rx="8" />

        {/* --- Input Section --- */}
        <text x="20" y="65" className="text-sm font-bold fill-stone-800">m(t)</text>
        <line x1="50" y1="60" x2="100" y2="60" stroke="#444" strokeWidth="2" />
        
        {/* Integrator Stage */}
        <rect x="100" y="30" width="100" height="60" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="115" y="65" className="text-xs font-bold fill-red-700">Integrator</text>
        <text x="110" y="80" className="text-[10px] fill-red-600 italic">∫m(t)dt</text>
        
        <line x1="200" y1="60" x2="250" y2="60" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="205" y="55" className="text-[10px] fill-stone-500 italic">k·∫m(t)</text>

        {/* --- Balanced Modulator --- */}
        <use href="#multiplier-nb" x="250" y="40" width="40" height="40" className="text-blue-600" />
        <text x="235" y="30" className="text-xs font-bold fill-blue-700">Balanced Modulator</text>
        
        {/* --- Carrier Section --- */}
        <rect x="150" y="180" width="100" height="40" rx="4" fill="none" stroke="#444" strokeWidth="2" />
        <text x="165" y="205" className="text-xs font-bold fill-stone-700">Osc. cos(ωc·t)</text>
        
        <line x1="250" y1="200" x2="350" y2="200" stroke="#444" strokeWidth="2" />
        <circle cx="270" cy="200" r="3" fill="#444" />
        
        {/* Phase Shifter */}
        <line x1="270" y1="200" x2="270" y2="130" stroke="#444" strokeWidth="2" />
        <rect x="240" y="90" width="60" height="40" rx="4" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="250" y="115" className="text-xs font-bold fill-sky-700">-90° Shift</text>
        <line x1="270" y1="90" x2="270" y2="80" stroke="#444" strokeWidth="2" />

        {/* --- Adder Section --- */}
        <line x1="290" y1="60" x2="400" y2="60" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <line x1="350" y1="200" x2="350" y2="100" stroke="#444" strokeWidth="2" />
        <line x1="350" y1="100" x2="400" y2="100" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="355" y="115" className="text-[10px] fill-stone-500 italic">Carrier Component</text>

        {/* Summing Summer */}
        <rect x="400" y="50" width="80" height="70" rx="4" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
        <text x="415" y="90" className="text-sm font-bold fill-green-700">Σ Summer</text>
        
        {/* Output */}
        <line x1="480" y1="85" x2="540" y2="85" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="490" y="75" className="text-sm font-bold fill-green-700">NBFM Out</text>
        <text x="485" y="110" className="text-[9px] fill-stone-500 font-mono">cos(ωct) - βsin(ωmt)sin(ωct)</text>

        {/* Circuit Details */}
        <text x="150" y="370" className="text-md font-bold fill-stone-800 underline">Armstrong Indirect NBFM Modulator</text>
        
        {/* Phase Shifter detail */}
        <path d="M260,110 L280,110" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="2,2" />
      </svg>
    </div>
  );
};
