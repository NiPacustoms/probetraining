import React from 'react';
import { MapPin, Navigation, Car, Bus, Clock, Shield } from 'lucide-react';

export const LocationKatzenbusch: React.FC = () => {
  return (
    <section id="trainingsort" className="py-16 md:py-24 bg-neutral-100/70 border-t border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
            <span>Trainingsort</span>
            <span aria-hidden="true">·</span>
            <span>Heimat der Spvgg</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
            Kampfbahn Katzenbusch, Herten
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Eingebettet in die grüne Parklandschaft des Katzenbuschs – hier trainieren unsere Jugendteams unter optimalen Bedingungen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Key Facts & Directions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm">
            
            <div>
              <div className="flex items-center gap-3 text-emerald-800 mb-3">
                <MapPin className="w-6 h-6 text-red-600 shrink-0" />
                <h3 className="text-xl font-bold text-neutral-900">
                  Adresse für Navigationsgeräte
                </h3>
              </div>
              <p className="text-base font-semibold text-neutral-800 pl-9">
                Kampfbahn Katzenbusch<br />
                Katzenbuschstraße 1–3<br />
                45699 Herten
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-100">
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Parken</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Kostenlose Parkplätze befinden sich direkt am Vereinsgelände an der Katzenbuschstraße.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bus className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-neutral-900">Öffentliche Verkehrsmittel</h4>
                  <p className="text-xs text-neutral-600 mt-0.5">
                    Bushaltestelle „Katzenbusch“ in unmittelbarer Nähe mit direkter Verbindung nach Herten-Mitte und Recklinghausen.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700 space-y-2">
              <div className="flex items-center justify-between font-bold text-neutral-900 border-b border-neutral-200/60 pb-1.5">
                <span>Anlagen-Ausstattung:</span>
                <span className="text-emerald-800">Moderne Infrastruktur</span>
              </div>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-neutral-600">
                <li>✓ Hochmoderner Kunstrasenplatz</li>
                <li>✓ Helle LED-Flutlichtanlage</li>
                <li>✓ Sanierte Mannschaftskabinen</li>
                <li>✓ Familiäres Vereinsheim</li>
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Kampfbahn+Katzenbusch+Katzenbuschstra%C3%9Fe+1-3+45699+Herten"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-lg transition-colors w-full sm:w-auto"
              >
                <Navigation className="w-4 h-4" />
                <span>In Google Maps öffnen</span>
              </a>
            </div>

          </div>

          {/* Right Column: Ground Map Illustration */}
          <div className="lg:col-span-6 bg-gradient-to-br from-emerald-950 via-neutral-900 to-emerald-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col justify-between border border-neutral-800 shadow-xl relative overflow-hidden">
            
            {/* Background field schematic */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                <circle cx="200" cy="150" r="100" stroke="#ffffff" strokeWidth="2" fill="none" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#ffffff" strokeWidth="2" />
              </svg>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Geländeübersicht
                </span>
                <span className="text-xs text-neutral-400">Katzenbuschstraße 1–3</span>
              </div>

              <h3 className="text-2xl font-bold font-display text-white mb-2">
                Der Treffpunkt für dein Probetraining
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Am vereinbarten Trainingstag meldest du dich bitte etwa 10–15 Minuten vor Trainingsbeginn direkt am Kabinentrakt oder sprichst den Trainer der Mannschaft an.
              </p>
            </div>

            {/* Visual Schematic Diagram */}
            <div className="relative z-10 bg-neutral-950/70 rounded-xl p-5 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-medium">1. Ankunft &amp; Parken</span>
                <span className="text-neutral-200">Haupteingang Katzenbuschstraße</span>
              </div>
              <div className="flex items-center justify-between text-xs border-b border-neutral-800 pb-2">
                <span className="text-neutral-400 font-medium">2. Umkleiden &amp; Sanitär</span>
                <span className="text-neutral-200">Kabinentrakt DJK Herten</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400 font-medium">3. Trainingsplatz</span>
                <span className="text-emerald-400 font-bold">Kunstrasen Kampfbahn</span>
              </div>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Jugendabteilung DJK Spvgg Herten</span>
              <span className="text-white font-medium">jugend@djkspvggherten.de</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
