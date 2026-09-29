import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';

interface CompressorItem {
  id: string;
  weak: string;
  strong: string;
  replaced: string;
  note: string;
}

const EXAMPLES: CompressorItem[] = [
  {
    id: 'c1',
    weak: '“She walked quickly and angrily.”',
    strong: '“She stormed off.”',
    replaced: 'walked + quickly + angrily (3 words)',
    note: '“Stormed” communicates velocity, heavy footsteps, rage, and sudden exit in one punchy verb.',
  },
  {
    id: 'c2',
    weak: '“He looked very closely and suspiciously at the paper.”',
    strong: '“He scrutinized the paper.”',
    replaced: 'looked + very closely + suspiciously (4 words)',
    note: '“Scrutinized” establishes forensic attention and natural skepticism without adverb clutter.',
  },
  {
    id: 'c3',
    weak: '“The fire burned with sudden, violent brightness.”',
    strong: '“The fire flared.”',
    replaced: 'burned + sudden + violent brightness (4 words)',
    note: '“Flared” delivers instant visual intensity with crisp narrative pace.',
  },
];

export const VerbPower: React.FC = () => {
  const [activeEx, setActiveEx] = useState<CompressorItem>(EXAMPLES[0]);
  const [skinnyState, setSkinnyState] = useState<'skinny' | 'slender'>('skinny');

  const toggleSkinny = (val: 'skinny' | 'slender') => {
    playPop();
    setSkinnyState(val);
  };

  return (
    <section id="verbs" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Word Classes: Verbs &amp; Adjectives
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          <strong className="text-white">Verbs</strong> carry action and pace; <strong className="text-white">adjectives</strong> carry description and image. Weak writing frequently overuses adjectives and adverbs to compensate for weak verbs.
        </p>
      </div>

      {/* Clean Comparison Box */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        <div className="md:col-span-4 space-y-2.5">
          <div className="text-xs font-mono uppercase text-gray-400 mb-2">
            Select an example:
          </div>
          {EXAMPLES.map((item) => {
            const isSelected = activeEx.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPop();
                  setActiveEx(item);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400/20 border-amber-400 text-white font-medium'
                    : 'bg-[#0f1422]/60 border-white/10 text-gray-300 hover:bg-[#151c2e]'
                }`}
              >
                <div className="text-xs text-amber-300 font-mono mb-1">
                  Replaces: {item.replaced}
                </div>
                <div className="text-sm font-serif">{item.strong}</div>
              </button>
            );
          })}
        </div>

        <div className="md:col-span-8">
          <Card3D depth={12}>
            <div className="liquid-glass border border-white/15 rounded-2xl p-7 bg-[#0a0e18]/90 h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
                  <span className="text-xs font-mono uppercase text-rose-400 block mb-1">
                    Weak (Padded with adverbs)
                  </span>
                  <div className="text-xl font-serif text-rose-200">
                    {activeEx.weak}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                  <span className="text-xs font-mono uppercase text-emerald-400 block mb-1">
                    Strong (Single High-Impact Verb)
                  </span>
                  <div className="text-2xl font-serif font-bold text-white">
                    {activeEx.strong}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300">
                <strong>Why it works:</strong> {activeEx.note}
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Skinny vs Slender Contrast */}
      <div className="liquid-glass border border-white/15 rounded-2xl p-6 sm:p-8 bg-[#0e1320]/80">
        <h4 className="text-lg font-bold text-white mb-2">
          Adjective Connotation: &ldquo;Skinny&rdquo; vs &ldquo;Slender&rdquo;
        </h4>
        <p className="text-xs text-gray-400 mb-6">
          Both words share the literal denotation of being thin, but carry opposing connotations:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div
            onClick={() => toggleSkinny('skinny')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              skinnyState === 'skinny'
                ? 'bg-rose-950/40 border-rose-500/60 shadow-md'
                : 'bg-white/5 border-white/10 opacity-70'
            }`}
          >
            <div className="text-xs font-mono text-rose-400 mb-1">Negative / Critical</div>
            <div className="text-xl font-serif text-white mb-2">
              &ldquo;She was a <span className="text-rose-400 underline font-bold">skinny</span> girl.&rdquo;
            </div>
            <p className="text-xs text-gray-300">
              Connotes frailty, hunger, bony sharpness, or lack of health.
            </p>
          </div>

          <div
            onClick={() => toggleSkinny('slender')}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              skinnyState === 'slender'
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-md ring-1 ring-emerald-400'
                : 'bg-white/5 border-white/10 opacity-70'
            }`}
          >
            <div className="text-xs font-mono text-emerald-400 mb-1">Positive / Warm</div>
            <div className="text-xl font-serif text-white mb-2">
              &ldquo;She was a <span className="text-emerald-400 underline font-bold">slender</span> girl.&rdquo;
            </div>
            <p className="text-xs text-gray-300">
              Connotes grace, elegance, natural beauty, and poise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
