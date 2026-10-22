import React from 'react';
import { motion } from 'motion/react';
import { YouthTeamDetail } from '../data/youthTeams';
import { ClubStripe } from './ClubStripe';
import { Clock, Calendar, Phone, Copy, Check, Star, MapPin } from 'lucide-react';

interface TeamCardProps {
  team: YouthTeamDetail;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (teamId: string, e: React.MouseEvent) => void;
  onCopyPhone: (coachName: string, phone: string, e: React.MouseEvent) => void;
  copiedPhone: string | null;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/[\s,]+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  index,
  isFavorite,
  onToggleFavorite,
  onCopyPhone,
  copiedPhone
}) => {
  const coachesWithPhone = team.coaches.filter((c) => c.phone);
  const coachesWithoutPhone = team.coaches.filter((c) => !c.phone);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.05 }}
      className={`group/card relative bg-white rounded-2xl flex flex-col overflow-hidden transition-shadow duration-200 shadow-[0_1px_2px_rgba(10,31,20,0.06),0_4px_16px_-6px_rgba(10,31,20,0.12)] hover:shadow-[0_2px_4px_rgba(10,31,20,0.06),0_16px_32px_-12px_rgba(10,31,20,0.28)] ${
        isFavorite ? 'ring-2 ring-amber-400' : 'ring-1 ring-neutral-200'
      }`}
    >
      {/* Kopf: Vereinsgrün */}
      <header className="relative bg-[#0B6E3B] text-white px-5 pt-4 pb-5 overflow-hidden">
        {/* dezente Rasenstreifen */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(90deg,#fff_0,#fff_28px,transparent_28px,transparent_56px)]"
        />
        <div className="relative flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.08em] bg-white/15 px-2 py-1 rounded-md">
              {team.ageGroupCode}
            </span>
            <span className="text-[11px] font-semibold tabular-nums bg-[#06190f]/35 px-2 py-1 rounded-md">
              Jg. {team.birthYears}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => onToggleFavorite(team.id, e)}
            className={`-mr-2 -mt-1 h-10 w-10 shrink-0 flex items-center justify-center rounded-full transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              isFavorite ? 'text-amber-300 bg-white/15' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
            title={isFavorite ? 'Aus Favoriten entfernen' : 'Team merken'}
            aria-label={isFavorite ? 'Aus Favoriten entfernen' : 'Team merken'}
            aria-pressed={isFavorite}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-300' : ''}`} />
          </button>
        </div>

        <h3 className="relative mt-3 text-[2rem] leading-[0.95] font-display tracking-wide text-balance">
          {team.name}
        </h3>
        {team.notes && (
          <p className="relative mt-1.5 text-xs text-white/75 leading-snug">{team.notes}</p>
        )}
      </header>
      <ClubStripe height="h-1" />

      {/* Training */}
      <dl className="grid grid-cols-2 border-b border-neutral-100">
        <div className="px-5 py-3.5 border-r border-neutral-100">
          <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
            <Calendar className="w-3.5 h-3.5 text-[#0B6E3B]" />
            Training
          </dt>
          <dd className="mt-1 text-sm font-bold text-[#0A1F14]">{team.trainingDays}</dd>
        </div>
        <div className="px-5 py-3.5">
          <dt className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
            <Clock className="w-3.5 h-3.5 text-[#0B6E3B]" />
            Uhrzeit
          </dt>
          <dd className="mt-1 text-sm font-bold text-[#0A1F14] tabular-nums">
            {team.trainingTime ? team.trainingTime.replace(' Uhr', '') : '–'}
          </dd>
        </div>
      </dl>

      {/* Trainerteam */}
      <div className="flex-1 flex flex-col px-5 pt-4 pb-5 gap-3">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-neutral-500">
          Trainerteam
        </h4>

        <ul className="flex flex-col gap-2.5">
          {coachesWithPhone.map((coach, cIdx) => {
            const isCopied = copiedPhone === coach.phone;
            return (
              <li key={cIdx} className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    aria-hidden="true"
                    className="w-8 h-8 rounded-full bg-[#0B6E3B]/10 text-[#0B6E3B] flex items-center justify-center font-bold text-[11px] shrink-0 select-none"
                  >
                    {getInitials(coach.name)}
                  </span>
                  <div className="min-w-0 leading-tight">
                    <div className="text-sm font-semibold text-[#0A1F14] truncate">{coach.name}</div>
                    {coach.role && <div className="text-[11px] text-neutral-500">{coach.role}</div>}
                  </div>
                </div>

                <div className="flex items-stretch gap-1.5">
                  <a
                    href={`tel:${coach.phone!.replace(/[\s\-\/]/g, '')}`}
                    className="flex-1 min-h-[44px] px-3.5 rounded-xl bg-[#0B6E3B] hover:bg-[#09572e] active:bg-[#074123] text-white flex items-center justify-between gap-2 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E3B] focus-visible:ring-offset-2"
                    title={`${coach.name} anrufen`}
                    aria-label={`${coach.name} anrufen: ${coach.phone}`}
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <Phone className="w-4 h-4" />
                      Anrufen
                    </span>
                    <span className="text-[13px] font-medium tabular-nums text-white/85">{coach.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={(e) => onCopyPhone(coach.name, coach.phone!, e)}
                    className={`min-h-[44px] w-11 shrink-0 flex items-center justify-center rounded-xl border transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B6E3B] ${
                      isCopied
                        ? 'bg-[#0B6E3B]/10 border-[#0B6E3B]/30 text-[#0B6E3B]'
                        : 'border-neutral-200 text-neutral-500 hover:text-[#0A1F14] hover:bg-neutral-50'
                    }`}
                    title="Nummer kopieren"
                    aria-label={`Nummer von ${coach.name} kopieren`}
                  >
                    {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        {coachesWithoutPhone.length > 0 && (
          <p className="text-xs text-neutral-500 leading-relaxed">
            <span className="font-semibold text-neutral-700">Außerdem im Team: </span>
            {coachesWithoutPhone
              .map((c) => (c.role ? `${c.name} (${c.role})` : c.name))
              .join(', ')}
          </p>
        )}

        <div className="mt-auto pt-2 flex items-center gap-1.5 text-[11px] text-neutral-500">
          <MapPin className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
          Kampfbahn Katzenbusch · Kunstrasen
        </div>
      </div>
    </motion.article>
  );
};
