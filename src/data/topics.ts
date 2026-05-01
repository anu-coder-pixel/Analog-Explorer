// ============================================================
// TOPIC DATA — All content is plain text, easily editable.
// Each topic is self-contained. You can add, remove, or reorder
// topics without breaking anything else.
// ============================================================

export interface NumericalProblem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  given: string;
  formula: string;
  steps: string[];
  answer: string;
}

export interface TopicData {
  id: string;
  title: string;
  category: string;
  theory: {
    points: string[];
    formulas: { label: string; expression: string }[];
  };
  blockDiagram: {
    description: string;
    svgLabel: string;
    blocks: { label: string; x: number; y: number; w: number; h: number }[];
    arrows: { from: number; to: number }[];
  };
  circuitDiagram?: {
    image?: string;
    description: string;
    svgLabel: string;
    elements: string[];
  };
  simulation?: {
    type: "am" | "fm" | "pm" | "dsb" | "ssb" | "pll" | "generic";
    description: string;
    parameters: { name: string; default: number; min: number; max: number; step: number }[];
  };
  numericals?: NumericalProblem[];
  experiment?: {
    aim: string;
    apparatus: string[];
    componentsRequired: string[];
    observations: string[];
    conclusion: string;
    image?: string;
  };
}

// ============================================================
// TOPICS ARRAY — Add or remove topics freely
// ============================================================
const topics_core: TopicData[] = [
  // ─── 1. AMPLITUDE MODULATION (AM) ───
  {
    id: "am",
    title: "Amplitude Modulation (AM)",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "AM is a modulation technique where the amplitude of a high-frequency carrier signal is varied in proportion to the instantaneous value of the message signal m(t).",
        "The AM signal is given by φ_AM(t) = [A + m(t)] cos(ωc·t), where A is the carrier amplitude and ωc is the carrier frequency.",
        "For distortion-free envelope detection, the condition A + m(t) ≥ 0 must hold for all t.",
        "The modulation index μ = m_p / A, where m_p is the peak value of m(t). For proper AM, 0 ≤ μ ≤ 1.",
      ],
      formulas: [
        { label: "AM Signal", expression: "φ_{AM}(t) = [A + m(t)] \\cos(\\omega_c t)" },
        { label: "Modulation Index", expression: "\\mu = \\frac{m_p}{A}" },
        { label: "Power Efficiency (tone)", expression: "\\eta = \\frac{\\mu^2}{2 + \\mu^2} \\times 100\\%" },
        { label: "Tone Modulated AM", expression: "\\varphi_{AM}(t) = A[1 + \\mu \\cos(\\omega_m t)] \\cos(\\omega_c t)" },
      ],
    },
    blockDiagram: {
      description: "AM Modulator: Message signal m(t) is added to DC level A, then multiplied with carrier cos(ωc·t).",
      svgLabel: "AM Modulator Block Diagram",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "A + m(t)", x: 150, y: 60, w: 100, h: 40 },
        { label: "× (Multiplier)", x: 300, y: 60, w: 120, h: 40 },
        { label: "cos(ωc·t)", x: 300, y: 140, w: 120, h: 40 },
        { label: "φ_AM(t)", x: 470, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 3, to: 2 },
        { from: 2, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "am.png",
      description: "Premium Transistor AM Modulator using emitter modulation and voltage-divider biasing.",
      svgLabel: "Transistor AM Generator Circuit",
      elements: [
        "Vcc - DC power supply rail",
        "R1, R2 - Voltage divider for transistor base biasing",
        "Cin - Carrier signal coupling capacitor",
        "RE, CE - Emitter stabilization resistor and bypass capacitor",
        "Signal - Baseband message signal injected at the emitter",
        "CC - Modulated output coupling capacitor",
        "Vmod - Amplitude modulated output signal",
      ],
    },
    simulation: {
      type: "am",
      description: "Realistic Transistor AM Modulator simulation. Adjust component levels (Vcc, Bias) to see their effect on the AM envelope and signal-to-noise ratio (SNR).",
      parameters: [
        { name: "Supply (Vcc)", default: 12, min: 5, max: 24, step: 0.5 },
        { name: "R1/R2 Bias Level", default: 0.5, min: 0.1, max: 0.9, step: 0.05 },
        { name: "Message Amp (Vm)", default: 3, min: 0, max: 10, step: 0.2 },
        { name: "Carrier Amp (Vc)", default: 5, min: 1, max: 15, step: 0.5 },
        { name: "Carrier Freq (Hz)", default: 50, min: 10, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Channel Noise", default: 0.05, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "am-1",
        title: "Calculate Modulation Index",
        difficulty: "Easy",
        given: "Carrier amplitude A = 10 V, peak message amplitude m_p = 6 V",
        formula: "μ = m_p / A",
        steps: [
          "μ = m_p / A",
          "μ = 6 / 10",
          "μ = 0.6",
        ],
        answer: "μ = 0.6 (60% modulation)",
      },
      {
        id: "am-2",
        title: "Power Efficiency of Tone-Modulated AM",
        difficulty: "Medium",
        given: "Modulation index μ = 0.5",
        formula: "η = μ² / (2 + μ²) × 100%",
        steps: [
          "η = (0.5)² / (2 + (0.5)²) × 100%",
          "η = 0.25 / (2 + 0.25) × 100%",
          "η = 0.25 / 2.25 × 100%",
          "η = 11.11%",
        ],
        answer: "η = 11.11%",
      },
      {
        id: "am-3",
        title: "Calculate Sideband and Total Power",
        difficulty: "Hard",
        given: "Carrier power Pc = 500 W, μ = 0.8",
        formula: "P_total = Pc(1 + μ²/2), P_sideband = Pc·μ²/2",
        steps: [
          "P_sideband = Pc × μ² / 2 = 500 × 0.64 / 2 = 160 W",
          "P_total = Pc(1 + μ²/2) = 500(1 + 0.32) = 660 W",
          "Efficiency η = 160/660 × 100% = 24.24%",
        ],
        answer: "P_sideband = 160 W, P_total = 660 W, η = 24.24%",
      },
    ],
  },

  // ─── 2. NON-LINEAR MODULATOR ───
  {
    id: "nonlinear-modulator",
    title: "Non-Linear Modulator",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "A non-linear device has an input-output characteristic: y(t) = a·x(t) + b·x²(t), where a and b are constants.",
        "Two non-linear devices are used in a balanced configuration to cancel the unwanted baseband term and produce DSB-SC.",
        "The input x₁(t) = m(t) + cos(ωc·t) and x₂(t) = -m(t) + cos(ωc·t) are applied to two identical non-linear devices.",
        "The difference output z(t) = y₁(t) - y₂(t) = 4b·m(t)·cos(ωc·t), yielding a DSB-SC signal.",
      ],
      formulas: [
        { label: "Non-linear characteristic", expression: "y(t) = a \\cdot x(t) + b \\cdot x^2(t)" },
        { label: "Output difference", expression: "z(t) = 4b \\cdot m(t) \\cos(\\omega_c t)" },
      ],
    },
    blockDiagram: {
      description: "Two non-linear devices in balanced configuration with adders and a subtractor.",
      svgLabel: "Non-Linear DSB-SC Modulator",
      blocks: [
        { label: "m(t)", x: 20, y: 30, w: 80, h: 35 },
        { label: "Σ (Add)", x: 140, y: 30, w: 90, h: 35 },
        { label: "NL Device 1", x: 270, y: 30, w: 120, h: 35 },
        { label: "cos(ωc·t)", x: 140, y: 100, w: 110, h: 35 },
        { label: "Σ (Subtract)", x: 140, y: 170, w: 110, h: 35 },
        { label: "NL Device 2", x: 270, y: 170, w: 120, h: 35 },
        { label: "Σ (Diff)", x: 430, y: 100, w: 90, h: 35 },
        { label: "DSB-SC Output", x: 550, y: 100, w: 120, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 3, to: 1 },
        { from: 3, to: 4 },
        { from: 0, to: 4 },
        { from: 4, to: 5 },
        { from: 2, to: 6 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
      ],
    },
    circuitDiagram: {
      image: "non_linear.jpeg",
      description: "Two diodes (or transistors) operating in their non-linear region, driven by carrier and message signals.",
      svgLabel: "Non-Linear Modulator Circuit",
      elements: [
        "Summer network (m(t) + c(t))",
        "Non-linear device (Diode D1)",
        "Biasing resistor R_load",
        "Bandpass Filter (LC Tank L1, C1) at fc",
      ],
    },
    simulation: {
      type: "nonlinear",
      description: "Realistic Square-Law Modulator simulation. Adjust the Linear (a1) and Square (a2) coefficients to see how non-linearity generates the AM signal.",
      parameters: [
        { name: "Linear Gain (a1)", default: 1.0, min: 0.1, max: 2.0, step: 0.1 },
        { name: "Square Coeff (a2)", default: 0.5, min: 0.1, max: 1.5, step: 0.05 },
        { name: "BPF Q-Factor", default: 10, min: 1, max: 50, step: 1 },
        { name: "Carrier Amp", default: 5, min: 1, max: 10, step: 0.5 },
        { name: "Message Amp", default: 3, min: 1, max: 10, step: 0.5 },
        { name: "Channel Noise", default: 0.05, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "nl-1",
        title: "Non-linear Device Output",
        difficulty: "Easy",
        given: "a = 1, b = 0.5, x(t) = cos(100t) + 2cos(10t)",
        formula: "y(t) = a·x(t) + b·x²(t)",
        steps: [
          "x²(t) = [cos(100t) + 2cos(10t)]²",
          "= cos²(100t) + 4cos(100t)cos(10t) + 4cos²(10t)",
          "The term 4cos(100t)cos(10t) = 2[cos(110t) + cos(90t)] gives DSB-SC components",
          "After bandpass filtering at ω=100: output = 2b × 2cos(10t)cos(100t) = 2cos(10t)cos(100t)",
        ],
        answer: "Filtered DSB-SC output = 2cos(10t)cos(100t)",
      },
      {
        id: "nl-2",
        title: "Calculate Output Power",
        difficulty: "Medium",
        given: "m(t) = 3cos(2π×1000t), carrier = cos(2π×100000t), b = 0.25",
        formula: "Output amplitude = 4b × m_peak = 4(0.25)(3) = 3",
        steps: [
          "z(t) = 4b·m(t)·cos(ωc·t)",
          "Peak amplitude = 4 × 0.25 × 3 = 3 V",
          "Power = (3/√2)² / R = 4.5/R watts (into R ohms)",
        ],
        answer: "Peak output = 3 V, Power = 4.5 W (for R = 1Ω)",
      },
      {
        id: "nl-3",
        title: "Harmonic Distortion Analysis",
        difficulty: "Hard",
        given: "y = ax + bx² + cx³, c/a = 0.01, message amplitude = 1V",
        formula: "3rd harmonic distortion = (c × m³_peak) / (a × m_peak) × 100%",
        steps: [
          "Desired: a·m(t)·cos(ωc·t)",
          "Distortion term: c·m³(t)·cos(ωc·t) contains 3rd harmonic",
          "Ratio = c/a = 0.01",
          "Third-harmonic distortion ≈ (3c/4a) × m²_peak = 0.75%",
        ],
        answer: "Third-harmonic distortion ≈ 0.75%",
      },
    ],
  },


  // ─── 4. RING MODULATOR ───
  {
    id: "ring-modulator",
    title: "Ring Modulator",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "The ring modulator uses four diodes in a ring (bridge) configuration to achieve double-balanced modulation.",
        "It suppresses both the carrier and the message signal at the output — only the product term remains.",
        "During positive carrier half-cycle, diodes D1 and D2 conduct; during negative half-cycle, D3 and D4 conduct, effectively multiplying m(t) by ±1.",
        "The output is m(t)·w₀(t) where w₀(t) = (4/π)[cos(ωc·t) - (1/3)cos(3ωc·t) + ...].",
      ],
      formulas: [
        { label: "Odd switching function", expression: "w_0(t) = \\frac{4}{\\pi}\\left[\\cos(\\omega_c t) - \\frac{1}{3}\\cos(3\\omega_c t) + \\cdots\\right]" },
        { label: "Filtered output", expression: "\\varphi(t) = \\frac{4}{\\pi} m(t) \\cos(\\omega_c t)" },
      ],
    },
    blockDiagram: {
      description: "Four diodes in a ring with transformer-coupled input/output.",
      svgLabel: "Ring Modulator Block Diagram",
      blocks: [
        { label: "m(t) Input", x: 20, y: 70, w: 100, h: 40 },
        { label: "Diode Ring", x: 170, y: 70, w: 130, h: 40 },
        { label: "Carrier", x: 170, y: 150, w: 100, h: 40 },
        { label: "BPF", x: 350, y: 70, w: 80, h: 40 },
        { label: "DSB-SC", x: 480, y: 70, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 1 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "Screenshot 2026-04-11 232514.png",
      description: "Four diodes D1-D4 arranged in a bridge with center-tapped transformers for input and output.",
      svgLabel: "Ring Modulator Circuit",
      elements: [
        "Four matched diodes D1, D2, D3, D4",
        "Input transformer (center-tapped) for m(t)",
        "Carrier transformer (center-tapped) for cos(ωc·t)",
        "Output transformer for balanced output",
      ],
    },
    simulation: {
      type: "ring",
      description: "Realistic Ring Modulator simulation. Adjust Diode Matching and Transformer Balance to see how non-ideal components affect carrier suppression.",
      parameters: [
        { name: "Diode Matching", default: 0.95, min: 0.5, max: 1.0, step: 0.01 },
        { name: "Transf. Balance", default: 1.0, min: 0.8, max: 1.0, step: 0.01 },
        { name: "Carrier Drive", default: 5, min: 2, max: 10, step: 0.5 },
        { name: "Message Amp", default: 3, min: 1, max: 8, step: 0.5 },
        { name: "Carrier Freq", default: 60, min: 20, max: 200, step: 5 },
        { name: "Message Freq", default: 5, min: 1, max: 20, step: 1 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "ring-1",
        title: "Output Amplitude",
        difficulty: "Easy",
        given: "m(t) = 2cos(2π×500t), fc = 50 kHz",
        formula: "Output peak = (4/π) × m_peak",
        steps: [
          "Output peak = (4/π) × 2",
          "= 8/π ≈ 2.55 V",
        ],
        answer: "Peak output ≈ 2.55 V",
      },
      {
        id: "ring-2",
        title: "Suppression Ratio",
        difficulty: "Medium",
        given: "Carrier leakage = 0.02V, DSB-SC output = 2.55V",
        formula: "Suppression = 20 log₁₀(V_DSB / V_leak) dB",
        steps: [
          "Suppression = 20 × log₁₀(2.55 / 0.02)",
          "= 20 × log₁₀(127.5)",
          "= 20 × 2.106",
          "= 42.1 dB",
        ],
        answer: "Carrier suppression ≈ 42.1 dB",
      },
      {
        id: "ring-3",
        title: "Spectral Components",
        difficulty: "Hard",
        given: "m(t) = cos(2π×1000t) + 0.5cos(2π×3000t), fc = 100 kHz",
        formula: "Each component produces USB and LSB",
        steps: [
          "Component 1 (1 kHz): USB at 101 kHz, LSB at 99 kHz",
          "Component 2 (3 kHz): USB at 103 kHz, LSB at 97 kHz",
          "Total bandwidth = 2 × 3 kHz = 6 kHz",
          "Output spans 97 kHz to 103 kHz",
        ],
        answer: "Output occupies 97–103 kHz, BW = 6 kHz",
      },
    ],
  },

  // ─── 5. FREQUENCY MIXER ───
  {
    id: "frequency-mixer",
    title: "Frequency Mixer",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "A frequency mixer (converter) translates a modulated signal from one carrier frequency to another.",
        "The input m(t)cos(ωc·t) is multiplied by 2cos(ωmix·t), where ωmix is the local oscillator frequency.",
        "For up-conversion: ωmix = ωc + ωI; for down-conversion: ωmix = ωc - ωI, where ωI is the desired intermediate frequency.",
        "After bandpass filtering, the output is m(t)cos(ωI·t), i.e., the same signal at a new carrier frequency.",
      ],
      formulas: [
        { label: "Mixer output", expression: "x(t) = m(t)[\\cos(\\omega_I t) + \\cos((2\\omega_c \\pm \\omega_I)t)]" },
        { label: "Filtered output", expression: "\\text{Output} = m(t) \\cos(\\omega_I t)" },
      ],
    },
    blockDiagram: {
      description: "Signal multiplied by local oscillator, then bandpass filtered at new frequency.",
      svgLabel: "Frequency Mixer Block Diagram",
      blocks: [
        { label: "m(t)cos(ωc·t)", x: 10, y: 60, w: 130, h: 40 },
        { label: "× Multiplier", x: 190, y: 60, w: 120, h: 40 },
        { label: "2cos(ωmix·t)", x: 190, y: 140, w: 130, h: 40 },
        { label: "BPF at ωI", x: 370, y: 60, w: 110, h: 40 },
        { label: "m(t)cos(ωI·t)", x: 530, y: 60, w: 130, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 1 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "freq_mixer.jpeg",
      description: "Premium Frequency Mixer circuit with specialized RF, LO, and IF stages.",
      svgLabel: "Frequency Mixer Circuit",
      elements: [
        "RF Input - Modulated signal at carrier frequency ωc",
        "Local Oscillator (LO) - Frequency ωmix for translation",
        "Mixer Stage - Multiplier for frequency conversion",
        "IF Bandpass Filter - Tuned to extract intermediate frequency ωI",
        "IF Output - Signalized output at new frequency",
      ],
    },
    simulation: {
      type: "mixer",
      parameters: [
        { name: "Conversion Gain", default: 1.0, min: 0.1, max: 2.0, step: 0.1 },
        { name: "LO Drive Level", default: 7, min: 2, max: 15, step: 0.5 },
        { name: "IF Filter Q", default: 15, min: 1, max: 50, step: 1 },
        { name: "Original Carrier", default: 80, min: 30, max: 200, step: 5 },
        { name: "Message Freq", default: 5, min: 1, max: 20, step: 1 },
        { name: "Channel Noise", default: 0.05, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "mix-1",
        title: "Calculate Local Oscillator Frequency",
        difficulty: "Easy",
        given: "fc = 1000 kHz, desired IF = 455 kHz, up-conversion",
        formula: "f_LO = fc + f_IF",
        steps: [
          "f_LO = fc + f_IF",
          "f_LO = 1000 + 455",
          "f_LO = 1455 kHz",
        ],
        answer: "f_LO = 1455 kHz",
      },
      {
        id: "mix-2",
        title: "Image Frequency",
        difficulty: "Medium",
        given: "fc = 1000 kHz, f_IF = 455 kHz, f_LO = 1455 kHz",
        formula: "f_image = f_LO + f_IF = fc + 2f_IF",
        steps: [
          "f_image = f_LO + f_IF = 1455 + 455 = 1910 kHz",
          "Or equivalently: f_image = fc + 2×f_IF = 1000 + 910 = 1910 kHz",
          "The image station is 2×f_IF = 910 kHz away from desired station",
        ],
        answer: "f_image = 1910 kHz",
      },
      {
        id: "mix-3",
        title: "Mixer Output Bandwidth",
        difficulty: "Hard",
        given: "Input signal BW = 10 kHz centered at fc = 500 kHz, f_IF = 100 kHz",
        formula: "Output BW remains same, centered at f_IF",
        steps: [
          "Input occupies 495–505 kHz",
          "f_LO = 500 - 100 = 400 kHz (down-conversion)",
          "Output: (495-400) to (505-400) = 95–105 kHz",
          "Bandwidth preserved = 10 kHz, centered at 100 kHz",
        ],
        answer: "Output BW = 10 kHz at IF = 100 kHz",
      },
    ],
  },

  // ─── 6. DSB-SC ───
  {
    id: "dsb-sc",
    title: "DSBSC",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "DSB-SC (Double Sideband Suppressed Carrier) modulation multiplies the message signal directly with the carrier: φ(t) = m(t)·cos(ωc·t).",
        "The spectrum of DSB-SC is M(ω) shifted to ±ωc: Φ(ω) = ½[M(ω+ωc) + M(ω-ωc)].",
        "For tone modulation m(t) = cos(ωm·t): φ(t) = ½[cos(ωc+ωm)t + cos(ωc-ωm)t], showing USB and LSB.",
        "DSB-SC requires synchronous (coherent) demodulation — the receiver must have a carrier in exact frequency and phase synchronism.",
      ],
      formulas: [
        { label: "DSB-SC signal", expression: "\\varphi_{DSB}(t) = m(t) \\cos(\\omega_c t)" },
        { label: "Spectrum", expression: "\\Phi(\\omega) = \\frac{1}{2}[M(\\omega + \\omega_c) + M(\\omega - \\omega_c)]" },
        { label: "Tone modulation", expression: "\\cos(\\omega_m t)\\cos(\\omega_c t) = \\frac{1}{2}[\\cos(\\omega_c + \\omega_m)t + \\cos(\\omega_c - \\omega_m)t]" },
        { label: "Bandwidth", expression: "BW_{DSB} = 2B" },
      ],
    },
    blockDiagram: {
      description: "Message m(t) directly multiplied by carrier, followed by bandpass filter.",
      svgLabel: "DSB-SC Modulator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "× Multiplier", x: 160, y: 60, w: 120, h: 40 },
        { label: "cos(ωc·t)", x: 160, y: 140, w: 120, h: 40 },
        { label: "BPF", x: 340, y: 60, w: 80, h: 40 },
        { label: "φ_DSB(t)", x: 470, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 1 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "dsbsc.jpeg",
      description: "Premium Balanced Transistor Modulator using two matched NPN transistors in a push-pull configuration for carrier suppression.",
      svgLabel: "Balanced Transistor Modulator Circuit",
      elements: [
        "Modulating Signal - Input through center-tapped transformer T1",
        "Carrier RF Signal - Injected through center-tap of the base transformer T2",
        "Matched Transistors Q1, Q2 - Balanced transistor pair for carrier cancellation",
        "Vcc - DC power supply connected to output center tap",
        "Output Transformer T3 - Combines collector outputs into DSB-SC signal",
        "LC Tuned Circuit - Parallel inductor L and variable capacitor C for harmonic selection",
        "Modulated Output - Suppressed carrier double sideband signal",
      ],
    },
    simulation: {
      type: "dsb",
      description: "Realistic Balanced Transistor Modulator simulation. Adjust Transformer coupling and Tank Q to see carrier suppression effectiveness and SNR.",
      parameters: [
        { name: "Supply (Vcc)", default: 12, min: 5, max: 24, step: 0.5 },
        { name: "Transformer Coupling", default: 0.8, min: 0.1, max: 1.0, step: 0.05 },
        { name: "LC Tank Q-Factor", default: 10, min: 1, max: 50, step: 1 },
        { name: "Carrier Amp", default: 5, min: 1, max: 15, step: 0.5 },
        { name: "Message Amp", default: 3, min: 1, max: 10, step: 0.5 },
        { name: "Channel Noise", default: 0.05, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "dsb-1",
        title: "DSB-SC Bandwidth",
        difficulty: "Easy",
        given: "Message bandwidth B = 4 kHz",
        formula: "BW = 2B",
        steps: ["BW = 2 × 4 = 8 kHz"],
        answer: "DSB-SC bandwidth = 8 kHz",
      },
      {
        id: "dsb-2",
        title: "Demodulation with Phase Error",
        difficulty: "Medium",
        given: "Received: m(t)cos(ωc·t), local carrier: 2cos(ωc·t + δ), δ = 30°",
        formula: "Output = m(t)cos(δ)",
        steps: [
          "e(t) = 2m(t)cos(ωc·t)cos(ωc·t + δ)",
          "= m(t)[cos(δ) + cos(2ωc·t + δ)]",
          "After LPF: e₀(t) = m(t)cos(30°)",
          "= m(t) × 0.866",
        ],
        answer: "Output = 0.866 × m(t) — 13.4% attenuation",
      },
      {
        id: "dsb-3",
        title: "Power of DSB-SC Signal",
        difficulty: "Hard",
        given: "m(t) = 3cos(2π×1000t) + 4cos(2π×3000t), carrier amplitude = 1",
        formula: "P_DSB = ½ × m²_rms",
        steps: [
          "m²_rms = (3²/2 + 4²/2) = (9/2 + 16/2) = 12.5",
          "P_DSB = ½ × 12.5 = 6.25 W (normalized)",
          "USB power = LSB power = P_DSB / 2 = 3.125 W each",
        ],
        answer: "Total DSB-SC power = 6.25 W",
      },
    ],
  },

  // ─── 7. DEMODULATION OF AM ───
  {
    id: "am-demodulation",
    title: "Demodulation of AM",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "AM can be demodulated using envelope detection (non-coherent) or synchronous detection (coherent).",
        "Synchronous demodulation multiplies the AM signal by cos(ωc·t) and low-pass filters the result.",
        "Rectifier detection: AM signal passed through a half-wave rectifier, then low-pass filtered to recover the envelope.",
        "Coherent demodulation works for all AM variants (DSB-SC, SSB, VSB), while envelope detection requires A + m(t) ≥ 0.",
      ],
      formulas: [
        { label: "Synchronous output", expression: "e(t) = \\frac{1}{2}[A + m(t)] + \\text{high-freq terms}" },
        { label: "Rectifier output", expression: "v(t) = \\frac{1}{\\pi}[A + m(t)] + \\text{harmonics}" },
      ],
    },
    blockDiagram: {
      description: "Synchronous demodulator: multiply by local carrier, then LPF.",
      svgLabel: "AM Demodulator",
      blocks: [
        { label: "AM Signal", x: 20, y: 60, w: 100, h: 40 },
        { label: "× Multiplier", x: 170, y: 60, w: 120, h: 40 },
        { label: "cos(ωc·t)", x: 170, y: 140, w: 110, h: 40 },
        { label: "LPF (B Hz)", x: 340, y: 60, w: 110, h: 40 },
        { label: "m(t) output", x: 500, y: 60, w: 110, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 1 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "demodam.jpeg",
      description: "Premium Amplified AM Demodulator featuring a diode detector stage followed by a BC548 transistor amplifier.",
      svgLabel: "Amplified AM Detector Circuit",
      elements: [
        "AM Input - The modulated high-frequency carrier",
        "D1 (1N4148) - Half-wave diode detector",
        "R1, C1 - Low-pass RC filter to extract the envelope",
        "T1 (BC548) - Common-emitter transistor amplifier",
        "R3, R4 - Biasing and collector load resistors for the amplifier",
        "C2, C3 - Input and output signal coupling capacitors",
        "Message Wave Output - The amplified and recovered baseband signal",
      ],
    },
    simulation: {
      type: "demod",
      description: "Realistic RC Envelope Detector simulation. Observe diagonal clipping and ripple by adjusting the RC Time Constant relative to the Message Frequency.",
      parameters: [
        { name: "Input AM Amp", default: 8, min: 2, max: 15, step: 0.5 },
        { name: "RC Time Constant", default: 2.5, min: 0.1, max: 15, step: 0.2 },
        { name: "Diode Drop (Vγ)", default: 0.7, min: 0.2, max: 1.2, step: 0.1 },
        { name: "Carrier Freq", default: 60, min: 20, max: 200, step: 5 },
        { name: "Message Freq", default: 5, min: 1, max: 20, step: 1 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.2, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "amd-1",
        title: "RC Time Constant for Envelope Detector",
        difficulty: "Easy",
        given: "fc = 1 MHz, message bandwidth B = 5 kHz",
        formula: "1/fc << RC << 1/(2πB)",
        steps: [
          "1/fc = 1 μs",
          "1/(2πB) = 1/(2π×5000) = 31.8 μs",
          "Choose RC ≈ 10 μs (between 1μs and 31.8μs)",
        ],
        answer: "RC ≈ 10 μs",
      },
      {
        id: "amd-2",
        title: "Maximum RC for Envelope Detector",
        difficulty: "Medium",
        given: "μ = 0.8, fm = 5 kHz (tone modulation)",
        formula: "RC ≤ √(1-μ²) / (μ×ωm)",
        steps: [
          "ωm = 2π × 5000 = 31416 rad/s",
          "RC ≤ √(1 - 0.64) / (0.8 × 31416)",
          "RC ≤ 0.6 / 25133",
          "RC ≤ 23.87 μs",
        ],
        answer: "RC_max ≈ 23.87 μs",
      },
      {
        id: "amd-3",
        title: "SNR After Demodulation",
        difficulty: "Hard",
        given: "Carrier power = 1 kW, μ = 0.6, noise PSD = 10⁻⁶ W/Hz, BW = 10 kHz",
        formula: "SNR_out = μ²Pc / (2 × N₀ × B)",
        steps: [
          "Signal power = μ²Pc/2 = 0.36 × 1000/2 = 180 W",
          "Noise power = N₀ × B = 10⁻⁶ × 10000 = 0.01 W",
          "SNR = 180/0.01 = 18000",
          "SNR (dB) = 10 log₁₀(18000) = 42.55 dB",
        ],
        answer: "SNR ≈ 42.55 dB",
      },
    ],
  },

  // ─── 8. ENVELOPE DETECTOR ───
  {
    id: "envelope-detector",
    title: "Envelope Detector",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "The envelope detector is the simplest AM demodulator, consisting of a diode followed by an RC filter.",
        "During positive peaks, the diode conducts and the capacitor charges to the peak value. Between peaks, the diode is reverse-biased and the capacitor discharges through R.",
        "The RC time constant must satisfy: 1/fc << RC << 1/(2πB), where B is the message bandwidth.",
        "For tone modulation with index μ, the constraint becomes: RC ≤ √(1-μ²) / (μ·ωm).",
      ],
      formulas: [
        { label: "Capacitor discharge", expression: "v_C(t) \\approx E\\left(1 - \\frac{t}{RC}\\right)" },
        { label: "Time constant constraint", expression: "\\frac{1}{f_c} \\ll RC \\ll \\frac{1}{2\\pi B}" },
        { label: "Tone modulation constraint", expression: "RC \\leq \\frac{\\sqrt{1 - \\mu^2}}{\\mu \\omega_m}" },
      ],
    },
    blockDiagram: {
      description: "AM signal → Diode → RC Filter → Baseband output.",
      svgLabel: "Envelope Detector",
      blocks: [
        { label: "AM Input", x: 20, y: 60, w: 100, h: 40 },
        { label: "Diode", x: 170, y: 60, w: 80, h: 40 },
        { label: "RC Filter", x: 300, y: 60, w: 100, h: 40 },
        { label: "DC Block", x: 450, y: 60, w: 100, h: 40 },
        { label: "m(t)", x: 600, y: 60, w: 80, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "envelope_det.jpeg",
      description: "Stylized Envelope Detector circuit with half-wave rectifier, RC smoothing, and LPF.",
      svgLabel: "Envelope Detector Circuit",
      elements: [
        "AM Input s(t) - The modulated carrier signal",
        "Diode (D) - Half-wave rectifier for signal extraction",
        "RC Smoothing (C and R) - Filter to remove high frequency carrier",
        "Low Pass Filter - Final stage to recover the original message m(t)",
        "Recovered Message m(t) - The baseband information signal",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize envelope detection process.",
      parameters: [
        { name: "Modulation Index (μ)", default: 0.6, min: 0.1, max: 1, step: 0.05 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 15, step: 1 },
      ],
    },
    numericals: [
      {
        id: "env-1",
        title: "Choose RC Value",
        difficulty: "Easy",
        given: "fc = 500 kHz, message BW = 4 kHz",
        formula: "1/fc << RC << 1/(2πB)",
        steps: [
          "1/fc = 2 μs, 1/(2π×4000) = 39.8 μs",
          "Choose RC ≈ 15 μs",
          "If C = 100 pF, R = 150 kΩ",
        ],
        answer: "RC ≈ 15 μs (e.g., R=150kΩ, C=100pF)",
      },
      {
        id: "env-2",
        title: "Diagonal Clipping Check",
        difficulty: "Medium",
        given: "μ = 0.9, fm = 4 kHz, RC = 30 μs",
        formula: "Check: RC ≤ √(1-μ²)/(μ·ωm)",
        steps: [
          "Max RC = √(1-0.81)/(0.9×2π×4000)",
          "= √0.19 / 22619",
          "= 0.4359 / 22619 = 19.27 μs",
          "30 μs > 19.27 μs → diagonal clipping occurs!",
        ],
        answer: "RC = 30 μs is too large; diagonal clipping will occur",
      },
      {
        id: "env-3",
        title: "Ripple Frequency Analysis",
        difficulty: "Hard",
        given: "fc = 1 MHz, fm = 5 kHz, μ = 0.5, RC = 10 μs",
        formula: "Ripple amplitude ≈ 1/(fc × RC)",
        steps: [
          "Ripple ≈ 1/(fc × RC) = 1/(10⁶ × 10⁻⁵) = 0.1",
          "Ripple as % of carrier = 10%",
          "After LPF, residual carrier ripple is suppressed",
          "Effective SNR from ripple = 20log(1/0.1) = 20 dB",
        ],
        answer: "Carrier ripple ≈ 10%, ~20 dB below signal",
      },
    ],
  },

  // ─── 9. SSB ───
  {
    id: "ssb",
    title: "Single Sideband (SSB)",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "SSB transmits only one sideband (USB or LSB), halving the bandwidth compared to DSB.",
        "SSB-SC signal: φ_SSB(t) = m(t)cos(ωc·t) ∓ m_h(t)sin(ωc·t), where m_h(t) is the Hilbert transform of m(t).",
        "Generation methods: (1) Selective filtering — pass DSB through sharp cutoff filter; (2) Phase-shift method using Hilbert transformer.",
        "SSB requires coherent demodulation. SSB+C (with large carrier) can use envelope detection if A >> m(t).",
      ],
      formulas: [
        { label: "SSB signal (USB)", expression: "\\varphi_{USB}(t) = m(t)\\cos(\\omega_c t) - m_h(t)\\sin(\\omega_c t)" },
        { label: "SSB signal (LSB)", expression: "\\varphi_{LSB}(t) = m(t)\\cos(\\omega_c t) + m_h(t)\\sin(\\omega_c t)" },
        { label: "Bandwidth", expression: "BW_{SSB} = B" },
      ],
    },
    blockDiagram: {
      description: "Phase-shift SSB generator using Hilbert transform.",
      svgLabel: "SSB Generator (Phase-Shift Method)",
      blocks: [
        { label: "m(t)", x: 20, y: 40, w: 80, h: 35 },
        { label: "× cos(ωc·t)", x: 160, y: 40, w: 120, h: 35 },
        { label: "Hilbert m_h(t)", x: 20, y: 120, w: 130, h: 35 },
        { label: "× sin(ωc·t)", x: 160, y: 120, w: 120, h: 35 },
        { label: "Σ ±", x: 340, y: 80, w: 70, h: 35 },
        { label: "SSB Output", x: 460, y: 80, w: 110, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 2, to: 3 },
        { from: 1, to: 4 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
      ],
    },
    circuitDiagram: {
      image: "ssb.jpeg",
      description: "Ultra-Detailed Phase-Shift SSB Modulator using matched AD633 multipliers and LF351N wideband op-amp phase shifters.",
      svgLabel: "Detailed Phase-Shift SSB Circuit",
      elements: [
        "U1, U2 (AD633) - Precision analog multipliers for quadrature DSB-SC generation",
        "U3 (LF351N) - Wideband Hilbert Transform stage with R9, R16, R17, and C11",
        "Carrier Phase Network - R3, R8, C4, C8 providing 90° quadrature shift",
        "Combiner Stage - U4 (Adder) and U5 (Subtractor) with R10-R15 resistors",
        "Bypass/Coupling - Multiple capacitors (C3, C5, C6, etc.) for signal integrity",
        "Switch - Master selector for Upper Sideband (USB) or Lower Sideband (LSB)",
      ],
    },
    simulation: {
      type: "ssb",
      description: "Realistic Phase-Shift SSB Modulator simulation. Adjust Phase Error and Modulator Balance to see their effect on sideband cancellation and carrier suppression.",
      parameters: [
        { name: "Phase Error (deg)", default: 0, min: 0, max: 45, step: 1 },
        { name: "Modulator Balance", default: 1.0, min: 0.5, max: 1.0, step: 0.05 },
        { name: "Carrier Amp (Vc)", default: 5, min: 1, max: 10, step: 0.5 },
        { name: "Message Amp (Vm)", default: 3, min: 1, max: 10, step: 0.5 },
        { name: "Carrier Freq (Hz)", default: 50, min: 10, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "ssb-1",
        title: "SSB Bandwidth Saving",
        difficulty: "Easy",
        given: "Message bandwidth B = 3.5 kHz",
        formula: "BW_SSB = B, BW_DSB = 2B",
        steps: [
          "BW_DSB = 2 × 3.5 = 7 kHz",
          "BW_SSB = 3.5 kHz",
          "Saving = 50%",
        ],
        answer: "SSB bandwidth = 3.5 kHz (50% saving over DSB)",
      },
      {
        id: "ssb-2",
        title: "SSB Tone Modulation",
        difficulty: "Medium",
        given: "m(t) = cos(2π×1000t), fc = 100 kHz",
        formula: "USB = cos(2π×101000t), LSB = cos(2π×99000t)",
        steps: [
          "Hilbert: m_h(t) = sin(2π×1000t)",
          "USB = cos(ωm·t)cos(ωc·t) - sin(ωm·t)sin(ωc·t) = cos(ωc+ωm)t",
          "USB frequency = 100 + 1 = 101 kHz",
          "LSB frequency = 100 - 1 = 99 kHz",
        ],
        answer: "USB at 101 kHz, LSB at 99 kHz",
      },
      {
        id: "ssb-3",
        title: "SSB+C Envelope Detection",
        difficulty: "Hard",
        given: "A = 10 V, m_peak = 2 V, m_h_peak = 3 V",
        formula: "E(t) = √[(A+m)² + m_h²] ≈ A + m(t) when A >> m",
        steps: [
          "E(t) = √[(10+2)² + 3²] = √(144+9) = √153 = 12.37",
          "With approximation: E ≈ A + m = 12",
          "Error ≈ (12.37-12)/12 × 100% = 3.1%",
          "Condition A >> m is reasonably satisfied",
        ],
        answer: "Envelope ≈ 12.37 V, approximation error ≈ 3.1%",
      },
    ],
  },

  // ─── 10. HILBERT TRANSFORM ───
  {
    id: "hilbert-transform",
    title: "Hilbert Transform",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "The Hilbert transform of m(t) is m_h(t) = (1/π) ∫ m(α)/(t-α) dα, a convolution with 1/(πt).",
        "In the frequency domain: M_h(ω) = -j·sgn(ω)·M(ω), which shifts each frequency component by -π/2.",
        "The Hilbert transform is essential for generating SSB signals and forming the analytic signal m+(t) = m(t) + j·m_h(t).",
        "For cos(ωt), the Hilbert transform is sin(ωt); for sin(ωt), it is -cos(ωt).",
      ],
      formulas: [
        { label: "Hilbert transform", expression: "m_h(t) = \\frac{1}{\\pi} \\int_{-\\infty}^{\\infty} \\frac{m(\\alpha)}{t - \\alpha} d\\alpha" },
        { label: "Frequency domain", expression: "M_h(\\omega) = -j \\cdot \\text{sgn}(\\omega) \\cdot M(\\omega)" },
        { label: "Transfer function", expression: "H(\\omega) = -j \\cdot \\text{sgn}(\\omega)" },
      ],
    },
    blockDiagram: {
      description: "Hilbert transformer: all-pass filter with -π/2 phase shift for positive frequencies.",
      svgLabel: "Hilbert Transform System",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "H(ω) = -j·sgn(ω)", x: 160, y: 60, w: 170, h: 40 },
        { label: "m_h(t)", x: 390, y: 60, w: 90, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
      ],
    },
    simulation: {
      type: "hilbert",
      description: "Visualize a signal and its Hilbert transform (90° phase shift) to understand quadrature components.",
      parameters: [
        { name: "Signal Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
      ],
    },
    numericals: [
      {
        id: "ht-1",
        title: "Hilbert Transform of Cosine",
        difficulty: "Easy",
        given: "m(t) = cos(2π×100t)",
        formula: "m_h(t) = sin(ωt) for m(t) = cos(ωt)",
        steps: [
          "Hilbert transform shifts phase by -π/2",
          "cos(ωt - π/2) = sin(ωt)",
          "m_h(t) = sin(2π×100t)",
        ],
        answer: "m_h(t) = sin(2π×100t)",
      },
      {
        id: "ht-2",
        title: "Analytic Signal",
        difficulty: "Medium",
        given: "m(t) = 3cos(ωt) + 4sin(2ωt)",
        formula: "m+(t) = m(t) + j·m_h(t)",
        steps: [
          "Hilbert of 3cos(ωt) = 3sin(ωt)",
          "Hilbert of 4sin(2ωt) = -4cos(2ωt)",
          "m_h(t) = 3sin(ωt) - 4cos(2ωt)",
          "m+(t) = [3cos(ωt) + 4sin(2ωt)] + j[3sin(ωt) - 4cos(2ωt)]",
        ],
        answer: "m+(t) = 3e^{jωt} + 4je^{-j2ωt} (complex form)",
      },
      {
        id: "ht-3",
        title: "Envelope Using Hilbert Transform",
        difficulty: "Hard",
        given: "s(t) = [5 + 2cos(ωm·t)]cos(ωc·t)",
        formula: "Envelope = √[m²(t) + m_h²(t)]",
        steps: [
          "In-phase: m_I(t) = 5 + 2cos(ωm·t)",
          "Quadrature: m_Q(t) = 0 (for AM, no quadrature component)",
          "Envelope = |5 + 2cos(ωm·t)|",
          "Since 5 > 2, envelope = 5 + 2cos(ωm·t) always positive",
        ],
        answer: "Envelope = 5 + 2cos(ωm·t), range [3, 7]",
      },
    ],
  },

  // ─── 11. QAM ───
  {
    id: "qam",
    title: "Quadrature Amplitude Modulation (QAM)",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "QAM transmits two independent baseband signals on carriers of the same frequency but in phase quadrature (90° apart).",
        "The QAM signal: φ(t) = m₁(t)cos(ωc·t) + m₂(t)sin(ωc·t).",
        "Demodulation uses coherent detection with in-phase and quadrature local carriers to separate m₁(t) and m₂(t).",
        "QAM doubles the bandwidth efficiency of DSB by transmitting two signals in the same bandwidth.",
      ],
      formulas: [
        { label: "QAM signal", expression: "\\varphi(t) = m_1(t)\\cos(\\omega_c t) + m_2(t)\\sin(\\omega_c t)" },
        { label: "Demodulated m₁", expression: "m_1(t) = \\text{LPF}[2\\varphi(t)\\cos(\\omega_c t)]" },
        { label: "Demodulated m₂", expression: "m_2(t) = \\text{LPF}[2\\varphi(t)\\sin(\\omega_c t)]" },
      ],
    },
    blockDiagram: {
      description: "Two DSB-SC modulators with quadrature carriers combined at output.",
      svgLabel: "QAM Modulator",
      blocks: [
        { label: "m₁(t)", x: 20, y: 30, w: 80, h: 35 },
        { label: "× cos(ωc·t)", x: 150, y: 30, w: 120, h: 35 },
        { label: "m₂(t)", x: 20, y: 120, w: 80, h: 35 },
        { label: "× sin(ωc·t)", x: 150, y: 120, w: 120, h: 35 },
        { label: "Σ", x: 330, y: 75, w: 50, h: 35 },
        { label: "QAM(t)", x: 430, y: 75, w: 100, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 3 },
        { from: 1, to: 4 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
      ],
    },
    circuitDiagram: {
      image: "qam.jpeg",
      description: "Two balanced modulators with a 90° phase splitter for the carrier.",
      svgLabel: "QAM Circuit",
      elements: [
        "90° hybrid coupler for carrier splitting",
        "Balanced modulator for I channel",
        "Balanced modulator for Q channel",
        "Summing amplifier at output",
      ],
    },
    simulation: {
      type: "qam",
      description: "Realistic QAM simulation. Adjust the Phase Error and Carrier Balance to see the cross-talk between I and Q channels.",
      parameters: [
        { name: "I-Channel Freq", default: 5, min: 1, max: 20, step: 1 },
        { name: "Q-Channel Freq", default: 3, min: 1, max: 20, step: 1 },
        { name: "Phase Error (deg)", default: 0, min: 0, max: 45, step: 5 },
        { name: "Carrier Balance", default: 1.0, min: 0.5, max: 1.0, step: 0.05 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "qam-1",
        title: "QAM Bandwidth",
        difficulty: "Easy",
        given: "Both messages have bandwidth B = 4 kHz",
        formula: "BW_QAM = 2B (same as single DSB)",
        steps: [
          "QAM occupies same BW as single DSB = 2B",
          "BW = 2 × 4 = 8 kHz",
          "But carries TWO signals instead of one",
        ],
        answer: "BW = 8 kHz (double spectral efficiency)",
      },
      {
        id: "qam-2",
        title: "Phase Error Effect on QAM",
        difficulty: "Medium",
        given: "Phase error δ = 10° in local carrier",
        formula: "Cross-talk = m₂(t)sin(δ) in m₁ channel",
        steps: [
          "Demod output for m₁: m₁cos(δ) + m₂sin(δ)",
          "Desired: m₁cos(10°) = 0.985 m₁",
          "Cross-talk: m₂sin(10°) = 0.174 m₂",
          "Cross-talk ratio = sin(10°)/cos(10°) = tan(10°) = 17.6%",
        ],
        answer: "Cross-talk ≈ 17.6% of m₂ leaks into m₁ channel",
      },
      {
        id: "qam-3",
        title: "QAM Total Power",
        difficulty: "Hard",
        given: "m₁(t) = 2cos(ω₁t), m₂(t) = 3cos(ω₂t)",
        formula: "P_total = P₁ + P₂ = m₁²_rms/2 + m₂²_rms/2",
        steps: [
          "P₁ = (2/√2)²/2 = 1 W (per unit load)",
          "P₂ = (3/√2)²/2 = 2.25 W",
          "P_total = 1 + 2.25 = 3.25 W",
        ],
        answer: "Total QAM power = 3.25 W",
      },
    ],
  },

  // ─── 12. VSB ───
  {
    id: "vsb",
    title: "Vestigial Sideband (VSB)",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "Vestigial Sideband (VSB) is a modulation technique that transmits one full sideband and a 'vestige' (a small portion) of the other sideband.",
        "This approach solves the practical problem of building filters with impossibly sharp 'brick-wall' cutoffs required for perfect SSB.",
        "The Modulator: The message signal m(t) is multiplied by the carrier 2cos(ωct) and then passed through a sideband shaping filter H(ω).",
        "The Filter: H(ω) is designed to leave one sideband intact while introducing a gradual roll-off (the vestige) at the other sideband near fc.",
        "The Demodulator: The received VSB signal is multiplied by a local carrier 2cos(ωct) and then passed through a low-pass filter (LPF) H₀(ω) to recover m(t).",
      ],
      formulas: [
        { label: "Modulated Signal (Freq Domain)", expression: "\\Phi_{VSB}(\\omega) = [M(\\omega + \\omega_c) + M(\\omega - \\omega_c)] \\cdot H(\\omega)" },
        { label: "Nyquist VSB Criterion (Demod)", expression: "H_0(\\omega) = \\frac{1}{H(\\omega + \\omega_c) + H(\\omega - \\omega_c)}" },
        { label: "Distortionless Condition", expression: "H(\\omega + \\omega_c) + H(\\omega - \\omega_c) = \\text{constant}" },
      ],
    },
    blockDiagram: {
      description: "VSB Modulator: multiplier followed by a sideband shaping filter.",
      svgLabel: "VSB Modulator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "× 2cos(ωc·t)", x: 150, y: 60, w: 120, h: 40 },
        { label: "H(ω) Filter", x: 330, y: 60, w: 150, h: 40 },
        { label: "φ_VSB(t)", x: 530, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ],
    },
    circuitDiagram: {
      image: "vsb_realistic.png",
      description: "Realistic VSB transmitter schematic: Balanced modulator with a high-order sideband shaping filter and power amp chain.",
      svgLabel: "Realistic VSB Circuit",
      elements: [
        "Balanced Modulator (AD633 based)",
        "Sideband Filter H(w) - Vestigial shaping",
        "Linear Class AB Power Amplifier",
        "Output Impedance Matching Network",
      ],
    },
    simulation: {
      type: "vsb",
      description: "Realistic VSB simulation. Adjust the Sideband Ratio and Filter Roll-off to visualize the transition between DSB and SSB modulation.",
      parameters: [
        { name: "Sideband Ratio", default: 0.25, min: 0.1, max: 1.0, step: 0.05 },
        { name: "Filter Roll-off (Q)", default: 15, min: 5, max: 50, step: 1 },
        { name: "Carrier Amp", default: 5, min: 1, max: 10, step: 0.5 },
        { name: "Message Amp", default: 3, min: 1, max: 10, step: 0.5 },
        { name: "Carrier Freq", default: 60, min: 30, max: 150, step: 5 },
        { name: "Message Freq", default: 5, min: 1, max: 15, step: 1 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.2, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "vsb-1",
        title: "VSB Filter Design",
        difficulty: "Easy",
        given: "Bandwidth B = 4 kHz, Vestige width = 0.5 kHz, Sum H(ωc+ω)+H(ωc-ω) = 2",
        formula: "B_VSB = B + vestige, H₀(ω) = 1/(sum)",
        steps: [
          "1. Total Bandwidth: B_VSB = B + vestige width = 4 + 0.5 = 4.5 kHz",
          "2. Filter Gain: Using the formula H₀(ω) = 1 / [H(ω+ωc) + H(ω-ωc)]",
          "3. Substitute the given sum: H₀(ω) = 1 / 2 = 0.5",
        ],
        answer: "BW = 4.5 kHz; LPF Gain H₀(ω) = 0.5",
      },
      {
        id: "vsb-2",
        title: "Signal Recovery",
        difficulty: "Medium",
        given: "Filter sum = 1, H₀(ω) = 1 (incorrect design), M(ω) = rect pulse of width B",
        formula: "M_rec(ω) = E(ω) · H₀(ω) = M(ω) · [H(ω+ωc) + H(ω-ωc)]",
        steps: [
          "1. Recovered signal: M_rec(ω) = E(ω) · H₀(ω)",
          "2. Since H₀(ω) = 1, output = M(ω) · [H(ω+ωc) + H(ω-ωc)]",
          "3. If the filter sum is 1 (constant), the output is distortion-free.",
          "4. If the sum is not constant, the message suffers from amplitude distortion (frequency-dependent attenuation).",
        ],
        answer: "Distortion-free if sum=1; otherwise amplitude distortion occurs.",
      },
    ],
  },


  // ─── 14. PLL ───
  {
    id: "pll",
    title: "Phase Locked Loop (PLL)",
    category: "Phase Locked Loop",
    theory: {
      points: [
        "A Phase Locked Loop (PLL) is a feedback control system that locks the phase and frequency of an output signal to that of an input signal.",
        "It continuously compares the input signal with the output of a Voltage Controlled Oscillator (VCO) and adjusts the VCO frequency to maintain synchronization.",
        "Main Components: (1) Phase Detector (Multiplier) — compares input and VCO signals, produces error signal proportional to phase difference. (2) Loop Filter H(s) — removes high-frequency components, produces smooth control voltage. (3) VCO — generates output signal, frequency varies with control voltage.",
        "Working Principle: Input signal is compared with VCO output → Phase difference produces an error signal → Loop filter smooths this signal → VCO adjusts frequency accordingly → System reaches lock condition when phase difference is constant.",
        "Key Points: PLL is a negative feedback system. Used in FM demodulation, frequency synthesis, and synchronization. When locked: output frequency = input frequency.",
      ],
      formulas: [
        { label: "Input Signal", expression: "x_i(t) = A\\sin(\\omega_c t + \\theta_i)" },
        { label: "VCO Output", expression: "x_o(t) = B\\cos(\\omega_c t + \\theta_o)" },
        { label: "Phase Detector Output", expression: "x(t) = \\frac{AB}{2}[\\sin(2\\omega_c t + \\theta_i + \\theta_o) + \\sin(\\theta_i - \\theta_o)]" },
        { label: "After Loop Filter", expression: "e_o(t) = \\frac{AB}{2}\\sin(\\theta_i - \\theta_o)" },
        { label: "Small Phase Error Approx", expression: "e_o(t) \\approx \\frac{AB}{2}(\\theta_i - \\theta_o)" },
        { label: "VCO Frequency", expression: "\\omega_o(t) = \\omega_c + K_v e_o(t)" },
        { label: "Transfer Function (PLL)", expression: "T(s) = \\frac{G(s)}{1 + G(s)H(s)}" },
        { label: "Closed Loop Gain", expression: "T(s) = \\frac{K}{s + K}" },
        { label: "Lock Condition", expression: "\\omega_o = \\omega_i" },
        { label: "FM Demodulation Output", expression: "e_o(t) \\propto m(t)" },
      ],
    },
    blockDiagram: {
      description: "PLL: Phase detector → Loop filter → VCO → feedback.",
      svgLabel: "Phase Locked Loop",
      blocks: [
        { label: "Input Signal", x: 20, y: 60, w: 110, h: 40 },
        { label: "Phase Detector", x: 170, y: 60, w: 130, h: 40 },
        { label: "Loop Filter H(s)", x: 350, y: 60, w: 130, h: 40 },
        { label: "VCO", x: 350, y: 150, w: 90, h: 40 },
        { label: "Output e₀(t)", x: 530, y: 60, w: 110, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 3 },
        { from: 3, to: 1 },
      ],
    },
    circuitDiagram: {
      image: "pll.jpeg",
      description: "PLL circuit: input signal A·sin(ωct+θi) and VCO output B·cos(ωct+θo) fed to a multiplier (phase detector). Output x(t) passes through Loop Filter H(s) to produce e₀(t), which feeds back to control the VCO.",
      svgLabel: "PLL Circuit",
      elements: [
        "Phase detector (analog multiplier)",
        "Loop filter H(s) (RC or active integrator)",
        "VCO — output frequency controlled by e₀(t)",
        "Feedback path from VCO output to phase detector",
      ],
    },
    simulation: {
      type: "pll",
      description: "Physically accurate PLL simulation. Models the feedback loop (multiplier, filter, VCO) to demonstrate phase locking and signal recovery.",
      parameters: [
        { name: "Input Amp (Ac)", default: 5, min: 1, max: 10, step: 0.5 },
        { name: "Loop Gain (K)", default: 50, min: 10, max: 200, step: 5 },
        { name: "Filter Cutoff (Hz)", default: 10, min: 2, max: 50, step: 1 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.5, step: 0.01 },
        { name: "Message Freq (fm)", default: 3, min: 1, max: 15, step: 1 },
      ],
    },
    numericals: [
      {
        id: "pll-1",
        title: "Steady-State Phase Error",
        difficulty: "Medium",
        given: "Kv = 10⁴ rad/s/V, Kd = 2 V/rad, Δω = 2000 rad/s",
        formula: "Δω = Kv · Kd · sin(θe)",
        steps: [
          "1. Use relation: Δω = Kv · eo, where eo = Kd · sin(θe)",
          "2. Substitute: Δω = Kv · Kd · sin(θe)",
          "3. Solve for sin(θe): sin(θe) = 2000 / (10⁴ · 2) = 2000 / 20000 = 0.1",
          "4. θe = arcsin(0.1) ≈ 0.1002 radians",
        ],
        answer: "θe ≈ 0.1002 radians",
      },
      {
        id: "pll-2",
        title: "VCO Control Voltage",
        difficulty: "Easy",
        given: "fc = 5 MHz, Kv = 50 kHz/V, Δf = 10 kHz",
        formula: "Δf = Kv · eo",
        steps: [
          "1. The relation between freq deviation and control voltage: Δf = Kv · eo",
          "2. Rearrange for eo: eo = Δf / Kv",
          "3. substitute: eo = 10 kHz / 50 kHz/V = 0.2 Volts",
        ],
        answer: "eo = 0.2 Volts",
      },
      {
        id: "pll-3",
        title: "Loop Gain and Stability",
        difficulty: "Hard",
        given: "Kd = 1 V/rad, Kv = 2000 rad/s/V, Filter cutoff = 500 rad/s, Signal freq = 100 rad/s",
        formula: "K = Kd · Kv",
        steps: [
          "1. Loop Gain (K): K = Kd · Kv = 1 × 2000 = 2000 rad/s",
          "2. Compare loop bandwidth with signal frequency: Loop BW = 500 rad/s, ωm = 100 rad/s",
          "3. Since 500 > 100, the loop can effectively track the input phase variation.",
        ],
        answer: "K = 2000 rad/s; System can track effectively.",
      },
    ],
  },

  // ─── 15. SUPERHETERODYNE RECEIVER ───
  {
    id: "superheterodyne",
    title: "Superheterodyne Receiver",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "The superheterodyne receiver converts the incoming RF signal to a fixed intermediate frequency (IF) using a local oscillator and mixer.",
        "Standard AM broadcast IF = 455 kHz. The local oscillator frequency: f_LO = f_c + f_IF (up-conversion).",
        "The fixed IF allows high selectivity and sensitivity using IF amplifiers tuned to a single frequency.",
        "Image frequency f_image = f_c + 2f_IF must be rejected by the RF filter at the input.",
      ],
      formulas: [
        { label: "Local oscillator", expression: "f_{LO} = f_c + f_{IF}" },
        { label: "Image frequency", expression: "f_{image} = f_c + 2f_{IF}" },
        { label: "IF output", expression: "f_{IF} = |f_{LO} - f_c|" },
      ],
    },
    blockDiagram: {
      description: "Antenna → RF filter → Mixer → IF Amp → Detector → Audio Amp.",
      svgLabel: "Superheterodyne Receiver",
      blocks: [
        { label: "Antenna", x: 10, y: 60, w: 80, h: 35 },
        { label: "RF Filter", x: 110, y: 60, w: 90, h: 35 },
        { label: "Mixer", x: 220, y: 60, w: 80, h: 35 },
        { label: "LO", x: 220, y: 130, w: 70, h: 35 },
        { label: "IF Amp", x: 320, y: 60, w: 80, h: 35 },
        { label: "Detector", x: 420, y: 60, w: 90, h: 35 },
        { label: "Audio Amp", x: 530, y: 60, w: 100, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 3, to: 2 },
        { from: 2, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
      ],
    },
    circuitDiagram: {
      image: "superhet_realistic.png",
      description: "Premium Superheterodyne Receiver schematic featuring RF, LO, Mixer, and IF stages on a realistic workspace.",
      svgLabel: "Realistic Superheterodyne Receiver",
      elements: [
        "RF Filter Stage (Pre-selector)",
        "Local Oscillator (Ganged with RF)",
        "Mixer/Frequency Converter",
        "IF Filter Chain (High Selectivity)",
        "Envelope Detector & Audio Stage",
      ],
    },
    simulation: {
      type: "superhet",
      description: "Realistic Superheterodyne simulation. Adjust RF Gain, IF Selectivity, and LO Stability to see the impact on Image Rejection and Signal SNR.",
      parameters: [
        { name: "RF Stage Gain", default: 1.2, min: 0.5, max: 2.5, step: 0.1 },
        { name: "LO Stability", default: 0.98, min: 0.8, max: 1.0, step: 0.01 },
        { name: "IF Filter Q", default: 25, min: 5, max: 80, step: 1 },
        { name: "Carrier Freq (Hz)", default: 100, min: 50, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 10, step: 1 },
        { name: "Channel Noise", default: 0.05, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "sh-1",
        title: "Local Oscillator Frequency",
        difficulty: "Easy",
        given: "fc = 1200 kHz, IF = 455 kHz",
        formula: "f_LO = fc + f_IF",
        steps: ["f_LO = 1200 + 455 = 1655 kHz"],
        answer: "f_LO = 1655 kHz",
      },
      {
        id: "sh-2",
        title: "Image Frequency Rejection",
        difficulty: "Medium",
        given: "fc = 1000 kHz, IF = 455 kHz",
        formula: "f_image = fc + 2×IF",
        steps: [
          "f_image = 1000 + 2×455 = 1910 kHz",
          "Separation = 2×IF = 910 kHz",
          "RF filter must provide ≥40 dB rejection at 1910 kHz",
        ],
        answer: "f_image = 1910 kHz, 910 kHz from desired",
      },
      {
        id: "sh-3",
        title: "LO Tuning Range",
        difficulty: "Hard",
        given: "AM broadcast: 540-1600 kHz, IF = 455 kHz",
        formula: "f_LO range = (540+455) to (1600+455)",
        steps: [
          "f_LO_min = 540 + 455 = 995 kHz",
          "f_LO_max = 1600 + 455 = 2055 kHz",
          "Tuning ratio = 2055/995 = 2.065",
          "Capacitance ratio needed = (2.065)² = 4.26",
        ],
        answer: "LO range: 995–2055 kHz, tuning ratio 2.065:1",
      },
    ],
  },

  // ─── 16. ANGLE MODULATION ───
  {
    id: "angle-modulation",
    title: "Angle Modulation",
    category: "Angle Modulation",
    theory: {
      points: [
        "In angle modulation, the angle θ(t) of the carrier A·cos[θ(t)] is varied according to the message signal.",
        "The instantaneous frequency is ωᵢ = dθ(t)/dt. For FM: ωᵢ = ωc + kf·m(t). For PM: θ(t) = ωc·t + kp·m(t).",
        "Angle modulation is constant-envelope — immune to non-linear distortion and amplitude fading.",
        "The bandwidth of angle-modulated signals is much larger than AM, but offers noise suppression advantage (SNR trade-off).",
      ],
      formulas: [
        { label: "General form", expression: "\\varphi(t) = A\\cos[\\omega_c t + \\psi(t)]" },
        { label: "Instantaneous freq", expression: "\\omega_i = \\frac{d\\theta(t)}{dt} = \\omega_c + \\frac{d\\psi(t)}{dt}" },
        { label: "FM", expression: "\\omega_i = \\omega_c + k_f m(t)" },
        { label: "PM", expression: "\\theta(t) = \\omega_c t + k_p m(t)" },
      ],
    },
    blockDiagram: {
      description: "Angle modulation consists of two main subparts: Phase Modulation (PM) and Frequency Modulation (FM).",
      svgLabel: "Angle Modulation Subparts",
      blocks: [
        { label: "Angle Modulation", x: 180, y: 20, w: 160, h: 40 },
        { label: "Phase Modulation (PM)", x: 70, y: 100, w: 180, h: 40 },
        { label: "Frequency Mod. (FM)", x: 270, y: 100, w: 180, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
      ],
    },
    numericals: [
      {
        id: "ang-1",
        title: "Instantaneous Frequency of FM",
        difficulty: "Easy",
        given: "fc = 100 MHz, kf = 2π×10⁵, m(t) = cos(2π×1000t), m_peak = 1",
        formula: "fi = fc + (kf/2π)×m(t)",
        steps: [
          "Δf = kf/(2π) × m_peak = 10⁵ × 1 = 100 kHz",
          "fi_max = 100 MHz + 100 kHz = 100.1 MHz",
          "fi_min = 100 MHz - 100 kHz = 99.9 MHz",
        ],
        answer: "fi ranges from 99.9 MHz to 100.1 MHz",
      },
      {
        id: "ang-2",
        title: "PM vs FM Phase Deviation",
        difficulty: "Medium",
        given: "m(t) = cos(2π×1000t), kp = π/2, kf = 2π×10⁵",
        formula: "PM: Δφ = kp × m_peak; FM: Δf = kf×m_peak/(2π)",
        steps: [
          "PM phase deviation: Δφ = (π/2) × 1 = π/2 = 1.571 rad",
          "FM freq deviation: Δf = 10⁵ Hz = 100 kHz",
          "FM phase deviation: β = Δf/fm = 100000/1000 = 100 rad",
          "FM has much larger phase deviation than PM here",
        ],
        answer: "PM: Δφ = 1.571 rad; FM: β = 100 rad",
      },
      {
        id: "ang-3",
        title: "Power of Angle-Modulated Signal",
        difficulty: "Hard",
        given: "φ(t) = 10cos[ωc·t + 5sin(ωm·t)]",
        formula: "P = A²/2 (constant envelope)",
        steps: [
          "Amplitude A = 10 (constant, independent of modulation)",
          "P = A²/2 = 100/2 = 50 W (normalized)",
          "Power is same regardless of modulation index",
          "This is a key advantage of angle modulation",
        ],
        answer: "Power = 50 W (constant, independent of β)",
      },
    ],
  },

  // ─── 17. FM ───
  {
    id: "fm",
    title: "Frequency Modulation (FM)",
    category: "Angle Modulation",
    theory: {
      points: [
        "In FM, the instantaneous frequency is linearly proportional to the message: ωᵢ = ωc + kf·m(t).",
        "The FM signal: φ_FM(t) = A·cos[ωc·t + kf∫m(α)dα].",
        "For tone modulation: φ(t) = A·cos[ωc·t + β·sin(ωm·t)], where β = Δf/fm is the modulation index.",
        "Carson's rule for bandwidth: B_FM = 2(Δf + B) = 2B(β + 1), where B is the message bandwidth.",
      ],
      formulas: [
        { label: "FM signal", expression: "\\varphi_{FM}(t) = A\\cos\\left[\\omega_c t + k_f \\int m(\\alpha)d\\alpha\\right]" },
        { label: "Frequency deviation", expression: "\\Delta f = \\frac{k_f m_p}{2\\pi}" },
        { label: "Modulation index", expression: "\\beta = \\frac{\\Delta f}{f_m}" },
        { label: "Carson's rule", expression: "B_{FM} = 2(\\Delta f + B) = 2B(\\beta + 1)" },
      ],
    },
    blockDiagram: {
      description: "Direct FM: VCO controlled by message. Indirect (Armstrong): NBFM → frequency multiplier → WBFM.",
      svgLabel: "FM Transmitter (Armstrong)",
      blocks: [
        { label: "m(t)", x: 10, y: 60, w: 80, h: 35 },
        { label: "NBFM Gen", x: 110, y: 60, w: 100, h: 35 },
        { label: "Freq ×n", x: 240, y: 60, w: 100, h: 35 },
        { label: "Mixer", x: 370, y: 60, w: 80, h: 35 },
        { label: "Freq ×m", x: 480, y: 60, w: 100, h: 35 },
        { label: "WBFM", x: 610, y: 60, w: 90, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
      ],
    },
    circuitDiagram: {
      image: "fm_realistic.png",
      description: "High-Fidelity 2N3904 FM Transmitter. This 'bug' circuit modulates the carrier by varying the base-emitter capacitance through mic bias.",
      svgLabel: "Realistic FM Transmitter Circuit",
      elements: [
        "Q1 (2N3904) - High-frequency NPN transistor",
        "L1 and C4 (1-40pF) - Resonant LC tank circuit",
        "Mic Input with C3 (1uF) coupling",
        "R1 (5.6k), R2 (10k) - Base bias network",
        "R3 (1k) - Emitter degeneration stability",
        "C2 (4.7pF) - Oscillatory feedback loop",
        "C1 (0.01uF) - Supply noise decoupling",
      ],
    },
    simulation: {
      type: "fm-realistic",
      description: "Component-level FM Transmitter simulation. Adjust L, C, and Supply Voltage to see how they impact oscillator frequency and SNR.",
      parameters: [
        { name: "Supply (Vcc)", default: 9, min: 3, max: 18, step: 0.5 },
        { name: "Inductance (uH)", default: 0.15, min: 0.05, max: 0.5, step: 0.01 },
        { name: "Capacitance (pF)", default: 35, min: 10, max: 100, step: 5 },
        { name: "Tank Q-Factor", default: 15, min: 5, max: 50, step: 1 },
        { name: "Mic Sensitivity", default: 4, min: 1, max: 10, step: 0.5 },
        { name: "Channel Noise", default: 0.05, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "fm-1",
        title: "FM Bandwidth (Carson's Rule)",
        difficulty: "Easy",
        given: "Δf = 75 kHz, fm = 15 kHz",
        formula: "BW = 2(Δf + fm)",
        steps: [
          "β = Δf/fm = 75/15 = 5",
          "BW = 2(75 + 15) = 180 kHz",
        ],
        answer: "FM bandwidth = 180 kHz",
      },
      {
        id: "fm-2",
        title: "Armstrong FM Transmitter Design",
        difficulty: "Medium",
        given: "Required: fc = 91.2 MHz, Δf = 75 kHz. Crystal: f₁ = 200 kHz, Δf₁ = 25 Hz",
        formula: "Multiplication factor n = Δf_required / Δf₁",
        steps: [
          "n = 75000/25 = 3000",
          "Use 64×48 = 3072 (close to 3000)",
          "Actual Δf = 25 × 3072 = 76.8 kHz",
          "Carrier: 200 kHz × 3072 would be too high → use frequency mixing",
        ],
        answer: "Multiplication = 3072, Δf = 76.8 kHz",
      },
      {
        id: "fm-3",
        title: "Bessel Function Bandwidth",
        difficulty: "Hard",
        given: "β = 5, fm = 10 kHz",
        formula: "Number of significant sidebands ≈ β + 1",
        steps: [
          "Significant sidebands = β + 1 = 6",
          "BW = 2 × 6 × fm = 120 kHz",
          "Carson's rule: 2(50+10) = 120 kHz ✓",
          "98% power bandwidth (from Bessel tables): ~160 kHz",
        ],
        answer: "BW ≈ 120-160 kHz (6 significant sideband pairs)",
      },
    ],
  },

  // ─── 18. PM ───
  {
    id: "pm",
    title: "Phase Modulation (PM)",
    category: "Angle Modulation",
    theory: {
      points: [
        "In PM, the phase of the carrier is directly proportional to the message: θ(t) = ωc·t + kp·m(t).",
        "The instantaneous frequency: ωᵢ = ωc + kp·ṁ(t), where ṁ(t) is the derivative of m(t).",
        "PM of m(t) is equivalent to FM of ṁ(t), and vice versa — FM of m(t) equals PM of ∫m(t)dt.",
        "The bandwidth of PM depends on the spectral content of m(t), unlike FM where it depends mainly on the peak amplitude.",
      ],
      formulas: [
        { label: "PM signal", expression: "\\varphi_{PM}(t) = A\\cos[\\omega_c t + k_p m(t)]" },
        { label: "Phase deviation", expression: "\\Delta\\phi = k_p m_p" },
        { label: "PM bandwidth", expression: "B_{PM} = 2\\left(\\frac{k_p \\dot{m}_p}{2\\pi} + B\\right)" },
      ],
    },
    blockDiagram: {
      description: "PM modulator: message signal controls phase of carrier oscillator.",
      svgLabel: "PM Modulator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "Phase Mod", x: 150, y: 60, w: 120, h: 40 },
        { label: "Carrier ωc", x: 150, y: 140, w: 110, h: 40 },
        { label: "PM Output", x: 330, y: 60, w: 110, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 1 },
        { from: 1, to: 3 },
      ],
    },
    circuitDiagram: {
      image: "pm.jpeg",
      description: "Voltage-controlled phase shifter using a varactor diode bridge.",
      svgLabel: "PM Circuit (Varactor Bridge)",
      elements: [
        "Crystal oscillator (stable carrier source)",
        "Varactor diode D1 (voltage-variable capacitance)",
        "Phase-shift network (L1 and D1 bridge)",
        "Resistor bias network R_bias",
        "Buffer amplifier at output",
      ],
    },
    simulation: {
      type: "pm",
      description: "Realistic PM simulation. Adjust the Varactor Bias and Phase Sensitivity to control the phase deviation.",
      parameters: [
        { name: "Varactor Bias (V)", default: 5, min: 1, max: 10, step: 0.5 },
        { name: "Phase Sensitivity (Kp)", default: 2, min: 0.5, max: 10, step: 0.5 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "pm-1",
        title: "PM Phase Deviation",
        difficulty: "Easy",
        given: "kp = π/2, m(t) = cos(2π×1000t), m_peak = 1",
        formula: "Δφ = kp × m_peak",
        steps: [
          "Δφ = (π/2) × 1 = π/2 rad",
          "= 90°",
        ],
        answer: "Phase deviation = π/2 rad (90°)",
      },
      {
        id: "pm-2",
        title: "PM Frequency Deviation",
        difficulty: "Medium",
        given: "kp = π/2, m(t) = cos(2π×1000t), fm = 1 kHz",
        formula: "Δf = kp × fm × m_peak",
        steps: [
          "ṁ(t) = -2π×1000×sin(2π×1000t)",
          "ṁ_peak = 2π×1000",
          "Δf = kp × ṁ_peak / (2π) = (π/2)(2π×1000)/(2π)",
          "Δf = 500π/2π = 500 Hz... wait: Δf = kp × ṁ_peak/(2π) = (π/2)(2π×1000)/(2π) = 500 Hz",
        ],
        answer: "Frequency deviation Δf = 500 Hz",
      },
      {
        id: "pm-3",
        title: "PM Bandwidth",
        difficulty: "Hard",
        given: "kp = 2 rad, m(t) with B = 5 kHz, ṁ_peak = 2π×20000",
        formula: "B_PM = 2(Δf + B)",
        steps: [
          "Δf = kp × ṁ_peak / (2π) = 2 × 2π×20000 / (2π) = 40 kHz",
          "B_PM = 2(40 + 5) = 90 kHz",
          "β = Δf/B = 40/5 = 8",
          "This is wideband PM",
        ],
        answer: "PM bandwidth = 90 kHz, β = 8",
      },
    ],
  },

  // ─── 19. NBFM ───
  {
    id: "nbfm",
    title: "Narrowband FM (NBFM)",
    category: "Angle Modulation",
    theory: {
      points: [
        "NBFM has β << 1, meaning the frequency deviation is much smaller than the message bandwidth.",
        "For small β: φ(t) ≈ A[cos(ωc·t) - β·sin(ωm·t)·sin(ωc·t)], resembling AM in bandwidth (BW ≈ 2B).",
        "NBFM is used as a starting point in Armstrong's indirect FM transmitter, then frequency-multiplied to WBFM.",
        "NBFM has no noise improvement over AM — only WBFM provides the SNR advantage.",
      ],
      formulas: [
        { label: "NBFM approximation", expression: "\\varphi(t) \\approx A[\\cos(\\omega_c t) - \\beta \\sin(\\omega_m t) \\sin(\\omega_c t)]" },
        { label: "Condition", expression: "\\beta = \\frac{\\Delta f}{f_m} \\ll 1" },
        { label: "Bandwidth", expression: "BW_{NBFM} \\approx 2B" },
      ],
    },
    blockDiagram: {
      description: "NBFM generator: multiply message integral by sin(ωc·t), subtract from carrier.",
      svgLabel: "NBFM Generator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 35 },
        { label: "∫ Integrator", x: 130, y: 60, w: 110, h: 35 },
        { label: "× (-sin ωc·t)", x: 270, y: 60, w: 130, h: 35 },
        { label: "Σ + cos(ωc·t)", x: 430, y: 60, w: 140, h: 35 },
        { label: "NBFM", x: 600, y: 60, w: 80, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "nbfm.jpeg",
      description: "Armstrong modulator for generating NBFM using an indirect method.",
      svgLabel: "NBFM Armstrong Circuit",
      elements: [
        "Integrator circuit for m(t)",
        "Balanced Modulator for DSB-SC creation",
        "Crystal oscillator (center frequency)",
        "90° degree phase shifter",
        "Adder Stage for phasor summation",
      ],
    },
    simulation: {
      type: "nbfm",
      description: "Realistic NBFM simulation. Demonstrates the phasor addition method cos(ωct) - β·sin(ωmt)sin(ωct).",
      parameters: [
        { name: "Integrator Gain", default: 0.3, min: 0.1, max: 1.0, step: 0.1 },
        { name: "Modulator Balance", default: 1.0, min: 0, max: 1.0, step: 0.1 },
        { name: "Carrier Level", default: 1.0, min: 0.5, max: 2.0, step: 0.1 },
        { name: "Channel Noise", default: 0.01, min: 0, max: 0.2, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "nb-1",
        title: "Verify NBFM Condition",
        difficulty: "Easy",
        given: "Δf = 25 Hz, fm = 50 Hz",
        formula: "β = Δf/fm",
        steps: [
          "β = 25/50 = 0.5",
          "β = 0.5 < 1 → NBFM condition satisfied (borderline)",
        ],
        answer: "β = 0.5 — qualifies as NBFM",
      },
      {
        id: "nb-2",
        title: "NBFM Distortion",
        difficulty: "Medium",
        given: "β = 0.5 (tone modulation)",
        formula: "3rd harmonic distortion ≈ β²/4",
        steps: [
          "Distortion from Armstrong approximation",
          "3rd harmonic component ≈ β³/(4) relative to fundamental",
          "= (0.5)³ / 4 = 0.125/4 = 0.03125",
          "≈ 3.125% distortion",
        ],
        answer: "Third harmonic distortion ≈ 3.125%",
      },
      {
        id: "nb-3",
        title: "NBFM to WBFM Conversion",
        difficulty: "Hard",
        given: "NBFM: Δf = 25 Hz, fc = 200 kHz. Required: Δf = 75 kHz, fc = 100 MHz",
        formula: "n = Δf_req / Δf_NBFM = 75000/25 = 3000",
        steps: [
          "Multiplication needed: n = 75000/25 = 3000",
          "Carrier after ×3000: 200 kHz × 3000 = 600 MHz (too high!)",
          "Solution: multiply ×64, mix down, then multiply ×48",
          "64 × 48 = 3072 → Δf = 25 × 3072 = 76.8 kHz",
        ],
        answer: "Use ×64 then mixer then ×48, total ×3072",
      },
    ],
  },

  // ─── 20. NBPM ───
  {
    id: "nbpm",
    title: "Narrowband PM (NBPM)",
    category: "Angle Modulation",
    theory: {
      points: [
        "NBPM has kp·m_peak << 1, meaning the phase deviation is much less than 1 radian.",
        "For small phase deviation: φ(t) ≈ A[cos(ωc·t) - kp·m(t)·sin(ωc·t)], similar to DSB-SC + carrier.",
        "NBPM bandwidth is approximately 2B, same as NBFM and DSB.",
        "NBPM is structurally similar to AM but the modulated component is in quadrature (sin instead of cos).",
      ],
      formulas: [
        { label: "NBPM signal", expression: "\\varphi(t) \\approx A[\\cos(\\omega_c t) - k_p m(t) \\sin(\\omega_c t)]" },
        { label: "Condition", expression: "k_p m_p \\ll 1" },
        { label: "Bandwidth", expression: "BW_{NBPM} \\approx 2B" },
      ],
    },
    blockDiagram: {
      description: "NBPM: m(t) modulates sin(ωc·t), then subtracted from cos(ωc·t).",
      svgLabel: "NBPM Generator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 35 },
        { label: "× (-sin ωc·t)", x: 150, y: 60, w: 130, h: 35 },
        { label: "× kp", x: 150, y: 130, w: 80, h: 35 },
        { label: "Σ + cos(ωc·t)", x: 330, y: 60, w: 140, h: 35 },
        { label: "NBPM Output", x: 510, y: 60, w: 110, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "nbpm_realistic.png",
      description: "Realistic Narrowband PM (NBPM) Generator: Uses a stable carrier oscillator with a -90 phase shift network and a balanced modulator.",
      svgLabel: "Realistic NBPM Circuit",
      elements: [
        "Carrier Oscillator (cos wc t)",
        "Quadrature Phase Shifter (-90 deg)",
        "Balanced Modulator (DSB-SC)",
        "Summing Junction (Carrier + sidebands)",
      ],
    },
    simulation: {
      type: "nbpm",
      description: "Realistic NBPM simulation. Demonstrates generation via quadrature carrier addition: Ac*cos(wc*t) - Ac*kp*m(t)*sin(wc*t).",
      parameters: [
        { name: "Carrier Level", default: 1.0, min: 0.5, max: 2.0, step: 0.1 },
        { name: "Phase Sensitivity (Kp)", default: 0.2, min: 0.05, max: 0.5, step: 0.05 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 150, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 15, step: 1 },
        { name: "Channel Noise", default: 0.01, min: 0, max: 0.2, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "nbpm-1",
        title: "NBPM Phase Deviation",
        difficulty: "Easy",
        given: "kp = 0.2 rad/V, m_peak = 1 V",
        formula: "Δφ = kp × m_peak",
        steps: ["Δφ = 0.2 × 1 = 0.2 rad", "= 11.5°", "0.2 < 1 → NBPM valid"],
        answer: "Δφ = 0.2 rad (11.5°) — NBPM valid",
      },
      {
        id: "nbpm-2",
        title: "NBPM vs AM Comparison",
        difficulty: "Medium",
        given: "NBPM: A=1, kp=0.3, m(t)=cos(ωm·t)",
        formula: "Compare with AM: A[1+μcos(ωm·t)]cos(ωc·t)",
        steps: [
          "NBPM: cos(ωc·t) - 0.3cos(ωm·t)sin(ωc·t)",
          "= cos(ωc·t) - 0.15[sin(ωc+ωm)t - sin(ωc-ωm)t]",
          "AM: cos(ωc·t) + 0.15[cos(ωc+ωm)t + cos(ωc-ωm)t]",
          "Same BW, but sidebands are in quadrature (sin vs cos)",
        ],
        answer: "NBPM has quadrature sidebands vs AM's in-phase sidebands",
      },
      {
        id: "nbpm-3",
        title: "NBPM Power Distribution",
        difficulty: "Hard",
        given: "A = 10 V, kp = 0.1, m(t) = cos(ωm·t)",
        formula: "Carrier power = A²/2, Sideband power = (A×kp)²/4",
        steps: [
          "Carrier power = 100/2 = 50 W",
          "Sideband amplitude = A×kp = 10×0.1 = 1 V",
          "Each sideband: (1)²/(2×2) = 0.25 W",
          "Total sideband power = 0.5 W",
          "Efficiency = 0.5/50.5 ≈ 1%",
        ],
        answer: "Carrier = 50W, Sidebands = 0.5W, η ≈ 1%",
      },
    ],
  },

  // ─── 21. FM DEMODULATION ───
  {
    id: "fm-demodulation",
    title: "Demodulation of FM",
    category: "Angle Modulation",
    theory: {
      points: [
        "Frequency Modulation (FM) is an angle modulation technique where the instantaneous frequency of the carrier varies with the message signal. Since FM is constant-amplitude, demodulation requires converting frequency variations back into amplitude variations.",
        "Method 1 — Frequency-to-Amplitude Conversion (Slope Detection): Uses a differentiator (d/dt) followed by an Envelope Detector. The derivative of an FM signal includes a term proportional to m(t) in its amplitude, so the differentiator converts frequency information into amplitude changes. The Envelope Detector then extracts these amplitude variations to recover the original message.",
        "Method 2 — Limiter-Discriminator Method: Used when the incoming signal amplitude is not constant (e.g., due to noise). Hard Limiter removes amplitude variations, squaring up the signal to ensure constant amplitude. Bandpass Filter (BPF) extracts the fundamental component, resulting in a clean FM signal with restored constant amplitude.",
        "Practical demodulators include: slope detector, balanced discriminator, ratio detector, PLL demodulator, and zero-crossing detector.",
      ],
      formulas: [
        { label: "FM Signal", expression: "\\varphi_{FM}(t) = A\\cos\\left[\\omega_c t + k_f \\int m(\\alpha)\\, d\\alpha\\right]" },
        { label: "Differentiator Output", expression: "y(t) = \\frac{d}{dt}\\varphi_{FM}(t) = -A\\sin[\\cdots]\\cdot[\\omega_c + k_f m(t)]" },
        { label: "Envelope Detector Output", expression: "\\text{Output} \\propto A[\\omega_c + k_f m(t)]" },
        { label: "Recovered Message", expression: "m(t) \\propto \\text{Output} - A\\omega_c" },
      ],
    },
    blockDiagram: {
      description: "FM Demodulator: Limiter → Differentiator → Envelope Detector.",
      svgLabel: "FM Demodulator",
      blocks: [
        { label: "FM Input", x: 10, y: 60, w: 100, h: 40 },
        { label: "BPF Limiter", x: 140, y: 60, w: 110, h: 40 },
        { label: "Differentiator", x: 280, y: 60, w: 120, h: 40 },
        { label: "Envelope Det", x: 430, y: 60, w: 120, h: 40 },
        { label: "m(t) Output", x: 580, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "demo fm.jpeg",
      description: "Balanced discriminator (FM Demodulator) using stagger-tuned circuits.",
      svgLabel: "FM Discriminator Circuit",
      elements: [
        "Center-tapped input transformer",
        "Top LC tank (tuned to fc + Δf)",
        "Bottom LC tank (tuned to fc - Δf)",
        "Two diode envelope detectors",
        "Subtractor/Adder for message recovery",
      ],
    },
    simulation: {
      type: "fm-demod",
      description: "Demodulation of FM using a Balanced Discriminator. Shows the frequency-to-voltage conversion (S-curve).",
      parameters: [
        { name: "LC Tuning Dev", default: 10, min: 1, max: 20, step: 1 },
        { name: "Detector Gain", default: 1.0, min: 0.5, max: 2.0, step: 0.1 },
        { name: "LPF Cutoff", default: 5, min: 1, max: 15, step: 1 },
        { name: "Channel Noise", default: 0.02, min: 0, max: 0.5, step: 0.01 },
      ],
    },
    numericals: [
      {
        id: "fmd-1",
        title: "Slope Detector Sensitivity",
        difficulty: "Easy",
        given: "S-curve slope = 0.5 V/kHz, Δf = 75 kHz",
        formula: "Output voltage = slope × Δf",
        steps: [
          "V_out = 0.5 × 75 = 37.5 V peak",
          "But linear range limits actual output",
        ],
        answer: "Max output = 37.5 V peak (if linear range permits)",
      },
      {
        id: "fmd-2",
        title: "PLL FM Demodulator Output",
        difficulty: "Medium",
        given: "kf = 2π×75000, VCO sensitivity c = 2π×50000 rad/s/V",
        formula: "e₀(t) = (kf/c)×m(t)",
        steps: [
          "Gain = kf/c = 75000/50000 = 1.5",
          "If m(t) = cos(2π×1000t), output = 1.5cos(2π×1000t)",
          "Output amplitude = 1.5 V",
        ],
        answer: "Demodulated output gain = 1.5",
      },
      {
        id: "fmd-3",
        title: "Threshold Effect in FM",
        difficulty: "Hard",
        given: "FM broadcast: BW = 200 kHz, B = 15 kHz, γ = SNR at input",
        formula: "Threshold γ_th ≈ 10β(β+1) (approximate)",
        steps: [
          "β = (BW/2 - B)/B = (100-15)/15 ≈ 5.67",
          "γ_th ≈ 10 × 5.67 × 6.67 ≈ 378",
          "γ_th (dB) ≈ 10log(378) = 25.8 dB",
          "Below this SNR, FM quality degrades rapidly",
        ],
        answer: "FM threshold ≈ 25.8 dB input SNR",
      },
    ],
  },

  // ─── 22. DIRECT FM GENERATION ───
  {
    id: "direct-fm",
    title: "Direct Generation of FM",
    category: "Angle Modulation",
    theory: {
      points: [
        "Direct FM is a method in which the instantaneous frequency of the carrier is varied directly by the message signal.",
        "In this method, a Voltage Controlled Oscillator (VCO) is used. The message signal m(t) is applied to a varactor diode present in the LC tank circuit. This changes the capacitance of the circuit.",
        "Since the resonant frequency of an LC oscillator depends on capacitance, any variation in capacitance results in a change in frequency, thereby producing frequency modulation.",
        "Thus, the carrier frequency varies continuously according to the message signal.",
        "Working Principle: Message signal → changes capacitance → changes resonant frequency → FM signal generated.",
        "Advantages: Simple implementation. Large frequency deviation easily achieved.",
        "Disadvantages: Poor frequency stability. Affected by temperature and component variations. Less accurate compared to indirect (Armstrong) method.",
      ],
      formulas: [
        { label: "Oscillator Frequency", expression: "\\omega_0 = \\frac{1}{\\sqrt{LC}}" },
        { label: "Variable Capacitance (Varactor Diode)", expression: "C = C_0 - k\\,m(t)" },
        { label: "Modified Frequency", expression: "\\omega = \\frac{1}{\\sqrt{L(C_0 - k\\,m(t))}}" },
        { label: "Approximation (small signals)", expression: "\\omega \\approx \\omega_c\\left(1 + \\frac{k\\,m(t)}{2C_0}\\right)" },
        { label: "FM Equation", expression: "\\omega = \\omega_c + k_f\\,m(t)" },
        { label: "Frequency Sensitivity", expression: "k_f = \\frac{k\\,\\omega_c}{2C_0}" },
      ],
    },
    blockDiagram: {
      description: "Direct FM: message controls VCO frequency directly.",
      svgLabel: "Direct FM Generator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "VCO", x: 150, y: 60, w: 100, h: 40 },
        { label: "Buffer Amp", x: 300, y: 60, w: 110, h: 40 },
        { label: "FM Output", x: 460, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ],
    },
    circuitDiagram: {
      description: "Hartley/Colpitts oscillator with varactor diode for FM generation.",
      svgLabel: "Direct FM Circuit",
      elements: [
        "Colpitts oscillator topology",
        "Varactor (varicap) diode in tank circuit",
        "DC bias sets center frequency",
        "Message signal modulates varactor capacitance",
        "AFC (automatic frequency control) for stability",
      ],
    },
    simulation: {
      type: "fm",
      description: "Visualize direct FM output from VCO.",
      parameters: [
        { name: "Mod Index (β)", default: 3, min: 0.5, max: 10, step: 0.5 },
        { name: "Center Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 15, step: 1 },
      ],
    },
    numericals: [
      {
        id: "dfm-1",
        title: "Frequency Sensitivity Calculation",
        difficulty: "Medium",
        given: "fc = 10 MHz, C₀ = 100 pF, k = 5 pF/V",
        formula: "k_f = (k · ωc) / (2C₀)",
        steps: [
          "Step 1: Convert fc to ωc: ωc = 2πfc = 2π × 10⁷ rad/s",
          "Step 2: Substitute k, ωc, and C₀ into the formula: k_f = (k · ωc) / (2C₀)",
          "Step 3: Keep units consistent: k = 5 × 10⁻¹² F/V, C₀ = 100 × 10⁻¹² F",
          "k_f = (5 × 10⁻¹² × 2π × 10⁷) / (2 × 100 × 10⁻¹²)",
          "k_f = (10π × 10⁻¹² × 10⁷) / (200 × 10⁻¹²) = (10π × 10⁷) / 200",
          "k_f = π × 10⁷ / 20 = 500,000π rad/s/V ≈ 1.57 × 10⁶ rad/s/V",
        ],
        answer: "kf ≈ 1.57 × 10⁶ rad/s/V",
      },
      {
        id: "dfm-2",
        title: "Instantaneous Frequency Shift",
        difficulty: "Hard",
        given: "L = 10 μH, C₀ = 50 pF, k = 2 pF/V, m(t) = 2 cos(2π · 10³ t) V",
        formula: "ω(t) = 1/√(L(C₀ - k·m(t)))",
        steps: [
          "Step 1: Find carrier frequency fc (when m(t) = 0): fc = 1 / (2π√(LC₀))",
          "fc = 1 / (2π√(10 × 10⁻⁶ × 50 × 10⁻¹²)) = 1 / (2π√(500 × 10⁻¹⁸))",
          "fc ≈ 1 / (2π × 2.236 × 10⁻⁸) ≈ 7.12 MHz",
          "Step 2: Find maximum instantaneous frequency deviation Δω.",
          "Hint: Use approximation ω ≈ ωc (1 + (k·m(t))/(2C₀))",
          "Peak deviation Δω = (ωc · k · mp) / (2C₀), where mp = 2V",
          "Δω = (2π × 7.12 × 10⁶ · 2 × 10⁻¹² · 2) / (2 · 50 × 10⁻¹²)",
          "Δω = (2π × 7.12 × 10⁶ · 4) / 100 = 0.04 · (2π × 7.12 × 10⁶)",
          "Δf = Δω / 2π = 0.04 · 7.12 MHz = 284.8 kHz",
        ],
        answer: "fc ≈ 7.12 MHz, Peak deviation Δf ≈ 284.8 kHz",
      },
    ],
  },
];

// ─── DUMMY TOPIC: Introduction ───
const introTopics: TopicData[] = [
  {
    id: "intro-comm",
    title: "Introduction to Communication",
    category: "Introduction",
    theory: {
      points: [
        "Communication is the process of transferring information from one point to another through a medium.",
        "In engineering, it involves sending signals (voice, data, or video) from a transmitter to a receiver with minimal loss and distortion.",
        "Types of Communication Systems: (1) Analog Communication and (2) Digital Communication.",
        "Analog Communication: Uses continuous signals that vary smoothly over time. Examples: Human voice, radio signals. Techniques: Amplitude Modulation (AM), Frequency Modulation (FM). Limitation: More susceptible to noise and distortion.",
        "Digital Communication: Uses discrete signals (0s and 1s). Conversion process includes Sampling, Quantization, and Encoding (PCM). Advantages: Better noise immunity, higher reliability, improved data security. Applications: Mobile networks, Internet.",
      ],
      formulas: [],
    },
    blockDiagram: { description: "Basic communication system block diagram.", svgLabel: "Communication System", blocks: [{ label: "Source", x: 20, y: 60, w: 80, h: 40 }, { label: "Transmitter", x: 140, y: 60, w: 110, h: 40 }, { label: "Channel", x: 290, y: 60, w: 90, h: 40 }, { label: "Receiver", x: 420, y: 60, w: 100, h: 40 }, { label: "Destination", x: 560, y: 60, w: 100, h: 40 }], arrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }] },
  },
  {
    id: "modulation-need",
    title: "Need for Modulation",
    category: "Introduction",
    theory: {
      points: [
        "Modulation is needed because baseband signals cannot be efficiently radiated as electromagnetic waves — antenna size would be impractically large.",
        "Modulation allows frequency division multiplexing (FDM) so multiple signals can share the same channel.",
        "It shifts the signal spectrum to a higher frequency range suitable for transmission.",
        "Types of modulation: Amplitude (AM), Frequency (FM), and Phase (PM).",
      ],
      formulas: [],
    },
    blockDiagram: { description: "Modulation overview.", svgLabel: "Modulation Types", blocks: [{ label: "Baseband", x: 20, y: 60, w: 90, h: 40 }, { label: "Modulator", x: 160, y: 60, w: 100, h: 40 }, { label: "RF Signal", x: 310, y: 60, w: 100, h: 40 }], arrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }] },
    numericals: [{ id: "mod-1", title: "Antenna Length Calculation", difficulty: "Easy", given: "Audio signal f = 5 kHz, speed of light c = 3×10⁸ m/s", formula: "L = c/(4f)", steps: ["L = 3×10⁸ / (4 × 5000)", "L = 15000 m = 15 km (impractical!)"], answer: "L = 15 km — hence modulation is needed" }],
  },
];

// ─── DUMMY TOPIC: Signals & Systems ───
const signalsTopics: TopicData[] = [
  {
    id: "signal-classification",
    title: "Signal Classification",
    category: "Signals & Systems",
    theory: {
      points: [
        "Signals can be classified as continuous-time or discrete-time, periodic or aperiodic, deterministic or random.",
        "Energy signals have finite energy: E = ∫|x(t)|² dt < ∞. Power signals have finite average power.",
        "Even signals satisfy x(-t) = x(t); odd signals satisfy x(-t) = -x(t).",
        "Any signal can be decomposed into even and odd parts: x(t) = xₑ(t) + xₒ(t).",
      ],
      formulas: [
        { label: "Energy", expression: "E = \\int_{-\\infty}^{\\infty} |x(t)|^2 \\, dt" },
        { label: "Power", expression: "P = \\lim_{T\\to\\infty} \\frac{1}{2T} \\int_{-T}^{T} |x(t)|^2 \\, dt" },
      ],
    },
    blockDiagram: { description: "Signal classification tree.", svgLabel: "Signal Types", blocks: [{ label: "Signals", x: 200, y: 20, w: 100, h: 35 }, { label: "Continuous", x: 80, y: 90, w: 110, h: 35 }, { label: "Discrete", x: 310, y: 90, w: 100, h: 35 }], arrows: [{ from: 0, to: 1 }, { from: 0, to: 2 }] },
    numericals: [{ id: "sig-1", title: "Energy of a Signal", difficulty: "Easy", given: "x(t) = 2e^(-t)u(t)", formula: "E = ∫₀^∞ 4e^(-2t) dt", steps: ["E = 4 × [-1/2 × e^(-2t)]₀^∞", "E = 4 × 1/2 = 2 J"], answer: "E = 2 Joules" }],
  },
  {
    id: "fourier-series",
    title: "Fourier Series & Transform",
    category: "Signals & Systems",
    theory: {
      points: [
        "The Fourier series represents a periodic signal as a sum of harmonically related sinusoids.",
        "The Fourier Transform extends this to aperiodic signals: X(ω) = ∫x(t)e^(-jωt) dt.",
        "Properties: linearity, time shifting, frequency shifting, convolution theorem, Parseval's theorem.",
        "The frequency domain representation reveals the spectral content (bandwidth) of a signal.",
      ],
      formulas: [
        { label: "Fourier Transform", expression: "X(\\omega) = \\int_{-\\infty}^{\\infty} x(t) e^{-j\\omega t} \\, dt" },
        { label: "Inverse FT", expression: "x(t) = \\frac{1}{2\\pi} \\int_{-\\infty}^{\\infty} X(\\omega) e^{j\\omega t} \\, d\\omega" },
        { label: "Parseval's", expression: "\\int |x(t)|^2 dt = \\frac{1}{2\\pi} \\int |X(\\omega)|^2 d\\omega" },
      ],
    },
    blockDiagram: { description: "Fourier analysis pipeline.", svgLabel: "Fourier Analysis", blocks: [{ label: "x(t)", x: 20, y: 60, w: 80, h: 40 }, { label: "FT", x: 150, y: 60, w: 80, h: 40 }, { label: "X(ω)", x: 280, y: 60, w: 80, h: 40 }], arrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }] },
    numericals: [{ id: "ft-1", title: "FT of Rectangular Pulse", difficulty: "Medium", given: "x(t) = rect(t/τ), τ = 1ms", formula: "X(ω) = τ sinc(ωτ/2)", steps: ["Apply Fourier Transform definition to rect(t/τ)", "X(ω) = τ sinc(ωτ/2)", "The sinc function is defined as sinc(x) = sin(x)/x", "First null at ω = 2π/τ, i.e., f = 1/τ = 1000 Hz", "Bandwidth ≈ 1 kHz"], answer: "X(ω) = τ sinc(ωτ/2), BW ≈ 1 kHz" }],
  },
];

// ─── DUMMY TOPIC: Noise Analysis ───
const noiseTopics: TopicData[] = [
  {
    id: "noise-intro",
    title: "Noise in Communication",
    category: "Noise Analysis",
    theory: {
      points: [
        "Noise is any unwanted signal that interferes with the desired signal and degrades communication quality.",
        "External noise sources: atmospheric, man-made, extraterrestrial. Internal noise: thermal (Johnson), shot noise.",
        "Thermal noise power: N = kTB, where k is Boltzmann's constant, T is temperature (K), B is bandwidth (Hz).",
        "The noise figure (F) quantifies how much noise a device adds: F = SNR_in / SNR_out.",
      ],
      formulas: [
        { label: "Thermal Noise", expression: "N = kTB" },
        { label: "Noise Figure", expression: "F = \\frac{\\text{SNR}_{in}}{\\text{SNR}_{out}}" },
      ],
    },
    blockDiagram: { description: "Noise in a cascaded system.", svgLabel: "Noise Analysis", blocks: [{ label: "Source", x: 20, y: 60, w: 80, h: 40 }, { label: "Stage 1 (F₁,G₁)", x: 140, y: 60, w: 130, h: 40 }, { label: "Stage 2 (F₂,G₂)", x: 310, y: 60, w: 130, h: 40 }, { label: "Output", x: 480, y: 60, w: 80, h: 40 }], arrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }] },
    circuitDiagram: { description: "Resistor thermal noise model.", svgLabel: "Thermal Noise", elements: ["Noisy resistor modeled as ideal R + voltage source vₙ", "vₙ = √(4kTRB)", "Equivalent noise bandwidth"] },
    numericals: [{ id: "noise-1", title: "Thermal Noise Power", difficulty: "Easy", given: "T = 290K, B = 1 MHz, k = 1.38×10⁻²³ J/K", formula: "N = kTB", steps: ["N = 1.38×10⁻²³ × 290 × 10⁶", "N = 4 × 10⁻¹⁵ W", "N(dBm) = -114 dBm"], answer: "N = 4×10⁻¹⁵ W = -114 dBm" }],
  },
  {
    id: "snr-analysis",
    title: "SNR & Performance Analysis",
    category: "Noise Analysis",
    theory: {
      points: [
        "Signal-to-Noise Ratio (SNR) is the measure of the quality of a communication system, defined as the ratio of signal power to noise power at the output.",
        "A higher SNR indicates better signal quality, while a lower SNR results in distortion and poor performance.",
        "Noise in communication systems is generally modeled as Additive White Gaussian Noise (AWGN), which has a constant Power Spectral Density (PSD). The PSD of noise is constant over frequency, given by N/2.",
        "The total noise power depends on the system bandwidth. As bandwidth increases, noise power also increases, which degrades SNR.",
        "In communication systems like DSB-SC, the output SNR is approximately equal to the input SNR. This means DSB-SC does not improve noise performance, but only shifts the signal in frequency.",
        "Filtering plays an important role in reducing noise by limiting the bandwidth.",
        "Performance Insights: (1) Increasing signal power improves SNR. (2) Increasing bandwidth increases noise → reduces SNR. (3) Proper filtering improves system performance. (4) SNR determines overall system reliability and quality.",
      ],
      formulas: [
        { label: "Basic SNR", expression: "\\text{SNR} = \\frac{S_o}{N_o}" },
        { label: "Noise PSD", expression: "S_n(f) = \\frac{N}{2}" },
        { label: "Noise Power", expression: "N_o = NB" },
        { label: "SNR Expression", expression: "\\text{SNR} = \\frac{S_o}{NB}" },
        { label: "DSB-SC Output SNR", expression: "\\text{SNR}_{out} = \\text{SNR}_{in}" },
      ],
    },
    blockDiagram: { description: "Performance comparison block.", svgLabel: "SNR Comparison", blocks: [{ label: "Input SNR", x: 20, y: 60, w: 100, h: 40 }, { label: "Demodulator", x: 170, y: 60, w: 110, h: 40 }, { label: "Output SNR", x: 330, y: 60, w: 100, h: 40 }], arrows: [{ from: 0, to: 1 }, { from: 1, to: 2 }] },
    numericals: [
      {
        id: "snr-1",
        title: "Basic SNR Calculation",
        difficulty: "Easy",
        given: "Signal power Sₒ = 10 W, Noise power Nₒ = 2 W",
        formula: "SNR = Sₒ / Nₒ",
        steps: [
          "SNR = Sₒ / Nₒ",
          "SNR = 10 / 2",
          "SNR = 5",
        ],
        answer: "SNR = 5",
      },
      {
        id: "snr-2",
        title: "Noise Power Calculation",
        difficulty: "Easy",
        given: "Noise PSD N = 10⁻⁶ W/Hz, Bandwidth B = 5 kHz",
        formula: "Nₒ = N × B",
        steps: [
          "Nₒ = N × B",
          "Nₒ = 10⁻⁶ × 5000",
          "Nₒ = 5 × 10⁻³ W",
        ],
        answer: "Nₒ = 5 × 10⁻³ W",
      },
    ],
  },
];

// ============================================================
// LAB EXPERIMENTS — Step-by-step practical guides
// ============================================================
const experimentTopics: TopicData[] = [
  {
    id: "am-experiment",
    title: "Amplitude Modulation (Lab)",
    category: "Lab Experiments",
    theory: {
      points: [
        "A continuous-wave goes on continuously without any intervals and it is the base-band message signal, which contains the information. This wave has to be modulated.",
        "According to the standard definition, 'The amplitude of the carrier signal varies in accordance with the instantaneous amplitude of the modulating signal.'",
        "The circuit for Amplitude modulation consists of diode, resistors and a LC circuit.",
        "The mixed signal from the message and carrier source is fed to the diode and resistor, which rectifies the signal.",
        "The LC circuit is a band-pass filter whose frequency is equal to the carrier frequency.",
        "The parallel LC circuit allows only the AM output (both carrier signal and its sideband) to pass through and shunts off other signals to ground.",
        "At the carrier frequency, L and C repeatedly exchange energy with each other resulting in an oscillation that produces negative half-cycle pulse for every positive pulse coming out of the diode.",
        "The amplitude of the negative pulse follow the positive cycles so we get a complete waveform.",
      ],
      formulas: [
        { label: "Modulation Index", expression: "\\mu = \\frac{A_m}{A_c}" },
        { label: "Time-domain Representation", expression: "S(t) = [A_c + A_m \\cos(2\\pi f_m t)] \\cos(2\\pi f_c t)" },
        { label: "Modulation Index (from Peak)", expression: "\\mu = \\frac{A_{max} - A_{min}}{A_{max} + A_{min}}" },
      ],
    },
    blockDiagram: {
      description: "Diode-based modulator with LC tank filter.",
      svgLabel: "AM Experiment Block Diagram",
      blocks: [
        { label: "Summer (m(t)+c(t))", x: 20, y: 60, w: 120, h: 40 },
        { label: "Diode Rectifier", x: 180, y: 60, w: 100, h: 40 },
        { label: "LC Tank (BPF)", x: 320, y: 60, w: 100, h: 40 },
        { label: "AM Output", x: 460, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ],
    },
    circuitDiagram: {
      description: "Practical Diode Modulator circuit using V1=2V (1kHz), V2=4V (20kHz), and an LC filter tuned to the carrier.",
      svgLabel: "Lab AM Modulator Schematic",
      elements: [
        "V1 (Message Signal) - 2.00V, 1.00kHz",
        "V2 (Carrier Signal) - 4.00V, 20.0kHz",
        "R3, R4 (Mixing Resistors) - 1.00kΩ each",
        "D1 (Diode) - Rectifies the composite signal",
        "R1 (Bias Resistor) - 2.20kΩ",
        "R2 (Load Resistor) - 1kΩ",
        "C1 (Filter Capacitor) - 1μF",
        "L1 (Inductor) - 1.00mH (forming LC tank)",
      ],
    },
    simulation: {
      type: "am-experiment",
      description: "Interactive simulation of the Diode Modulator lab circuit. Observe how the Rectification and LC filtering stages create the AM envelope.",
      parameters: [
        { name: "Message Amp (Am)", default: 2, min: 0, max: 5, step: 0.1 },
        { name: "Carrier Amp (Ac)", default: 4, min: 1, max: 10, step: 0.1 },
        { name: "Message Freq (fm)", default: 1000, min: 100, max: 5000, step: 100 },
        { name: "Carrier Freq (fc)", default: 20000, min: 5000, max: 50000, step: 1000 },
        { name: "Tank Tuning (Q)", default: 15, min: 5, max: 50, step: 1 },
      ],
    },
    experiment: {
      aim: "To design an Amplitude Modulator circuit by using diodes and observing the modulation performed for a given waveform.",
      apparatus: [
        "Voltage Supply",
        "Function Generator",
        "Oscilloscope",
        "Probes",
      ],
      componentsRequired: [
        "Bread Board",
        "Diode (1N4007 or similar)",
        "Capacitor - 1μF (1)",
        "Resistors - 1kΩ (3), 2.2kΩ (1)",
        "Inductor 1mH",
        "Connecting Wires",
      ],
      observations: [
        "The positive and negative peaks of the carrier wave are interconnected with an imaginary line called 'Envelope'.",
        "The envelope shape recreates the exact shape of the modulating signal.",
        "With m(t)=2V and c(t)=4V, the modulation index μ = 0.5, which is < 1 (Undermodulation).",
      ],
      conclusion: "We have successfully observed the undistorted modulated signal with μ < 1 and the Envelope of modulated signal was observed to vary between (Ac - Am) and (Ac + Am).",
      image: "/am_lab_setup_realistic_1776663905403.png",
    },
  },
  {
    id: "am-demod-experiment",
    title: "Amplitude Demodulation (Lab)",
    category: "Lab Experiments",
    theory: {
      points: [
        "After modulation, we need to get our original signal from carrier wave. The process of getting original signal is called demodulation and the device used to do this is called demodulator.",
        "The modulated signal is given by y(t) = [A + m(t)] cos(ωct).",
        "After passing through the diode (rectification), the signal contains a DC term, message frequency components, and higher-order carrier harmonics.",
        "A low-pass filter (RC filter) is used to block the higher frequency components (ωc, 2ωc, etc.).",
        "The remaining signal after filtering is proportional to the original message signal m(t).",
        "Mathematically, the extracted (filtered) signal's amplitude is reduced by a factor of 1/π.",
      ],
      formulas: [
        { label: "Rectified Output", expression: "y(t)_{rect} = [A + m(t)] \\cos(\\omega_c t) \\times [\\frac{1}{2} + \\frac{2}{\\pi}(\\cos \\omega_c t - \\frac{1}{3} \\cos 3\\omega_c t + \\dots)]" },
        { label: "Demodulated m(t)", expression: "v_{out}(t) = \\frac{m(t)}{\\pi}" },
      ],
    },
    blockDiagram: {
      description: "Simple Diode Envelope Detector with RC Low Pass Filter.",
      svgLabel: "AM Demodulation Block Diagram",
      blocks: [
        { label: "AM Input", x: 20, y: 60, w: 100, h: 40 },
        { label: "Diode Rectifier", x: 170, y: 60, w: 100, h: 40 },
        { label: "RC LPF", x: 320, y: 60, w: 100, h: 40 },
        { label: "Detected m(t)", x: 470, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ],
    },
    circuitDiagram: {
      description: "Practical Diode Envelope Detector using 10kΩ resistor and 1μF capacitor as a Low Pass Filter.",
      svgLabel: "Lab AM Demodulator Schematic",
      elements: [
        "AM Wave Input - Modulated signal from experiment 1",
        "D1 (Diode) - Half-wave rectifier",
        "R (Load Resistor) - 10kΩ",
        "C (Filter Capacitor) - 1μF (forming RC LPF)",
        "Demodulated Signal - Recovered baseband message",
      ],
    },
    simulation: {
      type: "am-demod-experiment",
      description: "Visualize the rectification and filtering process. Observe the ripple and the factor of 1/π reduction in the output amplitude.",
      parameters: [
        { name: "Input AM Amp", default: 6, min: 2, max: 15, step: 0.5 },
        { name: "Filter Resistance (R)", default: 10, min: 1, max: 50, step: 1 },
        { name: "Filter Capacitance (C)", default: 1, min: 0.1, max: 10, step: 0.1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 15, step: 1 },
      ],
    },
    experiment: {
      aim: "To design an Amplitude Demodulation circuit and observe the recovery of the message signal from a modulated carrier.",
      apparatus: [
        "Breadboard",
        "Function generators",
        "DSO (Digital Signal Oscilloscope)",
        "Capacitor (1μF)",
        "Resistors (1kΩ, 2.2kΩ, 10kΩ)",
        "Inductance Box",
        "Probes & connecting wires",
      ],
      componentsRequired: [
        "Bread Board",
        "Diode (1N4007)",
        "Capacitor - 1μF (1)",
        "Resistor - 10kΩ (1)",
        "Connecting Wires",
      ],
      observations: [
        "The process of getting the original signal from the carrier wave is successful.",
        "The RC filter effectively blocks the high-frequency carrier components.",
        "The output signal amplitude is observed to be reduced by a factor of approximately 1/π compared to the original message.",
      ],
      conclusion: "We successfully implemented the circuit and observed the original signal recovery. The amplitude reduction matches the theoretical 1/π factor.",
    },
  },
  {
    id: "fm-555-experiment",
    title: "Frequency Modulation (555)",
    category: "Lab Experiments",
    theory: {
      points: [
        "Frequency Modulation is a form of modulation in which changes in the carrier wave frequency correspond directly to changes in the baseband signal.",
        "FM is considered an analog form of modulation because the band signal is typically an analog waveform without discrete digital values.",
        "A generalized sinusoidal signal is given by φ(t) = A cos[θ(t)], where θ(t) is the generalized angle function of time.",
        "The instantaneous frequency ωi is defined as ωi = ωc + k_FM * m(t).",
        "The 555 timer in Astable mode acts as a Voltage Controlled Oscillator (VCO). By applying the message signal to the Control Voltage (Pin 5), we modulate the charging/discharging thresholds, varying the frequency.",
        "The carrier frequency (free-running frequency) for this setup is approximately 3.07 kHz based on Ra=Rb=4.7kΩ and C=0.1μF.",
      ],
      formulas: [
        { label: "Phase Function", expression: "\\theta(t) = \\omega_c t + k_f \\int m(\\alpha) \\, d\\alpha" },
        { label: "FM Waveform", expression: "\\phi_{FM}(t) = A \\cos[\\omega_c t + k_f \\int m(\\alpha) \\, d\\alpha]" },
        { label: "Astable Frequency", expression: "f_0 = \\frac{1}{0.693 \\times (R_a + R_b) \\times C}" },
      ],
    },
    blockDiagram: {
      description: "555 Timer configured as a Voltage Controlled Oscillator (VCO).",
      svgLabel: "FM 555 Block Diagram",
      blocks: [
        { label: "Message m(t)", x: 20, y: 60, w: 100, h: 40 },
        { label: "555 VCO (Pin 5)", x: 170, y: 30, w: 120, h: 100 },
        { label: "FM Output (Pin 3)", x: 340, y: 60, w: 120, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
      ],
    },
    circuitDiagram: {
      description: "Practical FM circuit using a 555 Timer in Astable mode. Message signal is applied to Pin 5.",
      svgLabel: "Lab FM 555 Schematic",
      elements: [
        "555 Timer IC (Astable Configuration)",
        "Ra, Rb (Timing Resistors) - 4.70kΩ each",
        "C (Timing Capacitor) - 0.1μF",
        "Control Voltage (Pin 5) - Modulation Input",
        "Output (Pin 3) - Frequency Modulated Square Wave",
      ],
    },
    simulation: {
      type: "fm-555-experiment",
      description: "Observe how the input analog signal modulates the frequency of the 555 timer's square wave output.",
      parameters: [
        { name: "Message Amp (Am)", default: 2, min: 0, max: 5, step: 0.1 },
        { name: "Message Freq (fm)", default: 200, min: 10, max: 1000, step: 10 },
        { name: "Carrier Freq (fc)", default: 3070, min: 1000, max: 10000, step: 100 },
        { name: "Mod Sens (Sensitivity)", default: 50, min: 10, max: 200, step: 5 },
      ],
    },
    experiment: {
      aim: "To design a frequency Modulation circuit using a 555 timer.",
      apparatus: [
        "Breadboard",
        "555 Timer IC",
        "Capacitors - 10μF, 0.1μF",
        "Resistors - 4.7kΩ (2), 10kΩ (1)",
        "Probes & Connecting Wires",
      ],
      componentsRequired: [
        "Bread Board",
        "555 Timer IC (1)",
        "Capacitor - 0.1μF (1)",
        "Resistors - 4.7kΩ (2), 10kΩ (1)",
        "Connecting Wires",
      ],
      observations: [
        "The output frequency of the 555 timer changes in proportion to the instantaneous amplitude of the message signal.",
        "A higher message voltage results in a lower frequency (due to charging threshold shift).",
        "The output is a constant amplitude square wave with varying pulse width/frequency.",
      ],
      conclusion: "We successfully implemented a frequency modulated signal using a 555 timer with a carrier frequency of approximately 3.07 kHz.",
    },
  },
];

// Combine all topics
export const topics: TopicData[] = [
  ...topics_core,
  ...introTopics,
  ...signalsTopics,
  ...noiseTopics,
  ...experimentTopics,
];

// ============================================================
// CATEGORY GROUPING — for sidebar organization
// ============================================================
export const categories = [
  {
    name: "Introduction",
    topicIds: ["intro-comm", "modulation-need"],
  },
  {
    name: "Signals & Systems",
    topicIds: ["signal-classification", "fourier-series"],
  },
  {
    name: "Amplitude Modulation",
    topicIds: [
      "am", "nonlinear-modulator", "ring-modulator",
      "frequency-mixer", "dsb-sc", "am-demodulation", "envelope-detector",
      "ssb", "hilbert-transform", "qam", "vsb",
      "superheterodyne",
    ],
  },
  {
    name: "Phase Locked Loop",
    topicIds: ["pll"],
  },
  {
    name: "Angle Modulation",
    topicIds: [
      "angle-modulation", "fm", "pm", "nbfm", "nbpm",
      "fm-demodulation", "direct-fm",
    ],
  },
  {
    name: "Noise Analysis",
    topicIds: ["noise-intro", "snr-analysis"],
  },
  {
    name: "Lab Experiments",
    topicIds: ["am-experiment", "am-demod-experiment", "fm-555-experiment"],
  },
];
