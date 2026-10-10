import React from 'react';

interface WaxSealProps {
  inscription: string;
  subtext?: string;
  className?: string;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  inscription,
  subtext,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center text-center select-none ${className}`}>
      <div className="relative group cursor-pointer transition-transform duration-200 hover:scale-105">
        <svg
          width="130"
          height="130"
          viewBox="0 0 140 140"
          className="filter drop-shadow-md"
          role="img"
          aria-label={inscription}
        >
          {/* Organic Wax drip / edge */}
          <path
            d="M70,8 
               C85,7 98,13 110,24 
               C122,35 132,49 133,65 
               C134,82 125,99 114,112 
               C103,125 87,133 70,132 
               C53,131 38,124 26,111 
               C14,98 6,81 8,65 
               C10,48 20,34 32,23 
               C44,12 55,9 70,8 Z"
            fill="#8C1C13"
          />
          {/* Inner impressed circle */}
          <circle
            cx="70"
            cy="70"
            r="54"
            fill="#72140D"
            stroke="#C8A24A"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle
            cx="70"
            cy="70"
            r="49"
            fill="#64110A"
            stroke="#8C1C13"
            strokeWidth="1"
          />

          {/* Curved text on path */}
          <path
            id="sealTextPath"
            d="M26,70 A44,44 0 1,1 114,70 A44,44 0 1,1 26,70"
            fill="none"
          />
          <text
            fontSize="7"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="bold"
            letterSpacing="1.2"
            fill="#DED2BC"
            opacity="0.9"
          >
            <textPath href="#sealTextPath" startOffset="50%" textAnchor="middle">
              {inscription}
            </textPath>
          </text>

          {/* Central Heraldic Monogram / Eagle Crown */}
          <path
            d="M60,65 L70,52 L80,65 L76,68 L70,62 L64,68 Z"
            fill="#C8A24A"
          />
          <text
            x="70"
            y="82"
            textAnchor="middle"
            fontSize="14"
            fontFamily="IM Fell English SC, Georgia, serif"
            fontWeight="bold"
            fill="#C8A24A"
          >
            FB
          </text>
          <text
            x="70"
            y="94"
            textAnchor="middle"
            fontSize="6.5"
            fontFamily="JetBrains Mono, monospace"
            fill="#EDE4D3"
            letterSpacing="1.5"
          >
            VALERIUM
          </text>
        </svg>
      </div>

      {subtext && (
        <span className="mt-2 text-xs italic font-serif text-[#6B6155] max-w-xs">
          “{subtext}”
        </span>
      )}
    </div>
  );
};
