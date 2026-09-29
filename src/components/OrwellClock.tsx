import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';
import { Clock, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

export const OrwellClock: React.FC = () => {
  const [hour, setHour] = useState<number>(13);

  const isDystopian = hour === 13;

  const toggleHour = () => {
    playPop(isDystopian ? 440 : 260);
    setHour(isDystopian ? 12 : 13);
  };

  return (
    <section id="orwell-clock" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-rose-400 font-semibold mb-3">
          <span>06</span>
          <span>·</span>
          <span>The Orwellian Anomaly</span>
          <span>·</span>
          <span>Slide 8</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          One wrong detail <span className="font-serif italic text-rose-400">changes the whole mood.</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          How George Orwell engineered the most famously disquieting opening line in modern literature using a single impossible number.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        {/* Left Column: Interactive 3D Clock Display */}
        <div className="lg:col-span-5">
          <Card3D depth={20} className="w-full">
            <div className={`rounded-3xl p-8 border transition-all duration-500 relative overflow-hidden flex flex-col items-center justify-center text-center ${
              isDystopian
                ? 'bg-[#150a0d] border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.2)]'
                : 'bg-[#0a111a] border-sky-400/30 shadow-[0_0_30px_rgba(56,189,248,0.1)]'
            }`}>
              {/* Dial Container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-white/20 bg-black/40 flex items-center justify-center shadow-inner my-4">
                {/* Dial numbers */}
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const radius = 100;
                  const x = Math.sin(angle) * radius;
                  const y = -Math.cos(angle) * radius;
                  return (
                    <div
                      key={n}
                      className="absolute text-xs font-mono text-gray-500 font-semibold"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {n}
                    </div>
                  );
                })}

                {/* 13th hour anomaly badge */}
                <div
                  onClick={toggleHour}
                  className={`absolute -top-3 w-12 h-12 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg shadow-xl cursor-pointer transition-all duration-300 ${
                    isDystopian
                      ? 'bg-red-600 scale-110 ring-4 ring-red-400/50 animate-pulse'
                      : 'bg-white/20 hover:bg-white/30 text-gray-300'
                  }`}
                  title="Click to toggle hour between 12 and 13"
                >
                  13
                </div>

                {/* Clock hands */}
                <div
                  className="absolute w-1 bg-white rounded-full origin-bottom transition-transform duration-700 ease-out"
                  style={{
                    height: '80px',
                    transform: isDystopian ? 'rotate(390deg)' : 'rotate(360deg)',
                    bottom: '50%',
                  }}
                />
                <div
                  className="absolute w-1.5 bg-red-500 rounded-full origin-bottom"
                  style={{
                    height: '55px',
                    transform: 'rotate(90deg)',
                    bottom: '50%',
                  }}
                />
                <div className="w-4 h-4 rounded-full bg-white z-10 shadow" />
              </div>

              <button
                onClick={toggleHour}
                className="mt-2 text-xs font-mono px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span>Switch to {isDystopian ? 'Normal World (12:00)' : 'Orwellian World (13:00)'}</span>
              </button>
            </div>
          </Card3D>
        </div>

        {/* Right Column: Literary Deconstruction */}
        <div className="lg:col-span-7 space-y-6">
          <div className="liquid-glass border border-white/15 rounded-2xl p-8 bg-[#0c0f18]/80">
            <div className="text-xs uppercase font-mono tracking-widest text-amber-400 mb-3">
              Iconic Opening Sentence
            </div>

            <blockquote className="text-2xl md:text-3xl font-serif text-white leading-relaxed mb-4">
              “It was a <span className="text-amber-300 font-semibold">bright cold</span> day in April, and the clocks were striking <span className="text-red-500 font-bold underline decoration-red-500/50 underline-offset-4">thirteen</span>.”
            </blockquote>

            <div className="text-xs text-gray-400 font-mono mb-6">
              — George Orwell, <em>Nineteen Eighty-Four</em> (1949)
            </div>

            {/* Micro Breakdown of Orwell's Word Choices */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 mt-0.5">
                  <span className="font-mono text-xs font-bold">01</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Oxymoronic Sensory Clash: “bright cold”
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                    April promises spring, warmth, and blossoming life. Pairing &apos;bright&apos; with &apos;cold&apos; immediately produces sterile, deceptive sunlight that fails to warm the skin.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-red-500/10 text-red-400 mt-0.5">
                  <span className="font-mono text-xs font-bold">02</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    The Impossible Strike: “thirteen”
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-0.5">
                    Clocks strike up to 12. A clock striking thirteen violates physical expectation. It signals 24-hour military control, cold mechanical authoritarianism, and a universe where the rules of reality itself have been warped by Big Brother.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs leading-relaxed flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>The Lesson:</strong> You do not need five paragraphs of setting description. One precisely placed discordant word creates unforgettable thematic atmosphere in a fraction of a second.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
