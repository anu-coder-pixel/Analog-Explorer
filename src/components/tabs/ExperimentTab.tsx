import React from "react";
import { TopicData } from "@/data/topics";
import { Beaker, Target, Cpu, BookOpen, Search, CheckCircle } from "lucide-react";

interface Props {
  experiment: NonNullable<TopicData["experiment"]>;
}

export function ExperimentTab({ experiment }: Props) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Realistic Lab Setup Image */}
      {experiment.image && (
        <div className="relative group overflow-hidden rounded-3xl border border-border shadow-2xl bg-black/20">
          <img 
            src={experiment.image} 
            alt="Realistic Lab Setup" 
            className="w-full h-[300px] md:h-[450px] object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex items-end p-8">
            <div>
              <h3 className="text-2xl md:text-4xl font-extrabold text-foreground tracking-tight drop-shadow-lg">
                Virtual Laboratory
              </h3>
              <p className="text-sm md:text-lg text-muted-foreground font-medium mt-2 max-w-2xl">
                High-fidelity simulation of the lab setup based on practical experiments.
              </p>
            </div>
          </div>
          {/* We can use the category or a generic label here */}
        </div>
      )}

      {/* Aim & Apparatus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Aim</h3>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed font-medium">
            {experiment.aim}
          </p>
        </section>

        <section className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Beaker className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Apparatus</h3>
          </div>
          <ul className="grid grid-cols-1 gap-2">
            {experiment.apparatus.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Components Required */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Components Required</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {experiment.componentsRequired.map((comp, i) => (
            <div 
              key={i} 
              className="px-4 py-2 bg-secondary/50 border border-border rounded-xl text-xs font-semibold text-foreground/90 flex items-center gap-2 hover:bg-secondary transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {comp}
            </div>
          ))}
        </div>
      </section>

      {/* Observations */}
      <section className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Search className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-foreground">Observations</h3>
        </div>
        <div className="space-y-4">
          {experiment.observations.map((obs, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-muted/50 border border-border/50 group-hover:border-primary/20 transition-colors">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-background text-primary flex items-center justify-center text-sm font-bold shadow-sm">
                {i + 1}
              </span>
              <p className="text-sm text-foreground/80 leading-relaxed italic">
                "{obs}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-primary/5 border border-primary/20 rounded-2xl p-8 shadow-inner group">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <CheckCircle className="w-6 h-6" />
          <h3 className="text-2xl font-black tracking-tight italic">Conclusion</h3>
        </div>
        <div className="p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg">
          <p className="text-md font-medium text-foreground leading-relaxed indent-8 first-letter:text-4xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
            {experiment.conclusion}
          </p>
        </div>
      </section>
    </div>
  );
}
