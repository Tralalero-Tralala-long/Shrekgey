import React, { useState } from 'react';
import { playPop } from '../utils/audio';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface QAItem {
  id: string;
  question: string;
  answer: string;
}

const QA_LIST: QAItem[] = [
  {
    id: 'q1',
    question: '1. What is the difference between denotation and connotation?',
    answer: 'Denotation is the literal dictionary definition of a word. Connotation is the emotional feeling or cultural association attached to it.',
  },
  {
    id: 'q2',
    question: '2. Rewrite: “She was a skinny girl” to make it warmer.',
    answer: 'Change “skinny” (which connotes malnutrition or frailty) to “slender” (which connotes grace, elegance, and natural beauty).',
  },
  {
    id: 'q3',
    question: '3. Why prefer a strong verb over an adjective + adverb combination?',
    answer: 'Verbs carry action and narrative pace. One precise, muscular verb (e.g. “stormed”) replaces an adverb pile-up (“walked quickly and angrily”), creating a sharper mental image and faster pacing.',
  },
  {
    id: 'q4',
    question: '4. Give an example of a negative word and its positive counterpart.',
    answer: '“Stubborn” (negative) vs “Determined” (positive) | “Cocky” (negative) vs “Confident” (positive) | “Nosy” (negative) vs “Curious” (neutral/positive).',
  },
];

export const AnswerKeyPractice: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['q1']);

  const toggleQA = (id: string) => {
    playPop();
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section id="answer-key" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Answer Key &amp; Practice
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          Consolidate your understanding with the presentation practice questions and answers.
        </p>
      </div>

      {/* Clean Q&A Accordion */}
      <div className="space-y-3 mb-10">
        {QA_LIST.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#0a0f1a]/70 overflow-hidden"
            >
              <button
                onClick={() => toggleQA(item.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              >
                <span className="text-sm sm:text-base font-medium text-white">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-amber-300' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-200 leading-relaxed border-t border-white/10 bg-black/30">
                  <div className="text-amber-300 font-semibold mb-1">Answer:</div>
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* The Cardinal Exam Advice */}
      <div className="p-6 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs sm:text-sm text-amber-200 leading-relaxed">
          <div>
            <strong className="text-white">IGCSE Exam Advice:</strong> Avoid writing <em className="text-rose-300">&ldquo;this creates imagery&rdquo;</em> in your exam responses. All descriptive writing creates imagery.
          </div>
          <div>
            Instead, name the specific word, identify its connotation, and explain the precise effect on the reader:
            <div className="mt-2 p-3 rounded-lg bg-black/40 border border-amber-400/20 font-serif text-white">
              &ldquo;The word &lsquo;<span className="text-pink-300 font-sans font-bold">...</span>&rsquo; connotes <span className="text-sky-300 font-sans font-medium">...</span>, which creates a sense of <span className="text-amber-300 font-sans font-medium">...</span> for the reader.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
