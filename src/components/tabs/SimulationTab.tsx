import { useState, useRef, useEffect, useCallback } from "react";
import { TopicData } from "@/data/topics";

interface Props {
  simulation: TopicData["simulation"];
}

export function SimulationTab({ simulation }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params, setParams] = useState<Record<string, number>>(
    Object.fromEntries(simulation.parameters.map((p) => [p.name, p.default]))
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const paramValues = simulation.parameters.map((p) => params[p.name] ?? p.default);
    const type = simulation.type;

    // Draw grid
    ctx.strokeStyle = "hsl(220 13% 89%)";
    ctx.lineWidth = 0.5;
    for (let y = 0; y < h; y += h / 8) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.strokeStyle = "hsl(220 13% 80%)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();

    const drawWave = (
      fn: (t: number) => number,
      color: string,
      yOffset: number,
      amplitude: number,
      label: string
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const y = yOffset - fn(t) * amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = "12px Inter, sans-serif";
      ctx.fillText(label, 8, yOffset - amplitude - 5);
    };

    if (type === "am") {
      const mu = paramValues[0] ?? 0.5;
      const fc = paramValues[1] ?? 50;
      const fm = paramValues[2] ?? 5;
      // Message
      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.25, h * 0.15, "Message m(t)");
      // AM
      drawWave(
        (t) => (1 + mu * Math.cos(2 * Math.PI * fm * t * 4)) * Math.cos(2 * Math.PI * fc * t * 4),
        "hsl(217 91% 50%)", h * 0.7, h * 0.2, "AM Signal"
      );
      // Envelope
      ctx.setLineDash([4, 4]);
      drawWave((t) => 1 + mu * Math.cos(2 * Math.PI * fm * t * 4), "hsl(0 84% 60%)", h * 0.7, h * 0.2, "");
      drawWave((t) => -(1 + mu * Math.cos(2 * Math.PI * fm * t * 4)), "hsl(0 84% 60%)", h * 0.7, h * 0.2, "");
      ctx.setLineDash([]);
    } else if (type === "dsb" || type === "ssb") {
      const fm = paramValues[0] ?? 5;
      const fc = paramValues[1] ?? 50;
      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.25, h * 0.15, "Message m(t)");
      drawWave(
        (t) => Math.cos(2 * Math.PI * fm * t * 4) * Math.cos(2 * Math.PI * fc * t * 4),
        "hsl(217 91% 50%)", h * 0.7, h * 0.2, type === "dsb" ? "DSB-SC" : "SSB (approx)"
      );
    } else if (type === "fm") {
      const beta = paramValues[0] ?? 5;
      const fc = paramValues[1] ?? 50;
      const fm = paramValues[2] ?? 3;
      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.25, h * 0.15, "Message m(t)");
      drawWave(
        (t) => Math.cos(2 * Math.PI * fc * t * 4 + beta * Math.sin(2 * Math.PI * fm * t * 4)),
        "hsl(262 83% 58%)", h * 0.7, h * 0.22, "FM Signal"
      );
    } else if (type === "pll") {
      const lockState = paramValues[0] ?? 1; // 0 = off, 1 = on
      const fc = paramValues[1] ?? 50;
      const fm = paramValues[2] ?? 3;
      
      // Message m(t) - Green
      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.15, h * 0.1, "Message m(t)");
      
      // FM Input - Purple
      const fmInput = (t: number) => Math.cos(2 * Math.PI * fc * t * 4 + 3 * Math.sin(2 * Math.PI * fm * t * 4));
      drawWave(fmInput, "hsl(262 83% 58%)", h * 0.4, h * 0.1, "FM Input");
      
      // VCO Output - Yellow
      // Before lock: slightly different frequency. After lock: matches FM input.
      const vcoOut = (t: number) => {
        if (lockState < 0.5) {
          return Math.cos(2 * Math.PI * (fc * 0.9) * t * 4); // Off-frequency
        }
        return Math.cos(2 * Math.PI * fc * t * 4 + 3 * Math.sin(2 * Math.PI * fm * t * 4)); // Locked
      };
      drawWave(vcoOut, "hsl(38 92% 50%)", h * 0.65, h * 0.1, "VCO Output");
      
      // Demodulated Output - Red
      const demodOut = (t: number) => {
        if (lockState < 0.5) {
          return 0.2 * Math.sin(2 * Math.PI * fc * 5 * t * 4); // High frequency noise/error
        }
        return Math.cos(2 * Math.PI * fm * t * 4); // Recovered message
      };
      drawWave(demodOut, "hsl(0 84% 60%)", h * 0.9, h * 0.08, "Demodulated Output");

    } else if (type === "pm") {
      const kp = paramValues[0] ?? 2;
      const fc = paramValues[1] ?? 50;
      const fm = paramValues[2] ?? 3;
      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.25, h * 0.15, "Message m(t)");
      drawWave(
        (t) => Math.cos(2 * Math.PI * fc * t * 4 + kp * Math.cos(2 * Math.PI * fm * t * 4)),
        "hsl(38 92% 50%)", h * 0.7, h * 0.22, "PM Signal"
      );
    } else {
      const freq = paramValues[0] ?? 5;
      drawWave((t) => Math.cos(2 * Math.PI * freq * t * 4), "hsl(217 91% 50%)", h * 0.3, h * 0.2, "Signal m(t)");
      drawWave((t) => Math.sin(2 * Math.PI * freq * t * 4), "hsl(262 83% 58%)", h * 0.7, h * 0.2, "Hilbert m_h(t)");
    }
  }, [params, simulation]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-2">Waveform Simulation</h3>
        <p className="text-sm text-muted-foreground mb-4">{simulation.description}</p>

        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full rounded-lg bg-muted border border-border"
          style={{ maxHeight: 400 }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {simulation.parameters.map((p) => (
            <div key={p.name}>
              <label className="text-xs font-medium text-muted-foreground">{p.name}</label>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="range"
                  min={p.min} max={p.max} step={p.step}
                  value={params[p.name] ?? p.default}
                  onChange={(e) => setParams((prev) => ({ ...prev, [p.name]: parseFloat(e.target.value) }))}
                  className="flex-1 accent-primary"
                />
                <span className="text-sm font-mono text-foreground w-12 text-right">
                  {params[p.name] ?? p.default}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
