import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { User, Bell, Shield, Palette, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    jobTitle: "",
    company: "",
  });
  const [notifications, setNotifications] = useState({
    reconnectReminders: true,
    meetingPrep: true,
    weeklyDigest: true,
    newConnections: false,
  });

  const handleSave = () => {
    toast({ title: "Settings saved successfully" });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar tabs */}
            <div className="lg:w-48 flex lg:flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 glass-card p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center text-2xl font-medium">
                        {profileData.fullName?.[0] || user?.email?.[0]?.toUpperCase()}
                      </div>
                      <Button variant="outline">Change Avatar</Button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        disabled
                        className="bg-secondary/30 opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={profileData.jobTitle}
                        onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                        placeholder="e.g. Product Manager"
                        className="bg-secondary/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profileData.company}
                        onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                        placeholder="e.g. Acme Corp"
                        className="bg-secondary/30"
                      />
                    </div>
                  </div>

                  <Button variant="hero" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium">Reconnection Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when it's time to reach out to fading connections
                        </p>
                      </div>
                      <Switch
                        checked={notifications.reconnectReminders}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, reconnectReminders: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium">Meeting Prep Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Receive prep briefs before your scheduled meetings
                        </p>
                      </div>
                      <Switch
                        checked={notifications.meetingPrep}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, meetingPrep: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium">Weekly Network Digest</p>
                        <p className="text-sm text-muted-foreground">
                          Summary of your network activity and insights
                        </p>
                      </div>
                      <Switch
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, weeklyDigest: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                      <div>
                        <p className="font-medium">New Connection Alerts</p>
                        <p className="text-sm text-muted-foreground">
                          Get notified when new contacts are synced
                        </p>
                      </div>
                      <Switch
                        checked={notifications.newConnections}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, newConnections: checked })
                        }
                      />
                    </div>
                  </div>

                  <Button variant="hero" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="font-medium mb-2">Data Encryption</p>
                    <p className="text-sm text-muted-foreground">
                      All your data is encrypted at rest and in transit using industry-standard AES-256 encryption.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="font-medium mb-2">Export Your Data</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Download a copy of all your data including contacts, notes, and interactions.
                    </p>
                    <Button variant="outline">Request Data Export</Button>
                  </div>
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="font-medium mb-2 text-destructive">Delete Account</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                      Delete Account
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold mb-4">Appearance</h3>
                  <div className="p-4 rounded-lg bg-secondary/30">
                    <p className="font-medium mb-4">Theme</p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary">
                        Dark
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:border-border">
                        Light
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-border/50 text-muted-foreground hover:border-border">
                        System
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
