import React from 'react';
import { AnimatedHeading } from './AnimatedHeading';
import { FadeIn } from './FadeIn';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onStartChat: () => void;
  onExploreTopic?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartChat,
  onExploreTopic,
}) => {
  // Exact Orbit space background artwork video
  const spaceVideoUrl =
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/4b73c700-3112-4c07-bd48-0af2893dff7c.mp4';
  const spacePoster =
    'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0bf7409c-9fa2-4bef-a49d-34903dcc91ad.png';

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none">
      {/* Background Video: Full-screen background video, absolutely positioned, covering the entire viewport (object-cover) */}
      {/* Autoplay, loop, muted, playsInline */}
      {/* NO dark overlay, NO gradient overlay, NO semi-transparent layer on top of the hero video. The video plays raw with no dimming whatsoever. */}
      <video
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src={spaceVideoUrl}
        poster={spacePoster}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Navbar: Wrapped in horizontal page padding: px-6 md:px-12 lg:px-16 with pt-6 top padding */}
      <header className="w-full px-6 md:px-12 lg:px-16 pt-6 z-20">
        {/* The navbar bar itself uses the .liquid-glass class and has rounded-xl, px-4 py-2, flex layout with items-center justify-between */}
        <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
          {/* Left: Logo text "VEX" - text-2xl font-semibold tracking-tight */}
          <span
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-2xl font-semibold tracking-tight text-white cursor-pointer select-none"
          >
            VEX
          </span>

          {/* Center (hidden on mobile, visible md+): Links "Story", "Investing", "Building", "Advisory" - text-sm, gap-8, hover transitions to gray-300 */}
          <div className="hidden md:flex items-center gap-8 text-sm text-white">
            <a
              href="#concept"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Story
            </a>
            <a
              href="#sorting-lab"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Investing
            </a>
            <a
              href="#semantic-fields"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Building
            </a>
            <a
              href="#exam-sprint"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Advisory
            </a>
            <button
              onClick={onExploreTopic}
              className="text-amber-300 hover:text-amber-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Masterclass Deck ↓
            </button>
          </div>

          {/* Right: "Start a Chat" button - bg-white text-black px-6 py-2 rounded-lg text-sm font-medium, hover to gray-100 */}
          <button
            onClick={onStartChat}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 cursor-pointer whitespace-nowrap shadow-sm"
          >
            Start a Chat
          </button>
        </nav>
      </header>

      {/* Hero Content (Bottom of viewport): */}
      {/* Container: same horizontal padding as navbar, flex column filling remaining height, content pushed to bottom with flex-1 flex flex-col justify-end, bottom padding pb-12 lg:pb-16 */}
      <div className="px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 z-10 pointer-events-auto">
        {/* On large screens: 2-column grid (lg:grid lg:grid-cols-2 lg:items-end) */}
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-8">
          {/* Left Column - Main content: */}
          <div>
            {/* Heading: "Shaping tomorrow\nwith vision and action." (literal line break between "tomorrow" and "with") */}
            {/* Responsive sizes: text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal, mb-4 */}
            {/* Inline style: letterSpacing: '-0.04em' */}
            {/* Character-by-character entrance animation */}
            <AnimatedHeading
              text={'Shaping tomorrow\nwith vision and action.'}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
              charDelay={30}
              initialDelay={200}
              duration={500}
            />

            {/* Subheading: "We back visionaries and craft ventures that define what comes next." */}
            {/* text-base md:text-lg text-gray-300 mb-5 */}
            {/* Fade-in animation: starts at 800ms delay, 1000ms duration */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            {/* Buttons row: flex-wrap with gap-4 */}
            {/* Fade-in animation: starts at 1200ms delay, 1000ms duration */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                {/* "Start a Chat" - bg-white text-black px-8 py-3 rounded-lg font-medium */}
                <button
                  onClick={onStartChat}
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 cursor-pointer shadow-md"
                >
                  Start a Chat
                </button>

                {/* "Explore Now" - liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium, hover transitions to white bg + black text */}
                <button
                  onClick={onExploreTopic}
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer flex items-center gap-2 group"
                >
                  <span>Explore Now</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Tag: */}
          {/* Aligned to bottom-right on large screens (flex items-end justify-start lg:justify-end) */}
          <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
            {/* Fade-in animation: starts at 1400ms delay, 1000ms duration */}
            <FadeIn delay={1400} duration={1000}>
              {/* Glass card: liquid-glass border border-white/20 px-6 py-3 rounded-xl */}
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                {/* Text: "Investing. Building. Advisory." - text-lg md:text-xl lg:text-2xl font-light */}
                <p className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll invitation prompt */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Scroll down or click &ldquo;Explore Now&rdquo; to experience the interactive masterclass</span>
          </div>
          <button
            onClick={onExploreTopic}
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>Features &amp; Slides</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
