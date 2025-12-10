import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <div className="flex flex-1 bg-gradient-to-b from-[#050505] to-[#40403F] -mt-[25px]">
        <main className="flex flex-1 flex-col w-full">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
