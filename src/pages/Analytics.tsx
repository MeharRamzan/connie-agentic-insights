import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Users, Network, TrendingUp, Clock, Mail, Calendar, MessageSquare, Phone } from "lucide-react";

const interactionData = [
  { month: "Jul", emails: 45, meetings: 12, calls: 8, messages: 23 },
  { month: "Aug", emails: 52, meetings: 15, calls: 10, messages: 28 },
  { month: "Sep", emails: 48, meetings: 18, calls: 12, messages: 31 },
  { month: "Oct", emails: 61, meetings: 22, calls: 14, messages: 35 },
  { month: "Nov", emails: 58, meetings: 20, calls: 11, messages: 40 },
  { month: "Dec", emails: 42, meetings: 16, calls: 9, messages: 29 },
];

const topConnections = [
  { name: "Sarah Chen", company: "Acme Corp", interactions: 47, trend: "+12%" },
  { name: "Marcus Ali", company: "TechStart", interactions: 38, trend: "+8%" },
  { name: "Emily Watson", company: "Sequoia", interactions: 34, trend: "+15%" },
  { name: "James Rodriguez", company: "Stripe", interactions: 29, trend: "-3%" },
  { name: "Lisa Park", company: "VC Partners", interactions: 26, trend: "+5%" },
];

const industryBreakdown = [
  { industry: "Technology", percentage: 42, color: "bg-neon-teal" },
  { industry: "Finance", percentage: 24, color: "bg-neon-blue" },
  { industry: "Healthcare", percentage: 15, color: "bg-neon-purple" },
  { industry: "Real Estate", percentage: 10, color: "bg-primary" },
  { industry: "Other", percentage: 9, color: "bg-muted" },
];

const Analytics = () => {
  const maxInteractions = Math.max(...interactionData.flatMap((d) => [d.emails, d.meetings, d.calls, d.messages]));

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Analytics</h1>
            <p className="text-muted-foreground">
              Insights into your network activity and relationship health
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Contacts"
              value="1,247"
              change="+156 this quarter"
              changeType="positive"
              icon={Users}
            />
            <StatCard
              title="Avg. Connection Strength"
              value="72%"
              change="+5% vs last month"
              changeType="positive"
              icon={Network}
            />
            <StatCard
              title="Interactions This Month"
              value="234"
              change="+18% growth"
              changeType="positive"
              icon={TrendingUp}
            />
            <StatCard
              title="Avg. Response Time"
              value="4.2h"
              change="-1.3h improvement"
              changeType="positive"
              icon={Clock}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Interaction chart */}
            <div className="lg:col-span-2 glass-card p-6">
              <h3 className="text-lg font-semibold mb-6">Interaction Trends</h3>
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-neon-teal" />
                  <span className="text-sm">Emails</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-blue" />
                  <span className="text-sm">Meetings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-neon-purple" />
                  <span className="text-sm">Calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  <span className="text-sm">Messages</span>
                </div>
              </div>
              
              {/* Simple bar chart */}
              <div className="flex items-end justify-between gap-2 h-48">
                {interactionData.map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5 items-end h-40">
                      <div
                        className="flex-1 bg-neon-teal/60 rounded-t"
                        style={{ height: `${(data.emails / maxInteractions) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-neon-blue/60 rounded-t"
                        style={{ height: `${(data.meetings / maxInteractions) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-neon-purple/60 rounded-t"
                        style={{ height: `${(data.calls / maxInteractions) * 100}%` }}
                      />
                      <div
                        className="flex-1 bg-primary/60 rounded-t"
                        style={{ height: `${(data.messages / maxInteractions) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{data.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry breakdown */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-6">Network by Industry</h3>
              <div className="space-y-4">
                {industryBreakdown.map((item) => (
                  <div key={item.industry}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.industry}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top connections */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Top Connections This Month</h3>
            <div className="space-y-4">
              {topConnections.map((connection, index) => (
                <div
                  key={connection.name}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
                >
                  <span className="text-lg font-bold text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-sm font-medium">
                    {connection.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{connection.name}</p>
                    <p className="text-sm text-muted-foreground">{connection.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{connection.interactions}</p>
                    <p className="text-sm text-muted-foreground">interactions</p>
                  </div>
                  <span
                    className={`text-sm ${
                      connection.trend.startsWith("+") ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {connection.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
