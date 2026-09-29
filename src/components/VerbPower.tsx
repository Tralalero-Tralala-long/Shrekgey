import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { Zap, Gauge, Flame, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface CompressorItem {
  id: string;
  weak: string;
  strong: string;
  adverbsReplaced: string;
  tempoIncrease: string;
  commentary: string;
}

const COMPRESSOR_PRESETS: CompressorItem[] = [
  {
    id: 'c1',
    weak: '“She walked quickly and angrily.”',
    strong: '“She stormed off.”',
    adverbsReplaced: 'walked + quickly + angrily (3 words)',
    tempoIncrease: '+300% Kinetic Punch',
    commentary: 'Stormed captures speed, facial thunder, emotional rage, and deliberate exit in one thunderous syllable.',
  },
  {
    id: 'c2',
    weak: '“He looked very closely and suspiciously at the note.”',
    strong: '“He scrutinized the note.”',
    adverbsReplaced: 'looked + closely + suspiciously (4 words)',
    tempoIncrease: '+250% Precision',
    commentary: 'Scrutinized establishes rigorous forensic examination and natural skepticism without fluff adjectives.',
  },
  {
    id: 'c3',
    weak: '“The speaker talked quietly and in a boring, repetitive way.”',
    strong: '“The speaker droned on.”',
    adverbsReplaced: 'talked + quietly + boring + repetitive (5 words)',
    tempoIncrease: '+400% Auditory Evocation',
    commentary: 'Droned mimics the monotone hum of a mechanical motor, letting the reader actually hear the boredom.',
  },
  {
    id: 'c4',
    weak: '“The fire burned with sudden, violent brightness.”',
    strong: '“The fire flared.”',
    adverbsReplaced: 'burned + sudden + violent brightness (4 words)',
    tempoIncrease: '+320% Visual Sharpness',
    commentary: 'Flared detonates instantly in the reader’s visual cortex with explosive brevity.',
  },
];

export const VerbPower: React.FC = () => {
  const [activePreset, setActivePreset] = useState<CompressorItem>(COMPRESSOR_PRESETS[0]);
  const [skinnyState, setSkinnyState] = useState<'skinny' | 'slender'>('skinny');

  const toggleSkinny = (val: 'skinny' | 'slender') => {
    playPop(val === 'slender' ? 520 : 380);
    setSkinnyState(val);
  };

  return (
    <section id="verbs" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-amber-400 font-semibold mb-3">
          <span>07</span>
          <span>·</span>
          <span>Kinetic Engine</span>
          <span>·</span>
          <span>Slide 9 &amp; 12</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Word Class Power: <span className="font-serif italic text-amber-300">Verbs &amp; Adjectives</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
          Verbs carry <span className="text-white font-medium">action and energy</span>, so they control the pace; adjectives carry <span className="text-white font-medium">description</span>, so they control image. Weak writing overuses adjectives and adverbs to compensate for weak verbs.
        </p>
      </div>

      {/* The Core Formula Banner */}
      <div className="liquid-glass border border-amber-400/30 rounded-2xl p-6 md:p-8 mb-12 bg-gradient-to-r from-amber-950/40 via-black/60 to-[#0d1424] shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              The Formula 1 Axiom of Prose
            </span>
            <div className="text-2xl sm:text-3xl font-semibold text-white">
              One precise verb replaces an adjective + adverb pile-up.
            </div>
            <p className="text-xs sm:text-sm text-gray-300">
              Sharper image, zero narrative drag, and accelerating reading velocity.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-center shrink-0">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-[10px] uppercase tracking-wider text-amber-400/80">
              High-Velocity Verbs
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Verb Compressor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Preset Selector */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2">
            Select Sentence To Compress:
          </span>
          {COMPRESSOR_PRESETS.map((item) => {
            const isSelected = activePreset.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPop();
                  setActivePreset(item);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400/60 shadow-lg text-white'
                    : 'bg-[#0f1422]/60 border-white/10 text-gray-400 hover:text-white hover:bg-[#151c2e]'
                }`}
              >
                <div className="text-xs font-mono text-amber-400/80 mb-1">
                  {item.tempoIncrease}
                </div>
                <div className="text-sm font-medium line-clamp-1">{item.strong}</div>
              </button>
            );
          })}
        </div>

        {/* Compression Chamber Display */}
        <div className="lg:col-span-8">
          <Card3D depth={14} className="h-full">
            <div className="liquid-glass border border-white/15 rounded-2xl p-8 h-full flex flex-col justify-between bg-[#0a0e18]/90">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className="text-xs font-mono uppercase text-gray-400">
                    Live Sentence Compression Chamber
                  </span>
                  <Gauge className="w-4 h-4 text-amber-400" />
                </div>

                {/* Weak Sentence */}
                <div className="mb-6 p-5 rounded-xl bg-rose-950/20 border border-rose-500/20">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
                    Weak (Bloated with adverbs &amp; adjectives)
                  </span>
                  <div className="text-xl sm:text-2xl font-serif text-rose-200/90 leading-snug">
                    {activePreset.weak}
                  </div>
                  <div className="mt-2 text-xs text-rose-300/70 font-mono">
                    Replaced: {activePreset.adverbsReplaced}
                  </div>
                </div>

                {/* Strong Sentence */}
                <div className="mb-6 p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 shadow-lg">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                    Strong (Single High-Impact Verb)
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                    {activePreset.strong}
                  </div>
                  <div className="mt-2 text-xs text-emerald-300 font-mono">
                    Velocity: {activePreset.tempoIncrease}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-gray-300 leading-relaxed bg-black/40 p-4 rounded-xl">
                <strong className="text-amber-300">Stylistic Analysis:</strong> {activePreset.commentary}
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Slide 12 Bonus Concept: Rewriting Connotation (Skinny vs Slender) */}
      <div className="liquid-glass border border-white/15 rounded-2xl p-6 md:p-8 bg-[#0e1320]/80">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Slide 12 Exam Practice Spotlight</span>
        </div>
        <h4 className="text-xl font-semibold text-white mb-2">
          Rewrite: &ldquo;She was a skinny girl&rdquo; warmer.
        </h4>
        <p className="text-xs text-gray-400 mb-6">
          Both words share the identical denotation of being thin, but one connotes unhealthiness while the other connotes grace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => toggleSkinny('skinny')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              skinnyState === 'skinny'
                ? 'bg-rose-950/40 border-rose-500/50 shadow-lg'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-rose-400 mb-2">
              <span>Original Choice</span>
              <span>Negative / Critical</span>
            </div>
            <div className="text-2xl font-serif text-white mb-2">
              &ldquo;She was a <span className="text-rose-400 font-bold underline">skinny</span> girl.&rdquo;
            </div>
            <p className="text-xs text-gray-300">
              Connotes frailness, malnutrition, bony sharpness, or lack of sustenance.
            </p>
          </div>

          <div
            onClick={() => toggleSkinny('slender')}
            className={`p-6 rounded-2xl border cursor-pointer transition-all ${
              skinnyState === 'slender'
                ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg ring-1 ring-emerald-400/40'
                : 'bg-white/5 border-white/10 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2">
              <span>Warm Rewrite (Slide 12 Answer)</span>
              <span>Positive / Warm</span>
            </div>
            <div className="text-2xl font-serif text-white mb-2">
              &ldquo;She was a <span className="text-emerald-400 font-bold underline">slender</span> girl.&rdquo;
            </div>
            <p className="text-xs text-gray-300">
              Connotes grace, elegance, poise, health, and natural delicate beauty.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
