import "./styles/windows98.scss";
import "./styles/login.scss";
import "./styles/loading.scss";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Yandows 98 Portfolio",
  description: "A Yandows 98 themed portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body>{children}</body>
    </html>
  );
}
