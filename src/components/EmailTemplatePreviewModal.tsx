import React from 'react';
import { X, Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import { ClubBadge } from './ClubBadge';

interface EmailTemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmailTemplatePreviewModal: React.FC<EmailTemplatePreviewModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-neutral-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-bold text-sm text-neutral-900">
                E-Mail-Vorschau (Empfänger: jugend@djkspvggherten.de)
              </h3>
              <p className="text-[11px] text-neutral-500">
                So wird die Benachrichtigung serverseitig an die Jugendleitung formatiert
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-lg transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content / Email Mockup */}
        <div className="flex-1 overflow-y-auto p-6 bg-neutral-100/60">
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden text-neutral-800 text-xs sm:text-sm">
            
            {/* Header in Green & Red */}
            <div className="bg-emerald-900 text-white p-5 border-b-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <span className="bg-white text-emerald-900 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1">
                    DJK Spvgg Herten 1907 e.V.
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    Neue Probetraining-Anfrage
                  </h4>
                  <p className="text-emerald-200 text-xs">
                    Jugendabteilung · Kampfbahn Katzenbusch
                  </p>
                </div>
                <ClubBadge size={40} />
              </div>
            </div>

            {/* Email Body Sample */}
            <div className="p-5 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded p-3 text-emerald-900 text-xs">
                <strong>Empfänger:</strong> jugend@djkspvggherten.de<br />
                <strong>Betreff:</strong> Neue Probetraining-Anfrage: Jonas Müller (E-Jugend, Jg. 2016)
              </div>

              <div className="space-y-2 border-b border-neutral-200 pb-3">
                <p className="font-bold text-neutral-900">Angaben zum Spieler:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="text-neutral-500">Spielername:</span>
                  <span className="font-bold text-neutral-900">Jonas Müller</span>
                  <span className="text-neutral-500">Geburtsjahr:</span>
                  <span className="font-semibold text-neutral-900">2016</span>
                  <span className="text-neutral-500">Jugendmannschaft:</span>
                  <span className="font-bold text-emerald-800">E-Jugend (U10 / U11)</span>
                </div>
              </div>

              <div className="space-y-2 border-b border-neutral-200 pb-3">
                <p className="font-bold text-neutral-900">Sorgeberechtigte Kontaktperson:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="text-neutral-500">Name (Elternteil):</span>
                  <span className="font-semibold text-neutral-900">Sabine Müller</span>
                  <span className="text-neutral-500">E-Mail-Adresse:</span>
                  <span className="font-semibold text-emerald-800">eltern@beispiel.de</span>
                  <span className="text-neutral-500">Telefonnummer:</span>
                  <span className="font-semibold text-neutral-900">0170 1234567</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-bold text-neutral-900">Nachricht / Vorerfahrung:</p>
                <div className="bg-neutral-50 p-2.5 rounded border border-neutral-200 text-neutral-700 italic text-xs">
                  "Jonas hat bisher im Schulteam gespielt und möchte jetzt gerne mit Vereinsfußball bei der DJK beginnen."
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded p-2.5 text-[11px] text-red-900">
                <strong>Antwortfunktion:</strong> Die Jugendleitung kann direkt auf diese E-Mail antworten, um mit den Erziehungsberechtigten Kontakt aufzunehmen.
              </div>
            </div>

            <div className="bg-neutral-900 text-neutral-400 p-3 text-center text-[10px]">
              DJK Spvgg Herten 1907 e.V. · Kampfbahn Katzenbusch, Herner Str. 67, 45699 Herten
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-neutral-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
