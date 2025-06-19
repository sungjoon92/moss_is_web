import Link from "next/link";

const FloatingButton: React.FC = () => {
  return (
    <Link
      href="/contact"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all"
    >
      문의하기
    </Link>
  );
};

export default FloatingButton;
