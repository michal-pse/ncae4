/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import LivingArchitecture from './components/LivingArchitecture';
import InnovationHub from './components/InnovationHub';
import ExpertNetworkModal from './components/ExpertNetworkModal';
import Footer from './components/Footer';
import { Language } from './types';
import { DICTIONARY } from './data';
import { ArrowRight, Star, Shield, Cpu, Zap } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('PL'); // Default to PL according to the original Warsaw/Poland context
  const [expertFormOpen, setExpertFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const dict = DICTIONARY[lang];

  // Set up active section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset header height
      
      const heroSec = document.getElementById('hero');
      const expertiseSec = document.getElementById('expertise');
      const modelingSec = document.getElementById('modeling');
      const insightsSec = document.getElementById('insights');

      if (insightsSec && scrollPosition >= insightsSec.offsetTop) {
        setActiveSection('insights');
      } else if (modelingSec && scrollPosition >= modelingSec.offsetTop) {
        setActiveSection('modeling');
      } else if (expertiseSec && scrollPosition >= expertiseSec.offsetTop) {
        setActiveSection('expertise');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      
      {/* Header component */}
      <Header 
        lang={lang} 
        setLang={setLang} 
        onOpenExpertForm={() => setExpertFormOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Sections */}
      <main id="hero" className="flex-grow scroll-mt-20">
        
        {/* Hero Section */}
        <Hero 
          lang={lang} 
          onOpenExpertForm={() => setExpertFormOpen(true)}
          onScrollToModeling={() => handleScrollToSection('modeling')}
        />

        {/* Feature Highlights (Grid of credentials) */}
        <section className="py-12 bg-white/50 border-y border-outline/10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            <div className="flex items-start gap-3.5 text-left p-4 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-background uppercase tracking-wider">
                  {lang === 'EN' ? 'National Credibility' : 'Krajowa Wiarygodność'}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {lang === 'EN' 
                    ? 'Chartered research center steering regional microgrid pilots.' 
                    : 'Akredytowany ośrodek badawczy sterujący pilotażami mikrosieci.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-left p-4 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary flex-shrink-0 mt-0.5">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-background uppercase tracking-wider">
                  {lang === 'EN' ? 'Hardware Testing' : 'Testy Sprzętowe'}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {lang === 'EN' 
                    ? 'Advanced hardware-in-the-loop facilities for control validation.' 
                    : 'Zaawansowane testy sprzętowe walidujące układy automatyki sieciowej.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-left p-4 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-background uppercase tracking-wider">
                  {lang === 'EN' ? 'Dynamic Tariffing' : 'Taryfikacja Dynamiczna'}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {lang === 'EN' 
                    ? 'Co-coordinating multi-tier dynamic retail pricing structures.' 
                    : 'Koordynacja wielopoziomowych struktur dynamicznych cen energii.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 text-left p-4 rounded-2xl hover:bg-surface transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-on-background uppercase tracking-wider">
                  {lang === 'EN' ? 'Expert Advisory' : 'Doradztwo Eksperckie'}
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {lang === 'EN' 
                    ? 'Providing strategic directives directly to high-voltage operators.' 
                    : 'Dostarczanie strategicznych ekspertyz dla operatorów przesyłowych.'}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Living System Architecture with Interactive Grid Balancer */}
        <LivingArchitecture lang={lang} />

        {/* Centrum Innowacji (Publications list with search, filters, full report modal) */}
        <InnovationHub lang={lang} />

        {/* Final CTA / Call To Action Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low border-t border-outline/10">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-white via-surface to-white rounded-[32px] p-8 sm:p-14 text-center border border-outline/15 shadow-xl relative overflow-hidden energy-glow">
            
            {/* Background energy nodes decoration */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-tertiary/5 rounded-full blur-3xl pointer-events-none" />

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-on-background mb-4">
              {dict.shapeFutureTitle}
            </h2>
            
            <p className="font-sans text-base text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
              {dict.shapeFutureDesc}
            </p>

            <button
              onClick={() => setExpertFormOpen(true)}
              className="bg-on-background text-background font-bold text-sm px-8 py-4 rounded-full hover:bg-primary hover:text-on-primary transition-all active:scale-95 shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{dict.ctaContact}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* Footer component */}
      <Footer 
        lang={lang} 
        onScrollToSection={handleScrollToSection}
        onOpenExpertForm={() => setExpertFormOpen(true)}
      />

      {/* Expert Network Application Form Modal */}
      {expertFormOpen && (
        <ExpertNetworkModal 
          lang={lang} 
          onClose={() => setExpertFormOpen(false)} 
        />
      )}

    </div>
  );
}
