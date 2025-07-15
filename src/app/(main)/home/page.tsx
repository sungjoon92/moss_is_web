import Container from "@/components/Container";
import MainVideo from "@/components/main/home/MainVideo";
import WhyStarted from "@/components/main/home/WhyStarted";
import WhyMoss from "@/components/main/home/WhyMoss";
import OurPath from "@/components/main/home/OurPath";
import Campaign from "@/components/main/home/Campaign";
import History from "@/components/main/home/History";
import { historyData } from "@/data/historyData";

export default async function HomePage() {
  return (
    <>
      <Container className="w-full px-4 md:px-10 lg:px-20 py-16 space-y-24">
        <MainVideo />
        <WhyStarted />
        <WhyMoss />
        <OurPath />
        <Campaign />
        <History data={historyData} />
      </Container>
    </>
  );
}

// SSR 페이지로 설정
// export const dynamic = "force-dynamic";

// ISR 설정
// 페이지를 30초마다 재빌드하여 최신 데이터를 반영
export const revalidate = 10;
