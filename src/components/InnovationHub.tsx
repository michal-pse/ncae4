import React, { useState } from 'react';
import { Search, Filter, Clock, Calendar, User, ArrowUpRight, X, FileText, Share2 } from 'lucide-react';
import { Language, Article } from '../types';
import { DICTIONARY, INITIAL_ARTICLES } from '../data';

interface InnovationHubProps {
  lang: Language;
}

export default function InnovationHub({ lang }: InnovationHubProps) {
  const dict = DICTIONARY[lang];
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Report' | 'Analysis' | 'Case Study'>('All');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Filter and search logic
  const filteredArticles = INITIAL_ARTICLES.filter(article => {
    const matchesFilter = activeFilter === 'All' || article.type === activeFilter;
    
    const title = lang === 'EN' ? article.titleEN : article.titlePL;
    const excerpt = lang === 'EN' ? article.excerptEN : article.excerptPL;
    const author = article.author;
    const searchLower = searchTerm.toLowerCase();
    
    const matchesSearch = title.toLowerCase().includes(searchLower) || 
                          excerpt.toLowerCase().includes(searchLower) || 
                          author.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  const getArticleTypeLabel = (type: string) => {
    if (type === 'Report') return dict.report;
    if (type === 'Analysis') return dict.analysis;
    return dict.caseStudy;
  };

  const getArticleTypeColor = (type: string) => {
    if (type === 'Report') return 'bg-emerald-500/10 text-primary border-primary/20';
    if (type === 'Analysis') return 'bg-tertiary-container/30 text-tertiary border-tertiary/20';
    return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  };

  return (
    <section id="insights" className="py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      
      {/* Decorative ambient gradients */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none select-none">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-tertiary-container rounded-full blur-[160px]" />
        <div className="absolute -bottom-20 left-10 w-[400px] h-[400px] bg-primary-container rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="text-left">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">{lang === 'EN' ? 'Research & Intelligence' : 'Badania i Analizy'}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-on-background mt-2 tracking-tight">
              {dict.innovationTitle}
            </h2>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-2 max-w-xl">
              {dict.innovationSubtitle}
            </p>
          </div>

          <button 
            onClick={() => {
              setSearchTerm('');
              setActiveFilter('All');
            }}
            className="font-sans text-xs font-bold text-primary border border-primary/30 px-5 py-2.5 rounded-full hover:bg-primary hover:text-on-primary transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            {dict.viewAll}
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-10 bg-white/65 backdrop-blur-md p-3.5 rounded-2xl border border-outline/10">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder={dict.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-background/50 rounded-xl border border-outline/10 focus:outline-none focus:border-primary font-sans"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pill List */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
            <span className="text-xs text-on-surface-variant font-bold flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {(['All', 'Report', 'Analysis', 'Case Study'] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === f
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-background hover:bg-surface-container border border-outline/10 text-on-surface-variant'
                }`}
              >
                {f === 'All' ? (lang === 'EN' ? 'All' : 'Wszystkie') : (f === 'Report' ? dict.report : f === 'Analysis' ? dict.analysis : dict.caseStudy)}
              </button>
            ))}
          </div>

        </div>

        {/* Publications Grid */}
        {filteredArticles.length === 0 ? (
          <div className="p-16 text-center bg-white/70 backdrop-blur rounded-3xl border border-outline/10 max-w-xl mx-auto shadow-sm">
            <FileText className="w-12 h-12 text-outline/40 mx-auto mb-4" />
            <p className="text-on-surface-variant font-sans font-medium text-base">{dict.noArticles}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Featured Article Card (8 Columns) */}
            {filteredArticles[0] && (
              <div 
                onClick={() => setSelectedArticle(filteredArticles[0])}
                className="lg:col-span-8 group cursor-pointer glass-panel rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-outline/15 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="h-64 relative overflow-hidden bg-surface-container">
                    {/* Glowing Report Image background provided by user */}
                    <img
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-85"
                      src={filteredArticles[0].image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDh5YotTea20yVwUbVDUrivXb0uCGMbojwykJZahPBz3y53MLXl_4Up-xoIJlKCJxY7cZ_XjEXn0ljBBruBZBTMAJDN5tS1y3lsPLp8k5658d7wxHLSWaNtO71lQwMFxzSs5nJ9ZhRyUnMzDs_1zkQTly7uNVdz3vGAzzbUSux2kB2gmIuTqECBYnS7vBUTPDKRdXqYwX8twHloUTH3R1AtISl2g0hMVrvBp1_tBqC8QbD-7LsIP9UlT_b7SzE9X7lY8SY6QlkbiuTJ"}
                      alt="NCAE Data visualization dashboard report mock cover"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge */}
                    <div className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full font-sans text-xs font-bold border backdrop-blur-md ${getArticleTypeColor(filteredArticles[0].type)}`}>
                      {getArticleTypeLabel(filteredArticles[0].type)}
                    </div>

                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-1.5 rounded-full border border-outline/10 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-center gap-4 text-xs text-on-surface-variant font-semibold mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{filteredArticles[0].date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{lang === 'EN' ? filteredArticles[0].readTimeEN : filteredArticles[0].readTimePL}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-on-background group-hover:text-primary transition-colors leading-tight">
                      {lang === 'EN' ? filteredArticles[0].titleEN : filteredArticles[0].titlePL}
                    </h3>
                    
                    <p className="font-sans text-sm sm:text-base text-on-surface-variant mt-3 leading-relaxed">
                      {lang === 'EN' ? filteredArticles[0].excerptEN : filteredArticles[0].excerptPL}
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:px-8 sm:pb-8 pt-0 border-t border-outline/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-outline" />
                    <span className="text-outline-variant">{filteredArticles[0].author}</span>
                  </div>
                  <span>{dict.readMore} →</span>
                </div>
              </div>
            )}

            {/* Secondary Articles Stack (4 Columns) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {filteredArticles.slice(1).map(article => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group cursor-pointer glass-panel p-5 rounded-3xl border border-outline/15 hover:bg-white/85 transition-all duration-300 text-left flex flex-col justify-between h-full"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className={`px-2.5 py-1 rounded-full font-sans text-[11px] font-bold border bg-white ${getArticleTypeColor(article.type)}`}>
                        {getArticleTypeLabel(article.type)}
                      </div>
                      <span className="text-xs text-outline font-semibold">{article.date}</span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-on-background group-hover:text-primary transition-colors leading-snug">
                      {lang === 'EN' ? article.titleEN : article.titlePL}
                    </h4>

                    <p className="font-sans text-xs text-on-surface-variant line-clamp-2">
                      {lang === 'EN' ? article.excerptEN : article.excerptPL}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline/5 text-[11px] font-bold uppercase tracking-wider text-outline-variant">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lang === 'EN' ? article.readTimeEN : article.readTimePL}</span>
                    </span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Immersive Article Modal Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-on-background/40 backdrop-blur-md animate-in fade-in duration-300">
          
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-white rounded-3xl border border-outline/15 shadow-2xl p-6 sm:p-10 text-left animate-in zoom-in-95 duration-300 scroll-smooth">
            
            {/* Modal Header Actions */}
            <div className="sticky top-0 bg-white/95 backdrop-blur z-20 flex justify-between items-center pb-4 mb-6 border-b border-outline/10">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getArticleTypeColor(selectedArticle.type)}`}>
                  {getArticleTypeLabel(selectedArticle.type)}
                </span>
                <span className="text-xs text-outline font-semibold">•</span>
                <span className="text-xs text-outline font-semibold font-mono">{selectedArticle.date}</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    const title = lang === 'EN' ? selectedArticle.titleEN : selectedArticle.titlePL;
                    navigator.clipboard.writeText(`${title} - National Center for Advanced Energy Research`);
                    alert(lang === 'EN' ? 'Link details copied to clipboard!' : 'Skopiowano szczegóły do schowka!');
                  }}
                  className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-full transition-colors cursor-pointer"
                  title="Close"
                  id="modal-close-button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col gap-6">
              
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-background leading-tight">
                {lang === 'EN' ? selectedArticle.titleEN : selectedArticle.titlePL}
              </h1>

              {/* Author & Meta Block */}
              <div className="flex flex-wrap items-center gap-6 p-4 rounded-2xl bg-surface border border-outline/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {selectedArticle.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-outline-variant font-bold">{dict.writtenBy}</div>
                    <div className="text-sm font-bold text-on-background">{selectedArticle.author}</div>
                  </div>
                </div>

                <div className="h-8 w-px bg-outline/10 hidden sm:block" />

                <div>
                  <div className="text-[10px] uppercase tracking-wider text-outline-variant font-bold">{lang === 'EN' ? 'Read Length' : 'Czas czytania'}</div>
                  <div className="text-sm font-semibold text-on-surface-variant font-mono">
                    {lang === 'EN' ? selectedArticle.readTimeEN : selectedArticle.readTimePL}
                  </div>
                </div>
              </div>

              {/* Featured image inside modal if available */}
              {selectedArticle.image && (
                <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-outline/10">
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.titleEN} 
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Full Article Text Block */}
              <div className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed space-y-6 pt-2">
                {(lang === 'EN' ? selectedArticle.contentEN : selectedArticle.contentPL).split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="font-display text-xl sm:text-2xl font-bold text-on-background pt-4 border-b border-outline/5 pb-1">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-2 text-sm sm:text-base">
                        {paragraph.split('\n').map((item, itemIdx) => (
                          <li key={itemIdx} className="pl-1">
                            {item.replace(/-\s+\*\*(.*?)\*\*(.*)/, (_, boldText, regularText) => (
                              <span><strong>{boldText}</strong>{regularText}</span>
                            )).replace(/^-\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (paragraph.startsWith('1.')) {
                    return (
                      <ol key={index} className="list-decimal pl-5 space-y-2 text-sm sm:text-base">
                        {paragraph.split('\n').map((item, itemIdx) => (
                          <li key={itemIdx} className="pl-1">
                            {item.replace(/^\d+\.\s+\*\*(.*?)\*\*(.*)/, (_, boldText, regularText) => (
                              <span><strong>{boldText}</strong>{regularText}</span>
                            )).replace(/^\d+\.\s*/, '')}
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>

            </div>

            {/* Bottom Sticky Action Row */}
            <div className="mt-8 pt-6 border-t border-outline/10 flex justify-end">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="bg-primary text-on-primary font-bold text-sm px-6 py-2.5 rounded-full hover:bg-secondary cursor-pointer transition-colors shadow"
              >
                {dict.formClose}
              </button>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
