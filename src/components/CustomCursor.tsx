import type { HoverListener, Position } from '@/lib/const';
import { useEffect, useRef, useState } from 'react';

/**
 * lag: 外圈跟随阻尼，默认 0.08
  0.1	几乎实时跟随
  0.08	轻微延迟
  0.04	明显延迟（推荐）
  0.02	非常慵懒，拖尾感很强
  0.01	像在水里移动
 * @returns 
 */
export const CustomCursor: React.FC<{ lag?: number }> = ({ lag = 0.08 }) => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<Position>({ x: 0, y: 0 });
  const ringPos = useRef<Position>({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = (): void => setIsClicking(true);
    const handleMouseUp = (): void => setIsClicking(false);
    const handleMouseLeave = (): void => setIsVisible(false);
    const handleMouseEnter = (): void => setIsVisible(true);

    // 为可交互元素添加悬停监听
    const interactiveElements: NodeListOf<Element> = document.querySelectorAll(
      'a, button, [data-cursor-hover]',
    );
    const hoverListeners: HoverListener[] = [];

    interactiveElements.forEach((el: Element): void => {
      const enter = (): void => setIsHovering(true);
      const leave = (): void => setIsHovering(false);
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      hoverListeners.push({ el, enter, leave });
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 动画循环
    let animationId: number;
    const animate = (): void => {
      const { x: mouseX, y: mouseY }: Position = mousePos.current;
      const { x: ringX, y: ringY }: Position = ringPos.current;

      // 中心红点实时跟随
      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }

      // 外圈慢速跟随
      // const lag: number = 0.08;
      ringPos.current = {
        x: ringX + (mouseX - ringX) * lag,
        y: ringY + (mouseY - ringY) * lag,
      };

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return (): void => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      hoverListeners.forEach(({ el, enter, leave }: HoverListener): void => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });

      cancelAnimationFrame(animationId);
    };
  }, [lag]);

  // 基础样式类型
  const baseCursorStyle: React.CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.2s',
  };

  const ringStyle: React.CSSProperties = {
    ...baseCursorStyle,
    width: isHovering ? 44 : isClicking ? 34 : 38,
    height: isHovering ? 44 : isClicking ? 34 : 38,
    border: `${isClicking ? 3 : 2}px solid ${
      isHovering ? '#FF7777' : isClicking ? '#FF6666' : '#FF9999'
    }`,
    borderRadius: '50%',
    backgroundColor: isHovering ? 'rgba(255, 153, 153, 0.08)' : 'transparent',
    zIndex: 9998,
    transition:
      'width 0.15s, height 0.15s, border-color 0.15s, border-width 0.15s, background-color 0.15s',
  };

  const dotStyle: React.CSSProperties = {
    ...baseCursorStyle,
    width: isClicking ? 6 : 8,
    height: isClicking ? 6 : 8,
    backgroundColor: '#FF4444',
    borderRadius: '50%',
    zIndex: 9999,
    transition: 'width 0.15s, height 0.15s',
  };

  return (
    <>
      <div ref={ringRef} style={ringStyle} />
      <div ref={dotRef} style={dotStyle} />
    </>
  );
};
