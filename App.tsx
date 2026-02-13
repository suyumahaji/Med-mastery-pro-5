import React, { useState } from 'react';
import { AppView } from './types.ts';
import Layout from './Layout.tsx';
import Dashboard from './Dashboard.tsx';
import CaseSimulator from './CaseSimulator.tsx';
import AITutor from './AITutor.tsx';
import KnowledgeGraph from './KnowledgeGraph.tsx';
import QBank from './QBank.tsx';
import GuidelineLab from './GuidelineLab.tsx';
import Flashcards from './Flashcards.tsx';
import ResourceHub from './ResourceHub.tsx';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.Q_BANK: return <QBank />;
      case AppView.CASE_SIMULATOR: return <CaseSimulator />;
      case AppView.AI_TUTOR: return <AITutor />;
      case AppView.GUIDELINE_LAB: return <GuidelineLab />;
      case AppView.KNOWLEDGE_GRAPH: return <KnowledgeGraph />;
      case AppView.STUDY_DECK: return <Flashcards />;
      case AppView.RESOURCE_HUB: return <ResourceHub />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;