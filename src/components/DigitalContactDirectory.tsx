import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OFFICIAL_YOUTH_TEAMS, YouthTeamDetail } from '../data/youthTeams';
import { TeamCard } from './TeamCard';
import { KatzenbuschModal } from './KatzenbuschModal';
import { ToastNotification } from './ToastNotification';
import { CopyableEmail } from './CopyableEmail';
import { 
  Search, 
  Phone, 
  Calendar, 
  Users, 
  Check, 
  Copy, 
  MapPin, 
  Globe, 
  Instagram, 
  LayoutGrid, 
  TableProperties, 
  Shield, 
  Info,
  ExternalLink,
  ChevronRight,
  Star,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const DigitalContactDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // Favorites stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('djk_favorite_teams');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('djk_favorite_teams', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Could not save favorites to localStorage:', e);
    }
  }, [favorites]);

  const toggleFavorite = (teamId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const isFav = prev.includes(teamId);
      const next = isFav ? prev.filter(id => id !== teamId) : [...prev, teamId];
      setToastMessage(isFav ? 'Aus Favoriten entfernt' : '★ Als Favorit angepinnt!');
      return next;
    });
  };

  const categories = [
    'Alle',
    'G-Jugend',
    'F-Jugend',
    'E-Jugend',
    'D-Jugend',
    'C-Jugend',
    'B-Jugend',
    'Mädchen'
  ];

  const birthYearsList = [2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010];

  const filteredTeams = useMemo(() => {
    return OFFICIAL_YOUTH_TEAMS.filter((team) => {
      // Favorites filter
      if (onlyFavorites && !favorites.includes(team.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'Alle' && team.category !== selectedCategory) {
        return false;
      }

      // Year quick scrubber filter
      if (selectedYear !== null) {
        const inYear = (selectedYear >= team.minYear && selectedYear <= team.maxYear) ||
                       team.birthYears.includes(String(selectedYear));
        if (!inYear) return false;
      }

      // Text search filter
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const nameMatch = team.name.toLowerCase().includes(q) || team.shortName.toLowerCase().includes(q);
      const yearMatch = team.birthYears.toLowerCase().includes(q) || 
                        String(team.minYear).includes(q) || 
                        String(team.maxYear).includes(q);
      const dayMatch = team.trainingDays.toLowerCase().includes(q);
      const coachMatch = team.coaches.some(c => 
        c.name.toLowerCase().includes(q) || 
        (c.phone && c.phone.replace(/[\s-]/g, '').includes(q.replace(/[\s-]/g, '')))
      );

      return nameMatch || yearMatch || dayMatch || coachMatch;
    });
  }, [searchQuery, selectedCategory, selectedYear, onlyFavorites, favorites]);

  const handleCopyPhone = (coachName: string, phone: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setToastMessage(`✓ Telefonnummer von ${coachName} (${phone}) kopiert!`);
    setTimeout(() => {
      setCopiedPhone((cur) => (cur === phone ? null : cur));
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* SLEEK & COMPACT HERO BANNER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-r from-emerald-950 via-emerald-900 to-neutral-900 text-white rounded-2xl p-5 sm:p-6 border border-white/10 shadow-lg overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Main Title & Editorial Kicker */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              <span className="bg-emerald-800/80 text-emerald-100 px-2 py-0.5 rounded border border-emerald-600/40">
                Saison 26 / 27
              </span>
              <span aria-hidden="true">·</span>
              <span>DJK Spvgg Herten 1907 e.V.</span>
              <span aria-hidden="true">·</span>
              <span className="text-red-400">Jugend</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Komm in unser Team!
            </h1>

            <p className="text-neutral-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Trainer- und Kontaktübersicht aller 16 Jugendmannschaften. Wähle unten deinen Jahrgang oder kontaktiere die Trainer direkt.
            </p>
          </div>

          {/* Compact Stadium Location Pill Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsMapOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/15 text-xs text-white transition-all cursor-pointer shadow-sm shrink-0 group active:scale-98 touch-manipulation"
            title="Kampfbahn Katzenbusch Details & Route öffnen"
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-red-500 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="font-bold text-white block">Kampfbahn Katzenbusch</span>
                <span className="text-[10px] text-neutral-300">Katzenbuschstraße 1–3, Herten</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
          </motion.button>

        </div>
      </motion.div>

      {/* INTERACTIVE CONTROLS BAR: SEARCH, YEAR SCRUBBER, CATEGORIES & VIEW SWITCHER */}
      <div className="bg-white rounded-2xl border border-neutral-200/90 p-4 sm:p-5 shadow-sm space-y-4">
        
        {/* Row 1: Search + View Mode + Favorites Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Jahrgang (z.B. 2016), Team, Trainername oder Tag suchen..."
              className="w-full pl-10 pr-10 py-3 text-xs sm:text-sm bg-neutral-50 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-700 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Actions (Full width on smartphone for easy thumb tapping) */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0">
            
            {/* Favorites Toggle */}
            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border min-h-[42px] active:scale-95 touch-manipulation ${
                onlyFavorites
                  ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-amber-400 text-amber-500' : 'text-neutral-400'}`} />
              <span>Favoriten ({favorites.length})</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[34px] active:scale-95 touch-manipulation ${
                  viewMode === 'grid'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Karten</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[34px] active:scale-95 touch-manipulation ${
                  viewMode === 'table'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <TableProperties className="w-3.5 h-3.5" />
                <span>Tabelle</span>
              </button>
            </div>

          </div>

        </div>

        {/* Row 2: Instant Birth Year Scrubber Strip (Touch Momentum) */}
        <div className="pt-1 border-t border-neutral-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
              Schnellwahl nach Geburtsjahr:
            </span>
            {selectedYear !== null && (
              <button
                type="button"
                onClick={() => setSelectedYear(null)}
                className="text-[11px] font-bold text-emerald-800 hover:underline active:opacity-70"
              >
                Filter aufheben
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs font-mono touch-pan-x overscroll-x-contain -mx-1 px-1">
            <button
              type="button"
              onClick={() => setSelectedYear(null)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[34px] flex items-center justify-center active:scale-95 touch-manipulation ${
                selectedYear === null
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              Alle
            </button>
            {birthYearsList.map((yr) => {
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(isSelected ? null : yr)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 cursor-pointer min-h-[34px] flex items-center justify-center active:scale-95 touch-manipulation ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs scale-105'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-emerald-100 hover:text-emerald-900'
                  }`}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Animated Category Tabs (Touch Momentum) */}
        <div className="pt-2 border-t border-neutral-150 flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none text-xs font-semibold relative touch-pan-x overscroll-x-contain -mx-1 px-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-neutral-700 hover:bg-neutral-200/70 bg-neutral-100 font-medium'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryHighlightMillion"
                    className="absolute inset-0 bg-emerald-800 rounded-xl shadow-sm"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}

          <div className="ml-auto text-xs text-neutral-500 font-bold pl-2 whitespace-nowrap hidden sm:block font-mono">
            {filteredTeams.length} {filteredTeams.length === 1 ? 'TEAM' : 'TEAMS'}
          </div>
        </div>

      </div>

      {/* TEAMS CONTENT: GRID OR TABLE */}
      <AnimatePresence mode="wait">
        {filteredTeams.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-neutral-200 p-12 text-center text-neutral-500 space-y-3 shadow-sm"
          >
            <Info className="w-10 h-10 text-neutral-400 mx-auto" />
            <p className="text-base font-bold text-neutral-900">
              Keine Jugendmannschaft für diese Kriterien gefunden.
            </p>
            <p className="text-xs max-w-md mx-auto">
              Versuche einen anderen Suchbegriff oder setze die Filter zurück, um wieder alle 16 Teams zu sehen.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Alle');
                setSelectedYear(null);
                setOnlyFavorites(false);
              }}
              className="px-5 py-2.5 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition cursor-pointer shadow-sm"
            >
              Alle Filter zurücksetzen
            </button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          
          /* Cards Grid */
          <motion.div
            key="grid"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredTeams.map((team, idx) => (
              <TeamCard
                key={team.id}
                team={team}
                index={idx}
                isFavorite={favorites.includes(team.id)}
                onToggleFavorite={toggleFavorite}
                onCopyPhone={handleCopyPhone}
                copiedPhone={copiedPhone}
              />
            ))}
          </motion.div>

        ) : (

          /* High-End Table View */
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm"
          >
            <div className="sm:hidden px-4 py-2 bg-neutral-50 text-[11px] text-neutral-500 border-b border-neutral-200 flex items-center justify-between">
              <span>Tabelle lässt sich seitlich wischen &rarr;</span>
              <span className="font-semibold text-emerald-800">4 Spalten</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[550px] sm:min-w-full">
                <thead>
                  <tr className="bg-neutral-100 text-neutral-800 font-extrabold border-b border-neutral-200 uppercase tracking-wider text-[11px]">
                    <th className="py-4 px-5">Mannschaft</th>
                    <th className="py-4 px-4">Jahrgang</th>
                    <th className="py-4 px-4">Trainingstage &amp; Zeiten</th>
                    <th className="py-4 px-5">Trainerteam &amp; Telefon</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredTeams.map((team) => (
                    <tr
                      key={team.id}
                      className="hover:bg-neutral-50/90 transition-colors"
                    >
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(team.id, e)}
                            className="text-neutral-300 hover:text-amber-500"
                          >
                            <Star className={`w-3.5 h-3.5 ${favorites.includes(team.id) ? 'fill-amber-400 text-amber-500' : ''}`} />
                          </button>
                          <div>
                            <div className="font-extrabold text-neutral-950 text-sm group-hover:text-emerald-800 transition-colors">
                              {team.name}
                            </div>
                            <div className="text-[11px] text-emerald-800 font-bold">
                              {team.category} · {team.ageGroupCode}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono font-bold text-neutral-900 bg-neutral-100 px-2 py-1 rounded-md border border-neutral-200">
                          {team.birthYears}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-bold text-neutral-900">{team.trainingDays}</div>
                        {team.trainingTime && (
                          <div className="text-[11px] text-emerald-800 font-semibold">{team.trainingTime}</div>
                        )}
                      </td>

                      <td className="py-4 px-5" onClick={(e) => e.stopPropagation()}>
                        <div className="space-y-1.5">
                          {team.coaches.map((coach, cIdx) => (
                            <div key={cIdx} className="flex items-center gap-2">
                              <span className="font-bold text-neutral-900">{coach.name}</span>
                              {coach.role && (
                                <span className="text-[10px] text-neutral-400">({coach.role})</span>
                              )}
                              {coach.phone && (
                                <div className="flex items-center gap-1 font-mono text-emerald-800 font-bold text-xs">
                                  <span>·</span>
                                  <a
                                    href={`tel:${coach.phone.replace(/[\s-]/g, '')}`}
                                    className="hover:underline flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded text-[11px]"
                                    title="Anrufen"
                                  >
                                    <Phone className="w-3 h-3 text-emerald-700" />
                                    <span>{coach.phone}</span>
                                  </a>
                                  <button
                                    type="button"
                                    onClick={(e) => handleCopyPhone(coach.name, coach.phone!, e)}
                                    className="text-neutral-400 hover:text-neutral-800 p-1 rounded transition-colors cursor-pointer"
                                    title="Nummer kopieren"
                                  >
                                    <Copy className="w-3 h-3" />
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

        )}
      </AnimatePresence>

      {/* OFFICIAL CONTACT STRIP (HIGH END DIGITAL FLYER FOOTER) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-neutral-800 shadow-2xl relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto text-center space-y-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-red-600/20 text-red-400 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lust auf ein Probetraining?</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
            Nimm direkt Kontakt mit unseren Trainern auf
          </h2>

          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Ruf einfach direkt den Trainer deines Jahrgangs an oder kopiere dir unsere offizielle E-Mail-Adresse. Wir freuen uns über jedes neue Talent an der Kampfbahn Katzenbusch!
          </p>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
            {/* Copy-only Email */}
            <CopyableEmail email="jugend@djkspvggherten.de" variant="dark" />

            <a
              href="http://www.djkspvggherten.de/jugendabteilung"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white transition-all shadow-sm border border-neutral-700"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>djkspvggherten.de/jugendabteilung</span>
            </a>

            <a
              href="https://instagram.com/djkjugend"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800/80 text-white transition-all shadow-sm"
            >
              <Instagram className="w-4 h-4 text-red-400" />
              <span>@djkjugend</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Katzenbusch Ground & Map Modal Popup */}
      <KatzenbuschModal
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
      />

      {/* Floating Animated Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

    </div>
  );
};
