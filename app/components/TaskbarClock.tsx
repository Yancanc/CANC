"use client";

import { useState, useEffect } from "react";

export default function TaskbarClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Atualiza o relógio a cada minuto
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="taskbar-time">
      {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </div>
  );
}
