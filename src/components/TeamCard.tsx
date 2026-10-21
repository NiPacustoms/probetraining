import React from 'react';
import { motion } from 'motion/react';
import { YouthTeamDetail } from '../data/youthTeams';
import { ClubStripe } from './ClubStripe';
import { 
  Clock, 
  Calendar, 
  Phone, 
  Copy, 
  Check, 
  Star, 
  MapPin, 
  ArrowRight,
  Shield
} from 'lucide-react';

interface TeamCardProps {
  team: YouthTeamDetail;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (teamId: string, e: React.MouseEvent) => void;
  onCopyPhone: (coachName: string, phone: string, e: React.MouseEvent) => void;
  copiedPhone: string | null;
}

// Generate coach initials
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
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.15 } }}
      className={`relative bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl ${
        isFavorite
          ? 'border-[#0B6E3B] ring-2 ring-[#0B6E3B]/20'
          : 'border-neutral-200/90 hover:border-[#0B6E3B]/70'
      }`}
    >
      {/* Brand Stripe: Rot – Grün – Weiß */}
      <ClubStripe height="h-1.5" />

      {/* Card Header */}
      <div className="p-5 pb-4 bg-gradient-to-b from-neutral-50/80 to-white border-b border-neutral-100">
        <div className="flex items-start justify-between gap-3 mb-2">
          
          {/* Big Age Badge: e.g. "U11 / E-JUGEND" */}
          <div className="flex items-center gap-2">
            <span className="font-display text-base tracking-wider px-3 py-1 rounded-lg bg-[#0B6E3B] text-white font-bold shadow-xs">
              {team.ageGroupCode} / {team.category.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200 font-mono tabular-nums">
              Jg. {team.birthYears}
            </span>
          </div>

          {/* Favorite Star Button (min 44px touch) */}
          <button
            type="button"
            onClick={(e) => onToggleFavorite(team.id, e)}
            className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors cursor-pointer touch-manipulation ${
              isFavorite
                ? 'text-amber-500 bg-amber-50'
                : 'text-neutral-400 hover:text-amber-500 hover:bg-neutral-100'
            }`}
            title={isFavorite ? 'Aus Favoriten entfernen' : 'Team anpinnen'}
            aria-label={isFavorite ? 'Aus Favoriten entfernen' : 'Team anpinnen'}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Team Title */}
        <h3 className="text-2xl font-black font-display tracking-wide text-[#0A1F14] leading-tight">
          {team.name}
        </h3>

        {team.notes && (
          <p className="text-xs text-neutral-500 mt-1 italic">
            {team.notes}
          </p>
        )}
      </div>

      {/* Card Body */}
      <div className="p-5 space-y-4 flex-1">
        
        {/* Training Schedule with Clock Icon */}
        <div className="bg-[#0B6E3B]/5 rounded-xl p-3.5 border border-[#0B6E3B]/15 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-neutral-700">
            <div className="flex items-center gap-1.5 font-bold text-[#0A1F14]">
              <Calendar className="w-4 h-4 text-[#0B6E3B] shrink-0" />
              <span>Trainingstage:</span>
            </div>
            <span className="font-extrabold text-[#0B6E3B] bg-[#0B6E3B]/10 px-2.5 py-0.5 rounded text-xs font-mono">
              {team.trainingDays}
            </span>
          </div>

          {team.trainingTime && (
            <div className="flex items-center gap-2 text-xs text-neutral-700 pl-5 pt-0.5">
              <Clock className="w-3.5 h-3.5 text-[#0B6E3B] shrink-0" />
              <span className="font-semibold text-[#0A1F14]">{team.trainingTime}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 pl-5">
            <MapPin className="w-3 h-3 text-[#C8102E] shrink-0" />
            <span>Kampfbahn Katzenbusch (Kunstrasen)</span>
          </div>
        </div>

        {/* Coaches List with Avatar Initials & 44px Contact Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-600">
            <span>Trainerteam ({team.coaches.length})</span>
            <span className="text-[10px] text-neutral-400 font-normal">Direktkontakt</span>
          </div>

          <div className="space-y-2">
            {team.coaches.map((coach, cIdx) => (
              <div
                key={cIdx}
                className="p-3 rounded-xl bg-neutral-50 hover:bg-neutral-100/90 border border-neutral-200 transition-colors flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs"
              >
                {/* Coach Name & Avatar with Initials */}
                <div className="flex items-center gap-2.5 min-w-[7rem] flex-1">
                  <div 
                    className="w-8 h-8 rounded-full bg-[#0B6E3B]/15 text-[#0B6E3B] border border-[#0B6E3B]/30 flex items-center justify-center font-black text-xs shrink-0 select-none"
                    aria-hidden="true"
                  >
                    {getInitials(coach.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-[#0A1F14] leading-snug">
                      {coach.name}
                    </div>
                    {coach.role && (
                      <div className="text-[10px] text-[#0B6E3B] font-semibold">
                        {coach.role}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Action Buttons (min 44px touch targets) */}
                {coach.phone ? (
                  <div className="flex items-center gap-1.5 shrink-0">
                    
                    {/* Anrufen Button (min 44px height) */}
                    <a
                      href={`tel:${coach.phone.replace(/[\s\-\/]/g, '')}`}
                      className="min-h-[44px] px-3 bg-[#0B6E3B] hover:bg-[#09572e] active:bg-[#074123] text-white font-mono text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 active:scale-95 touch-manipulation"
                      title={`${coach.name} anrufen (${coach.phone})`}
                      aria-label={`${coach.name} anrufen (${coach.phone})`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span className="tabular-nums">{coach.phone}</span>
                    </a>

                    {/* Copy Button (min 44px touch target) */}
                    <button
                      type="button"
                      onClick={(e) => onCopyPhone(coach.name, coach.phone!, e)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-500 hover:text-[#0A1F14] hover:bg-neutral-200 active:bg-neutral-300 rounded-xl transition-colors cursor-pointer touch-manipulation border border-neutral-200"
                      title="Telefonnummer in Zwischenablage kopieren"
                      aria-label="Telefonnummer kopieren"
                    >
                      {copiedPhone === coach.phone ? (
                        <Check className="w-4 h-4 text-[#0B6E3B]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                  </div>
                ) : (
                  <span className="text-neutral-400 text-xs italic self-start sm:self-auto py-2">
                    Trainerteam
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>


    </motion.div>
  );
};
