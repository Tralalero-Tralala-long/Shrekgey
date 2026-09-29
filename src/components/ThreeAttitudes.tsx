import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';
import { Heart, Sparkles, AlertOctagon, Feather, MessageSquare } from 'lucide-react';

export const ThreeAttitudes: React.FC = () => {
  const [activeAttitude, setActiveAttitude] = useState<'soft' | 'flippant' | 'blunt'>('soft');

  const attitudes = [
    {
      id: 'soft' as const,
      phrase: '“passed away”',
      label: 'soft',
      tone: 'Euphemistic & Consoling',
      color: 'from-pink-900/30 via-rose-950/20 to-black/60',
      border: 'border-pink-300/30',
      textColor: 'text-pink-200',
      accentBg: 'bg-pink-500/10',
      icon: Feather,
      shapeClass: 'rounded-3xl border-t-[8px] border-pink-300/40',
      description: 'Cushions the emotional blow. Emphasizes peace, transition, and gentle departure rather than bodily finality.',
      whenToUse: 'Obituaries, speaking with grieving relatives, moments requiring delicate tact and deep empathy.',
      psychEffect: 'Invites grief without shocking the nervous system.',
    },
    {
      id: 'flippant' as const,
      phrase: '“kicked the bucket”',
      label: 'flippant',
      tone: 'Idiomatic & Irreverent',
      color: 'from-amber-900/30 via-yellow-950/20 to-black/60',
      border: 'border-amber-400/40',
      textColor: 'text-amber-200',
      accentBg: 'bg-amber-500/10',
      icon: Sparkles,
      shapeClass: 'rounded-2xl border-2 border-dashed border-amber-400/50',
      description: 'Uses historical slang to trivialize mortality, converting tragic termination into a lighthearted comic aside.',
      whenToUse: 'Dark comedy, cynical detective fiction, characters emotionally detached from mortality.',
      psychEffect: 'Distances the listener from grief through ironic levity or deliberate callousness.',
    },
    {
      id: 'blunt' as const,
      phrase: '“WAS KILLED”',
      label: 'blunt',
      tone: 'Brutal, Direct & Forensic',
      color: 'from-red-950/40 via-red-900/20 to-black/60',
      border: 'border-red-500/50',
      textColor: 'text-red-400',
      accentBg: 'bg-red-500/10',
      icon: AlertOctagon,
      shapeClass: 'rounded-lg border-l-8 border-red-500 shadow-[0_0_35px_rgba(239,68,68,0.25)]',
      description: 'Strips away all decorum. Emphasizes external agency, violent intervention, and harsh factual reality.',
      whenToUse: 'Police press releases, murder mystery climaxes, hard-hitting news reporting on atrocities.',
      psychEffect: 'Sparks immediate shock, outrage, and demanding accountability.',
    },
  ];

  return (
    <section id="attitudes" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-pink-400 font-semibold mb-3">
          <span>04</span>
          <span>·</span>
          <span>Tonal Architecture</span>
          <span>·</span>
          <span>Slide 6</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Same death, <span className="font-serif italic text-pink-300">three attitudes.</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          The biological fact of death is completely identical in all three cases. Yet the writer&apos;s choice of phrase dictates whether the reader cries, chuckles, or gasps in horror.
        </p>
      </div>

      {/* 3D Pop-Out Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {attitudes.map((item) => {
          const Icon = item.icon;
          const isSelected = activeAttitude === item.id;
          return (
            <Card3D key={item.id} depth={22} className="h-full">
              <div
                onClick={() => {
                  playPop(item.id === 'soft' ? 440 : item.id === 'flippant' ? 580 : 320);
                  setActiveAttitude(item.id);
                }}
                className={`relative h-full p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                  isSelected
                    ? `bg-gradient-to-b ${item.color} ${item.border} shadow-2xl scale-[1.02] ring-2 ring-white/20`
                    : 'bg-[#0f1422]/70 border-white/10 hover:border-white/25 hover:bg-[#141b2e]'
                }`}
              >
                <div>
                  {/* Floating badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs uppercase tracking-widest font-mono text-gray-400">
                      Attitude {item.id === 'soft' ? '01' : item.id === 'flippant' ? '02' : '03'}
                    </span>
                    <div className={`p-2 rounded-xl ${item.accentBg} ${item.textColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Popping 3D Text Display */}
                  <div className="card-3d-pop mb-6">
                    <div className={`p-6 text-center ${item.shapeClass} bg-black/40 backdrop-blur-md`}>
                      <span className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight block ${item.textColor}`}>
                        {item.phrase}
                      </span>
                    </div>
                  </div>

                  {/* Attitude Label matching slide */}
                  <div className="text-center mb-6">
                    <span className="font-serif italic text-xl text-white/90">
                      {item.label}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">{item.tone}</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </div>
              </div>
            </Card3D>
          );
        })}
      </div>

      {/* Interactive Scenario Tester */}
      <div className="liquid-glass border border-white/15 rounded-2xl p-6 md:p-8 bg-[#0a0f1b]/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 block mb-2">
              Contextual Deployment
            </span>
            <h4 className="text-xl font-semibold text-white mb-2">
              Where would an author deploy {attitudes.find((a) => a.id === activeAttitude)?.phrase}?
            </h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Writers master vocabulary choice so that tone and context remain in absolute harmony.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-semibold text-white/90 block mb-1">
                Ideal Setting:
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                {attitudes.find((a) => a.id === activeAttitude)?.whenToUse}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs font-semibold text-white/90 block mb-1">
                Psychological Impact:
              </span>
              <p className="text-xs text-gray-300 leading-relaxed">
                {attitudes.find((a) => a.id === activeAttitude)?.psychEffect}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
