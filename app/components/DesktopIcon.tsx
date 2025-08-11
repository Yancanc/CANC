"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface DesktopIconProps {
  name: string;
  svgIcon: React.ReactNode;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  svgIcon,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.set(ref.current, { transformOrigin: "50% 60%" });
  }, []);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1.06,
      y: -2,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale: 1,
      y: 0,
      duration: 0.12,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (!ref.current) {
      onClick();
      return;
    }
    gsap.to(ref.current, {
      scale: 0.96,
      duration: 0.06,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
      onComplete: onClick,
    });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      ref={ref}
      className="desktop-icon"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="button"
      aria-label={name}
      onKeyDown={handleKeyDown}
    >
      <div className="icon-image">{svgIcon}</div>
      <div className="icon-text">{name}</div>
    </div>
  );
};

export default DesktopIcon;
