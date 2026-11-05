import { createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "framer-motion";
import { useCallback, useState } from "react";
import { Cursor, Preloader, ScrollProgress } from "@/components/portfolio/Chrome";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { Hero } from "@/components/portfolio/Hero";
import { Nav } from "@/components/portfolio/Nav";
import { Projects } from "@/components/portfolio/Projects";
import { About, Education, Experience, Marquee, Skills } from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Priya Kumari — Software Engineer | React & Salesforce Developer" },
      {
        name: "description",
        content:
          "Portfolio of Priya Kumari, a Software Engineer specialising in React, Salesforce LWC, and Apex. View projects, experience, and download resume.",
      },
      { property: "og:title", content: "Priya Kumari — Software Engineer" },
      {
        property: "og:description",
        content: "React & Salesforce developer building beautiful, scalable web experiences.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);

  return (
    <MotionConfig reducedMotion="user">
      <Preloader onDone={onLoaded} />
      <Cursor />
      <ScrollProgress />
      <div aria-hidden className="grain" />
      <Nav ready={ready} />
      <main className="relative">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
