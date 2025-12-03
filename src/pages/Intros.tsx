import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Sparkles, Copy, Send } from "lucide-react";

const targetContacts = [
  { id: 1, name: "Elon Musk", company: "Tesla / SpaceX", role: "CEO" },
  { id: 2, name: "Satya Nadella", company: "Microsoft", role: "CEO" },
  { id: 3, name: "Jensen Huang", company: "NVIDIA", role: "CEO" },
];

const pathResults = [
  {
    target: "Elon Musk",
    paths: [
      {
        hops: ["You", "Sarah Chen", "Marc Andreessen", "Elon Musk"],
        strength: 72,
        recommended: true,
      },
      {
        hops: ["You", "Marcus Ali", "Kimbal Musk", "Elon Musk"],
        strength: 65,
        recommended: false,
      },
    ],
  },
];

const draftMessage = `Hi Sarah,

I hope this message finds you well! I'm reaching out because I noticed you're connected with Marc Andreessen, and I'm trying to get an introduction to Elon Musk regarding a potential collaboration opportunity.

Would you be comfortable making an introduction? I'd be happy to share more context if helpful.

Best,
[Your name]`;

const Intros = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState<number | null>(null);
  const [showDraft, setShowDraft] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            <span className="gradient-text">Intro Engine</span>
          </h1>
          <p className="text-muted-foreground">
            Discover warm paths to anyone and get AI-generated intro requests
          </p>
        </div>

        {/* Search */}
        <div className="glass-card p-6 mb-8">
          <h3 className="font-medium mb-4">Who do you want to reach?</h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, or role..."
              className="pl-12 h-12 bg-secondary/30"
            />
          </div>

          {/* Quick suggestions */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Popular targets:</p>
            <div className="flex flex-wrap gap-2">
              {targetContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSearchQuery(contact.name)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-sm"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-xs">
                    {contact.name[0]}
                  </div>
                  <span>{contact.name}</span>
                  <span className="text-muted-foreground">· {contact.company}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Path results */}
        {searchQuery && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Warm paths to {searchQuery}</h3>
              <span className="text-sm text-muted-foreground">2 paths found</span>
            </div>

            {pathResults[0].paths.map((path, index) => (
              <div
                key={index}
                className={`glass-card p-5 cursor-pointer transition-all ${
                  selectedPath === index ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
                }`}
                onClick={() => setSelectedPath(index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {path.recommended && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Recommended
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">{path.strength}% connection strength</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{path.hops.length - 1} hops</span>
                </div>

                {/* Path visualization */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {path.hops.map((hop, i) => (
                    <div key={i} className="flex items-center gap-2 flex-shrink-0">
                      <div className={`px-4 py-2 rounded-lg border ${
                        i === 0 ? "bg-primary/10 border-primary/30 text-primary" :
                        i === path.hops.length - 1 ? "bg-accent/10 border-accent/30 text-accent" :
                        "bg-secondary border-border/50"
                      }`}>
                        {hop}
                      </div>
                      {i < path.hops.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>

                {selectedPath === index && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <Button variant="hero" onClick={() => setShowDraft(true)}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Intro Request
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Draft message modal */}
        {showDraft && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowDraft(false)} />
            <div className="relative glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <h3 className="text-lg font-semibold mb-4">AI-Generated Intro Request</h3>
              <div className="bg-secondary/30 rounded-lg p-4 mb-4 font-mono text-sm whitespace-pre-wrap">
                {draftMessage}
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowDraft(false)}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button variant="hero">
                  <Send className="w-4 h-4 mr-2" />
                  Send via Email
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Intros;
