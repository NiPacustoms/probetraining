import React, { useState, useEffect, useRef } from 'react';
import { YOUTH_TEAMS, getSuggestedTeam } from '../data/youthTeams';
import { ProbetrainingFormData, ApiResponse } from '../types/probetraining';
import { 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Shield, 
  User, 
  Calendar, 
  Mail, 
  Phone, 
  MessageSquare, 
  Users,
  RefreshCw
} from 'lucide-react';

interface ProbetrainingFormProps {
  onSuccess: (submittedData: any) => void;
  selectedTeamId?: string | null;
}

export const ProbetrainingForm: React.FC<ProbetrainingFormProps> = ({ 
  onSuccess,
  selectedTeamId 
}) => {
  // Form State
  const [spielerName, setSpielerName] = useState('');
  const [geburtsjahr, setGeburtsjahr] = useState<number | ''>('');
  const [jugend, setJugend] = useState('');
  const [kontaktperson, setKontaktperson] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [nachricht, setNachricht] = useState('');
  const [dsgvoAccepted, setDsgvoAccepted] = useState(false);
  
  // Anti-spam honeypot (bots tend to fill this hidden field)
  const [honeypot, setHoneypot] = useState('');
  
  // Suggested team state indicator
  const [suggestedTeamName, setSuggestedTeamName] = useState<string | null>(null);
  const [userManuallyChangedTeam, setUserManuallyChangedTeam] = useState(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  
  // Form start time to detect bot instant submissions
  const formStartTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    formStartTimeRef.current = Date.now();
  }, []);

  // Pre-select team if passed via props
  useEffect(() => {
    if (selectedTeamId) {
      const found = YOUTH_TEAMS.find(t => t.id === selectedTeamId || t.name === selectedTeamId);
      if (found) {
        setJugend(found.name);
        setUserManuallyChangedTeam(true);
      }
    }
  }, [selectedTeamId]);

  // Handle Birth Year change & automatic team suggestion
  const handleBirthYearChange = (yearVal: string) => {
    setServerError(null);
    if (!yearVal) {
      setGeburtsjahr('');
      setSuggestedTeamName(null);
      return;
    }

    const yearNum = parseInt(yearVal, 10);
    setGeburtsjahr(isNaN(yearNum) ? '' : yearNum);

    if (!isNaN(yearNum) && yearNum >= 2005 && yearNum <= 2025) {
      const match = getSuggestedTeam(yearNum);
      if (match) {
        setSuggestedTeamName(match.name);
        // Only override if user hasn't deliberately chosen another team
        if (!userManuallyChangedTeam || !jugend) {
          setJugend(match.name);
        }
      } else {
        setSuggestedTeamName(null);
      }
    } else {
      setSuggestedTeamName(null);
    }
  };

  const handleJugendChange = (val: string) => {
    setJugend(val);
    setUserManuallyChangedTeam(true);
    setServerError(null);
    if (validationErrors.jugend) {
      setValidationErrors(prev => ({ ...prev, jugend: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!spielerName.trim()) {
      errors.spielerName = 'Bitte gib den Namen des Spielers oder der Spielerin ein.';
    } else if (spielerName.trim().length < 2) {
      errors.spielerName = 'Der Name muss mindestens 2 Zeichen lang sein.';
    }

    if (!geburtsjahr) {
      errors.geburtsjahr = 'Bitte gib das Geburtsjahr an.';
    } else if (geburtsjahr < 2005 || geburtsjahr > 2024) {
      errors.geburtsjahr = 'Das Geburtsjahr muss zwischen 2005 und 2024 liegen.';
    }

    if (!jugend.trim()) {
      errors.jugend = 'Bitte wähle eine gewünschte Jugendmannschaft aus.';
    }

    if (!kontaktperson.trim()) {
      errors.kontaktperson = 'Bitte gib den Namen des sorgeberechtigten Elternteils / Erziehungsberechtigten an.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = 'Bitte gib eine Kontakt-E-Mail-Adresse an.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Bitte gib eine gültige E-Mail-Adresse ein (z.B. name@beispiel.de).';
    }

    if (!telefon.trim()) {
      errors.telefon = 'Bitte gib eine Telefonnummer für Rückfragen an.';
    } else if (telefon.trim().length < 6) {
      errors.telefon = 'Bitte gib eine vollständige Telefonnummer an.';
    }

    if (!dsgvoAccepted) {
      errors.dsgvo = 'Die Einwilligung zur DSGVO-konformen Verarbeitung der Daten ist erforderlich.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload: ProbetrainingFormData = {
      spielerName: spielerName.trim(),
      geburtsjahr: Number(geburtsjahr),
      jugend: jugend.trim(),
      kontaktperson: kontaktperson.trim(),
      email: email.trim(),
      telefon: telefon.trim(),
      nachricht: nachricht.trim() || undefined,
      dsgvoAccepted,
      honeypot: honeypot.trim(),
      formStartTime: formStartTimeRef.current
    };

    try {
      const response = await fetch('/api/probetraining', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Die Anfrage konnte serverseitig nicht übermittelt werden.');
      }

      // Successful dispatch verified by server
      onSuccess({
        spielerName: payload.spielerName,
        geburtsjahr: payload.geburtsjahr,
        jugend: payload.jugend,
        kontaktperson: payload.kontaktperson,
        email: payload.email,
        telefon: payload.telefon,
        nachricht: payload.nachricht,
        id: data.id,
        demoMode: data.demoMode
      });

    } catch (err: any) {
      console.error('Probetraining submission failed:', err);
      setServerError(
        err.message || 'Es gab ein Problem beim Übermitteln des Formulars. Deine eingegebenen Daten bleiben erhalten. Bitte versuche es erneut.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate list of selectable birth years (from 2007 to 2023)
  const currentYear = new Date().getFullYear();
  const birthYearOptions = Array.from({ length: 17 }, (_, i) => currentYear - 3 - i);

  return (
    <div id="anmeldung" className="scroll-mt-24">
      <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-xl overflow-hidden">
        
        {/* Form Header with Club Colors */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-neutral-900 text-white p-6 sm:p-10 border-b-4 border-red-600">
          <div className="max-w-2xl">
            {/* Metadata Kicker */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
              <span>DJK Spvgg Herten 1907 e.V.</span>
              <span aria-hidden="true">·</span>
              <span>Jugendabteilung</span>
            </div>

            {/* MANDATORY HEADLINE */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-white tracking-tight leading-tight">
              Dein erstes Training. <br className="hidden sm:inline" />
              <span className="text-emerald-400">Vielleicht der Anfang </span>
              <span className="text-red-500">von etwas Großem.</span>
            </h1>

            {/* Location & Intro */}
            <div className="mt-4 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-neutral-300">
              <span className="font-semibold text-white">
                Trainingsort: Kampfbahn Katzenbusch, Herten
              </span>
              <span className="text-neutral-500 hidden sm:inline">·</span>
              <span className="text-emerald-300">100% kostenlos &amp; unverbindlich</span>
            </div>

            <p className="text-neutral-300 text-xs sm:text-sm mt-3 leading-relaxed">
              Fülle einfach das Formular aus. Unsere Jugendleitung erhält deine Angaben direkt per E-Mail an <strong className="text-white">jugend@djkspvggherten.de</strong> und meldet sich zeitnah zur Terminabsprache bei dir.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Server Error Alert Banner */}
          {serverError && (
            <div 
              role="alert" 
              className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 text-sm">
                <p className="font-bold text-red-950">Fehler beim Versenden der Anfrage</p>
                <p className="mt-0.5 text-red-800">{serverError}</p>
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Nochmals versuchen</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Player Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
              <User className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold text-neutral-900">
                1. Angaben zum Spieler / zur Spielerin
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Spielername */}
              <div>
                <label htmlFor="spielerName" className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                  Spielername (Vor- und Nachname) <span className="text-red-600">*</span>
                </label>
                <input
                  id="spielerName"
                  type="text"
                  required
                  value={spielerName}
                  onChange={(e) => {
                    setSpielerName(e.target.value);
                    if (validationErrors.spielerName) {
                      setValidationErrors(prev => ({ ...prev, spielerName: '' }));
                    }
                  }}
                  placeholder="z.B. Jonas Müller"
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    validationErrors.spielerName ? 'border-red-500 bg-red-50/50' : 'border-neutral-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-700 transition`}
                />
                {validationErrors.spielerName && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.spielerName}</p>
                )}
              </div>

              {/* Geburtsjahr */}
              <div>
                <label htmlFor="geburtsjahr" className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                  Geburtsjahr <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="geburtsjahr"
                    type="number"
                    min="2005"
                    max="2024"
                    required
                    value={geburtsjahr}
                    onChange={(e) => handleBirthYearChange(e.target.value)}
                    placeholder="z.B. 2015"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                      validationErrors.geburtsjahr ? 'border-red-500 bg-red-50/50' : 'border-neutral-300 bg-white'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-700 transition`}
                  />
                  <Calendar className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                {validationErrors.geburtsjahr && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.geburtsjahr}</p>
                )}

                {/* Quick select pills for common birth years */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-neutral-500">
                  <span className="text-[11px] font-medium text-neutral-400">Schnellwahl:</span>
                  {[2018, 2016, 2014, 2012, 2010].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => handleBirthYearChange(String(yr))}
                      className="px-2 py-0.5 text-xs font-medium bg-neutral-100 hover:bg-emerald-100 hover:text-emerald-900 rounded text-neutral-700 transition-colors"
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Team Suggestion & Selection Field (Editable) */}
            <div className="pt-2">
              <label htmlFor="jugendSelect" className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                Gewünschte Jugendmannschaft <span className="text-red-600">*</span>
              </label>

              {/* Automatic suggestion banner if matched */}
              {suggestedTeamName && (
                <div className="mb-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold text-emerald-950">
                      Automatische Empfehlung für Jahrgang {geburtsjahr}:
                    </span>{' '}
                    <span className="font-bold underline text-emerald-800">{suggestedTeamName}</span>.
                    <span className="block text-emerald-700 mt-0.5">
                      Die Zuordnung wurde automatisch ausgewählt, kann von dir aber unten jederzeit angepasst werden.
                    </span>
                  </div>
                </div>
              )}

              <div className="relative">
                <select
                  id="jugendSelect"
                  required
                  value={jugend}
                  onChange={(e) => handleJugendChange(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                    validationErrors.jugend ? 'border-red-500 bg-red-50/50' : 'border-neutral-300 bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-700 transition font-medium text-neutral-900`}
                >
                  <option value="" disabled>-- Bitte Jugendmannschaft auswählen --</option>
                  {YOUTH_TEAMS.map((team) => (
                    <option key={team.id} value={team.name}>
                      {team.name} ({team.minYear} – {team.maxYear})
                    </option>
                  ))}
                </select>
              </div>

              {/* Live Info for Selected Team */}
              {(() => {
                const currentTeam = YOUTH_TEAMS.find(t => t.name === jugend);
                if (!currentTeam) return null;
                return (
                  <div className="mt-2.5 p-3 rounded-lg bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900">
                        {currentTeam.name}
                      </span>
                      <span className="text-emerald-800 font-semibold">
                        Jg. {currentTeam.birthYears}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 text-neutral-600">
                      <span><strong>Training:</strong> {currentTeam.trainingDays} {currentTeam.trainingTime ? `(${currentTeam.trainingTime})` : ''}</span>
                      <span>·</span>
                      <span>
                        <strong>Trainer:</strong>{' '}
                        {currentTeam.coaches.map(c => `${c.name}${c.phone ? ` (${c.phone})` : ''}`).join(', ')}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {validationErrors.jugend && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.jugend}</p>
              )}
              <p className="text-xs text-neutral-500 mt-1.5">
                Frei editierbar. Falls dein Kind in einer höheren oder niedrigeren Mannschaft trainieren möchte, wähle einfach das gewünschte Team.
              </p>
            </div>
          </div>

          {/* Section 2: Contact Person (Guardian) */}
          <div className="space-y-4 pt-3">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold text-neutral-900">
                2. Sorgeberechtigte Kontaktperson (Eltern / Erziehungsberechtigte)
              </h3>
            </div>

            <div>
              <label htmlFor="kontaktperson" className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                Name der sorgeberechtigten Kontaktperson <span className="text-red-600">*</span>
              </label>
              <input
                id="kontaktperson"
                type="text"
                required
                value={kontaktperson}
                onChange={(e) => {
                  setKontaktperson(e.target.value);
                  if (validationErrors.kontaktperson) {
                    setValidationErrors(prev => ({ ...prev, kontaktperson: '' }));
                  }
                }}
                placeholder="z.B. Sabine Müller (Mutter)"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                  validationErrors.kontaktperson ? 'border-red-500 bg-red-50/50' : 'border-neutral-300 bg-white'
                } focus:outline-none focus:ring-2 focus:ring-emerald-700 transition`}
              />
              {validationErrors.kontaktperson && (
                <p className="text-xs text-red-600 mt-1">{validationErrors.kontaktperson}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* E-Mail-Adresse */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                  E-Mail-Adresse <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (validationErrors.email) {
                        setValidationErrors(prev => ({ ...prev, email: '' }));
                      }
                    }}
                    placeholder="eltern@beispiel.de"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                      validationErrors.email ? 'border-red-500 bg-red-50/50' : 'border-neutral-300 bg-white'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-700 transition`}
                  />
                  <Mail className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                {validationErrors.email && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.email}</p>
                )}
                <span className="text-[11px] text-neutral-500 block mt-1">
                  Hierhin schicken unsere Trainer die Trainingszeiten und Infos.
                </span>
              </div>

              {/* Telefonnummer */}
              <div>
                <label htmlFor="telefon" className="block text-xs font-bold text-neutral-800 uppercase tracking-wide mb-1.5">
                  Telefonnummer <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    id="telefon"
                    type="tel"
                    required
                    value={telefon}
                    onChange={(e) => {
                      setTelefon(e.target.value);
                      if (validationErrors.telefon) {
                        setValidationErrors(prev => ({ ...prev, telefon: '' }));
                      }
                    }}
                    placeholder="0170 1234567 oder Festnetz"
                    className={`w-full px-3.5 py-2.5 text-sm rounded-lg border ${
                      validationErrors.telefon ? 'border-red-500 bg-red-50/50' : 'border-neutral-300 bg-white'
                    } focus:outline-none focus:ring-2 focus:ring-emerald-700 transition`}
                  />
                  <Phone className="w-4 h-4 text-neutral-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                {validationErrors.telefon && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.telefon}</p>
                )}
                <span className="text-[11px] text-neutral-500 block mt-1">
                  Für eine schnelle telefonische Abstimmung durch die Jugendleitung.
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Optional Message */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 border-b border-neutral-100 pb-2">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-bold text-neutral-900">
                3. Optionale Nachricht / Vorerfahrung
              </h3>
            </div>
            
            <textarea
              id="nachricht"
              rows={3}
              value={nachricht}
              onChange={(e) => setNachricht(e.target.value)}
              placeholder="Hat dein Kind schon in einem Verein gespielt? Bevorzugte Position (Torwart, Feld)? Besondere Wünsche oder Fragen an das Trainerteam?"
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 transition"
            />
          </div>

          {/* Hidden Spam-Protection Honeypot (invisible to humans) */}
          <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
            <label htmlFor="website_hp">Bitte dieses Feld frei lassen:</label>
            <input
              id="website_hp"
              type="text"
              name="website_hp"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          {/* GDPR / DSGVO Checkbox */}
          <div className="pt-2 border-t border-neutral-200">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={dsgvoAccepted}
                onChange={(e) => {
                  setDsgvoAccepted(e.target.checked);
                  if (validationErrors.dsgvo) {
                    setValidationErrors(prev => ({ ...prev, dsgvo: '' }));
                  }
                }}
                className="mt-1 h-4 w-4 rounded border-neutral-300 text-emerald-700 focus:ring-emerald-700 cursor-pointer"
              />
              <span className="text-xs text-neutral-600 leading-normal">
                Ich stimme zu, dass die angegebenen Daten zur Kontaktaufnahme und Organisation des Probetrainings durch die DJK Spvgg Herten 1907 e.V. (Jugendleitung) gemäß unserer Datenschutzerklärung verarbeitet werden. Die Daten werden vertraulich behandelt und nicht an unbefugte Dritte weitergegeben. <span className="text-red-600">*</span>
              </span>
            </label>
            {validationErrors.dsgvo && (
              <p className="text-xs text-red-600 mt-1 pl-7">{validationErrors.dsgvo}</p>
            )}
          </div>

          {/* Submit Action Block */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Sichere E-Mail-Übertragung an <strong>jugend@djkspvggherten.de</strong></span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-3.5 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Wird übermittelt...</span>
                </>
              ) : (
                <>
                  <span>Jetzt Probetraining anfragen</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
