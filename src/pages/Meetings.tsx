import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, FileText, ChevronRight, Plus } from "lucide-react";

const meetings = [
  {
    id: 1,
    title: "Product Strategy Sync",
    date: "Today",
    time: "10:00 AM",
    duration: "30 min",
    location: "Zoom",
    attendees: ["Sarah Chen", "Marcus Ali"],
    hasPrep: true,
    status: "upcoming",
  },
  {
    id: 2,
    title: "Investor Update Call",
    date: "Today",
    time: "2:00 PM",
    duration: "1 hour",
    location: "Google Meet",
    attendees: ["Emily Watson", "Michael Chen"],
    hasPrep: true,
    status: "upcoming",
  },
  {
    id: 3,
    title: "Coffee with James",
    date: "Today",
    time: "4:30 PM",
    duration: "45 min",
    location: "Blue Bottle Coffee, SF",
    attendees: ["James Rodriguez"],
    hasPrep: false,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Team Standup",
    date: "Tomorrow",
    time: "9:00 AM",
    duration: "15 min",
    location: "Slack Huddle",
    attendees: ["Team"],
    hasPrep: false,
    status: "upcoming",
  },
];

const prepBrief = {
  attendee: "Emily Watson",
  company: "Sequoia Capital",
  role: "Partner",
  lastMeeting: "3 months ago",
  sharedConnections: 12,
  recentActivity: [
    "Led Series B for TechCorp ($50M)",
    "Spoke at TechCrunch Disrupt",
    "Published article on AI investing trends",
  ],
  talkingPoints: [
    "Q3 growth metrics and runway",
    "Product roadmap for 2025",
    "Potential follow-on investment discussion",
  ],
  previousNotes: "Emily expressed interest in our AI features. Mentioned potential intro to their portfolio company for partnerships.",
};

const Meetings = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<number | null>(null);
  const [showPrep, setShowPrep] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold mb-2">Meetings</h1>
              <p className="text-muted-foreground">
                Meeting prep intelligence powered by your relationship graph
              </p>
            </div>
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Add Meeting
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Meeting list */}
            <div className="lg:col-span-2 space-y-4">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className={`glass-card p-5 cursor-pointer transition-all ${
                    selectedMeeting === meeting.id ? "border-primary/50" : "hover:border-primary/30"
                  }`}
                  onClick={() => setSelectedMeeting(meeting.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-primary">{meeting.date}</span>
                        <span className="text-sm text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">{meeting.time}</span>
                      </div>
                      <h3 className="font-semibold mb-2">{meeting.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {meeting.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {meeting.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {meeting.attendees.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {meeting.hasPrep && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowPrep(true);
                          }}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Prep Brief
                        </Button>
                      )}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar widget */}
            <div className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">December 2024</h3>
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div key={day} className="py-2 text-muted-foreground text-xs">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`py-2 rounded-lg cursor-pointer transition-colors ${
                      i + 1 === 3
                        ? "bg-primary text-primary-foreground"
                        : [5, 12, 18, 24].includes(i + 1)
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-secondary"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">4</span> meetings this week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prep brief modal */}
        {showPrep && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowPrep(false)} />
            <div className="relative glass-card p-6 max-w-2xl w-full max-h-[80vh] overflow-auto">
              <h3 className="text-xl font-semibold mb-6">Meeting Prep Brief</h3>
              
              {/* Attendee info */}
              <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-secondary/30">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-lg font-medium">
                  EW
                </div>
                <div>
                  <h4 className="font-semibold">{prepBrief.attendee}</h4>
                  <p className="text-sm text-muted-foreground">
                    {prepBrief.role} at {prepBrief.company}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last meeting: {prepBrief.lastMeeting} · {prepBrief.sharedConnections} shared connections
                  </p>
                </div>
              </div>

              {/* Recent activity */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Recent Activity</h4>
                <ul className="space-y-2">
                  {prepBrief.recentActivity.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Talking points */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Suggested Talking Points</h4>
                <ul className="space-y-2">
                  {prepBrief.talkingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary font-medium">{i + 1}.</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Previous notes */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Previous Notes</h4>
                <p className="text-sm text-muted-foreground p-3 rounded-lg bg-secondary/30">
                  {prepBrief.previousNotes}
                </p>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setShowPrep(false)}>
                  Close
                </Button>
                <Button variant="hero">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Brief
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Meetings;
