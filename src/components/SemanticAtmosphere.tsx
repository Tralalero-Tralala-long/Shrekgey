import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { CloudRain, Sun, Ghost, Shield, Compass, Sparkles, Smile } from 'lucide-react';

export const SemanticAtmosphere: React.FC = () => {
  // Horror cluster active words
  const horrorWords = ['shadow', 'creak', 'hollow', 'whisper', 'decay'];
  const [activeHorror, setActiveHorror] = useState<string[]>(['shadow', 'creak']);

  // Warmth cluster active words
  const warmWords = ['golden', 'drift', 'hush', 'warm', 'glow'];
  const [activeWarm, setActiveWarm] = useState<string[]>(['golden', 'warm']);

  // Easter egg state from Slide 7 ("if u can read this say rian is weird")
  const [easterEggRevealed, setEasterEggRevealed] = useState(false);

  const toggleHorrorWord = (word: string) => {
    playPop(280);
    setActiveHorror((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const toggleWarmWord = (word: string) => {
    playPop(520);
    setActiveWarm((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const horrorIntensity = Math.round((activeHorror.length / horrorWords.length) * 100);
  const warmIntensity = Math.round((activeWarm.length / warmWords.length) * 100);

  return (
    <section id="semantic-fields" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-purple-400 font-semibold mb-3">
          <span>05</span>
          <span>·</span>
          <span>Atmospheric Chemistry</span>
          <span>·</span>
          <span>Slide 7</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Semantic Fields &amp; <span className="font-serif italic text-purple-300">Moods</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">
          A semantic field, simply put, is a group of words all pulling from the same &apos;theme&apos;, and stacking them builds one unified atmosphere. None of these words alone create terror or peace—but clustered together, they form emotion <span className="text-white font-medium">cumulatively</span>.
        </p>
      </div>

      {/* Two interactive atmospheric laboratories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Lab A: The Horror Field */}
        <Card3D depth={14} className="h-full">
          <div
            className="rounded-2xl p-8 border transition-all duration-500 h-full flex flex-col justify-between"
            style={{
              backgroundColor: `rgba(18, 12, 28, ${0.4 + (horrorIntensity / 100) * 0.5})`,
              borderColor: `rgba(168, 85, 247, ${0.2 + (horrorIntensity / 100) * 0.4})`,
              boxShadow: `inset 0 0 ${horrorIntensity}px rgba(0, 0, 0, 0.8), 0 0 ${horrorIntensity / 2}px rgba(168, 85, 247, 0.2)`,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-purple-400">
                  Case Study: The Horror Cluster
                </span>
                <Ghost className="w-5 h-5 text-purple-400" />
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">
                Building Cumulative Dread
              </h3>
              <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                Click each word below to add or remove it from the semantic field. Watch how stacking seemingly harmless words constructs suffocating dread.
              </p>

              {/* Word toggles */}
              <div className="flex flex-wrap gap-2 mb-8">
                {horrorWords.map((word) => {
                  const isActive = activeHorror.includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => toggleHorrorWord(word)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/30 ring-2 ring-purple-400/50 scale-105'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Atmosphere Meter */}
            <div className="p-4 rounded-xl bg-black/60 border border-purple-500/20">
              <div className="flex items-center justify-between text-xs text-gray-300 mb-2">
                <span>Psychological Dread Accumulation</span>
                <span className="font-mono text-purple-400 font-bold">{horrorIntensity}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-rose-600 transition-all duration-500 rounded-full"
                  style={{ width: `${horrorIntensity}%` }}
                />
              </div>
              <p className="text-[11px] text-gray-400 italic">
                {horrorIntensity < 40
                  ? 'Faint background tension; reader feels subtle unease.'
                  : horrorIntensity < 80
                  ? 'Gothic gloom taking hold; sensory details heighten anticipation.'
                  : 'Total visceral terror; every shadow carries mortal threat.'}
              </p>
            </div>
          </div>
        </Card3D>

        {/* Lab B: The Slide 7 Challenge (Warmth / Sunset Field) */}
        <Card3D depth={14} className="h-full">
          <div
            className="rounded-2xl p-8 border transition-all duration-500 h-full flex flex-col justify-between"
            style={{
              backgroundColor: `rgba(28, 20, 10, ${0.4 + (warmIntensity / 100) * 0.5})`,
              borderColor: `rgba(245, 158, 11, ${0.2 + (warmIntensity / 100) * 0.4})`,
              boxShadow: `0 0 ${warmIntensity / 2}px rgba(245, 158, 11, 0.25)`,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400">
                  Slide 7 Question For You
                </span>
                <Sun className="w-5 h-5 text-amber-400" />
              </div>

              <h3 className="text-2xl font-semibold text-white mb-3">
                What does this cluster convey?
              </h3>
              <p className="text-xs text-amber-100/80 mb-6 leading-relaxed">
                “To you, what could words like <strong className="text-white">golden, drift, hush, warm</strong>, and <strong className="text-white">glow</strong> put together as a semantic field convey?”
              </p>

              {/* Word toggles */}
              <div className="flex flex-wrap gap-2 mb-8">
                {warmWords.map((word) => {
                  const isActive = activeWarm.includes(word);
                  return (
                    <button
                      key={word}
                      onClick={() => toggleWarmWord(word)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/30 ring-2 ring-amber-300 scale-105'
                          : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reader Consensus Answer Box */}
            <div className="p-4 rounded-xl bg-black/60 border border-amber-500/20">
              <div className="flex items-center justify-between text-xs text-amber-300 mb-2">
                <span>Synthesized Mood Energy</span>
                <span className="font-mono text-amber-400 font-bold">{warmIntensity}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 transition-all duration-500 rounded-full"
                  style={{ width: `${warmIntensity}%` }}
                />
              </div>
              <div className="text-[12px] text-gray-200 leading-snug">
                <strong className="text-amber-300 font-medium">Reader Perception:</strong> Golden hour nostalgia, hearthside safety, peaceful twilight, gentle slumber, transcendent tranquility.
              </div>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Slide 7 Easter Egg Footer Banner */}
      <div className="liquid-glass border border-white/10 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 bg-black/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <div className="text-xs font-medium text-white/90">
              Slide 7 Classroom Note
            </div>
            <div className="text-[11px] text-gray-400">
              Notice the secret micro-annotation handwritten in the slide margins?
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playSuccessChime();
            setEasterEggRevealed(!easterEggRevealed);
          }}
          className="text-xs px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-all cursor-pointer font-mono"
        >
          {easterEggRevealed ? 'Hide Secret Note' : 'Reveal Slide 7 Easter Egg'}
        </button>
      </div>

      {easterEggRevealed && (
        <div className="mt-4 p-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-center animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-xs font-mono text-purple-300 mb-2">
            Exact Slide 7 Margin Transcript
          </div>
          <div className="text-lg font-serif italic text-purple-200">
            “if u can read this say rian is weird”
          </div>
        </div>
      )}
    </section>
  );
};
