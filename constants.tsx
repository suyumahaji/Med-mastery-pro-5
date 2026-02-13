import React from 'react';
import { VignetteQuestion, MedicalSubject, GuidelineComparison, Flashcard } from './types.ts';

export const MEDICAL_SYSTEM_PROMPT = `You are the Med Mastery Pro Chief Medical Officer. Deliver clinical logic via the OnCourse AI Methodology: Phase 1: Probe (Socratic hint), Phase 2: Solve (Deductive logic), Phase 3: Audit (Distractor Analysis), Phase 4: Revision (Rapid Revision Pearl), Phase 5: Synapses (Gamified link).`;

export const VIGNETTE_DATA: VignetteQuestion[] = [
  {
    id: 'SURG-101',
    category: 'Surgery',
    title: 'Obstructive Shock',
    prompt: '24M after MVA with RR 34, BP 70/40, HR 140, distended neck veins. Absent breath sounds on the left, trachea shifted right. Immediate priority?',
    options: ['Chest X-ray', 'Needle decompression (5th ICS AAL)', 'Intubation', 'FAST scan', 'Laparotomy'],
    answerIndex: 1,
    socraticProbe: "Shock + JVD + Absent breath sounds. Is it safe to wait for imaging?",
    residencyDirectorLogic: "1. Recognize Tension Pneumothorax. 2. Pathophysiology: One-way valve creates obstructive shock. 3. ATLS 11: Immediate decompression at 5th ICS AAL.",
    distractorAnalysis: ["Fatal delay", "Correct priority", "Worsens tension", "For tamponade", "Not primary"],
    conceptCluster: "Tension Pneumothorax converts to cardiovascular collapse.",
    revisionPearl: "Tension Pneumo: JVD + Shift + Shock. Tx: 5th ICS AAL Needle.",
    synapsesLink: "Tracheal Shift? -> Decompress.",
    sources: [{ title: 'ATLS 11', type: 'Global' }]
  }
];

export const MEDICAL_DATABASE: Record<MedicalSubject, VignetteQuestion[]> = {
  'Surgery': VIGNETTE_DATA.filter(v => v.category === 'Surgery'),
  'Gynobs': [], 'Pediatrics': [], 'Ethics': [], 'Psychiatry': [], 'Dermatology': [], 'ENT': [], 'Ophthalmology': [], 'Internal Medicine': [], 'Miscellaneous': []
};

export const GUIDELINE_DATA: GuidelineComparison[] = [
  { topic: 'HTN Management', intl: 'ACC: 130/80', local: 'Natl: 140/90', rule: 'Initiate lifestyle changes early.' }
];

export const FLASHCARD_DATA: Flashcard[] = [
  { id: 'FC-1', front: 'CURB-65 Criteria', back: 'Confusion, Urea (>7), RR (>30), BP (<90/60), Age 65.', category: 'Medicine', difficulty: 'Easy' }
];

export const RESOURCE_LINKS = [
  { name: 'UpToDate', url: 'https://www.uptodate.com', description: 'Clinical decision support.' },
  { name: 'Medscape', url: 'https://www.medscape.com', description: 'Drug database and news.' },
  { name: 'MDCalc', url: 'https://www.mdcalc.com', description: 'Medical calculators and scores.' }
];

export const Icons = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  QBank: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>,
  Stethoscope: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.046 3 5.5L12 21l7-7Z"/></svg>,
  Brain: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/></svg>,
  Guidelines: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  Network: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>,
  Book: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/></svg>,
  Hub: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v10"/><path d="M18.4 4.6a9 9 0 1 1-12.8 0"/></svg>
};