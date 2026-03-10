import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  { name: "Estacionamento 239", desc: "Sistema completo de gestão de estacionamentos", img: "/images/estacionamento239.png", tags: ["Next.js", "TypeScript"] },
  { name: "Conveniência 239", desc: "PDV completo em PHP para lojas de conveniência", img: "/images/conveniencia239.png", tags: ["PHP", "MySQL"] },
  { name: "Let's Vou", desc: "Plataforma de locação de veículos B2B e P2P com Next.js", img: "/images/letsvou.png", tags: ["Next.js", "TypeScript"] },
  { name: "ClubHub", desc: "Plataforma de streaming para influenciadores", img: "/images/clubhub.png", tags: ["React", "Node.js"] },
  { name: "Anglo Vestibulinho", desc: "Plataforma de inscrição em React", img: "/images/anglo.png", tags: ["React", "TypeScript"] },
  { name: "VEI Dashboard", desc: "Dashboard de gestão de vistorias internas", img: "/images/vei-dashboard.png", tags: ["React", "Dashboard"] },
  { name: "HappyMobi", desc: "Website institucional", img: "/images/happymobi.jpeg", tags: ["HTML", "CSS"] },
  { name: "VConecta", desc: "Landing page institucional em HTML e CSS", img: "/images/vconecta.jpeg", tags: ["HTML", "CSS"] },
];

const TiltCard = ({ project }: { project: typeof projects[0] }) => {
  const [transform, setTransform] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTransform(`perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setTransform("")}
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className="group glass-card-hover overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img src={project.img} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg">
            <ExternalLink size={14} /> Ver Projeto
          </span>
        </div>
      </div>
      {/* Info */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground">{t}</span>
          ))}
        </div>
        <h3 className="text-foreground font-semibold mb-1">{project.name}</h3>
        <p className="text-sm text-muted-foreground">{project.desc}</p>
      </div>
    </div>
  );
};

const ProjectsWeb = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projetos" className="py-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Portfólio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Projetos Web</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <TiltCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsWeb;
