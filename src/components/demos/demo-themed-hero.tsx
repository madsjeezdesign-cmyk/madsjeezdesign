"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type DemoThemedHeroProps = {
  variant: number;
  imageSrc: string;
  imageAlt?: string;
  headingClass: string;
  kicker?: React.ReactNode;
  title: React.ReactNode;
  lead: React.ReactNode;
  ctas?: React.ReactNode;
  /** Colores de tipografía según fondo claro u oscuro */
  titleColorClass?: string;
  leadColorClass?: string;
};

function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DemoThemedHero({
  variant,
  imageSrc,
  imageAlt = "",
  headingClass,
  kicker,
  title,
  lead,
  ctas,
  titleColorClass = "text-white",
  leadColorClass = "text-zinc-400",
}: DemoThemedHeroProps) {
  const img = (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      className="object-cover"
      sizes="(max-width: 1024px) 100vw, 55vw"
      priority
    />
  );

  switch (variant % 20) {
    case 0:
      return (
        <header className="relative px-4 pb-16 pt-6 md:px-10 md:pt-10">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-center">
            <FadeIn className="lg:col-span-5">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl`}>
                {title}
              </div>
              <div className={`mt-6 max-w-md text-sm leading-relaxed md:text-base ${leadColorClass}`}>
                {lead}
              </div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </FadeIn>
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-[12px_12px_0_0_rgba(255,255,255,0.06)] lg:col-span-7"
            >
              {img}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            </motion.div>
          </div>
        </header>
      );

    case 1:
      return (
        <header className="relative px-0 pb-16">
          <div className="relative min-h-[56vh] w-full overflow-hidden md:min-h-[62vh]">
            {img}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <FadeIn>
                {kicker}
                <div className={`mt-4 max-w-3xl ${headingClass} ${titleColorClass} text-4xl leading-[1.05] md:text-6xl`}>
                  {title}
                </div>
                <div className={`mt-4 max-w-xl text-sm md:text-base ${leadColorClass}`}>{lead}</div>
                {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
              </FadeIn>
            </div>
          </div>
        </header>
      );

    case 2:
      return (
        <header className="px-4 pb-20 pt-2 md:px-12">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10">
            <div className="relative aspect-[21/9] w-full min-h-[200px]">
              {img}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />
            </div>
            <div className="relative -mt-16 max-w-2xl px-6 pb-10 md:px-10">
              <FadeIn>
                {kicker}
                <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
                <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
                {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
              </FadeIn>
            </div>
          </div>
        </header>
      );

    case 3:
      return (
        <header className="px-4 pb-16 pt-8 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-col-reverse gap-8 lg:flex-row lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex-1 overflow-hidden rounded-[2rem] lg:rounded-l-[3rem] lg:rounded-r-none"
            >
              <div className="relative aspect-[5/4] w-full lg:aspect-auto lg:min-h-[420px]">{img}</div>
            </motion.div>
            <div className="flex flex-1 flex-col justify-center px-2 lg:pl-10">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl md:text-[3.25rem]`}>{title}</div>
              <div className={`mt-5 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
          </div>
        </header>
      );

    case 4:
      return (
        <header className="px-4 pb-20 pt-10 md:px-12">
          <div className="mx-auto max-w-5xl text-center">
            {kicker}
            <motion.div
              initial={{ rotate: -1, opacity: 0 }}
              animate={{ rotate: -1.2, opacity: 1 }}
              className="relative mx-auto mt-8 w-[92%] overflow-hidden rounded-xl shadow-2xl"
            >
              <div className="relative aspect-[16/10] w-full">{img}</div>
            </motion.div>
            <div className={`mx-auto mt-10 max-w-2xl ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>
              {title}
            </div>
            <div className={`mx-auto mt-5 max-w-xl text-sm md:text-base ${leadColorClass}`}>{lead}</div>
            {ctas && <div className="mt-10 flex flex-wrap justify-center gap-3">{ctas}</div>}
          </div>
        </header>
      );

    case 5:
      return (
        <header className="px-4 pb-16 pt-6 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 md:gap-5">
            <div className="flex flex-col justify-end p-6 md:p-8">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-3xl md:text-5xl`}>{title}</div>
              <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
            <div className="grid grid-rows-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative min-h-[200px] overflow-hidden rounded-3xl border border-white/10 md:min-h-[220px]"
              >
                {img}
              </motion.div>
              <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.03] p-6 text-left text-xs text-zinc-500">
                Referencia visual del rubro · demo
              </div>
            </div>
          </div>
        </header>
      );

    case 6:
      return (
        <header className="px-4 pb-16 pt-8 md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
              <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
            <div className="flex flex-1 justify-center">
              <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-white/10 shadow-[0_0_60px_-10px_rgba(255,255,255,0.35)] md:h-96 md:w-96">
                {img}
              </div>
            </div>
          </div>
        </header>
      );

    case 7:
      return (
        <header className="px-4 pb-20 pt-6 md:px-10">
          <div className="mx-auto max-w-6xl md:flex md:items-start md:gap-12">
            <div className="md:w-[55%]">
              {kicker}
              <div className={`${headingClass} ${titleColorClass} text-[clamp(2.5rem,6vw,4.5rem)] leading-[1]`}>
                {title}
              </div>
            </div>
            <div className="relative mt-8 aspect-[3/4] w-full overflow-hidden rounded-2xl md:mt-0 md:w-[45%]">
              {img}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            </div>
            <div className={`mt-6 max-w-prose text-sm md:hidden ${leadColorClass}`}>{lead}</div>
          </div>
          <div className="mx-auto hidden max-w-6xl pt-6 md:block">
            <div className={`max-w-xl text-base ${leadColorClass}`}>{lead}</div>
            {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
          </div>
          {ctas && <div className="mx-auto mt-8 flex flex-wrap gap-3 px-4 md:hidden">{ctas}</div>}
        </header>
      );

    case 8:
      return (
        <header className="overflow-hidden px-4 pb-16 pt-8 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              className="relative aspect-video overflow-hidden rounded-2xl lg:aspect-[5/4]"
            >
              {img}
            </motion.div>
            <div className="flex flex-col justify-center">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
              <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
          </div>
        </header>
      );

    case 9:
      return (
        <header className="px-0 pb-16">
          <div className="mx-auto flex max-w-6xl flex-col md:flex-row">
            <div className="flex flex-1 flex-col justify-center bg-zinc-900/80 px-6 py-12 md:px-10">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-3xl md:text-5xl`}>{title}</div>
              <div className={`mt-4 text-sm ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
            <div className="relative min-h-[280px] flex-1 md:min-h-[420px]">
              {img}
            </div>
          </div>
        </header>
      );

    case 10:
      return (
        <header className="px-4 pb-20 pt-10 md:px-12">
          <div className="mx-auto max-w-4xl">
            {kicker}
            <div className={`mt-4 text-center ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative mx-auto mt-10 w-full max-w-lg bg-white/5 p-3 pb-10 shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">{img}</div>
              <p className="mt-3 text-center text-[10px] uppercase tracking-widest text-zinc-500">
                Demo · imagen del sector
              </p>
            </motion.div>
            <div className={`mx-auto mt-8 max-w-lg text-center text-sm ${leadColorClass}`}>{lead}</div>
            {ctas && <div className="mt-8 flex flex-wrap justify-center gap-3">{ctas}</div>}
          </div>
        </header>
      );

    case 11:
      return (
        <header className="relative px-4 pb-24 pt-6 md:px-10">
          <div className="relative mx-auto max-w-6xl">
            <div className="relative min-h-[380px] overflow-hidden rounded-3xl md:min-h-[440px]">
              {img}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="relative -mt-24 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-black/70 p-8 backdrop-blur-xl md:-mt-32"
            >
              {kicker}
              <div className={`mt-3 ${headingClass} ${titleColorClass} text-3xl md:text-4xl`}>{title}</div>
              <div className={`mt-3 text-sm ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-6 flex flex-wrap gap-3">{ctas}</div>}
            </motion.div>
          </div>
        </header>
      );

    case 12:
      return (
        <header className="px-4 pb-16 pt-8 md:px-10">
          <div className="mx-auto max-w-6xl">
            <div
              className="relative aspect-[11/6] w-full overflow-hidden md:aspect-[2.2/1]"
              style={{ clipPath: "polygon(0 8%, 100% 0, 100% 92%, 0% 100%)" }}
            >
              {img}
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent" />
            </div>
            <div className="relative z-10 -mt-8 px-2 md:px-6">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
              <div className={`mt-4 max-w-2xl text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
          </div>
        </header>
      );

    case 13:
      return (
        <header className="px-4 pb-16">
          <div className="mb-4 flex items-center gap-3 px-2 md:px-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            {kicker}
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>
          <div className="relative w-full overflow-hidden md:rounded-none">
            <div className="relative aspect-[16/11] w-full md:aspect-[21/8]">{img}</div>
          </div>
          <div className="mx-auto max-w-3xl px-4 pt-8 md:px-8">
            <div className={`${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
            <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
            {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
          </div>
        </header>
      );

    case 14:
      return (
        <header className="px-4 pb-20 pt-12 md:px-10">
          <div className="mx-auto max-w-5xl">
            <div className="relative z-10">
              {kicker}
              <div className={`${headingClass} ${titleColorClass} text-4xl md:text-6xl`}>{title}</div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative -mt-6 w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl md:-mt-10"
            >
              <div className="relative aspect-[16/9] w-full">{img}</div>
            </motion.div>
            <div className={`mt-8 max-w-xl text-sm md:text-base ${leadColorClass}`}>{lead}</div>
            {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
          </div>
        </header>
      );

    case 15:
      return (
        <header className="px-4 pb-12 pt-6 md:px-10">
          <div className="mx-auto max-w-6xl border-b border-white/10 pb-4">
            {kicker}
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 pt-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <div className={`${headingClass} ${titleColorClass} text-3xl md:text-4xl`}>{title}</div>
            </div>
            <div className="relative min-h-[240px] overflow-hidden rounded-xl lg:col-span-2">
              {img}
            </div>
          </div>
          <div className={`mx-auto max-w-6xl pt-6 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
          {ctas && <div className="mx-auto mt-8 flex max-w-6xl flex-wrap gap-3">{ctas}</div>}
        </header>
      );

    case 16:
      return (
        <header className="px-4 pb-16 pt-8 md:px-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row-reverse lg:items-center">
            <div className="lg:w-1/2">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-4xl md:text-5xl`}>{title}</div>
              <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
            <div className="relative lg:w-1/2">
              <div className="absolute -left-4 -top-4 z-10 hidden h-24 w-24 rounded-xl border border-white/10 bg-white/5 backdrop-blur md:block" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">{img}</div>
            </div>
          </div>
        </header>
      );

    case 17:
      return (
        <header className="px-4 pb-20 md:px-10">
          <div className="mx-auto flex max-w-6xl flex-col md:flex-row">
            <div className="relative min-h-[320px] md:w-[42%]">
              {img}
              <div className="absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-[#05070a] to-transparent md:block" />
            </div>
            <div className="flex flex-1 flex-col justify-center border-t border-white/10 bg-black/50 px-6 py-10 md:border-l md:border-t-0 md:px-10">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-3xl md:text-4xl`}>{title}</div>
              <div className={`mt-4 text-sm ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-wrap gap-3">{ctas}</div>}
            </div>
          </div>
        </header>
      );

    case 18:
      return (
        <header className="px-4 pb-16 pt-8 md:px-8">
          <div className="mx-auto max-w-4xl text-center md:max-w-none">
            {kicker}
            <div className={`mx-auto mt-4 max-w-xl ${headingClass} ${titleColorClass} text-4xl md:max-w-3xl md:text-6xl`}>
              {title}
            </div>
          </div>
          <div className="relative mx-auto mt-10 max-w-6xl">
            <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 overflow-hidden md:w-[calc(100%+4rem)] md:rounded-xl">
              <div className="relative aspect-[21/9] min-h-[200px]">{img}</div>
            </div>
          </div>
          <div className={`mx-auto mt-8 max-w-2xl text-center text-sm md:text-base ${leadColorClass}`}>{lead}</div>
          {ctas && <div className="mt-8 flex flex-wrap justify-center gap-3">{ctas}</div>}
        </header>
      );

    case 19:
    default:
      return (
        <header className="px-4 pb-16 pt-8 md:px-10">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[2rem] lg:aspect-auto lg:min-h-[400px]">
                {img}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
              </div>
            </div>
            <div className="flex flex-col justify-center lg:col-span-5">
              {kicker}
              <div className={`mt-4 ${headingClass} ${titleColorClass} text-3xl md:text-4xl`}>{title}</div>
              <div className={`mt-4 text-sm md:text-base ${leadColorClass}`}>{lead}</div>
              {ctas && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{ctas}</div>}
            </div>
          </div>
        </header>
      );
  }
}
