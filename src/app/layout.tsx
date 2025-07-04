import { siteMetadata } from "@/lib/siteMetadata";
import "./globals.css";
import "./reset.css";
import { Manrope, Source_Sans_3 } from "next/font/google";
const manrope = Manrope({ subsets: ["latin"] });
const sourceSans = Source_Sans_3({ subsets: ["latin"] });

export const metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${manrope.className} ${sourceSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
