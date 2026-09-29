import React, { useState } from 'react';
import { playPop, playSuccessChime } from '../utils/audio';
import { CheckCircle2, RotateCcw, Eye } from 'lucide-react';

export type Category = 'positive' | 'neutral' | 'negative' | 'unassigned';

interface WordItem {
  id: string;
  word: string;
  targetCategory: 'positive' | 'neutral' | 'negative';
}

const WORDS_DATA: WordItem[] = [
  { id: 'w1', word: 'determined', targetCategory: 'positive' },
  { id: 'w2', word: 'confident', targetCategory: 'positive' },
  { id: 'w3', word: 'curious', targetCategory: 'neutral' },
  { id: 'w4', word: 'inquisitive', targetCategory: 'neutral' },
  { id: 'w5', word: 'stubborn', targetCategory: 'negative' },
  { id: 'w6', word: 'pig-headed', targetCategory: 'negative' },
  { id: 'w7', word: 'nosy', targetCategory: 'negative' },
  { id: 'w8', word: 'cocky', targetCategory: 'negative' },
  { id: 'w9', word: 'arrogant', targetCategory: 'negative' },
];

export const SortTheFeeling: React.FC = () => {
  const [placements, setPlacements] = useState<Record<string, Category>>(() => {
    const initial: Record<string, Category> = {};
    WORDS_DATA.forEach((w) => {
      initial[w.id] = 'unassigned';
    });
    return initial;
  });

  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const handleSelectWord = (id: string) => {
    playPop();
    setSelectedWordId(selectedWordId === id ? null : id);
  };

  const handlePlaceIn = (category: Category) => {
    if (!selectedWordId) return;
    playPop();
    setPlacements((prev) => ({
      ...prev,
      [selectedWordId]: category,
    }));
    setSelectedWordId(null);
    setHasChecked(false);
  };

  const handleReset = () => {
    playPop();
    const initial: Record<string, Category> = {};
    WORDS_DATA.forEach((w) => {
      initial[w.id] = 'unassigned';
    });
    setPlacements(initial);
    setSelectedWordId(null);
    setHasChecked(false);
  };

  const handleAutoSolve = () => {
    playSuccessChime();
    const solved: Record<string, Category> = {};
    WORDS_DATA.forEach((w) => {
      solved[w.id] = w.targetCategory;
    });
    setPlacements(solved);
    setSelectedWordId(null);
    setHasChecked(true);
  };

  const handleCheck = () => {
    playPop();
    setHasChecked(true);
    const allCorrect = WORDS_DATA.every((w) => placements[w.id] === w.targetCategory);
    if (allCorrect) {
      playSuccessChime();
    }
  };

  const unassignedWords = WORDS_DATA.filter((w) => placements[w.id] === 'unassigned');
  const positiveWords = WORDS_DATA.filter((w) => placements[w.id] === 'positive');
  const neutralWords = WORDS_DATA.filter((w) => placements[w.id] === 'neutral');
  const negativeWords = WORDS_DATA.filter((w) => placements[w.id] === 'negative');

  const correctCount = WORDS_DATA.filter((w) => placements[w.id] === w.targetCategory).length;

  return (
    <section id="sorting-lab" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Sort the Feeling
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Sort each word into its connotation: <span className="text-amber-300">Positive</span>, <span className="text-sky-300">Neutral</span>, or <span className="text-rose-400">Negative</span>.
        </p>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 liquid-glass rounded-2xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
          <span className="text-gray-400">Progress:</span>
          <span className="font-mono text-white">
            {WORDS_DATA.length - unassignedWords.length} / {WORDS_DATA.length}
          </span>
          {hasChecked && (
            <span className="text-amber-300 font-mono font-semibold ml-2">
              Score: {correctCount}/9
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check</span>
          </button>
          <button
            onClick={handleAutoSolve}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Solution</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Words Pool */}
      <div className="mb-8">
        <div className="text-xs uppercase font-mono text-gray-400 mb-2">
          Click a word, then click a box below:
        </div>
        <div className="flex flex-wrap gap-2.5 min-h-[60px] p-4 rounded-2xl bg-[#0b0f19] border border-white/10">
          {unassignedWords.length === 0 ? (
            <div className="text-xs text-gray-500 italic py-2">
              All words sorted! Click &quot;Check&quot; to review.
            </div>
          ) : (
            unassignedWords.map((item) => {
              const isSelected = selectedWordId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectWord(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-black font-semibold ring-2 ring-amber-300'
                      : 'bg-[#182032] text-gray-200 hover:bg-[#222d45] border border-white/10'
                  }`}
                >
                  {item.word}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 3 Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Positive */}
        <div
          onClick={() => handlePlaceIn('positive')}
          className="rounded-2xl p-5 bg-[#131109]/90 border border-amber-500/30 flex flex-col justify-between min-h-[220px] cursor-pointer hover:border-amber-400/50 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-amber-500/20">
              <span className="text-base font-bold text-amber-400">Positive</span>
              <span className="text-xs font-mono text-amber-300/80">({positiveWords.length})</span>
            </div>
            <div className="space-y-2">
              {positiveWords.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectWord(item.id);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between cursor-pointer ${
                    hasChecked
                      ? item.targetCategory === 'positive'
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : 'bg-amber-400/10 border-amber-400/20 text-amber-200'
                  }`}
                >
                  <span>{item.word}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-amber-400/60 font-mono text-center pt-3">
            Click to place here
          </div>
        </div>

        {/* Neutral */}
        <div
          onClick={() => handlePlaceIn('neutral')}
          className="rounded-2xl p-5 bg-[#0a111a]/90 border border-sky-500/30 flex flex-col justify-between min-h-[220px] cursor-pointer hover:border-sky-400/50 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-sky-500/20">
              <span className="text-base font-bold text-sky-400">Neutral</span>
              <span className="text-xs font-mono text-sky-300/80">({neutralWords.length})</span>
            </div>
            <div className="space-y-2">
              {neutralWords.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectWord(item.id);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between cursor-pointer ${
                    hasChecked
                      ? item.targetCategory === 'neutral'
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : 'bg-sky-400/10 border-sky-400/20 text-sky-200'
                  }`}
                >
                  <span>{item.word}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-sky-400/60 font-mono text-center pt-3">
            Click to place here
          </div>
        </div>

        {/* Negative */}
        <div
          onClick={() => handlePlaceIn('negative')}
          className="rounded-2xl p-5 bg-[#170a0d]/90 border border-rose-500/30 flex flex-col justify-between min-h-[220px] cursor-pointer hover:border-rose-400/50 transition-colors"
        >
          <div>
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-rose-500/20">
              <span className="text-base font-bold text-rose-400">Negative</span>
              <span className="text-xs font-mono text-rose-300/80">({negativeWords.length})</span>
            </div>
            <div className="space-y-2">
              {negativeWords.map((item) => (
                <div
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectWord(item.id);
                  }}
                  className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between cursor-pointer ${
                    hasChecked
                      ? item.targetCategory === 'negative'
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                      : 'bg-rose-500/10 border-rose-500/20 text-rose-200'
                  }`}
                >
                  <span>{item.word}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-rose-400/60 font-mono text-center pt-3">
            Click to place here
          </div>
        </div>
      </div>
    </section>
  );
};
