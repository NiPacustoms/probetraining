import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Kostet das Probetraining etwas?',
    answer: 'Nein, das Probetraining bei der DJK Spvgg Herten ist zu 100% kostenlos und unverbindlich. Kinder und Jugendliche können bei bis zu 2–3 Trainingseinheiten in das Team reinschnuppern, bevor über eine Vereinsanmeldung entschieden wird.'
  },
  {
    question: 'Welche Ausrüstung wird für das erste Training benötigt?',
    answer: 'Für das erste Probetraining genügen normale, bequeme Sportsachen (T-Shirt, kurze oder lange Sporthose), eine Trinkflasche und Sportschuhe. Auf unserem Kunstrasenplatz eignen sich normale Fußballschuhe (Nocken/Multinocken) oder griffige Turnschuhe. Schienbeinschoner werden empfohlen.'
  },
  {
    question: 'Was ist, wenn mein Kind aktuell noch bei einem anderen Verein angemeldet ist?',
    answer: 'Das ist grundsätzlich kein Problem. Wenn dein Kind bereits einen Spielerpass bei einem anderen Verein besitzt, wird für offizielle Probetrainings eine formlose schriftliche Trainingsfreigabe des bisherigen Vereins benötigt. Unser Jugendleiter hilft dir bei Fragen dazu gerne weiter.'
  },
  {
    question: 'Wie schnell meldet sich die Jugendleitung nach dem Absenden?',
    answer: 'In der Regel antwortet unsere Jugendleitung oder der Trainer der betreffenden Altersklasse innerhalb von 24 bis 48 Stunden per E-Mail oder telefonisch, um den passenden Trainingstag abzustimmen.'
  },
  {
    question: 'Kann mein Kind mit Freunden in einer Mannschaft spielen?',
    answer: 'Ja, natürlich! Schreibe uns diesen Wunsch gerne einfach in das Nachrichtenfeld des Anmeldeformulars. Wenn das Alter der Kinder zusammenpasst, trainieren sie selbstverständlich in der gleichen Altersklasse.'
  },
  {
    question: 'Gibt es auch reine Mädchenmannschaften?',
    answer: 'Ja! Bei der DJK Spvgg Herten fördern wir aktiv den Juniorinnenfußball. Mädchen können je nach Altersklasse entweder in unseren Juniorinnenteams oder bei den gemischten Minikicker- und Kinderteams mitspielen.'
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
            <HelpCircle className="w-4 h-4 text-emerald-700" />
            <span>Häufig gestellte Fragen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
            Wissenswertes zum Probetraining
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Hier findest du Antworten auf die wichtigsten Fragen rund um die Anmeldung und den ersten Trainingstag.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:text-emerald-800 transition-colors focus-visible:outline-none focus-visible:bg-neutral-100"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-150 animate-in fade-in duration-150">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact direct note */}
        <div className="mt-8 text-center text-xs text-neutral-500">
          Noch offene Fragen? Unsere Jugendleitung erreichst du direkt unter{' '}
          <a href="mailto:jugend@djkspvggherten.de" className="text-emerald-800 font-bold underline">
            jugend@djkspvggherten.de
          </a>
        </div>

      </div>
    </section>
  );
};
