import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const suggestions = [
  "Who do I know at Google?",
  "Investors in AI startups",
  "People I met in Dubai",
  "Marketing connections",
];

export const QuickSearch = () => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          placeholder="Ask Connie anything about your network..."
          className="pl-12 h-14 text-lg bg-secondary/30 border-border/50 focus:border-primary/50"
        />
      </div>

      {focused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card p-4 z-10">
          <p className="text-xs text-muted-foreground mb-3">Try asking:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-secondary/50 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
