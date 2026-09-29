import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';

export const CoreConcept: React.FC = () => {
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const wordExamples = [
    {
      word: 'Home',
      denotation: 'A physical dwelling place or permanent residence.',
      connotation: 'Warmth, security, belonging, family, sanctuary.',
      contrast: 'House (neutral building) vs Home (emotional sanctuary)',
    },
    {
      word: 'Youthful',
      denotation: 'Characteristics of a young person.',
      connotation: 'Vibrant, energetic, fresh, full of potential.',
      contrast: 'Childish (immature) vs Youthful (lively & vigorous)',
    },
    {
      word: 'Gaze',
      denotation: 'To look steadily and intently at something.',
      connotation: 'Admiration, wonder, contemplation, romantic longing.',
      contrast: 'Stare (uncomfortable/creepy) vs Gaze (thoughtful/tender)',
    },
    {
      word: 'Economical',
      denotation: 'Giving good value in relation to money or time.',
      connotation: 'Prudent, wise, resourceful, disciplined.',
      contrast: 'Cheap (poor quality/stingy) vs Economical (smart stewardship)',
    },
  ];

  return (
    <section id="concept" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header without awkward numbers */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          What is Vocabulary Choice?
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          The deliberate selection of words by a writer. Writers do not just choose words for what they mean—they choose them for what they <span className="text-amber-300 font-medium">suggest</span> and <span className="text-amber-300 font-medium">convey</span> to the reader.
        </p>
      </div>

      {/* Main Core Formula: Same Meaning ≠ Same Effect */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* The Golden Rule */}
        <Card3D depth={12}>
          <div className="liquid-glass border border-white/15 rounded-2xl p-7 h-full flex flex-col justify-between bg-[#0e1424]/80 shadow-xl">
            <div>
              <div className="text-xs uppercase font-mono text-amber-400 tracking-wider mb-2 font-semibold">
                Core Principle
              </div>
              <div className="text-2xl font-bold tracking-tight text-white mb-3">
                Same meaning <span className="text-rose-400">≠</span> Same effect
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Two words can share the identical dictionary definition, yet evoke completely different reactions in the reader’s mind.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-amber-300/80 font-mono">
              Key Focus for IGCSE English Analysis
            </div>
          </div>
        </Card3D>

        {/* Denotation Card */}
        <Card3D depth={12}>
          <div className="liquid-glass border border-white/15 rounded-2xl p-7 h-full flex flex-col justify-between bg-[#0c121e]/80 shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-2 font-semibold">
                Definition
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Denotation
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The literal, dictionary meaning of a word, separate from any feelings or ideas it may suggest.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-sky-950/40 border border-sky-400/20 text-xs text-sky-200">
              <strong>Example:</strong> &quot;Home&quot; denotes a physical building where one lives.
            </div>
          </div>
        </Card3D>

        {/* Connotation Card */}
        <Card3D depth={12}>
          <div className="liquid-glass border border-white/15 rounded-2xl p-7 h-full flex flex-col justify-between bg-[#150f1b]/80 shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-rose-400 mb-2 font-semibold">
                Definition
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Connotation
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The feelings, ideas, and cultural associations a word carries beyond its literal dictionary meaning.
              </p>
            </div>
            <div className="mt-6 p-3 rounded-xl bg-rose-950/40 border border-rose-500/20 text-xs text-rose-200">
              <strong>Example:</strong> &quot;Home&quot; connotes safety, belonging, love, and comfort.
            </div>
          </div>
        </Card3D>
      </div>

      {/* Clean Word Comparison */}
      <div id="denotation" className="liquid-glass border border-white/15 rounded-2xl p-6 sm:p-8 bg-[#090e18]/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-lg font-bold text-white">
              Comparing Word Connotations
            </h4>
            <p className="text-xs text-gray-400">
              Click a word to see how connotation alters the tone.
            </p>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {wordExamples.map((item, idx) => (
              <button
                key={item.word}
                onClick={() => {
                  playPop();
                  setActiveWordIndex(idx);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeWordIndex === idx
                    ? 'bg-amber-400 text-black font-semibold shadow-md'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {item.word}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Word Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <span className="text-xs uppercase font-mono text-sky-400 block mb-1">
              Denotation (Literal)
            </span>
            <p className="text-sm text-white font-medium">
              {wordExamples[activeWordIndex].denotation}
            </p>
          </div>

          <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-500/20">
            <span className="text-xs uppercase font-mono text-rose-300 block mb-1">
              Connotation (Feelings &amp; Ideas)
            </span>
            <p className="text-sm text-white font-medium">
              {wordExamples[activeWordIndex].connotation}
            </p>
          </div>

          <div className="bg-amber-400/10 rounded-xl p-4 border border-amber-400/20">
            <span className="text-xs uppercase font-mono text-amber-300 block mb-1">
              Contrast &amp; Effect
            </span>
            <p className="text-sm text-amber-100 font-medium">
              {wordExamples[activeWordIndex].contrast}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
