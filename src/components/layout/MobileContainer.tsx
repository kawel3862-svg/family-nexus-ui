import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("min-h-screen bg-slate-50 flex justify-center", className)}>
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl relative flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};