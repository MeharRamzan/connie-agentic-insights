import { AlertCircle, Calendar, Mail, MessageSquare, Linkedin, FileText, Clock } from "lucide-react";

const fragmentedTools = [
  { name: "Email", icon: Mail },
  { name: "Calendar", icon: Calendar },
  { name: "WhatsApp", icon: MessageSquare },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Notes", icon: FileText },
  { name: "CRM", icon: Clock },
];

const problems = [
  "Your network is scattered across dozens of apps.",
  "Follow-ups are forgotten.",
  "Weak ties disappear.",
  "Opportunities never surface.",
  "Context is lost between conversations.",
  "No single source of truth.",
];

export const ProblemSection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle red gradient for problem theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Problem statements */}
          <div>
            <div className="inline-flex items-center gap-2 text-destructive mb-6">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">The Problem</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Your Relationships Are{" "}
              <span className="text-destructive">Fragmented</span>
            </h2>

            <ul className="space-y-4">
              {problems.map((problem, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-lg text-muted-foreground opacity-0 animate-fade-in-left"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2.5 flex-shrink-0" />
                  {problem}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side - Fragmented tools visualization */}
          <div className="relative">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fragmentedTools.map((tool, i) => (
                <div
                  key={tool.name}
                  className="glass-card p-6 text-center opacity-0 animate-scale-in group hover:border-destructive/30 transition-colors"
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <tool.icon className="w-8 h-8 mx-auto mb-3 text-muted-foreground group-hover:text-destructive/70 transition-colors" />
                  <span className="text-sm text-muted-foreground">{tool.name}</span>
                </div>
              ))}
            </div>

            {/* Connection lines showing fragmentation */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full opacity-20">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(0, 84%, 60%)" />
                    <stop offset="100%" stopColor="hsl(0, 84%, 60%)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="80%" y1="30%" x2="20%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
