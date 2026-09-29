import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { BookOpen, Compass, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { playPop } from '../utils/audio';

export const CoreConcept: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const wordExamples = [
    {
      word: 'Home',
      denotation: 'A physical dwelling place or permanent residence.',
      connotation: 'Warmth, security, belonging, family, love, sanctuary.',
      contrast: 'House (neutral structure) vs Home (emotional haven)',
      tag: 'Emotional Resonance',
    },
    {
      word: 'Youthful',
      denotation: 'Possessing the characteristics of a young person.',
      connotation: 'Vibrant, energetic, fresh, full of potential, vigorous.',
      contrast: 'Childish (immature/negative) vs Youthful (lively/positive)',
      tag: 'Tone Control',
    },
    {
      word: 'Gaze',
      denotation: 'To look steadily and intently at someone or something.',
      connotation: 'Admiration, wonder, contemplation, romantic longing.',
      contrast: 'Stare (intrusive/creepy) vs Gaze (poetic/tender)',
      tag: 'Attitude Signal',
    },
    {
      word: 'Economical',
      denotation: 'Giving good value or return in relation to money or time.',
      connotation: 'Prudent, wise, resourceful, shrewd stewardship.',
      contrast: 'Cheap (poor quality/stingy) vs Economical (smart/disciplined)',
      tag: 'Value Judgment',
    },
  ];

  return (
    <section id="concept" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Editorial Chapter Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-amber-400 font-semibold mb-3">
          <span>01</span>
          <span>·</span>
          <span>Core Principle</span>
          <span>·</span>
          <span>Shreyas, Sriman and Rian</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          The Power of <span className="font-serif italic text-amber-300">Vocabulary Choice</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          The deliberate selection of words by a writer. Writers don&apos;t just choose words for what they mean—they choose them for what they <span className="text-white font-medium">suggest</span>, and what they could <span className="text-white font-medium">convey</span>.
        </p>
      </div>

      {/* Main Core Formula: Same Meaning ≠ Same Effect */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        {/* Left 3D Card: The Golden Rule */}
        <div className="lg:col-span-5">
          <Card3D depth={18} className="h-full">
            <div className="liquid-glass border border-white/20 rounded-2xl p-8 h-full flex flex-col justify-between bg-[#0e1424]/70 shadow-2xl">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono uppercase text-amber-400/80 tracking-widest mb-2">
                  The Immutable Axiom
                </div>
                <div className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4">
                  Same meaning <span className="text-rose-400">≠</span> Same effect
                </div>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  Two words can share the identical dictionary definition, yet evoke radically opposing psychological realities in the reader’s mind.
                </p>
              </div>

              {/* F1 Velocity Meter Graphic */}
              <div className="bg-black/50 border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Connotative Impact Velocity</span>
                  <span className="text-amber-400 font-mono">340 km/h</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-400 via-rose-500 to-red-500 h-full w-[94%] rounded-full animate-pulse" />
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  Words act like high-downforce aerodynamic wings: shaping emotional drag and narrative acceleration.
                </p>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Right 2-Grid: Denotation vs Connotation */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Denotation Card */}
          <Card3D depth={14} className="h-full">
            <div className="liquid-glass border border-white/15 rounded-2xl p-7 h-full flex flex-col justify-between bg-[#0c121e]/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-sky-400">
                    Lexical Foundation
                  </span>
                  <BookOpen className="w-4 h-4 text-sky-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2">
                  <span>Denotation</span>
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  The literal, dictionary meaning of a word, completely separate from any feelings or ideas it may suggest.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-gray-400 font-mono">
                <span className="text-sky-300 font-semibold">Dictionary Anchor:</span> Objective, cold, matter-of-fact, standardized across all speakers.
              </div>
            </div>
          </Card3D>

          {/* Connotation Card */}
          <Card3D depth={14} className="h-full">
            <div className="liquid-glass border border-rose-500/20 rounded-2xl p-7 h-full flex flex-col justify-between bg-[#150f1b]/60">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                    Emotional Aura
                  </span>
                  <Sparkles className="w-4 h-4 text-rose-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Connotation
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  The feelings, ideas, and cultural associations a word carries far beyond its literal, baseline meaning.
                </p>
              </div>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3.5 text-xs text-rose-200/90 font-mono">
                <span className="text-rose-400 font-semibold">Atmospheric Aura:</span> Subjective, visceral, cultural, charged with implicit judgment.
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Interactive Word Inspector: Explore Connotative Subtlety */}
      <div id="denotation" className="liquid-glass border border-white/15 rounded-2xl p-6 md:p-8 bg-[#090e18]/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-lg md:text-xl font-semibold text-white">
              Interactive Lexical Sandbox
            </h4>
            <p className="text-sm text-gray-400">
              Select a baseline word to inspect how connotation completely transforms its emotional trajectory.
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {wordExamples.map((item, idx) => (
              <button
                key={item.word}
                onClick={() => {
                  playPop();
                  setActiveWordIndex(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeWordIndex === idx
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {item.word}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Word Breakdown Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <span className="text-xs uppercase tracking-wider text-sky-400 font-mono block mb-1">
              Literal Denotation
            </span>
            <p className="text-sm text-white font-medium leading-snug">
              {wordExamples[activeWordIndex].denotation}
            </p>
          </div>

          <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/20">
            <span className="text-xs uppercase tracking-wider text-rose-300 font-mono block mb-1">
              Associated Connotations
            </span>
            <p className="text-sm text-white font-medium leading-snug">
              {wordExamples[activeWordIndex].connotation}
            </p>
          </div>

          <div className="bg-amber-400/10 rounded-xl p-4 border border-amber-400/20 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-300 font-mono block mb-1">
                Comparative Word Choice
              </span>
              <p className="text-sm text-amber-100 font-medium">
                {wordExamples[activeWordIndex].contrast}
              </p>
            </div>
            <div className="mt-3 text-[11px] text-amber-400/80 font-mono">
              Effect: {wordExamples[activeWordIndex].tag}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
