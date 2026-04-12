import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const faqResponses: Record<string, string> = {
  "am": "AM (Amplitude Modulation) varies the carrier amplitude proportionally to the message signal m(t). Signal: φ(t) = [Ac + m(t)]cos(ωct). µ = mp/Ac. Bandwidth = 2fm. Total power Pt = Pc(1 + µ²/2).",
  "fm": "FM (Frequency Modulation) varies carrier frequency: fi(t) = fc + kf·m(t). Bandwidth ≈ 2(Δf + fm) (Carson's Rule). FM has superior noise immunity; SNR gain over AM is 3β²/(1 + β).",
  "modulation": "Modulation shifts baseband signals to high frequency for efficient antenna radiation (size ∝ λ/4), allows FDM, and improves noise performance. Non-linear, switching, and ring modulators are used for generation.",
  "dsb": "DSB-SC (Double Sideband Suppressed Carrier) φ(t) = m(t)cos(ωct). Saves carrier power but requires coherent detection using carrier recovery (PLL/Costas loop). BW = 2fm.",
  "ssb": "SSB (Single Sideband) transmits only one sideband (USB/LSB). BW = fm (saves 50% BW). Generated using phase shift (Hilbert transform) or selective filtering methods.",
  "noise": "Communication noise includes Thermal (N = kTB) and Shot noise. Noise figure F = SNR_in / SNR_out. Friis formula calculates total noise in cascaded systems.",
  "pll": "PLL is a feedback system locking VCO to input phase. Key formulas: Steady-state error θe = arcsin(Δω/KvKd). Loop Gain K = Kd·Kv. Used for FM demodulation and carrier recovery.",
  "snr": "SNR = Signal Power / Noise Power. SNR(dB) = 10log10(S/N). For FM systems, increasing bandwidth improves SNR at the cost of more noise (N ∝ B).",
  "fourier": "Fourier Transform X(ω) = ∫x(t)e^(-jωt)dt converts time signals to frequency domain. Key for spectral analysis of AM/FM signals and calculating bandwidth.",
  "bandwidth": "Bandwidth is the spectrum width needed. AM/DSB: 2fm. SSB: fm. FM: 2(Δf + fm). Larger BW allows faster data but collects more noise.",
  "envelope": "Envelope detector consists of a diode and RC filter. Demodulates AM when µ ≤ 1. Requirement: 1/fc << RC << 1/fm. Simple but effective for AM.",
  "superheterodyne": "Superheterodyne receiver converts incoming RF to a fixed intermediate frequency (IF) before demodulation. RF Amp → Mixer → IF Amp → Demodulator.",
  "help": "I can answer questions about: AM, FM, DSB, SSB, SNR, Noise, PLL, Fourier, Bandwidth, and receivers. Just type a keyword to learn more!",
};

function findResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, value] of Object.entries(faqResponses)) {
    if (lower.includes(key)) return value;
  }
  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
    return "Hi there! 👋 I'm your Analog Communication assistant. Ask me about AM, FM, DSB-SC, SSB, noise, PLL, or any topic covered in this course!";
  }
  if (lower.includes("thank")) {
    return "You're welcome! 🎉 Keep exploring and good luck with your studies!";
  }
  return "I'm not sure about that specific question, but I can help with: AM, FM, DSB-SC, SSB, Modulation, Noise, Fourier, PLL, SNR, Bandwidth, Envelope Detection, and Superheterodyne receivers. Try asking about one of these topics!";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hi! 👋 I'm your Analog Communication assistant. Ask me anything about AM, FM, DSB, noise, or any topic in this course!" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot "thinking" delay
    setTimeout(() => {
      const botResponse = findResponse(trimmed);
      setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-all duration-300"
        title="Chat with AI Assistant"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-5 py-4 flex items-center gap-3">
            <Bot className="w-6 h-6" />
            <div>
              <p className="font-bold text-sm">ADC Study Bot</p>
              <p className="text-[10px] opacity-80">Analog Communication Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[320px] custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`px-3.5 py-2.5 rounded-xl text-sm leading-relaxed max-w-[260px] ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about AM, FM, SSB..."
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button
              onClick={handleSend}
              className="bg-primary text-primary-foreground p-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
