import React from 'react';

export const FMTransmitterCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="600" height="400" viewBox="0 0 600 400" className="max-w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
          </marker>
          
          {/* Transistor Symbol */}
          <symbol id="npn-transistor" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="10" x2="12" y2="30" stroke="currentColor" strokeWidth="2.5"/>
            <line x1="12" y1="20" x2="2" y2="20" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="15" x2="25" y2="5" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="25" x2="25" y2="35" stroke="currentColor" strokeWidth="2"/>
            <polygon points="25,35 22,28 18,32" fill="currentColor" />
          </symbol>

          {/* MIC Symbol */}
          <symbol id="mic" viewBox="0 0 40 40">
            <path d="M10,10 A10,10 0 0,1 30,10 L30,20 A10,10 0 0,1 10,20 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="20" y1="30" x2="20" y2="38" stroke="currentColor" strokeWidth="2"/>
            <line x1="10" y1="38" x2="30" y2="38" stroke="currentColor" strokeWidth="2"/>
          </symbol>
        </defs>

        {/* --- Background --- */}
        <rect width="600" height="400" fill="#fafaf9" rx="8" />
        
        {/* --- Rail Lines --- */}
        <line x1="50" y1="50" x2="500" y2="50" stroke="#444" strokeWidth="2.5" /> {/* VCC Rail */}
        <line x1="50" y1="350" x2="500" y2="350" stroke="#444" strokeWidth="2.5" /> {/* GND Rail */}
        
        {/* --- Supply Label --- */}
        <text x="510" y="200" className="text-sm font-bold fill-stone-600">9V Supply</text>
        <circle cx="500" cy="50" r="4" fill="#444" />
        <circle cx="500" cy="350" r="4" fill="#444" />
        <line x1="500" y1="50" x2="500" y2="150" stroke="#444" strokeWidth="1.5" />
        <line x1="500" y1="250" x2="500" y2="350" stroke="#444" strokeWidth="1.5" />
        {/* Battery symbol */}
        <line x1="480" y1="180" x2="520" y2="180" stroke="#444" strokeWidth="3" />
        <line x1="490" y1="190" x2="510" y2="190" stroke="#444" strokeWidth="1" />
        <line x1="480" y1="200" x2="520" y2="200" stroke="#444" strokeWidth="3" />
        <line x1="490" y1="210" x2="510" y2="210" stroke="#444" strokeWidth="1" />

        {/* --- MIC Input Section --- */}
        <use href="#mic" x="30" y="180" width="40" height="40" className="text-stone-700" />
        <text x="35" y="240" className="text-xs font-bold fill-red-600">MIC</text>
        <line x1="70" y1="200" x2="100" y2="200" stroke="#444" strokeWidth="1.5" />
        <line x1="50" y1="220" x2="50" y2="350" stroke="#444" strokeWidth="1.5" />
        <circle cx="50" cy="350" r="4" fill="#444" />

        {/* --- C1 Coupling Capacitor --- */}
        <line x1="100" y1="190" x2="100" y2="210" stroke="#444" strokeWidth="2" />
        <line x1="110" y1="190" x2="110" y2="210" stroke="#444" strokeWidth="2" />
        <line x1="110" y1="200" x2="150" y2="200" stroke="#444" strokeWidth="1.5" />
        <text x="85" y="180" className="text-[10px] fill-stone-500 italic">C1 (0.001uF)</text>

        {/* --- R2 Pull-up --- */}
        <line x1="150" y1="50" x2="150" y2="100" stroke="#444" strokeWidth="1.5" />
        <rect x="142" y="100" width="16" height="40" fill="none" stroke="#444" strokeWidth="1.5" />
        <line x1="150" y1="140" x2="150" y2="200" stroke="#444" strokeWidth="1.5" />
        <text x="165" y="125" className="text-[10px] fill-stone-600 font-bold">R2 (4.7K)</text>

        {/* --- Transistor Q1 --- */}
        <use href="#npn-transistor" x="250" y="180" width="50" height="50" className="text-stone-800" />
        <text x="305" y="210" className="text-xs font-bold fill-stone-700">Q1 (BC547)</text>
        <line x1="150" y1="200" x2="252" y2="200" stroke="#444" strokeWidth="1.5" />

        {/* --- R1 Emitter Resistor --- */}
        <line x1="282" y1="225" x2="282" y2="260" stroke="#444" strokeWidth="1.5" />
        <rect x="274" y="260" width="16" height="40" fill="none" stroke="#444" strokeWidth="1.5" />
        <line x1="282" y1="300" x2="282" y2="350" stroke="#444" strokeWidth="1.5" />
        <circle cx="282" cy="350" r="4" fill="#444" />
        <text x="295" y="285" className="text-[10px] fill-stone-600 font-bold">R1 (330R)</text>

        {/* --- Tank Circuit (L1 and VC1) --- */}
        {/* Connection to Collector */}
        <line x1="282" y1="185" x2="282" y2="150" stroke="#444" strokeWidth="1.5" />
        <line x1="282" y1="150" x2="420" y2="150" stroke="#444" strokeWidth="1.5" />
        <circle cx="282" cy="150" r="3" fill="#444" />

        {/* L1 Inductor */}
        <path d="M320,150 C320,130 330,130 330,150 S340,170 340,150 S350,130 350,150 S360,170 360,150" 
              fill="none" stroke="#b45309" strokeWidth="2.5" transform="rotate(-90, 340, 100) translate(-30, 240)" />
        <line x1="330" y1="50" x2="330" y2="80" stroke="#444" strokeWidth="1.5" />
        <line x1="330" y1="120" x2="330" y2="150" stroke="#444" strokeWidth="1.5" />
        <text x="345" y="105" className="text-[10px] fill-orange-800 font-bold">L1 (0.1 uH)</text>

        {/* VC1 Trimmer */}
        <line x1="420" y1="50" x2="420" y2="90" stroke="#444" strokeWidth="1.5" />
        <line x1="410" y1="90" x2="430" y2="90" stroke="#444" strokeWidth="2" />
        <line x1="410" y1="100" x2="430" y2="100" stroke="#444" strokeWidth="2" />
        <line x1="400" y1="110" x2="440" y2="80" stroke="#444" strokeWidth="1.5" /> {/* Variable arrow */}
        <line x1="420" y1="100" x2="420" y2="150" stroke="#444" strokeWidth="1.5" />
        <text x="435" y="105" className="text-[10px] fill-stone-600 font-bold">VC1 (0-100pF)</text>

        {/* --- C2 Feedback Capacitor --- */}
        <line x1="380" y1="150" x2="380" y2="200" stroke="#444" strokeWidth="1.5" />
        <circle cx="380" cy="150" r="3" fill="#444" />
        <line x1="370" y1="200" x2="390" y2="200" stroke="#444" strokeWidth="2" />
        <line x1="370" y1="210" x2="390" y2="210" stroke="#444" strokeWidth="2" />
        <line x1="380" y1="210" x2="380" y2="280" stroke="#444" strokeWidth="1.5" />
        <line x1="380" y1="280" x2="282" y2="280" stroke="#444" strokeWidth="1.5" />
        <circle cx="282" cy="280" r="3" fill="#444" />
        <text x="395" y="215" className="text-[10px] fill-stone-500 italic">C2 (22-100pF)</text>

        {/* --- Antenna --- */}
        <line x1="420" y1="150" x2="480" y2="150" stroke="#444" strokeWidth="1.5" />
        <line x1="480" y1="150" x2="480" y2="80" stroke="#444" strokeWidth="2" />
        <path d="M480,80 L465,50 L495,50 Z" fill="#444" />
        <text x="460" y="40" className="text-xs font-bold fill-stone-700">Antenna</text>

        {/* --- Labels --- */}
        <text x="250" y="385" className="text-sm font-bold fill-stone-800">FM Transmitter Circuit (Direct Modulation)</text>
      </svg>
    </div>
  );
};
