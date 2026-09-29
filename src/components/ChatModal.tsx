import React, { useState } from 'react';
import { X, Send, Sparkles, MessageSquare, Bot, User } from 'lucide-react';
import { playPop, playSuccessChime } from '../utils/audio';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Hello! I am your Vocabulary Choice Masterclass Assistant. Ask me anything about denotation, connotation, semantic fields, or type any sentence you want me to sharpen with stronger verbs!',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    playPop(500);
    const newMessages: Message[] = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMessages);
    if (!customText) setInput('');

    // Instant smart analytical response
    setTimeout(() => {
      playSuccessChime();
      let reply = '';
      const lower = textToSend.toLowerCase();

      if (lower.includes('denotation') && lower.includes('connotation')) {
        reply = 'Denotation is the cold, literal dictionary definition (e.g. "home" = physical dwelling). Connotation is the emotional baggage, cultural resonance, and sensory aura it triggers (e.g. "home" = safety, love, belonging).';
      } else if (lower.includes('shuffled') || lower.includes('strode')) {
        reply = 'In Slide 2, "shuffled" reveals frailty, weariness, and hesitation without telling you the man is tired. In contrast, "strode" conveys purposeful vigor, authority, and energetic stride. One verb replaces three descriptive adjectives!';
      } else if (lower.includes('orwell') || lower.includes('thirteen')) {
        reply = 'George Orwell\'s opening in 1984 ("the clocks were striking thirteen") uses military 24h time and impossible physical clock-strikes to immediately signal a sterile, totalitarian distortion of normal human rhythm.';
      } else if (lower.includes('exam') || lower.includes('sprint') || lower.includes('imagery')) {
        reply = 'Never write "this creates imagery"! Instead use the Slide 11 formula: "The word \'<quote>\' connotes <feeling/association>, which creates a sense of <effect on reader>."';
      } else if (lower.includes('skinny') || lower.includes('slender')) {
        reply = 'Rewriting "skinny" to "slender" switches a negative connotation (malnourished, frail) into a warm, positive one (elegant, graceful, healthy).';
      } else if (lower.includes('rian') || lower.includes('shreyas') || lower.includes('sriman') || lower.includes('abhi')) {
        reply = 'Shreyas, Sriman, and Rian designed this brilliant presentation! And shoutout to Cool Guy Abhi, Shrek, and Srimon from Slide 14! 🍌';
      } else {
        reply = `Analyzing "${textToSend}": To maximize punch, identify any weak verbs paired with adverbs and replace them with a single high-velocity kinetic verb. As shown in Slide 9, precise verbs accelerate narrative pace by up to 300%!`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 400);
  };

  const promptSuggestions = [
    'What is the difference between denotation & connotation?',
    'Why did Orwell choose "striking thirteen"?',
    'How do I replace "walked quickly and angrily"?',
    'Why is "slender" warmer than "skinny"?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#0c121e] rounded-3xl border border-white/20 shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Vocabulary Choice Studio Chat
              </h3>
              <p className="text-[11px] text-gray-400">
                Interactive English Masterclass Tutor
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPop();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message feed */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-amber-400 text-black font-medium rounded-tr-none'
                    : 'bg-white/10 border border-white/10 text-gray-200 rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Prompt Suggestions */}
        <div className="px-6 py-2 border-t border-white/5 flex gap-2 overflow-x-auto bg-black/20">
          {promptSuggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleSend(sug)}
              className="text-[11px] px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10 transition-colors whitespace-nowrap cursor-pointer"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 border-t border-white/10 flex items-center gap-3 bg-black/40"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a word, sentence, or exam technique..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-amber-400 text-black hover:bg-amber-300 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
