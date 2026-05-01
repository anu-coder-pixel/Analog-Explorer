import React from 'react';

export const FMDemodulatorCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="650" height="400" viewBox="0 0 650 400" className="max-w-full h-auto">
        <defs>
          <symbol id="diode-demo" viewBox="0 0 40 40">
            <line x1="5" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="2.5"/>
            <polygon points="15,10 30,20 15,30" fill="currentColor" />
            <line x1="30" y1="10" x2="30" y2="30" stroke="currentColor" strokeWidth="2.5"/>
            <line x1="30" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2.5"/>
          </symbol>
        </defs>

        <rect width="650" height="400" fill="#fafaf9" rx="8" />

        {/* --- Input Transformer --- */}
        <text x="20" y="205" className="text-sm font-bold fill-stone-800">FM Input</text>
        <line x1="80" y1="200" x2="110" y2="200" stroke="#444" strokeWidth="2" />
        
        {/* Primary */}
        <path d="M120,160 C110,160 110,170 120,170 S130,180 120,180 S110,190 120,190 S130,200 120,200 S110,210 120,210 S130,220 120,220 S110,230 120,230 S130,240 120,240" 
              fill="none" stroke="#444" strokeWidth="2" />
        
        {/* Transformer core */}
        <line x1="140" y1="150" x2="140" y2="250" stroke="#94a3b8" strokeWidth="1" />
        <line x1="145" y1="150" x2="145" y2="250" stroke="#94a3b8" strokeWidth="1" />

        {/* Secondary (Center-tapped) */}
        <path d="M165,130 C175,130 175,140 165,140 S155,150 165,150 S175,160 165,160 S155,170 165,170 S175,180 165,180 S155,190 165,190 S175,200 165,200 S155,210 165,210 S175,220 165,220 S155,230 165,230 S175,240 165,240 S155,250 165,250 S175,260 165,260 S155,270 165,270" 
              fill="none" stroke="#444" strokeWidth="2" />
        
        {/* Center Tap GND */}
        <line x1="170" y1="200" x2="220" y2="200" stroke="#444" strokeWidth="1.5" />
        <line x1="220" y1="200" x2="220" y2="350" stroke="#444" strokeWidth="1.5" />
        <circle cx="220" cy="350" r="4" fill="#444" />

        {/* --- Top Tuned Circuit (f1 > fc) --- */}
        <line x1="170" y1="130" x2="260" y2="130" stroke="#444" strokeWidth="2" />
        <line x1="260" y1="130" x2="260" y2="160" stroke="#444" strokeWidth="1.5" />
        <line x1="250" y1="160" x2="270" y2="160" stroke="#444" strokeWidth="2" />
        <line x1="250" y1="170" x2="270" y2="170" stroke="#444" strokeWidth="2" />
        <line x1="260" y1="170" x2="260" y2="200" stroke="#444" strokeWidth="1.5" />
        <text x="275" y="160" className="text-[10px] fill-blue-700 font-bold">C1 (Tuned f_c + Δf)</text>

        {/* Top Diode */}
        <line x1="300" y1="130" x2="340" y2="130" stroke="#444" strokeWidth="2" />
        <use href="#diode-demo" x="340" y="110" width="40" height="40" className="text-blue-600" />
        
        {/* Top RC Filter */}
        <line x1="380" y1="130" x2="450" y2="130" stroke="#444" strokeWidth="2" />
        <rect x="400" y="122" width="30" height="16" fill="none" stroke="#444" strokeWidth="1.5" />
        <line x1="430" y1="130" x2="430" y2="160" stroke="#444" strokeWidth="1.5" />
        <line x1="420" y1="160" x2="440" y2="160" stroke="#444" strokeWidth="2" />
        <line x1="420" y1="170" x2="440" y2="170" stroke="#444" strokeWidth="2" />
        <line x1="430" y1="170" x2="430" y2="350" stroke="#444" strokeWidth="1.5" />

        {/* --- Bottom Tuned Circuit (f2 < fc) --- */}
        <line x1="170" y1="270" x2="260" y2="270" stroke="#444" strokeWidth="2" />
        <line x1="260" y1="270" x2="260" y2="300" stroke="#444" strokeWidth="1.5" />
        <line x1="250" y1="290" x2="270" y2="290" stroke="#444" strokeWidth="2" />
        <line x1="250" y1="300" x2="270" y2="300" stroke="#444" strokeWidth="2" />
        <line x1="260" y1="300" x2="260" y2="350" stroke="#444" strokeWidth="1.5" />
        <text x="275" y="315" className="text-[10px] fill-red-700 font-bold">C2 (Tuned f_c - Δf)</text>

        {/* Bottom Diode */}
        <line x1="300" y1="270" x2="340" y2="270" stroke="#444" strokeWidth="2" />
        <use href="#diode-demo" x="340" y="250" width="40" height="40" className="text-red-600" />

        {/* Bottom RC Filter */}
        <line x1="380" y1="270" x2="450" y2="270" stroke="#444" strokeWidth="2" />
        <rect x="400" y="262" width="30" height="16" fill="none" stroke="#444" strokeWidth="1.5" />
        <line x1="430" y1="270" x2="430" y2="300" stroke="#444" strokeWidth="1.5" />
        <line x1="420" y1="300" x2="440" y2="300" stroke="#444" strokeWidth="2" />
        <line x1="420" y1="310" x2="440" y2="310" stroke="#444" strokeWidth="2" />
        <line x1="430" y1="310" x2="430" y2="350" stroke="#444" strokeWidth="1.5" />

        {/* --- Adder / Differential Output --- */}
        <line x1="450" y1="130" x2="520" y2="130" stroke="#444" strokeWidth="2" />
        <line x1="520" y1="130" x2="520" y2="180" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <line x1="450" y1="270" x2="520" y2="270" stroke="#444" strokeWidth="2" />
        <line x1="520" y1="270" x2="520" y2="220" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* Subtractor Op-amp */}
        <polygon points="500,180 560,200 500,220" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2" />
        <text x="510" y="205" className="text-xs font-bold fill-emerald-800">Σ Summer</text>
        
        {/* Final Output */}
        <line x1="560" y1="200" x2="620" y2="200" stroke="#059669" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="565" y="190" className="text-sm font-bold fill-emerald-800">m(t) Out</text>
        <text x="520" y="250" className="text-[9px] fill-stone-500 font-mono">Balanced Discriminator Output</text>

        <text x="200" y="385" className="text-md font-bold fill-stone-800">Balanced Discriminator Circuit (FM Demodulation)</text>
      </svg>
    </div>
  );
};
