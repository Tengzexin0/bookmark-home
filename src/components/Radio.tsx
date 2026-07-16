import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface Stage {
  id: string;
  angle: number;
}

// 6个档位对应的角度和ID映射
const STAGES: Stage[] = [
  { id: 'switch_off', angle: -90 },
  { id: 'switch_1', angle: -30 },
  { id: 'switch_2', angle: 30 },
  { id: 'switch_3', angle: 90 },
  { id: 'switch_4', angle: 150 },
  { id: 'switch_5', angle: 210 }, // 210 度
];

const Radio: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('switch_off');
  // 记录真实的渲染角度（允许它随着拖拽和切换累加，不强行限制在 [-180, 180] 内，从而避免 CSS 动画逆向旋转）
  const [rotation, setRotation] = useState<number>(-90);
  // 控制是否在拖拽中（拖拽中禁用 transition 动画，放手磁吸或点击时启用 transition）
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);

  const knobRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef<boolean>(false);
  // 记录开始拖拽时的初始角度差，防止点击时发生突变跳转
  const startAngleOffset = useRef<number>(0);

  // 计算当前坐标相对于旋钮中心点的角度 (-180 到 180)
  const calculateAngle = (clientX: number, clientY: number): number => {
    if (!knobRef.current) return 0;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  // 鼠标/触摸按下
  const handleStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    isDragging.current = true;
    setIsDraggingState(true);

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const currentAngle = calculateAngle(clientX, clientY);
    // 记录鼠标相对于当前旋钮渲染角度的偏差
    startAngleOffset.current = currentAngle - rotation;
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      if (e.cancelable) e.preventDefault();

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const currentAngle = calculateAngle(clientX, clientY);
      const targetAngle = currentAngle - startAngleOffset.current;

      // 为了防止拖拽无限累加圈数或边界突变：
      // 我们寻找在 -180 到 180 映射下连续不突变的角度
      const diff = targetAngle - rotation;
      let normalizedDiff = ((diff + 180) % 360) - 180;
      if (normalizedDiff < -180) normalizedDiff += 360;

      setRotation((prev) => prev + normalizedDiff);
    };

    const handleEnd = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setIsDraggingState(false);

      // --- 放手时执行“磁吸”逻辑 ---
      setRotation((prevRotation) => {
        // 1. 将当前的累计旋转角度规范化到一个 360 度周期内，以便与 STAGES 静态角度比对
        let currentNormalized = prevRotation % 360;
        if (currentNormalized < 0) currentNormalized += 360; // 保证在 [0, 360) 之间

        let closestStage = STAGES[0];
        let minDiff = Infinity;

        STAGES.forEach((stage) => {
          // 将静态配置的角度也规范化到 [0, 360)
          let stageNorm = stage.angle % 360;
          if (stageNorm < 0) stageNorm += 360;

          let diff = Math.abs(stageNorm - currentNormalized);
          if (diff > 180) {
            diff = 360 - diff;
          }
          if (diff < minDiff) {
            minDiff = diff;
            closestStage = stage;
          }
        });

        // 2. 找到最近的档位后，不要直接用它的静态 angle。
        // 而是计算出当前真实 rotation 距离目标最近对应角度的【最短夹角差】
        let targetNorm = closestStage.angle % 360;
        if (targetNorm < 0) targetNorm += 360;

        const diff = targetNorm - currentNormalized;
        // 转化为最短路径偏移量 (-180 到 180 之间)
        let shortestDiff = ((diff + 180) % 360) - 180;
        if (shortestDiff < -180) shortestDiff += 360;

        // 3. 更新 UI 选中态
        setActiveId(closestStage.id);

        // 4. 将最短夹角加到当前的累加角度上，这样 CSS 动画永远只偏转最小距离，绝不转圈！
        return prevRotation + shortestDiff;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [rotation]);

  // 点击刻度文字时切换：同样计算最短动画路径
  const handleLabelClick = (id: string, targetAngle: number) => {
    setIsDraggingState(false); // 启动过渡动画
    setActiveId(id);

    setRotation((prevRotation) => {
      let currentNormalized = prevRotation % 360;
      if (currentNormalized < 0) currentNormalized += 360;

      let targetNorm = targetAngle % 360;
      if (targetNorm < 0) targetNorm += 360;

      const diff = targetNorm - currentNormalized;
      let shortestDiff = ((diff + 180) % 360) - 180;
      if (shortestDiff < -180) shortestDiff += 360;

      return prevRotation + shortestDiff;
    });
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div
          className="de"
          ref={knobRef}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          style={{ cursor: isDraggingState ? 'grabbing' : 'grab' }}
        >
          <div className="den">
            <hr className="line" />
            <hr className="line" />
            <hr className="line" />
            <div className="switch">
              {STAGES.map((stage, idx) => (
                <label
                  key={stage.id}
                  htmlFor={stage.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLabelClick(stage.id, stage.angle);
                  }}
                >
                  <span>{idx === 0 ? 'OFF' : idx}</span>
                </label>
              ))}

              {STAGES.map((stage) => (
                <input
                  key={stage.id}
                  type="radio"
                  checked={activeId === stage.id}
                  onChange={() => {}}
                  name="switch"
                  id={stage.id}
                />
              ))}

              {/* 旋转角度直接应用累加后的真实 rotation 值 */}
              <div
                className="light"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isDraggingState
                    ? 'none'
                    : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <span />
              </div>

              <div
                className="dot"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isDraggingState
                    ? 'none'
                    : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                <span
                  style={{
                    transform: `rotate(${-rotation}deg)`,
                    transition: isDraggingState ? 'none' : 'transform 0.3s',
                  }}
                />
              </div>

              <div className="dene">
                <div className="denem">
                  <div className="deneme" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container .origin {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 111;
    width: 2px;
    height: 2px;
    margin: -1px 0 0 -1px;
    background-color: #f50;
  }

  .de {
    user-select: none;
    position: relative;
    width: 230px;
    height: 230px;
    border-radius: 100%;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
    background-color: transparent;
  }

  .de .den,
  .de .dene,
  .de .denem,
  .de .deneme,
  .de .light,
  .de .dot {
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .den {
    position: relative;
    width: 220px;
    height: 220px;
    margin: -110px 0 0 -110px;
    border-radius: 100%;
    box-shadow:
      inset 0 3px 10px rgba(0, 0, 0, 0.6),
      0 2px 20px rgba(255, 255, 255, 1);
    background: #888888;
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      #888888 0%,
      #333333 100%
    );
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, #888888),
      color-stop(100%, #333333)
    );
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      #888888 0%,
      #333333 100%
    );
    background: -o-radial-gradient(
      center,
      ellipse cover,
      #888888 0%,
      #333333 100%
    );
  }

  .dene {
    z-index: 4;
    width: 140px;
    height: 140px;
    margin: -70px 0 0 -70px;
    border-radius: 100%;
    box-shadow:
      inset 0 2px 2px rgba(255, 255, 255, 0.4),
      0 3px 13px rgba(0, 0, 0, 0.85);
    background: #f2f6f5;
    background: -moz-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #f2f6f5),
      color-stop(100%, #cbd5d6)
    );
    background: -webkit-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    background: -o-linear-gradient(top, #f2f6f5 0%, #cbd5d6 100%);
    pointer-events: none;
  }

  .denem {
    width: 120px;
    height: 120px;
    margin: -60px 0 0 -60px;
    border-radius: 100%;
    background: #cbd5d6;
    background: -moz-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #cbd5d6),
      color-stop(100%, #f2f6f5)
    );
    background: -webkit-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
    background: -o-linear-gradient(top, #cbd5d6 0%, #f2f6f5 100%);
  }

  .deneme {
    width: 100px;
    height: 100px;
    margin: -50px 0 0 -50px;
    border-radius: 100%;
    box-shadow:
      inset 0 2px 3px rgba(255, 255, 255, 0.6),
      0 8px 20px rgba(0, 0, 0, 0.9);
    background: #eef7f6;
    background: -moz-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #eef7f6),
      color-stop(100%, #8d989a)
    );
    background: -webkit-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
    background: -o-linear-gradient(top, #eef7f6 0%, #8d989a 100%);
  }

  .den .switch {
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .den .switch label {
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 70px;
    margin-top: -35px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
  }

  .den .switch label:after {
    content: '';
    position: absolute;
    top: 6px;
    left: 1px;
    width: 100%;
    height: 30px;
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:before {
    content: '';
    position: absolute;
    bottom: 6px;
    left: 1px;
    width: 100%;
    height: 30px;
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label span {
    z-index: 2;
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-weight: bold;
    font-size: 15px;
    line-height: 70px;
    text-align: center;
    color: #eee;
    text-shadow: 0 1px 0 #444;
    cursor: pointer;
  }

  .den .switch label:nth-child(1) {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den .switch label:nth-child(1) span {
    right: 2px;
    font-size: 13px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den .switch label:nth-child(2) {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:nth-child(2) span {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label:nth-child(3) {
    transform: rotate(30deg);
    -webkit-transform: rotate(30deg);
    -o-transform: rotate(30deg);
  }

  .den .switch label:nth-child(3) span {
    transform: rotate(-30deg);
    -webkit-transform: rotate(-30deg);
    -o-transform: rotate(-30deg);
  }

  .den .switch label:nth-child(4) {
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
    -o-transform: rotate(90deg);
  }

  .den .switch label:nth-child(4) span {
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    -o-transform: rotate(-90deg);
  }

  .den .switch label:nth-child(5) {
    transform: rotate(150deg);
    -webkit-transform: rotate(150deg);
    -o-transform: rotate(150deg);
  }

  .den .switch label:nth-child(5) span {
    transform: rotate(-150deg);
    -webkit-transform: rotate(-150deg);
    -o-transform: rotate(-150deg);
  }

  .den .switch label:nth-child(6) {
    transform: rotate(210deg);
    -webkit-transform: rotate(210deg);
    -o-transform: rotate(210deg);
  }

  .den .switch label:nth-child(6) span {
    transform: rotate(-210deg);
    -webkit-transform: rotate(-210deg);
    -o-transform: rotate(-210deg);
  }

  .den .switch input {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  /* SWITCH LIGHT */

  .den .light {
    z-index: 1;
    width: 50%;
    height: 100px;
    margin-top: -50px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    pointer-events: none;
  }

  .den .light span {
    opacity: 0.4;
    position: absolute;
    top: 0;
    left: 15px;
    width: 100px;
    height: 100px;
    background: -moz-radial-gradient(
      center,
      ellipse cover,
      rgba(184, 163, 204, 1) 0%,
      rgba(159, 197, 224, 0.42) 42%,
      rgba(111, 113, 179, 0) 72%,
      rgba(67, 34, 137, 0) 100%
    );
    background: -webkit-gradient(
      radial,
      center center,
      0px,
      center center,
      100%,
      color-stop(0%, rgba(184, 163, 204, 1)),
      color-stop(42%, rgba(159, 197, 224, 0.42)),
      color-stop(72%, rgba(111, 113, 179, 0)),
      color-stop(100%, rgba(67, 34, 137, 0))
    );
    background: -webkit-radial-gradient(
      center,
      ellipse cover,
      rgba(184, 163, 204, 1) 0%,
      rgba(159, 197, 224, 0.42) 42%,
      rgba(111, 113, 179, 0) 72%,
      rgba(67, 34, 137, 0) 100%
    );
    background: -o-radial-gradient(
      center,
      ellipse cover,
      rgba(184, 163, 204, 1) 0%,
      rgba(159, 197, 224, 0.42) 42%,
      rgba(111, 113, 179, 0) 72%,
      rgba(67, 34, 137, 0) 100%
    );
  }

  /* SWITCH LIGHT */

  .den .dot {
    z-index: 6;
    width: 50%;
    height: 12px;
    margin-top: -6px;
    transform-origin: 0% 50%;
    -webkit-transform-origin: 0% 50%;
    -o-transform-origin: 0% 50%;
    pointer-events: none;
  }

  .den .dot span {
    position: absolute;
    top: 0;
    left: 30px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background: #dae2e4;
    background: -moz-linear-gradient(top, #dae2e4 0%, #ecf5f4 100%);
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(0%, #dae2e4),
      color-stop(100%, #ecf5f4)
    );
    background: -webkit-linear-gradient(top, #dae2e4 0%, #ecf5f4 100%);
    background: -o-linear-gradient(top, #dae2e4 0%, #ecf5f4 100%);
  }

  /* LINE */

  .den hr.line {
    z-index: 1;
    position: absolute;
    top: 50%;
    width: 100%;
    height: 0;
    margin-top: -1px;
    border-width: 1px 0;
    border-style: solid;
    border-top-color: #3c3d3f;
    border-bottom-color: #666769;
  }

  .den hr.line:nth-child(1) {
    transform: rotate(-60deg);
    -webkit-transform: rotate(-60deg);
    -o-transform: rotate(-60deg);
  }

  .den hr.line:nth-child(2) {
    transform: rotate(60deg);
    -webkit-transform: rotate(60deg);
    -o-transform: rotate(60deg);
  }
`;

export default Radio;
