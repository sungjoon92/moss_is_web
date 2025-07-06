import Introduction from "@/components/main/home/Introduction";
import Container from "@/components/Container";
import WhatWeDo from "@/components/main/home/WhatWeDo";
import OurSolutions from "@/components/main/home/OurSolutions";
import Media from "@/components/main/home/Media";
import Partner from "@/components/main/home/Partner";
import MainVideo from "@/components/main/home/MainVideo";

const HomePage: React.FC = () => {
  return (
    <>
      <Container className="items-center">
        <MainVideo />
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
// SSR 페이지로 설정
// export const dynamic = "force-dynamic";

// ISR 설정
// 페이지를 30초마다 재빌드하여 최신 데이터를 반영
export const revalidate = 10;