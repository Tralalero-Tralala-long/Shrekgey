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
  const totalSlides = 14;

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
      <div className="relative w-full max-w-6xl aspect-[16/9] bg-[#0c101c] rounded-3xl border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden">
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
              Use [← / →] arrows to navigate
            </span>
            <button
              onClick={() => {
                playPop();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              title="Close Presentation Mode"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Content Stage */}
        <div className="flex-1 p-6 sm:p-10 flex flex-col justify-center overflow-y-auto">
          {/* Slide 1 */}
          {currentSlide === 1 && (
            <div className="text-center space-y-6 max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-300">
              <div className="flex justify-center gap-4 text-3xl opacity-75">
                🏛️ 📐 🏢 🏛️
              </div>
              <div className="inline-block bg-white text-black px-8 py-3 rounded-2xl shadow-xl">
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
                  The power of
                </h1>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-amber-600">
                  Vocabulary Choice
                </h2>
              </div>
              <p className="text-xl sm:text-2xl font-serif italic text-gray-300">
                Shreyas, rian, Sriman
              </p>
            </div>
          )}

          {/* Slide 2 */}
          {currentSlide === 2 && (
            <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-3xl sm:text-5xl font-serif text-center font-bold text-white mb-8">
                Same man. Same room.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-center min-h-[220px]">
                  <p className="text-2xl sm:text-3xl font-serif text-white text-center leading-relaxed">
                    The old man <strong className="text-rose-400 underline">shuffled</strong> into the room.
                  </p>
                </div>
                <div className="p-8 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-center justify-center min-h-[220px]">
                  <p className="text-2xl sm:text-3xl font-serif text-white text-center leading-relaxed">
                    The old man <strong className="text-sky-400 underline">strode</strong> into the room.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Slide 3 */}
          {currentSlide === 3 && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  What is vocabulary choice?
                </h2>
                <span className="text-base font-mono text-amber-400">
                  Same meaning ≠ Same effect
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-xl font-bold text-white mb-2">
                    The deliberate selection of words by a writer.
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Writers don’t just choose words for what they mean. They choose them for what they suggest, what they could convey.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-400/30">
                    <span className="text-xs uppercase font-mono text-sky-400 block mb-1">Denotation</span>
                    <p className="text-sm text-white">
                      The literal dictionary meaning of a word, separate from any feelings or ideas it may suggest.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-400/30">
                    <span className="text-xs uppercase font-mono text-rose-400 block mb-1">Connotation</span>
                    <p className="text-sm text-white">
                      The feelings, ideas, and associations a word carries beyond its literal meaning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 4 & 5 */}
          {(currentSlide === 4 || currentSlide === 5) && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl sm:text-4xl font-bold text-white">
                  Sort the feeling {currentSlide === 5 ? '(Answer Key)' : ''}
                </h2>
                <span className="text-xs font-mono text-gray-400">
                  {currentSlide === 4 ? 'Slide 4: Prompt' : 'Slide 5: Solution'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40">
                  <div className="text-amber-400 font-bold mb-3">Positive</div>
                  <div className="space-y-2 text-sm text-amber-200">
                    <div>• determined</div>
                    <div>• confident</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-sky-950/40 border border-sky-500/40">
                  <div className="text-sky-400 font-bold mb-3">Neutral</div>
                  <div className="space-y-2 text-sm text-sky-200">
                    <div>• curious</div>
                    <div>• inquisitive</div>
                  </div>
                </div>
                <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40">
                  <div className="text-rose-400 font-bold mb-3">Negative</div>
                  <div className="space-y-2 text-sm text-rose-200">
                    <div>• stubborn</div>
                    <div>• pig-headed</div>
                    <div>• nosy</div>
                    <div>• cocky</div>
                    <div>• arrogant</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 6 */}
          {currentSlide === 6 && (
            <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-3xl sm:text-5xl font-serif text-center font-bold text-white">
                Same death, three attitudes.
              </h2>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-3xl bg-pink-950/30 border border-pink-400/40 flex flex-col justify-between min-h-[220px]">
                  <div className="text-2xl font-serif text-pink-200">&ldquo;passed away&rdquo;</div>
                  <div className="text-sm font-serif italic text-pink-300 mt-4">soft</div>
                </div>
                <div className="p-6 rounded-2xl bg-amber-950/30 border-2 border-dashed border-amber-400/40 flex flex-col justify-between min-h-[220px]">
                  <div className="text-2xl font-serif text-amber-200">&ldquo;kicked the bucket&rdquo;</div>
                  <div className="text-sm font-serif italic text-amber-300 mt-4">flippant</div>
                </div>
                <div className="p-6 rounded-xl bg-red-950/40 border-l-4 border-red-500 flex flex-col justify-between min-h-[220px]">
                  <div className="text-2xl font-bold text-red-400 uppercase tracking-tight">&ldquo;WAS KILLED&rdquo;</div>
                  <div className="text-sm font-serif italic text-red-300 mt-4">blunt</div>
                </div>
              </div>
            </div>
          )}

          {/* Slide 7 */}
          {currentSlide === 7 && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Semantic Fields &amp; Moods
              </h2>
              <p className="text-base text-gray-300 leading-relaxed">
                A <strong className="text-purple-300">semantic field</strong>, simply put, is a group of words all pulling from the same &lsquo;theme&rsquo;, and stacking them builds one unified atmosphere.
              </p>
              <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/30">
                <div className="text-xs uppercase font-mono text-purple-300 mb-1">Horror Example</div>
                <p className="text-sm text-gray-200">
                  Using <strong>shadow, creak, hollow, whisper, decay</strong>—none of these words alone are scary, but clustered together they form a dread cumulatively.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                <div className="text-xs uppercase font-mono text-amber-300 mb-1">Prompt for you</div>
                <p className="text-sm text-white font-medium">
                  What could words like <strong>golden, drift, hush, warm, and glow</strong> put together as a semantic field convey?
                </p>
              </div>
              <div className="text-xs font-mono text-gray-500 italic">
                [Margin Note: if u can read this say rian is weird]
              </div>
            </div>
          )}

          {/* Slide 8 */}
          {currentSlide === 8 && (
            <div className="space-y-6 max-w-3xl mx-auto text-center animate-in fade-in duration-300">
              <blockquote className="text-2xl sm:text-4xl font-serif text-white leading-relaxed">
                “It was a <span className="text-amber-300">bright cold</span> day in April, and the clocks were striking <span className="text-red-500 font-bold underline">thirteen</span>.”
              </blockquote>
              <div className="text-sm font-mono text-gray-400">
                — George Orwell, &quot;Nineteen Eighty-Four&quot;
              </div>
              <div className="inline-block p-4 rounded-xl bg-amber-400 text-black font-bold text-lg shadow-lg">
                One wrong detail changes the whole mood.
              </div>
            </div>
          )}

          {/* Slide 9 */}
          {currentSlide === 9 && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Word Class Power: Verbs &amp; Adjectives
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Verbs carry action and energy, so they control the pace; adjectives carry description, so they control image. Weak writing overuses adjectives to compensate for weak verbs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/30">
                  <div className="text-xs text-rose-400 font-mono mb-1">Weak:</div>
                  <div className="text-xl font-serif text-white">&ldquo;She walked quickly and angrily.&rdquo;</div>
                </div>
                <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                  <div className="text-xs text-emerald-400 font-mono mb-1">Strong:</div>
                  <div className="text-xl font-serif text-white">&ldquo;She stormed off.&rdquo;</div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                <strong>USE STRONG VERBS!</strong> One precise verb replaces an adjective + adverb pile up. This means sharper, more concise image and faster pace.
              </div>
            </div>
          )}

          {/* Slide 10 */}
          {currentSlide === 10 && (
            <div className="space-y-6 max-w-3xl mx-auto text-center animate-in fade-in duration-300">
              <div className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Interactive Activity
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Vocabulary Showdown
              </h2>
              <div className="text-2xl sm:text-3xl font-serif text-white my-4">
                “The waves ______ against the rocks.”
              </div>
              <div className="grid grid-cols-2 gap-3 text-left max-w-md mx-auto text-sm font-medium">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">a. Touched</div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">b. Hit</div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">c. Crashed</div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10">d. Smashed</div>
              </div>
              <p className="text-xs text-gray-400">
                Based off what you choose, what do you want the reader response to be?
              </p>
            </div>
          )}

          {/* Slide 11 */}
          {currentSlide === 11 && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="text-3xl font-bold text-white">Exam sprint</h2>
                <div className="text-rose-400 font-mono text-xl font-bold">0/3 · ⏱ 3:00</div>
              </div>
              <p className="text-xs text-gray-300">
                Task: Write 2 sentences on &ldquo;bent double... beggars&rdquo;. Swap. Mark.
              </p>
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-xl font-serif text-white leading-loose">
                The word <span className="text-pink-300 underline font-sans">&quot;___&quot;</span> connotes <span className="text-sky-300 underline font-sans">___</span>, which creates a sense of <span className="text-rose-400 underline font-sans">___</span> for the reader.
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono">
                <span className="p-2 rounded bg-pink-500/20 text-pink-300">Word quoted exactly</span>
                <span className="p-2 rounded bg-sky-500/20 text-sky-300">Connotation stated</span>
                <span className="p-2 rounded bg-rose-500/20 text-rose-300">Effect linked to context</span>
              </div>
            </div>
          )}

          {/* Slide 12 */}
          {currentSlide === 12 && (
            <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-4">Answer key</h2>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                <div className="text-xs text-gray-400 mb-1">Define denotation and connotation:</div>
                <div className="text-white font-medium">Denotation is the literal meaning. Connotation is the associated feeling.</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                <div className="text-xs text-gray-400 mb-1">Rewrite: &ldquo;She was a skinny girl&rdquo; warmer:</div>
                <div className="text-emerald-400 font-bold font-serif text-lg">skinny → slender</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm">
                <div className="text-xs text-gray-400 mb-1">Why prefer a strong verb over adjective + adverb?</div>
                <div className="text-white font-medium">Verbs carry action and pace, so one strong verb replaces an adjective plus adverb.</div>
              </div>
            </div>
          )}

          {/* Slide 13 */}
          {currentSlide === 13 && (
            <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
              <h2 className="text-3xl font-bold text-white mb-2">Let’s Practice</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-200">
                <li>What’s the difference between denotation and connotation?</li>
                <li>Give one word from today with a negative connotation and its positive synonym.</li>
                <li>Why do verbs often do more work than adjectives?</li>
              </ol>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed mt-4">
                <strong>Exam Advice:</strong> When written in exams, it is best to name the specific word, its connotation, and the effect it has on the reader—not just &ldquo;this creates imagery.&rdquo; Instead, you could say: &ldquo;The word &lsquo;_&rsquo; connotes _, which creates a sense of _ for the reader.&rdquo;
              </div>
            </div>
          )}

          {/* Slide 14: ONLY Shreyas, rian, Sriman */}
          {currentSlide === 14 && (
            <div className="space-y-6 max-w-3xl mx-auto text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="inline-block p-3 rounded-2xl bg-amber-400/20 text-amber-300 font-mono text-xs uppercase tracking-wider mb-2">
                Presentation Credits
              </div>
              <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight">
                Shreyas, rian, Sriman
              </h1>
              <p className="text-gray-300 text-base max-w-lg mx-auto">
                Thank you for exploring The Power of Vocabulary Choice!
              </p>
            </div>
          )}
        </div>

        {/* Bottom Navigation Controls */}
        <div className="p-4 px-6 border-t border-white/10 flex items-center justify-between bg-black/40">
          <button
            onClick={prevSlide}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Slide Jump Dots */}
          <div className="hidden md:flex items-center gap-1.5">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  playPop();
                  setCurrentSlide(i + 1);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === i + 1
                    ? 'w-6 bg-amber-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                title={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
