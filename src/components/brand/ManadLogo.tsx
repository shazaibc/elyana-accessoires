import React from 'react';
import Image from 'next/image';

interface ManadLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export function ManadLogo({ size = 'md', showSubtitle = true, className = '' }: ManadLogoProps) {
  const dimensions = {
    sm: { img: 36, title: 'text-lg', sub: 'text-[7px]' },
    md: { img: 44, title: 'text-xl sm:text-2xl', sub: 'text-[8px]' },
    lg: { img: 60, title: 'text-3xl', sub: 'text-[10px]' }
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className="relative rounded-full overflow-hidden border border-zinc-200/80 bg-white shrink-0 shadow-xs"
        style={{ width: dimensions.img, height: dimensions.img }}
      >
        <Image
          src="/brand/manad-logo.jpg"
          alt="MANAD Store Joaillerie Logo"
          fill
          className="object-contain p-0.5"
          priority
        />
      </div>
      <div className="text-left">
        <span className={`block font-serif ${dimensions.title} font-light tracking-[0.22em] text-zinc-900 leading-none`}>
          MANAD
        </span>
        {showSubtitle && (
          <span className={`block ${dimensions.sub} uppercase tracking-[0.38em] text-[#B89047] font-medium mt-1`}>
            STORE • MAROC
          </span>
        )}
      </div>
    </div>
  );
}
