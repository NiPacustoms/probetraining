import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

interface CopyableEmailProps {
  email?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * E-Mail-Adresse als echter mailto-Link (öffnet das Mailprogramm),
 * daneben ein kleiner Kopieren-Button für Webmail-Nutzer.
 */
export const CopyableEmail: React.FC<CopyableEmailProps> = ({
  email = 'jugend@djkspvggherten.de',
  className = '',
  variant = 'light',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Zwischenablage nicht verfügbar – Adresse ist trotzdem sichtbar */
    }
  };

  const dark = variant === 'dark';

  return (
    <span
      className={`inline-flex items-stretch rounded-xl overflow-hidden border text-sm ${
        dark ? 'border-white/15 bg-white/5' : 'border-neutral-200 bg-white'
      } ${className}`}
    >
      <a
        href={`mailto:${email}`}
        title="E-Mail schreiben"
        className={`inline-flex items-center gap-2 px-3 min-h-[40px] font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
          dark
            ? 'text-white hover:bg-white/10 focus-visible:ring-white'
            : 'text-[#0A1F14] hover:bg-[#0B6E3B]/5 hover:text-[#0B6E3B] focus-visible:ring-[#0B6E3B]'
        }`}
      >
        <Mail className={`w-4 h-4 shrink-0 ${dark ? 'text-emerald-400' : 'text-[#0B6E3B]'}`} />
        <span className="hidden sm:inline">{email}</span>
        <span className="sm:hidden">E-Mail</span>
      </a>
      <button
        type="button"
        onClick={handleCopy}
        title="Adresse kopieren"
        aria-label="E-Mail-Adresse kopieren"
        className={`w-10 shrink-0 flex items-center justify-center border-l transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
          dark
            ? 'border-white/15 text-white/60 hover:text-white hover:bg-white/10 focus-visible:ring-white'
            : 'border-neutral-200 text-neutral-400 hover:text-[#0B6E3B] hover:bg-[#0B6E3B]/5 focus-visible:ring-[#0B6E3B]'
        }`}
      >
        {copied ? (
          <Check className={`w-4 h-4 ${dark ? 'text-emerald-400' : 'text-[#0B6E3B]'}`} />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </span>
  );
};
