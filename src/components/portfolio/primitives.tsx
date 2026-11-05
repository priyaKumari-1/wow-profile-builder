import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Letters slide up from behind a mask, one after another. */
export function SplitText({
  text,
  ready = true,
  delay = 0,
  stagger = 0.05,
  className,
}: {
  text: string;
  ready?: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("inline-flex overflow-hidden pb-[0.1em] -mb-[0.1em]", className)}
    >
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "115%", rotate: 10 }}
          animate={ready ? { y: "0%", rotate: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: delay + i * stagger }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.3 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.3 });

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** Card with a glow and border highlight that follow the pointer. */
export function SpotlightCard({
  children,
  className,
  hue = 320,
}: {
  children: ReactNode;
  className?: string;
  hue?: number;
}) {
  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const fill = useMotionTemplate`radial-gradient(480px circle at ${mx}px ${my}px, oklch(0.72 0.22 ${hue} / 0.13), transparent 70%)`;
  const edge = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, oklch(0.82 0.18 ${hue} / 0.9), transparent 70%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <div
      onPointerMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.025] transition-colors duration-500 hover:bg-white/[0.04]",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: fill }}
      />
      <motion.div
        aria-hidden
        className="mask-border pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{ background: edge }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (n) => setValue(Math.round(n)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  className,
}: {
  index: string;
  eyebrow: string;
  title?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal className="flex items-center gap-4 text-xs md:text-sm">
        <span className="font-mono text-primary">({index})</span>
        <span className="h-px w-12 bg-gradient-to-r from-primary to-transparent" />
        <span className="uppercase tracking-[0.3em] text-muted-foreground">{eyebrow}</span>
      </Reveal>
      {title && (
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {title}
          </h2>
        </Reveal>
      )}
    </div>
  );
}
