import { Network, Search, Users, RefreshCw, Calendar, Brain } from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Unified Relationship Graph",
    description: "Every contact, interaction, and context — in one living system.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: '"Who do I know in AI in Dubai?" — answered instantly.',
  },
  {
    icon: Users,
    title: "Intro Engine",
    description: "Discover warm paths and auto-generated message drafts.",
  },
  {
    icon: RefreshCw,
    title: "Reconnection Engine",
    description: '"Who should I reach out to today?" — perfectly timed.',
  },
  {
    icon: Calendar,
    title: "Meeting Prep Intelligence",
    description: "Full context briefs before every conversation.",
  },
  {
    icon: Brain,
    title: "Actionable Notes → Memory",
    description: "Your notes become a searchable memory layer.",
  },
];

export const SolutionSection = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            <span className="text-sm font-medium uppercase tracking-wider">The Solution</span>
            <span className="w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Connie Changes This.</span>
          </h2>

          <p className="text-lg text-muted-foreground">
            The First Multi-Agent Relationship Intelligence Platform. Connie unifies all your 
            relationships into a living, evolving graph — then uses multi-agent reasoning to 
            surface insights, opportunities, and perfectly timed reconnections.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-300 opacity-0 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
