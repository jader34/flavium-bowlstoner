import React, { useState } from 'react';
import { CHARACTER_DATA } from '../data/character';
import { AlertTriangle, Dices } from 'lucide-react';

export const TurnDamageCalculator: React.FC = () => {
  const [huntersMarkActive, setHuntersMarkActive] = useState(true);
  const [sneakAttackActive, setSneakAttackActive] = useState(true);
  const [bonusBladeAvailable, setBonusBladeAvailable] = useState(true);

  // Compute dice counts and modifiers dynamically based on active toggles
  const d6Count =
    1 + // main blade
    (sneakAttackActive ? 2 : 0) +
    (huntersMarkActive ? (bonusBladeAvailable ? 2 : 1) : 0);

  const d4Count = bonusBladeAvailable ? 1 : 0;
  const flatBonus = 7 + (bonusBladeAvailable ? 7 : 0); // 14 if bonus blade, 7 if only main

  // Dynamic formula display string
  const dynamicFormula = `${d6Count > 0 ? `${d6Count}d6` : ''}${
    d4Count > 0 ? ` + ${d4Count}d4` : ''
  } + ${flatBonus} psíquico`;

  // Average and maximum damage calculation
  const averageDamage = Math.floor(d6Count * 3.5 + d4Count * 2.5 + flatBonus);
  const maxDamage = d6Count * 6 + d4Count * 4 + flatBonus;

  return (
    <div className="bg-[#14110E] text-[#EDE4D3] p-5 sm:p-6 rounded-[2px] border border-[#C8A24A]/40 shadow-hard-ink">
      {/* Header and Switches */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#EDE4D3]/15">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-[#9BB7C4] uppercase block">
            DESTAQUE MECÂNICO // CÁLCULO DE COMBO PARA MESA
          </span>
          <h3 className="font-display text-2xl text-[#C8A24A] tracking-wide">
            Potencial de Dano por Turno
          </h3>
          <p className="text-xs font-serif text-[#DED2BC]/80">
            Ajuste os interruptores para ver exatamente quais dados físicos pegar na mão durante a rodada
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <label className="min-h-[48px] flex items-center gap-2.5 text-xs font-mono cursor-pointer select-none px-3 py-2.5 rounded-[2px] bg-[#1C1814] border border-[#EDE4D3]/20 hover:border-[#C8A24A]/60 active:scale-95 transition-all touch-manipulation">
            <input
              type="checkbox"
              checked={huntersMarkActive}
              onChange={(e) => setHuntersMarkActive(e.target.checked)}
              className="accent-[#C8A24A] w-4 h-4 cursor-pointer"
            />
            <span className={huntersMarkActive ? 'text-[#C8A24A] font-bold' : 'text-[#6B6155]'}>
              Marca do Caçador ativa
            </span>
          </label>

          <label className="min-h-[48px] flex items-center gap-2.5 text-xs font-mono cursor-pointer select-none px-3 py-2.5 rounded-[2px] bg-[#1C1814] border border-[#EDE4D3]/20 hover:border-[#8C1C13]/60 active:scale-95 transition-all touch-manipulation">
            <input
              type="checkbox"
              checked={sneakAttackActive}
              onChange={(e) => setSneakAttackActive(e.target.checked)}
              className="accent-[#8C1C13] w-4 h-4 cursor-pointer"
            />
            <span className={sneakAttackActive ? 'text-[#8C1C13] font-bold' : 'text-[#6B6155]'}>
              Furtivo garantido (2d6)
            </span>
          </label>

          <label className="min-h-[48px] flex items-center gap-2.5 text-xs font-mono cursor-pointer select-none px-3 py-2.5 rounded-[2px] bg-[#1C1814] border border-[#EDE4D3]/20 hover:border-[#9BB7C4]/60 active:scale-95 transition-all touch-manipulation">
            <input
              type="checkbox"
              checked={bonusBladeAvailable}
              onChange={(e) => setBonusBladeAvailable(e.target.checked)}
              className="accent-[#9BB7C4] w-4 h-4 cursor-pointer"
            />
            <span className={bonusBladeAvailable ? 'text-[#9BB7C4] font-bold' : 'text-[#6B6155]'}>
              Ação Bônus livre (2ª Lâmina)
            </span>
          </label>
        </div>
      </div>

      {/* Hero Damage Number & Physical Dice Box */}
      <div className="py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-mono text-[#DED2BC]/60 uppercase tracking-widest">
            FÓRMULA FÍSICA PARA ROLAR NA MESA:
          </span>
          <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#8C1C13] drop-shadow-sm flex items-baseline gap-3 flex-wrap">
            <span className="text-[#EDE4D3]">{dynamicFormula}</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#DED2BC]/80 mt-1">
            <span>Média esperada: <strong className="text-[#C8A24A]">{averageDamage}</strong></span>
            <span>·</span>
            <span>Teto máximo: <strong className="text-[#8C1C13]">{maxDamage}</strong></span>
            <span>·</span>
            <span className="text-[#9BB7C4]">Dano 100% Psíquico</span>
          </div>
        </div>

        {/* Physical Table Reference (Dados Físicos) */}
        <div className="w-full lg:w-auto p-3.5 bg-[#1C1814] border border-[#C8A24A]/40 rounded-[2px] shadow-sm">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#C8A24A] uppercase font-bold mb-2">
            <Dices className="w-4 h-4 text-[#C8A24A]" />
            <span>Separar na Mesa Física:</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center font-mono text-xs">
            {d6Count > 0 && (
              <span className="px-2 py-1 bg-[#8C1C13]/20 border border-[#8C1C13]/50 text-[#EDE4D3] rounded-[2px] font-bold">
                {d6Count} × d6 <span className="text-[10px] text-[#9BB7C4] font-normal">(psíquico)</span>
              </span>
            )}
            {d4Count > 0 && (
              <span className="px-2 py-1 bg-[#9BB7C4]/20 border border-[#9BB7C4]/50 text-[#9BB7C4] rounded-[2px] font-bold">
                {d4Count} × d4 <span className="text-[10px] text-[#EDE4D3] font-normal">(psíquico)</span>
              </span>
            )}
            <span className="px-2 py-1 bg-[#C8A24A]/20 border border-[#C8A24A]/50 text-[#C8A24A] rounded-[2px] font-bold">
              +{flatBonus} fixo
            </span>
          </div>
          <div className="text-[10px] font-mono text-[#DED2BC]/60 mt-2">
            Acerto nos ataques: <strong className="text-[#EDE4D3]">d20 + 6</strong> em cada lâmina
          </div>
        </div>
      </div>

      {/* Breakdown Lines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-4 border-t border-[#EDE4D3]/15">
        <div className="p-2.5 bg-[#1C1814] border border-[#EDE4D3]/10 rounded-[2px]">
          <div className="text-[10px] font-mono text-[#6B6155] uppercase">Ataque Principal</div>
          <div className="font-mono font-bold text-sm text-[#EDE4D3]">1d6 + 7 psíquico</div>
          <div className="text-[11px] font-serif text-[#DED2BC]/70 mt-0.5">
            Lâmina arremessada (60 ft)
          </div>
        </div>

        <div className={`p-2.5 bg-[#1C1814] border rounded-[2px] ${bonusBladeAvailable ? 'border-[#9BB7C4]/30' : 'border-[#14110E] opacity-50'}`}>
          <div className="text-[10px] font-mono text-[#6B6155] uppercase">Ação Bônus</div>
          <div className="font-mono font-bold text-sm text-[#9BB7C4]">
            {bonusBladeAvailable ? '1d4 + 7 psíquico' : '0 (Ocupada)'}
          </div>
          <div className="text-[11px] font-serif text-[#DED2BC]/70 mt-0.5">
            Segunda lâmina manifestada
          </div>
        </div>

        <div className={`p-2.5 bg-[#1C1814] border rounded-[2px] ${sneakAttackActive ? 'border-[#8C1C13]/40' : 'border-[#14110E] opacity-50'}`}>
          <div className="text-[10px] font-mono text-[#6B6155] uppercase">Ataque Furtivo</div>
          <div className="font-mono font-bold text-sm text-[#8C1C13]">
            {sneakAttackActive ? '2d6 psíquico' : '0 (Sem condição)'}
          </div>
          <div className="text-[11px] font-serif text-[#DED2BC]/70 mt-0.5">
            Ladino 3 (vantagem / aliado)
          </div>
        </div>

        <div className={`p-2.5 bg-[#1C1814] border rounded-[2px] ${huntersMarkActive ? 'border-[#C8A24A]/40' : 'border-[#14110E] opacity-50'}`}>
          <div className="text-[10px] font-mono text-[#6B6155] uppercase">Marca do Caçador</div>
          <div className="font-mono font-bold text-sm text-[#C8A24A]">
            {huntersMarkActive ? (bonusBladeAvailable ? '2d6 (2 acertos)' : '1d6 (1 acerto)') : '0 (Inativa)'}
          </div>
          <div className="text-[11px] font-serif text-[#DED2BC]/70 mt-0.5">
            1d6 por acerto registrado
          </div>
        </div>
      </div>

      {/* Mandatory Warning Notice */}
      <div className="mt-4 p-3 bg-[#8C1C13]/15 border border-[#8C1C13] rounded-[2px] flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-[#8C1C13] shrink-0 mt-0.5" />
        <div className="text-xs font-serif text-[#EDE4D3] leading-relaxed">
          <strong className="text-[#8C1C13] font-mono uppercase tracking-wide mr-1 font-bold">
            Aviso de Regra:
          </strong>
          {CHARACTER_DATA.turnDamage.mandatoryWarning}
        </div>
      </div>
    </div>
  );
};
