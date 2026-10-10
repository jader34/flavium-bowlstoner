import React, { useState } from 'react';

interface CoatOfArmsProps {
  className?: string;
  size?: number;
  interactive?: boolean;
}

export const CoatOfArms: React.FC<CoatOfArmsProps> = ({
  className = '',
  size = 120,
  interactive = true,
}) => {
  const [isInvestigated, setIsInvestigated] = useState(false);

  const toggle = () => {
    if (interactive) {
      setIsInvestigated(!isInvestigated);
    }
  };

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`relative inline-block select-none transition-transform duration-150 cursor-pointer active:scale-95 touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C1C13] rounded-[2px] ${className}`}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
      title={interactive ? "Toque para alternar o status heráldico / auditoria" : "Brasão da Casa Bowlstoner"}
      aria-label="Brasão Heráldico da Casa Bowlstoner. Toque para alternar auditoria."
    >
      <svg
        width={size}
        height={size * 1.15}
        viewBox="0 0 200 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm filter"
      >
        {/* Shield background */}
        <path
          d="M100 8 L175 35 V125 C175 175 100 215 100 215 C100 215 25 175 25 125 V35 Z"
          fill="#14110E"
          stroke="#C8A24A"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner shield border */}
        <path
          d="M100 16 L167 40 V122 C167 167 100 203 100 203 C100 203 33 167 33 122 V40 Z"
          fill="#1C1814"
          stroke="#C8A24A"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />

        {/* Heraldic Crown at crest */}
        <path
          d="M75 32 L82 18 L100 28 L118 18 L125 32 Z"
          fill="#C8A24A"
          stroke="#14110E"
          strokeWidth="1.5"
        />
        <circle cx="82" cy="16" r="2.5" fill="#8C1C13" />
        <circle cx="100" cy="25" r="2.5" fill="#8C1C13" />
        <circle cx="118" cy="16" r="2.5" fill="#8C1C13" />

        {/* Stylized Geometric Golden Eagle */}
        <g stroke="#C8A24A" strokeWidth="2.2" strokeLinejoin="miter" strokeLinecap="square">
          {/* Eagle Head & Beak */}
          <path
            d="M93 54 L100 44 L109 44 L114 50 L108 55 L100 55 Z"
            fill="#C8A24A"
          />
          {/* Beak profile */}
          <path
            d="M109 46 L120 49 L112 53"
            fill="#C8A24A"
            stroke="#C8A24A"
          />
          {/* Eye */}
          <circle cx="105" cy="49" r="1.5" fill="#14110E" stroke="none" />

          {/* Eagle Neck & Breast */}
          <path
            d="M92 56 L100 55 L108 56 L112 70 L100 80 L88 70 Z"
            fill="#C8A24A"
            opacity="0.9"
          />

          {/* Left Wing (Geometric Feathers) */}
          <path
            d="M88 64 L50 56 L42 74 L84 82"
            fill="#C8A24A"
            opacity="0.95"
          />
          <path
            d="M84 82 L42 78 L38 98 L84 100"
            fill="#C8A24A"
            opacity="0.9"
          />
          <path
            d="M84 100 L44 106 L48 126 L88 116"
            fill="#C8A24A"
            opacity="0.85"
          />
          <path
            d="M88 116 L56 130 L64 146 L92 128"
            fill="#C8A24A"
            opacity="0.8"
          />

          {/* Right Wing (Geometric Feathers) */}
          <path
            d="M112 64 L150 56 L158 74 L116 82"
            fill="#C8A24A"
            opacity="0.95"
          />
          <path
            d="M116 82 L158 78 L162 98 L116 100"
            fill="#C8A24A"
            opacity="0.9"
          />
          <path
            d="M116 100 L156 106 L152 126 L112 116"
            fill="#C8A24A"
            opacity="0.85"
          />
          <path
            d="M112 116 L144 130 L136 146 L108 128"
            fill="#C8A24A"
            opacity="0.8"
          />

          {/* Eagle Tail (Fanned geometry) */}
          <path
            d="M92 128 L86 166 L100 178 L114 166 L108 128 Z"
            fill="#C8A24A"
            opacity="0.95"
          />
          <line x1="100" y1="130" x2="100" y2="175" stroke="#14110E" strokeWidth="1.5" />
          <line x1="93" y1="135" x2="90" y2="164" stroke="#14110E" strokeWidth="1.2" />
          <line x1="107" y1="135" x2="110" y2="164" stroke="#14110E" strokeWidth="1.2" />

          {/* Talons grasping laurel / swords */}
          <path
            d="M84 132 L78 144 L88 144 Z"
            fill="#8C1C13"
            stroke="#C8A24A"
          />
          <path
            d="M116 132 L122 144 L112 144 Z"
            fill="#8C1C13"
            stroke="#C8A24A"
          />
        </g>

        {/* Heraldic motto ribbon at base of shield */}
        <path
          d="M45 190 Q100 205 155 190 L150 200 Q100 216 50 200 Z"
          fill="#8C1C13"
          stroke="#C8A24A"
          strokeWidth="1.2"
        />

        {/* Audit / Stamp Overlay (when clicked or investigated) */}
        {isInvestigated && (
          <g transform="rotate(-14 100 115)">
            <rect
              x="20"
              y="94"
              width="160"
              height="38"
              rx="2"
              fill="#8C1C13"
              fillOpacity="0.9"
              stroke="#EDE4D3"
              strokeWidth="2.5"
              strokeDasharray="6 3"
            />
            <text
              x="100"
              y="118"
              textAnchor="middle"
              fill="#EDE4D3"
              fontSize="12.5"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="bold"
              letterSpacing="2"
            >
              EM INVESTIGAÇÃO
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
