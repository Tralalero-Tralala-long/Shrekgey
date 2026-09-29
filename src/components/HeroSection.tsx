import React from 'react';
import { ChevronDown, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onStartChat?: () => void;
  onExploreTopic?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreTopic,
}) => {
  const spaceVideoUrl =
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4b73c700-3112-4c07-bd48-0af2893dff7c.mp4';
  const spacePoster =
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0bf7409c-9fa2-4bef-a49d-34903dcc91ad.png';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src={spaceVideoUrl}
        poster={spacePoster}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Top Clean Navigation matching English Presentation theme */}
      <header className="w-full px-6 md:px-12 lg:px-16 pt-6 z-20">
        <nav className="liquid-glass rounded-2xl px-5 py-3 flex items-center justify-between border border-white/15 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-lg font-bold tracking-tight text-white cursor-pointer select-none font-serif"
            >
              Vocabulary Choice
            </span>
            <span className="hidden sm:inline-block text-xs font-mono text-amber-300/80 border-l border-white/20 pl-3">
              IGCSE English
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-white/80">
            <button
              onClick={() => scrollTo('concept')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Denotation &amp; Connotation
            </button>
            <button
              onClick={() => scrollTo('contrast')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Verb Power
            </button>
            <button
              onClick={() => scrollTo('sorting-lab')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sorting
            </button>
            <button
              onClick={() => scrollTo('semantic-fields')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Semantic Fields
            </button>
            <button
              onClick={() => scrollTo('exam-sprint')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Exam Practice
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="?tab=quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Quiz ↗</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Content: Focused completely on Grade 10 IGCSE English Topic */}
      <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-16 z-10 pointer-events-auto max-w-6xl">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono font-medium">
            <span>Cambridge IGCSE First Language English</span>
            <span>·</span>
            <span>Paper 1 &amp; 2</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] font-serif">
            The Power of <br />
            <span className="italic text-amber-300">Vocabulary Choice</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-200 leading-relaxed font-light">
            Same meaning <span className="text-rose-400 font-normal">≠</span> Same effect. Writers choose words not merely for literal definition, but for the precise emotions, atmosphere, and psychological reactions they evoke in the reader.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreTopic}
              className="px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <span>Explore Presentation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="?tab=quiz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl liquid-glass border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-amber-300" />
              <span>Take IGCSE Quiz</span>
            </a>
          </div>

          <div className="pt-6 text-xs text-gray-400 font-mono flex items-center gap-4">
            <span>By Shreyas, rian, Sriman</span>
            <span>·</span>
            <span>Grade 10 English Masterclass</span>
          </div>
        </div>
      </div>
    </section>
  );
};
