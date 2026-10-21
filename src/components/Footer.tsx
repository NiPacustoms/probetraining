import React from 'react';
import { ClubBadge } from './ClubBadge';
import { Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  onOpenEmailPreview: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmailPreview }) => {
  return (
    <footer id="kontakt" className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Col 1: Club Identity */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <ClubBadge size={44} />
              <div>
                <span className="text-white font-extrabold text-lg font-display tracking-wide block">
                  DJK Spvgg Herten 1907 e.V.
                </span>
                <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block -mt-1">
                  Jugendfußball am Katzenbusch
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Tradition, Teamgeist und Begeisterung für den Fußball seit 1907. Unser Nachwuchs trainiert auf der traditionsreichen Kampfbahn Katzenbusch in Herten.
            </p>

            <div className="pt-2 text-xs text-neutral-500">
              Offizielle Probetraining-Plattform · Anfragen an: <br />
              <strong className="text-white">jugend@djkspvggherten.de</strong>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#jugendmannschaften" className="hover:text-emerald-400 transition-colors">
                  Jugendmannschaften &amp; Jahrgänge
                </a>
              </li>
              <li>
                <a href="#anmeldung" className="hover:text-emerald-400 transition-colors">
                  Probetraining anfragen
                </a>
              </li>
              <li>
                <a href="#ueber-uns" className="hover:text-emerald-400 transition-colors">
                  Jugendkonzept &amp; Werte
                </a>
              </li>
              <li>
                <a href="#trainingsort" className="hover:text-emerald-400 transition-colors">
                  Kampfbahn Katzenbusch
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Häufige Fragen (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Technical Information */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Datenschutz &amp; Transparenz
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Sämtliche Formulardaten werden ausschließlich zur Durchführung des Probetrainings verarbeitet und direkt an die Jugendleitung übermittelt.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenEmailPreview}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>E-Mail-Übertragungslayout einsehen</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} DJK Spvgg Herten 1907 e.V. – Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <span>Vereinsfarben: Rot-Grün-Weiß</span>
            <span aria-hidden="true">·</span>
            <span>Kampfbahn Katzenbusch</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
