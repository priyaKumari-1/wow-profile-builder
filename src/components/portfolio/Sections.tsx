import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Sparkle } from "lucide-react";
import { useRef } from "react";
import { education, experience, marquee, skills, stats } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Counter, EASE, Reveal, SectionHeading, SpotlightCard } from "./primitives";

/* ------------------------------------------------------------------ Marquee */

function Band({ reverse, className }: { reverse?: boolean; className?: string }) {
  const row = [...marquee, ...marquee];
  return (
    <div className={cn("relative -mx-[5%] w-[110%] overflow-hidden py-5", className)}>
      <div className={cn("marquee flex w-max", reverse && "marquee-reverse")}>
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap px-4 font-display text-2xl font-semibold tracking-tight md:text-4xl"
          >
            {t}
            <Sparkle className="h-5 w-5 shrink-0 fill-current opacity-60" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="Technologies I work with" className="relative overflow-hidden py-16">
      <Band
        reverse
        className="rotate-2 border-y border-white/[0.07] bg-white/[0.02] text-muted-foreground"
      />
      <Band className="-mt-[4.75rem] -rotate-2 bg-gradient-hero text-primary-foreground shadow-glow md:-mt-[5.75rem]" />
    </section>
  );
}

/* -------------------------------------------------------------------- About */

const highlight = new Set(["React", "Lightning", "Web", "Components", "Apex"]);

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn("mr-[0.25em] inline-block", highlight.has(children) && "text-gradient")}
    >
      {children}
    </motion.span>
  );
}

function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="01" eyebrow="About" />
        <ScrollRevealText
          className="mt-10 max-w-6xl font-display text-[clamp(1.85rem,4.4vw,4rem)] font-medium leading-[1.1] tracking-[-0.03em]"
          text="I'm a software engineer who turns business problems into fast, friendly interfaces — building with React on the web and Lightning Web Components & Apex on Salesforce."
        />

        <div className="mt-20 grid overflow-hidden rounded-3xl border border-white/[0.07] sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className="border-white/[0.07] p-8 md:p-10 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:last-child)]:border-r"
            >
              <p className="font-display text-6xl font-bold tracking-tight text-gradient md:text-7xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 max-w-[16rem] text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Skills */

function CodeWindow() {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-black/40 font-mono text-[12px] leading-6 shadow-card md:text-[13px]">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-muted-foreground">LeaveCard.jsx</span>
      </div>
      <pre className="overflow-x-auto p-4 text-muted-foreground">
        <code>
          <span className="text-[oklch(0.75_0.2_320)]">export const</span>{" "}
          <span className="text-[oklch(0.82_0.15_200)]">LeaveCard</span> = ({"{ "}
          <span className="text-foreground">request</span>
          {" }"}) =&gt; {"{\n"}
          {"  "}
          <span className="text-[oklch(0.75_0.2_320)]">const</span> {"{ "}
          <span className="text-foreground">approve</span>
          {" } = "}
          <span className="text-[oklch(0.82_0.15_200)]">useLeave</span>();{"\n"}
          {"  "}
          <span className="text-[oklch(0.75_0.2_320)]">return</span> ({"\n"}
          {"    "}&lt;<span className="text-[oklch(0.82_0.15_200)]">Card</span>{" "}
          <span className="text-[oklch(0.8_0.14_80)]">status</span>={"{"}request.status{"}"}&gt;
          {"\n"}
          {"      "}&lt;<span className="text-[oklch(0.82_0.15_200)]">Button</span>{" "}
          <span className="text-[oklch(0.8_0.14_80)]">onClick</span>={"{"}approve{"}"}
          &gt;Approve&lt;/
          <span className="text-[oklch(0.82_0.15_200)]">Button</span>&gt;{"\n"}
          {"    "}&lt;/<span className="text-[oklch(0.82_0.15_200)]">Card</span>&gt;{"\n"}
          {"  "});{"\n"}
          {"}"};<span className="caret" />
        </code>
      </pre>
    </div>
  );
}

function Orbit() {
  return (
    <div
      aria-hidden
      className="relative mx-auto my-6 grid aspect-square w-full max-w-[220px] place-items-center"
    >
      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-[18%] rounded-full border border-white/10" />
      <div className="absolute inset-0 animate-spin-slow">
        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_16px_var(--color-accent)]" />
      </div>
      <div className="absolute inset-[18%] animate-spin-slow-reverse">
        <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary shadow-[0_0_16px_var(--color-primary)]" />
      </div>
      <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-hero font-display text-lg font-bold text-primary-foreground shadow-glow">
        SF
      </div>
    </div>
  );
}

export function Skills() {
  const [frontend, salesforce, tools, soft] = skills;

  const Pills = ({ items }: { items: string[] }) => (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map((s) => (
        <span
          key={s}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          {s}
        </span>
      ))}
    </div>
  );

  const Head = ({ group, n }: { group: (typeof skills)[number]; n: string }) => (
    <>
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
          <group.icon className="h-5 w-5 text-primary" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{n}</span>
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold">{group.title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>
    </>
  );

  return (
    <section id="skills" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title={
            <>
              A toolkit for <em className="font-serif font-normal italic text-gradient">both</em>{" "}
              worlds
            </>
          }
        />

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Reveal className="min-w-0 md:col-span-2">
            <SpotlightCard className="p-7 md:p-8">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
                <div>
                  <Head group={frontend} n="/01" />
                  <Pills items={frontend.items} />
                </div>
                <CodeWindow />
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.1} className="md:row-span-2">
            <SpotlightCard className="flex h-full flex-col p-7 md:p-8" hue={260}>
              <Head group={salesforce} n="/02" />
              <Orbit />
              <Pills items={salesforce.items} />
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.15}>
            <SpotlightCard className="h-full p-7 md:p-8" hue={200}>
              <Head group={tools} n="/03" />
              <Pills items={tools.items} />
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.2}>
            <SpotlightCard className="h-full p-7 md:p-8" hue={290}>
              <Head group={soft} n="/04" />
              <Pills items={soft.items} />
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Experience */

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.6"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            index="03"
            eyebrow="Experience"
            title={
              <>
                Where I've <em className="font-serif font-normal italic text-gradient">shipped</em>{" "}
                code
              </>
            }
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
              From Salesforce Education Cloud to React-powered HR portals — production work, real
              users, real deadlines.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative pl-10 md:pl-14">
          <div className="absolute bottom-3 left-[11px] top-3 w-px bg-white/10" />
          <motion.div
            style={{ scaleY }}
            className="absolute bottom-3 left-[11px] top-3 w-px origin-top bg-gradient-to-b from-primary via-secondary to-accent"
          />
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05} className="relative pb-12 last:pb-0">
              <span className="absolute -left-10 top-8 grid h-6 w-6 place-items-center rounded-full border border-primary/40 bg-background md:-left-14">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)]" />
              </span>
              <SpotlightCard className="p-7 md:p-9" hue={i % 2 ? 260 : 320}>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="text-primary">{e.period}</span>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-muted-foreground">
                    {e.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                  {e.company}
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {e.role} · {e.location}
                </p>
                <ul className="mt-6 space-y-3 text-[15px] text-muted-foreground">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2.5 h-1 w-3 shrink-0 rounded-full bg-gradient-hero" />
                      {p}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Education */

export function Education() {
  return (
    <section id="education" className="relative px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          eyebrow="Education"
          title={
            <>
              Always <em className="font-serif font-normal italic text-gradient">learning</em>
            </>
          }
        />
        <ul className="mt-16 border-t border-white/[0.08]">
          {education.map((e, i) => (
            <motion.li
              key={e.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group relative grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-2 border-b border-white/[0.08] py-8 md:grid-cols-[4rem_1fr_auto_auto] md:py-10"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-primary/[0.08] to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
              />
              <span className="relative font-mono text-sm text-muted-foreground">0{i + 1}</span>
              <div className="relative transition-transform duration-500 group-hover:translate-x-2">
                <h3 className="font-display text-2xl font-semibold tracking-tight md:text-4xl">
                  {e.degree}
                </h3>
                <p className="mt-1 text-muted-foreground">{e.school}</p>
              </div>
              <span className="relative col-start-2 text-sm text-primary md:col-start-auto">
                {e.period}
              </span>
              <span className="relative hidden rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted-foreground transition-colors duration-500 group-hover:border-primary/50 group-hover:text-foreground md:block">
                {e.short}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
