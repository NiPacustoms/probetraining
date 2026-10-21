import React from 'react';
import { MapPin, ShieldCheck, Users, Calendar, ArrowDown } from 'lucide-react';

interface HeroProps {
  onScrollToForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToForm }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-neutral-950 text-white pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Decorative Pitch Grid & Red-Green Accent Angles */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pitchGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pitchGrid)" />
        </svg>
      </div>

      {/* Red Club Stripe diagonal highlight */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Proposition & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Club metadata kicker (unboxed text with dot separator, no pills) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-emerald-300 uppercase mb-4">
              <span>DJK Spvgg Herten 1907 e.V.</span>
              <span aria-hidden="true">·</span>
              <span>Jugendabteilung</span>
              <span aria-hidden="true">·</span>
              <span>Tradition im Revier</span>
            </div>

            {/* MANDATORY HEADLINE */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] font-display text-white max-w-2xl text-balance">
              Dein erstes Training. <br className="hidden sm:inline" />
              <span className="text-emerald-400">Vielleicht der Anfang </span>
              <span className="text-red-500">von etwas Großem.</span>
            </h1>

            {/* Explanatory text */}
            <p className="mt-6 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
              Komm zur DJK Spvgg Herten an die Kampfbahn Katzenbusch. Wir bieten fußballbegeisterten Kindern und Jugendlichen aller Altersklassen ein herzliches, sportlich fundiertes Vereinsumfeld mit lizenzierten Jugendtrainern, echtem Teamgeist und viel Spielfreude.
            </p>

            {/* Key trust markers strip */}
            <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-neutral-300 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% kostenfrei &amp; unverbindlich</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span>Kampfbahn Katzenbusch, Herten</span>
              </div>
              <span className="text-neutral-600 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Alle Jahrgänge (G- bis A-Jugend)</span>
              </div>
            </div>

            {/* MANDATORY PRIMARY BUTTON */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onScrollToForm}
                className="px-8 py-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-extrabold text-base rounded-xl shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                <span>Jetzt Probetraining anfragen</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href="#jugendmannschaften"
                className="px-6 py-4 bg-neutral-900/60 hover:bg-neutral-800/80 border border-neutral-700/80 text-neutral-200 hover:text-white font-semibold text-sm rounded-xl transition-colors text-center"
              >
                Teams &amp; Jahrgänge ansehen
              </a>
            </div>

            {/* Immediate notice about procedure */}
            <p className="mt-3 text-xs text-neutral-400">
              Direkte Weiterleitung an die Jugendleitung · Keine Mitgliedschaft im Voraus nötig
            </p>
          </div>

          {/* Right Column: Visual Showcase & Katzenbusch Matchday Impression */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
              {/* Pitch Graphical Illustration Container */}
              <div className="relative aspect-[4/3] bg-gradient-to-br from-emerald-900 via-emerald-800 to-green-950 p-6 flex flex-col justify-between">
                
                {/* SVG Tactical Football Pitch Lines */}
                <div className="absolute inset-0 opacity-25">
                  <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                    {/* Outer field line */}
                    <rect x="20" y="20" width="360" height="260" stroke="#ffffff" strokeWidth="2" />
                    {/* Halfway line */}
                    <line x1="200" y1="20" x2="200" y2="280" stroke="#ffffff" strokeWidth="2" />
                    {/* Center circle */}
                    <circle cx="200" cy="150" r="45" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="200" cy="150" r="3" fill="#ffffff" />
                    {/* Left penalty box */}
                    <rect x="20" y="80" width="70" height="140" stroke="#ffffff" strokeWidth="2" />
                    <rect x="20" y="110" width="30" height="80" stroke="#ffffff" strokeWidth="2" />
                    {/* Right penalty box */}
                    <rect x="310" y="80" width="70" height="140" stroke="#ffffff" strokeWidth="2" />
                    <rect x="350" y="110" width="30" height="80" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>

                {/* Top Overlay Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-neutral-700/60 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-white">Kampfbahn Katzenbusch</span>
                  </div>
                  <div className="bg-emerald-600/90 text-white font-bold text-xs px-2.5 py-1 rounded">
                    Saison 2026/27
                  </div>
                </div>

                {/* Center Dynamic Football Badge Visual */}
                <div className="relative z-10 my-auto text-center py-4">
                  <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-inner">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                      {/* Soccer Ball Vector Icon */}
                      <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#166534" strokeWidth="1.75" fill="#ffffff" />
                        <polygon points="12,7 15,10 14,14 10,14 9,10" fill="#166534" />
                        <line x1="12" y1="7" x2="12" y2="2" stroke="#166534" strokeWidth="1.5" />
                        <line x1="15" y1="10" x2="21" y2="8" stroke="#166534" strokeWidth="1.5" />
                        <line x1="14" y1="14" x2="19" y2="19" stroke="#166534" strokeWidth="1.5" />
                        <line x1="10" y1="14" x2="5" y2="19" stroke="#166534" strokeWidth="1.5" />
                        <line x1="9" y1="10" x2="3" y2="8" stroke="#166534" strokeWidth="1.5" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white tracking-wide">
                    Gemeinschaft · Ehrgeiz · Respekt
                  </h3>
                  <p className="text-xs text-neutral-200 mt-1 max-w-xs mx-auto">
                    Von den Minikickern bis zur A-Jugend: Bei der Spvgg zählt jedes Talent.
                  </p>
                </div>

                {/* Bottom Matchday Info Strip */}
                <div className="relative z-10 bg-neutral-950/90 backdrop-blur-md rounded-xl p-3 border border-neutral-700/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Trainingszeiten</span>
                    <span className="font-semibold text-white">Dienstag – Freitag nachmittags</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-400 block text-[11px]">Sportplatz</span>
                    <span className="font-semibold text-emerald-400">Moderner Kunstrasen</span>
                  </div>
                </div>

              </div>

              {/* Lower Info Bar */}
              <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                <span className="font-medium">Katzenbuschstraße 1–3, 45699 Herten</span>
                <span className="text-emerald-400 font-semibold">DJK Herten Jugend</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
