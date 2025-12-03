import { useState } from "react";

const agents = [
  { name: "UX Orchestrator", color: "from-neon-teal to-neon-blue", angle: 0 },
  { name: "Identity & Permissions", color: "from-neon-blue to-neon-purple", angle: 32.7 },
  { name: "Ingestion & Sync", color: "from-neon-purple to-neon-teal", angle: 65.4 },
  { name: "Relationship Graph", color: "from-neon-teal to-neon-blue", angle: 98.1 },
  { name: "Search & Recall", color: "from-neon-blue to-neon-purple", angle: 130.9 },
  { name: "Matchmaking & Intro", color: "from-neon-purple to-neon-teal", angle: 163.6 },
  { name: "Reconnection & Timing", color: "from-neon-teal to-neon-blue", angle: 196.3 },
  { name: "Meeting Prep & Follow-Up", color: "from-neon-blue to-neon-purple", angle: 229 },
  { name: "Privacy & Compliance", color: "from-neon-purple to-neon-teal", angle: 261.8 },
  { name: "Notification Orchestrator", color: "from-neon-teal to-neon-blue", angle: 294.5 },
  { name: "IMS Routing", color: "from-neon-blue to-neon-purple", angle: 327.2 },
];

export const AgentSection = () => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <span className="text-sm font-medium uppercase tracking-wider">Architecture</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Powered by{" "}
            <span className="gradient-text">11 Coordinated Agents</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            Connie is powered by coordinated agents that reason across your entire network — 
            retrieving context, timing, and opportunity.
          </p>
        </div>

        {/* Orbital diagram */}
        <div className="relative max-w-3xl mx-auto aspect-square">
          {/* Center core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center glow-effect z-10">
            <div className="text-center">
              <div className="text-2xl font-bold gradient-text">Connie</div>
              <div className="text-xs text-muted-foreground">Core Engine</div>
            </div>
          </div>

          {/* Orbit rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-border/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] border border-border/20 rounded-full" />

          {/* Agent nodes */}
          {agents.map((agent, i) => {
            const radius = 42; // percentage from center
            const x = 50 + radius * Math.cos((agent.angle * Math.PI) / 180);
            const y = 50 + radius * Math.sin((agent.angle * Math.PI) / 180);
            
            return (
              <div
                key={agent.name}
                className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredAgent(agent.name)}
                onMouseLeave={() => setHoveredAgent(null)}
              >
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-br ${agent.color} opacity-20 group-hover:opacity-40 transition-all duration-300 group-hover:scale-125 animate-node`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-foreground/80 group-hover:scale-150 transition-transform" />
                </div>
                
                {/* Tooltip */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-12 whitespace-nowrap px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium transition-all duration-200 ${
                    hoveredAgent === agent.name ? "opacity-100 scale-100" : "opacity-0 scale-90"
                  }`}
                >
                  {agent.name}
                </div>
              </div>
            );
          })}

          {/* Connection lines from center */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="agentLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(180, 70%, 50%)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="hsl(270, 80%, 60%)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {agents.map((agent) => {
              const radius = 42;
              const x = 50 + radius * Math.cos((agent.angle * Math.PI) / 180);
              const y = 50 + radius * Math.sin((agent.angle * Math.PI) / 180);
              return (
                <line
                  key={agent.name}
                  x1="50%"
                  y1="50%"
                  x2={`${x}%`}
                  y2={`${y}%`}
                  stroke="url(#agentLineGradient)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        {/* Agent list for mobile */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 lg:hidden">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="glass-card p-3 text-center text-sm text-muted-foreground"
            >
              {agent.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
