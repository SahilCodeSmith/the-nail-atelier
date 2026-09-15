const PHRASES = [
  "The Nail Atelier",
  "Luxury nail art",
  "Home visit, by appointment",
  "Hand-finished by Rakshit",
  "Bespoke design",
];

export function MarqueeStrip() {
  const track = [...PHRASES, ...PHRASES];
  return (
    <div className="border-y border-sand bg-porcelain">
      <div className="group relative flex overflow-hidden py-3.5">
        <span className="sr-only">
          The Nail Atelier — luxury nail art, home visits by appointment,
          hand-finished by Rakshit.
        </span>
        <div
          className="flex shrink-0 animate-marquee items-center gap-0 whitespace-nowrap pause-on-hover motion-reduce:animate-none"
          aria-hidden
        >
          {track.map((p, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 font-sans text-[0.75rem] uppercase tracking-[0.2em] text-char/70">
                {p}
              </span>
              <span className="text-champagne">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
