import { Article, GridNode } from './types';

export const DICTIONARY = {
  EN: {
    navExpertise: 'Expertise',
    navModeling: 'Modeling Sandbox',
    navInsights: 'Insights',
    navProjects: 'Projects',
    navPartners: 'Partners',
    ctaJoin: 'Join Expert Network',
    ctaContact: 'Contact Our Team',
    energyNetwork: 'The Energy Network',
    heroTitlePart1: 'Connecting Energy Potential',
    heroTitlePart2: 'Budujemy zintegrowany ekosystem',
    heroDesc: 'We build an integrated ecosystem where local energy communities and balancing areas create a resilient power grid for the future.',
    livingTitle: 'Living System Architecture',
    livingSubtitle: 'Interconnected modules for a sustainable future. Interact with the sandbox below to simulate grid balancing!',
    localCommunities: 'Local Energy Communities',
    localCommunitiesDesc: 'Empowering neighborhoods to generate, share, and optimize their own renewable resources.',
    balancingAreas: 'Balancing Areas',
    balancingAreasDesc: 'Intelligent grid management ensuring stability between supply and demand across regions.',
    microgridIntegration: 'Microgrid Integration',
    microgridIntegrationDesc: 'Seamless connection of decentralized power sources to the macro infrastructure.',
    explore: 'Explore System',
    analyze: 'Analyze Sandbox',
    connect: 'Simulate Grid',
    innovationTitle: 'Centrum Innowacji',
    innovationSubtitle: 'Latest insights, technical papers, and case studies from our strategic research network.',
    viewAll: 'View All Publications',
    searchPlaceholder: 'Search articles, reports, analysis...',
    noArticles: 'No publications match your search criteria.',
    report: 'Report',
    analysis: 'Analysis',
    caseStudy: 'Case Study',
    readMore: 'Read Full Publication',
    minutesRead: 'min read',
    publishedOn: 'Published on',
    writtenBy: 'Written by',
    shapeFutureTitle: 'Shape the Sustainable Future',
    shapeFutureDesc: 'Join NCAE in building a robust, interconnected energy network. Partner with us to drive innovation, research, and resilience.',
    expertFormTitle: 'Apply for the Expert Network',
    expertFormDesc: 'Collaborate with the National Center for Advanced Energy. Share your credentials and join our strategic working groups.',
    formName: 'Full Name',
    formEmail: 'Email Address',
    formArea: 'Core Area of Expertise',
    formAreaSelect: 'Select your field',
    area1: 'Local Energy Communities & Co-ops',
    area2: 'Balancing Markets & Algorithmic Trading',
    area3: 'Microgrid Control Systems & Hardware',
    area4: 'Regulatory Frameworks & Energy Policy',
    formAffiliation: 'Organization / Academic Affiliation',
    formMotivation: 'Research Focus & Motivation',
    formMotivationPlaceholder: 'Describe your research focus or how you want to contribute...',
    formPrivacy: 'I consent to the processing of personal data for research network registration.',
    formSubmit: 'Submit Application',
    formSubmitting: 'Processing...',
    formSuccessTitle: 'Application Submitted!',
    formSuccessDesc: 'Thank you for your interest in the National Center for Advanced Energy network. Our committee will review your research profile and reach out within 7 business days.',
    formClose: 'Close Window',
    footerDesc: 'Strategic Research for a Sustainable Future.',
    privacyPolicy: 'Privacy Policy',
    contact: 'Contact',
    pressKit: 'Press Kit',
    publications: 'Publications',
    copyright: '© 2026 National Center for Advanced Energy. Strategic Research for a Sustainable Future.',
    
    // Simulator Labels
    simTitle: 'Interactive Grid Balancing Sandbox',
    simInstructions: 'Adjust the sliders below to balance grid supply and demand. See how local communities and microgrid storage maintain frequency stability.',
    simTotalGen: 'Total Active Gen',
    simTotalLoad: 'Total Grid Load',
    simBatteryState: 'Battery Storage',
    simNetBalance: 'Frequency Deficit / Surplus',
    simStability: 'Grid Stability Index',
    simCarbon: 'Hourly Carbon Offsets',
    simStatusBalanced: 'GRID STABLE (BALANCED)',
    simStatusSurplus: 'SURPLUS GENERATION (BATTERY CHARGING)',
    simStatusDeficit: 'CRITICAL DEFICIT (FREQUENCY DROP - DISCHARGING)',
    nodeSolar: 'Solar Array Arrays',
    nodeWind: 'Offshore Wind Farm',
    nodeBiomass: 'Biomass Baseload',
    nodeIndustrial: 'Industrial Smart Grid Demand',
    nodeResidential: 'Residential Peak Demand',
    nodeBattery: 'BESS Battery Storage Reserve',
    nodeTransmission: 'Macro Grid Import/Export Capacity',
    applyPre: 'Apply Preset: ',
    presetPerfect: 'Balanced Summer Noon',
    presetStorm: 'Wind Storm Peak Generation',
    presetNight: 'Winter Night Peak Demand',
    simAlertStable: 'System frequency is nominal (50.00 Hz). Battery storage is stable.',
    simAlertSurplus: 'High renewable output! Battery reserves are capturing surplus to prevent line curtailment.',
    simAlertDeficit: 'Demand exceeds production. Activating BESS battery discharge to prevent local blackout.'
  },
  PL: {
    navExpertise: 'Obszary Badawcze',
    navModeling: 'Piaskownica Bilansowania',
    navInsights: 'Publikacje',
    navProjects: 'Projekty',
    navPartners: 'Partnerzy',
    ctaJoin: 'Dołącz do sieci ekspertów',
    ctaContact: 'Kontakt z zespołem',
    energyNetwork: 'Sieć Energetyczna',
    heroTitlePart1: 'Łączymy Potencjał Energetyczny',
    heroTitlePart2: 'Budujemy zintegrowany ekosystem',
    heroDesc: 'Budujemy zintegrowany ekosystem, w którym lokalne społeczności i obszary bilansowania tworzą odporną sieć energetyczną przyszłości.',
    livingTitle: 'Architektura Żywego Systemu',
    livingSubtitle: 'Zintegrowane moduły dla zrównoważonej przyszłości. Skorzystaj z piaskownicy poniżej, aby zbilansować sieć!',
    localCommunities: 'Lokalne Społeczności Energetyczne',
    localCommunitiesDesc: 'Wzmocnienie pozycji sąsiedztw w celu generowania, udostępniania i optymalizacji własnych odnawialnych zasobów.',
    balancingAreas: 'Obszary Bilansowania',
    balancingAreasDesc: 'Inteligentne zarządzanie siecią zapewniające stabilność między podażą a popytem w regionach.',
    microgridIntegration: 'Integracja Mikrosieci',
    microgridIntegrationDesc: 'Bezproblemowe połączenie zdecentralizowanych źródeł energii z makrostrukturą.',
    explore: 'Poznaj System',
    analyze: 'Analizuj Piaskownicę',
    connect: 'Symuluj Sieć',
    innovationTitle: 'Centrum Innowacji',
    innovationSubtitle: 'Najnowsze publikacje, analizy rynkowe i studia przypadków z naszej sieci ekspertów.',
    viewAll: 'Wszystkie Publikacje',
    searchPlaceholder: 'Szukaj artykułów, raportów, analiz...',
    noArticles: 'Brak publikacji spełniających kryteria wyszukiwania.',
    report: 'Raport',
    analysis: 'Analiza',
    caseStudy: 'Studium przypadku',
    readMore: 'Przeczytaj całą publikację',
    minutesRead: 'min czytania',
    publishedOn: 'Opublikowano',
    writtenBy: 'Autor',
    shapeFutureTitle: 'Kształtuj Zrównoważoną Przyszłość',
    shapeFutureDesc: 'Dołącz do NCAE w budowaniu silnej, połączonej sieci energetycznej. Współpracuj z nami, aby stymulować badania i innowacje.',
    expertFormTitle: 'Aplikuj do Sieci Ekspertów',
    expertFormDesc: 'Podejmij współpracę z Krajowym Centrum Zaawansowanej Energii. Podziel się swoim doświadczeniem badawczym i dołącz do grup roboczych.',
    formName: 'Imię i nazwisko',
    formEmail: 'Adres e-mail',
    formArea: 'Główny obszar specjalizacji',
    formAreaSelect: 'Wybierz obszar',
    area1: 'Lokalne Społeczności Energetyczne i Spółdzielnie',
    area2: 'Rynki Bilansujące i Algorytmiczny Obrót',
    area3: 'Systemy Sterowania Mikrosieciami i Hardware',
    area4: 'Ramy Regulacyjne i Polityka Energetyczna',
    formAffiliation: 'Instytucja / Afiliacja akademicka',
    formMotivation: 'Kierunek badań i motywacja',
    formMotivationPlaceholder: 'Opisz swój obszar badawczy lub to, jak chcesz się przyczynić...',
    formPrivacy: 'Wyrażam zgodę na przetwarzanie danych osobowych w celu rejestracji w sieci badawczej.',
    formSubmit: 'Wyślij Aplikację',
    formSubmitting: 'Przetwarzanie...',
    formSuccessTitle: 'Aplikacja Została Wysłana!',
    formSuccessDesc: 'Dziękujemy za zainteresowanie siecią Krajowego Centrum Zaawansowanej Energii. Nasz komitet naukowy zapozna się z Twoim profilem i skontaktuje się w ciągu 7 dni roboczych.',
    formClose: 'Zamknij Okno',
    footerDesc: 'Strategiczne Badania dla Zrównoważonej Przyszłości.',
    privacyPolicy: 'Polityka prywatności',
    contact: 'Kontakt',
    pressKit: 'Materiały prasowe',
    publications: 'Publikacje',
    copyright: '© 2026 Krajowe Centrum Zaawansowanej Energii. Strategiczne Badania dla Zrównoważonej Przyszłości.',
    
    // Simulator Labels
    simTitle: 'Interaktywna Piaskownica Bilansowania Sieci',
    simInstructions: 'Dostosuj suwaki poniżej, aby zbilansować produkcję i zużycie. Zobacz, jak lokalne społeczności oraz magazyny mikrosieci utrzymują stabilność częstotliwości.',
    simTotalGen: 'Aktywna Produkcja',
    simTotalLoad: 'Obciążenie Sieci',
    simBatteryState: 'Magazyn Energii',
    simNetBalance: 'Deficyt / Nadwyżka częstotliwości',
    simStability: 'Wskaźnik Stabilności Sieci',
    simCarbon: 'Godzinowa Redukcja Emisji CO₂',
    simStatusBalanced: 'SIEĆ STABILNA (ZBILANSOWANA)',
    simStatusSurplus: 'NADWYŻKA GENERACJI (ŁADOWANIE MAGAZYNU)',
    simStatusDeficit: 'KRYTYCZNY DEFICYT (SPADEK CZĘSTOTLIWOŚCI - ROZŁADOWYWANIE)',
    nodeSolar: 'Farmy Fotowoltaiczne (PV)',
    nodeWind: 'Morskie Farmy Wiatrowe (Wind)',
    nodeBiomass: 'Elektrownia Biomasowa (Base)',
    nodeIndustrial: 'Przemysłowy Popyt Smart Grid',
    nodeResidential: 'Szczytowy Popyt Mieszkańców',
    nodeBattery: 'Rezerwowy Magazyn BESS',
    nodeTransmission: 'Moc Eksportowo-Importowa z Makrosiecią',
    applyPre: 'Zastosuj ustawienie: ',
    presetPerfect: 'Zbilansowane Słoneczne Południe',
    presetStorm: 'Szczyt Wichury (Wysoki Wiatr)',
    presetNight: 'Zimowy Szczyt Wieczorny',
    simAlertStable: 'Częstotliwość systemu jest nominalna (50,00 Hz). Rezerwy bateryjne są stabilne.',
    simAlertSurplus: 'Wysoka produkcja z OZE! Magazyny energii pochłaniają nadwyżki, zapobiegając wyłączeniom.',
    simAlertDeficit: 'Popyt przewyższa produkcję. Uruchamianie rozładowywania baterii BESS w celu zapobieżenia blackoutowi.'
  }
};

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    type: 'Report',
    titleEN: 'The Future of Decentralized Balancing',
    titlePL: 'Przyszłość Zdecentralizowanego Bilansowania',
    excerptEN: 'An in-depth look at how local energy communities are reshaping regional power stability and economic models in Eastern Europe.',
    excerptPL: 'Szczegółowa analiza wpływu lokalnych społeczności energetycznych na stabilność sieci regionalnych i modele rynkowe w Europie Wschodniej.',
    readTimeEN: '6 min read',
    readTimePL: '6 min czytania',
    date: '2026-05-14',
    author: 'Prof. dr hab. inż. Jan Kowalski',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDh5YotTea20yVwUbVDUrivXb0uCGMbojwykJZahPBz3y53MLXl_4Up-xoIJlKCJxY7cZ_XjEXn0ljBBruBZBTMAJDN5tS1y3lsPLp8k5658d7wxHLSWaNtO71lQwMFxzSs5nJ9ZhRyUnMzDs_1zkQTly7uNVdz3vGAzzbUSux2kB2gmIuTqECBYnS7vBUTPDKRdXqYwX8twHloUTH3R1AtISl2g0hMVrvBp1_tBqC8QbD-7LsIP9UlT_b7SzE9X7lY8SY6QlkbiuTJ',
    contentEN: `### Abstract
Decentralized grid balancing is rapidly evolving from a theoretical research model into a structural necessity. As utility-scale thermal assets retire, Local Energy Communities (LECs) and Microgrids must assume secondary and tertiary frequency regulation duties. This report details the research outcomes of the 2025 pilot projects spearheaded by the National Center for Advanced Energy (NCAE).

### Key Findings
1. **Dynamic Micro-Balancing:** Communities with dynamic tariff signaling reduced peak demand grid strain by up to 34% during regional congestion events.
2. **Autonomous BESS Deployment:** Behind-the-meter Battery Energy Storage Systems (BESS) coupled with machine-learning forecasts demonstrated 98.7% reliability in preventing local transformer overloading.
3. **P2P Energy Trading:** Peer-to-peer micro-transactions inside localized distribution nodes lower regional transmission losses by an average of 4.2% due to physical proximity of generation and load.

### Regulatory Roadmap
The transition requires structural adjustments in the balancing market framework. Poland's 2026 energy act proposal introduces a designated "Local Balancing Operator" role, empowering communities to aggregate assets and interact directly with the high-voltage transmission system operator (TSO) under dynamic pricing profiles.`,
    contentPL: `### Streszczenie
Zdecentralizowane bilansowanie sieci energetycznej szybko ewoluuje z teoretycznych modeli badawczych w strukturalną konieczność. W miarę wycofywania konwencjonalnych bloków węglowych, Lokalne Społeczności Energetyczne (LSE) i mikrosieci muszą przejąć zadania regulacji wtórnej i trzeciorzędnej częstotliwości. Niniejszy raport szczegółowo przedstawia wyniki projektów pilotażowych z lat 2024-2025 prowadzonych przez Krajowe Centrum Zaawansowanej Energii (NCAE).

### Główne Wnioski
1. **Dynamiczne Mikrobiansowanie:** Społeczności korzystające z dynamicznych sygnałów taryfowych zmniejszyły obciążenie sieci w godzinach szczytu nawet o 34% podczas lokalnych przeciążeń.
2. **Autonomiczne Systemy BESS:** Magazyny energii (BESS) sterowane algorytmami predykcyjnymi wykazały 98,7% niezawodności w zapobieganiu przeciążeniom lokalnych stacji transformatorowych.
3. **Handel P2P:** Transakcje bezpośrednie w obrębie lokalnych węzłów dystrybucyjnych obniżają straty przesyłowe średnio o 4,2% ze względu na bliskość geograficzną źródła i odbiorcy.

### Rekomendacje Regulacyjne
Transformacja wymaga dostosowania ram prawnych rynku bilansującego. Projekt nowelizacji prawa energetycznego z 2026 r. wprowadza status „Operatora Bilansowania Lokalnego”, umożliwiając społecznościom agregację rozproszonych zasobów i bezpośrednią współpracę z operatorem systemu przesyłowego (OSP).`
  },
  {
    id: 'art-2',
    type: 'Analysis',
    titleEN: 'Regulatory Frameworks 2025',
    titlePL: 'Ramy Regulacyjne 2025',
    excerptEN: 'Analyzing the trans-European green corridor directives and their impact on Polish distribution system operators.',
    excerptPL: 'Analiza transeuropejskich dyrektyw zielonego korytarza i ich wpływu na polskich operatorów systemów dystrybucyjnych (OSD).',
    readTimeEN: '5 min read',
    readTimePL: '5 min czytania',
    date: '2026-06-02',
    author: 'Dr Anna Zielińska',
    contentEN: `### European Union Directive Compliance
The RED III directive mandates a minimum 42.5% renewable share in total European energy consumption by 2030. For Poland, this translates into accelerating grid connections for decentralized renewable generators. 

### Core Challenges for OSDs
- **Voltage Violations:** Mass installation of residential photovoltaics frequently drives grid voltages above permissible limits (253V), triggering automatic micro-inverter shutdowns.
- **Dynamic Capacity Allocation:** Static connection agreements prevent optimal exploitation of local wind potentials. NCAE proposes a shifting scale model of dynamic capacity reservation.

### Policy Recommendations
We recommend rapid implementation of smart metering infrastructures (SMI) with bidirectional low-latency data feedback loops, alongside local ancillary service markets where OSDs can purchase active power curtailment or reactive power support directly from cooperative prosumers.`,
    contentPL: `### Zgodność z Dyrektywami Unii Europejskiej
Dyrektywa RED III nakłada obowiązek osiągnięcia co najmniej 42,5% udziału energii odnawialnej w całkowitym zużyciu w Europie do 2030 r. Dla Polski oznacza to konieczność przyspieszenia przyłączania do sieci zdecentralizowanych źródeł OZE.

### Główne Wyzwania dla OSD
- **Przekroczenia Napięcia:** Masowa instalacja domowej fotowoltaiki często powoduje wzrost napięcia w sieci powyżej dopuszczalnego poziomu (253V), co wywołuje automatyczne wyłączenia falowników.
- **Dynamiczny Przydział Mocy:** Statyczne umowy przyłączeniowe uniemożliwiają optymalne wykorzystanie lokalnego potencjału wiatrowego. NCAE proponuje model dynamicznej rezerwacji przepustowości.

### Rekomendacje Strategiczne
Rekomendujemy szybkie wdrożenie infrastruktury inteligentnego opomiarowania (AMI) z dwukierunkową transmisją danych o niskich opóźnieniach oraz stworzenie lokalnych rynków usług elastyczności.`
  },
  {
    id: 'art-3',
    type: 'Case Study',
    titleEN: 'Warsaw Microgrid Pilot Case Study',
    titlePL: 'Studium Przypadku: Warszawski Pilot Mikrosieci',
    excerptEN: 'Evaluating the resilient performance of the district-scale smart microgrid in Warsaw during seasonal peak demands.',
    excerptPL: 'Ocena odporności i wydajności inteligentnej mikrosieci dzielnicowej w Warszawie podczas sezonowych szczytów zapotrzebowania.',
    readTimeEN: '8 min read',
    readTimePL: '8 min czytania',
    date: '2026-04-10',
    author: 'Inż. Michał Lewandowski',
    contentEN: `### Project Parameters
The pilot grid covers an urban sub-district in Warsaw with 1,200 households, equipped with 3.2 MWp distributed solar panels, a combined heat and power (CHP) biomass unit (800 kW), and a 2.5 MWh Lithium-Iron-Phosphate (LFP) Battery Storage Facility.

### Test Protocol (Winter Congestion)
During a sub-zero cold wave in January 2026, the microgrid was disconnected from the main high-voltage transmission line to evaluate independent "islanded" operation.

- **Island Duration:** 48 consecutive hours.
- **Load Shedding Required:** 0%.
- **Frequency Stability Range:** 49.92 Hz to 50.05 Hz (well within safety limits).

### Key Takeaways
Integrating a dispatchable local biomass plant with fast-responding electrochemical storage is critical to offset the high intermittency of solar resources during winter cycles. Advanced peak-shaving algorithms developed at NCAE optimized the battery lifecycles, extending expected project lifespans by 14%.`,
    contentPL: `### Parametry Projektu
Pilotażowa sieć obejmuje miejską poddzielnicę w Warszawie z 1200 gospodarstwami domowymi, wyposażoną w 3,2 MWp rozproszonej fotowoltaiki, elektrociepłownię biomasową (kogeneracyjną) o mocy 800 kW oraz magazyn energii LFP o pojemności 2,5 MWh.

### Protokół Testowy (Zimowe Przeciążenie)
Podczas fali mrozów w styczniu 2026 r., mikrosieć została odłączona od krajowego systemu przesyłowego w celu przetestowania autonomicznej pracy wyspowej.

- **Czas trwania pracy wyspowej:** 48 godzin.
- **Konieczność odłączania odbiorców:** 0%.
- **Zakres stabilności częstotliwości:** 49,92 Hz do 50,05 Hz (w granicach bezpieczeństwa).

### Główne Wnioski
Integracja sterowalnej lokalnej elektrociepłowni biomasowej z szybko reagującym magazynem elektrochemicznym jest kluczowa dla kompensacji nieregularności produkcji PV zimą. Zaawansowane algorytmy peak-shaving opracowane w NCAE zoptymalizowały cykle pracy baterii, wydłużając jej żywotność o 14%.`
  }
];

export const INITIAL_GRID_NODES: GridNode[] = [
  {
    id: 'solar',
    labelEN: 'Solar Arrays (PV)',
    labelPL: 'Farmy Fotowoltaiczne (PV)',
    value: 12.5,
    unit: 'MW',
    min: 0,
    max: 30,
    step: 0.5,
    type: 'generation',
    color: 'from-emerald-400 to-green-500',
    descriptionEN: 'Decentralized solar generation across residential and commercial roofs.',
    descriptionPL: 'Zdecentralizowana produkcja solarna na dachach domów i firm.'
  },
  {
    id: 'wind',
    labelEN: 'Offshore Wind Farms',
    labelPL: 'Morskie Farmy Wiatrowe',
    value: 18.0,
    unit: 'MW',
    min: 0,
    max: 40,
    step: 0.5,
    type: 'generation',
    color: 'from-cyan-400 to-teal-500',
    descriptionEN: 'High-altitude and coastal wind turbines providing variable AC energy.',
    descriptionPL: 'Turbiny wiatrowe dostarczające zmienną energię prądu przemiennego.'
  },
  {
    id: 'biomass',
    labelEN: 'Biomass Baseload',
    labelPL: 'Elektrownia Biomasowa (Baza)',
    value: 5.0,
    unit: 'MW',
    min: 2,
    max: 10,
    step: 0.2,
    type: 'generation',
    color: 'from-emerald-600 to-green-800',
    descriptionEN: 'Steady dispatchable biomass plant supplying baseline system inertia.',
    descriptionPL: 'Sterowalna elektrownia na biomasę zapewniająca inercję systemu.'
  },
  {
    id: 'industrial',
    labelEN: 'Industrial Demand',
    labelPL: 'Popyt Przemysłowy',
    value: 15.0,
    unit: 'MW',
    min: 5,
    max: 25,
    step: 0.5,
    type: 'load',
    color: 'from-orange-500 to-red-600',
    descriptionEN: 'Heavy manufacturing plants operating under smart load shedding profiles.',
    descriptionPL: 'Przemysł ciężki działający w profilu inteligentnego zarządzania popytem.'
  },
  {
    id: 'residential',
    labelEN: 'Residential Peak Load',
    labelPL: 'Szczytowy Popyt Mieszkańców',
    value: 12.0,
    unit: 'MW',
    min: 4,
    max: 20,
    step: 0.5,
    type: 'load',
    color: 'from-rose-500 to-red-700',
    descriptionEN: 'Consumer domestic power draw, highly correlated with seasonal cycles.',
    descriptionPL: 'Zużycie domowe, silnie skorelowane z porą dnia i warunkami pogodowymi.'
  },
  {
    id: 'battery',
    labelEN: 'BESS Battery Reserve',
    labelPL: 'Rezerwowy Magazyn BESS',
    value: 3.5, // Positive flow means charge capacity, negative means drain capacity
    unit: 'MW',
    min: -15, // Max discharging rate
    max: 15,  // Max charging rate
    step: 0.5,
    type: 'storage',
    color: 'from-violet-500 to-purple-600',
    descriptionEN: 'Utility-scale Battery Energy Storage System for immediate frequency balancing.',
    descriptionPL: 'Wielkoskalowy akumulatorowy magazyn energii (BESS) do regulacji częstotliwości.'
  },
  {
    id: 'transmission',
    labelEN: 'Main Grid Connection',
    labelPL: 'Połączenie z Makrosiecią',
    value: -5.0, // negative means export, positive means import
    unit: 'MW',
    min: -20,
    max: 20,
    step: 0.5,
    type: 'transmission',
    color: 'from-blue-500 to-indigo-600',
    descriptionEN: 'High-voltage interconnection line transferring power to/from the national system.',
    descriptionPL: 'Linia wysokiego napięcia wymieniająca energię z krajowym systemem przesyłowym.'
  }
];
