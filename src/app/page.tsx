import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HyperContact } from "@/components/hyper/hyper-contact";
import { ScrollProgress } from "@/components/primitives";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingMarqueeBand } from "@/components/landing/landing-marquee-band";
import { LandingTrabajos } from "@/components/landing/landing-trabajos";
import { LandingDemosShowcase } from "@/components/landing/landing-demos-showcase";
import { LandingCases } from "@/components/landing/landing-cases";
import { LandingServicios } from "@/components/landing/landing-servicios";
import { LandingPlans } from "@/components/landing/landing-plans";
import { LandingTech } from "@/components/landing/landing-tech";
import { LandingSobre } from "@/components/landing/landing-sobre";
import { LandingCloser } from "@/components/landing/landing-closer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <LandingHero />
      <LandingStats />
      <LandingMarqueeBand />
      <LandingTrabajos />
      <LandingDemosShowcase />
      <LandingCases />
      <LandingServicios />
      <LandingPlans />
      <LandingTech />
      <LandingSobre />
      <LandingCloser />
      <HyperContact />
      <Footer />
    </>
  );
}
