import { TopicData } from "@/data/topics";
import { EnvelopeDetectorCircuit } from "../diagrams/EnvelopeDetectorCircuit";
import { FrequencyMixerCircuit } from "../diagrams/FrequencyMixerCircuit";
import { BalancedModulatorDSB } from "../diagrams/BalancedModulatorDSB";
import { AMTransistorModulator } from "../diagrams/AMTransistorModulator";
import { AMDemodulatorCircuit } from "../diagrams/AMDemodulatorCircuit";
import { PhaseShiftSSBCircuit } from "../diagrams/PhaseShiftSSBCircuit";
import { QAMCircuit } from "../diagrams/QAMCircuit";
import { NonLinearModulatorCircuit } from "../diagrams/NonLinearModulatorCircuit";
import { FMTransmitterCircuit } from "../diagrams/FMTransmitterCircuit";
import { NBFMCircuit } from "../diagrams/NBFMCircuit";
import { PMModulatorCircuit } from "../diagrams/PMModulatorCircuit";
import { WBFMTransmitterCircuit } from "../diagrams/WBFMTransmitterCircuit";
import { FMDemodulatorCircuit } from "../diagrams/FMDemodulatorCircuit";
import { AMExperimentCircuit } from "../diagrams/AMExperimentCircuit";
import { AMDemodExperimentCircuit } from "../diagrams/AMDemodExperimentCircuit";
import { FM555ExperimentCircuit } from "../diagrams/FM555ExperimentCircuit";
import { PLLCircuit } from "../diagrams/PLLCircuit";

interface Props {
  diagram: TopicData["circuitDiagram"];
  topicId: string;
}

export function CircuitDiagramTab({ diagram, topicId }: Props) {
  const customDiagramIds = [
    "envelope-detector", 
    "frequency-mixer", 
    "dsb-sc", 
    "am", 
    "am-demodulation", 
    "ssb",
    "qam",
    "nonlinear-modulator",
    "fm",
    "nbfm",
    "pm",
    "direct-fm",
    "fm-demodulation",
    "am-experiment",
    "am-demod-experiment",
    "fm-555-experiment",
    "pll"
  ];

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-2">{diagram.svgLabel}</h3>
        <p className="text-sm text-muted-foreground mb-6">{diagram.description}</p>

        {/* Custom Premium Diagrams if available */}
        <div className="mb-6 overflow-hidden">
          {topicId === "envelope-detector" && <EnvelopeDetectorCircuit />}
          {topicId === "frequency-mixer" && <FrequencyMixerCircuit />}
          {topicId === "dsb-sc" && <BalancedModulatorDSB />}
          {topicId === "am" && <AMTransistorModulator />}
          {topicId === "am-demodulation" && <AMDemodulatorCircuit />}
          {topicId === "ssb" && <PhaseShiftSSBCircuit />}
          {topicId === "qam" && <QAMCircuit />}
          {topicId === "nonlinear-modulator" && <NonLinearModulatorCircuit />}
          {topicId === "fm" && <WBFMTransmitterCircuit />}
          {topicId === "nbfm" && <NBFMCircuit />}
          {topicId === "pm" && <PMModulatorCircuit />}
          {topicId === "nbpm" && <PMModulatorCircuit />}
          {topicId === "direct-fm" && <FMTransmitterCircuit />}
          {topicId === "fm-demodulation" && <FMDemodulatorCircuit />}
          {topicId === "am-experiment" && <AMExperimentCircuit />}
          {topicId === "am-demod-experiment" && <AMDemodExperimentCircuit />}
          {topicId === "fm-555-experiment" && <FM555ExperimentCircuit />}
          {topicId === "pll" && <PLLCircuit />}
          
          {/* Standard Circuit Diagram Image if no custom component exists */}
          {!customDiagramIds.includes(topicId) && diagram.image && (
            <div className="bg-white rounded-xl p-4 border border-border shadow-sm">
              <img
                src={`/${diagram.image}`}
                alt={diagram.svgLabel}
                className="w-full max-w-2xl mx-auto rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Component list */}
        <div className="bg-muted rounded-lg p-5">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Circuit Components</p>
          <div className="grid gap-2.5">
            {diagram.elements.map((el, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {i + 1}
                </div>
                <span className="text-sm text-foreground">{el}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


