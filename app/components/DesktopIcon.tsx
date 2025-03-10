"use client";

import React from "react";

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
  return (
    <div className="desktop-icon" onClick={onClick}>
      <div className="icon-image">{svgIcon}</div>
      <div className="icon-text">{name}</div>
    </div>
  );
};

export default DesktopIcon;
