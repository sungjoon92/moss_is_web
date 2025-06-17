import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import MainVideo from "@/components/home/MainVideo";
import Introduction from "@/components/home/Introduction";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import WhatWeDo from "@/components/home/WhatWeDo";
import OurSolutions from "@/components/home/OurSolutions";

const HomePage: React.FC = () => {
  return (
    <>
      <MainVideo />
      <Container>
        <Introduction />
        <WhatWeDo />
        <OurSolutions />
        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>

        <FAQ />

        <Stats />

        <CTA />
      </Container>
    </>
  );
};

export default HomePage;
