import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { Services } from "@/components/services";
import { TechStack } from "@/components/tech-stack";
import { Process } from "@/components/process";
import { Cases } from "@/components/cases";
import { Testimonials } from "@/components/testimonials";
import { Team } from "@/components/team";
import { Story } from "@/components/story";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <TechStack />
        <Process />
        <Cases />
        <Testimonials />
        <Team />
        <Story />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
