
import React from 'react';
import { Sun, Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'full', size = 40 }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} role="img" aria-label="Solar Gear Ltd Logo">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-gold/20 animate-spin-slow"></div>
        
        {/* Solar Panel Hexagon Icon */}
        <div className="bg-charcoal dark:bg-zinc-800 p-2 rounded-xl border border-white/10 shadow-lg flex items-center justify-center transform rotate-12 group-hover:rotate-0 transition-transform">
          <Sun size={size * 0.5} className="text-gold" />
          <Zap size={size * 0.25} className="text-white absolute bottom-1 right-1" />
        </div>
      </div>
      
      {variant === 'full' && (
        <div className="flex flex-col">
          <span className="text-charcoal dark:text-white font-black text-xl leading-none tracking-tighter uppercase">
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
