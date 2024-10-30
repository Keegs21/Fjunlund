'use client';

import type { Metadata } from "next";
import { Chakra_Petch, Poppins } from "next/font/google";
import "../public/scss/style.scss";
import Bootstrap from "../components/shared/Bootstrap";
import { ThirdwebProvider } from "thirdweb/react";
import { WagmiProvider } from 'wagmi'; // Updated to WagmiConfig
import { config } from '../wagmiConfig';


// export const metadata: Metadata = {
//   title: "Fjunlund",
//   description: "A Decentralized NFT Gaming Platform",
// };
const ChakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--head-font",
});


const PoppinsFont = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--body-font",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThirdwebProvider>
      <WagmiProvider config={config}>
        <html lang="en">
          <Bootstrap>
            <body className={`${ChakraPetch.variable} ${PoppinsFont.variable}`}>
              {children}
            </body>
          </Bootstrap>
        </html>
      </WagmiProvider>
    </ThirdwebProvider>
  );
}
