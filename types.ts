
import * as d3 from 'd3';

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CASE_SIMULATOR = 'CASE_SIMULATOR',
  Q_BANK = 'Q_BANK',
  AI_TUTOR = 'AI_TUTOR',
  GUIDELINE_LAB = 'GUIDELINE_LAB',
  KNOWLEDGE_GRAPH = 'KNOWLEDGE_GRAPH',
  STUDY_DECK = 'STUDY_DECK',
  RESOURCE_HUB = 'RESOURCE_HUB'
}

export type MedicalSubject = 
  | 'Surgery' 
  | 'Gynobs' 
  | 'Pediatrics' 
  | 'Ethics' 
  | 'Psychiatry' 
  | 'Dermatology' 
  | 'ENT' 
  | 'Ophthalmology' 
  | 'Internal Medicine' 
  | 'Miscellaneous';

export type StudyMode = 'Practice' | 'Test' | 'Probe';

export interface MedicalCase {
  id: string;
  title: string;
  patientDemographics: string;
  chiefComplaint: string;
  history: string;
  vitals: {
    bp: string;
    hr: string;
    rr: string;
    temp: string;
  };
  physicalExam: string;
  initialLabs?: string;
  rationale?: string;
  correctAnswer?: string;
}

export interface VignetteQuestion {
  id: string;
  category: MedicalSubject;
  title: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  // OnCourse AI Methodology Components
  socraticProbe: string;         // Phase 1: Socratic hint before showing options
  residencyDirectorLogic: string; // Phase 2: 3-5 step deductive reasoning
  distractorAnalysis: string[];   // Phase 3: Specific "Why Wrong" for all options
  conceptCluster: string;        // Phase 4: Physiological mechanism + "Why Right"
  revisionPearl: string;         // Phase 4: High-yield Markdown summary/table
  synapsesLink: string;          // Phase 5: Gamification nudge (Diagnosis -> Treatment)
  managementAlgorithm?: string;  // Visual flow steps
  sources: { title: string; type: 'Local' | 'Global' }[];
}

export interface GuidelineComparison {
  topic: string;
  intl: string;
  local: string;
  rule: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  label: string;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string;
  target: string;
  value: number;
}
