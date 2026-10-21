import React from 'react';
import { YOUTH_TEAMS } from '../data/youthTeams';
import { ArrowRight, Trophy, Sparkles } from 'lucide-react';

interface TeamOverviewProps {
  onSelectTeam: (teamId: string) => void;
}

export const TeamOverview: React.FC<TeamOverviewProps> = ({ onSelectTeam }) => {
  return (
    <section id="jugendmannschaften" className="py-16 md:py-24 bg-neutral-100/70 border-y border-neutral-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
              <span>Altersklassen Saison 2026/27</span>
              <span aria-hidden="true">·</span>
              <span>DJK Spvgg Herten</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
              Unsere Jugendmannschaften im Überblick
            </h2>
          </div>
          <p className="text-sm text-neutral-600 max-w-md">
            Vom ersten Ballkontakt bei den Minikickern bis zum Sprung in den Seniorenbereich – bei der DJK Spvgg Herten fördern wir jedes Kind mit Herz und Verstand.
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {YOUTH_TEAMS.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-xl border border-neutral-200/90 hover:border-emerald-700/60 transition-all p-5 flex flex-col justify-between shadow-sm hover:shadow-md group"
            >
              <div>
                {/* Team Header & Years */}
                <div className="flex items-center justify-between text-xs text-neutral-500 font-medium mb-2.5">
                  <span className="text-emerald-800 font-bold">{team.category}</span>
                  <span>Jg. {team.birthYears}</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-900 transition-colors mb-2">
                  {team.name}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed mb-3">
                  Trainingstage: <strong className="text-neutral-800">{team.trainingDays}</strong>
                </p>

                <div className="text-[11px] bg-neutral-50 p-2.5 rounded-lg border border-neutral-100 mb-4">
                  <span className="text-neutral-400 font-medium block">Trainerteam:</span>
                  <span className="font-semibold text-neutral-800">
                    {team.coaches.map(c => c.name).join(', ')}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectTeam(team.id)}
                className="w-full py-2 px-3 bg-neutral-100 hover:bg-emerald-800 hover:text-white text-neutral-800 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 group-hover:bg-emerald-800 group-hover:text-white cursor-pointer"
              >
                <span>Für {team.name.split(' ')[0]} anfragen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Note on Transition */}
        <div className="mt-8 p-4 bg-white rounded-xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Du bist dir unsicher, welches Team am besten passt? Gib im Formular einfach das Geburtsjahr ein – die App schlägt das optimale Team automatisch vor!
            </span>
          </div>
          <a
            href="#anmeldung"
            className="text-emerald-800 font-bold hover:underline whitespace-nowrap shrink-0"
          >
            Direkt zum Formular &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
