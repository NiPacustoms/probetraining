import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Car, Bus, Navigation, Shield, Check } from 'lucide-react';

interface KatzenbuschModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KatzenbuschModal: React.FC<KatzenbuschModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-neutral-950/70 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window: Mobile Bottom Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden z-10"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-neutral-900 text-white p-5 sm:p-6 border-b-4 border-red-600 relative shrink-0">
            {/* Mobile Sheet Handle */}
            <div className="sm:hidden w-10 h-1 bg-white/30 rounded-full mx-auto mb-3" />
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
              aria-label="Modal schließen"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Sportanlage &amp; Trainingsort</span>
            </div>

            <h3 className="text-2xl font-extrabold font-display text-white tracking-tight">
              Kampfbahn Katzenbusch
            </h3>

            <p className="text-xs text-neutral-300 mt-1">
              Die traditionsreiche Heimspielstätte der DJK Spvgg Herten 1907 e.V.
            </p>
          </div>

          {/* Body: Scrollable on Mobile */}
          <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 text-xs sm:text-sm overflow-y-auto flex-1 overscroll-contain">
            
            {/* Address Box */}
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-neutral-500 text-xs block font-medium">Navigationsadresse:</span>
              <strong className="text-base text-neutral-900 block font-bold">
                Katzenbuschstraße 1–3<br />
                45699 Herten
              </strong>
              <span className="text-xs text-emerald-800 font-semibold block pt-1">
                Gelegen im Volkspark Katzenbusch
              </span>
            </div>

            {/* Travel Directions */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-150">
                <Car className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">Anreise mit dem PKW &amp; Parken</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Kostenlose Parkplätze stehen direkt an der Anlage und entlang der Zufahrt zur Verfügung.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-150">
                <Bus className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-neutral-900">Öffentlicher Nahverkehr</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Bushaltestelle in unmittelbarer fußläufiger Entfernung mit direkter Anbindung an den Hertener ZOB und Hauptbahnhof Recklinghausen.
                  </p>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 text-xs space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-700" />
                <span>Ausstattung am Katzenbusch:</span>
              </h4>
              <ul className="grid grid-cols-2 gap-2 text-emerald-900">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Moderner Kunstrasen</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Flutlichtanlage</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Sanierte Kabinen</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Vereinsheim</span>
                </li>
              </ul>
            </div>

            {/* Action Google Maps */}
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Katzenbuschstra%C3%9Fe+1-3+45699+Herten"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Route in Google Maps berechnen</span>
              </a>
            </div>

          </div>

          {/* Footer */}
          <div className="p-4 pb-6 sm:pb-4 bg-neutral-100 border-t border-neutral-200 flex justify-end shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950 text-white text-xs font-bold rounded-xl transition-all cursor-pointer active:scale-95 touch-manipulation shadow-xs"
            >
              Schließen
            </button>
          </div>

        </motion.div>

      </div>
    </AnimatePresence>
  );
};
