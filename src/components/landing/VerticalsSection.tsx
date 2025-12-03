import { Cpu, Trophy, Music, Home, Hotel, Shirt, Wallet, Plane } from "lucide-react";

const verticals = [
  { name: "Tech", icon: Cpu },
  { name: "Sports", icon: Trophy },
  { name: "Music", icon: Music },
  { name: "Real Estate", icon: Home },
  { name: "Hospitality", icon: Hotel },
  { name: "Fashion", icon: Shirt },
  { name: "Finance", icon: Wallet },
  { name: "Travel", icon: Plane },
];

export const VerticalsSection = () => {
  return (
    <section className="py-24 lg:py-32 relative">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Built for Every{" "}
            <span className="gradient-text">Network-Driven Industry</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every industry runs on relationships. Connie adapts to your world.
          </p>
        </div>

        {/* Verticals grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {verticals.map((vertical, i) => (
            <div
              key={vertical.name}
              className="glass-card p-8 text-center group hover:border-primary/30 transition-all duration-300 opacity-0 animate-scale-in cursor-pointer"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-primary/20 group-hover:to-accent/20 transition-all duration-300">
                <vertical.icon className="w-7 h-7 text-primary" />
              </div>
              <span className="font-medium">{vertical.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
