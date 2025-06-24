import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainVideo from "@/components/main/home/MainVideo";
import FloatingButton from "@/components/FloatingButton";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MainVideo />
      <main className="max-w-[1280px] mx-auto">{children}</main>
      <Footer />
      <FloatingButton />
    </>
  );
}
