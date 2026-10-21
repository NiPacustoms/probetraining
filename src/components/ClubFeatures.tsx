import React from 'react';
import { HeartHandshake, Award, Shield, Footprints, Flame, Trophy } from 'lucide-react';

export const ClubFeatures: React.FC = () => {
  return (
    <section id="ueber-uns" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Chapter Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-2">
            <span>DJK Spvgg Herten 1907 e.V.</span>
            <span aria-hidden="true">·</span>
            <span>Jugendphilosophie</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
            Warum Jugendfußball am Katzenbusch?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
            Als Traditionsverein im Herzen des Ruhrgebiets verbinden wir sportliche Ambition mit familiären Werten. Bei uns steht die persönliche und fußballerische Entwicklung jedes einzelnen Kindes im Mittelpunkt.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-emerald-700/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Teamgeist &amp; Fairplay
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Respekt vor Mitspielern, Gegnern und Schiedsrichtern. Bei der DJK lernen Kinder, füreinander einzustehen – auf und neben dem Platz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-emerald-700/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-red-700 text-white flex items-center justify-center mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Lizenzierte Trainer
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Unsere Jugendübungsleiter schulen nach modernen DFB-Ausbildungsrichtlinien: Viel Ballkontakt, kindgerechte Spielformen und altersgerechte Taktik.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-emerald-700/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center mb-5">
              <Footprints className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Kampfbahn Katzenbusch
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Trainieren und spielen auf unserer modernen Sportanlage mit gepflegtem Kunstrasen, Flutlicht und zeitgemäßen Kabinen im grünen Katzenbusch.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-emerald-700/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white flex items-center justify-center mb-5">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Perspektive bis zu den Senioren
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Ein durchgängiges Konzept von den Bambinis bis zur A-Jugend ermöglicht jedem Talent eine nachhaltige fußballerische Heimat im Verein.
            </p>
          </div>

        </div>

        {/* Quote banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950 to-neutral-900 text-white border-l-0 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              DJK Grundsatz
            </span>
            <p className="text-lg sm:text-xl font-bold font-display tracking-tight text-white">
              „Sport mit Sinn: Wir formen nicht nur Fußballer, sondern Persönlichkeiten.“
            </p>
            <p className="text-xs text-neutral-300">
              Jugendvorstand &amp; Trainerstab · DJK Spvgg Herten 1907 e.V.
            </p>
          </div>

          <a
            href="#anmeldung"
            className="px-6 py-3 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-md"
          >
            Jetzt Probetraining anfragen
          </a>
        </div>

      </div>
    </section>
  );
};
