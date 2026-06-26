import React from 'react';
import { Bolt } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface FooterProps {
  lang: Language;
  onScrollToSection: (id: string) => void;
  onOpenExpertForm: () => void;
}

export default function Footer({ lang, onScrollToSection, onOpenExpertForm }: FooterProps) {
  const dict = DICTIONARY[lang];

  return (
    <footer className="bg-surface-container-lowest w-full pt-20 pb-10 border-t border-outline/10 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-outline/10">
          
          {/* Logo Brand Segment */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-3">
            <div 
              onClick={() => onScrollToSection('hero')} 
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <Bolt className="w-4.5 h-4.5" />
              </div>
              <span className="font-display text-2xl font-black text-primary tracking-tight">NCAE</span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant font-medium leading-relaxed max-w-xs">
              {dict.footerDesc}
            </p>
          </div>

          {/* Quick links & navigation */}
          <div className="col-span-1 md:col-span-2 md:col-start-3 flex flex-col sm:flex-row gap-8 sm:gap-12 justify-start md:justify-end">
            
            <div className="flex flex-col gap-2.5 text-xs font-semibold text-on-surface-variant">
              <span className="text-on-background font-bold uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Research Portal' : 'Portalu Badawczy'}
              </span>
              <button 
                onClick={() => onScrollToSection('expertise')} 
                className="hover:text-primary transition-colors cursor-pointer text-left"
              >
                {dict.navExpertise}
              </button>
              <button 
                onClick={() => onScrollToSection('modeling')} 
                className="hover:text-primary transition-colors cursor-pointer text-left"
              >
                {dict.navModeling}
              </button>
              <button 
                onClick={() => onScrollToSection('insights')} 
                className="hover:text-primary transition-colors cursor-pointer text-left"
              >
                {dict.navInsights}
              </button>
            </div>

            <div className="flex flex-col gap-2.5 text-xs font-semibold text-on-surface-variant">
              <span className="text-on-background font-bold uppercase tracking-wider mb-1">
                {lang === 'EN' ? 'Legal & Info' : 'Informacje Prawne'}
              </span>
              <a href="#" className="hover:text-primary transition-colors text-left">{dict.privacyPolicy}</a>
              <button onClick={onOpenExpertForm} className="hover:text-primary transition-colors text-left cursor-pointer">{dict.contact}</button>
              <a href="#" className="hover:text-primary transition-colors text-left">{dict.pressKit}</a>
              <a href="#" className="hover:text-primary transition-colors text-left">{dict.publications}</a>
            </div>

          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-outline-variant">
          <span>{dict.copyright}</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Grid Core: Active</span>
            </span>
            <span>v2.4.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
