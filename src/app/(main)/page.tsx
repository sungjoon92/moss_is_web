import Introduction from "@/components/main/home/Introduction";
import Container from "@/components/Container";
import WhatWeDo from "@/components/main/home/WhatWeDo";
import OurSolutions from "@/components/main/home/OurSolutions";
import Media from "@/components/main/home/Media";
import Partner from "@/components/main/home/Partner";

const HomePage: React.FC = () => {
  return (
    <>
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
