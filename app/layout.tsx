import "./styles/main.scss";
import "./styles/login.scss";
import "./styles/loading.scss";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Yandows 98 Portfolio",
  description: "A Yandows 98 themed portfolio website",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#008080" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="HandheldFriendly" content="true" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />

        {/* Previne comportamentos indesejados no iOS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              // Previne zoom
              document.addEventListener('gesturestart', function(e) {
                e.preventDefault();
              });
              
              // Previne comportamento de bounce
              document.addEventListener('touchmove', function(e) {
                if (e.scale !== 1) { e.preventDefault(); }
              }, { passive: false });
              
              // Previne zoom com dois dedos
              document.addEventListener('touchstart', function(e) {
                if(e.touches.length > 1) {
                  e.preventDefault();
                }
              }, { passive: false });
              
              // Corrige problemas com 100vh no iOS
              function setHeight() {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', \`\${vh}px\`);
              }
              
              // Executa na carga inicial e no redimensionamento
              window.addEventListener('resize', setHeight);
              window.addEventListener('orientationchange', setHeight);
              setHeight();
            })();
          `,
          }}
        />
      </head>
      <SpeedInsights />
      <body>{children}</body>
    </html>
  );
}
