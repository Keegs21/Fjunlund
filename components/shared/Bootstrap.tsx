"use client";
import { ReactNode, useEffect } from "react";

const Bootstrap = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    import("bootstrap");
  }, []);
  return <>{children}</>;
};

export default Bootstrap;