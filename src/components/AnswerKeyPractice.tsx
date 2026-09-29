import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { CheckCircle2, ChevronDown, Sparkles, HelpCircle, BookOpen, AlertCircle } from 'lucide-react';

interface QAItem {
  id: string;
  question: string;
  answer: string;
  subtext: string;
  tag: string;
}

const QA_LIST: QAItem[] = [
  {
    id: 'q1',
    question: '1. What is the difference between denotation and connotation?',
    answer: 'Denotation is the literal dictionary meaning. Connotation is the associated feeling and cultural baggage.',
    subtext: 'Denotation is objective and standardized; connotation is visceral, psychological, and subjective.',
    tag: 'Fundamental Definition',
  },
  {
    id: 'q2',
    question: '2. Rewrite: “She was a skinny girl” to make it warmer.',
    answer: 'skinny → slender (or lithe / graceful)',
    subtext: '“Skinny” carries associations of malnutrition, frailty, and bony sharpness. “Slender” carries associations of elegance, poise, and gentle health.',
    tag: 'Tonal Revision',
  },
  {
    id: 'q3',
    question: '3. Why prefer a strong verb over an adjective + adverb pile-up?',
    answer: 'Verbs carry action and pace, so one strong verb replaces an adjective plus adverb.',
    subtext: 'Weak writers rely on adverbs (“walked quickly and angrily”) to prop up flabby verbs. One robust verb (“stormed off”) accelerates reading pace and stamps a crystal-clear image.',
    tag: 'Kinetic Economy',
  },
  {
    id: 'q4',
    question: '4. Give one word from today with a negative connotation and its positive counterpart.',
    answer: '“Stubborn” (Negative) → “Determined” (Positive) | “Cocky” (Negative) → “Confident” (Positive) | “Nosy” (Negative) → “Curious” (Neutral/Positive)',
    subtext: 'Both describe the same human trait, but vocabulary choice determines whether the reader admires or disdains the subject.',
    tag: 'Vocabulary Pairs',
  },
];

export const AnswerKeyPractice: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['q1', 'q2']);

  const toggleQA = (id: string) => {
    playPop();
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleRevealAll = () => {
    playSuccessChime();
    setOpenIds(QA_LIST.map((q) => q.id));
  };

  return (
    <section id="answer-key" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto">
      {/* Chapter header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-emerald-400 font-semibold mb-3">
          <span>10</span>
          <span>·</span>
          <span>Mastery &amp; Assessment</span>
          <span>·</span>
          <span>Slides 12 &amp; 13</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
              Answer Key &amp; <span className="font-serif italic text-emerald-300">Practice Deck</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              Consolidate your mastery with the official presentation answer key and exam guidelines.
            </p>
          </div>

          <button
            onClick={handleRevealAll}
            className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap self-start md:self-end"
          >
            Reveal All Solutions
          </button>
        </div>
      </div>

      {/* Accordion / Flashcard Grid */}
      <div className="space-y-4 mb-14">
        {QA_LIST.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? 'bg-[#0f1726]/80 border-emerald-500/40 shadow-xl'
                  : 'bg-[#0a0f1a]/60 border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleQA(item.id)}
                className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                    isOpen ? 'bg-emerald-400 text-black' : 'bg-white/10 text-gray-400'
                  }`}>
                    {item.id.toUpperCase()}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/80 block mb-1">
                      {item.tag}
                    </span>
                    <h4 className="text-base sm:text-lg font-semibold text-white">
                      {item.question}
                    </h4>
                  </div>
                </div>

                <div className={`p-2 rounded-lg bg-white/5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-300' : ''
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-2 border-t border-white/10 space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-100 font-serif text-lg leading-relaxed">
                    <strong>Official Answer:</strong> {item.answer}
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed px-1">
                    {item.subtext}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* The Cardinal Exam Rule Banner (Slide 13 Pro-Tip) */}
      <div className="liquid-glass border border-amber-400/30 rounded-3xl p-8 bg-gradient-to-r from-amber-950/40 via-[#0d1424] to-black/80 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-300 shrink-0 mt-1">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              The Cardinal Rule of Literary Analysis (Slide 13)
            </span>
            <h3 className="text-2xl font-serif text-white">
              Banish the Phrase: &ldquo;This creates imagery for the reader.&rdquo;
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              In exams, writing &ldquo;this creates imagery&rdquo; scores zero analysis marks because virtually all descriptions create imagery. You must name the <strong className="text-pink-300">exact quoted word</strong>, articulate its <strong className="text-sky-300">precise connotation</strong>, and prove its <strong className="text-amber-300">psychological effect</strong> on the reader.
            </p>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-serif italic text-white/90 text-sm md:text-base">
              &ldquo;The word <span className="text-pink-300 font-bold">&lsquo;___&rsquo;</span> connotes <span className="text-sky-300 font-bold">___</span>, which creates a sense of <span className="text-amber-300 font-bold">___</span> for the reader.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
