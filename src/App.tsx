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
import { ChatModal } from './components/ChatModal';
import { GameShowQuiz } from './components/GameShowQuiz';
import { playPop } from './utils/audio';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [activeSlideNumber, setActiveSlideNumber] = useState(1);

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

  // The Orbit painterly space background video URL
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

  // If in quiz tab mode, display the full GameShowQuiz
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
      {/* 
        FIXED FULL-SITE BACKGROUND:
        The exact painterly space video requested plays seamlessly behind the entire website as you scroll.
        Video: planet, mint-green flames, moons, asteroids, satellites, and violet cumulus clouds.
      */}
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
        {/* Subtle glass atmospheric gradient to ensure high readability of text while keeping the artwork vibrant */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/85 pointer-events-none" />
      </div>

      {/* 1. Hero Section */}
      <HeroSection
        onStartChat={() => setIsChatOpen(true)}
        onExploreTopic={handleExploreTopic}
      />

      {/* Anchor for smooth scroll from hero */}
      <div id="presentation-entry" className="pt-6" />

      {/* 2. Interactive Presentation Sticky Navigation Bar */}
      <PresentationNav
        currentSlide={activeSlideNumber}
        totalSlides={14}
        onOpenDeckView={() => setIsDeckOpen(true)}
        onOpenExamSprint={handleOpenExamSprint}
      />

      {/* 3. Main Presentation Sections with Glassmorphism, Parallax & 3D Interactive Components */}
      <main className="relative z-10 space-y-12 pb-16">
        {/* Slide 1 & 3: Core Concept (Denotation vs Connotation) */}
        <CoreConcept />

        {/* Slide 2: Same man. Same room. (Shuffled vs Strode) */}
        <SentenceContrast />

        {/* Slides 4 & 5: Sort the Feeling (Interactive Drag/Click Sorting Lab) */}
        <SortTheFeeling />

        {/* Slide 6: Same death, three attitudes. (3D Pop-out Shapes) */}
        <ThreeAttitudes />

        {/* Slide 7: Semantic Fields & Moods (Cumulative Atmosphere & Secret Note) */}
        <SemanticAtmosphere />

        {/* Slide 8: The Orwellian Anomaly (Clock Striking Thirteen) */}
        <OrwellClock />

        {/* Slides 9 & 12: Word Class Power: Verbs & Adjectives (F1 Speed & Skinny to Slender) */}
        <VerbPower />

        {/* Slide 10: Vocabulary Showdown (Wave Energy Simulator) */}
        <WaveShowdown />

        {/* Slide 11: Exam Sprint (3:00 Live Timer & 0/3 Rubric) */}
        <ExamSprint />

        {/* Slides 12 & 13: Answer Key & Practice Deck (Exam advice) */}
        <AnswerKeyPractice />

        {/* Slide 14: Credits & The Live Game Show Quiz button */}
        <PresentationCredits
          onOpenDeckView={() => setIsDeckOpen(true)}
          onOpenQuiz={() => {
            // Can be opened in new tab or current tab
          }}
        />
      </main>

      {/* Interactive 14-Slide Presentation Deck Modal */}
      <SlideDeckModal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        initialSlide={1}
      />

      {/* Interactive Chat Assistant Modal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
