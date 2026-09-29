import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop, playWaveSound } from '../utils/audio';
import { Waves, Sparkles, AlertCircle, Compass, Wind } from 'lucide-react';

interface WaveOption {
  letter: 'a' | 'b' | 'c' | 'd';
  verb: string;
  energyLevel: number;
  soundType: 'gentle' | 'medium' | 'heavy' | 'crash';
  color: string;
  borderColor: string;
  readerResponse: string;
  visualScene: string;
  narrativeTone: string;
}

const WAVE_OPTIONS: WaveOption[] = [
  {
    letter: 'a',
    verb: 'Touched',
    energyLevel: 15,
    soundType: 'gentle',
    color: 'from-cyan-900/30 to-blue-950/20',
    borderColor: 'border-cyan-400/40',
    readerResponse: 'Peace, tranquility, gentle lulling rhythm, romantic serenity.',
    visualScene: 'A calm summer shoreline at dusk with glassy water barely kissing smooth pebbles.',
    narrativeTone: 'Gentle, tender, contemplative',
  },
  {
    letter: 'b',
    verb: 'Hit',
    energyLevel: 45,
    soundType: 'medium',
    color: 'from-blue-900/30 to-slate-950/20',
    borderColor: 'border-blue-400/40',
    readerResponse: 'Neutral observation, rhythmic cadence, mechanical certainty.',
    visualScene: 'Steady predictable tide meeting coastal boulders on a windy afternoon.',
    narrativeTone: 'Factual, straightforward, documentary',
  },
  {
    letter: 'c',
    verb: 'Crashed',
    energyLevel: 80,
    soundType: 'heavy',
    color: 'from-amber-900/30 to-orange-950/20',
    borderColor: 'border-amber-400/40',
    readerResponse: 'Adrenaline, dramatic power, untamed ocean majesty, heightened sensory alarm.',
    visualScene: 'Gale-force ocean swells exploding into white plumes against sheer granite cliffs.',
    narrativeTone: 'Dramatic, intense, elemental power',
  },
  {
    letter: 'd',
    verb: 'Smashed',
    energyLevel: 100,
    soundType: 'crash',
    color: 'from-rose-950/40 to-red-950/30',
    borderColor: 'border-rose-500/50',
    readerResponse: 'Mortal danger, cataclysmic destruction, existential violence, wreckage.',
    visualScene: 'A violent tempest hurling black breaker waves that shatter boulders and splinter ships.',
    narrativeTone: 'Violent, menacing, catastrophic',
  },
];

export const WaveShowdown: React.FC = () => {
  const [selectedVerb, setSelectedVerb] = useState<WaveOption>(WAVE_OPTIONS[2]); // Default: Crashed

  const handleSelect = (opt: WaveOption) => {
    playPop(opt.energyLevel * 3 + 200);
    playWaveSound(opt.soundType);
    setSelectedVerb(opt);
  };

  return (
    <section id="showdown" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-cyan-400 font-semibold mb-3">
          <span>08</span>
          <span>·</span>
          <span>Interactive Activity</span>
          <span>·</span>
          <span>Slide 10</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Vocabulary <span className="font-serif italic text-cyan-300">Showdown</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          &ldquo;Based off what you choose, what do you want the reader response to be?&rdquo;
        </p>
      </div>

      {/* Main Sentence Sandbox */}
      <div className="liquid-glass border border-white/15 rounded-3xl p-8 mb-12 bg-[#080d18]/90 shadow-2xl">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-2 block">
            Sentence In Focus
          </span>
          <div className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-relaxed">
            “The waves{' '}
            <span className="inline-block px-4 py-1 rounded-xl bg-white/10 border-b-4 border-cyan-400 font-bold text-cyan-300 mx-2 shadow-inner">
              {selectedVerb.verb.toLowerCase()}
            </span>{' '}
            against the rocks.”
          </div>
        </div>

        {/* 4 Interactive Verb Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {WAVE_OPTIONS.map((opt) => {
            const isSelected = selectedVerb.letter === opt.letter;
            return (
              <button
                key={opt.letter}
                onClick={() => handleSelect(opt)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? `bg-gradient-to-b ${opt.color} ${opt.borderColor} shadow-xl ring-2 ring-white/30 scale-105`
                    : 'bg-[#0f1422]/60 border-white/10 hover:border-white/20 hover:bg-[#141b2e]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                    Option {opt.letter}.
                  </span>
                  <span className="text-xs font-mono text-cyan-300">
                    {opt.energyLevel}% Force
                  </span>
                </div>
                <div className="text-xl font-serif font-bold text-white mb-1">
                  {opt.verb}
                </div>
                <div className="text-[11px] text-gray-400 line-clamp-1">
                  {opt.narrativeTone}
                </div>
              </button>
            );
          })}
        </div>

        {/* Wave Animation Simulation Canvas */}
        <div className="relative h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-[#060a12] via-[#091122] to-[#040812] border border-white/10 flex flex-col justify-end p-6">
          {/* Animated SVG Waves with dynamic amplitude based on verb energy */}
          <div className="absolute inset-0 pointer-events-none opacity-80 overflow-hidden flex items-end">
            <svg
              className="w-full h-32 transition-all duration-700"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d={`M 0,${60 - selectedVerb.energyLevel * 0.4} C 150,${10 + selectedVerb.energyLevel * 0.5} 350,${90 - selectedVerb.energyLevel * 0.6} 500,${40 - selectedVerb.energyLevel * 0.3} C 650,${10 + selectedVerb.energyLevel * 0.4} 900,${80 - selectedVerb.energyLevel * 0.5} 1200,${50} L 1200,120 L 0,120 Z`}
                fill="rgba(56, 189, 248, 0.2)"
                className="transition-all duration-700"
              />
              <path
                d={`M 0,${80 - selectedVerb.energyLevel * 0.5} C 200,${20 + selectedVerb.energyLevel * 0.4} 400,${100 - selectedVerb.energyLevel * 0.7} 700,${30 - selectedVerb.energyLevel * 0.2} C 950,${10 + selectedVerb.energyLevel * 0.6} 1100,${70 - selectedVerb.energyLevel * 0.4} 1200,${60} L 1200,120 L 0,120 Z`}
                fill={selectedVerb.energyLevel > 70 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(14, 165, 233, 0.3)'}
                className="transition-all duration-700"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between text-xs text-white/80">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-400" />
              <span className="font-semibold text-white">Simulated Wave Energy:</span>
              <span className="font-mono text-cyan-300">{selectedVerb.energyLevel} Joules/m²</span>
            </div>
            <div className="text-[11px] text-gray-400 italic">
              Click any verb above to hear the auditory weight shift.
            </div>
          </div>
        </div>
      </div>

      {/* Reader Response Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="liquid-glass border border-white/10 rounded-2xl p-6 bg-[#0a0f1c]/70">
          <div className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Reader Involuntary Response</span>
          </div>
          <p className="text-base text-white font-medium leading-relaxed">
            {selectedVerb.readerResponse}
          </p>
        </div>

        <div className="liquid-glass border border-white/10 rounded-2xl p-6 bg-[#0a0f1c]/70">
          <div className="text-xs uppercase font-mono tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5" />
            <span>Cinematic Scene Rendering</span>
          </div>
          <p className="text-base text-gray-300 leading-relaxed">
            {selectedVerb.visualScene}
          </p>
        </div>
      </div>
    </section>
  );
};
