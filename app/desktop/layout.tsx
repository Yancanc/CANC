"use client";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="desktop">{children}</main>;
}
