import React from 'react';
import { Card3D } from './Card3D';

export const ThreeAttitudes: React.FC = () => {
  const attitudes = [
    {
      phrase: '“passed away”',
      label: 'Soft',
      border: 'border-pink-300/30',
      textColor: 'text-pink-200',
      bgColor: 'bg-pink-950/30',
      note: 'Euphemistic and comforting. Cushions emotional impact; often used in obituaries and personal condolences.',
    },
    {
      phrase: '“kicked the bucket”',
      label: 'Flippant',
      border: 'border-amber-400/40',
      textColor: 'text-amber-200',
      bgColor: 'bg-amber-950/30',
      note: 'Casual, informal, or humorous. Trivialize death or displays emotional detachment.',
    },
    {
      phrase: '“WAS KILLED”',
      label: 'Blunt',
      border: 'border-red-500/50',
      textColor: 'text-red-400',
      bgColor: 'bg-red-950/40',
      note: 'Direct, harsh, and shocking. Emphasizes violent agency, sudden tragedy, or injustice.',
    },
  ];

  return (
    <section id="attitudes" className="relative py-16 px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
      {/* Clean Main Header */}
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3 font-serif">
          Same Death. Three Attitudes.
        </h2>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl leading-relaxed">
          The biological fact is identical. The chosen phrase determines whether the reader feels sympathy, humor, or horror.
        </p>
      </div>

      {/* 3 Pop-Out Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {attitudes.map((item) => (
          <Card3D key={item.phrase} depth={12}>
            <div className={`p-7 rounded-2xl border ${item.border} ${item.bgColor} h-full flex flex-col justify-between shadow-lg`}>
              <div>
                <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-4 font-semibold">
                  Tone: <span className={item.textColor}>{item.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-4 ${item.textColor}`}>
                  {item.phrase}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pt-4 border-t border-white/10">
                {item.note}
              </p>
            </div>
          </Card3D>
        ))}
      </div>
    </section>
  );
};
