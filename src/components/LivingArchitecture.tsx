import React, { useState, useEffect } from 'react'
import {
  Leaf,
  Scale,
  Cpu,
  Sun,
  Wind,
  Zap,
  RefreshCw,
  Battery,
  Sliders,
  Info,
  ShieldAlert,
  CheckCircle2,
  Activity
} from 'lucide-react'
import { Language, GridNode, SimulationResult } from '../types'
import { DICTIONARY, INITIAL_GRID_NODES } from '../data'

interface LivingArchitectureProps {
  lang: Language
}

export default function LivingArchitecture ({ lang }: LivingArchitectureProps) {
  const dict = DICTIONARY[lang]
  const [nodes, setNodes] = useState<GridNode[]>(INITIAL_GRID_NODES)
  const [simResult, setSimResult] = useState<SimulationResult>({
    totalGeneration: 0,
    totalLoad: 0,
    batteryFlow: 0,
    netBalance: 0,
    stabilityScore: 100,
    carbonSaved: 0,
    status: 'balanced'
  })
  const [selectedPillar, setSelectedPillar] = useState<
    'local' | 'balancing' | 'microgrid'
  >('local')

  // Trigger calculation whenever nodes state changes
  useEffect(() => {
    // 1. Calculate base generation
    let gen = 0
    let load = 0
    let macroInterconnect = 0

    nodes.forEach(n => {
      if (n.id === 'solar' || n.id === 'wind' || n.id === 'biomass') {
        gen += n.value
      } else if (n.id === 'industrial' || n.id === 'residential') {
        load += n.value
      } else if (n.id === 'transmission') {
        macroInterconnect = n.value // positive means importing, negative exporting
      }
    })

    // Net generation before battery intervention
    // Note: macro interconnect import acts as generation (brings power in), export acts as load (sends power out)
    const netGen = gen + (macroInterconnect > 0 ? macroInterconnect : 0)
    const netLoad =
      load + (macroInterconnect < 0 ? Math.abs(macroInterconnect) : 0)

    const rawDifference = netGen - netLoad // surplus if positive, deficit if negative

    // 2. Battery intervention (Battery id is 'battery')
    // Battery can charge (positive MW up to 15MW max) or discharge (negative MW down to -15MW max)
    // We auto-adjust battery storage to balance the net gap!
    let batteryAction = 0
    let finalBalance = rawDifference

    if (rawDifference > 0) {
      // We have surplus! Charge the battery.
      // Maximum charging rate is 15 MW
      batteryAction = Math.min(rawDifference, 15)
      finalBalance = rawDifference - batteryAction
    } else if (rawDifference < 0) {
      // We have a deficit! Discharge the battery.
      // Maximum discharging rate is 15 MW (represented as negative battery action)
      const neededDischarge = Math.abs(rawDifference)
      batteryAction = -Math.min(neededDischarge, 15)
      finalBalance = rawDifference - batteryAction
    }

    // 3. Update the battery node's active value dynamically so sliders show active action
    setNodes(prev =>
      prev.map(n =>
        n.id === 'battery'
          ? { ...n, value: Number(batteryAction.toFixed(1)) }
          : n
      )
    )

    // 4. Calculate stability index
    // Deficit or surplus affects stability. Perfectly balanced (0 remaining difference) = 100% stable.
    const deviation = Math.abs(finalBalance)
    const stability = Math.max(
      0,
      Math.min(100, Math.round(100 - deviation * 4))
    )

    // 5. Calculate carbon saved
    // Solar and Wind count as clean green energy
    const greenGen =
      (nodes.find(n => n.id === 'solar')?.value || 0) +
      (nodes.find(n => n.id === 'wind')?.value || 0)
    // 1 MW of solar/wind offsets approx 0.45 tons of CO2 per hour compared to coal
    const co2Saved = Number((greenGen * 0.45).toFixed(1))

    // 6. Determine status
    let status: 'balanced' | 'surplus' | 'deficit' = 'balanced'
    if (finalBalance > 0.5) status = 'surplus'
    if (finalBalance < -0.5) status = 'deficit'

    setSimResult({
      totalGeneration: Number(netGen.toFixed(1)),
      totalLoad: Number(netLoad.toFixed(1)),
      batteryFlow: Number(batteryAction.toFixed(1)),
      netBalance: Number(finalBalance.toFixed(1)),
      stabilityScore: stability,
      carbonSaved: co2Saved,
      status
    })
  }, [
    // Depend on non-battery node values to avoid infinite updates
    nodes.find(n => n.id === 'solar')?.value,
    nodes.find(n => n.id === 'wind')?.value,
    nodes.find(n => n.id === 'biomass')?.value,
    nodes.find(n => n.id === 'industrial')?.value,
    nodes.find(n => n.id === 'residential')?.value,
    nodes.find(n => n.id === 'transmission')?.value
  ])

  const handleSliderChange = (id: string, val: number) => {
    setNodes(prev => prev.map(n => (n.id === id ? { ...n, value: val } : n)))
  }

  const applyPreset = (preset: 'perfect' | 'storm' | 'night') => {
    let presetValues: Record<string, number> = {}
    if (preset === 'perfect') {
      presetValues = {
        solar: 18.0,
        wind: 8.0,
        biomass: 4.0,
        industrial: 12.0,
        residential: 8.0,
        transmission: -10.0 // exporting 10MW
      }
    } else if (preset === 'storm') {
      presetValues = {
        solar: 2.0,
        wind: 36.0,
        biomass: 3.0,
        industrial: 15.0,
        residential: 10.0,
        transmission: -16.0 // exporting 16MW
      }
    } else if (preset === 'night') {
      presetValues = {
        solar: 0.0,
        wind: 4.0,
        biomass: 9.0,
        industrial: 16.0,
        residential: 18.0,
        transmission: 15.0 // importing 15MW to cover high night demand
      }
    }

    setNodes(prev =>
      prev.map(n => {
        if (n.id in presetValues) {
          return { ...n, value: presetValues[n.id] }
        }
        return n
      })
    )
  }

  return (
    <section
      id='expertise'
      className='py-24 px-4 sm:px-6 lg:px-8 bg-surface-container-low relative'
    >
      <div className='max-w-7xl mx-auto'>
        {/* Living System Architecture Section */}
        <div className='text-center mb-16'>
          <h2 className='font-display text-3xl sm:text-4xl font-extrabold text-on-background tracking-tight'>
            {dict.livingTitle}
          </h2>
          <p className='font-sans text-base sm:text-lg text-on-surface-variant mt-3 max-w-3xl mx-auto'>
            {dict.livingSubtitle}
          </p>
        </div>

        {/* 3 Pillars Visual Segment */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
          {/* Pillar 1 */}
          <div
            onClick={() => setSelectedPillar('local')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              selectedPillar === 'local'
                ? 'bg-white shadow-lg border-primary/30 -translate-y-1'
                : 'glass-panel hover:bg-white/50 border-outline/10'
            }`}
          >
            <div className='w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center mb-4 text-primary'>
              <Leaf className='w-6 h-6' />
            </div>
            <h3 className='font-display text-xl font-bold text-on-background mb-2'>
              {dict.localCommunities}
            </h3>
            <p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
              {dict.localCommunitiesDesc}
            </p>
            <div className='mt-4 flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider'>
              <span>{dict.explore}</span>
              <span className='text-sm'>→</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => setSelectedPillar('balancing')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              selectedPillar === 'balancing'
                ? 'bg-white shadow-lg border-tertiary/30 -translate-y-1'
                : 'glass-panel hover:bg-white/50 border-outline/10'
            }`}
          >
            <div className='w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-4 text-tertiary'>
              <Scale className='w-6 h-6' />
            </div>
            <h3 className='font-display text-xl font-bold text-on-background mb-2'>
              {dict.balancingAreas}
            </h3>
            <p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
              {dict.balancingAreasDesc}
            </p>
            <div className='mt-4 flex items-center gap-1.5 text-tertiary text-xs font-bold uppercase tracking-wider'>
              <span>{dict.analyze}</span>
              <span className='text-sm'>→</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => setSelectedPillar('microgrid')}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
              selectedPillar === 'microgrid'
                ? 'bg-white shadow-lg border-secondary/30 -translate-y-1'
                : 'glass-panel hover:bg-white/50 border-outline/10'
            }`}
          >
            <div className='w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center mb-4 text-secondary'>
              <Cpu className='w-6 h-6' />
            </div>
            <h3 className='font-display text-xl font-bold text-on-background mb-2'>
              {dict.microgridIntegration}
            </h3>
            <p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
              {dict.microgridIntegrationDesc}
            </p>
            <div className='mt-4 flex items-center gap-1.5 text-secondary text-xs font-bold uppercase tracking-wider'>
              <span>{dict.connect}</span>
              <span className='text-sm'>→</span>
            </div>
          </div>
        </div>

        {/* Detailed Pillar Explanations */}
        <div className='mb-16 p-6 sm:p-8 rounded-3xl bg-white/95 border border-outline/15 shadow-sm animate-in fade-in duration-300'>
          {selectedPillar === 'local' && (
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
              <div className='lg:col-span-7 flex flex-col gap-4 text-left'>
                <span className='text-xs font-bold text-primary uppercase tracking-wider'>
                  {dict.localCommunities}
                </span>
                <h4 className='font-display text-2xl font-bold text-on-background'>
                  {lang === 'EN'
                    ? 'Democratizing Energy Generation'
                    : 'Demokratyzacja Produkcji Energii'}
                </h4>
                <p className='text-sm text-on-surface-variant leading-relaxed'>
                  {lang === 'EN'
                    ? 'By grouping consumers, prosumers, and local storage units, Local Energy Communities coordinate internal loads dynamically. Using advanced smart metering architectures and decentralized energy tokens, citizens trade solar surpluses with neighbors physically located within the same distribution transformer circle, avoiding high national grid transmission fees.'
                    : 'Grupując konsumentów, prosumentów i lokalne magazyny, Lokalne Społeczności Energetyczne koordynują zapotrzebowanie wewnętrzne w sposób dynamiczny. Korzystając z zaawansowanej infrastruktury smart meteringu obywatele mogą sprzedawać nadwyżki energii sąsiadom przyłączonym do tego samego transformatora, unikając wysokich opłat dystrybucyjnych.'}
                </p>
                <div className='flex flex-wrap gap-2 pt-2'>
                  <span className='px-3 py-1 rounded-full bg-surface text-[11px] font-bold text-primary border border-primary/15'>
                    P2P Trading
                  </span>
                  <span className='px-3 py-1 rounded-full bg-surface text-[11px] font-bold text-primary border border-primary/15'>
                    Cooperative Co-ops
                  </span>
                  <span className='px-3 py-1 rounded-full bg-surface text-[11px] font-bold text-primary border border-primary/15'>
                    Dynamic Pricing
                  </span>
                </div>
              </div>
              <div className='lg:col-span-5 p-4 bg-background/50 rounded-2xl border border-outline/10 text-center'>
                <div className='font-display text-5xl font-extrabold text-primary'>
                  34%
                </div>
                <p className='text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-2'>
                  {lang === 'EN'
                    ? 'Peak Congestion Reduction'
                    : 'Redukcja szczytowych obciążeń'}
                </p>
                <div className='text-[11px] text-outline mt-1.5 font-sans'>
                  {lang === 'EN'
                    ? 'Verified in NCAE Warsaw Pilot Project'
                    : 'Zweryfikowano w projekcie pilotażowym w Warszawie'}
                </div>
              </div>
            </div>
          )}

          {selectedPillar === 'balancing' && (
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
              <div className='lg:col-span-7 flex flex-col gap-4 text-left'>
                <span className='text-xs font-bold text-tertiary uppercase tracking-wider'>
                  {dict.balancingAreas}
                </span>
                <h4 className='font-display text-2xl font-bold text-on-background'>
                  {lang === 'EN'
                    ? 'Real-Time Frequency Stability'
                    : 'Stabilizacja Częstotliwości w Czasie Rzeczywistym'}
                </h4>
                <p className='text-sm text-on-surface-variant leading-relaxed'>
                  {lang === 'EN'
                    ? 'Maintaining a nominal 50Hz frequency requires microsecond coordination of flexible resources. NCAE constructs high-fidelity balancing area modeling environments. By implementing dynamic grid inertia software and deploying smart battery nodes, we prevent frequency drops during extreme thermal shutdowns or rapid wind drop-offs.'
                    : 'Utrzymanie nominalnej częstotliwości 50 Hz wymaga mikrosekundowej koordynacji elastycznych zasobów. NCAE tworzy środowiska modelowania obszarów bilansowania. Wdrażając oprogramowanie do dynamicznej inercji sieci oraz inteligentne baterie, zapobiegamy spadkom częstotliwości podczas nagłych wyłączeń elektrowni węglowych.'}
                </p>
                <div className='flex flex-wrap gap-2 pt-2'>
                  <span className='px-3 py-1 rounded-full bg-tertiary-fixed text-[11px] font-bold text-tertiary border border-tertiary/15'>
                    Inertia Emulation
                  </span>
                  <span className='px-3 py-1 rounded-full bg-tertiary-fixed text-[11px] font-bold text-tertiary border border-tertiary/15'>
                    Frequency Regulation
                  </span>
                  <span className='px-3 py-1 rounded-full bg-tertiary-fixed text-[11px] font-bold text-tertiary border border-tertiary/15'>
                    Dynamic Capacity
                  </span>
                </div>
              </div>
              <div className='lg:col-span-5 p-4 bg-tertiary-fixed/30 rounded-2xl border border-outline/10 text-center'>
                <div className='font-display text-5xl font-extrabold text-tertiary'>
                  1.2 s
                </div>
                <p className='text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-2'>
                  {lang === 'EN'
                    ? 'BESS Primary Response Rate'
                    : 'Czas reakcji pierwotnej magazynów'}
                </p>
                <div className='text-[11px] text-outline mt-1.5 font-sans'>
                  {lang === 'EN'
                    ? 'Near-instant dispatch to offset generator drops'
                    : 'Błyskawiczne uruchomienie przy zaniku generacji'}
                </div>
              </div>
            </div>
          )}

          {selectedPillar === 'microgrid' && (
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-center'>
              <div className='lg:col-span-7 flex flex-col gap-4 text-left'>
                <span className='text-xs font-bold text-secondary uppercase tracking-wider'>
                  {dict.microgridIntegration}
                </span>
                <h4 className='font-display text-2xl font-bold text-on-background'>
                  {lang === 'EN'
                    ? 'Autonomous Islanding Resilience'
                    : 'Autonomiczna Praca Wyspowa'}
                </h4>
                <p className='text-sm text-on-surface-variant leading-relaxed'>
                  {lang === 'EN'
                    ? 'Microgrids act as local energy islands. In the event of a macro-grid blackout, high-voltage relays isolate the microgrid automatically, switching to secondary biomass and electrochemical batteries. This maintains 100% vital asset operational reliability for clinics, municipal centers, and local transit utilities.'
                    : 'Mikrosieci działają jako lokalne wyspy energetyczne. W przypadku awarii sieci ogólnokrajowej (blackoutu), automatyczne przekaźniki odłączają mikrosieć, przełączając ją na zasilanie z biomasy i magazynów bateryjnych. Gwarantuje to 100% ciągłości działania krytycznej infrastruktury.'}
                </p>
                <div className='flex flex-wrap gap-2 pt-2'>
                  <span className='px-3 py-1 rounded-full bg-secondary-container/40 text-[11px] font-bold text-secondary border border-secondary/15'>
                    Islanded Operation
                  </span>
                  <span className='px-3 py-1 rounded-full bg-secondary-container/40 text-[11px] font-bold text-secondary border border-secondary/15'>
                    Hardware-In-The-Loop
                  </span>
                  <span className='px-3 py-1 rounded-full bg-secondary-container/40 text-[11px] font-bold text-secondary border border-secondary/15'>
                    Distributed Relays
                  </span>
                </div>
              </div>
              <div className='lg:col-span-5 p-4 bg-surface-container rounded-2xl border border-outline/10 text-center'>
                <div className='font-display text-5xl font-extrabold text-secondary'>
                  48 h
                </div>
                <p className='text-xs text-on-surface-variant font-bold uppercase tracking-wider mt-2'>
                  {lang === 'EN'
                    ? 'Verified Continuous Islanding'
                    : 'Ciągła praca wyspowa (pilot)'}
                </p>
                <div className='text-[11px] text-outline mt-1.5 font-sans'>
                  {lang === 'EN'
                    ? 'Proven with 0% load-shedding during Warsaw trials'
                    : 'Sprawdzone z 0% odłączeń podczas testów w Warszawie'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Modeling Sandbox Segment */}
        <div
          id='modeling'
          className='scroll-mt-24 bg-gradient-to-br from-white via-surface-container-low to-white rounded-3xl border border-outline/15 p-6 sm:p-10 shadow-lg energy-glow'
        >
          <div className='flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8 border-b border-outline/10 pb-6'>
            <div className='text-left'>
              <div className='inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2'>
                <Sliders className='w-3.5 h-3.5' />
                <span>NCAE RESEARCH SANDBOX v2.1</span>
              </div>
              <h3 className='font-display text-2xl font-extrabold text-on-background'>
                {dict.simTitle}
              </h3>
              <p className='text-sm text-on-surface-variant mt-1.5 max-w-2xl'>
                {dict.simInstructions}
              </p>
            </div>

            {/* Presets Button Bar */}
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-xs font-bold text-on-surface-variant mr-1'>
                {dict.applyPre}
              </span>
              <button
                onClick={() => applyPreset('perfect')}
                className='bg-surface hover:bg-surface-container border border-primary/25 text-primary text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer transition-colors'
              >
                {dict.presetPerfect}
              </button>
              <button
                onClick={() => applyPreset('storm')}
                className='bg-surface hover:bg-surface-container border border-tertiary/25 text-tertiary text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer transition-colors'
              >
                {dict.presetStorm}
              </button>
              <button
                onClick={() => applyPreset('night')}
                className='bg-surface hover:bg-surface-container border border-red-500/25 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full cursor-pointer transition-colors'
              >
                {dict.presetNight}
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Control Sliders List (8 cols) */}
            <div className='lg:col-span-7 flex flex-col gap-6 text-left'>
              {/* Generation Subtitle */}
              <div className='border-l-4 border-primary pl-3'>
                <h4 className='text-sm font-bold text-primary uppercase tracking-wider'>
                  {lang === 'EN'
                    ? 'Power Generation Sources'
                    : 'Źródła Generacji Mocy'}
                </h4>
              </div>

              {nodes
                .filter(n => n.type === 'generation')
                .map(n => (
                  <div
                    key={n.id}
                    className='p-4 bg-background/50 rounded-xl border border-outline/10 flex flex-col gap-2.5'
                  >
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        {n.id === 'solar' ? (
                          <Sun className='w-4 h-4 text-emerald-500' />
                        ) : n.id === 'wind' ? (
                          <Wind className='w-4 h-4 text-cyan-500' />
                        ) : (
                          <Leaf className='w-4 h-4 text-emerald-700' />
                        )}
                        <span className='text-sm font-bold text-on-background'>
                          {lang === 'EN' ? n.labelEN : n.labelPL}
                        </span>
                        <span className='text-[11px] text-outline'>
                          ({lang === 'EN' ? n.descriptionEN : n.descriptionPL})
                        </span>
                      </div>
                      <span className='font-mono text-sm font-bold text-primary'>
                        {n.value} {n.unit}
                      </span>
                    </div>
                    <input
                      type='range'
                      min={n.min}
                      max={n.max}
                      step={n.step}
                      value={n.value}
                      label={lang === 'EN' ? n.labelEN : n.labelPL}
                      onChange={e =>
                        handleSliderChange(n.id, Number(e.target.value))
                      }
                      className='w-full h-1.5 bg-outline/20 rounded-lg appearance-none cursor-pointer accent-primary'
                    />
                  </div>
                ))}

              {/* Demand & Interconnect Subtitle */}
              <div className='border-l-4 border-tertiary pl-3 mt-2'>
                <h4 className='text-sm font-bold text-tertiary uppercase tracking-wider'>
                  {lang === 'EN'
                    ? 'Loads & External Interconnections'
                    : 'Obciążenia i Połączenia Zewnętrzne'}
                </h4>
              </div>

              {nodes
                .filter(n => n.type === 'load' || n.type === 'transmission')
                .map(n => (
                  <div
                    key={n.id}
                    className='p-4 bg-background/50 rounded-xl border border-outline/10 flex flex-col gap-2.5'
                  >
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        {n.id === 'transmission' ? (
                          <RefreshCw className='w-4 h-4 text-blue-500' />
                        ) : (
                          <Zap className='w-4 h-4 text-red-500' />
                        )}
                        <span className='text-sm font-bold text-on-background'>
                          {lang === 'EN' ? n.labelEN : n.labelPL}
                        </span>
                        <span className='text-[11px] text-outline'>
                          ({lang === 'EN' ? n.descriptionEN : n.descriptionPL})
                        </span>
                      </div>
                      <span
                        className={`font-mono text-sm font-bold ${
                          n.id === 'transmission'
                            ? 'text-blue-600'
                            : 'text-red-500'
                        }`}
                      >
                        {n.value} {n.unit}
                      </span>
                    </div>
                    <input
                      type='range'
                      min={n.min}
                      max={n.max}
                      step={n.step}
                      value={n.value}
                      label={lang === 'EN' ? n.labelEN : n.labelPL}
                      onChange={e =>
                        handleSliderChange(n.id, Number(e.target.value))
                      }
                      className={`w-full h-1.5 bg-outline/20 rounded-lg appearance-none cursor-pointer ${
                        n.id === 'transmission'
                          ? 'accent-blue-500'
                          : 'accent-red-500'
                      }`}
                    />
                    {n.id === 'transmission' && (
                      <div className='text-[10px] text-outline font-semibold flex justify-between px-1'>
                        <span>
                          {lang === 'EN'
                            ? '← EXPORTING SURPLUS'
                            : '← EKSPORT NADWYŻKI'}
                        </span>
                        <span>
                          {lang === 'EN'
                            ? 'IMPORTING IN DEFICIT →'
                            : 'IMPORT PRZY DEFICYCIE →'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* Live Metrics Monitoring Panel (5 cols) */}
            <div className='lg:col-span-5 flex flex-col gap-6'>
              <div className='p-5 rounded-2xl bg-on-background text-background flex flex-col gap-5 text-left border border-outline/20 shadow'>
                {/* Panel Header */}
                <div className='flex justify-between items-center border-b border-background/10 pb-3'>
                  <div className='flex items-center gap-2'>
                    <Activity className='w-4 h-4 text-primary-container' />
                    <span className='text-xs font-bold uppercase tracking-wider text-primary-container'>
                      LIVE STATE TELEMETRY
                    </span>
                  </div>
                  <span className='font-mono text-[10px] bg-background/10 px-2 py-0.5 rounded text-outline-variant'>
                    SYSTEM FREQ: 50.00 Hz
                  </span>
                </div>

                {/* Grid Stability Circle Meter */}
                <div className='flex items-center justify-between gap-4 py-2'>
                  <div>
                    <div className='text-xs text-outline-variant uppercase font-bold tracking-wider'>
                      {dict.simStability}
                    </div>
                    <div className='font-display text-4xl font-extrabold text-background mt-1'>
                      {simResult.stabilityScore}%
                    </div>
                  </div>
                  <div className='relative w-16 h-16 flex items-center justify-center'>
                    {/* Circle path outline */}
                    <svg className='w-full h-full transform -rotate-90'>
                      <circle
                        cx='32'
                        cy='32'
                        r='28'
                        stroke='rgba(255,255,255,0.08)'
                        strokeWidth='6'
                        fill='transparent'
                      />
                      <circle
                        cx='32'
                        cy='32'
                        r='28'
                        stroke={
                          simResult.stabilityScore > 80
                            ? '#10b981'
                            : simResult.stabilityScore > 40
                            ? '#f59e0b'
                            : '#ef4444'
                        }
                        strokeWidth='6'
                        fill='transparent'
                        strokeDasharray={2 * Math.PI * 28}
                        strokeDashoffset={
                          2 *
                          Math.PI *
                          28 *
                          (1 - simResult.stabilityScore / 100)
                        }
                        className='transition-all duration-500'
                      />
                    </svg>
                    <span className='absolute text-[11px] font-mono font-bold'>
                      {simResult.stabilityScore}%
                    </span>
                  </div>
                </div>

                {/* Key Telemetry Stats Rows */}
                <div className='grid grid-cols-2 gap-4 border-y border-background/10 py-4'>
                  <div>
                    <div className='text-[11px] text-outline-variant uppercase font-bold tracking-wider'>
                      {dict.simTotalGen}
                    </div>
                    <div className='font-mono text-lg font-bold text-emerald-400 mt-1'>
                      {simResult.totalGeneration} MW
                    </div>
                  </div>
                  <div>
                    <div className='text-[11px] text-outline-variant uppercase font-bold tracking-wider'>
                      {dict.simTotalLoad}
                    </div>
                    <div className='font-mono text-lg font-bold text-rose-400 mt-1'>
                      {simResult.totalLoad} MW
                    </div>
                  </div>
                </div>

                {/* Battery Dispatch Mode */}
                <div className='p-3 rounded-xl bg-background/5 border border-background/10'>
                  <div className='flex justify-between items-center mb-1.5'>
                    <span className='text-[11px] text-outline-variant uppercase font-bold tracking-wider'>
                      {dict.simBatteryState} (BESS)
                    </span>
                    <Battery
                      className={`w-4 h-4 ${
                        simResult.batteryFlow > 0
                          ? 'text-emerald-400 animate-pulse'
                          : simResult.batteryFlow < 0
                          ? 'text-rose-400'
                          : 'text-outline-variant'
                      }`}
                    />
                  </div>
                  <div className='flex justify-between items-baseline'>
                    <span className='text-xs text-outline-variant'>
                      {simResult.batteryFlow > 0
                        ? lang === 'EN'
                          ? 'Charging'
                          : 'Ładowanie'
                        : simResult.batteryFlow < 0
                        ? lang === 'EN'
                          ? 'Discharging'
                          : 'Rozładowywanie'
                        : lang === 'EN'
                        ? 'Idle Reserve'
                        : 'Rezerwa bezczynna'}
                    </span>
                    <span
                      className={`font-mono text-sm font-bold ${
                        simResult.batteryFlow > 0
                          ? 'text-emerald-400'
                          : simResult.batteryFlow < 0
                          ? 'text-rose-400'
                          : 'text-outline-variant'
                      }`}
                    >
                      {simResult.batteryFlow > 0
                        ? `+${simResult.batteryFlow}`
                        : simResult.batteryFlow}{' '}
                      MW
                    </span>
                  </div>
                  {/* Progress bar to represent flow */}
                  <div className='w-full bg-background/10 h-1.5 rounded-full mt-2.5 overflow-hidden'>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        simResult.batteryFlow > 0
                          ? 'bg-emerald-400'
                          : simResult.batteryFlow < 0
                          ? 'bg-rose-400'
                          : 'bg-outline-variant'
                      }`}
                      style={{
                        width: `${Math.min(
                          100,
                          (Math.abs(simResult.batteryFlow) / 15) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>

                {/* Net Remaining Frequency Balance */}
                <div className='flex justify-between items-center py-1'>
                  <span className='text-xs text-outline-variant uppercase font-bold tracking-wider'>
                    {dict.simNetBalance}
                  </span>
                  <span
                    className={`font-mono text-base font-bold ${
                      Math.abs(simResult.netBalance) < 0.6
                        ? 'text-emerald-400'
                        : 'text-red-400'
                    }`}
                  >
                    {simResult.netBalance > 0
                      ? `+${simResult.netBalance}`
                      : simResult.netBalance}{' '}
                    MW
                  </span>
                </div>

                {/* Carbon Offset badge */}
                <div className='p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between'>
                  <div className='flex items-center gap-2 text-primary-container'>
                    <Leaf className='w-4 h-4 text-emerald-400' />
                    <span className='text-xs font-bold uppercase tracking-wider'>
                      {dict.simCarbon}
                    </span>
                  </div>
                  <span className='font-mono text-sm font-extrabold text-emerald-400'>
                    {simResult.carbonSaved} t/h
                  </span>
                </div>

                {/* Status Indicator Bar */}
                <div
                  className={`p-4 rounded-xl flex items-start gap-3 mt-2 ${
                    Math.abs(simResult.netBalance) < 0.6
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {Math.abs(simResult.netBalance) < 0.6 ? (
                    <CheckCircle2 className='w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-400' />
                  ) : (
                    <ShieldAlert className='w-5 h-5 flex-shrink-0 mt-0.5 text-red-400' />
                  )}
                  <div className='flex-1 text-xs'>
                    <div className='font-bold uppercase tracking-wider'>
                      {Math.abs(simResult.netBalance) < 0.6
                        ? dict.simStatusBalanced
                        : simResult.netBalance > 0
                        ? dict.simStatusSurplus
                        : dict.simStatusDeficit}
                    </div>
                    <p className='text-outline-variant leading-relaxed mt-1'>
                      {Math.abs(simResult.netBalance) < 0.6
                        ? dict.simAlertStable
                        : simResult.netBalance > 0
                        ? dict.simAlertSurplus
                        : dict.simAlertDeficit}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative Tip Box */}
              <div className='p-4 rounded-2xl bg-surface border border-primary/15 text-left flex gap-3 text-sm leading-relaxed text-on-surface-variant'>
                <Info className='w-5 h-5 text-primary flex-shrink-0 mt-0.5' />
                <p>
                  {lang === 'EN'
                    ? 'BESS (Battery Energy Storage System) acts as a primary secondary-frequency reserve. When demand spikes or solar drops instantly, the central controller triggers fast-discharge within 1200ms to stabilize grid inertia.'
                    : 'BESS (akumulatorowy magazyn energii) działa jako pierwotna rezerwa częstotliwości. Gdy popyt gwałtownie wzrasta, system automatycznie aktywuje rozładowywanie w czasie mniejszym niż 1,2 sekundy.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
