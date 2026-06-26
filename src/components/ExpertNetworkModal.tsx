import React, { useState } from 'react';
import { X, Check, Users, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Language, ExpertApplication } from '../types';
import { DICTIONARY } from '../data';

interface ExpertNetworkModalProps {
  lang: Language;
  onClose: () => void;
}

export default function ExpertNetworkModal({ lang, onClose }: ExpertNetworkModalProps) {
  const dict = DICTIONARY[lang];
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ExpertApplication>({
    name: '',
    email: '',
    expertiseArea: '',
    affiliation: '',
    motivation: '',
    privacyAccepted: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ExpertApplication, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep = (currentStep: number) => {
    const newErrors: Partial<Record<keyof ExpertApplication, string>> = {};
    
    if (currentStep === 1) {
      if (!form.name.trim()) newErrors.name = lang === 'EN' ? 'Name is required' : 'Imię i nazwisko są wymagane';
      if (!form.email.trim()) {
        newErrors.email = lang === 'EN' ? 'Email is required' : 'Adres e-mail jest wymagany';
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = lang === 'EN' ? 'Invalid email format' : 'Niepoprawny format e-mail';
      }
      if (!form.affiliation.trim()) {
        newErrors.affiliation = lang === 'EN' ? 'Affiliation is required' : 'Nazwa instytucji/afiliacji jest wymagana';
      }
    } else if (currentStep === 2) {
      if (!form.expertiseArea) {
        newErrors.expertiseArea = lang === 'EN' ? 'Please select your core area of expertise' : 'Wybierz swój obszar specjalizacji';
      }
    } else if (currentStep === 3) {
      if (form.motivation.trim().length < 20) {
        newErrors.motivation = lang === 'EN' ? 'Please share a slightly longer description (min 20 characters)' : 'Opisz szerzej swoją motywację (min 20 znaków)';
      }
      if (!form.privacyAccepted) {
        newErrors.privacyAccepted = lang === 'EN' ? 'You must accept the terms to proceed' : 'Musisz zaakceptować zgodę, aby kontynuować';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const inputClasses = (fieldName: keyof ExpertApplication) => `
    w-full px-4 py-3 rounded-xl bg-background/50 border text-sm font-sans focus:outline-none transition-colors duration-200
    ${errors[fieldName] 
      ? 'border-red-400 focus:border-red-500 bg-red-50/10' 
      : 'border-outline/15 focus:border-primary'
    }
  `;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-md animate-in fade-in duration-300">
      
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-outline/15 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Colorful top border representing energy flow */}
        <div className="h-2 w-full bg-gradient-to-r from-primary via-tertiary to-secondary" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-surface hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary cursor-pointer z-10"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success State Screen */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 text-center flex flex-col items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-display text-2xl font-bold text-on-background">{dict.formSuccessTitle}</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              {dict.formSuccessDesc}
            </p>

            <div className="w-full mt-2 p-4 rounded-xl bg-surface border border-primary/10 text-xs text-left text-on-surface-variant space-y-1 font-mono">
              <div><strong>{lang === 'EN' ? 'Applicant' : 'Aplikant'}:</strong> {form.name}</div>
              <div><strong>{lang === 'EN' ? 'Affiliation' : 'Instytucja'}:</strong> {form.affiliation}</div>
              <div><strong>{lang === 'EN' ? 'Field' : 'Obszar'}:</strong> {form.expertiseArea}</div>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full bg-primary text-on-primary py-3.5 rounded-xl font-bold text-sm cursor-pointer hover:bg-secondary transition-colors"
            >
              {dict.formClose}
            </button>
          </div>
        ) : (
          /* Onboarding Form Steps */
          <div className="p-6 sm:p-8">
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-display text-xl font-extrabold text-on-background leading-tight">{dict.expertFormTitle}</h3>
                <span className="text-xs text-outline-variant font-semibold">Step {step} of 3</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="text-left space-y-5">
              
              {/* Step 1: Core Credentials */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <p className="text-xs text-on-surface-variant leading-relaxed mb-1">
                    {lang === 'EN' 
                      ? 'NCAE hosts strategic working groups in balancing markets and smart grid engineering. Start by sharing your core affiliation details.'
                      : 'NCAE prowadzi strategiczne grupy robocze w zakresie rynków bilansujących i inżynierii inteligentnych sieci. Rozpocznij od podania swoich danych.'}
                  </p>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{dict.formName}</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Dr. Maria Curie"
                      className={inputClasses('name')}
                    />
                    {errors.name && <span className="text-xs text-red-500 font-medium">{errors.name}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{dict.formEmail}</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="maria@university.edu.pl"
                      className={inputClasses('email')}
                    />
                    {errors.email && <span className="text-xs text-red-500 font-medium">{errors.email}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{dict.formAffiliation}</label>
                    <input
                      type="text"
                      value={form.affiliation}
                      onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
                      placeholder="e.g. Warsaw University of Technology"
                      className={inputClasses('affiliation')}
                    />
                    {errors.affiliation && <span className="text-xs text-red-500 font-medium">{errors.affiliation}</span>}
                  </div>
                </div>
              )}

              {/* Step 2: Research Specialty */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{dict.formArea}</label>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'communities', text: dict.area1 },
                      { id: 'balancing', text: dict.area2 },
                      { id: 'microgrid', text: dict.area3 },
                      { id: 'regulatory', text: dict.area4 }
                    ].map(opt => (
                      <div
                        key={opt.id}
                        onClick={() => setForm({ ...form, expertiseArea: opt.text })}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between text-sm ${
                          form.expertiseArea === opt.text
                            ? 'bg-primary/10 border-primary font-bold text-primary'
                            : 'bg-background/40 hover:bg-surface border-outline/10 text-on-surface-variant'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {form.expertiseArea === opt.text && <Check className="w-4 h-4 text-primary flex-shrink-0 ml-2" />}
                      </div>
                    ))}
                  </div>
                  {errors.expertiseArea && <p className="text-xs text-red-500 font-medium">{errors.expertiseArea}</p>}
                </div>
              )}

              {/* Step 3: Motivation & Consent */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{dict.formMotivation}</label>
                    <textarea
                      rows={4}
                      value={form.motivation}
                      onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                      placeholder={dict.formMotivationPlaceholder}
                      className={inputClasses('motivation')}
                    />
                    {errors.motivation && <span className="text-xs text-red-500 font-medium">{errors.motivation}</span>}
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                      <input
                        type="checkbox"
                        checked={form.privacyAccepted}
                        onChange={(e) => setForm({ ...form, privacyAccepted: e.target.checked })}
                        className="mt-0.5 rounded border-outline/15 text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-on-surface-variant leading-relaxed">{dict.formPrivacy}</span>
                    </label>
                    {errors.privacyAccepted && <p className="text-xs text-red-500 font-medium mt-1">{errors.privacyAccepted}</p>}
                  </div>
                </div>
              )}

              {/* Wizard Control Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-outline/10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-full border border-outline/15 hover:bg-surface text-sm font-semibold text-on-surface-variant transition-colors cursor-pointer"
                  >
                    {lang === 'EN' ? 'Back' : 'Wstecz'}
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-primary hover:bg-secondary text-on-primary font-bold text-sm px-6 py-2.5 rounded-full cursor-pointer transition-colors"
                  >
                    {lang === 'EN' ? 'Next Step' : 'Dalej'}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-primary to-tertiary hover:energy-glow text-on-primary font-bold text-sm px-6 py-2.5 rounded-full cursor-pointer transition-colors flex items-center gap-1.5 shadow"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                        <span>{dict.formSubmitting}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{dict.formSubmit}</span>
                      </>
                    )}
                  </button>
                )}
              </div>

            </form>
          </div>
        )}

      </div>

    </div>
  );
}
