import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HyperContact } from "@/components/hyper/hyper-contact";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingTrabajos } from "@/components/landing/landing-trabajos";
import { LandingServicios } from "@/components/landing/landing-servicios";
import { LandingProcess } from "@/components/landing/landing-process";
import { LandingSobre } from "@/components/landing/landing-sobre";

export default function Home() {
  return (
    <>
      <Header />
      <LandingHero />
      <LandingStats />
      <LandingTrabajos />
      <LandingServicios />
      <LandingProcess />
      <LandingSobre />
      <HyperContact />
      <Footer />
    </>
  );
}
