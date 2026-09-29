import React, { useState, useEffect } from 'react';
import { IGCSE_QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';
import {
  playPop,
  playSuccessChime,
  playWrongBuzzer,
  playLockInSound,
  playTickSound,
  playLifelineSound,
  isSoundEnabled,
  toggleSound,
} from '../utils/audio';
import {
  Heart,
  Users,
  Percent,
  Timer,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle,
  XCircle,
  ChevronRight,
  BookOpen,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { TrademarkModal } from './TrademarkModal';

interface GameShowQuizProps {
  onBackToPresentation?: () => void;
}

export const GameShowQuiz: React.FC<GameShowQuizProps> = ({ onBackToPresentation }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Lifelines
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [usedAudience, setUsedAudience] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  // Question interaction
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [revealResult, setRevealResult] = useState(false);

  // 15-second timer
  const [timeLeft, setTimeLeft] = useState(15);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const currentQ: QuizQuestion = IGCSE_QUIZ_QUESTIONS[currentIdx] || IGCSE_QUIZ_QUESTIONS[0];
  const totalQuestions = IGCSE_QUIZ_QUESTIONS.length;

  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
    playPop();
  };

  useEffect(() => {
    if (gameOver || gameWon || isLocked || revealResult) return;

    if (timeLeft === 0) {
      handleTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 4 && prev > 0) {
          playTickSound(true);
        } else if (prev > 4) {
          playTickSound(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isLocked, revealResult, gameOver, gameWon]);

  const handleTimeExpired = () => {
    playWrongBuzzer();
    setIsLocked(true);
    setRevealResult(true);
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) {
      setGameOver(true);
    }
  };

  const handleSelectOption = (key: string) => {
    if (isLocked || revealResult || gameOver || gameWon) return;
    if (hiddenKeys.includes(key)) return;

    playLockInSound();
    setSelectedKey(key);
    setIsLocked(true);

    setTimeout(() => {
      const chosenOpt = currentQ.options.find((o) => o.key === key);
      const isCorrect = chosenOpt?.isCorrect ?? false;

      if (isCorrect) {
        playSuccessChime();
        setScore((prev) => prev + currentQ.points);
      } else {
        playWrongBuzzer();
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          setTimeout(() => setGameOver(true), 1000);
        }
      }

      setRevealResult(true);
    }, 900);
  };

  const handleNextQuestion = () => {
    playPop();
    if (currentIdx + 1 >= totalQuestions) {
      setGameWon(true);
      playSuccessChime();
      return;
    }

    setCurrentIdx((prev) => prev + 1);
    setSelectedKey(null);
    setIsLocked(false);
    setRevealResult(false);
    setTimeLeft(15);
    setHiddenKeys([]);
    setShowAudienceModal(false);
  };

  const handleUseFiftyFifty = () => {
    if (usedFiftyFifty || isLocked || revealResult) return;
    playLifelineSound();
    setUsedFiftyFifty(true);
    const incorrectOptions = currentQ.options.filter((o) => !o.isCorrect);
    const toEliminate = incorrectOptions.slice(0, 2).map((o) => o.key);
    setHiddenKeys(toEliminate);
  };

  const handleUseAudience = () => {
    if (usedAudience || isLocked || revealResult) return;
    playLifelineSound();
    setUsedAudience(true);
    setShowAudienceModal(true);
  };

  const handleRestart = () => {
    playPop();
    setCurrentIdx(0);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setUsedFiftyFifty(false);
    setUsedAudience(false);
    setHiddenKeys([]);
    setShowAudienceModal(false);
    setSelectedKey(null);
    setIsLocked(false);
    setRevealResult(false);
    setTimeLeft(15);
  };

  return (
    <div className="relative min-h-screen bg-[#070913] text-white selection:bg-amber-400 selection:text-black font-sans flex flex-col justify-between overflow-x-hidden">
      {/* Clean Top Bar */}
      <header className="sticky top-0 z-40 px-4 md:px-8 py-3 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onBackToPresentation ? (
              <button
                onClick={onBackToPresentation}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Presentation</span>
              </button>
            ) : (
              <a
                href="/"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Presentation</span>
              </a>
            )}

            <div className="text-sm font-bold text-white font-serif">
              English Showdown Quiz
            </div>
          </div>

          {/* Lives Counter */}
          <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-4 h-4 transition-all ${
                  i < lives
                    ? 'fill-rose-500 text-rose-500'
                    : 'fill-white/10 text-white/20'
                }`}
              />
            ))}
          </div>

          {/* Score & Audio */}
          <div className="flex items-center gap-3">
            <span className="text-sm sm:text-base font-bold font-mono text-amber-300">
              {score} PTS
            </span>
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Mute' : 'Unmute'}
              className="p-1.5 text-white/70 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-8 flex flex-col justify-center">
        {gameWon ? (
          /* Won Screen */
          <div className="bg-[#0f172a]/90 border border-amber-400/50 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-5 animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Quiz Completed!
            </h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              You worked through all 10 Grade 10 Cambridge IGCSE English questions.
            </p>

            <div className="py-2 text-3xl font-mono font-bold text-amber-300">
              Final Score: {score} Points
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              {onBackToPresentation && (
                <button
                  onClick={onBackToPresentation}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Return to Presentation</span>
                </button>
              )}
            </div>
          </div>
        ) : gameOver ? (
          /* Game Over Screen */
          <div className="bg-[#180e15]/95 border border-rose-500/50 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-5 animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-serif">
              Out of Lives
            </h2>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              You reached Question {currentIdx + 1} with {score} points.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              {onBackToPresentation && (
                <button
                  onClick={onBackToPresentation}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer"
                >
                  Return to Presentation
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Question */
          <div className="space-y-5">
            {/* Question Info Bar & Lifelines */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-black font-bold">
                  Question {currentIdx + 1} of {totalQuestions}
                </span>
                <span className="text-gray-400">+{currentQ.points} PTS</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs font-bold border ${
                    timeLeft <= 4
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-black/40 border-white/15 text-white'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span>0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                </div>

                {/* 50/50 */}
                <button
                  onClick={handleUseFiftyFifty}
                  disabled={usedFiftyFifty || isLocked || revealResult}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1 ${
                    usedFiftyFifty
                      ? 'opacity-30 bg-white/5 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 cursor-pointer'
                  }`}
                  title="50/50 Lifeline"
                >
                  <Percent className="w-3 h-3" />
                  <span>50/50</span>
                </button>

                {/* Audience */}
                <button
                  onClick={handleUseAudience}
                  disabled={usedAudience || isLocked || revealResult}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all flex items-center gap-1 ${
                    usedAudience
                      ? 'opacity-30 bg-white/5 text-gray-500 cursor-not-allowed'
                      : 'bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/40 text-sky-200 cursor-pointer'
                  }`}
                  title="Ask Audience Lifeline"
                >
                  <Users className="w-3 h-3" />
                  <span>Audience</span>
                </button>
              </div>
            </div>

            {/* Question Text */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#11162b]/90 border border-white/15 shadow-xl">
              <h2 className="text-base sm:text-xl font-serif font-bold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentQ.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                const isEliminated = hiddenKeys.includes(opt.key);

                let btnStyle = 'bg-[#0f1424]/90 border-white/15 text-gray-200 hover:border-amber-400/60';
                let letterStyle = 'bg-white/10 text-white';

                if (isEliminated) {
                  btnStyle = 'opacity-20 bg-black/40 border-white/5 text-gray-600 pointer-events-none';
                  letterStyle = 'bg-transparent text-gray-600';
                } else if (revealResult) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-950/70 border-emerald-400 text-white ring-1 ring-emerald-400';
                    letterStyle = 'bg-emerald-400 text-black font-bold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-1 ring-rose-500';
                    letterStyle = 'bg-rose-500 text-white font-bold';
                  } else {
                    btnStyle = 'opacity-40 bg-[#0f1424]/40 border-white/5 text-gray-500';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/40';
                  letterStyle = 'bg-amber-400 text-black font-bold';
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    disabled={isLocked || isEliminated}
                    className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${letterStyle}`}>
                      {opt.key}
                    </div>
                    <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
                      {opt.text}
                    </div>
                    {isSelected && !revealResult && (
                      <span className="text-[10px] font-mono text-amber-300 font-bold shrink-0 self-center">
                        LOCKED IN
                      </span>
                    )}
                    {revealResult && opt.isCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 self-center" />
                    )}
                    {revealResult && isSelected && !opt.isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 self-center" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Audience Poll Modal */}
            {showAudienceModal && (
              <div className="p-4 rounded-xl bg-[#0d1326] border border-sky-400/40 shadow-lg text-xs">
                <div className="flex items-center justify-between mb-2 text-sky-400 font-mono font-bold">
                  <span>Audience Poll Estimates:</span>
                  <button onClick={() => setShowAudienceModal(false)} className="text-gray-400 hover:text-white">✕</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {currentQ.options.map((opt) => (
                    <div key={opt.key} className="text-center font-mono text-white">
                      {opt.key}: {opt.audiencePercent}%
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation */}
            {revealResult && (
              <div className="p-5 rounded-2xl bg-black/60 border border-white/15 space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold">
                    Explanation
                  </span>
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-1.5 rounded-lg bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-serif">
                  {currentQ.explanation}
                </p>
                <div className="text-xs text-amber-200">
                  {currentQ.examinerInsight}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="px-6 py-5 border-t border-white/10 bg-black/60 text-center space-y-2">
        <div className="text-xs text-gray-400">The Power of Vocabulary Choice · Shreyas, rian, Sriman</div>
        <div>
          <button
            onClick={() => setIsPhotoOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/50 text-amber-300 hover:text-amber-200 font-bold text-xs sm:text-sm tracking-wide shadow-sm cursor-pointer transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Trade marked By Goon Till Noon website builders</span>
            <span className="text-[11px] font-normal underline text-amber-400/80">(View Photo)</span>
          </button>
        </div>
      </footer>

      {/* Picture Modal */}
      <TrademarkModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
      />
    </div>
  );
};
