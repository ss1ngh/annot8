import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, IBM_Plex_Mono, Instrument_Serif} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: "italic",
  subsets: ["latin"]
})

const ibmPlexMono = IBM_Plex_Mono ({
  variable: "--font-ibm-plex-mono",
  weight: "400",
  style: "normal",
  subsets: ["latin"]
})

const dmSans = DM_Sans ({
  variable: "--font-dm-sans",
  weight: ["400", "700"],
  style: "normal",
})




export const metadata: Metadata = {
  title: "Annot8",
  description: "Make notes and scribble",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
