import React from 'react';
import { AbilityScore } from '../data/character';

interface StatBarProps {
  ability: AbilityScore;
}

export const StatBar: React.FC<StatBarProps> = ({ ability }) => {
  // Max standard ability score in 5e is typically 20 (or 30 absolute max). We scale against 20.
  const percentage = Math.min(Math.max((ability.score / 20) * 100, 5), 100);
  const formattedMod = ability.modifier >= 0 ? `+${ability.modifier}` : `${ability.modifier}`;
  const formattedSave = ability.saveModifier >= 0 ? `+${ability.saveModifier}` : `${ability.saveModifier}`;

  return (
    <div className="group p-2.5 bg-[#F7F2E8] border border-[#14110E]/15 rounded-[2px] transition-all duration-150 hover:border-[#14110E]/40 hover:bg-[#FAF6EF]">
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-sm text-[#14110E] tracking-wider">
            {ability.abbr}
          </span>
          <span className="text-xs text-[#6B6155] font-serif">
            {ability.name}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="text-right">
            <span className="text-[10px] text-[#6B6155] block leading-none">VALOR</span>
            <span className="font-bold text-sm text-[#14110E]">{ability.score}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#6B6155] block leading-none">MOD</span>
            <span className={`font-bold text-sm ${ability.highlightBlood ? 'text-[#8C1C13]' : 'text-[#14110E]'}`}>
              {formattedMod}
            </span>
          </div>
          <div
            className={`text-right px-1.5 py-0.5 rounded-[2px] border ${
              ability.isSaveProficient
                ? 'border-[#C8A24A] bg-[#C8A24A]/10 text-[#14110E]'
                : 'border-transparent text-[#6B6155]'
            }`}
            title={ability.isSaveProficient ? 'Resistência Proficiente (Salvação)' : 'Resistência'}
          >
            <span className="text-[9px] uppercase tracking-wider block leading-none font-sans">
              {ability.isSaveProficient ? '★ RESIST' : 'RESIST'}
            </span>
            <span
              className={`font-bold text-xs ${
                ability.isSaveProficient ? 'text-[#8C1C13]' : 'text-[#6B6155]'
              }`}
            >
              {formattedSave}
            </span>
          </div>
        </div>
      </div>

      {/* Horizontal Bar */}
      <div
        className="w-full h-2 bg-[#DED2BC] rounded-[1px] overflow-hidden border border-[#14110E]/10"
        role="progressbar"
        aria-valuenow={ability.score}
        aria-valuemin={1}
        aria-valuemax={20}
        aria-label={`${ability.name}: ${ability.score}`}
      >
        <div
          className={`h-full transition-all duration-300 ${
            ability.highlightBlood
              ? 'bg-[#8C1C13]'
              : ability.isSaveProficient
              ? 'bg-[#C8A24A]'
              : 'bg-[#6B6155]'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
