import { Server, Smartphone, Plug, Building2 } from "lucide-react";

const phases = [
  {
    phase: "Phase 1",
    title: "Agent & Backend Foundations",
    icon: Server,
    status: "in-progress",
    description: "Core multi-agent architecture and data infrastructure.",
  },
  {
    phase: "Phase 2",
    title: "Mobile App + Web Platform",
    icon: Smartphone,
    status: "upcoming",
    description: "Native mobile experience and full web dashboard.",
  },
  {
    phase: "Phase 3",
    title: "Integrations",
    icon: Plug,
    status: "planned",
    description: "Deep connections with communication and productivity tools.",
  },
  {
    phase: "Phase 4",
    title: "Industry Modules",
    icon: Building2,
    status: "planned",
    description: "Vertical-specific features and industry partnerships.",
  },
];

export const RoadmapSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Building the Future of{" "}
            <span className="gradient-text">Relationship Intelligence</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-muted hidden md:block" />

          {/* Phases */}
          <div className="space-y-12">
            {phases.map((phase, i) => (
              <div
                key={phase.phase}
                className={`flex items-center gap-8 opacity-0 animate-fade-in ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="glass-card p-6 inline-block">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          phase.status === "in-progress"
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <phase.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {phase.phase}
                        </span>
                        <h3 className="font-semibold">{phase.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{phase.description}</p>
                    
                    {phase.status === "in-progress" && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-primary">In Progress</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex w-4 h-4 rounded-full bg-background border-2 border-primary flex-shrink-0 relative z-10" />

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
