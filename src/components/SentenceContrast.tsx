import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';

export const SentenceContrast: React.FC = () => {
  const [activeVerb, setActiveVerb] = useState<'shuffled' | 'strode' | 'crept' | 'barged'>('shuffled');

  const verbProfiles = {
    shuffled: {
      verb: 'shuffled',
      tag: 'Frailty & Fatigue',
      quote: 'The old man shuffled into the room.',
      effect: 'Connotes physical weakness, exhaustion, dragging feet, and vulnerability. The reader feels pity and anticipates frailty.',
    },
    strode: {
      verb: 'strode',
      tag: 'Authority & Energy',
      quote: 'The old man strode into the room.',
      effect: 'Connotes confidence, purposeful intent, health, and authority. The reader perceives a commanding figure taking control.',
    },
    crept: {
      verb: 'crept',
      tag: 'Stealth & Secrecy',
      quote: 'The old man crept into the room.',
      effect: 'Connotes quiet caution, guilt, fear of detection, or deceit. The reader senses suspense and mystery.',
    },
    barged: {
      verb: 'barged',
      tag: 'Aggression & Disruption',
      quote: 'The old man barged into the room.',
      effect: 'Connotes abrupt force, lack of manners, anger, and sudden intrusion. The reader anticipates conflict or shock.',
    },
  };

  const current = verbProfiles[activeVerb];

  return (
    <section id="contrast" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Same Man. Same Room.
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Changing just one verb transforms the character&apos;s physical health, emotional state, and authority in the scene.
        </p>
      </div>

      {/* Main Contrast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Shuffled */}
        <Card3D depth={12}>
          <div
            onClick={() => {
              playPop(350);
              setActiveVerb('shuffled');
            }}
            className={`p-7 rounded-2xl border transition-all cursor-pointer ${
              activeVerb === 'shuffled'
                ? 'bg-rose-950/40 border-rose-500/60 shadow-lg ring-1 ring-rose-500/40'
                : 'bg-[#101420]/70 border-white/10 hover:border-rose-400/30'
            }`}
          >
            <div className="text-xs font-mono uppercase text-rose-400 mb-3 font-semibold">
              Example 1
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-white mb-4">
              &ldquo;The old man <span className="text-rose-400 font-bold underline decoration-rose-500/60">shuffled</span> into the room.&rdquo;
            </div>
            <div className="text-xs text-gray-300 leading-relaxed pt-3 border-t border-white/10">
              <strong>Connotation:</strong> Dragging feet, worn out, tired, lack of energy or confidence.
            </div>
          </div>
        </Card3D>

        {/* Strode */}
        <Card3D depth={12}>
          <div
            onClick={() => {
              playPop(520);
              setActiveVerb('strode');
            }}
            className={`p-7 rounded-2xl border transition-all cursor-pointer ${
              activeVerb === 'strode'
                ? 'bg-sky-950/40 border-sky-500/60 shadow-lg ring-1 ring-sky-500/40'
                : 'bg-[#101420]/70 border-white/10 hover:border-sky-400/30'
            }`}
          >
            <div className="text-xs font-mono uppercase text-sky-400 mb-3 font-semibold">
              Example 2
            </div>
            <div className="text-2xl sm:text-3xl font-serif text-white mb-4">
              &ldquo;The old man <span className="text-sky-400 font-bold underline decoration-sky-500/60">strode</span> into the room.&rdquo;
            </div>
            <div className="text-xs text-gray-300 leading-relaxed pt-3 border-t border-white/10">
              <strong>Connotation:</strong> Long deliberate steps, upright posture, energy, commanding presence.
            </div>
          </div>
        </Card3D>
      </div>

      {/* Clean Verb Selection */}
      <div className="liquid-glass border border-white/15 rounded-2xl p-6 bg-[#090d16]/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="text-sm font-semibold text-white">
            Try alternate verbs for this sentence:
          </div>
          <div className="flex flex-wrap gap-2">
            {(['shuffled', 'strode', 'crept', 'barged'] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  playPop();
                  setActiveVerb(v);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeVerb === v
                    ? 'bg-white text-black shadow-md'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-gray-200 leading-relaxed">
          <span className="font-semibold text-amber-300 font-serif mr-2">{current.tag}:</span>
          {current.effect}
        </div>
      </div>
    </section>
  );
};
