import React from 'react';
import { ClubBadge } from './ClubBadge';

interface NavbarProps {
  onOpenForm: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenForm }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (one line) */}
        <a
          href="#"
          className="flex items-center gap-3 text-neutral-900 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-lg p-1"
        >
          <ClubBadge size={44} />
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-950 font-display">
              DJK Spvgg Herten 1907
            </span>
            <span className="text-xs font-semibold text-emerald-800 tracking-wider uppercase -mt-1">
              Jugendabteilung
            </span>
          </div>
        </a>

        {/* Zone 2: Clean 4–5 nav links, single-line text */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-700">
          <a
            href="#jugendmannschaften"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Jugendteams
          </a>
          <a
            href="#ueber-uns"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Über uns
          </a>
          <a
            href="#trainingsort"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Katzenbusch
          </a>
          <a
            href="#faq"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Häufige Fragen
          </a>
          <a
            href="#kontakt"
            className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Kontakt
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenForm}
            className="px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
          >
            Jetzt Probetraining anfragen
          </button>
        </div>
      </div>
    </header>
  );
};
