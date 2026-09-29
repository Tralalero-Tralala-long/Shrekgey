import React, { useState, useEffect } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { Play, Pause, RotateCcw, Check, Award, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

export const ExamSprint: React.FC = () => {
  // Timer state (3 minutes = 180 seconds)
  const [timeLeft, setTimeLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(false);

  // Form inputs matching Slide 11 formula
  const [quotedWord, setQuotedWord] = useState('');
  const [connotation, setConnotation] = useState('');
  const [effect, setEffect] = useState('');

  // Rubric checks
  const hasQuotedWord = quotedWord.trim().length > 0;
  const hasConnotation = connotation.trim().length >= 4;
  const hasEffect = effect.trim().length >= 8;

  const score = (hasQuotedWord ? 1 : 0) + (hasConnotation ? 1 : 0) + (hasEffect ? 1 : 0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playSuccessChime();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    playPop();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    playPop();
    setIsRunning(false);
    setTimeLeft(180);
  };

  const handleFillModelAnswer = () => {
    playSuccessChime();
    setQuotedWord('beggars');
    setConnotation('destitution, physical exhaustion, and loss of dignity');
    setEffect('how young soldiers have been completely degraded and stripped of their humanity by the horrors of trench warfare');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <section id="exam-sprint" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-rose-400 font-semibold mb-3">
          <span>09</span>
          <span>·</span>
          <span>Timed Challenge</span>
          <span>·</span>
          <span>Slide 11</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
              Exam <span className="font-serif italic text-rose-400">sprint</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Task: Write 2 analytical sentences on <span className="text-white font-medium">&ldquo;bent double... beggars&rdquo;</span> (from Wilfred Owen&apos;s <em>Dulce et Decorum Est</em>). Swap. Mark.
            </p>
          </div>

          {/* Sprint Score & Live Timer Card */}
          <div className="liquid-glass border border-white/20 rounded-2xl px-6 py-4 flex items-center gap-6 bg-black/60 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">
                Rubric Score
              </span>
              <div className="text-3xl font-mono font-bold text-rose-400">
                {score}/3
              </div>
            </div>

            <div className="border-l border-white/10 pl-6">
              <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block">
                Countdown
              </span>
              <div className="text-3xl font-mono font-bold text-white flex items-center gap-2">
                <span>⏱ {formattedTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleTimer}
                className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                  isRunning ? 'bg-amber-500 text-black' : 'bg-emerald-500 text-black'
                }`}
                title={isRunning ? 'Pause Timer' : 'Start 3-Minute Sprint'}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        {/* Left Column: Interactive Sentence Construction Desk */}
        <div className="lg:col-span-8">
          <Card3D depth={12}>
            <div className="liquid-glass border border-white/15 rounded-3xl p-8 bg-[#090d18]/90 shadow-2xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400 font-semibold">
                  Exam Sentence Template (Slide 11 Formula)
                </span>
                <button
                  onClick={handleFillModelAnswer}
                  className="text-xs text-amber-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-mono"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Insert Model Answer</span>
                </button>
              </div>

              {/* Formula Blueprint Sentence Box */}
              <div className="text-lg md:text-xl font-serif text-white/95 leading-loose space-y-4 mb-8">
                <div>
                  The word{' '}
                  <span className="inline-block relative">
                    &ldquo;
                    <input
                      type="text"
                      value={quotedWord}
                      onChange={(e) => setQuotedWord(e.target.value)}
                      placeholder="e.g. beggars"
                      className="px-3 py-1 bg-pink-500/10 border-b-2 border-pink-400 text-pink-200 text-base font-sans rounded focus:outline-none focus:ring-2 focus:ring-pink-400/50 w-36 sm:w-44 text-center font-semibold"
                    />
                    &rdquo;
                  </span>{' '}
                  connotes{' '}
                  <input
                    type="text"
                    value={connotation}
                    onChange={(e) => setConnotation(e.target.value)}
                    placeholder="e.g. extreme destitution, filth, exhaustion"
                    className="px-3 py-1 bg-sky-950/40 border-b-2 border-sky-400 text-sky-200 text-base font-sans rounded focus:outline-none focus:ring-2 focus:ring-sky-400/50 w-full sm:w-80 mt-2 sm:mt-0 font-medium"
                  />
                  ,
                </div>

                <div>
                  which creates a sense of{' '}
                  <input
                    type="text"
                    value={effect}
                    onChange={(e) => setEffect(e.target.value)}
                    placeholder="e.g. soldiers reduced from heroic warriors to broken, dying outcasts"
                    className="px-3 py-1 bg-rose-950/40 border-b-2 border-red-500 text-red-200 text-base font-sans rounded focus:outline-none focus:ring-2 focus:ring-red-400/50 w-full mt-2 font-medium"
                  />{' '}
                  for the reader.
                </div>
              </div>

              {/* Synthesized Live Sentence Preview */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 block mb-2">
                  Live Assembled Exam Answer
                </span>
                <p className="text-sm md:text-base text-gray-200 font-serif italic leading-relaxed">
                  {quotedWord || connotation || effect ? (
                    <>
                      &ldquo;The word <strong className="text-pink-300">&apos;{quotedWord || '...'}&apos;</strong> connotes <strong className="text-sky-300">{connotation || '...'}</strong>, which creates a sense of <strong className="text-rose-300">{effect || '...'}</strong> for the reader.&rdquo;
                    </>
                  ) : (
                    'Fill in the three slots above or click "Insert Model Answer" to build an unassailable 3/3 GCSE-level analytical sentence.'
                  )}
                </p>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Right Column: Exact Slide 11 Marking Rubric */}
        <div className="lg:col-span-4 space-y-4">
          <div className="liquid-glass border border-white/15 rounded-3xl p-6 bg-[#0a0f1c]/80">
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
              <span>Marking Criteria</span>
              <span className="text-xs font-mono text-gray-400">0/3 Scale</span>
            </h4>

            <div className="space-y-4 text-xs">
              {/* Criterion 1: Word quoted exactly */}
              <div className={`p-4 rounded-xl border transition-all ${
                hasQuotedWord
                  ? 'bg-pink-950/30 border-pink-400/50 text-pink-200'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-pink-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                    1. Word quoted exactly
                  </span>
                  {hasQuotedWord ? <Check className="w-4 h-4 text-pink-400" /> : <span className="font-mono">0/1</span>}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Never analyze paraphrases. Place exact quotation marks around the targeted lexical choice.
                </p>
              </div>

              {/* Criterion 2: Connotation stated */}
              <div className={`p-4 rounded-xl border transition-all ${
                hasConnotation
                  ? 'bg-sky-950/30 border-sky-400/50 text-sky-200'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sky-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    2. Connotation stated
                  </span>
                  {hasConnotation ? <Check className="w-4 h-4 text-sky-400" /> : <span className="font-mono">0/1</span>}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Specify the emotional, cultural, or sensory associations attached to the word.
                </p>
              </div>

              {/* Criterion 3: Effect linked to context */}
              <div className={`p-4 rounded-xl border transition-all ${
                hasEffect
                  ? 'bg-rose-950/30 border-red-500/50 text-rose-200'
                  : 'bg-white/5 border-white/10 text-gray-400'
              }`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    3. Effect linked to context
                  </span>
                  {hasEffect ? <Check className="w-4 h-4 text-rose-400" /> : <span className="font-mono">0/1</span>}
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Anchor the psychological outcome in the specific reality of the poem or narrative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
