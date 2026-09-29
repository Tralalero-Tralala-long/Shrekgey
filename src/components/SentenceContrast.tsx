import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';
import { Sliders, Footprints, Flame, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export const SentenceContrast: React.FC = () => {
  const [activeVerb, setActiveVerb] = useState<'shuffled' | 'strode' | 'crept' | 'barged'>('shuffled');

  const verbProfiles = {
    shuffled: {
      verb: 'shuffled',
      color: 'from-rose-500/20 to-red-950/40',
      border: 'border-rose-400/30',
      accentText: 'text-rose-400',
      tag: 'Frailty & Hesitation',
      posture: 'Stooped, rounded shoulders, drag of worn soles against hardwood',
      speed: 'Slow · 1.2 m/s',
      powerScore: '18 / 100',
      status: 'Subordinate / Vulnerable',
      quote: 'The old man shuffled into the room.',
      readerMindset: 'Sympathy, pity, anticipation of vulnerability, slow ticking clock.',
    },
    strode: {
      verb: 'strode',
      color: 'from-sky-500/20 to-blue-950/40',
      border: 'border-sky-400/30',
      accentText: 'text-sky-400',
      tag: 'Authority & Vigor',
      posture: 'Chest open, spine erect, long calculated deliberate strides',
      speed: 'Brisk · 4.8 m/s',
      powerScore: '89 / 100',
      status: 'Commanding / In Charge',
      quote: 'The old man strode into the room.',
      readerMindset: 'Deference, awe, sudden alert focus, expectation of decisive action.',
    },
    crept: {
      verb: 'crept',
      color: 'from-emerald-500/20 to-emerald-950/40',
      border: 'border-emerald-400/30',
      accentText: 'text-emerald-400',
      tag: 'Stealth & Guilt',
      posture: 'Crouched, cautious weight distribution on toes, silent breath',
      speed: 'Tense · 0.8 m/s',
      powerScore: '32 / 100',
      status: 'Concealed / Suspicious',
      quote: 'The old man crept into the room.',
      readerMindset: 'Suspense, tension, curiosity about forbidden motives.',
    },
    barged: {
      verb: 'barged',
      color: 'from-amber-500/20 to-amber-950/40',
      border: 'border-amber-400/30',
      accentText: 'text-amber-400',
      tag: 'Aggression & Disruption',
      posture: 'Violent momentum, slamming door frame, forceful intrusion',
      speed: 'Aggressive · 5.5 m/s',
      powerScore: '95 / 100',
      status: 'Disruptive / Intrusive',
      quote: 'The old man barged into the room.',
      readerMindset: 'Alarm, shock, anticipation of conflict or explosive confrontation.',
    },
  };

  const current = verbProfiles[activeVerb];

  return (
    <section id="contrast" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-sky-400 font-semibold mb-3">
          <span>02</span>
          <span>·</span>
          <span>Case Study</span>
          <span>·</span>
          <span>Slide 2</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Same man. <span className="font-serif italic text-sky-300">Same room.</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Change one solitary verb, and you revolutionize the age, social status, physical health, and dramatic tension of the entire scene without adding a single adjective.
        </p>
      </div>

      {/* Side by side 3D Cards matching slide visual cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Card A: Shuffled */}
        <Card3D depth={16}>
          <div
            onClick={() => {
              playPop(350);
              setActiveVerb('shuffled');
            }}
            className={`cursor-pointer rounded-2xl p-8 transition-all duration-300 border ${
              activeVerb === 'shuffled'
                ? 'bg-gradient-to-br from-rose-950/40 to-[#0e1424] border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.15)] ring-1 ring-rose-500/40'
                : 'bg-[#101420]/60 border-white/10 hover:border-rose-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 bg-rose-500/10 px-3 py-1 rounded-md border border-rose-500/20">
                Observation A
              </span>
              <Footprints className="w-5 h-5 text-rose-400" />
            </div>

            <div className="card-3d-content mb-6">
              <div className="text-2xl sm:text-3xl font-serif text-white/95 leading-relaxed tracking-wide">
                “The old man <span className="font-bold text-rose-400 underline decoration-rose-500/60 underline-offset-4">shuffled</span> into the room.”
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Kinetic Implication:</span>
                <span className="font-medium text-rose-300">Labored, dragging feet</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Atmospheric Temperature:</span>
                <span className="font-medium text-rose-300">Weary, somber, hesitant</span>
              </div>
            </div>
          </div>
        </Card3D>

        {/* Card B: Strode */}
        <Card3D depth={16}>
          <div
            onClick={() => {
              playPop(520);
              setActiveVerb('strode');
            }}
            className={`cursor-pointer rounded-2xl p-8 transition-all duration-300 border ${
              activeVerb === 'strode'
                ? 'bg-gradient-to-br from-sky-950/40 to-[#0e1424] border-sky-500/60 shadow-[0_0_30px_rgba(14,165,233,0.15)] ring-1 ring-sky-500/40'
                : 'bg-[#101420]/60 border-white/10 hover:border-sky-500/30'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-400 bg-sky-500/10 px-3 py-1 rounded-md border border-sky-500/20">
                Observation B
              </span>
              <Flame className="w-5 h-5 text-sky-400" />
            </div>

            <div className="card-3d-content mb-6">
              <div className="text-2xl sm:text-3xl font-serif text-white/95 leading-relaxed tracking-wide">
                “The old man <span className="font-bold text-sky-400 underline decoration-sky-500/60 underline-offset-4">strode</span> into the room.”
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Kinetic Implication:</span>
                <span className="font-medium text-sky-300">Long, confident strides</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Atmospheric Temperature:</span>
                <span className="font-medium text-sky-300">Vigorous, commanding, decisive</span>
              </div>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Interactive Verb Switcher Bar */}
      <div className="liquid-glass border border-white/15 rounded-2xl p-6 md:p-8 bg-[#090d16]/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <span>Simulate Alternate Narrative Verbs</span>
            </h4>
            <p className="text-xs text-gray-400">
              Test how swapping verbs rewires the involuntary cinematic film playing in the reader’s head.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['shuffled', 'strode', 'crept', 'barged'] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  playPop(v === 'shuffled' ? 350 : v === 'strode' ? 520 : 440);
                  setActiveVerb(v);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeVerb === v
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Live Verb Diagnostic Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-xl bg-black/40 border border-white/10">
          <div>
            <span className="text-[11px] text-gray-400 uppercase tracking-widest font-mono block mb-1">
              Kinetic Energy
            </span>
            <div className="text-sm font-semibold text-white">{current.speed}</div>
          </div>
          <div>
            <span className="text-[11px] text-gray-400 uppercase tracking-widest font-mono block mb-1">
              Authority Rating
            </span>
            <div className={`text-sm font-semibold ${current.accentText}`}>{current.powerScore}</div>
          </div>
          <div>
            <span className="text-[11px] text-gray-400 uppercase tracking-widest font-mono block mb-1">
              Social Dominance
            </span>
            <div className="text-sm font-semibold text-white">{current.status}</div>
          </div>
          <div>
            <span className="text-[11px] text-gray-400 uppercase tracking-widest font-mono block mb-1">
              Reader Reaction
            </span>
            <div className="text-xs text-gray-300 leading-snug">{current.readerMindset}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
