import { Twitter, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold gradient-text">Connie</span>
            <span className="text-sm text-muted-foreground">
              Agentic Relationship Intelligence
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Connie. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
