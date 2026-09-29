import React from 'react';
import { X } from 'lucide-react';

interface TrademarkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrademarkModal: React.FC<TrademarkModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#0c1220] border-2 border-amber-400/60 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col items-center animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full text-center mb-4">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
            Official Builders
          </span>
          <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
            Goon Till Noon website builders
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Shreyas · rian · Sriman
          </p>
        </div>

        <div className="w-full rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black">
          <img
            src="/goon_builders.jpg"
            alt="Goon Till Noon website builders"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover max-h-[70vh] rounded-2xl"
          />
        </div>

        <p className="text-[11px] text-gray-400 mt-4 text-center font-mono">
          Trade marked By Goon Till Noon website builders
        </p>
      </div>
    </div>
  );
};
