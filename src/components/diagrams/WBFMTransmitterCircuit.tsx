import React from 'react';

export const WBFMTransmitterCircuit = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-inner border border-stone-200">
      <svg width="650" height="400" viewBox="0 0 650 400" className="max-w-full h-auto">
        <defs>
          <symbol id="multiplier-wb" viewBox="0 0 40 40">
            <rect x="5" y="5" width="30" height="30" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/>
            <text x="12" y="24" className="text-[12px] font-bold fill-stone-700">×N</text>
          </symbol>
          <symbol id="mixer-wb" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="2"/>
            <line x1="8" y1="8" x2="32" y2="32" stroke="currentColor" strokeWidth="2"/>
            <line x1="32" y1="8" x2="8" y2="32" stroke="currentColor" strokeWidth="2"/>
          </symbol>
        </defs>

        <rect width="650" height="400" fill="#fafaf9" rx="8" />

        {/* --- Armstrong Stage 1: NBFM --- */}
        <text x="20" y="85" className="text-sm font-bold fill-stone-800">m(t)</text>
        <line x1="50" y1="80" x2="80" y2="80" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        
        <rect x="80" y="50" width="100" height="60" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
        <text x="95" y="85" className="text-xs font-bold fill-red-700">NBFM Gen</text>
        <text x="90" y="100" className="text-[9px] fill-red-600 italic">f1=200k, Δf1=25</text>
        
        <line x1="180" y1="80" x2="220" y2="80" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />

        {/* --- Stage 2: Freq Multiplier n1 --- */}
        <use href="#multiplier-wb" x="220" y="60" width="40" height="40" className="text-blue-600" />
        <text x="225" y="55" className="text-[9px] font-bold fill-blue-700">×64 (n1)</text>
        
        <line x1="260" y1="80" x2="300" y2="80" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="265" y="75" className="text-[9px] fill-stone-500 italic">f=12.8M, Δf=1.6k</text>

        {/* --- Stage 3: Frequency Mixer --- */}
        <use href="#mixer-wb" x="300" y="60" width="40" height="40" className="text-orange-600" />
        <text x="305" y="115" className="text-[9px] font-bold fill-orange-700">Mixer</text>
        
        {/* Heterodyne Oscillator */}
        <rect x="270" y="140" width="100" height="40" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
        <text x="278" y="165" className="text-[9px] font-bold fill-orange-700">Crystal Osc (f=10.9M)</text>
        <line x1="320" y1="140" x2="320" y2="100" stroke="#444" strokeWidth="1.5" markerEnd="url(#arrowhead)" />

        <line x1="340" y1="80" x2="380" y2="80" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="345" y="75" className="text-[9px] fill-stone-500 italic">f=1.9M, Δf=1.6k</text>

        {/* --- Stage 4: Freq Multiplier n2 --- */}
        <use href="#multiplier-wb" x="380" y="60" width="40" height="40" className="text-blue-600" />
        <text x="385" y="55" className="text-[9px] font-bold fill-blue-700">×48 (n2)</text>
        
        <line x1="420" y1="80" x2="460" y2="80" stroke="#444" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <text x="430" y="75" className="text-[9px] fill-stone-500 italic">f=91.2M, Δf=76.8k</text>

        {/* --- Stage 5: Class-C Power Amp --- */}
        <polygon points="460,60 520,80 460,100" fill="#f0fdff" stroke="#0ea5e9" strokeWidth="2" />
        <text x="465" y="115" className="text-xs font-bold fill-sky-700">Power Amp</text>
        
        {/* --- Output --- */}
        <line x1="520" y1="80" x2="580" y2="80" stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrowhead)" />
        <text x="590" y="85" className="text-sm font-bold fill-sky-800">Antenna</text>
        <text x="525" y="100" className="text-[10px] fill-stone-500 font-mono italic">WBFM Output</text>

        {/* Explanatory Labels */}
        <rect x="50" y="240" width="550" height="130" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
        <text x="70" y="265" className="text-sm font-bold fill-slate-800">Armstrong Indirect FM Synthesis:</text>
        <text x="70" y="290" className="text-xs fill-slate-600">1. NBFM generation at low frequency (200 kHz) for stability.</text>
        <text x="70" y="310" className="text-xs fill-slate-600">2. Frequency multiplication (n1 × n2) to achieve required deviation Δf (75 kHz).</text>
        <text x="70" y="330" className="text-xs fill-slate-600">3. Heterodyning (Mixer) to shift carrier to the final broadcast band (e.g. 91.2 MHz).</text>
        <text x="70" y="350" className="text-xs fill-slate-600">4. Final Amplification for long-range transmission.</text>

        <text x="250" y="30" className="text-md font-bold fill-stone-800 underline">WBFM Transmitter Chain</text>
      </svg>
    </div>
  );
};
