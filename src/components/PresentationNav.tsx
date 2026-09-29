import React from 'react';
import { Volume2, VolumeX, Play, Award, Compass, Sparkles, BookOpen, Gamepad2, ExternalLink } from 'lucide-react';
import { isSoundEnabled, toggleSound, playPop } from '../utils/audio';

interface PresentationNavProps {
  currentSlide: number;
  totalSlides: number;
  onOpenDeckView: () => void;
  onOpenExamSprint: () => void;
}

export const PresentationNav: React.FC<PresentationNavProps> = ({
  currentSlide,
  totalSlides,
  onOpenDeckView,
  onOpenExamSprint,
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
    playPop();
  };

  const navLinks = [
    { label: 'Overview', href: '#concept' },
    { label: 'Contrast', href: '#contrast' },
    { label: 'Denotation vs Connotation', href: '#denotation' },
    { label: 'Sort Lab', href: '#sorting-lab' },
    { label: 'Attitudes', href: '#attitudes' },
    { label: 'Semantic Fields', href: '#semantic-fields' },
    { label: 'Orwell 13', href: '#orwell-clock' },
    { label: 'Verbs', href: '#verbs' },
    { label: 'Showdown', href: '#showdown' },
    { label: 'Exam Sprint', href: '#exam-sprint' },
    { label: 'Answer Key', href: '#answer-key' },
  ];

  return (
    <nav className="sticky top-4 z-40 px-4 md:px-8 max-w-7xl mx-auto mb-6">
      <div className="liquid-glass border border-white/15 rounded-2xl px-4 py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-xl">
        {/* Left: Presentation Info */}
        <div className="flex items-center gap-3">
          <a
            href="#concept"
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => playPop()}
          >
            <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs">
              VC
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                The Power of Vocabulary Choice
              </span>
              <span className="text-[10px] text-white/50 tracking-wider">
                Shreyas · rian · Sriman
              </span>
            </div>
          </a>
        </div>

        {/* Center: Quick navigation links */}
        <div className="hidden lg:flex items-center gap-4 text-xs font-medium text-white/70">
          {navLinks.slice(0, 6).map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => playPop()}
              className="hover:text-white transition-colors duration-150 py-1 px-1.5 rounded"
            >
              {item.label}
            </a>
          ))}
          <div className="relative group">
            <span className="cursor-pointer hover:text-white flex items-center gap-1 py-1 px-1.5">
              <span>More</span>
              <span>▾</span>
            </span>
            <div className="absolute top-full left-0 mt-2 w-44 bg-[#0e1320] border border-white/10 rounded-xl p-2 hidden group-hover:block shadow-xl z-50">
              {navLinks.slice(6).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => playPop()}
                  className="block px-3 py-1.5 text-xs text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right actions: Live Quiz Link, Deck presentation mode, Exam Sprint trigger, Sound */}
        <div className="flex items-center gap-2">
          {/* Direct link to open Game Show Quiz in new tab */}
          <a
            href="?tab=quiz"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playPop(540)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-rose-500 text-black hover:opacity-95 rounded-lg transition-all cursor-pointer shadow-md"
            title="Open English Showdown Game Show Quiz in a new tab"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-black" />
            <span>Quiz ↗</span>
          </a>

          <button
            onClick={() => {
              playPop();
              onOpenDeckView();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer border border-white/15"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Slide Mode ({currentSlide}/{totalSlides})</span>
          </button>

          <button
            onClick={() => {
              playPop();
              onOpenExamSprint();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 text-white hover:bg-white/20 rounded-lg transition-colors cursor-pointer border border-white/10"
          >
            <Award className="w-3.5 h-3.5 text-rose-400" />
            <span>Sprint (3:00)</span>
          </button>

          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Mute sound effects' : 'Enable sound effects'}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
