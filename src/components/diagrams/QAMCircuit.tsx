import React from 'react';

export const QAMCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="600" height="400" viewBox="0 0 600 400" className="max-w-full h-auto">
        <defs>
          <symbol id="multiplier" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="12" x2="28" y2="28" stroke="currentColor" strokeWidth="2"/>
            <line x1="28" y1="12" x2="12" y2="28" stroke="currentColor" strokeWidth="2"/>
          </symbol>
          <symbol id="summer" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="2"/>
          </symbol>
        </defs>

        <rect width="600" height="400" fill="#fafaf9" rx="8" />

        {/* --- Inputs --- */}
        <text x="30" y="85" className="text-sm font-bold fill-stone-800">m₁(t)</text>
        <line x1="70" y1="80" x2="150" y2="80" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <text x="30" y="285" className="text-sm font-bold fill-stone-800">m₂(t)</text>
        <line x1="70" y1="280" x2="150" y2="280" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* --- Modulators --- */}
        <use href="#multiplier" x="150" y="60" width="40" height="40" className="text-blue-600" />
        <text x="145" y="50" className="text-xs font-bold fill-blue-700">Balanced Mod 1</text>
        
        <use href="#multiplier" x="150" y="260" width="40" height="40" className="text-blue-600" />
        <text x="145" y="315" className="text-xs font-bold fill-blue-700">Balanced Mod 2</text>

        {/* --- Carrier Section --- */}
        <rect x="50" y="160" width="100" height="40" rx="4" fill="none" stroke="#444" strokeWidth="2" />
        <text x="65" y="185" className="text-xs font-bold fill-stone-700">Osc. cos(ωc·t)</text>
        
        <line x1="150" y1="180" x2="250" y2="180" stroke="#444" strokeWidth="2" />
        <circle cx="170" cy="180" r="3" fill="#444" />
        <line x1="170" y1="180" x2="170" y2="100" stroke="#444" strokeWidth="2" />
        <line x1="170" y1="100" x2="150" y2="100" stroke="#444" strokeWidth="2" />
        <line x1="150" y1="100" x2="150" y2="100" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* 90 degree shifter */}
        <rect x="250" y="150" width="60" height="60" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2" />
        <text x="260" y="180" className="text-xs font-bold fill-blue-700">-90°</text>
        <text x="255" y="225" className="text-[10px] fill-blue-600 italic">Phase Shifter</text>
        
        <line x1="310" y1="180" x2="340" y2="180" stroke="#444" strokeWidth="2" />
        <line x1="340" y1="180" x2="340" y2="280" stroke="#444" strokeWidth="2" />
        <line x1="340" y1="280" x2="190" y2="280" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="210" y="275" className="text-xs font-mono fill-stone-600">sin(ωc·t)</text>
        <text x="210" y="75" className="text-xs font-mono fill-stone-600">cos(ωc·t)</text>

        {/* --- Outputs to Summer --- */}
        <line x1="190" y1="80" x2="450" y2="80" stroke="#444" strokeWidth="2" />
        <line x1="450" y1="80" x2="450" y2="160" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <line x1="190" y1="280" x2="450" y2="280" stroke="#444" strokeWidth="2" />
        <line x1="450" y1="280" x2="450" y2="200" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Summing Junction */}
        <use href="#summer" x="430" y="160" width="40" height="40" className="text-green-600" />
        
        {/* Output */}
        <line x1="470" y1="180" x2="530" y2="180" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="480" y="170" className="text-sm font-bold fill-green-700">QAM Out</text>
        <text x="485" y="205" className="text-[9px] fill-stone-500 font-mono">m₁cos + m₂sin</text>

        <text x="200" y="370" className="text-md font-bold fill-stone-800 underline">Quadrature Amplitude Modulator Schematic</text>
      </svg>
    </div>
  );
};
