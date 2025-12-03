import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, Building, MapPin, Tag, Clock } from "lucide-react";

const sampleResults = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "Acme Corp",
    title: "VP of Engineering",
    location: "San Francisco, CA",
    tags: ["AI", "Tech"],
    lastContact: "2 weeks ago",
    strength: 85,
  },
  {
    id: 2,
    name: "Marcus Ali",
    company: "TechStart Inc",
    title: "Founder & CEO",
    location: "New York, NY",
    tags: ["Startup", "B2B"],
    lastContact: "1 month ago",
    strength: 72,
  },
  {
    id: 3,
    name: "Lisa Park",
    company: "Venture Partners",
    title: "Partner",
    location: "Palo Alto, CA",
    tags: ["VC", "Series A"],
    lastContact: "3 weeks ago",
    strength: 68,
  },
];

const suggestedQueries = [
  "Who do I know at Google?",
  "Investors interested in AI",
  "People I met in Dubai",
  "Marketing connections in NYC",
  "Former colleagues at Stripe",
  "Friends of Emily Watson",
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (query.trim()) {
      setHasSearched(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Smart Search</span>
          </h1>
          <p className="text-muted-foreground">
            Ask anything about your network in natural language
          </p>
        </div>

        {/* Search input */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Try: 'Who do I know in AI in Dubai?'"
              className="pl-12 pr-24 h-14 text-lg bg-secondary/30 border-border/50 focus:border-primary/50"
            />
            <Button
              variant="hero"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={handleSearch}
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Search
            </Button>
          </div>
        </div>

        {!hasSearched ? (
          /* Suggested queries */
          <div className="glass-card p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Try asking:</h3>
            <div className="flex flex-wrap gap-2">
              {suggestedQueries.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setQuery(suggestion);
                    setHasSearched(true);
                  }}
                  className="px-4 py-2 rounded-lg border border-border/50 text-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search results */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found <span className="text-foreground font-medium">24 results</span> for "{query}"
              </p>
              <Button variant="outline" size="sm">
                Filter results
              </Button>
            </div>

            {sampleResults.map((person) => (
              <div
                key={person.id}
                className="glass-card p-5 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-lg font-medium flex-shrink-0">
                    {person.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{person.name}</h3>
                      <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        {person.strength}% match
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{person.title}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5" />
                        {person.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {person.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {person.lastContact}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {person.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-secondary text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default SearchPage;
