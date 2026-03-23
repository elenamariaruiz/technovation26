import { useState, useEffect } from "react";

interface ScreenWrapperProps {
  children: React.ReactNode;
  screenKey: string;
}

const ScreenWrapper = ({ children, screenKey }: ScreenWrapperProps) => (
  <div key={screenKey} className="animate-fade-in min-h-screen flex flex-col">
    {children}
  </div>
);

export default ScreenWrapper;
