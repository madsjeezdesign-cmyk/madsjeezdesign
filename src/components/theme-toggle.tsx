"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import type { ThemeMode } from "@/lib/theme-script";

const modes: { id: ThemeMode; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "Claro", icon: Sun },
  { id: "dark", label: "Oscuro", icon: Moon },
  { id: "system", label: "Sistema", icon: Monitor },
];

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { mode, setMode } = useTheme();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border bg-card/90 p-0.5 shadow-sm backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Tema de la página"
    >
      {modes.map(({ id, label, icon: Icon }) => {
        const active = mode === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setMode(id)}
            title={label}
            aria-label={label}
            aria-pressed={active}
            className={`rounded-full p-2 transition-colors ${
              active
                ? "bg-accent text-white shadow-sm"
                : "text-muted hover:bg-surface hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
          </button>
        );
      })}
    </div>
  );
}
