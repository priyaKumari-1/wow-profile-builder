import { Cloud, Code2, Users, Wrench, type LucideIcon } from "lucide-react";

export const profile = {
  name: "Priya Kumari",
  first: "Priya",
  last: "Kumari",
  role: "Software Engineer",
  email: "Priya.kumari.224364@gmail.com",
  phone: "9599352434",
  linkedin: "https://www.linkedin.com/in/priyakumari000/",
  resume: "/priya-kumari-resume.png",
  location: "India · Open to remote",
  timezone: "Asia/Kolkata",
};

export const roles = [
  "React interfaces",
  "Lightning Web Components",
  "Apex automation",
  "clean, scalable code",
];

export const stats = [
  { value: 10, suffix: "+", label: "Months of hands-on engineering experience" },
  { value: 2, suffix: "", label: "Companies I've shipped production code for" },
  { value: 4, suffix: "", label: "Projects built across React & Salesforce" },
];

export const marquee = [
  "React",
  "Lightning Web Components",
  "Apex",
  "JavaScript",
  "Apex Triggers",
  "REST APIs",
  "Node.js",
  "Experience Cloud",
  "Context API",
  "GitHub",
  "HTML & CSS",
];

export type SkillGroup = { title: string; icon: LucideIcon; blurb: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    blurb: "Responsive, component-driven interfaces with clean state management.",
    items: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Node.js",
      "React Router",
      "Context API",
      "Hooks",
    ],
  },
  {
    title: "Salesforce",
    icon: Cloud,
    blurb: "Dynamic UIs and business automation on the Salesforce platform.",
    items: [
      "Lightning Web Components",
      "Apex",
      "Apex Triggers",
      "Experience Cloud",
      "Education Cloud",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    blurb: "Ticket-based workflows from commit to production.",
    items: ["GitHub", "Salesforce Platform", "REST APIs"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    blurb: "A dependable teammate who communicates early and often.",
    items: ["Teamwork", "Problem-Solving", "Communication"],
  },
];

export const experience = [
  {
    role: "Software Engineer",
    company: "Asharp Infotech",
    location: "Remote",
    period: "Apr 2024",
    duration: "1 month",
    points: [
      "Developed frontend features for the Smart Portal employee management system using React",
      "Built and styled responsive UI for leave management, attendance, and employee records",
      "Wrote clean, reusable component code following best practices for maintainability",
    ],
  },
  {
    role: "Software Engineer",
    company: "SaaS AI Private Limited",
    location: "India",
    period: "Jul 2023 – Mar 2024",
    duration: "1+ year",
    points: [
      "Developed and maintained Lightning Web Components (LWC) for dynamic Salesforce UIs",
      "Contributed to the Coventry Education Cloud implementation with LWC and Apex",
      "Managed code deployments to production via GitHub using a ticket-based workflow",
      "Built React applications with responsive, reusable UI components and REST APIs",
    ],
  },
];

export type Project = {
  title: string;
  tag: string;
  stack: string[];
  points: string[];
  hue: number;
  mock: { heading: string; rows: [string, string][] };
};

export const projects: Project[] = [
  {
    title: "Smart Portal",
    tag: "Employee Management System",
    stack: ["LWC", "Apex", "Experience Cloud"],
    points: [
      "Full-featured employee management web app on Salesforce Experience Cloud",
      "Leave management (apply, approve, reject), attendance tracking & employee records",
    ],
    hue: 320,
    mock: {
      heading: "Leave requests",
      rows: [
        ["Annual leave · 3 days", "Approved"],
        ["Sick leave · 1 day", "Pending"],
        ["Work from home", "Approved"],
        ["Attendance sync", "Live"],
      ],
    },
  },
  {
    title: "Education Cloud",
    tag: "Education Cloud Implementation",
    stack: ["Salesforce", "LWC", "Apex"],
    points: [
      "Designed and enhanced LWC components for dynamic Salesforce user interfaces",
      "Implemented Apex classes & Triggers for business logic and process automation",
      "Deployed to production via GitHub across the full ticket-based lifecycle",
    ],
    hue: 265,
    mock: {
      heading: "Student journey",
      rows: [
        ["Application", "Submitted"],
        ["Enrolment", "In review"],
        ["Apex trigger", "Fired"],
        ["LWC · Course card", "Deployed"],
      ],
    },
  },
  {
    title: "React Web App",
    tag: "Modular SPA",
    stack: ["React", "Context API", "REST API"],
    points: [
      "Fully responsive React app with modular, reusable component architecture",
      "React Router, Context API & custom Hooks for navigation and state management",
      "Integrated REST APIs with a focus on performance optimisation",
    ],
    hue: 205,
    mock: {
      heading: "Dashboard",
      rows: [
        ["GET /api/users", "200 OK"],
        ["Context · auth", "Ready"],
        ["Route · /profile", "Loaded"],
        ["Bundle", "Optimised"],
      ],
    },
  },
  {
    title: "Employee Management UI",
    tag: "HR Workflows",
    stack: ["React", "Tailwind", "REST"],
    points: [
      "Built clean, responsive UI components for HR workflows",
      "Implemented attendance dashboards and leave request flows",
    ],
    hue: 290,
    mock: {
      heading: "Attendance",
      rows: [
        ["Monday", "Present"],
        ["Tuesday", "Present"],
        ["Wednesday", "Remote"],
        ["Thursday", "On leave"],
      ],
    },
  },
];

export const education = [
  {
    degree: "Master of Computer Applications",
    short: "MCA",
    school: "Currently pursuing",
    period: "Ongoing",
  },
  {
    degree: "Bachelor of Computer Applications",
    short: "BCA",
    school: "IGNOU",
    period: "2022 – 2025",
  },
  { degree: "Senior Secondary (10+2)", short: "12th", school: "CBSE", period: "2022" },
];
