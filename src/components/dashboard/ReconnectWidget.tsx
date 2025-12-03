import { Button } from "@/components/ui/button";
import { RefreshCw, Send } from "lucide-react";

const suggestions = [
  {
    id: 1,
    name: "Emily Watson",
    company: "Sequoia Capital",
    lastContact: "3 months ago",
    reason: "Investment round closing soon",
    avatar: "EW",
  },
  {
    id: 2,
    name: "James Rodriguez",
    company: "Stripe",
    lastContact: "6 weeks ago",
    reason: "Mentioned at a conference",
    avatar: "JR",
  },
  {
    id: 3,
    name: "Anna Kim",
    company: "Google DeepMind",
    lastContact: "2 months ago",
    reason: "Shared interest in AI",
    avatar: "AK",
  },
];

export const ReconnectWidget = () => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Reconnect Today</h3>
        <RefreshCw className="w-4 h-4 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {suggestions.map((person) => (
          <div
            key={person.id}
            className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-xs font-medium flex-shrink-0">
                {person.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{person.name}</p>
                <p className="text-xs text-muted-foreground">{person.company}</p>
                <p className="text-xs text-primary mt-1">{person.reason}</p>
              </div>
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
