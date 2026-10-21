/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { DigitalContactDirectory } from './components/DigitalContactDirectory';
import { CopyableEmail } from './components/CopyableEmail';
import jugendLogo from './assets/djk_jugend_logo_sm.webp';
import { MapPin, Globe, Instagram, ArrowUp } from 'lucide-react';

export default function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 24);
      setShowScrollTop(latest > 320);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-900 selection:bg-emerald-800 selection:text-white relative">
      
      {/* Top Header with Dynamic Shadow & Official DJK Crest */}
      <header
        className={`bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-shadow duration-200 border-b border-neutral-200 ${
          isScrolled ? 'shadow-md border-neutral-300' : 'shadow-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Club Identity */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <img
              src={jugendLogo}
              alt="Logo DJK Spvgg Herten 1907 Jugend"
              width={56}
              height={56}
              className="w-11 h-11 sm:w-14 sm:h-14 object-contain shrink-0 drop-shadow-sm hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="font-extrabold text-sm sm:text-xl tracking-tight text-neutral-950 font-display">
                DJK Spvgg Herten 1907 e.V.
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-emerald-800 uppercase tracking-wider -mt-0.5">
                Jugendabteilung · Katzenbusch
              </div>
            </div>
          </div>

          {/* Location & Copyable Email (No mailto) */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs text-neutral-600">
            <div className="hidden md:flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Katzenbuschstraße 1–3, 45699 Herten</span>
            </div>
            <span className="hidden md:inline text-neutral-300">·</span>
            
            {/* Copy-only Email */}
            <CopyableEmail email="jugend@djkspvggherten.de" variant="light" />
          </div>

        </div>

        {/* Scroll Progress Bar (Emerald to Red Club Accent Gradient) */}
        <motion.div
          className="h-1 bg-gradient-to-r from-emerald-800 via-emerald-600 to-red-600 origin-left"
          style={{ scaleX }}
        />
      </header>

      {/* Main Content Area: Digital Contact Directory (Saison 26 / 27) */}
      <main className="flex-1 py-4 sm:py-8 px-3.5 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <DigitalContactDirectory />
        </div>
      </main>

      {/* Footer with Club Information & Copyable Email */}
      <footer className="bg-neutral-950 text-neutral-400 py-8 text-xs border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="font-bold text-white text-sm">
                DJK Spvgg Herten 1907 e.V. – Jugendabteilung
              </div>
              <div className="text-neutral-400 text-xs mt-0.5">
                Kampfbahn Katzenbusch · Katzenbuschstraße 1–3, 45699 Herten
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-300">
              {/* Copy-only Email in Footer */}
              <CopyableEmail email="jugend@djkspvggherten.de" variant="dark" />

              <a
                href="http://www.djkspvggherten.de/jugendabteilung"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-neutral-400" />
                <span>djkspvggherten.de</span>
              </a>

              <a
                href="https://instagram.com/djkjugend"
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-red-400 transition-colors inline-flex items-center gap-1.5"
              >
                <Instagram className="w-3.5 h-3.5 text-red-500" />
                <span>@djkjugend</span>
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
            <span>© 2026 DJK Spvgg Herten 1907 e.V. · Alle Rechte vorbehalten</span>
            <span>Kampfbahn Katzenbusch · Katzenbuschstraße 1–3, 45699 Herten</span>
          </div>
        </div>
      </footer>

      {/* Floating Animated Scroll-To-Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 p-3 sm:px-3.5 sm:py-2.5 rounded-full bg-emerald-950/90 hover:bg-emerald-900 active:bg-emerald-950 text-white shadow-2xl border border-emerald-600/60 backdrop-blur-md transition-all cursor-pointer flex items-center gap-2 group hover:shadow-emerald-900/30 hover:scale-105 active:scale-95 touch-manipulation"
            title="Nach ganz oben scrollen"
          >
            <ArrowUp className="w-4 h-4 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
            <span className="text-xs font-bold pr-1 hidden sm:inline">Nach oben</span>
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
