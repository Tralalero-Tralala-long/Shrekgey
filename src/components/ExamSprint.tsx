import React, { useState, useEffect } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { Play, Pause, RotateCcw, Check } from 'lucide-react';

export const ExamSprint: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  const [isRunning, setIsRunning] = useState(false);

  const [quotedWord, setQuotedWord] = useState('');
  const [connotation, setConnotation] = useState('');
  const [effect, setEffect] = useState('');

  const hasWord = quotedWord.trim().length > 0;
  const hasConnotation = connotation.trim().length > 3;
  const hasEffect = effect.trim().length > 5;

  const score = (hasWord ? 1 : 0) + (hasConnotation ? 1 : 0) + (hasEffect ? 1 : 0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
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

  const fillModel = () => {
    playSuccessChime();
    setQuotedWord('beggars');
    setConnotation('extreme destitution, physical suffering, and loss of dignity');
    setEffect('soldiers stripped of their youth and reduced to broken outcasts');
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <section id="exam-sprint" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-serif">
              Exam Sprint
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl">
              Write 2 analytical sentences on &ldquo;bent double... beggars&rdquo; (Wilfred Owen).
            </p>
          </div>

          {/* Minimal Timer & Rubric */}
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-black/60 border border-white/10 self-start sm:self-auto">
            <div className="text-center px-2">
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Rubric</span>
              <span className="text-lg font-bold font-mono text-amber-300">{score}/3</span>
            </div>

            <div className="text-center px-3 border-l border-white/10">
              <span className="text-[10px] uppercase font-mono text-gray-400 block">Time</span>
              <span className="text-lg font-bold font-mono text-white">{formattedTime}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTimer}
                className="p-2 rounded-xl bg-amber-400 text-black hover:bg-amber-300 transition-colors cursor-pointer"
                title={isRunning ? 'Pause' : 'Start'}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sentence Builder */}
        <div className="lg:col-span-8">
          <Card3D depth={10}>
            <div className="p-7 rounded-2xl bg-[#090d18]/90 border border-white/15 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs uppercase font-mono text-gray-400">
                  Sentence Formula
                </span>
                <button
                  onClick={fillModel}
                  className="text-xs text-amber-300 hover:text-white font-mono transition-colors cursor-pointer"
                >
                  Insert Model Answer
                </button>
              </div>

              {/* Formula input box */}
              <div className="space-y-4 text-base sm:text-lg font-serif text-white/95 leading-relaxed">
                <div>
                  The word{' '}
                  <input
                    type="text"
                    value={quotedWord}
                    onChange={(e) => setQuotedWord(e.target.value)}
                    placeholder="word from text"
                    className="px-2.5 py-1 bg-white/10 border-b-2 border-pink-400 text-pink-200 text-sm font-sans rounded focus:outline-none w-36 text-center font-medium"
                  />{' '}
                  connotes{' '}
                  <input
                    type="text"
                    value={connotation}
                    onChange={(e) => setConnotation(e.target.value)}
                    placeholder="associated feelings or ideas"
                    className="px-2.5 py-1 bg-white/10 border-b-2 border-sky-400 text-sky-200 text-sm font-sans rounded focus:outline-none w-full sm:w-72 mt-2 sm:mt-0 font-medium"
                  />
                  ,
                </div>

                <div>
                  which creates a sense of{' '}
                  <input
                    type="text"
                    value={effect}
                    onChange={(e) => setEffect(e.target.value)}
                    placeholder="specific effect on reader"
                    className="px-2.5 py-1 bg-white/10 border-b-2 border-amber-400 text-amber-200 text-sm font-sans rounded focus:outline-none w-full mt-2 font-medium"
                  />{' '}
                  for the reader.
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-gray-200 font-serif italic">
                &ldquo;The word &lsquo;<span className="text-pink-300 font-sans font-bold">{quotedWord || '...'}</span>&rsquo; connotes <span className="text-sky-300 font-sans font-medium">{connotation || '...'}</span>, which creates a sense of <span className="text-amber-300 font-sans font-medium">{effect || '...'}</span> for the reader.&rdquo;
              </div>
            </div>
          </Card3D>
        </div>

        {/* Minimal Rubric Criteria */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-5 rounded-2xl bg-[#0a0f1c]/80 border border-white/10 space-y-3">
            <div className="text-xs uppercase font-mono text-gray-400 font-semibold pb-2 border-b border-white/10">
              Exam Criteria (3 Marks)
            </div>

            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${hasWord ? 'bg-pink-950/30 border-pink-400/40 text-pink-200' : 'bg-white/5 border-white/10 text-gray-400'}`}>
              <span>1. Word quoted accurately</span>
              {hasWord ? <Check className="w-4 h-4 text-pink-400" /> : <span className="font-mono">0/1</span>}
            </div>

            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${hasConnotation ? 'bg-sky-950/30 border-sky-400/40 text-sky-200' : 'bg-white/5 border-white/10 text-gray-400'}`}>
              <span>2. Specific connotation stated</span>
              {hasConnotation ? <Check className="w-4 h-4 text-sky-400" /> : <span className="font-mono">0/1</span>}
            </div>

            <div className={`p-3 rounded-xl border text-xs flex items-center justify-between ${hasEffect ? 'bg-amber-950/30 border-amber-400/40 text-amber-200' : 'bg-white/5 border-white/10 text-gray-400'}`}>
              <span>3. Effect linked to the context</span>
              {hasEffect ? <Check className="w-4 h-4 text-amber-400" /> : <span className="font-mono">0/1</span>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
