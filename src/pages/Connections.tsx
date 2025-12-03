import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, MessageSquare, Linkedin, FileText, Database, Check, Clock, AlertCircle } from "lucide-react";

const integrations = [
  {
    id: "gmail",
    name: "Gmail",
    icon: Mail,
    description: "Sync emails and contacts from your Google account",
    status: "connected",
    lastSync: "5 minutes ago",
    contacts: 847,
  },
  {
    id: "outlook",
    name: "Outlook",
    icon: Mail,
    description: "Connect your Microsoft email and calendar",
    status: "disconnected",
    lastSync: null,
    contacts: 0,
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    icon: Calendar,
    description: "Import meetings and event attendees",
    status: "connected",
    lastSync: "1 hour ago",
    contacts: 156,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    description: "Sync your professional network connections",
    status: "pending",
    lastSync: null,
    contacts: 0,
  },
  {
    id: "slack",
    name: "Slack",
    icon: MessageSquare,
    description: "Import workspace contacts and DM history",
    status: "disconnected",
    lastSync: null,
    contacts: 0,
  },
  {
    id: "notion",
    name: "Notion",
    icon: FileText,
    description: "Extract contacts mentioned in your notes",
    status: "disconnected",
    lastSync: null,
    contacts: 0,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    icon: Database,
    description: "Two-way sync with your CRM contacts",
    status: "disconnected",
    lastSync: null,
    contacts: 0,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    icon: Database,
    description: "Enterprise CRM integration",
    status: "disconnected",
    lastSync: null,
    contacts: 0,
  },
];

const statusConfig = {
  connected: { label: "Connected", color: "text-green-400", bgColor: "bg-green-400/10", icon: Check },
  disconnected: { label: "Not Connected", color: "text-muted-foreground", bgColor: "bg-muted", icon: null },
  pending: { label: "Pending", color: "text-yellow-400", bgColor: "bg-yellow-400/10", icon: Clock },
  error: { label: "Error", color: "text-red-400", bgColor: "bg-red-400/10", icon: AlertCircle },
};

const Connections = () => {
  const [integrationStates, setIntegrationStates] = useState(integrations);

  const handleConnect = (id: string) => {
    setIntegrationStates((prev) =>
      prev.map((int) =>
        int.id === id ? { ...int, status: "pending" as const } : int
      )
    );
    // Simulate connection
    setTimeout(() => {
      setIntegrationStates((prev) =>
        prev.map((int) =>
          int.id === id ? { ...int, status: "connected" as const, lastSync: "Just now" } : int
        )
      );
    }, 2000);
  };

  const connectedCount = integrationStates.filter((i) => i.status === "connected").length;
  const totalContacts = integrationStates.reduce((acc, i) => acc + i.contacts, 0);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your tools to build your unified relationship graph
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold gradient-text">{connectedCount}</p>
            <p className="text-sm text-muted-foreground">Connected Sources</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold">{totalContacts}</p>
            <p className="text-sm text-muted-foreground">Contacts Synced</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-3xl font-bold">{integrations.length}</p>
            <p className="text-sm text-muted-foreground">Available Integrations</p>
          </div>
        </div>

        {/* Integration grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {integrationStates.map((integration) => {
            const status = statusConfig[integration.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div
                key={integration.id}
                className="glass-card p-5 hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <integration.icon className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{integration.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${status.bgColor} ${status.color}`}>
                        {StatusIcon && <StatusIcon className="w-3 h-3" />}
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                    {integration.status === "connected" && (
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{integration.contacts} contacts</span>
                        <span>Last sync: {integration.lastSync}</span>
                      </div>
                    )}
                  </div>
                  {integration.status === "connected" ? (
                    <Button variant="outline" size="sm">
                      Settings
                    </Button>
                  ) : integration.status === "pending" ? (
                    <Button variant="outline" size="sm" disabled>
                      Connecting...
                    </Button>
                  ) : (
                    <Button variant="hero" size="sm" onClick={() => handleConnect(integration.id)}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming soon */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            More integrations coming soon: WhatsApp, Zoom, Greenhouse, Airtable, and more.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Connections;
