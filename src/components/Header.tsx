import React, { useState } from 'react';
import { Bolt, Menu, X, Globe, Activity } from 'lucide-react';
import { Language } from '../types';
import { DICTIONARY } from '../data';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onOpenExpertForm: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({
  lang,
  setLang,
  onOpenExpertForm,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dict = DICTIONARY[lang];

  const menuItems = [
    { id: 'expertise', label: dict.navExpertise },
    { id: 'modeling', label: dict.navModeling },
    { id: 'insights', label: dict.navInsights },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'EN' ? 'PL' : 'EN');
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/85 backdrop-blur-xl border-b border-outline/15 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="logo-button"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center text-on-primary transition-transform duration-300 group-hover:scale-105 group-hover:rotate-12">
            <Bolt className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="font-display text-2xl font-bold tracking-tight text-primary flex items-center gap-1.5">
              <span>NCAE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold leading-none">
              {lang === 'EN' ? 'Energy Research' : 'Krajowe Centrum'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`font-medium transition-colors cursor-pointer text-sm tracking-wide relative py-1 ${
                activeSection === item.id
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Utility / Call to action */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-sm font-semibold text-primary transition-colors cursor-pointer border border-outline/10"
            title={lang === 'EN' ? 'Switch to Polish' : 'Przełącz na angielski'}
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'EN' ? 'PL' : 'EN'}</span>
          </button>

          <button
            onClick={onOpenExpertForm}
            className="bg-gradient-to-r from-primary to-secondary text-on-primary text-xs font-bold px-4 py-2.5 rounded-full hover:energy-glow transition-all active:scale-95 cursor-pointer shadow-sm hover:shadow"
          >
            {dict.ctaJoin}
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-surface-container text-xs font-bold text-primary transition-colors border border-outline/10"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'EN' ? 'PL' : 'EN'}</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary hover:bg-surface-container rounded-lg transition-colors cursor-pointer"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-outline/15 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-4 pb-6 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary-container/20 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-outline/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExpertForm();
                }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-on-primary text-center font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4" />
                {dict.ctaJoin}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
