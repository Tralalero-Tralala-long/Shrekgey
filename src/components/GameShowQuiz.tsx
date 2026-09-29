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
  Trophy,
  Flame,
  Heart,
  Users,
  Percent,
  Timer,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Award,
  Crown,
  CheckCircle,
  XCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowLeft,
} from 'lucide-react';

interface GameShowQuizProps {
  onBackToPresentation?: () => void;
}

export const GameShowQuiz: React.FC<GameShowQuizProps> = ({ onBackToPresentation }) => {
  // Game State
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Lifelines (used once per game)
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false);
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);
  const [usedAudience, setUsedAudience] = useState(false);
  const [showAudienceModal, setShowAudienceModal] = useState(false);

  // Question Interaction State
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [revealResult, setRevealResult] = useState(false);

  // 15-second timer per question
  const [timeLeft, setTimeLeft] = useState(15);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const currentQ: QuizQuestion = IGCSE_QUIZ_QUESTIONS[currentIdx] || IGCSE_QUIZ_QUESTIONS[0];
  const totalQuestions = IGCSE_QUIZ_QUESTIONS.length;

  // Sound toggle
  const handleToggleSound = () => {
    const next = toggleSound();
    setSoundOn(next);
    playPop();
  };

  // Timer countdown
  useEffect(() => {
    if (gameOver || gameWon || isLocked || revealResult) return;

    if (timeLeft === 0) {
      // Time is up! Treat as incorrect
      handleTimeExpired();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 4 && prev > 0) {
          playTickSound(true); // Urgent fast tick
        } else if (prev > 4) {
          playTickSound(false);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isLocked, revealResult, gameOver, gameWon]);

  // Handle timeout
  const handleTimeExpired = () => {
    playWrongBuzzer();
    setIsLocked(true);
    setRevealResult(true);
    setStreak(0);
    const newLives = lives - 1;
    setLives(newLives);
    if (newLives <= 0) {
      setGameOver(true);
    }
  };

  // Click an answer option
  const handleSelectOption = (key: string) => {
    if (isLocked || revealResult || gameOver || gameWon) return;
    if (hiddenKeys.includes(key)) return;

    playLockInSound();
    setSelectedKey(key);
    setIsLocked(true);

    // Dramatic Steve Harvey tension pause before reveal (1.2s)
    setTimeout(() => {
      const chosenOpt = currentQ.options.find((o) => o.key === key);
      const isCorrect = chosenOpt?.isCorrect ?? false;

      if (isCorrect) {
        playSuccessChime();
        const streakBonus = streak >= 2 ? (streak + 1) * 50 : 0;
        const roundPoints = currentQ.points + streakBonus;
        setScore((prev) => prev + roundPoints);
        setStreak((prev) => {
          const next = prev + 1;
          if (next > maxStreak) setMaxStreak(next);
          return next;
        });
      } else {
        playWrongBuzzer();
        setStreak(0);
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          setTimeout(() => setGameOver(true), 1200);
        }
      }

      setRevealResult(true);
    }, 1100);
  };

  // Advance to next question
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

  // Lifeline: 50/50
  const handleUseFiftyFifty = () => {
    if (usedFiftyFifty || isLocked || revealResult) return;
    playLifelineSound();
    setUsedFiftyFifty(true);

    const incorrectOptions = currentQ.options.filter((o) => !o.isCorrect);
    // Shuffle and pick 2 to eliminate
    const toEliminate = incorrectOptions.slice(0, 2).map((o) => o.key);
    setHiddenKeys(toEliminate);
  };

  // Lifeline: Ask the Audience
  const handleUseAudience = () => {
    if (usedAudience || isLocked || revealResult) return;
    playLifelineSound();
    setUsedAudience(true);
    setShowAudienceModal(true);
  };

  // Restart game
  const handleRestart = () => {
    playPop();
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
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
      {/* Background Neon Game-Show Stage Lighting */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/20 via-rose-600/10 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Top Game Show Header */}
      <header className="sticky top-0 z-40 px-4 md:px-8 py-3.5 bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          {/* Logo / Game title */}
          <div className="flex items-center gap-3">
            {onBackToPresentation ? (
              <button
                onClick={onBackToPresentation}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
                title="Back to presentation"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : (
              <a
                href="/"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Presentation</span>
              </a>
            )}

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-extrabold text-[10px] uppercase tracking-wider">
                  LIVE
                </span>
                <h1 className="text-base sm:text-lg font-black tracking-tight uppercase bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent font-serif">
                  English Showdown
                </h1>
              </div>
              <p className="text-[10px] text-gray-400 font-mono hidden sm:block">
                IGCSE Level 9 Vocabulary &amp; Language Masterclass
              </p>
            </div>
          </div>

          {/* Center: Lives & Streak Meter */}
          <div className="flex items-center gap-4">
            {/* Lives */}
            <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < lives
                      ? 'fill-rose-500 text-rose-500 scale-100'
                      : 'fill-white/10 text-white/20 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Streak Bonus */}
            <div className="hidden sm:flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-white/10">
              <Flame
                className={`w-4 h-4 ${
                  streak >= 2 ? 'text-amber-400 animate-bounce' : 'text-gray-500'
                }`}
              />
              <span className="text-xs font-mono font-bold text-amber-300">
                {streak}x Streak
              </span>
            </div>
          </div>

          {/* Right: Score & Audio */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/80 block">
                Total Score
              </span>
              <span className="text-lg sm:text-2xl font-black font-mono tracking-tight text-white">
                {score.toLocaleString()} PTS
              </span>
            </div>

            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Mute' : 'Unmute'}
              className="p-2 text-white/70 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-white/40" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-6 flex flex-col justify-center">
        {/* Game Won Celebration Screen */}
        {gameWon ? (
          <div className="bg-[#0f172a]/90 border-2 border-amber-400 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-3xl bg-amber-400 text-black flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(251,191,36,0.5)]">
              <Crown className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Grand Champion Final Result
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-serif">
                You Conquered The Showdown!
              </h2>
              <p className="text-gray-300 text-sm max-w-lg mx-auto">
                Flawless victory! You solved all 10 Cambridge IGCSE Level 9 analytical conundrums.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Final Score</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300">{score}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Max Streak</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-rose-400">{maxStreak}x</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-gray-400 uppercase font-mono block">Lives Kept</span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">{lives}/3</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl bg-amber-400 text-black font-bold text-sm hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>
              {onBackToPresentation && (
                <button
                  onClick={onBackToPresentation}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Return To Masterclass</span>
                </button>
              )}
            </div>
          </div>
        ) : gameOver ? (
          /* Game Over Screen */
          <div className="bg-[#180e15]/95 border-2 border-rose-500/60 rounded-3xl p-8 sm:p-12 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-20 h-20 rounded-3xl bg-rose-600/20 border border-rose-500 text-rose-400 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(244,63,94,0.3)]">
              <XCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
                Steve Harvey: &ldquo;That&apos;s Strike Three!&rdquo;
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-serif">
                Out of Lives!
              </h2>
              <p className="text-gray-300 text-sm max-w-lg mx-auto">
                Cambridge IGCSE examiners take no prisoners! You reached Round {currentIdx + 1} with {score} points.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="px-8 py-3 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again from Round 1</span>
              </button>
              {onBackToPresentation && (
                <button
                  onClick={onBackToPresentation}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer"
                >
                  Return to Masterclass Deck
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Active Question Stage */
          <div className="space-y-6">
            {/* Round info bar & Lifelines */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Round & Points */}
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-extrabold text-xs uppercase tracking-wider shadow-md">
                  Round {currentIdx + 1} of {totalQuestions}
                </span>
                <span className="text-xs font-mono font-semibold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-lg">
                  +{currentQ.points} PTS
                </span>
                <span className="text-xs text-gray-400 hidden md:inline">
                  {currentQ.topic}
                </span>
              </div>

              {/* 15-Second Circular Animated Countdown Timer */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border transition-all ${
                    timeLeft <= 4
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300 animate-pulse'
                      : 'bg-black/40 border-white/15 text-white'
                  }`}
                >
                  <Timer className={`w-4 h-4 ${timeLeft <= 4 ? 'text-rose-400' : 'text-amber-400'}`} />
                  <span>0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
                </div>

                {/* Lifeline buttons */}
                <div className="flex items-center gap-2">
                  {/* 50/50 Lifeline */}
                  <button
                    onClick={handleUseFiftyFifty}
                    disabled={usedFiftyFifty || isLocked || revealResult}
                    title={usedFiftyFifty ? '50/50 Lifeline already used' : 'Use 50/50 Lifeline (Eliminate 2 wrong choices)'}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                      usedFiftyFifty
                        ? 'opacity-30 bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                        : 'bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/50 text-purple-200 cursor-pointer shadow-sm hover:scale-105'
                    }`}
                  >
                    <Percent className="w-3.5 h-3.5" />
                    <span>50/50</span>
                  </button>

                  {/* Ask Audience Lifeline */}
                  <button
                    onClick={handleUseAudience}
                    disabled={usedAudience || isLocked || revealResult}
                    title={usedAudience ? 'Ask the Audience already used' : 'Ask the Audience Poll'}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1 ${
                      usedAudience
                        ? 'opacity-30 bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                        : 'bg-sky-600/30 hover:bg-sky-600/50 border border-sky-400/50 text-sky-200 cursor-pointer shadow-sm hover:scale-105'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Audience</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Host Intro Dialogue (Steve Harvey banter) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-black/40 to-transparent border-l-4 border-amber-400 text-xs text-amber-200 flex items-center gap-3">
              <span className="text-lg">🎙️</span>
              <span className="italic">{currentQ.hostIntro}</span>
            </div>

            {/* Main Question Display Box */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#11162b]/90 to-[#0c1020]/95 border-2 border-white/15 shadow-2xl">
              <span className="text-[11px] uppercase font-mono tracking-widest text-sky-400 block mb-2 font-semibold">
                {currentQ.level}
              </span>
              <h2 className="text-lg sm:text-2xl font-serif font-bold text-white leading-relaxed">
                {currentQ.question}
              </h2>
            </div>

            {/* Answer Options Grid (A, B, C, D) with Dramatic Game Show Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((opt) => {
                const isSelected = selectedKey === opt.key;
                const isEliminated = hiddenKeys.includes(opt.key);

                // Reveal styling
                let btnStyle =
                  'bg-[#0f1424]/90 border-white/15 text-gray-200 hover:border-amber-400/60 hover:bg-[#161f36]';
                let letterStyle = 'bg-white/10 text-white';

                if (isEliminated) {
                  btnStyle = 'opacity-20 bg-black/40 border-white/5 text-gray-600 pointer-events-none';
                  letterStyle = 'bg-transparent text-gray-600';
                } else if (revealResult) {
                  if (opt.isCorrect) {
                    btnStyle =
                      'bg-emerald-950/70 border-emerald-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] ring-2 ring-emerald-400';
                    letterStyle = 'bg-emerald-400 text-black font-extrabold';
                  } else if (isSelected && !opt.isCorrect) {
                    btnStyle =
                      'bg-rose-950/80 border-rose-500 text-rose-200 shadow-[0_0_30px_rgba(244,63,94,0.3)] ring-2 ring-rose-500';
                    letterStyle = 'bg-rose-500 text-white font-extrabold';
                  } else {
                    btnStyle = 'opacity-40 bg-[#0f1424]/40 border-white/5 text-gray-500';
                    letterStyle = 'bg-white/5 text-gray-500';
                  }
                } else if (isSelected) {
                  // Locked in state
                  btnStyle =
                    'bg-amber-500/20 border-amber-400 text-white ring-4 ring-amber-400/40 shadow-xl animate-pulse';
                  letterStyle = 'bg-amber-400 text-black font-bold';
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.key)}
                    disabled={isLocked || isEliminated}
                    className={`relative p-5 rounded-2xl border-2 text-left transition-all duration-200 flex items-start gap-4 cursor-pointer group ${btnStyle}`}
                  >
                    {/* Letter badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-transform ${letterStyle}`}
                    >
                      {opt.key}
                    </div>

                    {/* Option Text */}
                    <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed pr-2">
                      {opt.text}
                    </div>

                    {/* Locked In Icon */}
                    {isSelected && !revealResult && (
                      <div className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-widest self-center shrink-0">
                        🔒 LOCKED IN!
                      </div>
                    )}

                    {/* Correct / Incorrect Reveal Icons */}
                    {revealResult && opt.isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 self-center" />
                    )}
                    {revealResult && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 self-center" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Audience Poll Modal (when lifeline used) */}
            {showAudienceModal && (
              <div className="p-5 rounded-2xl bg-[#0d1326] border border-sky-400/40 shadow-xl animate-in fade-in duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase">
                    <Users className="w-4 h-4" />
                    <span>Audience Poll Results (100 IGCSE Teachers Surveyed)</span>
                  </div>
                  <button
                    onClick={() => setShowAudienceModal(false)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    ✕ Close
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {currentQ.options.map((opt) => (
                    <div key={opt.key} className="text-center">
                      <div className="h-20 bg-white/5 rounded-xl p-1 flex items-end justify-center mb-1">
                        <div
                          className="w-full bg-sky-400/70 rounded-lg transition-all duration-700"
                          style={{ height: `${opt.audiencePercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-white block">
                        {opt.key}: {opt.audiencePercent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explanation & Cambridge Examiner Insight (After Reveal) */}
            {revealResult && (
              <div className="p-6 rounded-3xl bg-black/60 border border-white/20 space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-400">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    Official Linguistic Breakdown
                  </span>
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-amber-400/20"
                  >
                    <span>Next Round</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-sm text-gray-200 leading-relaxed font-serif">
                  {currentQ.explanation}
                </p>

                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 leading-relaxed">
                  <strong>{currentQ.examinerInsight}</strong>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer Navigation bar */}
      <footer className="px-6 py-4 border-t border-white/10 bg-black/40 text-center text-xs text-gray-500 font-mono flex flex-wrap items-center justify-between gap-4 max-w-6xl mx-auto w-full">
        <div>
          The Power of Vocabulary Choice · English Showdown Quiz Edition
        </div>
        <div className="flex items-center gap-4">
          <span>Presented by Shreyas, rian, Sriman</span>
          <span>·</span>
          <span>10 Cambridge IGCSE Conundrums</span>
        </div>
      </footer>
    </div>
  );
};
