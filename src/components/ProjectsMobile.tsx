import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const mobileProjects = [
  { name: "VEI", desc: "Aplicativo de vistorias internas", img: "/images/vei-app.jpeg" },
  { name: "Let's Vou", desc: "Aplicativo de locação de veículos", img: "/images/letsvou-app.png" },
  { name: "HappyMobi", desc: "PWA para gestão de aluguel de scooters na praia", img: "/images/happymobi-app.png" },
];

const PhoneMockup = ({ project }: { project: typeof mobileProjects[0] }) => (
  <div className="flex flex-col items-center gap-6 group">
    {/* Phone frame */}
    <div className="relative w-[220px] h-[440px] rounded-[36px] border-2 border-foreground/15 bg-secondary p-2 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-background rounded-b-2xl z-10" />
      {/* Screen */}
      <div className="w-full h-full rounded-[28px] overflow-hidden bg-background">
        <img
          src={project.img}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="text-center">
      <h3 className="text-foreground font-semibold text-lg">{project.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{project.desc}</p>
    </div>
  </div>
);

const ProjectsMobile = () => {
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
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Mobile</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Projetos Mobile</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {mobileProjects.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              <PhoneMockup project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsMobile;
