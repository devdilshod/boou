import React, { useState, useEffect } from 'react';

const SHAPE_B = `
  M 22 12 H 74 C 90 12, 99 21, 99 33 C 99 42, 93 49, 84 52
  C 95 55, 102 64, 102 75 C 102 89, 91 98, 75 98 H 23 V 66
  C 23 53, 31 46, 44 46 H 71 C 78 46, 83 41, 83 35.5
  C 83 30, 78 25, 71 25 H 39 V 36 C 28 35, 22 25, 22 12 Z
  M 39 60 V 84 H 73 C 81 84, 86 79, 86 72 C 86 65, 81 60, 73 60 H 39 Z
`;

const SHAPE_OO = `
  M 192 41 C 185 23, 170 12, 151 12 C 127 12, 108 31, 108 55
  C 108 79, 127 98, 151 98 C 173 98, 190 83, 196 63
  C 199 54, 204 49, 213 48 C 217 47, 220 43, 223 36
  C 228 29, 236 26, 245 26 C 261 26, 274 39, 274 55
  C 274 71, 261 84, 245 84 C 232 84, 221 75, 217 62 L 202 68
  C 208 86, 225 98, 245 98 C 269 98, 288 79, 288 55
  C 288 31, 269 12, 245 12 C 224 12, 207 26, 201 46
  C 198 55, 193 60, 184 61 C 179 62, 176 66, 173 73
  C 168 80, 160 84, 151 84 C 135 84, 122 71, 122 55
  C 122 39, 135 26, 151 26 C 164 26, 174 34, 178 46 Z
`;

const SHAPE_U = `
  M 300 12 C 309 12, 316 19, 316 28 V 59
  C 316 74, 326 84, 339 84 C 352 84, 362 74, 362 59 V 28
  C 362 19, 369 12, 378 12 V 60 C 378 82, 361 98, 339 98
  C 317 98, 300 82, 300 60 V 12 Z
`;

const FLOW_B = `
  M 30.5 37
  V 18.5
  H 72
  C 86 18.5, 92 26, 92 35.5
  C 92 45, 85 53, 72 53
  H 39
  C 33 53, 31 57, 31 64
  V 91
  H 74
  C 87 91, 94 83, 94 72
  C 94 61, 87 53, 74 53
`;

const FLOW_OO = `
  M 186 45
  C 181 28, 168 19, 151 19
  C 131 19, 115 35, 115 55
  C 115 75, 131 91, 151 91
  C 169 91, 184 79, 190 61
  C 194 50, 202 49, 207 40
  C 214 27, 228 19, 245 19
  C 265 19, 281 35, 281 55
  C 281 75, 265 91, 245 91
  C 228 91, 214 80, 209 64
`;

const FLOW_U = `
  M 308 11
  V 60
  C 308 78, 321 91, 339 91
  C 357 91, 370 78, 370 60
  V 11
`;

export const Preloader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let animationFrameId;
        const duration = 4500;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const raw = Math.min(elapsed / duration, 1);

            const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
            setProgress(eased * 100);

            if (raw < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setTimeout(() => setIsExiting(true), 350);
                setTimeout(() => {
                    setIsVisible(false);
                    if (onFinish) onFinish();
                }, 1050);
            }
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [onFinish]);

    if (!isVisible) return null;

    const bFill = Math.min(Math.max(progress / 34, 0), 1) * 100;
    const ooFill = Math.min(Math.max((progress - 34) / 48, 0), 1) * 100;
    const uFill = Math.min(Math.max((progress - 82) / 18, 0), 1) * 100;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#140f0c] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
                }`}
        >

            <div className="absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full bg-[#c59b6d]/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center px-6">
                <svg
                    viewBox="0 0 400 115"
                    className="w-[280px] sm:w-[400px] md:w-[460px] h-auto drop-shadow-[0_14px_28px_rgba(0,0,0,0.85)]"
                >
                    <defs>
                        <linearGradient id="boouPipeGold" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f5d69b" />
                            <stop offset="45%" stopColor="#c6934b" />
                            <stop offset="85%" stopColor="#8f6122" />
                            <stop offset="100%" stopColor="#c59249" />
                        </linearGradient>

                        <clipPath id="clipShapeB">
                            <path fillRule="evenodd" d={SHAPE_B} />
                        </clipPath>
                        <clipPath id="clipShapeOO">
                            <path d={SHAPE_OO} />
                        </clipPath>
                        <clipPath id="clipShapeU">
                            <path d={SHAPE_U} />
                        </clipPath>
                    </defs>

                    <g fill="#211914" stroke="#534237" strokeWidth="1.8">
                        <path fillRule="evenodd" d={SHAPE_B} />
                        <path d={SHAPE_OO} />
                        <path d={SHAPE_U} />
                    </g>

                    <g clipPath="url(#clipShapeB)">
                        <path
                            d={FLOW_B}
                            fill="none"
                            stroke="url(#boouPipeGold)"
                            strokeWidth="20"
                            strokeLinecap="butt"
                            strokeLinejoin="miter"
                            strokeMiterlimit="10"
                            pathLength="100"
                            strokeDasharray="100"
                            strokeDashoffset={100 - bFill}
                        />
                        {bFill > 0 && bFill < 100 && (
                            <path
                                d={FLOW_B}
                                fill="none"
                                stroke="#fff8db"
                                strokeWidth="20"
                                pathLength="100"
                                strokeDasharray="6 100"
                                strokeDashoffset={106 - bFill}
                            />
                        )}
                    </g>

                    <g clipPath="url(#clipShapeOO)">
                        <path
                            d={FLOW_OO}
                            fill="none"
                            stroke="url(#boouPipeGold)"
                            strokeWidth="20"
                            strokeLinecap="butt"
                            strokeLinejoin="round"
                            pathLength="100"
                            strokeDasharray="100"
                            strokeDashoffset={100 - ooFill}
                        />
                        {ooFill > 0 && ooFill < 100 && (
                            <path
                                d={FLOW_OO}
                                fill="none"
                                stroke="#fff8db"
                                strokeWidth="20"
                                pathLength="100"
                                strokeDasharray="5 100"
                                strokeDashoffset={105 - ooFill}
                            />
                        )}
                    </g>

                    <g clipPath="url(#clipShapeU)">
                        <path
                            d={FLOW_U}
                            fill="none"
                            stroke="url(#boouPipeGold)"
                            strokeWidth="20"
                            strokeLinecap="butt"
                            strokeLinejoin="round"
                            pathLength="100"
                            strokeDasharray="100"
                            strokeDashoffset={100 - uFill}
                        />
                        {uFill > 0 && uFill < 100 && (
                            <path
                                d={FLOW_U}
                                fill="none"
                                stroke="#fff8db"
                                strokeWidth="20"
                                pathLength="100"
                                strokeDasharray="8 100"
                                strokeDashoffset={108 - uFill}
                            />
                        )}
                    </g>

                    <g fill="none" stroke="#c59b6d" strokeWidth="1" opacity="0.45">
                        <path fillRule="evenodd" d={SHAPE_B} />
                        <path d={SHAPE_OO} />
                        <path d={SHAPE_U} />
                    </g>
                </svg>

                <div className="mt-5 flex flex-col items-center space-y-2">
                    <p className="text-[11px] text-center sm:text-xs font-bold uppercase tracking-[0.35em] text-[#e5be83]/90">
                        <span className='block'>Sanuzel &amp; Santexnika Showroom </span>
                        <span className='block mt-3'>Mit Stroy service 2-pavilion 94-dokon</span>
                    </p>

                    <div className="flex items-center gap-3 w-56 sm:w-72">
                        <div className="flex-1 h-[2px] bg-[#2e231c] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#8c6d57] via-[#e5be83] to-[#fff0c2]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="font-mono text-xs font-bold text-[#e5be83] w-9 text-right">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;