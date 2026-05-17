"use client";

import { ArrowRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import type { RetailFashionConfig } from "@/lib/retail-fashion-demos";
import { FashionPhoto } from "./fashion-photo";

type Props = { config: RetailFashionConfig };

export function FashionInstagramGallery({ config }: Props) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section id="instagram" className="bg-[#fafafa] py-32">
      <div className="mx-auto max-w-[90%]">
        <div className="rf-reveal mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
              @{config.instagramHandle}
            </p>
            <h2 className="font-serif text-4xl leading-tight tracking-tighter text-black md:text-5xl">
              Suivre sur <br />
              <span className="italic">Instagram</span>
            </h2>
            <p className="mt-4 text-sm font-light leading-relaxed text-gray-600">
              Looks, reels y novedades de temporada — seguinos en{" "}
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-black underline"
              >
                @{config.instagramHandle}
              </a>
              .
            </p>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-black"
            >
              Ver perfil completo <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {(config.instagramMedia ?? []).map((item, index) => (
            <a
              key={item.id}
              href={item.postUrl}
              target="_blank"
              rel="noreferrer"
              className="rf-reveal group relative block aspect-[4/5] overflow-hidden bg-stone-200"
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={(e) => {
                if (item.kind === "video" && item.videoSrc) {
                  e.preventDefault();
                  setActiveVideo(item.videoSrc);
                }
              }}
            >
              <FashionPhoto
                src={item.image}
                fallbackSrc={item.fallbackImage}
                alt={item.alt}
                fill
                className="transition-all duration-700 group-hover:scale-105"
                sizes="(max-width:768px) 50vw, 25vw"
              />
              {item.kind === "video" ? (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/10 backdrop-blur-sm">
                    <Play className="ml-1 h-6 w-6 text-white" fill="white" aria-hidden />
                  </span>
                </span>
              ) : (
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
              )}
            </a>
          ))}
        </div>
      </div>

      {activeVideo ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-modal
          aria-label="Video"
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-xs font-bold uppercase tracking-widest text-white"
            onClick={() => {
              setActiveVideo(null);
              videoRef.current?.pause();
            }}
          >
            Cerrar
          </button>
          <video
            ref={videoRef}
            src={activeVideo}
            className="max-h-[85vh] max-w-full"
            controls
            autoPlay
            playsInline
          />
        </div>
      ) : null}
    </section>
  );
}
