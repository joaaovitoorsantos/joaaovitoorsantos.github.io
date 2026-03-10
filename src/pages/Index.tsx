import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Hero from "@/components/Hero";
import ProjectsWeb from "@/components/ProjectsWeb";
import ProjectsMobile from "@/components/ProjectsMobile";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <main>
        <Hero />
        <ProjectsWeb />
        <ProjectsMobile />
        <Services />
        <Footer />
      </main>
    </>
  );
};

export default Index;
