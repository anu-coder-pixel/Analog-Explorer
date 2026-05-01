import React from 'react';

export const NonLinearModulatorCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="600" height="400" viewBox="0 0 600 400" className="max-w-full h-auto">
        <defs>
          <symbol id="diode" viewBox="0 0 40 40">
            <line x1="5" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="2.5"/>
            <polygon points="15,10 30,20 15,30" fill="currentColor" />
            <line x1="30" y1="10" x2="30" y2="30" stroke="currentColor" strokeWidth="2.5"/>
            <line x1="30" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="2.5"/>
          </symbol>
        </defs>

        <rect width="600" height="400" fill="#fafaf9" rx="8" />

        {/* --- Input Summing Network --- */}
        <text x="20" y="85" className="text-sm font-bold fill-stone-800">m(t)</text>
        <line x1="60" y1="80" x2="100" y2="80" stroke="#444" strokeWidth="2" />
        <rect x="100" y="70" width="40" height="20" fill="none" stroke="#444" strokeWidth="1.5" />
        <text x="105" y="65" className="text-[10px] fill-stone-500">R1</text>
        
        <text x="20" y="145" className="text-sm font-bold fill-stone-800">c(t)</text>
        <line x1="60" y1="140" x2="100" y2="140" stroke="#444" strokeWidth="2" />
        <rect x="100" y="130" width="40" height="20" fill="none" stroke="#444" strokeWidth="1.5" />
        <text x="105" y="125" className="text-[10px] fill-stone-500">R2</text>

        <line x1="140" y1="80" x2="200" y2="80" stroke="#444" strokeWidth="2" />
        <line x1="140" y1="140" x2="200" y2="140" stroke="#444" strokeWidth="2" />
        <line x1="200" y1="80" x2="200" y2="140" stroke="#444" strokeWidth="2" />
        
        <text x="165" y="105" className="text-xs font-mono fill-stone-600">v_i = m + c</text>
        <circle cx="200" cy="110" r="3" fill="#444" />
        <line x1="200" y1="110" x2="240" y2="110" stroke="#444" strokeWidth="2" />

        {/* --- Non-linear Element (Diode) --- */}
        <use href="#diode" x="240" y="90" width="40" height="40" className="text-red-600" />
        <text x="245" y="85" className="text-xs font-bold fill-red-700">Square-Law Device (D1)</text>
        
        <line x1="280" y1="110" x2="330" y2="110" stroke="#444" strokeWidth="2" />
        <circle cx="330" cy="110" r="3" fill="#444" />
        
        {/* Load Resistor */}
        <line x1="330" y1="110" x2="330" y2="160" stroke="#444" strokeWidth="1.5" />
        <rect x="322" y="160" width="16" height="40" fill="none" stroke="#444" strokeWidth="1.5" />
        <line x1="330" y1="200" x2="330" y2="350" stroke="#444" strokeWidth="1.5" />
        <text x="345" y="185" className="text-[10px] fill-stone-600 font-bold">R_load</text>
        <line x1="50" y1="350" x2="550" y2="350" stroke="#444" strokeWidth="2" />
        <circle cx="330" cy="350" r="4" fill="#444" />

        {/* --- Output LC Tank Filter --- */}
        <line x1="330" y1="110" x2="450" y2="110" stroke="#444" strokeWidth="2" />
        <circle cx="450" cy="110" r="3" fill="#444" />
        
        {/* Capacitor C1 */}
        <line x1="430" y1="110" x2="430" y2="140" stroke="#444" strokeWidth="1.5" />
        <line x1="420" y1="140" x2="440" y2="140" stroke="#444" strokeWidth="2" />
        <line x1="420" y1="150" x2="440" y2="150" stroke="#444" strokeWidth="2" />
        <line x1="430" y1="150" x2="430" y2="350" stroke="#444" strokeWidth="1.5" />
        <text x="445" y="145" className="text-xs font-bold fill-stone-600">C1</text>
        
        {/* Inductor L1 */}
        <line x1="470" y1="110" x2="470" y2="140" stroke="#444" strokeWidth="1.5" />
        <path d="M470,140 C460,140 460,148 470,148 S480,156 470,156 S460,164 470,164 S480,172 470,172" 
              fill="none" stroke="#b45309" strokeWidth="2" transform="rotate(90, 470, 156) translate(0, -5)" />
        <line x1="470" y1="184" x2="470" y2="350" stroke="#444" strokeWidth="1.5" />
        <text x="485" y="160" className="text-xs font-bold fill-orange-800">L1</text>
        
        <text x="435" y="90" className="text-xs font-bold fill-orange-700 italic">BPF at fc</text>

        {/* --- Output --- */}
        <line x1="450" y1="110" x2="550" y2="110" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="500" y="100" className="text-sm font-bold fill-green-700">AM Output</text>
        <text x="505" y="130" className="text-[10px] fill-stone-500 italic">Square-Law Generated</text>

        <text x="180" y="380" className="text-md font-bold fill-stone-800">Non-linear (Square-Law) Modulator Circuit</text>
      </svg>
    </div>
  );
};
