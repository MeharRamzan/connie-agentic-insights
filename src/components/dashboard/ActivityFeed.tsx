import { Mail, Calendar, MessageSquare, Phone, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "email",
    icon: Mail,
    title: "Email from Sarah Chen",
    description: "Re: Partnership Discussion",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "meeting",
    icon: Calendar,
    title: "Meeting with Marcus Ali",
    description: "Coffee chat at Blue Bottle",
    time: "Yesterday",
  },
  {
    id: 3,
    type: "message",
    icon: MessageSquare,
    title: "WhatsApp from Lisa Park",
    description: "Thanks for the intro!",
    time: "2 days ago",
  },
  {
    id: 4,
    type: "call",
    icon: Phone,
    title: "Call with David Kim",
    description: "15 min discussion",
    time: "3 days ago",
  },
  {
    id: 5,
    type: "note",
    icon: FileText,
    title: "Note added",
    description: "Follow up with investor group",
    time: "4 days ago",
  },
];

export const ActivityFeed = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <activity.icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{activity.title}</p>
              <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
