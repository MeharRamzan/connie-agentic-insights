import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { AgentSection } from "@/components/landing/AgentSection";
import { ProductShowcase } from "@/components/landing/ProductShowcase";
import { VerticalsSection } from "@/components/landing/VerticalsSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { RoadmapSection } from "@/components/landing/RoadmapSection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <section id="features">
        <SolutionSection />
      </section>
      <section id="how-it-works">
        <AgentSection />
      </section>
      <ProductShowcase />
      <VerticalsSection />
      <section id="integrations">
        <IntegrationsSection />
      </section>
      <section id="pricing">
        <PricingSection />
      </section>
      <RoadmapSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
