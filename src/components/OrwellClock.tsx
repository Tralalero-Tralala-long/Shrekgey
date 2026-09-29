import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop } from '../utils/audio';

export const OrwellClock: React.FC = () => {
  const [hour, setHour] = useState<number>(13);
  const isThirteen = hour === 13;

  const toggleHour = () => {
    playPop();
    setHour(isThirteen ? 12 : 13);
  };

  return (
    <section id="orwell-clock" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          One Wrong Detail Changes Everything
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          How George Orwell engineered one of the most famous opening lines in English literature with a single impossible detail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: The Analog Clock Face */}
        <div className="md:col-span-5 flex justify-center">
          <Card3D depth={14} className="w-full max-w-sm">
            <div className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col items-center justify-center text-center ${
              isThirteen
                ? 'bg-[#150a0d] border-red-500/50 shadow-2xl'
                : 'bg-[#0a111a] border-sky-400/40 shadow-xl'
            }`}>
              {/* Dial with 12 numbers and the 13 mark */}
              <div className="relative w-56 h-56 rounded-full border-4 border-white/20 bg-black/50 flex items-center justify-center shadow-inner my-2">
                {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const radius = 88;
                  const x = Math.sin(angle) * radius;
                  const y = -Math.cos(angle) * radius;
                  return (
                    <div
                      key={n}
                      className="absolute text-xs font-mono text-gray-400 font-semibold"
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {n}
                    </div>
                  );
                })}

                {/* The 13 indicator */}
                <div
                  onClick={toggleHour}
                  className={`absolute -top-3 px-2 py-0.5 rounded-full text-xs font-mono font-bold cursor-pointer transition-all ${
                    isThirteen
                      ? 'bg-red-600 text-white ring-2 ring-red-400 scale-110 shadow-lg'
                      : 'bg-white/20 text-gray-400 hover:text-white'
                  }`}
                  title="Click to toggle between 12:00 and 13:00"
                >
                  13:00
                </div>

                {/* Minute hand */}
                <div
                  className="absolute w-1 bg-white rounded-full origin-bottom"
                  style={{
                    height: '68px',
                    transform: 'rotate(0deg)',
                    bottom: '50%',
                  }}
                />

                {/* Hour hand */}
                <div
                  className={`absolute w-1.5 rounded-full origin-bottom transition-transform duration-500 ${
                    isThirteen ? 'bg-red-500' : 'bg-sky-400'
                  }`}
                  style={{
                    height: '48px',
                    transform: isThirteen ? 'rotate(30deg)' : 'rotate(0deg)',
                    bottom: '50%',
                  }}
                />

                {/* Center pin */}
                <div className="w-3 h-3 rounded-full bg-white z-10 shadow" />
              </div>

              <button
                onClick={toggleHour}
                className="mt-4 text-xs font-mono px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                Switch to {isThirteen ? 'Normal (12:00)' : 'Dystopian (13:00)'}
              </button>
            </div>
          </Card3D>
        </div>

        {/* Right: Literary Analysis */}
        <div className="md:col-span-7 space-y-5">
          <div className="liquid-glass border border-white/15 rounded-2xl p-7 bg-[#0c0f18]/80">
            <blockquote className="text-xl sm:text-2xl font-serif text-white leading-relaxed mb-3">
              “It was a <span className="text-amber-300 font-semibold">bright cold</span> day in April, and the clocks were striking <span className="text-red-400 font-bold underline">thirteen</span>.”
            </blockquote>
            <div className="text-xs text-gray-400 font-mono mb-6">
              — George Orwell, <em>1984</em>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-gray-300 leading-relaxed">
              <div>
                <strong className="text-amber-300 block mb-1">1. &ldquo;bright cold&rdquo; (Sensory Conflict):</strong>
                April promises spring warmth and blossoming life. Juxtaposing &quot;bright&quot; with &quot;cold&quot; produces harsh, sterile sunlight that fails to comfort, foreshadowing a deceptive world.
              </div>

              <div>
                <strong className="text-red-400 block mb-1">2. &ldquo;thirteen&rdquo; (The Anomaly):</strong>
                Standard clocks strike only up to 12. A clock striking thirteen violates our sense of reality, immediately signaling military 24-hour time and totalitarian state control.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-200 text-xs leading-relaxed">
            <strong>IGCSE Takeaway:</strong> You don&apos;t need lengthy description. One precise, unexpected word choice immediately shifts the reader&apos;s perception of the world.
          </div>
        </div>
      </div>
    </section>
  );
};
