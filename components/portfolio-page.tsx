"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ComponentType, type FormEvent, type PointerEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ChevronUp,
  Cloud,
  Code2,
  Cpu,
  ExternalLink,
  Github,
  GraduationCap,
  LaptopMinimal,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Microscope,
  MonitorSmartphone,
  Orbit,
  Sparkles,
  SquareTerminal,
  Star,
  Target,
  Zap
} from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { aboutPoints, certifications, education, experience, githubRepos, highlights, person, projects, skillGroups } from "./site-data";

type CounterProps = {
  value: string;
  label: string;
  detail: string;
};

type ProfileCard = {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
};

const roles = [person.title, person.subtitle, person.secondarySubtitle, person.tertiarySubtitle];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-3xl">
      <p className="section-eyebrow text-xs font-semibold uppercase">{eyebrow}</p>
      <h2 className="section-title mt-4 text-3xl font-semibold text-white sm:text-4xl md:text-5xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{description}</p>
    </div>
  );
}

function Counter({ value, label, detail }: CounterProps) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const elementId = `stat-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 }
    );
    const element = document.getElementById(elementId);

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementId]);

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }

    const numericValue = Number.parseInt(value, 10);
    if (Number.isNaN(numericValue)) {
      setCount(0);
      return;
    }

    const duration = 1100;
    const started = performance.now();
    let frame = 0;

    const tick = (time: number) => {
      const progress = Math.min((time - started) / duration, 1);
      setCount(Math.floor(progress * numericValue));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      id={elementId}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.65 }}
      className="glass-card rounded-[1.7rem] p-6"
    >
      <p className="font-display text-4xl font-semibold text-white sm:text-5xl">{count}+</p>
      <p className="mt-3 text-sm font-medium text-sky-300">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
    </motion.div>
  );
}

function SocialButton({ href, label, icon: Icon }: { href: string; label: string; icon: ComponentType<{ className?: string }> }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400/50 hover:bg-sky-400/10 hover:text-white"
    >
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

export function PortfolioPage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [showTopButton, setShowTopButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.5 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.5 });
  const translateX = useTransform(smoothX, [0, 1], [-20, 20]);
  const translateY = useTransform(smoothY, [0, 1], [-20, 20]);
  const rotateX = useTransform(smoothY, [0, 1], [7, -7]);
  const rotateY = useTransform(smoothX, [0, 1], [-7, 7]);
  const spotlightX = useTransform(smoothX, [0, 1], ["15%", "85%"]);
  const spotlightY = useTransform(smoothY, [0, 1], ["20%", "78%"]);
  const profileCards: ProfileCard[] = [
    { label: "University", value: person.university, icon: GraduationCap },
    { label: "Location", value: person.location, icon: MapPin },
    { label: "Degree", value: person.degree, icon: LaptopMinimal },
    { label: "Grad", value: person.graduation, icon: Star }
  ];

  const navLinks = useMemo(
    () => [
      ["About", "#about"],
      ["Education", "#education"],
      ["Skills", "#skills"],
      ["Projects", "#projects"],
      ["Contact", "#contact"]
    ],
    []
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
      setTypedRole("");
    }, 3900);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let cursor = 0;

    const timer = window.setInterval(() => {
      cursor += 1;
      setTypedRole(currentRole.slice(0, cursor));
      if (cursor >= currentRole.length) {
        window.clearInterval(timer);
      }
    }, 48);

    return () => window.clearInterval(timer);
  }, [roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 700);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: "power3.out", stagger: 0.12 }
      );
      gsap.fromTo(
        ".hero-chip",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, ease: "power3.out", stagger: 0.08, delay: 0.35 }
      );
    });

    let sr: { reveal: (selector: string, options?: Record<string, unknown>) => void; destroy: () => void } | null = null;

    void import("scrollreveal").then((module) => {
      sr = module.default({
        distance: "26px",
        duration: 850,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        interval: 85,
        opacity: 0,
        cleanup: true
      });

      sr!.reveal(".reveal-block", { origin: "bottom" });
      sr!.reveal(".reveal-left", { origin: "left" });
      sr!.reveal(".reveal-right", { origin: "right" });
    });

    return () => {
      ctx.revert();
      sr?.destroy();
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerX.set(Math.min(Math.max(x, 0), 1));
    pointerY.set(Math.min(Math.max(y, 0), 1));
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const scrollToSection = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("sending");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name || "Not provided"}\nEmail: ${email || "Not provided"}\n\n${message || "No message provided."}`
    );

    window.setTimeout(() => {
      window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
      setFormStatus("sent");
    }, 220);
  };

  return (
    <main className="portfolio-shell overflow-hidden">
      <section className="relative isolate min-h-screen overflow-hidden px-4 pt-5 sm:px-6 lg:px-8">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ x: translateX, y: translateY, rotateX, rotateY, perspective: 1000 }}
        >
          <motion.div
            className="grid-glow left-[10%] top-[10%] h-72 w-72 bg-sky-500/30 blur-3xl"
            style={{ x: spotlightX, y: spotlightY }}
          />
          <div className="absolute left-1/2 top-[-8rem] h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute bottom-[-6rem] right-[-3rem] h-[20rem] w-[20rem] rounded-full bg-blue-500/15 blur-3xl" />
        </motion.div>

        <header className="glass-card relative z-20 mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-4 shadow-premium backdrop-blur-2xl">
          <button className="flex items-center gap-3 text-left" onClick={() => scrollToSection("#top")}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/10 text-sm font-semibold text-sky-200 shadow-glow">
              MD
            </span>
            <span>
              <span className="block font-display text-sm font-semibold tracking-[0.24em] text-white">MALEESHA DEWSHAN</span>
              <span className="block text-xs text-slate-400">Software Engineer in the making</span>
            </span>
          </button>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <SocialButton href={person.github} label="GitHub" icon={Github} />
            <SocialButton href={person.linkedin} label="LinkedIn" icon={Linkedin} />
          </div>

          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card relative z-20 mx-auto mt-4 max-w-7xl rounded-[1.5rem] p-4 lg:hidden"
            >
              <div className="grid gap-2">
                {navLinks.map(([label, href]) => (
                  <button
                    key={label}
                    onClick={() => scrollToSection(href)}
                    className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-left text-sm text-slate-200"
                  >
                    {label}
                  </button>
                ))}
                <div className="mt-2 flex flex-wrap gap-2">
                  <SocialButton href={person.github} label="GitHub" icon={Github} />
                  <SocialButton href={person.linkedin} label="LinkedIn" icon={Linkedin} />
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div id="top" className="relative z-10 mx-auto grid max-w-7xl gap-10 pb-20 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-24">
          <div className="flex flex-col justify-center">
            <div className="hero-chip inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm text-sky-100">
              <Sparkles className="h-4 w-4" />
              Premium developer portfolio
            </div>

            <motion.h1
              className="hero-fade mt-6 font-display text-5xl font-semibold uppercase tracking-[-0.08em] text-white sm:text-7xl lg:text-8xl"
              style={{ lineHeight: 0.92 }}
            >
              <span className="shine-text block">Maleesha</span>
              <span className="block">Dewshan</span>
            </motion.h1>

            <motion.div className="hero-fade mt-6 flex flex-wrap items-center gap-3 text-sm sm:text-base">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">{person.location}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">{person.degree}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">Expected {person.graduation}</span>
            </motion.div>

            <motion.p className="hero-fade mt-8 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Passionate Software Engineering student focused on AI, backend systems, cloud computing, and modern full-stack development.
            </motion.p>

            <div className="hero-fade mt-6 flex min-h-[3rem] items-center text-lg font-medium text-sky-200 sm:text-xl">
              <span className="mr-3 text-slate-500">{">"}</span>
              <span>{typedRole}</span>
              <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-sky-300" />
            </div>

            <div className="hero-fade mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("#projects")}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-100"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
              >
                Contact Me <Mail className="h-4 w-4" />
              </button>
              <a
                href={person.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
              >
                GitHub <Github className="h-4 w-4" />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-sky-400/40 hover:bg-sky-400/10"
              >
                LinkedIn <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <div className="hero-fade mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlights.map((item) => (
                <Counter key={item.label} value={item.value} label={item.label} detail={item.detail} />
              ))}
            </div>
          </div>

          <div className="order-first relative flex items-center justify-center lg:order-none lg:justify-end">
            <motion.div
              className="glass-card-strong relative w-full max-w-[30rem] overflow-hidden rounded-[2rem] p-6 sm:p-8"
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.24),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.14),transparent_26%)]" />
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
              <div className="relative space-y-5">
                <motion.div
                  className="hero-portrait mx-auto flex w-full justify-center lg:justify-end"
                  initial={{ opacity: 0, y: 22, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
                >
                  <div className="group relative h-56 w-56 rounded-full p-2 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300 via-blue-500 to-cyan-300 opacity-80 blur-xl transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
                    <div className="absolute inset-2 rounded-full border border-white/20 bg-slate-950/70 shadow-[0_0_70px_rgba(56,189,248,0.35)] transition duration-500 group-hover:shadow-[0_0_95px_rgba(56,189,248,0.55)]" />
                    <div className="relative h-full w-full overflow-hidden rounded-full border border-sky-200/40 bg-slate-950 p-1 transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03]">
                      <Image
                        src="/images/profile.jpg"
                        alt={`${person.name} portrait`}
                        fill
                        priority
                        sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
                        className="rounded-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-sky-200">Developer Profile</p>
                    <h3 className="mt-3 font-display text-2xl font-semibold text-white">Backend-first, AI-ready, product-minded.</h3>
                  </div>
                  <div className="rounded-full border border-sky-400/20 bg-sky-400/10 p-3 text-sky-200">
                    <Orbit className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {profileCards.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.26em] text-slate-400">
                        <Icon className="h-3.5 w-3.5 text-sky-300" />
                        {label}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-[1.4rem] border border-sky-400/20 bg-slate-950/60 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-300">
                    <span>Tech focus</span>
                    <span className="inline-flex items-center gap-1 text-sky-300">
                      <Zap className="h-4 w-4" />
                      Internship ready
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["AI", "Backend", "Cloud", "Mobile", "Full Stack"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="grid gap-4 sm:grid-cols-2"
                  style={{ x: translateX, y: translateY }}
                >
                  <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-sky-500/15 to-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.26em] text-sky-200">Current role</p>
                    <p className="mt-3 text-lg font-semibold text-white">{roles[roleIndex]}</p>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-gradient-to-br from-blue-500/15 to-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.26em] text-sky-200">Looking for</p>
                    <p className="mt-3 text-lg font-semibold text-white">Internship opportunities</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="about" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="About"
          title="A practical engineer with a strong product instinct."
          description="Focused on AI, cloud, backend engineering, mobile development, and full stack delivery with the kind of discipline recruiters want to see in an internship candidate."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card reveal-left rounded-[2rem] p-7 sm:p-8">
            <div className="grid gap-5 text-sm leading-7 text-slate-300 sm:grid-cols-2">
              {aboutPoints.map((item) => (
                <div key={item} className="rounded-3xl border border-white/8 bg-white/5 p-5">
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-card reveal-right rounded-[2rem] p-7 sm:p-8">
            <div className="flex items-center gap-3 text-sky-200">
              <Target className="h-5 w-5" />
              <p className="text-sm font-semibold uppercase tracking-[0.28em]">Core strengths</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Problem solving",
                "Continuous learning",
                "System thinking",
                "Clean implementation",
                "AI-assisted productivity",
                "Team collaboration"
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-slate-950/60 p-4 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation with recognition for excellence."
          description="Studying software engineering with experience that blends formal learning, practical development, and technical distinction."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="glass-card reveal-block rounded-[2rem] p-7 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-100">
                  <GraduationCap className="h-4 w-4" />
                  {education.graduation}
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{education.degree}</h3>
                <p className="mt-3 text-base text-slate-300">{education.university}</p>
                <p className="mt-1 text-sm text-slate-400">{education.college}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                <p className="text-slate-400">Expected</p>
                <p className="mt-1 text-2xl font-semibold text-white">2027</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {education.achievements.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="glass-card flex items-center gap-4 rounded-[1.4rem] p-5"
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-sky-300" />
                <span className="text-sm text-slate-200">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Skills"
          title="A stack built for modern products."
          description="Balanced across frontend, backend, data, cloud, and everyday delivery tools used to ship clean work confidently."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="glass-card reveal-block rounded-[1.6rem] p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-sky-200">{group.icon}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/8 bg-white/5 px-3 py-2 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Experience"
          title="Practical delivery across technical and operational work."
          description="A mix of freelance engineering and business operations experience that builds communication, ownership, and real-world execution."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {experience.map((entry, index) => (
            <motion.article
              key={entry.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="glass-card rounded-[1.8rem] p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-200">
                    {index === 0 ? <Code2 className="h-3.5 w-3.5" /> : <BriefcaseBusiness className="h-3.5 w-3.5" />}
                    {index === 0 ? "Engineering" : "Operations"}
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-white">{entry.title}</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-3 text-sky-200">
                  {index === 0 ? <Cpu className="h-5 w-5" /> : <SquareTerminal className="h-5 w-5" />}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-300">{entry.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {entry.bullets.map((item) => (
                  <span key={item} className="rounded-full border border-white/8 bg-slate-950/60 px-3 py-2 text-xs text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Projects"
          title="Selected builds that show range, depth, and execution."
          description="Each card combines product context, engineering stack, and buttons styled for recruiters to inspect the work quickly."
        />
        <div className="mt-12 grid gap-6 xl:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="group glass-card relative overflow-hidden rounded-[2rem] p-7 transition duration-300 hover:-translate-y-1 hover:border-sky-400/30"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.1),transparent_25%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="section-eyebrow text-xs font-semibold uppercase">Project {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 p-3 text-sky-200 shadow-glow transition group-hover:scale-110">
                    <Sparkles className="h-5 w-5" />
                  </div>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">{project.description}</p>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Technologies</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((item) => (
                      <span key={item} className="rounded-full border border-white/8 bg-white/5 px-3 py-2 text-xs text-slate-200">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Features</p>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 rounded-2xl border border-white/8 bg-slate-950/50 px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-slate-100"
                  >
                    GitHub <Github className="h-4 w-4" />
                  </a>
                  <a
                    href={project.demoUrl}
                    target={project.demoUrl.startsWith("http") ? "_blank" : undefined}
                    rel={project.demoUrl.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-sky-400/30 hover:bg-sky-400/10"
                  >
                    Live Demo <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="certifications" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Certifications"
          title="Recognition presented with motion and depth."
          description="Awards and workshop achievements displayed with the same visual care as the rest of the site."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {certifications.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group glass-card relative overflow-hidden rounded-[1.7rem] p-6"
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(96,165,250,0.12),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex items-start gap-4">
                <div className="rounded-2xl border border-sky-400/20 bg-sky-400/10 p-3 text-sky-200">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">{item}</h3>
                  <p className="mt-2 text-sm text-slate-300">Presented as a polished credential card for quick recruiter scanning.</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="github" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="GitHub Showcase"
          title="A clean summary of public code and engineering presence."
          description="Designed to make technical reviewers immediately understand the profile, focus areas, and repository highlights."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass-card reveal-left rounded-[2rem] p-7 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
                <Github className="h-8 w-8" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{person.name}</h3>
                <p className="mt-1 text-sm text-slate-400">GitHub profile card</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4 text-sm text-slate-300">Backend systems, AI apps, and full stack interfaces.</div>
              <div className="rounded-2xl border border-white/8 bg-slate-950/60 p-4 text-sm text-slate-300">Built for internship-ready repositories and clean presentation.</div>
            </div>
            <a
              href={person.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              View GitHub <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="glass-card reveal-right rounded-[2rem] p-7 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-eyebrow text-xs font-semibold uppercase">Contribution graph</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">Visual placeholder with premium styling</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 p-3 text-sky-200">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
            </div>
            <div className="mt-6 grid gap-2 rounded-[1.7rem] border border-white/8 bg-slate-950/60 p-4">
              <div className="grid grid-cols-12 gap-2">
                {Array.from({ length: 72 }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-3 rounded-sm ${index % 9 === 0 ? "bg-sky-300/70" : index % 5 === 0 ? "bg-blue-500/55" : "bg-white/8"}`}
                  />
                ))}
              </div>
              <p className="pt-2 text-sm text-slate-400">A visually polished graph-style block keeps the section recruiter-friendly even without a live API widget.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {githubRepos.map((repo) => (
                <div key={repo.name} className="rounded-3xl border border-white/8 bg-white/5 p-4">
                  <div className={`h-1.5 w-14 rounded-full bg-gradient-to-r ${repo.accent}`} />
                  <h4 className="mt-4 font-semibold text-white">{repo.name}</h4>
                  <p className="mt-2 text-xs uppercase tracking-[0.24em] text-sky-200">{repo.language}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{repo.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionHeading
          eyebrow="Contact"
          title="Ready for internship opportunities and technical conversations."
          description="Use the form or the links below to reach out directly. Everything is presented in a polished, recruiter-friendly layout."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-card rounded-[2rem] p-7 sm:p-8">
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Email</p>
                <a href={`mailto:${person.email}`} className="mt-3 block text-lg font-semibold text-white transition hover:text-sky-300">
                  {person.email}
                </a>
              </div>
              <a href={person.github} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.5rem] border border-white/8 bg-white/5 p-5 transition hover:border-sky-400/30 hover:bg-sky-400/10">
                <span>
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-400">GitHub</span>
                  <span className="mt-2 block text-lg font-semibold text-white">Dewshan905</span>
                </span>
                <Github className="h-5 w-5 text-sky-200" />
              </a>
              <a href={person.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-[1.5rem] border border-white/8 bg-white/5 p-5 transition hover:border-sky-400/30 hover:bg-sky-400/10">
                <span>
                  <span className="block text-xs uppercase tracking-[0.28em] text-slate-400">LinkedIn</span>
                  <span className="mt-2 block text-lg font-semibold text-white">Maleesha Dewshan</span>
                </span>
                <Linkedin className="h-5 w-5 text-sky-200" />
              </a>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="glass-card rounded-[2rem] p-7 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-slate-300">
                Full name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-slate-300">
                Email
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-4 grid gap-2 text-sm text-slate-300">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-sky-400/50"
                placeholder="Tell me about an internship, project, or opportunity."
              />
            </label>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-sm text-slate-400">{formStatus === "sending" ? "Preparing email draft..." : formStatus === "sent" ? "Your email app is opening." : "Fast response through email or LinkedIn."}</p>
            </div>
          </form>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="glass-card flex flex-col gap-4 rounded-[2rem] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">© 2026 Maleesha Dewshan. Built for premium internship applications.</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <a href="#top" className="transition hover:text-white">Back to top</a>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <a href={person.github} target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
            <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showTopButton ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => scrollToSection("#top")}
            className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/30 bg-slate-950/90 text-sky-200 shadow-glow backdrop-blur-xl transition hover:scale-110 hover:bg-slate-900"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
