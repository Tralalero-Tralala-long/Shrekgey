import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { PresentationNav } from './components/PresentationNav';
import { CoreConcept } from './components/CoreConcept';
import { SentenceContrast } from './components/SentenceContrast';
import { SortTheFeeling } from './components/SortTheFeeling';
import { ThreeAttitudes } from './components/ThreeAttitudes';
import { SemanticAtmosphere } from './components/SemanticAtmosphere';
import { OrwellClock } from './components/OrwellClock';
import { VerbPower } from './components/VerbPower';
import { WaveShowdown } from './components/WaveShowdown';
import { ExamSprint } from './components/ExamSprint';
import { AnswerKeyPractice } from './components/AnswerKeyPractice';
import { PresentationCredits } from './components/PresentationCredits';
import { SlideDeckModal } from './components/SlideDeckModal';
import { GameShowQuiz } from './components/GameShowQuiz';
import { playPop } from './utils/audio';

export default function App() {
  const [isDeckOpen, setIsDeckOpen] = useState(false);

  // Check if opened as dedicated Quiz tab via ?tab=quiz or #quiz
  const [currentView, setCurrentView] = useState<'main' | 'quiz'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'quiz' || window.location.hash === '#quiz') {
        return 'quiz';
      }
    }
    return 'main';
  });

  // Listen to popstate or hash change
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'quiz' || window.location.hash === '#quiz') {
        setCurrentView('quiz');
      } else {
        setCurrentView('main');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Space background video
  const spaceVideoUrl =
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4b73c700-3112-4c07-bd48-0af2893dff7c.mp4';
  const spacePoster =
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0bf7409c-9fa2-4bef-a49d-34903dcc91ad.png';

  const handleExploreTopic = () => {
    playPop();
    const elem = document.getElementById('presentation-entry');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenExamSprint = () => {
    playPop();
    const elem = document.getElementById('exam-sprint');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'quiz') {
    return (
      <GameShowQuiz
        onBackToPresentation={() => {
          if (window.history.length > 1) {
            window.history.back();
          } else {
            window.location.search = '';
            setCurrentView('main');
          }
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen text-white selection:bg-amber-400 selection:text-black font-sans antialiased overflow-x-hidden">
      {/* Background celestial video */}
      <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={spaceVideoUrl}
          poster={spacePoster}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/85 pointer-events-none" />
      </div>

      {/* Hero Section */}
      <HeroSection onExploreTopic={handleExploreTopic} />

      {/* Anchor for smooth scroll */}
      <div id="presentation-entry" className="pt-4" />

      {/* Presentation Sticky Navigation */}
      <PresentationNav
        onOpenDeckView={() => setIsDeckOpen(true)}
        onOpenExamSprint={handleOpenExamSprint}
      />

      {/* Main Sections */}
      <main className="relative z-10 space-y-6 pb-16">
        <CoreConcept />
        <SentenceContrast />
        <SortTheFeeling />
        <ThreeAttitudes />
        <SemanticAtmosphere />
        <OrwellClock />
        <VerbPower />
        <WaveShowdown />
        <ExamSprint />
        <AnswerKeyPractice />
        <PresentationCredits
          onOpenDeckView={() => setIsDeckOpen(true)}
        />
      </main>

      {/* Slide Deck Modal */}
      <SlideDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        initialSlide={1}
      />
    </div>
  );
}
