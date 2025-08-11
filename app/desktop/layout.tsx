"use client";

import { LocaleProvider } from "../context/Locale";
import { WindowManagerProvider } from "../context/WindowManager";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LocaleProvider>
      <WindowManagerProvider>
        <main className="desktop">{children}</main>
      </WindowManagerProvider>
    </LocaleProvider>
  );
}
