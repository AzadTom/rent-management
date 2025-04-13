"use client";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ShowModelProp {
  children: ReactNode;
  bg: string;
  onClick: () => void;
  show?: boolean;
}

function ShowModel({ children, bg, onClick, show }: ShowModelProp) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const Model = (
    <div
      onClick={onClick}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: bg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999",
        ...(show ? { backdropFilter: "blur(20px)" } : {}),
      }}
    >
      <div>{children}</div>
    </div>
  );

  return createPortal(Model, document.body);
}

export default ShowModel;
