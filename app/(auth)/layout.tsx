import Navbar from "@/components/shared/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar isTransparent={true} />
      {children}
    </>
  );
}
