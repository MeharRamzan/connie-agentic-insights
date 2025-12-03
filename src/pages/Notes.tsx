import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, FileText, Tag, Calendar, Sparkles, Save } from "lucide-react";

const sampleNotes = [
  {
    id: 1,
    title: "Investor Meeting Notes - Sequoia",
    content: "Discussed Q3 metrics with Emily. She's interested in our AI roadmap and mentioned potential follow-on...",
    tags: ["investor", "sequoia", "Q3"],
    contact: "Emily Watson",
    date: "Dec 2, 2024",
    insights: 3,
  },
  {
    id: 2,
    title: "Partnership Discussion - Stripe",
    content: "James mentioned their new embedded finance product. Could be a good integration opportunity for us...",
    tags: ["partnership", "stripe", "integration"],
    contact: "James Rodriguez",
    date: "Nov 28, 2024",
    insights: 2,
  },
  {
    id: 3,
    title: "AI Research Collaboration Ideas",
    content: "Anna shared some interesting papers on multimodal models. She's open to advisory role discussions...",
    tags: ["AI", "research", "advisory"],
    contact: "Anna Kim",
    date: "Nov 25, 2024",
    insights: 4,
  },
];

const Notes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "", tags: "" });

  const filteredNotes = sampleNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 h-full">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Notes</h1>
              <p className="text-muted-foreground">
                Your notes become searchable memory powered by AI
              </p>
            </div>
            <Button variant="hero" onClick={() => setIsCreating(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes by content, tags, or contacts..."
              className="pl-12 h-12 bg-secondary/30"
            />
          </div>

          <div className="flex-1 grid lg:grid-cols-3 gap-6 min-h-0">
            {/* Notes list */}
            <div className="lg:col-span-1 space-y-3 overflow-auto">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  className={`glass-card p-4 cursor-pointer transition-all ${
                    selectedNote === note.id ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
                  }`}
                  onClick={() => setSelectedNote(note.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <FileText className="w-4 h-4 text-primary mt-1" />
                    <span className="text-xs text-muted-foreground">{note.date}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-1 line-clamp-1">{note.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{note.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-secondary text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {note.insights > 0 && (
                      <span className="text-xs text-primary flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {note.insights} insights
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Note detail / editor */}
            <div className="lg:col-span-2 glass-card p-6 overflow-auto">
              {isCreating ? (
                <div className="space-y-4">
                  <Input
                    placeholder="Note title..."
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                    className="text-lg font-medium bg-transparent border-none px-0 focus-visible:ring-0"
                  />
                  <Textarea
                    placeholder="Start writing..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    className="min-h-[300px] bg-transparent border-none px-0 resize-none focus-visible:ring-0"
                  />
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Add tags separated by commas..."
                      value={newNote.tags}
                      onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                      className="bg-transparent border-none px-0 focus-visible:ring-0"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                    <Button variant="hero">
                      <Save className="w-4 h-4 mr-2" />
                      Save Note
                    </Button>
                  </div>
                </div>
              ) : selectedNote ? (
                <div>
                  {(() => {
                    const note = sampleNotes.find((n) => n.id === selectedNote);
                    if (!note) return null;
                    return (
                      <>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl font-semibold">{note.title}</h2>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {note.date}
                          </span>
                          <span>·</span>
                          <span>Contact: {note.contact}</span>
                        </div>
                        <p className="text-foreground mb-6 whitespace-pre-wrap">{note.content}</p>
                        <div className="flex gap-2 mb-6">
                          {note.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-lg bg-secondary text-sm">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        {note.insights > 0 && (
                          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Sparkles className="w-4 h-4 text-primary" />
                              <span className="text-sm font-medium">AI Insights</span>
                            </div>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li>• Mentioned interest in AI roadmap → Schedule follow-up</li>
                              <li>• Potential follow-on investment → Add to pipeline</li>
                              <li>• Connected to 3 other portfolio companies</li>
                            </ul>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Select a note to view or create a new one
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Notes;
