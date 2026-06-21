import dynamic from 'next/dynamic';
import Hero from "@/components/sections/Hero";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";

const CRMHighlight = dynamic(() => import("@/components/sections/CRMHighlight"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const XcodePromo = dynamic(() => import("@/components/sections/XcodePromo"));
const Team = dynamic(() => import("@/components/sections/Team"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectShowcase />
      <About />
      <Services />
      <CRMHighlight />
      <Projects />
      <XcodePromo />
      <Team />
      <Testimonials />
      <Contact />
    </main>
  );
}
