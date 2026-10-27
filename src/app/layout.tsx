import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import "../../brand/tokens.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#0A1633",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zigo.ng"),
  title: "Zigo Water — Founding Boat Partners | Lagos, handled.",
  description:
    "Register your boat or yacht for Zigo Water. Founding partners receive guaranteed payout rates, launch promotions, and direct WhatsApp onboarding across Lagos waterways.",
  keywords: [
    "Zigo Water",
    "Boat Partner Lagos",
    "Yacht Charter Lagos",
    "Water Taxi Lagos",
    "Five Cowries Creek",
    "Victoria Island Boat",
    "Founding Boat Partners",
  ],
  authors: [{ name: "Zigo Technologies Limited" }],
  openGraph: {
    title: "Zigo Water — Founding Boat Partner Waitlist",
    description:
      "Yachts. Private boats. Commercial boats. Bring your fleet to Zigo Water. Launch target: 50 founding boats by 17 November 2026.",
    url: "https://zigo.ng/partners/water",
    siteName: "Zigo Water",
    images: [
      {
        url: "/images/hero-water.jpg",
        width: 1200,
        height: 675,
        alt: "Zigo Water Founding Boat Partner — Lagos Lagoon",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zigo Water — Founding Boat Partner Waitlist",
    description:
      "Join as a founding boat partner in Lagos. Your rate stays yours. Paid the same day.",
    images: ["/images/hero-water.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/Symbol.png",
    apple: "/Symbol.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="bg-[#0A1633] text-white font-sans antialiased selection:bg-[#19A7CE] selection:text-[#0A1633]">
        <div className="bg-grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
