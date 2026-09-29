import React, { useState } from 'react';
import { Card3D } from './Card3D';
import { playSuccessChime, playPop } from '../utils/audio';
import { BookOpen, Gamepad2, Share2, Sparkles } from 'lucide-react';
import { TrademarkModal } from './TrademarkModal';

interface PresentationCreditsProps {
  onOpenDeckView: () => void;
  onOpenQuiz?: () => void;
}

export const PresentationCredits: React.FC<PresentationCreditsProps> = ({
  onOpenDeckView,
  onOpenQuiz,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPhotoOpen, setIsPhotoOpen] = useState(false);

  const handleShare = () => {
    playSuccessChime();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenPhoto = () => {
    playPop(520);
    setIsPhotoOpen(true);
  };

  return (
    <footer id="credits" className="relative py-20 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto border-t border-white/10">
      {/* Clean Credits Card */}
      <Card3D depth={10} className="mb-12">
        <div className="liquid-glass border border-white/20 rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#121929]/90 to-black/90 shadow-2xl text-center space-y-6">
          <div className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
            Presentation Credits
          </div>

          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-serif">
            Shreyas, rian, Sriman
          </h3>

          <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
            The Power of Vocabulary Choice · Grade 10 Cambridge IGCSE English Masterclass
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="?tab=quiz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onOpenQuiz}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Quiz ↗</span>
            </a>

            <button
              onClick={onOpenDeckView}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2 border border-white/10"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Slide Mode</span>
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-medium transition-all cursor-pointer flex items-center gap-2"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </Card3D>

      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4 mb-4">
        <div>
          © 2026 The Power of Vocabulary Choice · Shreyas, rian, Sriman
        </div>
        <div className="flex items-center gap-5">
          <a
            href="?tab=quiz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline"
          >
            English Showdown Quiz
          </a>
          <a href="#concept" className="hover:text-white transition-colors">
            Top
          </a>
        </div>
      </div>

      {/* Clickable Trademark notice that opens photo */}
      <div className="text-center pt-6 border-t border-white/15">
        <button
          onClick={handleOpenPhoto}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400/20 via-amber-300/15 to-amber-500/20 hover:from-amber-400/30 hover:to-amber-500/30 border-2 border-amber-400 text-amber-300 hover:text-amber-200 font-bold text-sm sm:text-base tracking-wide shadow-lg cursor-pointer transition-all hover:scale-105 group"
          title="Click to view Goon Till Noon builders photo"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Trade marked By Goon Till Noon website builders</span>
          <span className="text-xs font-normal text-amber-400/80 underline ml-1">
            (View Photo)
          </span>
        </button>
      </div>

      {/* Picture Modal */}
      <TrademarkModal
        isOpen={isPhotoOpen}
        onClose={() => setIsPhotoOpen(false)}
      />
    </footer>
  );
};
