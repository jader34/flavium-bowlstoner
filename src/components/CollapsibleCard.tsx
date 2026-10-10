import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleCardProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  defaultOpen?: boolean;
  accent?: 'blood' | 'gold' | 'ink';
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  id,
  title,
  subtitle,
  badge,
  defaultOpen = false,
  accent = 'gold',
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const accentBorder =
    accent === 'blood'
      ? 'border-[#8C1C13]/40'
      : accent === 'ink'
      ? 'border-[#14110E]/30'
      : 'border-[#C8A24A]/60';

  const badgeColor =
    accent === 'blood'
      ? 'bg-[#8C1C13]/10 text-[#8C1C13] border-[#8C1C13]/30'
      : accent === 'ink'
      ? 'bg-[#14110E]/10 text-[#14110E] border-[#14110E]/20'
      : 'bg-[#C8A24A]/10 text-[#8C1C13] border-[#C8A24A]/40';

  return (
    <div
      id={id}
      className={`bg-[#F7F2E8] border ${accentBorder} rounded-[2px] shadow-hard transition-all ${className}`}
    >
      {/* Header Button with >= 48px touch target */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full min-h-[52px] p-4 text-left flex items-center justify-between gap-3 cursor-pointer select-none active:bg-[#EDE4D3] transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            {badge && (
              <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[1px] border font-bold ${badgeColor}`}>
                {badge}
              </span>
            )}
            {subtitle && (
              <span className="text-[11px] font-mono text-[#6B6155] truncate">
                {subtitle}
              </span>
            )}
          </div>
          <h3 className="font-display text-xl sm:text-2xl text-[#14110E] truncate leading-tight">
            {title}
          </h3>
        </div>

        <div className="shrink-0 flex items-center gap-1.5 pl-2">
          <span className="text-[10px] font-mono text-[#6B6155] uppercase hidden sm:inline">
            {isOpen ? 'Recolher' : 'Expandir'}
          </span>
          <div
            className={`w-7 h-7 rounded-[2px] bg-[#DED2BC] flex items-center justify-center transition-transform duration-200 ${
              isOpen ? 'rotate-180 bg-[#14110E] text-[#EDE4D3]' : 'text-[#14110E]'
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* Content */}
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } p-4 sm:p-6 pt-0 border-t border-[#14110E]/10 print:!block`}
      >
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
};
