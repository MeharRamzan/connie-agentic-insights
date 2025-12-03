import { Button } from "@/components/ui/button";
import { NetworkGraph } from "./NetworkGraph";
import { ArrowRight, Play } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      
      {/* Animated network graph */}
      <NetworkGraph />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-teal/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 section-container text-center px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="w-2 h-2 rounded-full bg-neon-teal animate-pulse" />
            <span className="text-sm text-muted-foreground">Introducing Connie</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
            Meet Connie —{" "}
            <span className="gradient-text">Your Agentic Relationship Intelligence Copilot.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.4s", opacity: 0 }}>
            Unifies your network, understands your relationships, and activates opportunities you would have missed. A new category: the{" "}
            <span className="text-foreground font-medium">Agentic Relationship Operating System</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
            <Button variant="hero" size="xl">
              Get Early Access
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              <Play className="w-5 h-5" />
              See How Connie Works
            </Button>
          </div>
        </div>

        {/* Animated flow visualization */}
        <div className="mt-20 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {["Email", "Calendar", "Notes", "Messages", "LinkedIn"].map((source, i) => (
              <div
                key={source}
                className="glass-card px-4 py-2 text-sm text-muted-foreground animate-float"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {source}
              </div>
            ))}
            <div className="text-neon-teal mx-4">→</div>
            <div className="glass-card px-6 py-3 glow-effect">
              <span className="gradient-text font-semibold">Unified Graph</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
