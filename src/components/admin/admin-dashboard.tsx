"use client";

import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export type LeadRow = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  service: string;
  message: string;
  read_at: string | null;
  archived: boolean;
  admin_notes: string | null;
  created_at: string;
};

type Filter = "inbox" | "new" | "archived" | "all";

export function AdminDashboard() {
  const [filter, setFilter] = useState<Filter>("inbox");
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/leads?filter=${filter}`, {
        credentials: "same-origin",
      });
      const data = (await res.json()) as { leads?: LeadRow[]; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Error al cargar.");
        setLeads([]);
        return;
      }
      setLeads(data.leads ?? []);
    } catch {
      setError("Error de conexión.");
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Consultas recibidas
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Mensajes del formulario de contacto guardados en Supabase.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["inbox", "Bandeja"],
              ["new", "Sin leer"],
              ["archived", "Archivo"],
              ["all", "Todos"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === id
                  ? "bg-[#1de0b1] text-black"
                  : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#1de0b1]" aria-hidden />
        </div>
      ) : leads.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.02] py-16 text-center text-sm text-zinc-500">
          No hay leads en esta vista.
        </p>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onUpdated={() => void load()} />
          ))}
        </ul>
      )}
    </div>
  );
}

function LeadCard({
  lead,
  onUpdated,
}: {
  lead: LeadRow;
  onUpdated: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState(lead.admin_notes ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotes(lead.admin_notes ?? "");
  }, [lead.id, lead.admin_notes]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("es-AR", {
      dateStyle: "short",
      timeStyle: "short",
    });

  async function patch(body: Record<string, unknown>) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const d = (await res.json()) as { error?: string };
        alert(d.error ?? "No se pudo guardar.");
        return;
      }
      onUpdated();
    } finally {
      setSaving(false);
    }
  }

  const isNew = !lead.read_at && !lead.archived;

  return (
    <li className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col gap-2 px-4 py-4 text-left transition-colors hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {isNew && (
              <span className="rounded-full bg-[#1de0b1]/20 px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-wide text-[#1de0b1]">
                Nuevo
              </span>
            )}
            {lead.archived && (
              <span className="rounded-full border border-zinc-600 px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                Archivado
              </span>
            )}
            <span className="font-semibold text-white">{lead.name}</span>
            <span className="text-zinc-500">·</span>
            <span className="truncate text-sm text-[#1de0b1]">{lead.email}</span>
          </div>
          <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-xs text-zinc-500">
            {lead.service} · {fmt(lead.created_at)}
          </p>
        </div>
        <span className="shrink-0 text-xs text-zinc-500">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-white/10 px-4 py-4">
          {lead.company && (
            <p className="text-sm text-zinc-400">
              <span className="text-zinc-600">Empresa · </span>
              {lead.company}
            </p>
          )}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              Mensaje
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-zinc-300">
              {lead.message}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
              Notas internas
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              disabled={saving}
              className="mt-1 w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-[#1de0b1]/40"
              placeholder="Seguimiento comercial, recordatorios…"
            />
            <button
              type="button"
              disabled={saving}
              onClick={() => patch({ notes: notes.trim() || null })}
              className="mt-2 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-zinc-300 hover:bg-white/10 disabled:opacity-50"
            >
              Guardar notas
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {!lead.read_at ? (
              <button
                type="button"
                disabled={saving}
                onClick={() => patch({ read: true })}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/20 disabled:opacity-50"
              >
                Marcar leído
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={() => patch({ read: false })}
                className="rounded-lg border border-white/15 px-3 py-2 text-xs font-bold text-zinc-400 hover:text-white disabled:opacity-50"
              >
                Marcar no leído
              </button>
            )}
            {!lead.archived ? (
              <button
                type="button"
                disabled={saving}
                onClick={() => patch({ archived: true })}
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs font-bold text-amber-400 disabled:opacity-50"
              >
                Archivar
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={() => patch({ archived: false })}
                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-400 disabled:opacity-50"
              >
                Restaurar a bandeja
              </button>
            )}
            <a
              href={`mailto:${lead.email}?subject=${encodeURIComponent(`Re: ${lead.service}`)}`}
              className="rounded-lg border border-[#1de0b1]/40 px-3 py-2 text-xs font-bold text-[#1de0b1]"
            >
              Responder por mail
            </a>
          </div>
        </div>
      )}
    </li>
  );
}
