import React from 'react';
import { CheckCircle2, Calendar, MapPin, Mail, Phone, User, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { ClubBadge } from './ClubBadge';

interface ConfirmationScreenProps {
  data: {
    spielerName: string;
    geburtsjahr: number;
    jugend: string;
    kontaktperson: string;
    email: string;
    telefon: string;
    nachricht?: string;
    id?: string;
    demoMode?: boolean;
  };
  onReset: () => void;
}

export const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ data, onReset }) => {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xl overflow-hidden max-w-3xl mx-auto my-8 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Top Banner in Club Colors */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-950 p-6 sm:p-8 text-white text-center relative border-b-4 border-red-600">
        <div className="inline-flex p-3 rounded-full bg-white/10 backdrop-blur-md mb-4 border border-white/20">
          <CheckCircle2 className="w-12 h-12 text-emerald-400" />
        </div>
        
        {/* MANDATORY EXACT TEXT REQUIRED BY USER SPEC */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white max-w-xl mx-auto leading-snug">
          Vielen Dank! Deine Probetraining-Anfrage ist bei uns eingegangen. Unsere Jugendleitung wird sich bei dir melden.
        </h2>

        <p className="text-emerald-200 text-xs sm:text-sm mt-3">
          Wir haben die Daten an <strong>jugend@djkspvggherten.de</strong> weitergeleitet.
        </p>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        
        {/* Summary Card */}
        <div className="bg-neutral-50 rounded-xl p-5 border border-neutral-200">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <ClubBadge size={28} />
              <span className="font-bold text-neutral-900 text-sm">Zusammenfassung der Anfrage</span>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded">
              Eingegangen
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div>
              <span className="text-neutral-500 block text-xs">Spieler / Spielerin:</span>
              <strong className="text-neutral-900 text-sm font-bold">{data.spielerName}</strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs">Geburtsjahr &amp; Jugendteam:</span>
              <strong className="text-emerald-900 font-bold">
                Jg. {data.geburtsjahr} · {data.jugend}
              </strong>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs">Sorgeberechtigte Kontaktperson:</span>
              <span className="text-neutral-900 font-semibold">{data.kontaktperson}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs">E-Mail-Adresse:</span>
              <span className="text-neutral-900 font-semibold">{data.email}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs">Telefonnummer:</span>
              <span className="text-neutral-900 font-semibold">{data.telefon}</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-xs">Trainingsort:</span>
              <span className="text-neutral-900 font-semibold">Kampfbahn Katzenbusch, Herten</span>
            </div>
          </div>

          {data.nachricht && (
            <div className="mt-4 pt-3 border-t border-neutral-200 text-xs">
              <span className="text-neutral-500 block">Übermittelte Nachricht / Vorerfahrung:</span>
              <p className="text-neutral-800 mt-1 italic bg-white p-2.5 rounded border border-neutral-200/60">
                "{data.nachricht}"
              </p>
            </div>
          )}
        </div>

        {/* What happens next? (3 Steps) */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Wie geht es jetzt weiter?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-neutral-200 bg-white">
              <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs mb-2">
                1
              </div>
              <h4 className="font-bold text-xs text-neutral-900 mb-1">Rückmeldung</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Unsere Jugendleitung oder der jeweilige Jahrgangstrainer meldet sich zeitnah per E-Mail oder Telefon bei dir.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white">
              <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs mb-2">
                2
              </div>
              <h4 className="font-bold text-xs text-neutral-900 mb-1">Terminabsprache</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Gemeinsam stimmen wir den passenden Trainingstag an der Kampfbahn Katzenbusch ab.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-neutral-200 bg-white">
              <div className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs mb-2">
                3
              </div>
              <h4 className="font-bold text-xs text-neutral-900 mb-1">Erstes Training</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Einfach normale Sportsachen, Fußballschuhe (oder Turnschuhe) und eine Trinkflasche mitbringen. Viel Spaß am Ball!
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-500 text-center sm:text-left">
            Fragen vorab? Schreibe uns direkt an <a href="mailto:jugend@djkspvggherten.de" className="text-emerald-800 font-semibold underline">jugend@djkspvggherten.de</a>
          </p>

          <button
            type="button"
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Weitere Anfrage stellen / Zurück
          </button>
        </div>

      </div>
    </div>
  );
};
