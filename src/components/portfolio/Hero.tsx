import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, Download, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import heroImg from "@/assets/hero-portrait.jpg";
import { profile, roles } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { EASE, Magnetic, SplitText } from "./primitives";

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, ease: EASE, delay },
  });

  const socials = [
    { href: profile.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
    { href: `mailto:${profile.email}`, label: "Email", icon: Mail },
    { href: `tel:${profile.phone}`, label: "Phone", icon: Phone },
  ];

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden px-6 pb-20 pt-32 md:px-12 lg:min-h-[100svh]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-orb -left-40 -top-40 h-[520px] w-[520px] bg-primary/70 animate-float" />
        <div className="glow-orb -right-32 top-1/4 h-[420px] w-[420px] bg-accent/40" />
        <div className="glow-orb -bottom-24 left-1/3 h-[380px] w-[380px] bg-secondary/60" />
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:min-h-[calc(100svh-13rem)] lg:grid-cols-[1.3fr_1fr]"
      >
        <div>
          <motion.div
            {...show(0.1)}
            className="glass mb-8 inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for opportunities
          </motion.div>

          <h1 className="font-display text-[clamp(4rem,12vw,10rem)] font-bold leading-[0.86] tracking-[-0.05em]">
            <span className="sr-only">{profile.name}</span>
            <SplitText text={profile.first} ready={ready} delay={0.15} />
            <br />
            <span aria-hidden className="inline-block overflow-hidden pb-[0.12em] pr-[0.1em]">
              <motion.span
                className="inline-block font-serif font-normal italic tracking-[-0.02em] text-gradient animate-gradient"
                initial={{ y: "110%" }}
                animate={ready ? { y: "0%" } : undefined}
                transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
              >
                {profile.last}
              </motion.span>
            </span>
          </h1>

          <motion.p
            {...show(0.8)}
            className="mt-8 flex flex-wrap items-baseline gap-x-2.5 font-display text-xl text-muted-foreground md:text-3xl"
          >
            <span>Software engineer crafting</span>
            <RoleRotator />
          </motion.p>

          <motion.p
            {...show(0.95)}
            className="mt-6 max-w-lg leading-relaxed text-muted-foreground md:text-lg"
          >
            10+ months shipping production features across React and the Salesforce platform — from
            employee portals to Education Cloud.
          </motion.p>

          <motion.div {...show(1.1)} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href={profile.resume}
                download
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-hero animate-gradient px-7 py-4 font-semibold text-primary-foreground shadow-glow transition-shadow hover:shadow-elevated"
              >
                <span className="shine" aria-hidden />
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                Download résumé
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold transition-colors hover:border-white/30 hover:bg-white/5"
              >
                Get in touch
                <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-45" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...show(1.25)} className="mt-10 flex items-center gap-3">
            {socials.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-muted-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <span className="ml-3 hidden h-px w-16 bg-white/10 sm:block" />
            <span className="hidden text-sm text-muted-foreground sm:block">
              {profile.location}
            </span>
          </motion.div>
        </div>

        <Portrait ready={ready} />
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-muted-foreground lg:flex"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-primary" />
        </span>
      </motion.a>
    </section>
  );
}

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex overflow-hidden pb-1 align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block font-serif italic text-foreground"
        >
          {roles[i]}.
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Portrait({ ready }: { ready: boolean }) {
  const rx = useSpring(0, { stiffness: 150, damping: 18 });
  const ry = useSpring(0, { stiffness: 150, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(30);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.22), transparent 55%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 14);
    rx.set(-(py - 0.5) * 14);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 40 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : undefined}
      transition={{ duration: 1.3, ease: EASE, delay: 0.35 }}
      className="relative mx-auto w-full max-w-[420px] [perspective:1200px]"
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[3rem] bg-gradient-hero opacity-35 blur-3xl animate-pulse-soft"
      />
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry }}
        data-cursor="Hi!"
        className="relative aspect-[4/5] rounded-[2rem] border border-white/10 bg-white/[0.04] p-2 shadow-elevated"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
          <img
            src={heroImg}
            alt="Stylised portrait of Priya Kumari made of code"
            width={1024}
            height={1024}
            className="h-full w-full scale-110 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
          <motion.div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay"
            style={{ background: glare }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Currently</p>
              <p className="font-display font-semibold">Pursuing MCA</p>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              Since 2023
            </span>
          </div>
        </div>

        <Chip
          ready={ready}
          delay={1.2}
          className="-left-5 top-12 md:-left-10"
          dot="oklch(0.78 0.18 200)"
        >
          React
        </Chip>
        <Chip
          ready={ready}
          delay={1.35}
          className="-right-4 top-1/3 md:-right-8"
          dot="oklch(0.72 0.22 320)"
        >
          LWC
        </Chip>
        <Chip
          ready={ready}
          delay={1.5}
          className="-left-3 bottom-28 md:-left-8"
          dot="oklch(0.65 0.22 260)"
        >
          Apex
        </Chip>
      </motion.div>
    </motion.div>
  );
}

function Chip({
  children,
  className,
  dot,
  delay,
  ready,
}: {
  children: ReactNode;
  className?: string;
  dot: string;
  delay: number;
  ready: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      animate={ready ? { opacity: 1, scale: 1 } : undefined}
      transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
      className={cn("absolute", className)}
    >
      <div
        className="glass flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-card animate-float"
        style={{ animationDelay: `${delay}s`, animationDuration: "5s" }}
      >
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: dot, boxShadow: `0 0 12px ${dot}` }}
        />
        {children}
      </div>
    </motion.div>
  );
}
