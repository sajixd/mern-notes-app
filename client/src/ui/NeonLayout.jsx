import React from "react";
import "./neon.css";

export default function NeonLayout({ children }) {
  return (
    <div className="neon-bg">
      <div className="neon-grid" />
      <div className="neon-container">
        <div className="neon-panel" role="main">
          {children}
        </div>
      </div>
      <div className="neon-flares" aria-hidden />
    </div>
  );
}
