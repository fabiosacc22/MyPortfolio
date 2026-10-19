import React, { useEffect, useRef } from 'react';

const INTERACTIVE = 'a, button, [role="option"], [role="button"], summary, label, select';
const TEXT_FIELDS = 'input, textarea';

// Cursore personalizzato: puntino che segue il mouse e anello che lo insegue con un leggero ritardo.
// Si attiva solo con mouse/trackpad (non su touch) e lascia il cursore normale nei campi di testo.
const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('custom-cursor');

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let visible = false;
    let raf = 0;

    const setVisible = (value: boolean) => {
      visible = value;
      dot.style.opacity = ring.style.opacity = value ? '1' : '0';
    };

    const frame = () => {
      const ease = reduced ? 1 : 0.18;
      ringPos.x += (target.x - ringPos.x) * ease;
      ringPos.y += (target.y - ringPos.y) * ease;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        setVisible(true);
      }
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      ring.dataset.hover = el?.closest(INTERACTIVE) ? 'true' : 'false';
      const onText = !!el?.closest(TEXT_FIELDS);
      dot.style.visibility = ring.style.visibility = onText ? 'hidden' : 'visible';
    };
    const onDown = () => { ring.dataset.pressed = 'true'; };
    const onUp = () => { ring.dataset.pressed = 'false'; };
    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
