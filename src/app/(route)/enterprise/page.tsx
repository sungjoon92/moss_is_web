import HistoryList from "@/components/enterprise/HistoryList";
import IntroSection from "@/components/enterprise/IntroSection";
import Mission from "@/components/enterprise/Mission";
import Vision from "@/components/enterprise/Vision";
import { historyData } from "@/data/historyData";

const EnterprisePage: React.FC = () => {
  return (
    <div className="w-[70%] m-auto flex flex-col justify-center">
      <IntroSection />
      <Mission />
      <Vision />\
      <HistoryList data={historyData} />
    </div>
  );
};

export default EnterprisePage;
