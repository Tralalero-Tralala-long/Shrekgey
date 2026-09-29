import React from 'react';
import { Volume2, VolumeX, Gamepad2, BookOpen } from 'lucide-react';
import { isSoundEnabled, toggleSound, playPop } from '../utils/audio';

interface PresentationNavProps {
  onOpenDeckView: () => void;
  onOpenExamSprint: () => void;
}

export const PresentationNav: React.FC<PresentationNavProps> = ({
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
    { label: 'Core Principle', href: '#concept' },
    { label: 'Sentence Contrast', href: '#contrast' },
    { label: 'Sorting Words', href: '#sorting-lab' },
    { label: 'Tonal Attitudes', href: '#attitudes' },
    { label: 'Semantic Fields', href: '#semantic-fields' },
    { label: 'Orwell Example', href: '#orwell-clock' },
    { label: 'Verbs & Pace', href: '#verbs' },
    { label: 'Word Showdown', href: '#showdown' },
    { label: 'Exam Sprint', href: '#exam-sprint' },
    { label: 'Answer Key', href: '#answer-key' },
  ];

  return (
    <nav className="sticky top-4 z-40 px-4 md:px-8 max-w-7xl mx-auto mb-8">
      <div className="liquid-glass border border-white/15 rounded-2xl px-5 py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-black/40">
        <a
          href="#concept"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => playPop()}
        >
          <span className="text-sm font-semibold tracking-tight text-white font-serif">
            Vocabulary Choice
          </span>
          <span className="text-[11px] text-white/50 hidden sm:inline">
            · Shreyas, rian, Sriman
          </span>
        </a>

        {/* Clean Nav Links */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-medium text-white/70">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => playPop()}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href="?tab=quiz"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playPop(540)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-amber-400 text-black hover:bg-amber-300 rounded-lg transition-all cursor-pointer shadow-sm"
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Quiz ↗</span>
          </a>

          <button
            onClick={() => {
              playPop();
              onOpenDeckView();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors cursor-pointer border border-white/10"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Slide Mode</span>
          </button>

          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Mute audio' : 'Enable audio'}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
          </button>
        </div>
      </div>
    </nav>
  );
};
