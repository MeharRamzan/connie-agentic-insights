import { useState } from "react";
import { Network, Search, Users, RefreshCw, Calendar, FileText } from "lucide-react";

const screens = [
  {
    id: "graph",
    title: "Relationship Graph",
    icon: Network,
    description: "Visualize your entire network with intelligent clustering and connection strength.",
  },
  {
    id: "search",
    title: "Search + Filters",
    icon: Search,
    description: "Natural language queries across all your relationships and interactions.",
  },
  {
    id: "intro",
    title: "Intro Recommendations",
    icon: Users,
    description: "Discover warm paths to anyone with suggested connection strategies.",
  },
  {
    id: "reconnect",
    title: "Reconnection Feed",
    icon: RefreshCw,
    description: "Perfectly timed suggestions for maintaining valuable relationships.",
  },
  {
    id: "prep",
    title: "Meeting Prep Brief",
    icon: Calendar,
    description: "Complete context briefs with history, notes, and talking points.",
  },
  {
    id: "notes",
    title: "Notes → Memory",
    icon: FileText,
    description: "Transform your notes into searchable, actionable memory.",
  },
];

export const ProductShowcase = () => {
  const [activeScreen, setActiveScreen] = useState(screens[0]);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            See Connie <span className="gradient-text">in Action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A unified command center for your professional relationships.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Screen selector */}
          <div className="space-y-3">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setActiveScreen(screen)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                  activeScreen.id === screen.id
                    ? "border-primary/50 bg-primary/10"
                    : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeScreen.id === screen.id
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <screen.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-medium">{screen.title}</div>
                    <div className="text-sm text-muted-foreground line-clamp-1">
                      {screen.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Screen preview */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-full min-h-[500px] relative overflow-hidden">
              {/* Mock UI based on active screen */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
              
              <div className="relative z-10 h-full flex flex-col">
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
                  <div className="flex items-center gap-3">
                    <activeScreen.icon className="w-5 h-5 text-primary" />
                    <span className="font-semibold">{activeScreen.title}</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                </div>

                {/* Content area */}
                <div className="flex-1 flex items-center justify-center">
                  {activeScreen.id === "graph" && (
                    <div className="relative w-full h-full">
                      {/* Mini network visualization */}
                      <svg className="w-full h-full" viewBox="0 0 400 300">
                        <defs>
                          <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="hsl(180, 70%, 50%)" />
                            <stop offset="100%" stopColor="hsl(270, 80%, 60%)" />
                          </linearGradient>
                        </defs>
                        {/* Connection lines */}
                        <line x1="200" y1="150" x2="100" y2="80" stroke="hsl(180, 70%, 50%)" strokeOpacity="0.3" />
                        <line x1="200" y1="150" x2="300" y2="80" stroke="hsl(220, 90%, 60%)" strokeOpacity="0.3" />
                        <line x1="200" y1="150" x2="80" y2="200" stroke="hsl(270, 80%, 60%)" strokeOpacity="0.3" />
                        <line x1="200" y1="150" x2="320" y2="200" stroke="hsl(180, 70%, 50%)" strokeOpacity="0.3" />
                        <line x1="200" y1="150" x2="150" y2="250" stroke="hsl(220, 90%, 60%)" strokeOpacity="0.3" />
                        <line x1="200" y1="150" x2="250" y2="250" stroke="hsl(270, 80%, 60%)" strokeOpacity="0.3" />
                        {/* Nodes */}
                        <circle cx="200" cy="150" r="20" fill="url(#nodeGrad)" opacity="0.8" />
                        <circle cx="100" cy="80" r="12" fill="hsl(180, 70%, 50%)" opacity="0.6" />
                        <circle cx="300" cy="80" r="14" fill="hsl(220, 90%, 60%)" opacity="0.6" />
                        <circle cx="80" cy="200" r="10" fill="hsl(270, 80%, 60%)" opacity="0.6" />
                        <circle cx="320" cy="200" r="16" fill="hsl(180, 70%, 50%)" opacity="0.6" />
                        <circle cx="150" cy="250" r="11" fill="hsl(220, 90%, 60%)" opacity="0.6" />
                        <circle cx="250" cy="250" r="13" fill="hsl(270, 80%, 60%)" opacity="0.6" />
                        <text x="200" y="155" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">YOU</text>
                      </svg>
                    </div>
                  )}

                  {activeScreen.id === "search" && (
                    <div className="w-full max-w-md space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50">
                        <Search className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">Who do I know in AI in Dubai?</span>
                      </div>
                      <div className="space-y-2">
                        {["Sarah Chen - AI Researcher", "Marcus Ali - Tech Founder", "Lisa Park - VC Partner"].map((result) => (
                          <div key={result} className="p-3 rounded-lg bg-card/50 border border-border/30 text-sm">
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeScreen.id !== "graph" && activeScreen.id !== "search" && (
                    <div className="text-center">
                      <activeScreen.icon className="w-16 h-16 mx-auto mb-4 text-primary/50" />
                      <p className="text-muted-foreground">{activeScreen.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
