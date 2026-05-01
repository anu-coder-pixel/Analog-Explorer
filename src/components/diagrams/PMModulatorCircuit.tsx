import React from 'react';

export const PMModulatorCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="600" height="400" viewBox="0 0 600 400" className="max-w-full h-auto">
        <defs>
          <symbol id="varactor" viewBox="0 0 40 40">
            <line x1="10" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="2.5"/>
            <polygon points="16,10 28,20 16,30" fill="currentColor" />
            <line x1="28" y1="10" x2="28" y2="30" stroke="currentColor" strokeWidth="2.5"/>
            <line x1="32" y1="10" x2="32" y2="30" stroke="currentColor" strokeWidth="2.5"/>
            <line x1="32" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="2.5"/>
          </symbol>
        </defs>

        <rect width="600" height="400" fill="#fafaf9" rx="8" />

        {/* --- Carrier Source --- */}
        <rect x="30" y="160" width="100" height="40" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
        <text x="40" y="185" className="text-[10px] font-bold fill-slate-700">Crystal Oscillator</text>
        <line x1="130" y1="180" x2="180" y2="180" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="135" y="170" className="text-[10px] fill-stone-500 italic">cos(ωct)</text>

        {/* --- Phase Shifter Network --- */}
        <rect x="180" y="140" width="240" height="120" rx="6" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="210" y="130" className="text-xs font-bold fill-sky-700">Voltage Variable Phase Shifter</text>
        
        {/* Internal bridge */}
        <line x1="180" y1="180" x2="230" y2="180" stroke="#444" strokeWidth="1.5" />
        
        {/* Inductor L1 */}
        <path d="M230,180 C230,170 240,170 240,180 S250,190 250,180 S260,170 260,180" 
              fill="none" stroke="#b45309" strokeWidth="2" transform="rotate(-90, 245, 180)" />
        <line x1="245" y1="180" x2="245" y2="210" stroke="#444" strokeWidth="1.5" />
        
        {/* Varactor Diode */}
        <use href="#varactor" x="225" y="210" width="40" height="40" className="text-blue-600" />
        <text x="260" y="245" className="text-[10px] fill-blue-700 font-bold">Varactor D1</text>
        <line x1="245" y1="250" x2="245" y2="300" stroke="#444" strokeWidth="1.5" />
        
        {/* --- Control Input --- */}
        <text x="230" y="325" className="text-sm font-bold fill-stone-800">m(t)</text>
        <line x1="260" y1="320" x2="300" y2="320" stroke="#444" strokeWidth="2" />
        <rect x="300" y="310" width="40" height="20" fill="none" stroke="#444" strokeWidth="1.5" />
        <text x="310" y="305" className="text-[10px] fill-stone-500">R_bias</text>
        <line x1="340" y1="320" x2="380" y2="320" stroke="#444" strokeWidth="2" />
        <line x1="380" y1="320" x2="380" y2="250" stroke="#444" strokeWidth="2" />
        <circle cx="380" cy="250" r="3" fill="#444" />
        <line x1="380" y1="250" x2="245" y2="250" stroke="#444" strokeWidth="2" />

        {/* --- Buffer Amp --- */}
        <line x1="420" y1="180" x2="460" y2="180" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <polygon points="460,160 500,180 460,200" fill="none" stroke="#10b981" strokeWidth="2" />
        <text x="455" y="215" className="text-xs font-bold fill-emerald-700">Buffer Amp</text>

        {/* --- Output --- */}
        <line x1="500" y1="180" x2="560" y2="180" stroke="#059669" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="505" y="170" className="text-sm font-bold fill-emerald-800">PM Output</text>
        <text x="510" y="200" className="text-[9px] fill-stone-500 font-mono">cos(ωct + Kp·m(t))</text>

        {/* Title */}
        <text x="180" y="380" className="text-md font-bold fill-stone-800">Phase Modulator Circuit (Varactor-based)</text>
      </svg>
    </div>
  );
};
