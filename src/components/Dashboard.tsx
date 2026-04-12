import { categories, topics } from "@/data/topics";
import { BookOpen, Activity, Zap, BarChart3, Users, Award, ArrowRight, Lightbulb, Monitor, Cpu } from "lucide-react";

interface DashboardProps {
  onSelectTopic: (topicId: string) => void;
}

const chapterIcons = [Monitor, Zap, BookOpen, Activity, BarChart3];
const chapterDescriptions: Record<string, string> = {
  "Introduction": "Communication systems, analog vs digital modulation, need for modulation, SNR basics.",
  "Signals & Systems": "Signal classification, energy & power, Fourier series, transforms & spectral analysis.",
  "Amplitude Modulation": "DSB-SC, SSB, VSB, FM-AM, envelope detection, superheterodyne receivers.",
  "Angle Modulation": "FM & PM, bandwidth of FM, Carson's rule, FM generation, demodulation, Superheterodyne receiver.",
  "Noise Analysis": "Thermal noise, shot noise, noise figure, Friis formula, SNR comparison of AM vs FM.",
};

const quickRevisionCards = [
  { emoji: "📡", title: "AM Signal", fact: "s(t) = Ac[1 + μm(t)]cos(ωct)" },
  { emoji: "📡", title: "AM Modulation Index", fact: "μ = Am / Ac" },
  { emoji: "📡", title: "AM Bandwidth", fact: "BW = 2fm" },
  { emoji: "📡", title: "AM Total Power", fact: "Pt = Pc(1 + μ²/2)" },
  { emoji: "📡", title: "AM Efficiency", fact: "η = μ² / (2 + μ²) × 100%" },
  { emoji: "📻", title: "FM Signal", fact: "s(t) = Ac·cos(ωct + kf∫m(t)dt)" },
  { emoji: "📻", title: "FM Frequency Deviation", fact: "Δf = kf·Am" },
  { emoji: "📻", title: "FM Modulation Index", fact: "β = Δf / fm" },
  { emoji: "📻", title: "FM Bandwidth (Carson)", fact: "BW ≈ 2(Δf + fm)" },
  { emoji: "🔊", title: "SNR", fact: "SNR = S / N" },
  { emoji: "🔊", title: "Thermal Noise Power", fact: "N = kTB" },
  { emoji: "🔊", title: "SNR in dB", fact: "SNR_dB = 10·log₁₀(S/N)" },
];

export function Dashboard({ onSelectTopic }: DashboardProps) {

  const totalTopics = topics.length;
  const totalCategories = categories.length;

  return (
    <div className="animate-fade-in w-full max-w-6xl mx-auto p-2 md:p-6">

      {/* Welcome Banner */}
      <div className="bg-card border border-border shadow-lg rounded-2xl p-6 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">👋</span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Welcome to <span className="text-primary">Analog Explorer</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-3xl leading-relaxed">
            Explore concepts in analog and digital communication through interactive simulations, visual diagrams, and easy-to-understand explanations.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: BookOpen, label: "Chapters", value: totalCategories, color: "text-blue-400" },
          { icon: Cpu, label: "Topics", value: totalTopics, color: "text-emerald-400" },
          { icon: Activity, label: "Simulations", value: totalTopics, color: "text-amber-400" },
          { icon: Award, label: "Numericals", value: "50+", color: "text-rose-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ANALOG COMMUNICATION HEADING */}
      <div className="mb-5">
        <h2 className="text-sm font-bold text-primary tracking-widest uppercase flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Analog Communication
        </h2>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {categories.map((category, index) => {
          const firstTopicId = category.topicIds[0];
          const IconComponent = chapterIcons[index % chapterIcons.length];
          const description = chapterDescriptions[category.name] || category.topicIds.slice(0, 4).map(id => topics.find(t => t.id === id)?.title).filter(Boolean).join(", ");

          return (
            <div
              key={category.name}
              className="group bg-card border border-border rounded-2xl p-6 shadow-md flex flex-col transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4">
                <div className="p-3 bg-secondary text-primary rounded-xl inline-block mb-4 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">
                  Ch {index + 1} — {category.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="mt-auto pt-3">
                <button
                  onClick={() => onSelectTopic(firstTopicId)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 py-2.5 rounded-lg text-sm shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  Open <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Revision Section */}
      <div className="mb-10">
        <h2 className="text-sm font-bold text-primary tracking-widest uppercase flex items-center gap-2 mb-5">
          <Lightbulb className="w-4 h-4" />
          Quick Revision — Key Formulas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickRevisionCards.map((card) => (
            <div
              key={card.title}
              className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{card.emoji}</span>
                <h3 className="font-bold text-foreground text-sm">{card.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">{card.fact}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
