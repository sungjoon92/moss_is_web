import MainVideo from "@/components/home/MainVideo";
import Introduction from "@/components/home/Introduction";
import Container from "@/components/Container";
import WhatWeDo from "@/components/home/WhatWeDo";
import OurSolutions from "@/components/home/OurSolutions";
import Media from "@/components/home/Media";
import Partner from "@/components/home/Partner";

const HomePage: React.FC = () => {
  return (
    <>
      <MainVideo />
      <Container className="items-center">
        <Introduction />
        <WhatWeDo />
        <OurSolutions />
        <Media />
        <Partner />
      </Container>
    </>
  );
};

export default HomePage;
