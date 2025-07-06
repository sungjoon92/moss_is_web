import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainVideo from "@/components/main/home/MainVideo";
import FloatingButton from "@/components/FloatingButton";
import "react-quill-new/dist/quill.snow.css";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="max-w-[1280px] mx-auto">{children}</main>
      <Footer />
      <FloatingButton />
    </>
  );
}
