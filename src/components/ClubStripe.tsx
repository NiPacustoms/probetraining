import React from 'react';

interface ClubStripeProps {
  height?: string;
  className?: string;
}

export const ClubStripe: React.FC<ClubStripeProps> = ({ 
  height = 'h-1.5',
  className = '' 
}) => {
  return (
    <div 
      className={`w-full flex shrink-0 ${height} ${className}`} 
      role="presentation" 
      aria-hidden="true"
    >
      {/* Rot */}
      <div className="flex-1 bg-[#C8102E]" />
      {/* Grün */}
      <div className="flex-1 bg-[#0B6E3B]" />
      {/* Weiß */}
      <div className="flex-1 bg-white border-t border-b border-neutral-200/40" />
    </div>
  );
};
