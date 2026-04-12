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
    type: "am" | "fm" | "pm" | "dsb" | "ssb" | "generic";
    description: string;
    parameters: { name: string; default: number; min: number; max: number; step: number }[];
  };
  numericals?: NumericalProblem[];
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
      image: "am.png",   // ✅ ADD THIS

      description: "AM can be generated using a switching modulator...",
      svgLabel: "AM Generator Circuit",
      elements: [
        "Message source m(t) connected to transformer primary",
        "Carrier cos(ωc·t) drives switching diodes D1, D2",
        "Bandpass filter tuned to ωc at output",
        "Output: AM signal φ_AM(t)",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize AM waveform with adjustable modulation index and carrier frequency.",
      parameters: [
        { name: "Modulation Index (μ)", default: 0.5, min: 0, max: 1, step: 0.05 },
        { name: "Carrier Freq (Hz)", default: 50, min: 10, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
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
        "Two matched diodes D1 and D2",
        "Input transformer coupling m(t)",
        "Carrier injection cos(ωc·t)",
        "Subtractor circuit at output",
        "Bandpass filter centered at ωc",
      ],
    },
    simulation: {
      type: "dsb",
      description: "Visualize DSB-SC output from a non-linear modulator.",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
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

  // ─── 3. SWITCHING MODULATOR ───
  {
    id: "switching-modulator",
    title: "Switching Modulator",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "The carrier signal acts as a periodic switch, represented by a periodic square wave w(t) with Fourier series expansion.",
        "The switching function w(t) = ½ + (2/π)cos(ωc·t) - (2/3π)cos(3ωc·t) + ...",
        "The product m(t)·w(t) contains m(t)·cos(ωc·t) as a component, which when bandpass filtered gives DSB-SC.",
        "This approach avoids the need for an analog multiplier — only a switch (diode) is required.",
      ],
      formulas: [
        { label: "Switching function", expression: "w(t) = \\frac{1}{2} + \\frac{2}{\\pi}\\cos(\\omega_c t) - \\frac{2}{3\\pi}\\cos(3\\omega_c t) + \\cdots" },
        { label: "Output (filtered)", expression: "\\varphi(t) = \\frac{2}{\\pi} m(t) \\cos(\\omega_c t)" },
      ],
    },
    blockDiagram: {
      description: "Message m(t) is multiplied by switching function w(t), then bandpass filtered.",
      svgLabel: "Switching Modulator Block Diagram",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "× Switch", x: 160, y: 60, w: 110, h: 40 },
        { label: "w(t) from carrier", x: 160, y: 140, w: 140, h: 40 },
        { label: "BPF at ωc", x: 330, y: 60, w: 110, h: 40 },
        { label: "DSB-SC", x: 490, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 2, to: 1 },
        { from: 1, to: 3 },
        { from: 3, to: 4 },
      ],
    },
    circuitDiagram: {
      image: "switching.jpeg",
      description: "A diode switching circuit where the carrier switches the diode ON/OFF, modulating the message signal.",
      svgLabel: "Switching Modulator Circuit",
      elements: [
        "Diode D1 as switch",
        "Message signal input through resistor",
        "Carrier cos(ωc·t) drives the diode",
        "Bandpass filter at output tuned to ωc",
      ],
    },
    simulation: {
      type: "dsb",
      description: "Visualize switching modulator output (DSB-SC).",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
      ],
    },
    numericals: [
      {
        id: "sw-1",
        title: "Output Amplitude of Switching Modulator",
        difficulty: "Easy",
        given: "m(t) = 5cos(2π×1000t), carrier frequency fc = 100 kHz",
        formula: "Output = (2/π) × m(t) × cos(ωc·t)",
        steps: [
          "Output amplitude = (2/π) × 5",
          "= 10/π",
          "≈ 3.18 V",
        ],
        answer: "Peak output amplitude ≈ 3.18 V",
      },
      {
        id: "sw-2",
        title: "Bandwidth of Switching Modulator Output",
        difficulty: "Medium",
        given: "Message bandwidth B = 5 kHz, carrier frequency fc = 500 kHz",
        formula: "BW_DSB = 2B",
        steps: [
          "DSB-SC occupies frequencies from (fc - B) to (fc + B)",
          "BW = 2 × B = 2 × 5 kHz",
          "BW = 10 kHz",
          "Signal occupies 495 kHz to 505 kHz",
        ],
        answer: "Bandwidth = 10 kHz (495–505 kHz)",
      },
      {
        id: "sw-3",
        title: "Power in Switching Modulator Output",
        difficulty: "Hard",
        given: "m(t) = 4cos(ωm·t), R = 50Ω",
        formula: "P = (2/π)² × m²_rms / R",
        steps: [
          "Output peak = (2/π) × 4 = 8/π V",
          "RMS of DSB-SC = (8/π) / (2√2) = 4/(π√2)",
          "P = [4/(π√2)]² / 50",
          "P ≈ 0.081 W = 81 mW",
        ],
        answer: "Output power ≈ 81 mW (into 50Ω)",
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
      type: "dsb",
      description: "Visualize ring modulator DSB-SC waveform.",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
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
      description: "Any modulator circuit (switching, ring, etc.) can serve as a mixer by replacing the carrier with the local oscillator signal.",
      svgLabel: "Frequency Mixer Circuit",
      elements: [
        "Input signal at carrier ωc",
        "Local oscillator at ωmix",
        "Diode or transistor mixer stage",
        "IF bandpass filter at output",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize frequency translation of a signal.",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Original Carrier (Hz)", default: 80, min: 30, max: 200, step: 5 },
        { name: "New IF (Hz)", default: 30, min: 10, max: 100, step: 5 },
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
      description: "An analog multiplier IC (like AD633) with m(t) and cos(ωc·t) as inputs.",
      svgLabel: "DSB-SC Circuit",
      elements: [
        "Analog multiplier IC",
        "Message input m(t)",
        "Carrier input cos(ωc·t)",
        "Output proportional to m(t)×cos(ωc·t)",
      ],
    },
    simulation: {
      type: "dsb",
      description: "Visualize DSB-SC waveform showing carrier suppression and double sidebands.",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
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
      description: "Envelope detector using a diode, capacitor, and resistor.",
      svgLabel: "Envelope Detector Circuit",
      elements: [
        "Diode D1 (half-wave rectifier)",
        "Parallel RC network (C charges, R discharges)",
        "RC time constant: 1/fc << RC << 1/(2πB)",
        "Output follows envelope A + m(t)",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize AM signal and its demodulated envelope.",
      parameters: [
        { name: "Modulation Index (μ)", default: 0.7, min: 0.1, max: 1, step: 0.05 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
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
      description: "Simple diode-RC envelope detector circuit.",
      svgLabel: "Envelope Detector Circuit",
      elements: [
        "Diode (1N4148 or similar)",
        "Capacitor C in parallel with Resistor R",
        "DC blocking capacitor at output",
        "Output: recovered message m(t)",
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
      description: "SSB generator using selective filtering: DSB-SC modulator followed by a sharp-cutoff sideband filter.",
      svgLabel: "SSB Filter Method Circuit",
      elements: [
        "Balanced modulator for DSB-SC generation",
        "Crystal or ceramic sideband filter",
        "Filter passes USB (or LSB) only",
        "Output: SSB signal",
      ],
    },
    simulation: {
      type: "ssb",
      description: "Visualize SSB (USB) waveform compared to DSB.",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
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
    circuitDiagram: {
      description: "Practical Hilbert transformer approximated using all-pass filter networks.",
      svgLabel: "Hilbert Transformer Circuit",
      elements: [
        "Cascade of all-pass filter sections",
        "Each section provides ~90° phase shift over a band",
        "Multiple sections for wideband coverage",
        "Output approximates -π/2 phase shift",
      ],
    },
    simulation: {
      type: "generic",
      description: "Visualize a signal and its Hilbert transform (90° phase shift).",
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
      type: "am",
      description: "Visualize QAM with two independent message signals.",
      parameters: [
        { name: "Signal 1 Freq (Hz)", default: 3, min: 1, max: 15, step: 1 },
        { name: "Signal 2 Freq (Hz)", default: 7, min: 1, max: 15, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
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
        "VSB is a compromise between DSB and SSB: one sideband is passed almost completely, and a vestige (trace) of the other sideband is retained.",
        "VSB is used when the message signal has significant low-frequency content (e.g., TV video) that makes SSB filtering impractical.",
        "The VSB shaping filter H_i(ω) must satisfy: H_i(ω+ωc) + H_i(ω-ωc) = 1 for |ω| ≤ 2πB, ensuring distortionless recovery.",
        "VSB bandwidth is between B (SSB) and 2B (DSB): BW_VSB = B + f_v, where f_v is the vestigial bandwidth.",
      ],
      formulas: [
        { label: "VSB spectrum", expression: "\\Phi_{VSB}(\\omega) = [M(\\omega+\\omega_c) + M(\\omega-\\omega_c)]H_i(\\omega)" },
        { label: "Filter condition", expression: "H_i(\\omega + \\omega_c) + H_i(\\omega - \\omega_c) = 1, \\quad |\\omega| \\leq 2\\pi B" },
        { label: "Bandwidth", expression: "BW_{VSB} = B + f_v" },
      ],
    },
    blockDiagram: {
      description: "DSB modulator followed by VSB shaping filter.",
      svgLabel: "VSB Modulator",
      blocks: [
        { label: "m(t)", x: 20, y: 60, w: 80, h: 40 },
        { label: "× cos(ωc·t)", x: 150, y: 60, w: 120, h: 40 },
        { label: "H_i(ω) VSB Filter", x: 330, y: 60, w: 150, h: 40 },
        { label: "φ_VSB(t)", x: 530, y: 60, w: 100, h: 40 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 1, to: 2 },
        { from: 2, to: 3 },
      ],
    },
    circuitDiagram: {
      image: "vsb.jpeg",
      description: "Standard DSB modulator followed by a VSB shaping filter with gradual roll-off.",
      svgLabel: "VSB System Circuit",
      elements: [
        "Balanced modulator for DSB-SC",
        "VSB filter with linear roll-off transition",
        "Equalizer at receiver: H₀(ω)",
        "Envelope detector (for VSB+C)",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize VSB waveform — partial sideband retention.",
      parameters: [
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 20, step: 1 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
      ],
    },
    numericals: [
      {
        id: "vsb-1",
        title: "VSB Bandwidth",
        difficulty: "Easy",
        given: "Message BW B = 4.2 MHz, vestige f_v = 0.75 MHz",
        formula: "BW = B + f_v",
        steps: [
          "BW = 4.2 + 0.75 = 4.95 MHz",
        ],
        answer: "VSB bandwidth = 4.95 MHz",
      },
      {
        id: "vsb-2",
        title: "TV Channel Bandwidth",
        difficulty: "Medium",
        given: "Video BW = 4.2 MHz, vestige = 0.75 MHz, audio at fc+4.5 MHz (FM)",
        formula: "Total channel BW = video VSB + guard + audio",
        steps: [
          "VSB video = 4.2 + 0.75 = 4.95 MHz",
          "Audio subcarrier at 4.5 MHz from video carrier",
          "Audio FM bandwidth ≈ 50 kHz",
          "Total channel ≈ 6 MHz (standard TV allocation)",
        ],
        answer: "Total TV channel = 6 MHz",
      },
      {
        id: "vsb-3",
        title: "Output Equalizer Design",
        difficulty: "Hard",
        given: "H_i has linear rolloff from 1 to 0 over f_v = 1 MHz centered at fc",
        formula: "H₀(ω) = 1 / [H_i(ω+ωc) + H_i(ω-ωc)]",
        steps: [
          "At f = 0: H_i(ωc) + H_i(-ωc) = 0.5 + 0.5 = 1 → H₀ = 1",
          "At f = f_v/2: sum = 0.75 + 0.25 = 1 → H₀ = 1",
          "H_i satisfies symmetry condition → H₀(ω) = 1 for |f| < B",
          "No equalizer needed if H_i has odd symmetry about fc",
        ],
        answer: "H₀(ω) = 1 (no equalization needed with symmetric H_i)",
      },
    ],
  },

  // ─── 13. CARRIER ACQUISITION ───
  {
    id: "carrier-acquisition",
    title: "Carrier Acquisition",
    category: "Amplitude Modulation",
    theory: {
      points: [
        "Synchronous demodulation requires the receiver to regenerate a carrier exactly matching the transmitted carrier in frequency and phase.",
        "A frequency error Δω in the local carrier causes the output m(t)cos(Δω·t), producing a beating effect — catastrophic distortion.",
        "A phase error δ causes output attenuation: m(t)cos(δ), which reduces signal strength but doesn't distort.",
        "Methods: (1) Pilot carrier transmission; (2) Squaring loop (for DSB-SC); (3) Costas loop; (4) Phase-locked loop (PLL).",
      ],
      formulas: [
        { label: "Output with freq error", expression: "e_o(t) = m(t)\\cos(\\Delta\\omega \\cdot t + \\delta)" },
        { label: "Phase error only", expression: "e_o(t) = m(t)\\cos(\\delta)" },
        { label: "Freq error only", expression: "e_o(t) = m(t)\\cos(\\Delta\\omega \\cdot t)" },
      ],
    },
    blockDiagram: {
      description: "Costas loop for carrier recovery in DSB-SC.",
      svgLabel: "Costas Loop",
      blocks: [
        { label: "Input DSB-SC", x: 20, y: 70, w: 110, h: 35 },
        { label: "× cos branch", x: 170, y: 30, w: 110, h: 35 },
        { label: "× sin branch", x: 170, y: 110, w: 110, h: 35 },
        { label: "LPF I", x: 330, y: 30, w: 80, h: 35 },
        { label: "LPF Q", x: 330, y: 110, w: 80, h: 35 },
        { label: "× Phase Det", x: 460, y: 70, w: 110, h: 35 },
        { label: "VCO", x: 300, y: 180, w: 80, h: 35 },
      ],
      arrows: [
        { from: 0, to: 1 },
        { from: 0, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 3, to: 5 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
      ],
    },
    circuitDiagram: {
      image: "carrier-ac_dsbsc.jpeg",
      description: "Squaring loop carrier recovery circuit.",
      svgLabel: "Carrier Acquisition Circuit",
      elements: [
        "Squaring device (produces 2ωc component)",
        "Narrowband BPF at 2ωc",
        "Frequency divider (÷2)",
        "Output: recovered carrier at ωc",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize effect of frequency/phase error on demodulation.",
      parameters: [
        { name: "Phase Error (deg)", default: 0, min: 0, max: 90, step: 5 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 15, step: 1 },
      ],
    },
    numericals: [
      {
        id: "ca-1",
        title: "Attenuation Due to Phase Error",
        difficulty: "Easy",
        given: "Phase error δ = 45°",
        formula: "Attenuation = cos(δ)",
        steps: ["Output = m(t)cos(45°) = 0.707 m(t)", "Attenuation = 1 - 0.707 = 29.3%"],
        answer: "Signal attenuated by 29.3% (3 dB loss)",
      },
      {
        id: "ca-2",
        title: "Beat Frequency Effect",
        difficulty: "Medium",
        given: "Δf = 2 Hz (frequency error)",
        formula: "Output = m(t)cos(2π×2×t) — amplitude varies at 2 Hz",
        steps: [
          "The output amplitude varies sinusoidally at Δf = 2 Hz",
          "Output goes to zero 4 times per second",
          "Period of beating = 1/Δf = 0.5 s",
          "Listener hears volume going up and down 2 times/sec",
        ],
        answer: "Volume fluctuates at 2 Hz — unacceptable distortion",
      },
      {
        id: "ca-3",
        title: "Squaring Loop Bandwidth",
        difficulty: "Hard",
        given: "DSB-SC BW = 10 kHz at fc = 1 MHz, SNR = 20 dB",
        formula: "PLL loop BW << DSB-SC BW for good tracking",
        steps: [
          "Squared signal has component at 2fc = 2 MHz",
          "BPF at 2 MHz with BW ≈ 100 Hz (narrow)",
          "After ÷2: carrier at 1 MHz",
          "PLL tracks with loop BW ≈ 10-100 Hz",
        ],
        answer: "PLL loop bandwidth ≈ 10-100 Hz for good carrier recovery",
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
      type: "fm",
      description: "Visualize PLL tracking of an FM signal.",
      parameters: [
        { name: "Free-running Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Input Freq Offset (Hz)", default: 5, min: 0, max: 20, step: 1 },
      ],
    },
    numericals: [
      {
        id: "pll-1",
        title: "Steady-State Phase Error (1st order)",
        difficulty: "Easy",
        given: "Frequency step Δω = 100 rad/s, loop gain AK = 1000",
        formula: "θ_e(∞) = Δω / AK",
        steps: [
          "θ_e(∞) = 100 / 1000 = 0.1 rad",
          "= 0.1 × (180/π) = 5.73°",
        ],
        answer: "Steady-state phase error = 5.73°",
      },
      {
        id: "pll-2",
        title: "Lock Range Calculation",
        difficulty: "Medium",
        given: "VCO gain K₀ = 2π×10⁴ rad/s/V, Phase detector gain Kd = 0.5 V/rad, H(0) = 1",
        formula: "Lock range ΔωL = K₀ × Kd × H(0)",
        steps: [
          "ΔωL = 2π×10⁴ × 0.5 × 1",
          "= π × 10⁴ rad/s",
          "Δf_L = 10⁴/2 = 5 kHz",
        ],
        answer: "Lock range = ±5 kHz",
      },
      {
        id: "pll-3",
        title: "Second-Order PLL Zero Error",
        difficulty: "Hard",
        given: "H(s) = (s+a)/s, frequency step Δω applied",
        formula: "θ_e(∞) = lim s→0 [s² / (s² + AK(s+a))] × Δω/s²",
        steps: [
          "Θ_e(s) = s / (s + AKH(s)) × Δω/s",
          "= Δω / (s + AK(s+a)/s)",
          "= Δω·s / (s² + AKs + AKa)",
          "lim t→∞: θ_e = lim s→0 sΘ_e(s) = 0",
        ],
        answer: "Steady-state phase error = 0 (perfect tracking)",
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
      image: "superhe..jpeg",
      description: "Complete superheterodyne AM receiver with AGC loop.",
      svgLabel: "Superheterodyne Circuit",
      elements: [
        "RF tuned circuit (variable capacitor)",
        "Mixer stage (transistor or diode)",
        "IF transformers at 455 kHz",
        "Envelope detector",
        "AGC feedback to IF/RF stages",
      ],
    },
    simulation: {
      type: "am",
      description: "Visualize frequency conversion in superheterodyne receiver.",
      parameters: [
        { name: "RF Carrier (Hz)", default: 100, min: 50, max: 200, step: 5 },
        { name: "IF (Hz)", default: 30, min: 10, max: 50, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 10, step: 1 },
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
      image: "fm.jpeg",
      description: "VCO-based direct FM transmitter using a varactor diode.",
      svgLabel: "FM Transmitter Circuit",
      elements: [
        "LC tank oscillator",
        "Varactor diode for frequency tuning",
        "Message signal biases varactor",
        "Buffer amplifier at output",
        "Frequency multiplier chain",
      ],
    },
    simulation: {
      type: "fm",
      description: "Visualize FM waveform with adjustable modulation index.",
      parameters: [
        { name: "Modulation Index (β)", default: 5, min: 0.5, max: 15, step: 0.5 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 15, step: 1 },
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
      description: "PM using a voltage-variable phase shifter in the carrier path.",
      svgLabel: "PM Circuit",
      elements: [
        "Crystal oscillator (stable carrier)",
        "Voltage-variable phase shifter",
        "Message signal controls phase shift",
        "Buffer/amplifier at output",
      ],
    },
    simulation: {
      type: "pm",
      description: "Visualize PM waveform.",
      parameters: [
        { name: "Phase Deviation kp (rad)", default: 2, min: 0.5, max: 10, step: 0.5 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 3, min: 1, max: 15, step: 1 },
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
      description: "NBFM generator using a balanced modulator and phase adder.",
      svgLabel: "NBFM Circuit",
      elements: [
        "Crystal oscillator for stable carrier",
        "Integrator for m(t)",
        "Balanced modulator",
        "Adder for cos(ωc·t) + modulated component",
      ],
    },
    simulation: {
      type: "fm",
      description: "Visualize NBFM waveform with small β.",
      parameters: [
        { name: "Mod Index β", default: 0.3, min: 0.05, max: 1, step: 0.05 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 15, step: 1 },
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
      image: "nbpm.jpeg",
      description: "NBPM uses the same structure as NBFM but without the integrator.",
      svgLabel: "NBPM Circuit",
      elements: [
        "Crystal oscillator for carrier",
        "Balanced modulator for kp·m(t)·sin(ωc·t)",
        "Adder: carrier + modulated signal",
        "Output: NBPM signal",
      ],
    },
    simulation: {
      type: "pm",
      description: "Visualize NBPM waveform with small phase deviation.",
      parameters: [
        { name: "Phase Dev kp (rad)", default: 0.3, min: 0.05, max: 1, step: 0.05 },
        { name: "Carrier Freq (Hz)", default: 50, min: 20, max: 200, step: 5 },
        { name: "Message Freq (Hz)", default: 5, min: 1, max: 15, step: 1 },
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
      description: "Balanced discriminator using two detuned resonant circuits.",
      svgLabel: "FM Discriminator Circuit",
      elements: [
        "Two LC circuits tuned above and below fc",
        "Envelope detectors on each LC output",
        "Subtractor to get difference (S-curve characteristic)",
        "Output proportional to frequency deviation",
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

// Combine all topics
export const topics: TopicData[] = [
  ...topics_core,
  ...introTopics,
  ...signalsTopics,
  ...noiseTopics,
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
      "am", "nonlinear-modulator", "switching-modulator", "ring-modulator",
      "frequency-mixer", "dsb-sc", "am-demodulation", "envelope-detector",
      "ssb", "hilbert-transform", "qam", "vsb",
      "carrier-acquisition", "superheterodyne",
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
];
