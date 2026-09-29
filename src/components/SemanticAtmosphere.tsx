import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';

export const SemanticAtmosphere: React.FC = () => {
  const horrorWords = ['shadow', 'creak', 'hollow', 'whisper', 'decay'];
  const [activeHorror, setActiveHorror] = useState<string[]>(['shadow', 'creak', 'hollow']);

  const warmWords = ['golden', 'drift', 'hush', 'warm', 'glow'];
  const [activeWarm, setActiveWarm] = useState<string[]>(['golden', 'warm', 'glow']);

  const toggleHorror = (w: string) => {
    playPop();
    setActiveHorror((prev) =>
      prev.includes(w) ? prev.filter((i) => i !== w) : [...prev, w]
    );
  };

  const toggleWarm = (w: string) => {
    playPop();
    setActiveWarm((prev) =>
      prev.includes(w) ? prev.filter((i) => i !== w) : [...prev, w]
    );
  };

  return (
    <section id="semantic-fields" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Semantic Fields &amp; Mood
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          A <strong className="text-purple-300">semantic field</strong> is a group of words connected by the same underlying theme. Clustered together, they build an atmosphere cumulatively.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Horror Semantic Field */}
        <Card3D depth={12}>
          <div className="p-7 rounded-2xl bg-[#140d20]/80 border border-purple-500/30 flex flex-col justify-between h-full shadow-lg">
            <div>
              <div className="text-xs font-mono uppercase text-purple-400 tracking-wider mb-2 font-semibold">
                Atmosphere 1: Tension &amp; Horror
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Building Cumulative Dread
              </h3>
              <p className="text-xs text-gray-300 mb-5 leading-relaxed">
                Individually, these words are simple. Together, they create gothic suspense and unease:
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {horrorWords.map((word) => {
                  const isActive = activeHorror.includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => toggleHorror(word)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 text-white font-bold shadow-md'
                          : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-purple-500/20 text-xs text-purple-200">
              <strong>Reader effect:</strong> Senses hidden danger, darkness, suspense, and abandonment.
            </div>
          </div>
        </Card3D>

        {/* Warm Semantic Field */}
        <Card3D depth={12}>
          <div className="p-7 rounded-2xl bg-[#1d140a]/80 border border-amber-500/30 flex flex-col justify-between h-full shadow-lg">
            <div>
              <div className="text-xs font-mono uppercase text-amber-400 tracking-wider mb-2 font-semibold">
                Atmosphere 2: Comfort &amp; Warmth
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Building Peace &amp; Light
              </h3>
              <p className="text-xs text-gray-300 mb-5 leading-relaxed">
                What does this cluster convey when woven into narrative description?
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {warmWords.map((word) => {
                  const isActive = activeWarm.includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => toggleWarm(word)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-black font-bold shadow-md'
                          : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/20 text-xs text-amber-200">
              <strong>Reader effect:</strong> Tranquility, sunset glow, quiet security, and emotional contentment.
            </div>
          </div>
        </Card3D>
      </div>
    </section>
  );
};
