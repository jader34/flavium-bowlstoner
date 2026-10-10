import React from 'react';
import { Shield, Heart, Zap, Eye } from 'lucide-react';

interface MobileCombatBarProps {
  currentHp: number;
  maxHp: number;
  onOpenHpModal: () => void;
  onNavigateToDamage?: () => void;
}

export const MobileCombatBar: React.FC<MobileCombatBarProps> = ({
  currentHp,
  maxHp,
  onOpenHpModal,
}) => {
  return (
    <aside
      aria-label="Barra de Combate da Mesa"
      className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-[#14110E] text-[#EDE4D3] border-t-2 border-[#C8A24A] shadow-[0_-4px_16px_rgba(0,0,0,0.5)] no-print pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="max-w-md mx-auto px-2 py-1.5 grid grid-cols-4 gap-1.5 select-none">
        {/* CA */}
        <div
          className="min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-[2px] bg-[#1C1814] border border-[#EDE4D3]/15 active:bg-[#2A241E] transition-colors"
          title="Classe de Armadura: 15"
        >
          <div className="flex items-center gap-1 text-[10px] font-mono text-[#C8A24A] uppercase tracking-wider leading-none">
            <Shield className="w-3 h-3 text-[#C8A24A]" />
            <span>CA</span>
          </div>
          <span className="font-mono text-lg font-bold text-[#C8A24A] leading-tight mt-0.5">15</span>
        </div>

        {/* PV (Toque para abrir box de Dano ou Cura) */}
        <div className="min-h-[48px] flex flex-col items-center justify-center rounded-[2px] bg-[#1C1814] border border-[#8C1C13]/60 relative hover:border-[#8C1C13] transition-colors">
          <button
            type="button"
            onClick={onOpenHpModal}
            className="w-full h-full p-1 flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
            aria-label={`Pontos de Vida: ${currentHp} de ${maxHp}. Toque para abrir box de dano ou cura.`}
            title="Ajustar PV (Dano ou Cura)"
          >
            <div className="flex items-center gap-1 text-[10px] font-mono text-[#8C1C13] uppercase tracking-wider leading-none font-bold">
              <Heart className="w-3 h-3 text-[#8C1C13] fill-[#8C1C13]/30" />
              <span>PV</span>
            </div>
            <span
              className={`font-mono text-lg font-bold leading-tight mt-0.5 ${
                currentHp <= 10
                  ? 'text-[#8C1C13]'
                  : currentHp <= 20
                  ? 'text-[#C8A24A]'
                  : 'text-[#EDE4D3]'
              }`}
            >
              {currentHp}
              <span className="text-[10px] text-[#6B6155] font-normal">/{maxHp}</span>
            </span>
          </button>
        </div>

        {/* INICIATIVA */}
        <div
          className="min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-[2px] bg-[#1C1814] border border-[#EDE4D3]/15 active:bg-[#2A241E] transition-colors"
          title="Iniciativa: +3"
        >
          <div className="flex items-center gap-0.5 text-[10px] font-mono text-[#9BB7C4] uppercase tracking-wider leading-none">
            <Zap className="w-3 h-3 text-[#9BB7C4]" />
            <span>INIC</span>
          </div>
          <span className="font-mono text-lg font-bold text-[#EDE4D3] leading-tight mt-0.5">+3</span>
        </div>

        {/* PERCEPÇÃO PASSIVA */}
        <div
          className="min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-[2px] bg-[#1C1814] border border-[#EDE4D3]/15 active:bg-[#2A241E] transition-colors"
          title="Percepção Passiva: 18"
        >
          <div className="flex items-center gap-0.5 text-[10px] font-mono text-[#DED2BC] uppercase tracking-wider leading-none">
            <Eye className="w-3 h-3 text-[#C8A24A]" />
            <span>PERC</span>
          </div>
          <span className="font-mono text-lg font-bold text-[#C8A24A] leading-tight mt-0.5">18</span>
        </div>
      </div>
    </aside>
  );
};
