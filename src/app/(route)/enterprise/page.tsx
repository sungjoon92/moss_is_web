import Awards from "@/components/enterprise/Awards";
import HistoryList from "@/components/enterprise/HistoryList";
import IntroSection from "@/components/enterprise/IntroSection";
import Mission from "@/components/enterprise/Mission";
import Vision from "@/components/enterprise/Vision";
import { historyData } from "@/data/historyData";
import { awardsData } from "@/data/awardsData";
import Certificates from "@/components/enterprise/Certificates";
import Container from "@/components/Container";
const EnterprisePage: React.FC = () => {
  return (
    <Container>
      <IntroSection />
      <Mission />
      <Vision />
      <HistoryList data={historyData} />
      <Awards data={awardsData} />
      <Certificates />
    </Container>
  );
};

export default EnterprisePage;
