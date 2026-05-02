import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Mail, Phone, Linkedin, Download, Github, ExternalLink,
  Code2, Briefcase, GraduationCap, Sparkles, ArrowDown, MapPin
} from "lucide-react";
import heroImg from "@/assets/hero-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priya Kumari — Software Engineer | React & Salesforce Developer" },
      { name: "description", content: "Portfolio of Priya Kumari, a Software Engineer specialising in React, Salesforce LWC, and Apex. View projects, experience, and download resume." },
      { property: "og:title", content: "Priya Kumari — Software Engineer" },
      { property: "og:description", content: "React & Salesforce developer building beautiful, scalable web experiences." },
    ],
  }),
  component: Portfolio,
});

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
}

function Portfolio() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed w-[400px] h-[400px] rounded-full opacity-30 blur-3xl z-0 transition-transform"
        style={{
          background: "radial-gradient(circle, oklch(0.72 0.22 320 / 60%), transparent 70%)",
          transform: `translate(${mouse.x - 200}px, ${mouse.y - 200}px)`,
        }}
      />

      <Nav />

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="glow-orb w-[500px] h-[500px] bg-primary -top-40 -left-40" />
        <div className="glow-orb w-[400px] h-[400px] bg-accent top-1/3 right-0" />
        <div className="glow-orb w-[350px] h-[350px] bg-secondary bottom-0 left-1/3" />

        <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm">Available for opportunities</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4">
              Hi, I'm <br />
              <span className="text-gradient animate-gradient bg-gradient-hero">Priya Kumari</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl"
            >
              Software Engineer crafting beautiful experiences with{" "}
              <span className="text-foreground font-semibold">React</span>,{" "}
              <span className="text-foreground font-semibold">Salesforce LWC</span> &{" "}
              <span className="text-foreground font-semibold">Apex</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="/priya-kumari-resume.png"
                download
                className="group inline-flex items-center gap-2 bg-gradient-hero animate-gradient text-primary-foreground px-6 py-3 rounded-full font-semibold shadow-glow hover:shadow-elevated transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 group-hover:animate-bounce" />
                Download Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full font-semibold hover:bg-card transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
                Get in touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-6 mt-10 text-muted-foreground"
            >
              <a href="https://www.linkedin.com/in/priyakumari000/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:Priya.kumari.224364@gmail.com" className="hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="tel:9599352434" className="hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative animate-float"
          >
            <div className="absolute inset-0 bg-gradient-hero rounded-3xl blur-2xl opacity-50 animate-pulse-glow" />
            <img
              src={heroImg}
              alt="Priya Kumari portrait"
              width={1024}
              height={1024}
              className="relative rounded-3xl shadow-elevated w-full max-w-md mx-auto"
            />
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section id="about">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-12 items-start"
        >
          <div className="md:col-span-1">
            <p className="text-sm uppercase tracking-widest text-primary mb-2">About</p>
            <h2 className="text-4xl md:text-5xl font-bold">A bit about me</h2>
          </div>
          <div className="md:col-span-2 space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Software Engineer with <span className="text-foreground font-semibold">10+ months</span> of hands-on experience in React, Salesforce (LWC, Apex), and full-stack web development.
            </p>
            <p>
              I've built employee management systems, responsive UIs, and Salesforce automation. I'm focused on writing clean, scalable code that solves real business problems — and looks great doing it.
            </p>
            <div className="flex items-center gap-2 text-sm pt-4">
              <MapPin className="w-4 h-4 text-primary" /> India · Open to Remote
            </div>
          </div>
        </motion.div>
      </Section>

      {/* SKILLS */}
      <Section id="skills">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Tech Stack</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Skills & Tools</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-card glass rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all"
            >
              <cat.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s) => (
                  <span key={s} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Career</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Experience</h2>
        </motion.div>

        <div className="relative space-y-8 before:absolute before:left-4 md:before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-primary before:via-secondary before:to-accent">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"} pl-12 md:pl-0`}
            >
              <div className="absolute left-2 md:left-auto md:right-[-9px] top-6 w-4 h-4 rounded-full bg-gradient-hero shadow-glow animate-pulse-glow"
                style={{ [i % 2 === 0 ? "right" : "left"]: "-9px" } as React.CSSProperties} />
              <div className="bg-gradient-card glass rounded-2xl p-6 shadow-card">
                <p className="text-sm text-primary mb-1">{exp.period}</p>
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-muted-foreground mb-4">{exp.company}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {exp.points.map((p) => (
                    <li key={p} className="flex gap-2"><span className="text-primary">▸</span>{p}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-gradient-card glass rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-hero rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <Code2 className="w-8 h-8 text-primary" />
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-accent mb-4">{p.stack}</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2"><span className="text-primary">▸</span>{pt}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* EDUCATION */}
      <Section id="education">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Background</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Education</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-card glass rounded-2xl p-6 shadow-card"
            >
              <GraduationCap className="w-8 h-8 text-accent mb-4" />
              <h3 className="font-bold mb-1">{e.degree}</h3>
              <p className="text-sm text-muted-foreground">{e.school}</p>
              <p className="text-xs text-primary mt-2">{e.period}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.8 }}>
          <p className="text-sm uppercase tracking-widest text-primary mb-2">Let's Connect</p>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Have a <span className="text-gradient bg-gradient-hero animate-gradient">project</span> in mind?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just a good chat about code.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:Priya.kumari.224364@gmail.com" className="inline-flex items-center gap-2 bg-gradient-hero animate-gradient text-primary-foreground px-8 py-4 rounded-full font-semibold shadow-glow hover:shadow-elevated transition-all hover:scale-105">
              <Mail className="w-5 h-5" /> Say Hello
            </a>
            <a href="https://www.linkedin.com/in/priyakumari000/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 glass px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </Section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Priya Kumari · Crafted with ❤️
      </footer>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "glass py-3" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-gradient bg-gradient-hero">PK.</a>
        <div className="hidden md:flex gap-8 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <a href="/priya-kumari-resume.png" download className="text-xs md:text-sm glass px-4 py-2 rounded-full hover:bg-card transition-all">
          Resume
        </a>
      </div>
    </motion.nav>
  );
}

const skills = [
  { title: "Frontend", icon: Code2, items: ["React", "JavaScript", "HTML", "CSS", "Node.js"] },
  { title: "Salesforce", icon: Sparkles, items: ["LWC", "Apex", "Apex Triggers"] },
  { title: "Tools", icon: Briefcase, items: ["GitHub", "Salesforce Platform", "REST APIs"] },
  { title: "Soft Skills", icon: GraduationCap, items: ["Teamwork", "Problem-Solving", "Communication"] },
];

const experience = [
  {
    role: "Software Engineer",
    company: "SaaS AI Private Limited",
    period: "Jul 2023 – Mar 2024 · 9 months",
    points: [
      "Developed and maintained Lightning Web Components (LWC) for dynamic Salesforce UIs",
      "Contributed to the Coventry Education Cloud implementation with LWC and Apex",
      "Managed code deployments to production via GitHub using ticket-based workflow",
      "Built React applications with responsive, reusable UI components and REST APIs",
    ],
  },
  {
    role: "Software Engineer",
    company: "Asharp Infotech · Remote",
    period: "Apr 2024 · 1 month",
    points: [
      "Developed frontend features for Smart Portal employee management system using React",
      "Built and styled responsive UI for leave management, attendance, and employee records",
      "Wrote clean, reusable component code following best practices",
    ],
  },
];

const projects = [
  {
    title: "Smart Portal — EMS",
    stack: "LWC · Apex · Salesforce Experience Cloud",
    points: [
      "Full-featured employee management web app on Salesforce Experience Cloud",
      "Leave management (apply, approve, reject), attendance tracking & employee records",
    ],
  },
  {
    title: "Coventry — Education Cloud",
    stack: "Salesforce · LWC · Apex",
    points: [
      "Designed and enhanced LWC components for dynamic Salesforce UIs",
      "Implemented Apex classes & Triggers for business logic and process automation",
    ],
  },
  {
    title: "React Web Application",
    stack: "React · Context API · REST API",
    points: [
      "Fully responsive React app with modular, reusable component architecture",
      "Leveraged React Router, Context API & custom Hooks for state management",
      "Integrated REST APIs with focus on performance optimisation",
    ],
  },
  {
    title: "Employee Management UI",
    stack: "React · Tailwind · REST",
    points: [
      "Built clean, responsive UI components for HR workflows",
      "Implemented attendance dashboards and leave request flows",
    ],
  },
];

const education = [
  { degree: "Master of Computer Applications (MCA)", school: "Currently Pursuing", period: "Ongoing" },
  { degree: "Bachelor of Computer Applications (BCA)", school: "IGNOU", period: "2022 – 2025" },
  { degree: "10+2", school: "CBSE", period: "2022" },
];
