export const person = {
  name: "Maleesha Dewshan",
  title: "Software Engineering Undergraduate",
  subtitle: "Backend Engineer",
  secondarySubtitle: "AI Enthusiast",
  tertiarySubtitle: "Full Stack Developer",
  location: "Sri Lanka",
  university: "University of Central Lancashire (UCLan) via Universal College Lanka (UCL)",
  degree: "BSc (Hons) Software Engineering",
  graduation: "2027",
  github: "https://github.com/Dewshan905",
  linkedin: "https://www.linkedin.com/in/maleesha-dewshan-945873370/",
  email: "maleeshadewshan378@gmail.com"
};

export const highlights = [
  {
    label: "Programming languages",
    value: "7",
    detail: "Python, TypeScript, JavaScript, C++, Java, Dart, SQL"
  },
  {
    label: "Core projects",
    value: "5",
    detail: "AI, mobile, algorithmic, and systems-focused work"
  },
  {
    label: "Certifications",
    value: "7",
    detail: "Academic recognition and technical workshops"
  },
  {
    label: "Professional focus",
    value: "3",
    detail: "AI, backend engineering, and full stack delivery"
  }
];

export const aboutPoints = [
  "Software Engineering student building production-minded systems with a strong focus on backend architecture, AI workflows, and cloud-ready delivery.",
  "Interested in designing clean user experiences while keeping implementation practical, scalable, and maintainable.",
  "Comfortable moving across mobile, web, and server-side development, with a bias toward solving meaningful problems end-to-end.",
  "Driven by continuous learning, disciplined execution, and a long-term goal of shipping reliable software in a professional engineering team."
];

export const education = {
  degree: "BSc (Hons) Software Engineering",
  university: "University of Central Lancashire (UCLan)",
  college: "Universal College Lanka",
  graduation: "Expected Graduation 2027",
  achievements: ["Dean's List Award 2025-26", "Internship Recommendation Letter", "Robotics & IoT Distinction"]
};

export const skillGroups = [
  {
    title: "Programming Languages",
    icon: "</>",
    items: ["Python", "TypeScript", "JavaScript", "C++", "Java", "Dart", "SQL"]
  },
  {
    title: "Frontend",
    icon: "UI",
    items: ["React", "HTML", "CSS", "Flutter"]
  },
  {
    title: "Backend",
    icon: "API",
    items: ["Node.js", "REST APIs", "PostgreSQL", "Firebase", "Prisma"]
  },
  {
    title: "Cloud",
    icon: "CLOUD",
    items: ["Docker", "Vercel", "Firebase"]
  },
  {
    title: "Tools",
    icon: "TOOLS",
    items: ["Git", "GitHub", "Linux", "VS Code", "Figma", "VirtualBox"]
  }
];

export const experience = [
  {
    title: "Freelance Software Developer",
    summary: "Delivered end-to-end digital solutions with emphasis on architecture, reliability, and practical product delivery.",
    bullets: ["Full Stack Development", "Backend Systems", "AI Applications", "REST APIs", "Database Design", "Deployment"]
  },
  {
    title: "Junior Manager / Business Operations",
    summary: "Supported operational workflows and reporting while balancing technical assistance and administrative responsibilities.",
    bullets: ["Business Operations", "Reporting Systems", "Technical Support", "Administration"]
  }
];

export const projects = [
  {
    title: "FocusPath AI",
    description: "AI-powered productivity platform built using React, TypeScript, Node.js, PostgreSQL, OpenAI API, Docker, and Prisma.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "OpenAI API", "Docker", "Prisma"],
    features: ["AI productivity workflows", "Database-backed sessions", "Scalable API design"],
    githubUrl: process.env.NEXT_PUBLIC_FOCUSPATH_GITHUB_URL ?? person.github,
    demoUrl: process.env.NEXT_PUBLIC_FOCUSPATH_DEMO_URL ?? "#contact"
  },
  {
    title: "NASA Data Mobile App",
    description: "Cross-platform Flutter application integrating NASA APIs.",
    technologies: ["Flutter", "Dart", "NASA APIs"],
    features: ["Cross-platform mobile UI", "Live space data integration", "API-driven experience"],
    githubUrl: process.env.NEXT_PUBLIC_NASA_APP_GITHUB_URL ?? person.github,
    demoUrl: process.env.NEXT_PUBLIC_NASA_APP_DEMO_URL ?? "#contact"
  },
  {
    title: "Campus Service Optimisation",
    description: "Python system using algorithms and data structures for route optimisation and service management.",
    technologies: ["Python", "Algorithms", "Data Structures"],
    features: ["Route optimisation", "Service management logic", "Performance-focused design"],
    githubUrl: process.env.NEXT_PUBLIC_CAMPUS_APP_GITHUB_URL ?? person.github,
    demoUrl: process.env.NEXT_PUBLIC_CAMPUS_APP_DEMO_URL ?? "#contact"
  },
  {
    title: "Smart Traffic Controller",
    description: "C# application using TDD and NUnit testing.",
    technologies: ["C#", "TDD", "NUnit"],
    features: ["Test-driven implementation", "Traffic flow logic", "Reliable behavior coverage"],
    githubUrl: process.env.NEXT_PUBLIC_TRAFFIC_APP_GITHUB_URL ?? person.github,
    demoUrl: process.env.NEXT_PUBLIC_TRAFFIC_APP_DEMO_URL ?? "#contact"
  },
  {
    title: "AI Study Assistant",
    description: "AI-powered study assistant helping students improve productivity and learning.",
    technologies: ["AI", "Automation", "Productivity"],
    features: ["Study workflow support", "AI-assisted productivity", "Student-friendly interface"],
    githubUrl: process.env.NEXT_PUBLIC_STUDY_APP_GITHUB_URL ?? person.github,
    demoUrl: process.env.NEXT_PUBLIC_STUDY_APP_DEMO_URL ?? "#contact"
  }
];

export const certifications = [
  "Dean's List Award",
  "Internship Recommendation Letter",
  "Robotics & IoT Distinction",
  "Microsoft Gen AI Workshop",
  "Robotics Workshop",
  "NCC Diploma",
  "English Certificate"
];

export const githubRepos = [
  {
    name: "FocusPath AI",
    language: "TypeScript",
    summary: "AI-first productivity platform with backend orchestration and premium UX.",
    accent: "from-sky-400/80 to-blue-600/80"
  },
  {
    name: "NASA Data Mobile App",
    language: "Dart",
    summary: "Cross-platform application for exploring NASA data and APIs.",
    accent: "from-cyan-400/80 to-blue-500/80"
  },
  {
    name: "Campus Service Optimisation",
    language: "Python",
    summary: "Algorithmic optimization engine for service routing and management.",
    accent: "from-blue-400/80 to-indigo-500/80"
  }
];
