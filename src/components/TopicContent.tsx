import { useState } from "react";
import { TopicData } from "@/data/topics";
import { TheoryTab } from "./tabs/TheoryTab";
import { BlockDiagramTab } from "./tabs/BlockDiagramTab";
import { CircuitDiagramTab } from "./tabs/CircuitDiagramTab";
import { SimulationTab } from "./tabs/SimulationTab";
import { NumericalsTab } from "./tabs/NumericalsTab";
import { ExperimentTab } from "./tabs/ExperimentTab";
import { cn } from "@/lib/utils";
import { BookOpen, LayoutGrid, Cpu, Activity, Calculator } from "lucide-react";

const tabs = [
  { id: "theory", label: "Theory", icon: BookOpen },
  { id: "block", label: "Block Diagram", icon: LayoutGrid },
  { id: "circuit", label: "Circuit Diagram", icon: Cpu },
  { id: "simulation", label: "Simulation", icon: Activity },
  { id: "numericals", label: "Numericals", icon: Calculator },
  { id: "experiment", label: "Experiment", icon: BookOpen },
];

interface Props {
  topic: TopicData;
}

export function TopicContent({ topic }: Props) {
  const [activeTab, setActiveTab] = useState(topic.experiment ? "experiment" : "theory");

  return (
    <div className="animate-fade-in bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
      <div className="mb-8">
        <span className="inline-block px-3 py-1 bg-secondary text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-3">
          {topic.category}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">{topic.title}</h2>
      </div>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8 p-1.5 bg-background border border-border rounded-xl shadow-inner">
        {tabs.filter(tab => {
          if (tab.id === "simulation" && !topic.simulation) return false;
          if (tab.id === "circuit" && !topic.circuitDiagram) return false;
          if (tab.id === "numericals" && (!topic.numericals || topic.numericals.length === 0)) return false;
          if (tab.id === "experiment" && !topic.experiment) return false;
          return true;
        }).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground font-bold shadow-md"
                  : "text-muted-foreground font-semibold hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-transform duration-200", isActive && "scale-110")} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in rounded-2xl">
        {activeTab === "theory" && <TheoryTab theory={topic.theory} />}
        {activeTab === "block" && <BlockDiagramTab diagram={topic.blockDiagram} />}
        {activeTab === "circuit" && <CircuitDiagramTab diagram={topic.circuitDiagram} topicId={topic.id} />}
        {activeTab === "simulation" && <SimulationTab simulation={topic.simulation} />}
        {activeTab === "numericals" && <NumericalsTab numericals={topic.numericals} />}
        {activeTab === "experiment" && topic.experiment && <ExperimentTab experiment={topic.experiment} />}
      </div>
    </div>
  );
}
