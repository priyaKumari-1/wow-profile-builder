import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";

/** Counts to 100, then lifts like a curtain. Calls onDone as the curtain starts to rise. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const finish = () => {
      setDone(true);
      onDoneRef.current();
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    document.documentElement.style.overflow = "hidden";
    let raf = 0;
    let timer = 0;
    const start = performance.now();
    const duration = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(finish, 200);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.documentElement.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-[oklch(0.09_0.02_285)] p-6 md:p-10"
        >
          <div className="flex justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span>{profile.name}</span>
            <span>Portfolio</span>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="max-w-[14rem] text-sm text-muted-foreground">
              Software Engineer — React &amp; Salesforce
            </p>
            <span className="font-display text-[clamp(5rem,20vw,16rem)] font-bold leading-[0.8] tracking-[-0.06em] tabular-nums">
              {count}
              <span className="text-primary">%</span>
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5">
            <div className="h-full bg-gradient-hero" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Dot + trailing ring that grows over interactive elements, plus a soft ambient glow. Fine pointers only. */
export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });
  const glowX = useSpring(x, { stiffness: 60, damping: 20 });
  const glowY = useSpring(y, { stiffness: 60, damping: 20 });
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      setHovering(!!target);
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = label ? 84 : hovering ? 56 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          x: glowX,
          y: glowY,
          background: "radial-gradient(circle, oklch(0.72 0.22 320 / 55%), transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150]"
        style={{ x: ringX, y: ringY, opacity: visible ? 1 : 0 }}
      >
        <motion.div
          animate={{ width: size, height: size }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`-translate-x-1/2 -translate-y-1/2 grid place-items-center rounded-full border text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${
            label
              ? "border-transparent bg-foreground text-background"
              : hovering
                ? "border-primary/70 bg-primary/10"
                : "border-white/30"
          }`}
        >
          {label}
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[151] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        style={{ x, y, opacity: visible && !label ? 1 : 0 }}
      />
    </>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-hero"
    />
  );
}

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: profile.timezone,
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"} IST</span>;
}
