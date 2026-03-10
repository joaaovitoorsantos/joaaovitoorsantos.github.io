import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Server, Lightbulb } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Desenvolvimento Full Stack",
    desc: "Aplicações web e mobile com Next.js, React Native e TypeScript",
  },
  {
    icon: Server,
    title: "Arquitetura e Backend",
    desc: "APIs escaláveis, integração de sistemas e banco de dados",
  },
  {
    icon: Lightbulb,
    title: "Consultoria de Produto",
    desc: "Visão estratégica do problema à solução final",
  },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">O que eu faço</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Serviços</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card-hover p-8 flex flex-col items-start gap-4"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                <s.icon size={24} className="text-foreground" />
              </div>
              <h3 className="text-foreground font-semibold text-lg">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
