import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

interface CopyableEmailProps {
  email?: string;
  className?: string;
  showIcon?: boolean;
  variant?: 'light' | 'dark' | 'badge';
}

export const CopyableEmail: React.FC<CopyableEmailProps> = ({
  email = 'jugend@djkspvggherten.de',
  className = '',
  showIcon = true,
  variant = 'light',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  if (variant === 'dark') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="E-Mail-Adresse kopieren"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white transition-all cursor-pointer border border-neutral-700 text-xs font-mono group select-all ${className}`}
      >
        {showIcon && <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
        <span className="font-semibold">{email}</span>
        {copied ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
            <Check className="w-3 h-3" />
            <span>Kopiert!</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-sans text-neutral-400 group-hover:text-neutral-200">
            <Copy className="w-3 h-3" />
            <span className="hidden sm:inline">Kopieren</span>
          </span>
        )}
      </button>
    );
  }

  if (variant === 'badge') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="E-Mail-Adresse in Zwischenablage kopieren (Kein Mailto)"
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 transition-all cursor-pointer text-xs group select-all shadow-xs ${className}`}
      >
        {showIcon && <Mail className="w-4 h-4 text-emerald-700 shrink-0" />}
        <span className="font-bold font-mono text-emerald-950">{email}</span>
        {copied ? (
          <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-white px-2 py-0.5 rounded shadow-xs">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kopiert!</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-emerald-700 group-hover:text-emerald-900 bg-white px-2 py-0.5 rounded border border-emerald-200/60">
            <Copy className="w-3 h-3" />
            <span>Kopieren</span>
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="E-Mail-Adresse kopieren"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-neutral-100 text-xs text-neutral-800 hover:text-emerald-800 transition-colors cursor-pointer select-all font-medium group border border-neutral-200/60 hover:border-neutral-300 active:scale-95 ${className}`}
    >
      {showIcon && <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />}
      <span className="font-semibold font-mono hidden sm:inline">{email}</span>
      <span className="font-bold text-xs text-emerald-800 sm:hidden">E-Mail kopieren</span>
      {copied ? (
        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
          <Check className="w-3 h-3" />
          <span>Kopiert!</span>
        </span>
      ) : (
        <Copy className="w-3 h-3 text-neutral-400 group-hover:text-emerald-700 transition-colors" />
      )}
    </button>
  );
};
