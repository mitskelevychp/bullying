"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalAnchorProps {
  id: string;
  children: React.ReactNode;
}

export function PortalAnchor({ id, children }: PortalAnchorProps) {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.createElement("div");
    el.id = `${id}-portal`;
    el.className = "sr-only";
    document.body.appendChild(el);
    elRef.current = el;

    return () => {
      if (elRef.current) {
        document.body.removeChild(elRef.current);
      }
    };
  }, [id]);

  return elRef.current ? createPortal(children, elRef.current) : null;
}
