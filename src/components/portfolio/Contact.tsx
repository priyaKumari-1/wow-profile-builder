import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Linkedin, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { LocalTime } from "./Chrome";
import { Magnetic, Reveal, SectionHeading, SpotlightCard } from "./primitives";

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2 pl-5 pr-2 text-left transition-colors hover:border-white/25"
    >
      <span className="truncate text-sm md:text-base">{profile.email}</span>
      <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white/10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "done" : "copy"}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  const channels = [
    {
      label: "Email",
      value: "Write me a note",
      href: `mailto:${profile.email}`,
      icon: Mail,
      hue: 320,
    },
    {
      label: "LinkedIn",
      value: "Let's connect",
      href: profile.linkedin,
      icon: Linkedin,
      hue: 260,
      external: true,
    },
    {
      label: "Phone",
      value: `+91 ${profile.phone}`,
      href: `tel:${profile.phone}`,
      icon: Phone,
      hue: 200,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 md:px-12 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-orb -bottom-40 left-1/4 h-[520px] w-[520px] bg-primary/50" />
        <div className="glow-orb -right-20 top-10 h-[360px] w-[360px] bg-accent/30" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading index="06" eyebrow="Contact" />
        <Reveal delay={0.1}>
          <h2 className="mt-8 font-display text-[clamp(3.25rem,10vw,9rem)] font-bold leading-[0.9] tracking-[-0.05em]">
            Let's build
            <br />
            something{" "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-gradient animate-gradient">
              lovely.
            </em>
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <Reveal delay={0.2} className="max-w-md space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Open to full-time roles, freelance projects and collaborations. Have an idea? I'd love
              to hear it.
            </p>
            <CopyEmail />
          </Reveal>
          <Reveal delay={0.3}>
            <Magnetic strength={0.45}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Write"
                className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-gradient-hero animate-gradient font-display text-lg font-semibold text-primary-foreground shadow-glow transition-shadow hover:shadow-elevated md:h-48 md:w-48"
              >
                <span className="flex items-center gap-1">
                  Say hello
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </span>
              </a>
            </Magnetic>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          {channels.map(({ label, value, href, icon: Icon, hue, external }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <SpotlightCard hue={hue}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between p-6"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        {label}
                      </span>
                      <span className="mt-1 block font-medium">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground" />
                </a>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.07] px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built with care.
        </p>
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Local time · <LocalTime />
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 self-start transition-colors hover:text-foreground md:self-auto"
        >
          Back to top
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 transition-transform group-hover:-translate-y-1">
            <ArrowUp className="h-3.5 w-3.5" />
          </span>
        </button>
      </div>
    </footer>
  );
}
