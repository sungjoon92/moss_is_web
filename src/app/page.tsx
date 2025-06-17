import MainVideo from "@/components/home/MainVideo";
import Introduction from "@/components/home/Introduction";
import Container from "@/components/Container";
import WhatWeDo from "@/components/home/WhatWeDo";
import OurSolutions from "@/components/home/OurSolutions";
import Media from "@/components/home/Media";

const HomePage: React.FC = () => {
  return (
    <>
      <MainVideo />
      <Container>
        <Introduction />
        <WhatWeDo />
        <OurSolutions />
        <Media />
      </Container>
    </>
  );
};

export default HomePage;
