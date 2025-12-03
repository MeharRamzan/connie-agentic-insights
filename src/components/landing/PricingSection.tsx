import { Check } from "lucide-react";

const plans = [
  {
    name: "Individual",
    price: "$20",
    period: "/mo",
    description: "For professionals managing their personal network.",
    features: ["Unified relationship graph", "Smart search", "Reconnection reminders", "Meeting prep briefs"],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/mo",
    description: "For power networkers and business developers.",
    features: ["Everything in Individual", "Intro engine", "Advanced analytics", "Priority support"],
    popular: true,
  },
  {
    name: "Team",
    price: "Custom",
    period: "",
    description: "For teams that run on relationships.",
    features: ["Everything in Pro", "Team collaboration", "Shared network insights", "Admin controls"],
  },
];

export const PricingSection = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connie will launch with Individual, Pro, and Team plans.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`glass-card p-8 relative opacity-0 animate-scale-in ${
                plan.popular ? "border-primary/50 glow-effect" : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-neon-teal via-neon-blue to-neon-purple text-xs font-semibold text-background">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
