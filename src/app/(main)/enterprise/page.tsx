import Awards from "@/components/main/enterprise/Awards";
import HistoryList from "@/components/main/enterprise/HistoryList";
import IntroSection from "@/components/main/enterprise/IntroSection";
import Mission from "@/components/main/enterprise/Mission";
import Vision from "@/components/main/enterprise/Vision";
import { historyData } from "@/data/historyData";
import { awardsData } from "@/data/awardsData";
import Certificates from "@/components/main/enterprise/Certificates";
import Container from "@/components/Container";

export default function EnterprisePage() {
  return (
    <Container className="">
      <IntroSection />
      <Mission />
      <Vision />
      <HistoryList data={historyData} />
      <Awards data={awardsData} />
      <Certificates />
    </Container>
  );
}
