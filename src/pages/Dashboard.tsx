import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ReconnectWidget } from "@/components/dashboard/ReconnectWidget";
import { QuickSearch } from "@/components/dashboard/QuickSearch";
import { Users, Network, Calendar, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Good morning, <span className="gradient-text">{firstName}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your network today.
          </p>
        </div>

        {/* Quick Search */}
        <div className="mb-8">
          <QuickSearch />
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Contacts"
            value="1,247"
            change="+12 this week"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Connection Strength"
            value="78%"
            change="+3% this month"
            changeType="positive"
            icon={Network}
          />
          <StatCard
            title="Meetings This Week"
            value="8"
            change="2 upcoming today"
            changeType="neutral"
            icon={Calendar}
          />
          <StatCard
            title="Network Growth"
            value="+24%"
            change="vs last quarter"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ActivityFeed />
          <ReconnectWidget />
        </div>

        {/* Upcoming Meetings */}
        <div className="mt-6 glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Today's Meetings</h3>
          <div className="space-y-3">
            {[
              { time: "10:00 AM", title: "Product Sync", attendees: "Sarah Chen, Marcus Ali" },
              { time: "2:00 PM", title: "Investor Update Call", attendees: "Emily Watson" },
              { time: "4:30 PM", title: "Coffee with James", attendees: "James Rodriguez" },
            ].map((meeting, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors">
                <div className="w-20 text-sm font-medium text-primary">{meeting.time}</div>
                <div className="flex-1">
                  <p className="font-medium">{meeting.title}</p>
                  <p className="text-sm text-muted-foreground">{meeting.attendees}</p>
                </div>
                <button className="text-sm text-primary hover:underline">Prep Brief</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
