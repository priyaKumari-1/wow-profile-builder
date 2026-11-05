import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { projects, type Project } from "@/data/portfolio";
import { SectionHeading } from "./primitives";

/** Cards pin one after another and the earlier ones shrink back into a stack. */
export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="projects" className="relative px-6 pt-28 md:px-12 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          eyebrow="Selected work"
          title={
            <>
              Things I've <em className="font-serif font-normal italic text-gradient">built</em>
            </>
          }
        />
      </div>
      <div ref={ref} className="relative mx-auto max-w-6xl">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.title}
            project={p}
            index={i}
            total={projects.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const dim = useTransform(progress, [index / total, 1], [0, (total - 1 - index) * 0.18]);

  return (
    <div className="sticky top-0 flex h-[100svh] items-center justify-center">
      <motion.article
        style={{ scale, top: `calc(${index * 26}px - 2vh)` }}
        className="group relative grid w-full origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-[oklch(0.15_0.035_285)] shadow-[0_-20px_80px_-20px_oklch(0_0_0/0.6)] md:min-h-[520px] md:grid-cols-[1.05fr_1fr]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: `oklch(0.65 0.22 ${p.hue})` }}
        />
        <div className="relative flex flex-col p-7 md:p-12">
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
              {p.tag}
            </span>
          </div>
          <h3 className="mt-8 font-display text-4xl font-bold tracking-[-0.03em] md:mt-auto md:text-6xl">
            {p.title}
          </h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  background: `oklch(0.65 0.2 ${p.hue} / 0.15)`,
                  color: `oklch(0.85 0.12 ${p.hue})`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
          <ul className="mt-7 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
            {p.points.map((pt) => (
              <li key={pt} className="flex gap-3">
                <span
                  className="mt-2.5 h-1 w-3 shrink-0 rounded-full"
                  style={{ background: `oklch(0.72 0.2 ${p.hue})` }}
                />
                {pt}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden p-3 md:block">
          <ProjectVisual project={p} />
        </div>
        <motion.div
          aria-hidden
          style={{ opacity: dim }}
          className="pointer-events-none absolute inset-0 bg-black"
        />
      </motion.article>
    </div>
  );
}

function ProjectVisual({ project: p }: { project: Project }) {
  return (
    <div
      className="relative h-full overflow-hidden rounded-[1.5rem]"
      style={{
        background: `radial-gradient(120% 120% at 100% 0%, oklch(0.6 0.2 ${p.hue}) 0%, oklch(0.3 0.12 ${p.hue + 25}) 45%, oklch(0.14 0.04 285) 100%)`,
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-x-8 bottom-0 top-10 rounded-t-2xl border border-white/15 bg-black/35 shadow-2xl backdrop-blur-md transition-transform duration-700 ease-out group-hover:-translate-y-3">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-white/5" />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-semibold">{p.mock.heading}</p>
            <span
              className="h-7 w-20 rounded-full"
              style={{ background: `oklch(0.7 0.2 ${p.hue} / 0.35)` }}
            />
          </div>
          <ul className="mt-5 space-y-2.5">
            {p.mock.rows.map(([label, status], i) => (
              <li
                key={label}
                className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm transition-transform duration-500 group-hover:translate-x-1"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="h-7 w-7 rounded-lg"
                    style={{ background: `oklch(0.7 0.18 ${p.hue + i * 18} / 0.5)` }}
                  />
                  {label}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs"
                  style={{
                    background: `oklch(0.75 0.15 ${p.hue} / 0.18)`,
                    color: `oklch(0.88 0.1 ${p.hue})`,
                  }}
                >
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
