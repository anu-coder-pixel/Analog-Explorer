import { useState } from "react";
import { ChevronDown, ChevronRight, Radio, Waves, Menu, X, Rocket, Monitor, Zap, BarChart3, Beaker } from "lucide-react";
import { categories, topics } from "@/data/topics";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedTopicId: string;
  onSelectTopic: (id: string) => void;
}

export function AppSidebar({ selectedTopicId, onSelectTopic }: SidebarProps) {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    "Introduction": false,
    "Signals & Systems": false,
    "Amplitude Modulation": true,
    "Phase Locked Loop": false,
    "Angle Modulation": true,
    "Noise Analysis": false,
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCategory = (name: string) => {
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelect = (id: string) => {
    onSelectTopic(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <nav className="flex flex-col h-full bg-card">
      <div className="p-6 border-b border-border">
        <button
          onClick={() => onSelectTopic("")}
          className="flex items-center gap-3 w-full text-left hover:opacity-80 transition-opacity"
        >
          <div className="p-2 bg-primary rounded-xl shadow-lg">
            <Rocket className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">Analog Explorer</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">Interactive Learning</p>
          </div>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
        {categories.map((cat) => {
          const iconMap: Record<string, JSX.Element> = {
            "Introduction": <Monitor className="w-4 h-4" />,
            "Signals & Systems": <Zap className="w-4 h-4" />,
            "Amplitude Modulation": <Radio className="w-4 h-4" />,
            "Phase Locked Loop": <Waves className="w-4 h-4" />,
            "Angle Modulation": <Waves className="w-4 h-4" />,
            "Noise Analysis": <BarChart3 className="w-4 h-4" />,
            "Lab Experiments": <Beaker className="w-4 h-4" />,
          };
          const icon = iconMap[cat.name] || <Radio className="w-4 h-4" />;
          return (
            <div key={cat.name} className="mb-2">
              <button
                onClick={() => toggleCategory(cat.name)}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 group"
              >
                <span className="p-1.5 rounded-lg bg-secondary text-primary transition-colors">
                  {icon}
                </span>
                <span className="flex-1 text-left">{cat.name}</span>
                {openCategories[cat.name] ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-300" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-300" />
                )}
              </button>
              
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openCategories[cat.name] ? "max-h-[2000px] opacity-100 mt-1" : "max-h-0 opacity-0"
                )}
              >
                <div className="ml-4 space-y-1 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[1px] before:bg-border">
                  {cat.topicIds.map((tid) => {
                    const topic = topics.find((t) => t.id === tid);
                    if (!topic) return null;
                    const isActive = selectedTopicId === tid;
                    return (
                      <button
                        key={tid}
                        onClick={() => handleSelect(tid)}
                        className={cn(
                          "block w-full text-left pl-7 pr-3 py-2.5 rounded-xl text-[13px] transition-all duration-200 relative",
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-md translate-x-1"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                      >
                        {topic.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-card shadow-lg border border-border"
      >
        {mobileOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-background/80" 
          onClick={() => setMobileOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-80 flex-shrink-0 border-r border-border shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
