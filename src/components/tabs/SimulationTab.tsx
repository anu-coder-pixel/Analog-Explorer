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
      const vcc = paramValues[0] ?? 12;
      const bias = paramValues[1] ?? 0.5;
      const vm = paramValues[2] ?? 3;
      const vc = paramValues[3] ?? 5;
      const fc = paramValues[4] ?? 50;
      const fm = paramValues[5] ?? 5;
      const noiseLevel = paramValues[6] ?? 0.05;

      const A = (vcc/12) * bias * 10;
      const mu = vm / A;
      const signalPower = (A**2) * (1 + (mu**2)/2);
      const snr = noiseLevel > 0 ? 10 * Math.log10(signalPower / (noiseLevel**2 * 100)) : 100;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;

      drawWave((t) => (vm/5) * Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.1, "Message m(t)");
      
      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const msg = (vm/5) * Math.cos(2 * Math.PI * fm * t * 4);
        const carrier = (vc/5) * Math.cos(2 * Math.PI * fc * t * 4);
        const amValue = (A/5 + msg) * carrier + noiseFn();
        const y = h * 0.7 - amValue * h * 0.15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(217 91% 50%)";
      ctx.fillText("AM Signal + Channel Noise", 8, h * 0.7 - h * 0.22);
      
      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 180, 20, 160, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 13px JetBrains Mono, monospace";
      ctx.fillText(`Mod Index (μ): ${mu.toFixed(2)}`, w - 165, 45);
      ctx.fillText(`SNR: ${snr.toFixed(1)} dB`, w - 165, 70);

      ctx.setLineDash([4, 4]);
      drawWave((t) => (A/5 + (vm/5) * Math.cos(2 * Math.PI * fm * t * 4)), "hsl(0 84% 60%)", h * 0.7, h * 0.15, "");
      drawWave((t) => -(A/5 + (vm/5) * Math.cos(2 * Math.PI * fm * t * 4)), "hsl(0 84% 60%)", h * 0.7, h * 0.15, "");
      ctx.setLineDash([]);

    } else if (type === "ring") {
      const match = paramValues[0] ?? 0.95;
      const balance = paramValues[1] ?? 1.0;
      const vc = paramValues[2] ?? 5;
      const vm = paramValues[3] ?? 3;
      const fc = paramValues[4] ?? 60;
      const fm = paramValues[5] ?? 5;
      const noiseLevel = paramValues[6] ?? 0.02;

      const leakage = (1 - match) * 2 + (1 - balance) * 5;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const suppression = match === 1 && balance === 1 ? 100 : 20 * Math.log10(1 / (1 - match + 0.001));
      const snr = noiseLevel > 0 ? 10 * Math.log10((vm**2 * vc**2) / (noiseLevel**2 * 10)) : 100;

      drawWave((t) => (vm/5) * Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.1, "Message m(t)");

      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = (vm/5) * Math.cos(2 * Math.PI * fm * t * 4);
        const carrier = Math.cos(2 * Math.PI * fc * t * 4);
        const wt = carrier >= 0 ? 1 : -1;
        const leak = (leakage/10) * carrier;
        const ringValue = mt * wt + leak + noiseFn();
        const y = h * 0.7 - ringValue * h * 0.18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(217 91% 50%)";
      ctx.fillText("Ring Modulator (Switching DSB-SC)", 8, h * 0.7 - h * 0.22);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Suppression: ${suppression.toFixed(1)} dB`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "nonlinear") {
      const a1 = paramValues[0] ?? 1.0;
      const a2 = paramValues[1] ?? 0.5;
      const Q = paramValues[2] ?? 10;
      const vc = paramValues[3] ?? 5;
      const vm = paramValues[4] ?? 3;
      const noiseLevel = paramValues[5] ?? 0.05;
      
      const fc = 50;
      const fm = 5;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const mu = (2 * a2 * vm) / a1;
      const snr = noiseLevel > 0 ? 10 * Math.log10((a1*vc)**2 / (noiseLevel**2 * 100)) : 100;

      drawWave((t) => (vm/10) * Math.cos(2 * Math.PI * fm * t * 4) + (vc/10) * Math.cos(2 * Math.PI * fc * t * 4), 
               "hsl(217 91% 60%)", h * 0.2, h * 0.1, "Input v_i(t) = m(t) + c(t)");

      ctx.strokeStyle = "hsl(142 76% 36%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = vm * Math.cos(2 * Math.PI * fm * t * 4);
        const ct = vc * Math.cos(2 * Math.PI * fc * t * 4);
        const vi = mt + ct;
        const vo = a1 * vi + a2 * (vi**2);
        const amFiltered = (a1 * vc + 2 * a2 * mt * vc / 5) * Math.cos(2 * Math.PI * fc * t * 4);
        const harmonicsLeak = (1/Q) * (a2 * mt**2 + a2 * ct**2);
        const yValue = (amFiltered + harmonicsLeak) / 10 + noiseFn();
        const y = h * 0.7 - yValue * h * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Mod Index (μ): ${mu.toFixed(2)}`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "dsb") {
      const vcc = paramValues[0] ?? 12;
      const k = paramValues[1] ?? 0.8;
      const Q = paramValues[2] ?? 10;
      const vc = paramValues[3] ?? 5;
      const vm = paramValues[4] ?? 3;
      const noiseLevel = paramValues[5] ?? 0.05;

      const fm = 5;
      const fc = 50;
      const leakage = (1 - k) * 0.5;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const sidebandPower = (vm**2) * (vc**2) / 4;
      const snr = noiseLevel > 0 ? 10 * Math.log10(sidebandPower / (noiseLevel**2 * 10)) : 100;

      drawWave((t) => (vm/5) * Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.1, "Message m(t)");

      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const msg = (vm/5) * Math.cos(2 * Math.PI * fm * t * 4);
        const carrier = (vc/5) * Math.cos(2 * Math.PI * fc * t * 4);
        const harmonics = (1/Q) * Math.cos(2 * Math.PI * 2 * fc * t * 4);
        const dsbValue = (msg + leakage) * carrier + harmonics + noiseFn();
        const y = h * 0.7 - dsbValue * h * 0.15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(217 91% 50%)";
      ctx.fillText("DSB-SC (Balanced Modulator)", 8, h * 0.7 - h * 0.22);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 180, 20, 160, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 13px JetBrains Mono, monospace";
      ctx.fillText(`Carrier Leak: ${(leakage*100).toFixed(1)}%`, w - 165, 45);
      ctx.fillText(`SNR: ${snr.toFixed(1)} dB`, w - 165, 70);

    } else if (type === "demod") {
      const inputAmp = paramValues[0] ?? 8;
      const rc = paramValues[1] ?? 2.5;
      const diodeDrop = paramValues[2] ?? 0.7;
      const fc = paramValues[3] ?? 60;
      const fm = paramValues[4] ?? 5;
      const noiseLevel = paramValues[5] ?? 0.02;

      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      drawWave((t) => (inputAmp/10) * (1 + 0.7 * Math.cos(2 * Math.PI * fm * t * 4)) * Math.cos(2 * Math.PI * fc * t * 4), 
               "hsl(217 91% 60%)", h * 0.4, h * 0.2, "Input AM Signal");
      ctx.setLineDash([]);

      ctx.strokeStyle = "hsl(142 76% 36%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let vOut = 0;
      const dt = 1/w;
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const vIn = inputAmp * (1 + 0.7 * Math.cos(2 * Math.PI * fm * t * 4)) * Math.cos(2 * Math.PI * fc * t * 4);
        const rectVIn = Math.max(0, vIn - diodeDrop);
        if (rectVIn > vOut) vOut = rectVIn;
        else vOut *= Math.exp(-dt*40 / rc);
        const noise = (Math.random() - 0.5) * noiseLevel * 5;
        const y = h * 0.75 - (vOut/10 + noise) * h * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const clipping = rc > 6 ? "HIGH (Diagonal Clipping)" : "LOW (Good Tracking)";
      const snr = noiseLevel > 0 ? 10 * Math.log10(inputAmp**2 / (noiseLevel**2 * 50)) : 100;

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 220, 20, 200, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Distortion: ${clipping}`, w - 205, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 205, 70);

    } else if (type === "ssb") {
      const phaseErrorDeg = paramValues[0] ?? 0;
      const balance = paramValues[1] ?? 1.0;
      const vc = paramValues[2] ?? 5;
      const vm = paramValues[3] ?? 3;
      const fc = paramValues[4] ?? 50;
      const fm = paramValues[5] ?? 5;
      const noiseLevel = paramValues[6] ?? 0.02;

      const phaseErrorRad = (phaseErrorDeg * Math.PI) / 180;
      const leakage = (1 - balance) * 1.5;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;

      drawWave((t) => (vm/5) * Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.1, "Message m(t)");

      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = (vm/5) * Math.cos(2 * Math.PI * fm * t * 4);
        const mht = (vm/5) * Math.sin(2 * Math.PI * fm * t * 4);
        const iPath = mt * Math.cos(2 * Math.PI * fc * t * 4);
        const qPath = mht * Math.sin(2 * Math.PI * fc * t * 4 + phaseErrorRad);
        const carrierLeak = leakage * Math.cos(2 * Math.PI * fc * t * 4);
        const ssbValue = (iPath - qPath) + carrierLeak + noiseFn();
        const y = h * 0.72 - ssbValue * h * 0.18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const suppression = phaseErrorDeg === 0 ? 100 : Math.abs(20 * Math.log10(1 / Math.tan(phaseErrorRad / 2)));
      const signalPower = (vm**2 * vc**2) / 8;
      const snr = noiseLevel > 0 ? 10 * Math.log10(signalPower / (noiseLevel**2 * 10)) : 100;

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Suppression: ${suppression.toFixed(1)} dB`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "qam") {
      const f1 = paramValues[0] ?? 5;
      const f2 = paramValues[1] ?? 3;
      const phaseErrorDeg = paramValues[2] ?? 0;
      const balance = paramValues[3] ?? 1.0;
      const noiseLevel = paramValues[4] ?? 0.02;

      const phaseErrorRad = (phaseErrorDeg * Math.PI) / 180;
      const carrierFreq = 50;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      
      const crosstalk = phaseErrorDeg === 0 ? -Infinity : 20 * Math.log10(Math.sin(phaseErrorRad));
      const snr = noiseLevel > 0 ? 10 * Math.log10(1 / (noiseLevel**2 * 10)) : 100;

      drawWave((t) => Math.cos(2 * Math.PI * f1 * t * 4), "hsl(217 91% 60%)", h * 0.15, h * 0.1, "I-Channel: m₁(t)");
      drawWave((t) => Math.cos(2 * Math.PI * f2 * t * 4), "hsl(38 92% 50%)", h * 0.4, h * 0.1, "Q-Channel: m₂(t)");

      // QAM Signal
      ctx.strokeStyle = "hsl(262 83% 58%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const carrierPhase = 2 * Math.PI * carrierFreq * t * 4;
        const m1 = Math.cos(2 * Math.PI * f1 * t * 4);
        const m2 = Math.cos(2 * Math.PI * f2 * t * 4);
        
        // Modelling crosstalk if phase error exists
        const qamValue = (m1 * Math.cos(carrierPhase)) + 
                         (balance * m2 * Math.sin(carrierPhase + phaseErrorRad)) + noiseFn();
        
        const y = h * 0.75 - qamValue * h * 0.18;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(262 83% 58%)";
      ctx.fillText("QAM Output Signal", 8, h * 0.75 - h * 0.22);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Cross-talk: ${isFinite(crosstalk) ? crosstalk.toFixed(1) : "-∞"} dB`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "vsb") {
      const lsbRatio = paramValues[0] ?? 0.25;
      const Q = paramValues[1] ?? 15;
      const vc = paramValues[2] ?? 5;
      const vm = paramValues[3] ?? 3;
      const fc = paramValues[4] ?? 60;
      const fm = paramValues[5] ?? 5;
      const noiseLevel = paramValues[6] ?? 0.02;

      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const signalPower = (vm**2 * (1 + lsbRatio**2)) / 4;
      const snr = noiseLevel > 0 ? 10 * Math.log10(signalPower / (noiseLevel**2 * (20/Q))) : 100;

      drawWave((t) => (vm/5) * Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.1, "Message m(t)");

      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const phaseC = 2 * Math.PI * fc * t * 4;
        const phaseM = 2 * Math.PI * fm * t * 4;
        
        // VSB = High-side band + vestigial low-side band
        const usb = (vm/10) * Math.cos(phaseC + phaseM);
        const lsbVestige = (lsbRatio * vm/10) * Math.cos(phaseC - phaseM);
        const carrierLeak = (1/Q) * (vc/10) * Math.cos(phaseC);
        
        const vsbValue = usb + lsbVestige + carrierLeak + noiseFn();
        const y = h * 0.7 - vsbValue * h * 1.5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(217 91% 50%)";
      ctx.fillText("VSB Output Signal (Filtered DSB-SC)", 8, h * 0.7 - h * 0.22);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Vestige Level: ${(lsbRatio*100).toFixed(0)}%`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "fm-realistic" || type === "fm") {
      const vcc = paramValues[0] ?? 9;
      const L = (paramValues[1] ?? 0.15) * 1e-6;
      const C = (paramValues[2] ?? 35) * 1e-12;
      const Q = (paramValues[3] ?? 15);
      const sensitivity = (paramValues[4] ?? 4);
      const noiseLevel = (paramValues[5] ?? 0.05);

      // Real-world FM Oscillator Physics: f = 1 / (2π * sqrt(LC))
      const fcBase = 1 / (2 * Math.PI * Math.sqrt(L * C));
      const fm = 3;
      const dfPeak = sensitivity * (vcc / 9) * 5; 
      const beta = dfPeak / fm;

      const scaleFc = (fcBase / 1e6) * 5 + 30; // Normalize for visualization
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const signalPower = (vcc/10)**2;
      const snr = noiseLevel > 0 ? 10 * Math.log10(signalPower / (noiseLevel**2 * (50/Q))) : 100;

      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.12, "MIC Input m(t)");

      ctx.strokeStyle = "hsl(262 83% 58%)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const phase = 2 * Math.PI * scaleFc * t * 4 + beta * Math.sin(2 * Math.PI * fm * t * 4);
        const fmValue = (vcc/10) * Math.cos(phase) + noiseFn();
        
        const y = h * 0.75 - fmValue * h * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 220, 20, 200, 90, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Osc Freq (fc): ${(fcBase/1e6).toFixed(1)} MHz`, w - 205, 45);
      ctx.fillText(`Freq Dev (Δf): ${dfPeak.toFixed(1)} kHz`, w - 205, 65);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 205, 85);

    } else if (type === "nbfm") {
      const km = paramValues[0] ?? 0.3;
      const balance = paramValues[1] ?? 1.0;
      const carrierLevel = paramValues[2] ?? 1.0;
      const noiseLevel = paramValues[3] ?? 0.01;

      const fc = 50;
      const fm = 5;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const snr = noiseLevel > 0 ? 10 * Math.log10(carrierLevel / (noiseLevel**2 * 10)) : 100;

      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.15, h * 0.1, "Message m(t)");
      
      ctx.strokeStyle = "hsl(262 83% 58%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = Math.cos(2 * Math.PI * fm * t * 4);
        // NBFM Phasor Addition: Ac*cos(wc*t) - beta*Ac*sin(wm*t)*sin(wc*t)
        const carrier = carrierLevel * Math.cos(2 * Math.PI * fc * t * 4);
        const quadrature = km * mt * balance * Math.sin(2 * Math.PI * fc * t * 4);
        const nbfmValue = carrier - quadrature + noiseFn();
        
        const y = h * 0.65 - nbfmValue * h * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(262 83% 58%)";
      ctx.fillText("NBFM Output Signal", 8, h * 0.65 - h * 0.25);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Mod Index (β): ${km.toFixed(2)}`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "pm") {
      const bias = paramValues[0] ?? 5;
      const kp = paramValues[1] ?? 2;
      const noiseLevel = paramValues[2] ?? 0.02;
      
      const fc = 50;
      const fm = 3;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const snr = noiseLevel > 0 ? 10 * Math.log10((bias/5) / (noiseLevel**2 * 10)) : 100;

      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.2, h * 0.12, "Message m(t)");

      ctx.strokeStyle = "hsl(38 92% 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = Math.cos(2 * Math.PI * fm * t * 4);
        // PM Equation: Ac * cos(wc*t + kp*m(t))
        const pmValue = (bias/5) * Math.cos(2 * Math.PI * fc * t * 4 + kp * mt) + noiseFn();
        
        const y = h * 0.7 - pmValue * h * 0.22;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Phase Dev (ΔΦ): ${kp.toFixed(1)} rad`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);

    } else if (type === "fm-demod") {
      const tuningDev = paramValues[0] ?? 10;
      const gain = paramValues[1] ?? 1.0;
      const cutoff = paramValues[2] ?? 5;
      const noiseLevel = paramValues[3] ?? 0.02;

      const fc = 100;
      const fm = 3;
      const df = 30; // Frequency deviation of input FM
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;

      // FM Input Signal
      drawWave((t) => Math.cos(2 * Math.PI * fc * t * 4 + (df/fm) * Math.sin(2 * Math.PI * fm * t * 4)), 
               "hsl(262 83% 58%)", h * 0.2, h * 0.15, "FM Input Signal");

      // Demodulated Output (Discriminator S-Curve logic)
      ctx.strokeStyle = "hsl(0 84% 60%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const instantaneousFreq = fc + df * Math.cos(2 * Math.PI * fm * t * 4);
        
        // S-Curve conversion: Output proportional to (f - fc) within linear range
        const freqOffset = instantaneousFreq - fc;
        const sCurveResponse = gain * (freqOffset / tuningDev);
        const demodValue = Math.max(-1, Math.min(1, sCurveResponse)) + noiseFn();
        
        const y = h * 0.72 - demodValue * h * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(0 84% 60%)";
      ctx.fillText("Demodulated Output (m(t))", 8, h * 0.72 - h * 0.25);

      // S-Curve Indicator
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Det. Sensitivity: ${gain.toFixed(1)} V/kHz`, w - 185, 45);
      ctx.fillText(`Linearity Range: ±${tuningDev} kHz`, w - 185, 70);

    } else if (type === "mixer") {
      const gc = paramValues[0] ?? 1.0;
      const vlo = paramValues[1] ?? 7;
      const Q = paramValues[2] ?? 15;
      const fc = paramValues[3] ?? 80;
      const fm = paramValues[4] ?? 5;
      const noiseLevel = paramValues[5] ?? 0.05;

      const fIF = 30; // Desired IF for visualization
      const fLO = fc - fIF;
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      
      const signalPower = (gc * vlo * 0.5)**2;
      const snr = noiseLevel > 0 ? 10 * Math.log10(signalPower / (noiseLevel**2 * (50/Q))) : 100;

      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4) * Math.cos(2 * Math.PI * fc * t * 4), 
               "hsl(142 76% 36%)", h * 0.2, h * 0.12, "RF Input (m(t)cos(ωc t))");

      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = Math.cos(2 * Math.PI * fm * t * 4);
        const rf = mt * Math.cos(2 * Math.PI * fc * t * 4);
        const lo = (vlo/10) * Math.cos(2 * Math.PI * fLO * t * 4);
        
        // Mixer product: RF * LO * Gc
        const mixed = rf * lo * gc;
        
        // BPF Filtering effect: Stronger IF, suppressed sum frequency
        const ifSignal = (gc * vlo/10 * mt/2) * Math.cos(2 * Math.PI * fIF * t * 4);
        const sumFreqLeak = (1/Q) * (gc * vlo/10 * mt/2) * Math.cos(2 * Math.PI * (fc + fLO) * t * 4);
        
        const mixerValue = (ifSignal + sumFreqLeak) + noiseFn();
        const y = h * 0.7 - mixerValue * h * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(217 91% 50%)";
      ctx.fillText("IF Output (Filtered Frequency Translation)", 8, h * 0.7 - h * 0.25);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 220, 20, 200, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`LO Freq: ${fLO} Hz`, w - 205, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 205, 70);

    } else if (type === "pll") {
      const inputAmp = paramValues[0] ?? 5;
      const K = paramValues[1] ?? 50;
      const cutoff = paramValues[2] ?? 10;
      const noiseLevel = paramValues[3] ?? 0.02;
      const fm = paramValues[4] ?? 3;

      const fc = 50;
      const df = 20; // Deviation of input FM signal
      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const snr = noiseLevel > 0 ? 10 * Math.log10((inputAmp/10)**2 / (noiseLevel**2)) : 100;

      // --- Waveform Rendering ---
      // Top: Input FM Signal
      drawWave((t) => (inputAmp/10) * Math.cos(2 * Math.PI * fc * t * 4 + (df/fm) * Math.sin(2 * Math.PI * fm * t * 4)) + noiseFn(),
               "hsl(199 89% 48%)", h * 0.2, h * 0.1, "Input FM Signal (Multiplied by Noise)");

      // Bottom: PLL Internal State Simulation
      ctx.strokeStyle = "hsl(330 81% 60%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      
      let vVcoPhase = 0;
      let vControl = 0;
      const dt = 1/w;
      
      for (let x = 0; x < w; x++) {
        const t = x / w;
        
        // 1. Input Signal (Phase modulated)
        const vIn = inputAmp * Math.cos(2 * Math.PI * fc * t * 4 + (df/fm) * Math.sin(2 * Math.PI * fm * t * 4)) + noiseFn() * 10;
        
        // 2. VCO Signal
        const vVco = Math.sin(2 * Math.PI * fc * t * 4 + vVcoPhase);
        
        // 3. Phase Detector (Multiplier)
        const vPd = vIn * vVco;
        
        // 4. Loop Filter (Simple RC Integration)
        // alpha = dt / (RC + dt). RC approx 1/(2pi * cutoff)
        const alpha = (2 * Math.PI * cutoff * dt) / (1 + 2 * Math.PI * cutoff * dt);
        vControl = vControl * (1 - alpha) + vPd * alpha;
        
        // 5. VCO Phase Update (K is loop gain / sensitivity)
        vVcoPhase += K * vControl * dt;

        // Plot Control Voltage (Recovered Message)
        const yValue = (vControl / (inputAmp * 2)); // Normalized for view
        const y = h * 0.75 - yValue * h * 0.4;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(330 81% 60%)";
      ctx.fillText("Control Voltage e_o(t) — Recovered Message", 8, h * 0.75 - h * 0.2);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 90, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      const isLocked = snr > 15 && K > 30; // Heuristic for lock visualization
      ctx.fillText(`State: ${isLocked ? "LOCKED" : "UNLOCKED"}`, w - 185, 45);
      ctx.fillText(`Input SNR: ${snr.toFixed(1)} dB`, w - 185, 70);
      ctx.fillText(`Loop Gain: ${K.toFixed(0)}`, w - 185, 95);

    } else if (type === "hilbert") {
      const freq = paramValues[0] ?? 5;
      drawWave((t) => Math.cos(2 * Math.PI * freq * t * 4), "hsl(217 91% 50%)", h * 0.3, h * 0.2, "Original Signal m(t)");
      drawWave((t) => Math.sin(2 * Math.PI * freq * t * 4), "hsl(262 83% 58%)", h * 0.7, h * 0.2, "Hilbert Transform m_h(t)");

    } else if (type === "superhet") {
      const rfGain = paramValues[0] ?? 1.2;
      const loStability = paramValues[1] ?? 0.98;
      const Q = paramValues[2] ?? 25;
      const fc = paramValues[3] ?? 100;
      const fm = paramValues[4] ?? 3;
      const noiseLevel = paramValues[5] ?? 0.05;

      const fIF = 30; // Fixed IF for visualization
      const fLO = fc + fIF; 
      
      const imageFreq = fc + 2 * fIF;
      const imageRejection = 20 * Math.log10(Q * Math.abs((imageFreq/fc) - (fc/imageFreq)));
      const signalPower = (rfGain * loStability)**2;
      const snr = noiseLevel > 0 ? 10 * Math.log10(signalPower / (noiseLevel**2 * (50/Q))) : 100;

      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;

      drawWave((t) => (1 + 0.5 * Math.cos(2 * Math.PI * fm * t * 4)) * Math.cos(2 * Math.PI * fc * t * 4), 
               "hsl(142 76% 36%)", h * 0.2, h * 0.1, "Incoming RF Signal");

      ctx.strokeStyle = "hsl(217 91% 50%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const rawMessage = Math.cos(2 * Math.PI * fm * t * 4);
        const instPhaseNoise = (1 - loStability) * Math.sin(2 * Math.PI * 10 * t);
        const recovered = rfGain * (0.5 * rawMessage + instPhaseNoise) + noiseFn();
        
        const y = h * 0.7 - recovered * h * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(217 91% 50%)";
      ctx.fillText("Recovered Audio (Post-IF & Detection)", 8, h * 0.7 - h * 0.22);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 220, 20, 200, 90, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Image Rej: ${imageRejection.toFixed(1)} dB`, w - 205, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 205, 70);
      ctx.fillText(`LO Freq: ${fLO} Hz`, w - 205, 95);
    } else if (type === "nbpm") {
      const ac = paramValues[0] ?? 1.0;
      const kp = paramValues[1] ?? 0.2;
      const fc = paramValues[2] ?? 50;
      const fm = paramValues[3] ?? 5;
      const noiseLevel = paramValues[4] ?? 0.01;

      const noiseFn = () => (Math.random() - 0.5) * noiseLevel * 2;
      const snr = noiseLevel > 0 ? 20 * Math.log10(ac / (noiseLevel * 10)) : 100;

      drawWave((t) => Math.cos(2 * Math.PI * fm * t * 4), "hsl(142 76% 36%)", h * 0.15, h * 0.1, "Message m(t)");

      ctx.strokeStyle = "hsl(142 76% 36%)";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = Math.cos(2 * Math.PI * fm * t * 4);
        // NBPM Phasor: Ac*cos(wc*t) - Ac*kp*m(t)*sin(wc*t)
        const carrier = ac * Math.cos(2 * Math.PI * fc * t * 4);
        const quadrature = ac * kp * mt * Math.sin(2 * Math.PI * fc * t * 4);
        
        const nbpmValue = carrier - quadrature + noiseFn();
        const y = h * 0.65 - nbpmValue * h * 0.25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(142 76% 36%)";
      ctx.fillText("NBPM Output Signal (Carrier + Quadrature DSB-SC)", 8, h * 0.65 - h * 0.3);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Mod index (β): ${kp.toFixed(2)}`, w - 185, 45);
      ctx.fillText(`Output SNR: ${snr.toFixed(1)} dB`, w - 185, 70);
    } else if (type === "am-experiment") {
      const Am = paramValues[0] ?? 2;
      const Ac = paramValues[1] ?? 4;
      const fm = paramValues[2] ?? 1000;
      const fc = paramValues[3] ?? 20000;
      const Q = paramValues[4] ?? 15;

      const mu = Am / Ac;
      const noiseFn = () => (Math.random() - 0.5) * 0.01;

      // Draw Summing Junction Signal (v_i)
      drawWave((t) => (Ac/10) * Math.cos(2 * Math.PI * (fc/100) * t * 4) + (Am/10) * Math.cos(2 * Math.PI * (fm/100) * t * 4), 
               "hsl(38 92% 50%)", h * 0.2, h * 0.15, "Summing Junction: v_i(t) = m(t) + c(t)");

      // AM Filtered Output
      ctx.strokeStyle = "hsl(142 76% 36%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = x / w;
        // The diode + LC tank effectively extracts the AM envelope and carrier
        // S(t) = [Ac + Am*cos(wm*t)] * cos(wc*t)
        const amValue = (Ac/10 + (Am/10) * Math.cos(2 * Math.PI * (fm/100) * t * 4)) * Math.cos(2 * Math.PI * (fc/100) * t * 4);
        
        // Modelling BPF Q-factor effect (adding slight ripple/harmonics if Q is low)
        const harmonicRipple = (1/Q) * (Am/10) * Math.random();
        
        const y = h * 0.7 - (amValue + harmonicRipple + noiseFn()) * h * 1.8;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(142 76% 36%)";
      ctx.fillText("Diode Modulator Output (Post-LC Filter)", 8, h * 0.7 - h * 0.25);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Mod Index (μ): ${mu.toFixed(2)}`, w - 185, 45);
      ctx.fillText(`Tank Q: ${Q.toFixed(0)}`, w - 185, 70);
    } else if (type === "am-demod-experiment") {
      const inputAmp = paramValues[0] ?? 6;
      const R = paramValues[1] ?? 10;
      const C = paramValues[2] ?? 1;
      const fc = paramValues[3] ?? 50;
      const fm = paramValues[4] ?? 3;

      const rcConstant = (R * C) / 5; // Scaled for visualization
      const noiseFn = () => (Math.random() - 0.5) * 0.02;

      // Draw Input AM Signal (dashed)
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      drawWave((t) => (inputAmp/10) * (1 + 0.6 * Math.cos(2 * Math.PI * fm * t * 4)) * Math.cos(2 * Math.PI * fc * t * 4), 
               "hsl(217 91% 60%)", h * 0.4, h * 0.2, "Input AM Signal (from Modulator)");
      ctx.setLineDash([]);

      // Demodulated Output (Envelope Detector Logic)
      ctx.strokeStyle = "hsl(142 76% 36%)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let vOut = 0;
      const dt = 1/w;
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const vIn = inputAmp * (1 + 0.6 * Math.cos(2 * Math.PI * fm * t * 4)) * Math.cos(2 * Math.PI * fc * t * 4);
        const rectVIn = Math.max(0, vIn - 0.7); // Diode drop
        
        // Capacitor charge/discharge
        if (rectVIn > vOut) vOut = rectVIn;
        else vOut *= Math.exp(-dt * 10 / rcConstant);

        // Applying the 1/pi theoretical scaling mentioned in notes for the "Filtered" average
        const scalingFactor = 1 / Math.PI;
        const yValue = (vOut / 10) * scalingFactor + noiseFn();
        
        const y = h * 0.75 - yValue * h * 0.6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(142 76% 36%)";
      ctx.fillText("Demodulated Signal (m(t)/π)", 8, h * 0.75 - h * 0.2);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`RC Constant: ${(R*C).toFixed(1)}ms`, w - 185, 45);
      ctx.fillText(`Theo. Loss: -9.9 dB (1/π)`, w - 185, 70);
    } else if (type === "fm-555-experiment") {
      const Am = paramValues[0] ?? 2;
      const fm = paramValues[1] ?? 200;
      const fc = paramValues[2] ?? 3070;
      const sensitivity = paramValues[3] ?? 50;

      const noiseFn = () => (Math.random() - 0.5) * 0.01;

      // Draw Message Signal
      drawWave((t) => (Am/10) * Math.cos(2 * Math.PI * fm * t * 4), 
               "hsl(270 70% 60%)", h * 0.2, h * 0.15, "Message Signal (applied to Pin 5)");

      // FM Square Wave Output
      ctx.strokeStyle = "hsl(246 83% 67%)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      let phase = 0;
      const dt = 1/w;
      for (let x = 0; x < w; x++) {
        const t = x / w;
        const mt = Am * Math.cos(2 * Math.PI * fm * t * 4);
        
        // Instantaneous frequency depends on Pin 5 voltage
        // Higher Am -> Higher V_pin5 -> Longer charging time -> Lower Freq
        const freq = fc - sensitivity * mt; 
        
        phase += 2 * Math.PI * (freq/100) * dt * 4;
        
        // Square wave conversion
        const val = Math.sin(phase) >= 0 ? 0.8 : -0.8;
        
        const y = h * 0.7 - (val + noiseFn()) * h * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = "hsl(246 83% 67%)";
      ctx.fillText("555 FM Output (Pin 3)", 8, h * 0.7 - h * 0.25);

      // Dashboard
      ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
      ctx.roundRect(w - 200, 20, 180, 70, 8);
      ctx.fill();
      ctx.fillStyle = "white";
      ctx.font = "bold 12px JetBrains Mono, monospace";
      ctx.fillText(`Carrier Freq: ${fc} Hz`, w - 185, 45);
      ctx.fillText(`Mod Sensitivity: ${sensitivity}`, w - 185, 70);
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
