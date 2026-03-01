import { Shield, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Veritas AI
          </span>
        </div>
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-secondary text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          aria-label="Toggle dark mode"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
