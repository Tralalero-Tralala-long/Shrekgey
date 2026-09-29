import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { playPop } from '../utils/audio';

interface SlideDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlide?: number;
}

export const SlideDeckModal: React.FC<SlideDeckModalProps> = ({
  isOpen,
  onClose,
  initialSlide = 1,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const totalSlides = 11; // streamlined presentation

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(initialSlide);
    }
  }, [isOpen, initialSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
        playPop();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
        playPop();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nextSlide = () => {
    playPop();
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1));
  };

  const prevSlide = () => {
    playPop();
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      <div className="relative w-full max-w-5xl aspect-[16/9] bg-[#0c101c] rounded-3xl border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Top Control Bar */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Slide {currentSlide} of {totalSlides}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/70">
              The Power of Vocabulary Choice
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400 hidden sm:inline font-mono">
              [← / →] arrows to navigate
            </span>
            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Stage */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
          {/* Slide 1 */}
          {currentSlide === 1 && (
            <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white font-serif">
                The Power of <br />
                <span className="text-amber-400 italic">Vocabulary Choice</span>
              </h1>
              <p className="text-lg font-serif italic text-gray-300">
                Shreyas, rian, Sriman
              </p>
            </div>
          )}

          {/* Slide 2 */}
          {currentSlide === 2 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-3xl sm:text-4xl font-serif text-center font-bold text-white mb-6">
                Same Man. Same Room.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-center">
                  <p className="text-xl sm:text-2xl font-serif text-white">
                    The old man <strong className="text-rose-400 underline">shuffled</strong> into the room.
                  </p>
                  <p className="text-xs text-rose-300/80 mt-3 font-mono">Frailty &amp; Fatigue</p>
                </div>
                <div className="p-6 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-center">
                  <p className="text-xl sm:text-2xl font-serif text-white">
                    The old man <strong className="text-sky-400 underline">strode</strong> into the room.
                  </p>
                  <p className="text-xs text-sky-300/80 mt-3 font-mono">Energy &amp; Authority</p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3 */}
          {currentSlide === 3 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Denotation vs. Connotation
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-400/30">
                  <span className="text-xs uppercase font-mono text-sky-400 block mb-1 font-semibold">Denotation</span>
                  <p className="text-sm text-white leading-relaxed">
                    The literal dictionary definition of a word, independent of emotional baggage.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-400/30">
                  <span className="text-xs uppercase font-mono text-rose-400 block mb-1 font-semibold">Connotation</span>
                  <p className="text-sm text-white leading-relaxed">
                    The feelings, associations, and cultural ideas attached to the word.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 4 */}
          {currentSlide === 4 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Sort the Feeling: Solution
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40">
                  <div className="text-amber-400 font-bold mb-2">Positive</div>
                  <div className="text-xs text-amber-200 space-y-1">
                    <div>determined</div>
                    <div>confident</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/40">
                  <div className="text-sky-400 font-bold mb-2">Neutral</div>
                  <div className="text-xs text-sky-200 space-y-1">
                    <div>curious</div>
                    <div>inquisitive</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40">
                  <div className="text-rose-400 font-bold mb-2">Negative</div>
                  <div className="text-xs text-rose-200 space-y-1">
                    <div>stubborn</div>
                    <div>pig-headed</div>
                    <div>nosy</div>
                    <div>cocky</div>
                    <div>arrogant</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 5 */}
          {currentSlide === 5 && (
            <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-serif text-center font-bold text-white">
                Same Death, Three Attitudes
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-5 rounded-2xl bg-pink-950/30 border border-pink-400/40">
                  <div className="text-xl font-serif text-pink-200 mb-2">&ldquo;passed away&rdquo;</div>
                  <div className="text-xs text-pink-300 font-mono">Soft / Tactful</div>
                </div>
                <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-400/40">
                  <div className="text-xl font-serif text-amber-200 mb-2">&ldquo;kicked the bucket&rdquo;</div>
                  <div className="text-xs text-amber-300 font-mono">Flippant / Humorous</div>
                </div>
                <div className="p-5 rounded-2xl bg-red-950/40 border border-red-500">
                  <div className="text-xl font-bold text-red-400 mb-2">&ldquo;WAS KILLED&rdquo;</div>
                  <div className="text-xs text-red-300 font-mono">Blunt / Shocking</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6 */}
          {currentSlide === 6 && (
            <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Semantic Fields
              </h2>
              <p className="text-sm text-gray-300 text-center leading-relaxed">
                A semantic field is a group of words sharing a common theme that work together to establish atmosphere.
              </p>
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 text-center">
                <strong>Horror Cluster:</strong> shadow, creak, hollow, whisper, decay → builds cumulative dread.
              </div>
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 text-center">
                <strong>Warm Cluster:</strong> golden, drift, hush, warm, glow → builds peaceful light and safety.
              </div>
            </div>
          )}

          {/* Slide 7 */}
          {currentSlide === 7 && (
            <div className="space-y-4 max-w-2xl mx-auto text-center animate-in fade-in duration-200">
              <blockquote className="text-2xl sm:text-3xl font-serif text-white leading-relaxed">
                “It was a <span className="text-amber-300">bright cold</span> day in April, and the clocks were striking <span className="text-red-500 font-bold underline">thirteen</span>.”
              </blockquote>
              <div className="text-xs font-mono text-gray-400">
                — George Orwell, <em>1984</em>
              </div>
              <p className="text-sm text-gray-300 pt-2">
                One precise, unexpected detail immediately establishes an unnatural, totalitarian world.
              </p>
            </div>
          )}

          {/* Slide 8 */}
          {currentSlide === 8 && (
            <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Strong Verbs Over Adverb Piles
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-center">
                  <div className="text-xs text-rose-400 font-mono mb-1">Weak:</div>
                  <div className="text-lg font-serif text-white">&ldquo;She walked quickly and angrily.&rdquo;</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <div className="text-xs text-emerald-400 font-mono mb-1">Strong:</div>
                  <div className="text-lg font-serif text-white">&ldquo;She stormed off.&rdquo;</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 9 */}
          {currentSlide === 9 && (
            <div className="space-y-4 max-w-2xl mx-auto text-center animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Vocabulary Showdown
              </h2>
              <div className="text-2xl font-serif text-white my-3">
                “The waves ______ against the rocks.”
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm max-w-sm mx-auto">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">Touched (Gentle)</div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">Hit (Neutral)</div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">Crashed (Dramatic)</div>
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">Smashed (Violent)</div>
              </div>
            </div>
          )}

          {/* Slide 10 */}
          {currentSlide === 10 && (
            <div className="space-y-4 max-w-3xl mx-auto animate-in fade-in duration-200">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
                Exam Analytical Formula
              </h2>
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-lg font-serif text-white text-center">
                &ldquo;The word <span className="text-pink-300 underline font-sans font-bold">&lsquo;...&rsquo;</span> connotes <span className="text-sky-300 underline font-sans font-bold">...</span>, which creates a sense of <span className="text-amber-300 underline font-sans font-bold">...</span> for the reader.&rdquo;
              </div>
              <div className="p-3 bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 rounded-xl text-center">
                Avoid &ldquo;this creates imagery&rdquo;. Always state the specific connotation and effect.
              </div>
            </div>
          )}

          {/* Slide 11 */}
          {currentSlide === 11 && (
            <div className="space-y-4 max-w-2xl mx-auto text-center animate-in fade-in duration-200">
              <h2 className="text-3xl sm:text-5xl font-bold text-white font-serif">
                Shreyas, rian, Sriman
              </h2>
              <p className="text-gray-300 text-sm">
                The Power of Vocabulary Choice · Grade 10 Cambridge IGCSE English
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Controls */}
        <div className="p-4 px-6 border-t border-white/10 flex items-center justify-between bg-black/40">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-400 text-black hover:bg-amber-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
