import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Linkedin, Instagram, Github, Mail, ArrowUpRight } from "lucide-react";

const links = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/joaaovitoorsantos/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/joaaovitoorsantos/" },
  { icon: Github, label: "GitHub", href: "https://github.com/joaaovitoorsantos" },
  { icon: Mail, label: "joaaovitoorsantos@gmail.com", href: "mailto:joaaovitoorsantos@gmail.com" },
];

const Footer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer id="contato" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent" />
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Vamos construir algo juntos?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Entre em contato e vamos transformar sua ideia em realidade.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center gap-4 max-w-md mx-auto"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-6 py-4 glass-card-hover group"
            >
              <div className="flex items-center gap-3">
                <l.icon size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-foreground text-sm font-medium">{l.label}</span>
              </div>
              <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          ))}
        </motion.div>

        <div className="text-center mt-20 text-xs text-muted-foreground/50">
          &copy; {new Date().getFullYear()} João Vitor dos Santos
        </div>
      </div>
    </footer>
  );
};

export default Footer;
