
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'full', size = 40 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} role="img" aria-label="Solar Gear Ltd Logo">
      {/* The SG Nexus Symbol */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <title>Solar Gear Icon</title>
        <circle cx="50" cy="50" r="48" stroke="url(#logo-grad)" strokeWidth="1" strokeDasharray="4 2" opacity="0.3" />
        <path 
          d="M30 35C30 35 45 20 70 30C95 40 70 70 50 70C30 70 10 50 30 35Z" 
          stroke="#D4AF37" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <path 
          d="M70 65C70 65 55 80 30 70C5 60 30 30 50 30C70 30 90 50 70 65Z" 
          stroke="#D4AF37" 
          strokeWidth="8" 
          strokeLinecap="round" 
          opacity="0.6"
        />
        <circle cx="50" cy="50" r="10" fill="#D4AF37" />
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4AF37" />
            <stop offset="1" stopColor="#B59020" />
          </linearGradient>
        </defs>
      </svg>
      
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className="text-white font-black text-xl leading-none tracking-tighter uppercase">
            SOLAR GEAR<span className="text-gold">.</span>
          </span>
          <span className="text-gold text-[8px] font-bold uppercase tracking-[0.3em] mt-1">
            Nationwide Engineering
          </span>
        </div>
      )}
    </div>
  );
};
