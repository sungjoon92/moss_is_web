import IntroSection from "@/components/enterprise/IntroSection";
import Mission from "@/components/enterprise/Mission";
import Vision from "@/components/enterprise/Vision";

const EnterprisePage: React.FC = () => {
  return (
    <div className="w-[70%] m-auto flex flex-col justify-center">
      <IntroSection />
      <Mission />
      <Vision />
    </div>
  );
};

export default EnterprisePage;
