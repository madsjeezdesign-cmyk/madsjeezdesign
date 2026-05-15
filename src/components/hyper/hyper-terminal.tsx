"use client";

import { useCallback, useEffect, useState } from "react";

type Line = { t: string; c: string };

export function HyperTerminal() {
  const [history, setHistory] = useState<Line[]>([
    { t: "system", c: "Nexus Engine v4.0.2 online" },
    { t: "info", c: "Detecting network latency: 12ms" },
    { t: "status", c: "Security Protocols: VERIFIED" },
  ]);

  const addLine = useCallback((type: string, content: string) => {
    setHistory((prev) => [...prev.slice(-6), { t: type, c: content }]);
  }, []);

  useEffect(() => {
    const scripts = [
      "Injecting hyper-structures...",
      "Optimizing react-fiber-layers...",
      "Deploying to global edge nodes...",
      "Awaiting user handshake...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < scripts.length) {
        addLine("process", scripts[i]);
        i++;
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [addLine]);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#1de0b1]/30 bg-[#0a0c12]/90 p-6 font-[family-name:var(--font-jetbrains)] text-xs shadow-2xl backdrop-blur-xl">
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-[#1de0b1] to-transparent opacity-50" />
      <div className="mb-4 flex gap-2 border-b border-white/5 pb-2">
        <div className="h-3 w-3 rounded-full border border-red-500/40 bg-red-500/20" />
        <div className="h-3 w-3 rounded-full border border-yellow-500/40 bg-yellow-500/20" />
        <div className="h-3 w-3 rounded-full border border-[#1de0b1]/40 bg-[#1de0b1]/20" />
        <span className="ml-auto text-[9px] font-bold uppercase tracking-widest text-zinc-600">
          Session: Admin
        </span>
      </div>
      <div className="space-y-2 text-left">
        {history.map((h, i) => (
          <div key={`${h.t}-${i}-${h.c.slice(0, 8)}`} className="flex gap-3">
            <span
              className={`w-12 text-[9px] font-bold uppercase ${
                h.t === "system"
                  ? "text-blue-400"
                  : h.t === "process"
                    ? "text-zinc-500"
                    : "text-[#1de0b1]"
              }`}
            >
              [{h.t}]
            </span>
            <span className="text-zinc-300">{h.c}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-[#1de0b1]">
          <span>$</span>
          <span className="h-4 w-2 animate-pulse bg-[#1de0b1]" />
        </div>
      </div>
    </div>
  );
}
