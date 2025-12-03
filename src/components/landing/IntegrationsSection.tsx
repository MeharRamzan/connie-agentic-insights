import { useState } from "react";
import { Mail, Calendar, MessageSquare, Linkedin, FileText, Database, Cloud, Briefcase } from "lucide-react";

const integrationGroups = [
  {
    name: "Communication",
    description: "Sync all your communication channels into one unified timeline.",
    integrations: [
      { name: "Gmail", icon: Mail },
      { name: "Outlook", icon: Mail },
      { name: "WhatsApp", icon: MessageSquare },
      { name: "Slack", icon: MessageSquare },
      { name: "Zoom", icon: Calendar },
    ],
  },
  {
    name: "Professional Graph",
    description: "Import and enrich your professional network data.",
    integrations: [
      { name: "LinkedIn", icon: Linkedin },
    ],
  },
  {
    name: "Productivity",
    description: "Extract context from your notes and documents.",
    integrations: [
      { name: "Notion", icon: FileText },
      { name: "Google Docs", icon: FileText },
      { name: "Evernote", icon: FileText },
    ],
  },
  {
    name: "CRM / ATS",
    description: "Bi-directional sync with your existing systems.",
    integrations: [
      { name: "HubSpot", icon: Database },
      { name: "Salesforce", icon: Cloud },
      { name: "Greenhouse", icon: Briefcase },
    ],
  },
];

export const IntegrationsSection = () => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Your Entire Relationship Life{" "}
            <span className="gradient-text">in One Place</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect all your tools. Connie understands what each integration brings.
          </p>
        </div>

        {/* Integration groups */}
        <div className="grid md:grid-cols-2 gap-6">
          {integrationGroups.map((group, i) => (
            <div
              key={group.name}
              className="glass-card p-6 opacity-0 animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
              onMouseEnter={() => setActiveGroup(group.name)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{group.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {group.integrations.map((integration) => (
                  <div
                    key={integration.name}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 ${
                      activeGroup === group.name
                        ? "border-primary/50 bg-primary/10"
                        : "border-border/50 bg-secondary/30"
                    }`}
                  >
                    <integration.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{integration.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon note */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          + Industry systems: InterAIA, PlatesAIA, Aida, Worldies, and more coming soon.
        </p>
      </div>
    </section>
  );
};
