import React, { useState } from 'react';
import { playPop, playWaveSound } from '../utils/audio';

interface WaveOption {
  letter: 'a' | 'b' | 'c' | 'd';
  verb: string;
  energyLevel: number;
  soundType: 'gentle' | 'medium' | 'heavy' | 'crash';
  response: string;
}

const WAVE_OPTIONS: WaveOption[] = [
  {
    letter: 'a',
    verb: 'Touched',
    energyLevel: 20,
    soundType: 'gentle',
    response: 'Gentle, soothing, rhythmic, and calm.',
  },
  {
    letter: 'b',
    verb: 'Hit',
    energyLevel: 50,
    soundType: 'medium',
    response: 'Neutral, factual observation of physical contact.',
  },
  {
    letter: 'c',
    verb: 'Crashed',
    energyLevel: 80,
    soundType: 'heavy',
    response: 'Dramatic, intense, sudden sensory impact.',
  },
  {
    letter: 'd',
    verb: 'Smashed',
    energyLevel: 100,
    soundType: 'crash',
    response: 'Violent, destructive, dangerous, and chaotic.',
  },
];

export const WaveShowdown: React.FC = () => {
  const [selectedVerb, setSelectedVerb] = useState<WaveOption>(WAVE_OPTIONS[2]);

  const handleSelect = (opt: WaveOption) => {
    playPop();
    playWaveSound(opt.soundType);
    setSelectedVerb(opt);
  };

  return (
    <section id="showdown" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Vocabulary Showdown
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Based on the verb you choose, what reader reaction do you intend to create?
        </p>
      </div>

      <div className="liquid-glass border border-white/15 rounded-3xl p-8 bg-[#080d18]/90 shadow-xl mb-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-2xl sm:text-4xl font-serif text-white leading-relaxed">
            &ldquo;The waves{' '}
            <span className="inline-block px-3 py-0.5 rounded-lg bg-white/10 border-b-2 border-cyan-400 font-bold text-cyan-300">
              {selectedVerb.verb.toLowerCase()}
            </span>{' '}
            against the rocks.&rdquo;
          </div>
        </div>

        {/* 4 Choices */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {WAVE_OPTIONS.map((opt) => {
            const isSelected = selectedVerb.letter === opt.letter;
            return (
              <button
                key={opt.letter}
                onClick={() => handleSelect(opt)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400'
                    : 'bg-[#0f1422]/60 border-white/10 hover:border-white/20 text-gray-300'
                }`}
              >
                <div className="text-xs font-mono text-gray-400 mb-1">
                  Option {opt.letter.toUpperCase()}
                </div>
                <div className="text-lg font-serif font-bold text-white mb-1">
                  {opt.verb}
                </div>
              </button>
            );
          })}
        </div>

        {/* Reaction Box */}
        <div className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs sm:text-sm text-gray-200">
          <strong className="text-cyan-300 mr-2">Reader Response:</strong>
          {selectedVerb.response}
        </div>
      </div>
    </section>
  );
};
