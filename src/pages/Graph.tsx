import { useEffect, useRef, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react";

interface GraphNode {
  id: string;
  name: string;
  company: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  connections: string[];
}

const Graph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [zoom, setZoom] = useState(1);

  const nodes: GraphNode[] = [
    { id: "1", name: "You", company: "", x: 400, y: 300, radius: 30, color: "hsl(180, 70%, 50%)", connections: ["2", "3", "4", "5", "6"] },
    { id: "2", name: "Sarah Chen", company: "Acme Corp", x: 250, y: 180, radius: 20, color: "hsl(220, 90%, 60%)", connections: ["1", "3"] },
    { id: "3", name: "Marcus Ali", company: "TechStart", x: 550, y: 200, radius: 22, color: "hsl(270, 80%, 60%)", connections: ["1", "2", "6"] },
    { id: "4", name: "Lisa Park", company: "VC Partners", x: 200, y: 400, radius: 18, color: "hsl(180, 70%, 50%)", connections: ["1", "5"] },
    { id: "5", name: "David Kim", company: "Google", x: 350, y: 480, radius: 24, color: "hsl(220, 90%, 60%)", connections: ["1", "4"] },
    { id: "6", name: "Emily Watson", company: "Sequoia", x: 580, y: 380, radius: 20, color: "hsl(270, 80%, 60%)", connections: ["1", "3"] },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      nodes.forEach((node) => {
        node.connections.forEach((connId) => {
          const connNode = nodes.find((n) => n.id === connId);
          if (connNode && node.id < connId) {
            ctx.beginPath();
            ctx.moveTo(node.x * zoom, node.y * zoom);
            ctx.lineTo(connNode.x * zoom, connNode.y * zoom);
            const gradient = ctx.createLinearGradient(
              node.x * zoom, node.y * zoom,
              connNode.x * zoom, connNode.y * zoom
            );
            gradient.addColorStop(0, "rgba(45, 212, 191, 0.3)");
            gradient.addColorStop(1, "rgba(168, 85, 247, 0.3)");
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x * zoom, node.y * zoom, node.radius * zoom, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          node.x * zoom, node.y * zoom, 0,
          node.x * zoom, node.y * zoom, node.radius * zoom
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, node.color.replace(")", ", 0.5)").replace("hsl", "hsla"));
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Node label
        ctx.fillStyle = "#fff";
        ctx.font = `${12 * zoom}px Inter`;
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x * zoom, node.y * zoom + node.radius * zoom + 20 * zoom);
      });
    };

    draw();
  }, [zoom]);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Relationship Graph</h1>
              <p className="text-muted-foreground">Visualize your entire network</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search contacts..." className="pl-10 w-64 bg-secondary/30" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Graph area */}
        <div className="flex-1 relative bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={600}
            className="w-full h-full"
          />

          {/* Zoom controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            <Button variant="secondary" size="icon" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="secondary" size="icon" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute top-6 left-6 glass-card p-4">
            <h4 className="text-sm font-medium mb-3">Connection Strength</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-teal" />
                <span className="text-muted-foreground">Strong (80%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-blue" />
                <span className="text-muted-foreground">Medium (50-79%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-purple" />
                <span className="text-muted-foreground">Weak (&lt;50%)</span>
              </div>
            </div>
          </div>

          {/* Node stats */}
          <div className="absolute top-6 right-6 glass-card p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-muted-foreground">Total Contacts</p>
              </div>
              <div>
                <p className="text-2xl font-bold">3,842</p>
                <p className="text-xs text-muted-foreground">Connections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Graph;
