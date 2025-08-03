import type React from "react";

interface InfoBoxProps {
  children: React.ReactNode;
}

export function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-6">
      {children}
    </div>
  );
}
