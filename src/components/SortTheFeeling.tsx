import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { CheckCircle2, RotateCcw, HelpCircle, Eye, Sparkles } from 'lucide-react';

export type Category = 'positive' | 'neutral' | 'negative' | 'unassigned';

interface WordItem {
  id: string;
  word: string;
  targetCategory: 'positive' | 'neutral' | 'negative';
  cluster: string;
  explanation: string;
}

const WORDS_DATA: WordItem[] = [
  {
    id: 'w1',
    word: 'determined',
    targetCategory: 'positive',
    cluster: 'Willpower',
    explanation: 'Admirable resolve and perseverance towards a noble goal.',
  },
  {
    id: 'w2',
    word: 'stubborn',
    targetCategory: 'negative',
    cluster: 'Willpower',
    explanation: 'Refusing to yield even when presented with reasonable logic.',
  },
  {
    id: 'w3',
    word: 'pig-headed',
    targetCategory: 'negative',
    cluster: 'Willpower',
    explanation: 'Extremely contemptuous, stupidly rigid, refusing to budge.',
  },
  {
    id: 'w4',
    word: 'curious',
    targetCategory: 'neutral',
    cluster: 'Inquiry',
    explanation: 'Eager to know or learn something without malice or intrusive agenda.',
  },
  {
    id: 'w5',
    word: 'inquisitive',
    targetCategory: 'neutral',
    cluster: 'Inquiry',
    explanation: 'Analytical, questioning, intellectually interested in truth.',
  },
  {
    id: 'w6',
    word: 'nosy',
    targetCategory: 'negative',
    cluster: 'Inquiry',
    explanation: 'Prying into other people’s personal affairs invasively.',
  },
  {
    id: 'w7',
    word: 'confident',
    targetCategory: 'positive',
    cluster: 'Self-Belief',
    explanation: 'Faith in one’s capabilities grounded in quiet assurance.',
  },
  {
    id: 'w8',
    word: 'cocky',
    targetCategory: 'negative',
    cluster: 'Self-Belief',
    explanation: 'Cheeky, boastful overconfidence that irritates observers.',
  },
  {
    id: 'w9',
    word: 'arrogant',
    targetCategory: 'negative',
    cluster: 'Self-Belief',
    explanation: 'An offensive display of superiority and disdain for others.',
  },
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
  const [showKey, setShowKey] = useState(false);

  const handleSelectWord = (id: string) => {
    playPop();
    setSelectedWordId(selectedWordId === id ? null : id);
  };

  const handlePlaceIn = (category: Category) => {
    if (!selectedWordId) return;
    playPop(category === 'positive' ? 520 : category === 'neutral' ? 440 : 360);
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
    setShowKey(false);
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
    setShowKey(true);
  };

  const handleCheck = () => {
    playPop(600);
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
    <section id="sorting-lab" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-amber-400 font-semibold mb-3">
          <span>03</span>
          <span>·</span>
          <span>Interactive Workshop</span>
          <span>·</span>
          <span>Slides 4 & 5</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Sort the <span className="font-serif italic text-amber-300">feeling</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
          Words with near-identical denotations evoke starkly distinct emotional charges. Select each word card and place it into its true emotional category: <span className="text-amber-300">Positive</span>, <span className="text-sky-300">Neutral</span>, or <span className="text-rose-400">Negative</span>.
        </p>
      </div>

      {/* Control bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 liquid-glass rounded-2xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-gray-400">
            Progress:
          </span>
          <span className="text-sm font-mono font-semibold text-white">
            {WORDS_DATA.length - unassignedWords.length} / {WORDS_DATA.length} Sorted
          </span>
          {hasChecked && (
            <span className={`text-xs font-mono px-2 py-0.5 rounded ${correctCount === 9 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
              Score: {correctCount}/9 Correct
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-emerald-500 text-black hover:bg-emerald-400 text-xs font-semibold rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Check Answers</span>
          </button>
          <button
            onClick={handleAutoSolve}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span>Slide 5 Key</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition-all cursor-pointer"
            title="Reset cards"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Unassigned Cards Pool (Sticky Note Style matching Slide 4) */}
      <div className="mb-10">
        <div className="text-xs uppercase tracking-widest text-gray-400 font-mono mb-3 flex items-center justify-between">
          <span>Words waiting to be sorted ({unassignedWords.length}):</span>
          <span className="text-white/40 text-[11px] font-sans">
            {selectedWordId ? 'Now click a category bucket below!' : 'Click a card to select it'}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 min-h-[70px] p-5 rounded-2xl bg-[#0b0f19] border border-white/10">
          {unassignedWords.length === 0 ? (
            <div className="w-full text-center py-4 text-sm text-gray-500 italic">
              All words have been categorized! Click &quot;Check Answers&quot; to test your emotional radar.
            </div>
          ) : (
            unassignedWords.map((item) => {
              const isSelected = selectedWordId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectWord(item.id)}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer shadow-md ${
                    isSelected
                      ? 'bg-white text-black scale-105 ring-4 ring-amber-400/50 font-semibold'
                      : 'bg-[#182032] text-gray-200 hover:bg-[#222d45] hover:text-white border border-white/10'
                  }`}
                >
                  {item.word}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 3 Categories Grid: Positive, Neutral, Negative */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Positive Category (Amber) */}
        <div
          onClick={() => handlePlaceIn('positive')}
          className={`rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between min-h-[300px] cursor-pointer ${
            selectedWordId
              ? 'ring-2 ring-amber-400/40 hover:bg-amber-950/30'
              : ''
          } bg-[#131109]/90 border-amber-500/30 shadow-lg`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-500/20">
              <span className="text-lg font-semibold text-amber-400">Positive</span>
              <span className="text-xs font-mono text-amber-300/80 bg-amber-500/10 px-2 py-0.5 rounded">
                {positiveWords.length} words
              </span>
            </div>

            <div className="space-y-2.5">
              {positiveWords.map((item) => {
                const isCorrect = item.targetCategory === 'positive';
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectWord(item.id);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      hasChecked
                        ? isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-amber-400/10 border-amber-400/25 text-amber-200 hover:bg-amber-400/20'
                    }`}
                  >
                    <span className="font-medium text-sm">{item.word}</span>
                    <span className="text-[10px] uppercase font-mono opacity-60">
                      {item.cluster}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 text-center text-xs text-amber-400/60 font-mono">
            Click here to assign selected card
          </div>
        </div>

        {/* Neutral Category (Slate / Blue) */}
        <div
          onClick={() => handlePlaceIn('neutral')}
          className={`rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between min-h-[300px] cursor-pointer ${
            selectedWordId
              ? 'ring-2 ring-sky-400/40 hover:bg-sky-950/30'
              : ''
          } bg-[#0a111a]/90 border-sky-500/30 shadow-lg`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-sky-500/20">
              <span className="text-lg font-semibold text-sky-400">Neutral</span>
              <span className="text-xs font-mono text-sky-300/80 bg-sky-500/10 px-2 py-0.5 rounded">
                {neutralWords.length} words
              </span>
            </div>

            <div className="space-y-2.5">
              {neutralWords.map((item) => {
                const isCorrect = item.targetCategory === 'neutral';
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectWord(item.id);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      hasChecked
                        ? isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-sky-400/10 border-sky-400/25 text-sky-200 hover:bg-sky-400/20'
                    }`}
                  >
                    <span className="font-medium text-sm">{item.word}</span>
                    <span className="text-[10px] uppercase font-mono opacity-60">
                      {item.cluster}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 text-center text-xs text-sky-400/60 font-mono">
            Click here to assign selected card
          </div>
        </div>

        {/* Negative Category (Red / Crimson) */}
        <div
          onClick={() => handlePlaceIn('negative')}
          className={`rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between min-h-[300px] cursor-pointer ${
            selectedWordId
              ? 'ring-2 ring-rose-400/40 hover:bg-rose-950/30'
              : ''
          } bg-[#170a0d]/90 border-rose-500/30 shadow-lg`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-rose-500/20">
              <span className="text-lg font-semibold text-rose-400">Negative</span>
              <span className="text-xs font-mono text-rose-300/80 bg-rose-500/10 px-2 py-0.5 rounded">
                {negativeWords.length} words
              </span>
            </div>

            <div className="space-y-2.5">
              {negativeWords.map((item) => {
                const isCorrect = item.targetCategory === 'negative';
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectWord(item.id);
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      hasChecked
                        ? isCorrect
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                        : 'bg-rose-500/10 border-rose-500/25 text-rose-200 hover:bg-rose-500/20'
                    }`}
                  >
                    <span className="font-medium text-sm">{item.word}</span>
                    <span className="text-[10px] uppercase font-mono opacity-60">
                      {item.cluster}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 text-center text-xs text-rose-400/60 font-mono">
            Click here to assign selected card
          </div>
        </div>
      </div>

      {/* Linguistic Deep Dive: The 3 Spectrum Triads */}
      <div className="liquid-glass border border-white/10 rounded-2xl p-6 md:p-8 bg-[#0a0d16]/70">
        <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>The Linguistic Spectrum Breakdown (Why they escalate)</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-amber-400 font-semibold block mb-2 text-sm">
              Spectrum 1: Willpower
            </span>
            <p className="mb-2">
              <strong className="text-emerald-400">Determined</strong> (Positive) praises perseverance.
            </p>
            <p className="mb-2">
              <strong className="text-rose-400">Stubborn</strong> (Negative) implies irrational resistance to counsel.
            </p>
            <p>
              <strong className="text-rose-500">Pig-headed</strong> (Severe Negative) adds animalistic, uncivil obstinacy.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-sky-400 font-semibold block mb-2 text-sm">
              Spectrum 2: Inquiry
            </span>
            <p className="mb-2">
              <strong className="text-sky-300">Curious</strong> (Neutral) is natural intellectual wonder.
            </p>
            <p className="mb-2">
              <strong className="text-sky-300">Inquisitive</strong> (Neutral) suggests investigative rigor.
            </p>
            <p>
              <strong className="text-rose-400">Nosy</strong> (Negative) implies invasive, disrespectful meddling.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-rose-400 font-semibold block mb-2 text-sm">
              Spectrum 3: Self-Belief
            </span>
            <p className="mb-2">
              <strong className="text-emerald-400">Confident</strong> (Positive) earns admiration and trust.
            </p>
            <p className="mb-2">
              <strong className="text-amber-400">Cocky</strong> (Negative) projects unearned boastfulness.
            </p>
            <p>
              <strong className="text-rose-500">Arrogant</strong> (Severe Negative) treats everyone else as inferior.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
