import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Smartphone, Server, FileCode, Database } from "lucide-react";

const roles = [
  "Desenvolvedor Full Stack",
  "Next.js & TypeScript",
  "React Native Developer",
];

const techStack = [
  { name: "Next.js", icon: Code2 },
  { name: "TypeScript", icon: FileCode },
  { name: "React Native", icon: Smartphone },
  { name: "Node.js", icon: Server },
  { name: "Github", icon: Database },
];

const Typewriter = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = deleting ? 40 : 80;

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(pause);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
    }, timeout);
    return () => clearTimeout(timer);
  }, [text, deleting, roleIdx]);

  return (
    <span className="text-muted-foreground">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="section-container relative z-10 flex flex-col items-center text-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-36 h-36 rounded-full border-2 border-foreground/30 overflow-hidden animate-pulse-glow">
            <img
              src="/images/profile.png"
              alt="João Vitor dos Santos"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4"
        >
          João Vitor dos Santos
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl font-light mb-6 h-8"
        >
          <Typewriter />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="max-w-xl text-muted-foreground leading-relaxed mb-10 text-sm md:text-base"
        >
          Desenvolvedor Full Stack com foco em criar soluções digitais completas — do backend à interface,
          da ideia ao produto final. Atuo com Next.js, TypeScript, React Native e tecnologias modernas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4 mb-14 justify-center"
        >
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-all duration-300"
          >
            Ver Projetos
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 border border-foreground/30 text-foreground font-medium rounded-lg hover:border-foreground/60 hover:bg-foreground/5 transition-all duration-300"
          >
            Entre em Contato
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {techStack.map((t) => (
            <div
              key={t.name}
              className="group relative flex items-center gap-2 px-4 py-2 glass-card text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300"
            >
              <t.icon size={16} />
              <span>{t.name}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown size={20} className="text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
