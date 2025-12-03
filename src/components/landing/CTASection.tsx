import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-background to-background" />
      
      {/* Glowing orbs */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-teal/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Network —{" "}
            <span className="gradient-text">Finally Unified, Understood, and Activated.</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10">
            Join the early access list for Connie v1.0.
          </p>

          <Button variant="hero" size="xl">
            Get Early Access
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
