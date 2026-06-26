export type Language = 'EN' | 'PL';

export interface Article {
  id: string;
  type: 'Report' | 'Analysis' | 'Case Study';
  titleEN: string;
  titlePL: string;
  excerptEN: string;
  excerptPL: string;
  contentEN: string;
  contentPL: string;
  readTimeEN: string;
  readTimePL: string;
  image?: string;
  date: string;
  author: string;
}

export type NodeType = 'generation' | 'load' | 'storage' | 'transmission';

export interface GridNode {
  id: string;
  labelEN: string;
  labelPL: string;
  value: number; // Current value in MW
  unit: string;
  min: number;
  max: number;
  step: number;
  type: NodeType;
  color: string;
  descriptionEN: string;
  descriptionPL: string;
}

export interface SimulationResult {
  totalGeneration: number;
  totalLoad: number;
  batteryFlow: number; // positive = charging, negative = discharging
  netBalance: number;
  stabilityScore: number; // 0 - 100
  carbonSaved: number; // tons/hr
  status: 'balanced' | 'surplus' | 'deficit';
}

export interface ExpertApplication {
  name: string;
  email: string;
  expertiseArea: string;
  affiliation: string;
  motivation: string;
  privacyAccepted: boolean;
}
