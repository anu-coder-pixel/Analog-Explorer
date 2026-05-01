import React from 'react';

export function BalancedModulatorDSB() {
  return (
    <div className="w-full bg-[#030712] rounded-xl p-8 overflow-x-auto relative border border-slate-800 shadow-2xl">
      <div className="text-center mb-10">
        <h4 className="text-[#f97316] font-bold tracking-[0.2em] text-sm uppercase">
          Balanced Transistor Modulator (DSB-SC Generation)
        </h4>
      </div>

      <svg
        viewBox="0 0 850 400"
        className="w-full h-auto min-w-[750px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- INPUT STAGE (Modulating Signal) --- */}
        <g transform="translate(50, 150)" filter="url(#glow-emerald)">
          <circle cx="0" cy="0" r="4" fill="#10b981" />
          <circle cx="0" cy="100" r="4" fill="#10b981" />
          <text x="-15" y="50" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold" transform="rotate(-90 -15 50)">MODULATING SIGNAL</text>
          <line x1="0" y1="0" x2="40" y2="0" stroke="#334155" strokeWidth="2" />
          <line x1="0" y1="100" x2="40" y2="100" stroke="#334155" strokeWidth="2" />
        </g>

        {/* Transformer T1 (Input) */}
        <g transform="translate(90, 150)">
          {/* Primary */}
          <path d="M0 0 C15 0 15 20 0 20 C15 20 15 40 0 40 C15 40 15 60 0 60 C15 60 15 80 0 80 C15 80 15 100 0 100" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="20" y1="0" x2="20" y2="100" stroke="#334155" strokeWidth="2" />
          {/* Secondary (Center Tapped) */}
          <path d="M40 0 C25 0 25 20 40 20 C25 20 25 40 40 40 C25 40 25 60 40 60 C25 60 25 80 40 80 C25 80 25 100 40 100" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="40" y1="50" x2="80" y2="50" stroke="#334155" strokeWidth="2" />
          <text x="25" y="125" textAnchor="middle" fill="#94a3b8" className="text-[9px]">T1</text>
        </g>

        {/* --- CARRIER INJECTION --- */}
        <g transform="translate(170, 200)">
          {/* Carrier Input */}
          <circle cx="40" cy="-60" r="15" stroke="#10b981" strokeWidth="2" filter="url(#glow-emerald)" />
          <path d="M32 -60 Q40 -70 48 -60 T56 -60" stroke="#10b981" strokeWidth="1.5" fill="none" transform="translate(-8,0)" filter="url(#glow-emerald)" />
          <text x="40" y="-85" textAnchor="middle" fill="#10b981" className="text-[9px] font-bold">CARRIER RF SIGNAL</text>
          
          {/* Carrier Transformer T2 */}
          <path d="M15 -35 C15 -50 35 -50 35 -35 C35 -50 55 -50 55 -35" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="15" y1="-25" stroke="#334155" strokeWidth="2" x2="65" y2="-25" />
          <path d="M15 -15 C15 0 35 0 35 -15 C35 0 55 0 55 -15" stroke="#3b82f6" strokeWidth="2" fill="none" />
          
          <line x1="0" y1="0" x2="35" y2="0" stroke="#334155" strokeWidth="2" />
          <line x1="35" y1="0" x2="35" y2="-15" stroke="#334155" strokeWidth="2" />
          <line x1="45" y1="-50" x2="45" y2="-75" stroke="#334155" strokeWidth="1" />
          <line x1="35" y1="-50" x2="35" y2="-75" stroke="#334155" strokeWidth="1" />
          
          {/* C capacitor across center taps */}
          <line x1="20" y1="-5" x2="60" y2="-5" stroke="#38bdf8" strokeWidth="2" />
          <line x1="20" y1="0" x2="60" y2="0" stroke="#38bdf8" strokeWidth="2" />
          <text x="40" y="20" textAnchor="middle" fill="#94a3b8" className="text-[10px]">T2</text>
        </g>
        
        {/* Connection from T1 to Carrier Stage */}
        <line x1="130" y1="200" x2="170" y2="200" stroke="#334155" strokeWidth="2" />

        {/* --- TRANSISTOR MODULATORS (Matched Q1, Q2) --- */}
        {/* Q1 */}
        <g transform="translate(380, 150)" filter="url(#glow-orange)">
          <circle cx="0" cy="0" r="30" stroke="#f97316" strokeWidth="2" fill="transparent" />
          <line x1="-30" y1="0" x2="-10" y2="0" stroke="#f97316" strokeWidth="2" /> 
          <line x1="-10" y1="-10" x2="-10" y2="10" stroke="#f97316" strokeWidth="3" />
          <line x1="-10" y1="-5" x2="10" y2="-15" stroke="#f97316" strokeWidth="2" />
          <line x1="10" y1="-15" x2="10" y2="-25" stroke="#f97316" strokeWidth="2" />
          <line x1="-10" y1="5" x2="10" y2="15" stroke="#f97316" strokeWidth="2" />
          <line x1="10" y1="15" x2="10" y2="25" stroke="#f97316" strokeWidth="2" />
          <path d="M6 12 L14 18 L10 10 Z" fill="#f97316" />
          <text x="15" y="0" fill="#f97316" className="text-[11px] font-bold">Q1</text>
        </g>
        
        {/* Q2 */}
        <g transform="translate(380, 250)" filter="url(#glow-orange)">
          <circle cx="0" cy="0" r="30" stroke="#f97316" strokeWidth="2" fill="transparent" />
          <line x1="-30" y1="0" x2="-10" y2="0" stroke="#f97316" strokeWidth="2" /> 
          <line x1="-10" y1="-10" x2="-10" y2="10" stroke="#f97316" strokeWidth="3" />
          <line x1="-10" y1="-5" x2="10" y2="-15" stroke="#f97316" strokeWidth="2" />
          <line x1="10" y1="-15" x2="10" y2="-25" stroke="#f97316" strokeWidth="2" />
          <line x1="-10" y1="5" x2="10" y2="15" stroke="#f97316" strokeWidth="2" />
          <line x1="10" y1="15" x2="10" y2="25" stroke="#f97316" strokeWidth="2" />
          <path d="M6 12 L14 18 L10 10 Z" fill="#f97316" />
          <text x="15" y="0" fill="#f97316" className="text-[11px] font-bold">Q2</text>
        </g>

        {/* Emitter Connections (Joined) */}
        <line x1="390" y1="175" x2="390" y2="225" stroke="#334155" strokeWidth="2" />
        {/* Collector Connections to T3 */}
        <line x1="390" y1="125" x2="480" y2="125" stroke="#334155" strokeWidth="2" />
        <line x1="390" y1="275" x2="480" y2="275" stroke="#334155" strokeWidth="2" />
        {/* Base Connections from T1 */}
        <line x1="130" y1="150" x2="350" y2="150" stroke="#334155" strokeWidth="2" />
        <line x1="130" y1="250" x2="350" y2="250" stroke="#334155" strokeWidth="2" />

        {/* --- OUTPUT STAGE --- */}
        
        {/* Vcc and Output Center Tap */}
        <g transform="translate(480, 200)">
          <line x1="0" y1="0" x2="60" y2="0" stroke="#334155" strokeWidth="2" />
          {/* Battery Vcc */}
          <line x1="60" y1="-10" x2="60" y2="10" stroke="#ec4899" strokeWidth="3" />
          <line x1="65" y1="-5" x2="65" y2="5" stroke="#ec4899" strokeWidth="1" opacity="0.6"/>
          <line x1="70" y1="-10" x2="70" y2="10" stroke="#ec4899" strokeWidth="3" />
          <line x1="75" y1="0" x2="100" y2="0" stroke="#334155" strokeWidth="1" />
          <text x="68" y="25" textAnchor="middle" fill="#ec4899" className="text-[10px] font-bold">Vcc</text>
          <text x="50" y="-10" fill="#ec4899" className="text-[10px]">-</text>
          <text x="80" y="-10" fill="#ec4899" className="text-[10px]">+</text>
        </g>

        {/* Output Transformer T3 */}
        <g transform="translate(540, 125)">
          <path d="M0 0 C15 0 15 30 0 30 C15 30 15 60 0 60 C15 60 15 90 0 90 C15 90 15 120 0 120 C15 120 15 150 0 150" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <line x1="20" y1="0" x2="20" y2="150" stroke="#334155" strokeWidth="2" />
          <path d="M40 0 C25 0 25 30 40 30 C25 30 25 60 40 60 C25 60 25 90 40 90 C25 90 25 120 40 120 C25 120 25 150 40 150" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <text x="25" y="170" textAnchor="middle" fill="#94a3b8" className="text-[9px]">T3</text>
        </g>
        
        {/* LC Tuned Circuit */}
        <g transform="translate(680, 125)">
          {/* Inductor L */}
          <path d="M0 0 C15 0 15 30 0 30 C15 30 15 60 0 60 C15 60 15 90 0 90 C15 90 15 120 0 120 C15 120 15 150 0 150" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <text x="-15" y="75" textAnchor="middle" fill="#38bdf8" className="text-[11px] font-bold">L</text>
          
          {/* Variable Capacitor C */}
          <line x1="50" y1="65" x2="50" y2="85" stroke="#38bdf8" strokeWidth="3" />
          <line x1="55" y1="65" x2="55" y2="85" stroke="#38bdf8" strokeWidth="3" />
          <line x1="35" y1="95" x2="70" y2="55" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M66 58 L72 52 L62 50 Z" fill="#38bdf8" />
          <text x="75" y="75" fill="#38bdf8" className="text-[11px] font-bold">C</text>
          
          <line x1="0" y1="0" x2="52" y2="0" stroke="#334155" strokeWidth="1" />
          <line x1="0" y1="150" x2="52" y2="150" stroke="#334155" strokeWidth="1" />
          <line x1="52" y1="0" x2="52" y2="65" stroke="#334155" strokeWidth="1" />
          <line x1="52" y1="85" x2="52" y2="150" stroke="#334155" strokeWidth="1" />
        </g>

        {/* Connections from T3 to LC */}
        <line x1="580" y1="125" x2="680" y2="125" stroke="#334155" strokeWidth="2" />
        <line x1="580" y1="275" x2="680" y2="275" stroke="#334155" strokeWidth="2" />

        {/* Output Terminals */}
        <g transform="translate(800, 125)" filter="url(#glow-emerald)">
          <line x1="-68" y1="0" x2="0" y2="0" stroke="#334155" strokeWidth="2" />
          <line x1="-68" y1="150" x2="0" y2="150" stroke="#334155" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#10b981" />
          <circle cx="0" cy="150" r="4" fill="#10b981" />
          <text x="15" y="75" textAnchor="middle" fill="#10b981" className="text-[10px] font-bold" transform="rotate(90 15 75)">MODULATED OUTPUT</text>
          <text x="15" y="88" textAnchor="middle" fill="#94a3b8" className="text-[8px] font-bold" transform="rotate(90 15 88)">(DSB-SC)</text>
        </g>

        {/* Junctions */}
        <circle cx="130" y="200" r="3" fill="#334155" /> {/* T1 secondary tap */}
        <circle cx="390" y="200" r="3" fill="#334155" /> {/* Transistor join */}
        <circle cx="540" y="200" r="3" fill="#334155" /> {/* T3 primary tap */}
        <circle cx="50" cy="200" r="1.5" fill="#334155" opacity="0.3"/> 
        
      </svg>
    </div>
  );
}
