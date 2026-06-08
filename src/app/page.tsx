import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HyperContact } from "@/components/hyper/hyper-contact";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingTrabajos } from "@/components/landing/landing-trabajos";
import { LandingDemosShowcase } from "@/components/landing/landing-demos-showcase";
import { LandingCases } from "@/components/landing/landing-cases";
import { LandingServicios } from "@/components/landing/landing-servicios";
import { LandingPlans } from "@/components/landing/landing-plans";
import { LandingTech } from "@/components/landing/landing-tech";
import { LandingSobre } from "@/components/landing/landing-sobre";

export default function Home() {
  return (
    <>
      <Header />
      <LandingHero />
      <LandingStats />
      <LandingTrabajos />
      <LandingDemosShowcase />
      <LandingCases />
      <LandingServicios />
      <LandingPlans />
      <LandingTech />
      <LandingSobre />
      <HyperContact />
      <Footer />
    </>
  );
}
