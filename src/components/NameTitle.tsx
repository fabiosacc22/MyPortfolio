import React, { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Effetto "decrypt": i caratteri ruotano tra simboli casuali e si fissano da sinistra a destra
const useScramble = (target: string, active: boolean, duration: number, replayKey: number, onDone?: () => void) => {
  const [text, setText] = useState('');
  const onDoneRef = useRef(onDone);

  useEffect(() => {
    onDoneRef.current = onDone;
  });

  useEffect(() => {
    if (!active) return;
    const total = prefersReducedMotion() ? 0 : duration;
    const chars = [...target];
    const locks = chars.map((_, i) => (i / chars.length) * total * 0.75 + Math.random() * total * 0.25);
    const start = performance.now();
    let last = 0;
    let raf = 0;

    const frame = (now: number) => {
      const elapsed = now - start;
      if (elapsed >= total) {
        setText(target);
        onDoneRef.current?.();
        return;
      }
      if (now - last > 35) {
        last = now;
        setText(
          chars
            .map((ch, i) => (ch === ' ' || elapsed >= locks[i] ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join('')
        );
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, replayKey]);

  return text;
};

const Word: React.FC<{ text: string; glitch: boolean; className?: string }> = ({ text, glitch, className }) => (
  <span className={`glitch-word ${glitch ? 'is-glitching' : ''}`} data-text={text}>
    <span className={className}>{text}</span>
  </span>
);

interface NameTitleProps {
  part1: string;
  part2: string;
  onRevealed?: () => void;
}

const NameTitle: React.FC<NameTitleProps> = ({ part1, part2, onRevealed }) => {
  const [replayKey, setReplayKey] = useState(0);
  const [part1Done, setPart1Done] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const onRevealedRef = useRef(onRevealed);

  useEffect(() => {
    onRevealedRef.current = onRevealed;
  });

  const text1 = useScramble(part1, true, 1100, replayKey, () => setPart1Done(true));
  const text2 = useScramble(`${part2}.`, part1Done, 800, replayKey, () => {
    setRevealed(true);
    onRevealedRef.current?.();
  });

  // Ogni tanto il nome va in "glitch", come un bug che viene subito risolto
  useEffect(() => {
    if (!revealed || prefersReducedMotion()) return;
    let off: ReturnType<typeof setTimeout>;
    let on: ReturnType<typeof setTimeout>;
    const schedule = () => {
      on = setTimeout(() => {
        setGlitching(true);
        off = setTimeout(() => {
          setGlitching(false);
          schedule();
        }, 380);
      }, 4000 + Math.random() * 4000);
    };
    schedule();
    return () => {
      clearTimeout(on);
      clearTimeout(off);
    };
  }, [revealed]);

  const handleMouseEnter = useCallback(() => {
    if (!revealed) return;
    setRevealed(false);
    setPart1Done(false);
    setReplayKey(k => k + 1);
  }, [revealed]);

  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const el = titleRef.current;
    if (!el || prefersReducedMotion()) return;
    const box = el.getBoundingClientRect();
    const px = (e.clientX - box.left) / box.width - 0.5;
    const py = (e.clientY - box.top) / box.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 12).toFixed(2)}deg)`;
    el.dataset.hover = 'true';
    el.querySelectorAll<HTMLElement>('.name-fx').forEach(fx => {
      const r = fx.getBoundingClientRect();
      fx.style.setProperty('--mx', `${e.clientX - r.left}px`);
      fx.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  };

  const handleMouseLeave = () => {
    const el = titleRef.current;
    if (!el) return;
    el.style.transform = '';
    delete el.dataset.hover;
  };

  return (
    <h1
      ref={titleRef}
      aria-label={`${part1} ${part2}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="name-title text-4xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 uppercase cursor-default select-none transition-transform duration-200 ease-out"
    >
      <span aria-hidden="true">
        <Word text={text1} glitch={glitching} className="name-fx" />
        <br />
        {text2 && (
          <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 text-white dark:text-black px-5 py-1 inline-block mt-2 rounded-xl shadow-xl">
            <Word text={text2} glitch={glitching} />
          </span>
        )}
      </span>
    </h1>
  );
};

export default NameTitle;
