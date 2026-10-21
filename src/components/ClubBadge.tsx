import React from 'react';

interface ClubBadgeProps {
  className?: string;
  size?: number;
}

export const ClubBadge: React.FC<ClubBadgeProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Wappen DJK Spvgg Herten 1907 e.V."
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14532d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
        <linearGradient id="redAccent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
      </defs>

      {/* Classic Shield Silhouette */}
      <path
        d="M50 4 L88 16 C88 56 68 84 50 96 C32 84 12 56 12 16 Z"
        fill="url(#shieldGrad)"
        stroke="#ffffff"
        strokeWidth="3.5"
      />

      {/* Inner Decorative Red Stripe */}
      <path
        d="M50 8 L82 18 C82 32 78 48 70 60 L30 60 C22 48 18 32 18 18 Z"
        fill="url(#redAccent)"
        opacity="0.95"
      />

      {/* Center White Chevron Banner */}
      <polygon
        points="22,34 78,34 74,48 26,48"
        fill="#ffffff"
      />

      {/* Cross of DJK (Deutsche Jugendkraft) stylized */}
      <rect x="47" y="16" width="6" height="28" fill="#ffffff" rx="1" />
      <rect x="39" y="24" width="22" height="6" fill="#ffffff" rx="1" />

      {/* Text DJK */}
      <text
        x="50"
        y="44"
        textAnchor="middle"
        fill="#14532d"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="11"
        letterSpacing="1"
      >
        DJK
      </text>

      {/* Text HERTEN */}
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fill="#ffffff"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="9.5"
        letterSpacing="1.2"
      >
        HERTEN
      </text>

      {/* 1907 Founding Year */}
      <text
        x="50"
        y="85"
        textAnchor="middle"
        fill="#fca5a5"
        fontFamily="sans-serif"
        fontWeight="700"
        fontSize="7.5"
        letterSpacing="0.8"
      >
        1907
      </text>
    </svg>
  );
};
