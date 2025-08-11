"use client";

import React, { useEffect } from "react";

export default function VirusBSOD({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDone(), 4000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="bsod">
      <pre>
        {`A problem has been detected and Yandows has been shut down to prevent damage to your computer.

IRQL_NOT_LESS_OR_EQUAL

If this is the first time you've seen this stop error screen, restart your computer. If this screen appears again, follow these steps:

Check to make sure any new hardware or software is properly installed.

Technical information:
*** STOP: 0x0000000A (0x00000000,0x00000002,0x00000000,0x804DC11A)`}
      </pre>
      <style jsx>{`
        .bsod {
          position: fixed;
          inset: 0;
          background: #0100a4;
          color: #fff;
          font-family: Consolas, monospace;
          z-index: 100000;
          padding: 40px;
          font-size: 14px;
          line-height: 1.4;
        }
        pre {
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
