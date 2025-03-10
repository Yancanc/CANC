import "./styles/windows98.scss";
import "./styles/login.scss";
import "./styles/loading.scss";
import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
