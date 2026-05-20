"use client";

import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

/** Letras 7×4 para grilla de ladrillos */
const LETTER_PIXELS: Record<string, number[][]> = {
  B: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  R: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  I: [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 1, 1, 0],
  ],
  O: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  N: [
    [1, 0, 0, 1],
    [1, 1, 0, 1],
    [1, 0, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  E: [
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 0],
  ],
  S: [
    [0, 1, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ],
  /* POZO — matriz original del diseño de referencia */
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  Z: [
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
};

const ROWS = 7;
const LETTER_W = 4;
const GAP = 1;

function buildWordMatrix(word: string): number[][] {
  const letters = word.toUpperCase().split("");
  const cols =
    letters.length * LETTER_W + Math.max(0, letters.length - 1) * GAP;
  const matrix = Array.from({ length: ROWS }, () => Array(cols).fill(0));

  let col = 0;
  for (let li = 0; li < letters.length; li++) {
    const glyph = LETTER_PIXELS[letters[li]];
    if (!glyph) continue;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < LETTER_W; c++) {
        matrix[r][col + c] = glyph[r][c] ?? 0;
      }
    }
    col += LETTER_W + (li < letters.length - 1 ? GAP : 0);
  }
  return matrix;
}

/** Orden de animación: fila inferior → superior, izquierda → derecha */
function buildAnimationOrder(matrix: number[][]): { row: number; col: number }[] {
  const order: { row: number; col: number }[] = [];
  for (let row = matrix.length - 1; row >= 0; row--) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === 1) order.push({ row, col });
    }
  }
  return order;
}

type Props = {
  word: string;
  brickDelayMs?: number;
  autoStartDelayMs?: number;
  showRebuild?: boolean;
  className?: string;
};

export function BrickWallTitle({
  word,
  brickDelayMs = 40,
  autoStartDelayMs = 800,
  showRebuild = true,
  className = "",
}: Props) {
  const matrix = useMemo(() => buildWordMatrix(word), [word]);
  const cols = matrix[0]?.length ?? 0;
  const animOrder = useMemo(() => buildAnimationOrder(matrix), [matrix]);
  const [placed, setPlaced] = useState<Set<string>>(() => new Set());
  const [reducedMotion, setReducedMotion] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const labelId = useId();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const runConstruction = useCallback(() => {
    clearTimers();
    setPlaced(new Set());

    if (reducedMotion) {
      const all = new Set(animOrder.map(({ row, col }) => `${row}-${col}`));
      setPlaced(all);
      return;
    }

    animOrder.forEach(({ row, col }, index) => {
      const t = setTimeout(() => {
        setPlaced((prev) => {
          const next = new Set(prev);
          next.add(`${row}-${col}`);
          return next;
        });
      }, index * brickDelayMs);
      timers.current.push(t);
    });
  }, [animOrder, brickDelayMs, clearTimers, reducedMotion]);

  useEffect(() => {
    const t = setTimeout(runConstruction, autoStartDelayMs);
    return () => {
      clearTimeout(t);
      clearTimers();
    };
  }, [autoStartDelayMs, clearTimers, runConstruction]);

  return (
    <div className={`bb-brick-title-wrap ${className}`}>
      <p id={labelId} className="sr-only">
        {word}
      </p>
      <div
        className="bb-brick-wall"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(14px, 28px))` }}
        role="img"
        aria-labelledby={labelId}
      >
        {matrix.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const key = `${rowIndex}-${colIndex}`;
            const isLetter = cell === 1;
            const isPlaced = placed.has(key);
            return (
              <div
                key={key}
                className={`bb-brick${isLetter ? " bb-brick--letter" : ""}${isLetter && isPlaced ? " bb-brick--placed" : ""}`}
                aria-hidden={!isLetter}
              />
            );
          }),
        )}
      </div>
      {showRebuild && (
        <button
          type="button"
          onClick={runConstruction}
          className="bb-brick-rebuild mx-auto mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-500/80 transition hover:text-amber-400"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reconstruir
        </button>
      )}
    </div>
  );
}
