import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { RefreshCw, Send, X, Clock, TrendingDown, Calendar } from "lucide-react";

const suggestions = [
  {
    id: 1,
    name: "Emily Watson",
    company: "Sequoia Capital",
    title: "Partner",
    lastContact: "3 months ago",
    reason: "Investment round closing soon",
    priority: "high",
    avatar: "EW",
    suggestedAction: "Coffee meeting",
  },
  {
    id: 2,
    name: "James Rodriguez",
    company: "Stripe",
    title: "Head of Partnerships",
    lastContact: "6 weeks ago",
    reason: "You both attended Web Summit 2024",
    priority: "medium",
    avatar: "JR",
    suggestedAction: "Quick call",
  },
  {
    id: 3,
    name: "Anna Kim",
    company: "Google DeepMind",
    title: "Research Scientist",
    lastContact: "2 months ago",
    reason: "Shared interest in AI safety",
    priority: "medium",
    avatar: "AK",
    suggestedAction: "Share article",
  },
  {
    id: 4,
    name: "Michael Chen",
    company: "a]16z",
    title: "Principal",
    lastContact: "4 months ago",
    reason: "Quarterly check-in overdue",
    priority: "high",
    avatar: "MC",
    suggestedAction: "Lunch meeting",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    company: "LVMH",
    title: "Digital Director",
    lastContact: "5 weeks ago",
    reason: "New product launch alignment",
    priority: "low",
    avatar: "SL",
    suggestedAction: "Email update",
  },
];

const priorityConfig = {
  high: { label: "High Priority", color: "text-red-400", bgColor: "bg-red-400/10" },
  medium: { label: "Medium", color: "text-yellow-400", bgColor: "bg-yellow-400/10" },
  low: { label: "Low", color: "text-green-400", bgColor: "bg-green-400/10" },
};

const Reconnect = () => {
  const [items, setItems] = useState(suggestions);
  const [dismissed, setDismissed] = useState<number[]>([]);

  const handleDismiss = (id: number) => {
    setDismissed((prev) => [...prev, id]);
  };

  const handleReach = (id: number) => {
    // Would open compose modal
    console.log("Reaching out to", id);
  };

  const visibleItems = items.filter((item) => !dismissed.includes(item.id));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              <span className="gradient-text">Reconnection Engine</span>
            </h1>
            <p className="text-muted-foreground">
              Perfectly timed suggestions for maintaining valuable relationships
            </p>
          </div>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-red-400/10 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">23</p>
              <p className="text-sm text-muted-foreground">Fading connections</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-yellow-400/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">47</p>
              <p className="text-sm text-muted-foreground">Overdue check-ins</p>
            </div>
          </div>
          <div className="glass-card p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-400/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Reconnected this week</p>
            </div>
          </div>
        </div>

        {/* Today's suggestions */}
        <h3 className="font-medium mb-4">Today's suggestions ({visibleItems.length})</h3>
        <div className="space-y-4">
          {visibleItems.map((person) => {
            const priority = priorityConfig[person.priority as keyof typeof priorityConfig];
            return (
              <div
                key={person.id}
                className="glass-card p-5 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {person.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{person.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${priority.bgColor} ${priority.color}`}>
                        {priority.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {person.title} at {person.company}
                    </p>
                    <div className="mt-3 p-3 rounded-lg bg-secondary/30 border border-border/50">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Why now: </span>
                        {person.reason}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="text-muted-foreground">Last contact: </span>
                        {person.lastContact}
                      </p>
                      <p className="text-sm mt-1">
                        <span className="text-muted-foreground">Suggested action: </span>
                        <span className="text-primary">{person.suggestedAction}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="hero" size="sm" onClick={() => handleReach(person.id)}>
                      <Send className="w-4 h-4 mr-1" />
                      Reach Out
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDismiss(person.id)}>
                      <X className="w-4 h-4 mr-1" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {visibleItems.length === 0 && (
          <div className="text-center py-12 glass-card">
            <p className="text-muted-foreground">All caught up! Check back tomorrow for new suggestions.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Reconnect;
