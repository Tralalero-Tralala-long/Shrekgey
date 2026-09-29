import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playPop, playSuccessChime } from '../utils/audio';
import { Trophy, BookOpen, Share2, Sparkles, ExternalLink, Gamepad2 } from 'lucide-react';

interface PresentationCreditsProps {
  onOpenDeckView: () => void;
  onOpenQuiz?: () => void;
}

export const PresentationCredits: React.FC<PresentationCreditsProps> = ({
  onOpenDeckView,
  onOpenQuiz,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    playSuccessChime();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleQuizClick = (e: React.MouseEvent) => {
    playSuccessChime();
    // Allow standard target="_blank" behavior or custom handler
    if (onOpenQuiz) {
      onOpenQuiz();
    }
  };

  return (
    <footer id="credits" className="relative py-24 px-6 md:px-12 lg:px-16 max-w-7xl mx-auto border-t border-white/10">
      {/* Chapter header */}
      <div className="mb-14 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-3 text-xs tracking-widest uppercase text-amber-400 font-semibold mb-3">
          <span>11</span>
          <span>·</span>
          <span>Credits &amp; Deck View</span>
          <span>·</span>
          <span>Slide 14</span>
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4">
          Masterclass <span className="font-serif italic text-amber-300">Credits</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0">
          The Power of Vocabulary Choice masterclass presentation.
        </p>
      </div>

      {/* Main 3D Credits Card */}
      <Card3D depth={15} className="mb-16">
        <div className="liquid-glass border border-white/20 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-[#121929]/90 via-[#0d121e]/90 to-black/90 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono">
              <Trophy className="w-3.5 h-3.5" />
              <span>Presentation Creators</span>
            </div>

            {/* ONLY Shreyas, rian, Sriman */}
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-serif">
              Shreyas, rian, Sriman
            </h3>

            <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
              Designed and presented as an interactive masterclass on the power of vocabulary choice, denotation, connotation, and semantic fields.
            </p>

            {/* Name Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-sm font-medium">
              <span className="px-5 py-2 rounded-xl bg-white/10 border border-white/15 text-white shadow-sm">
                Shreyas
              </span>
              <span className="px-5 py-2 rounded-xl bg-white/10 border border-white/15 text-white shadow-sm">
                rian
              </span>
              <span className="px-5 py-2 rounded-xl bg-white/10 border border-white/15 text-white shadow-sm">
                Sriman
              </span>
            </div>

            {/* Action buttons: Quiz Button Prominently Featured! */}
            <div className="mt-8 pt-8 border-t border-white/10 w-full flex flex-wrap items-center justify-center gap-4">
              {/* THE REQUESTED "QUIZ" BUTTON: Opens game show quiz in a new tab! */}
              <a
                href="?tab=quiz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleQuizClick}
                className="relative group px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-black font-extrabold text-sm uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(244,63,94,0.6)] hover:scale-105 active:scale-95"
              >
                <Gamepad2 className="w-5 h-5 text-black" />
                <span>Play Live Quiz Showdown</span>
                <span className="px-2 py-0.5 rounded bg-black/20 text-[10px] font-mono tracking-widest text-black/90">
                  NEW TAB ↗
                </span>
              </a>

              <button
                onClick={() => {
                  playPop();
                  onOpenDeckView();
                }}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2 border border-white/15"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Slide Deck Mode</span>
              </button>

              <button
                onClick={handleShare}
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-medium transition-all cursor-pointer flex items-center gap-2 border border-white/10"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share Masterclass'}</span>
              </button>
            </div>
          </div>
        </div>
      </Card3D>

      {/* Footer bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <div>
          © 2026 The Power of Vocabulary Choice · Shreyas, rian, Sriman
        </div>
        <div className="flex items-center gap-6">
          <a
            href="?tab=quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 font-semibold hover:text-amber-300 transition-colors flex items-center gap-1"
          >
            <span>English Showdown Quiz</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span>·</span>
          <a href="#concept" className="hover:text-white transition-colors">
            Back to Top
          </a>
          <span>·</span>
          <a href="#sorting-lab" className="hover:text-white transition-colors">
            Sorting Lab
          </a>
          <span>·</span>
          <a href="#exam-sprint" className="hover:text-white transition-colors">
            Exam Sprint
          </a>
        </div>
      </div>
    </footer>
  );
};
