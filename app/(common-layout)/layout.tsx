import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/navbar/Navbar";
import SplitTextAnimations from "@/utils/SplitTextAnim";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar isTransparent={true} />
      {children}
      <Footer />
      <SplitTextAnimations />
    </>
  );
}
