import React, { useState, useEffect, useRef } from 'react';
import { Heart, X, Flame, Sparkles, RotateCcw } from 'lucide-react';

interface HpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentHp: number;
  maxHp: number;
  onApplyDamage: (amount: number) => void;
  onApplyHealing: (amount: number) => void;
  onResetHp: () => void;
  lastChangeText?: string | null;
}

export const HpModal: React.FC<HpModalProps> = ({
  isOpen,
  onClose,
  currentHp,
  maxHp,
  onApplyDamage,
  onApplyHealing,
  onResetHp,
  lastChangeText,
}) => {
  const [amountStr, setAmountStr] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setAmountStr('');
      // Auto-focus input after open
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const parsedAmount = parseInt(amountStr, 10);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;

  const handleDamage = () => {
    if (isValidAmount) {
      onApplyDamage(parsedAmount);
      onClose();
    }
  };

  const handleHealing = () => {
    if (isValidAmount) {
      onApplyHealing(parsedAmount);
      onClose();
    }
  };

  const handleAddQuickValue = (val: number) => {
    const current = parseInt(amountStr, 10) || 0;
    setAmountStr((current + val).toString());
  };

  const hpPercentage = Math.min(Math.max((currentHp / maxHp) * 100, 0), 100);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 no-print overscroll-contain animate-[fadeIn_0.15s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="hp-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-[#14110E] text-[#EDE4D3] border-2 border-[#C8A24A] rounded-[3px] shadow-2xl p-5 space-y-4 relative touch-manipulation"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#EDE4D3]/15 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[2px] bg-[#8C1C13]/20 border border-[#8C1C13] flex items-center justify-center text-[#8C1C13]">
              <Heart className="w-4 h-4 fill-[#8C1C13]" />
            </div>
            <div>
              <h3 id="hp-modal-title" className="font-display text-lg text-[#EDE4D3] leading-none">
                Ajustar Pontos de Vida (PV)
              </h3>
              <span className="text-[10px] font-mono text-[#DED2BC]/60 uppercase tracking-wider block mt-0.5">
                Mecânica de Mesa · D&D 5e
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-[2px] text-[#DED2BC]/70 hover:text-[#EDE4D3] hover:bg-[#1C1814] active:scale-90 transition-transform cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current HP Display & Progress Bar */}
        <div className="p-3 bg-[#1C1814] border border-[#EDE4D3]/10 rounded-[2px] space-y-2">
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-xs text-[#DED2BC]/70 uppercase">PV Atual:</span>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-3xl font-bold tracking-tight ${
                  currentHp <= 10
                    ? 'text-[#8C1C13]'
                    : currentHp <= 20
                    ? 'text-[#C8A24A]'
                    : 'text-[#EDE4D3]'
                }`}
              >
                {currentHp}
              </span>
              <span className="text-xs text-[#6B6155]">/ {maxHp}</span>
            </div>
          </div>

          <div
            className="w-full h-2.5 bg-[#2A241E] rounded-[1px] overflow-hidden border border-[#EDE4D3]/10"
            role="progressbar"
            aria-valuenow={currentHp}
            aria-valuemin={0}
            aria-valuemax={maxHp}
          >
            <div
              className={`h-full transition-all duration-300 ${
                currentHp <= 10
                  ? 'bg-[#8C1C13]'
                  : currentHp <= 20
                  ? 'bg-[#C8A24A]'
                  : 'bg-[#2B593F]'
              }`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>

          {lastChangeText && (
            <div className="text-[10px] font-mono text-[#C8A24A] text-right italic">
              {lastChangeText}
            </div>
          )}
        </div>

        {/* Input Value */}
        <div className="space-y-1.5">
          <label
            htmlFor="hp-amount-input"
            className="text-xs font-mono uppercase tracking-wider text-[#DED2BC]/80 block"
          >
            Digite o valor a aplicar:
          </label>
          <div className="relative">
            <input
              id="hp-amount-input"
              ref={inputRef}
              type="number"
              min="1"
              max="100"
              placeholder="Ex: 8"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // Default Enter on input is Dano if valid
                  if (isValidAmount) handleDamage();
                }
              }}
              className="w-full h-12 px-3 text-center text-2xl font-mono font-bold bg-[#1C1814] border border-[#C8A24A]/60 rounded-[2px] text-[#EDE4D3] focus:outline-none focus:ring-2 focus:ring-[#C8A24A] placeholder:text-[#6B6155]"
            />
          </div>

          {/* Quick Increment Buttons for Tabletop Speed */}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono text-[#DED2BC]/50 uppercase mr-1">Rápido:</span>
            {[1, 5, 10, 15].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleAddQuickValue(val)}
                className="flex-1 min-h-[36px] py-1 text-xs font-mono font-semibold rounded-[2px] bg-[#1C1814] text-[#DED2BC] border border-[#EDE4D3]/15 hover:border-[#C8A24A] active:scale-95 transition-all cursor-pointer"
              >
                +{val}
              </button>
            ))}
          </div>
        </div>

        {/* Action Choice: DANO or CURA */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* Damage Button */}
          <button
            type="button"
            onClick={handleDamage}
            disabled={!isValidAmount}
            className={`min-h-[48px] py-2.5 px-3 rounded-[2px] flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer select-none active:scale-95 ${
              isValidAmount
                ? 'bg-[#8C1C13] hover:bg-[#A32319] text-[#EDE4D3] border-[#8C1C13] shadow-hard'
                : 'bg-[#1C1814] text-[#6B6155] border-[#EDE4D3]/10 cursor-not-allowed opacity-50'
            }`}
          >
            <Flame className="w-4 h-4 text-[#EDE4D3]" />
            <span>Dano {isValidAmount ? `(-${parsedAmount})` : ''}</span>
          </button>

          {/* Healing Button */}
          <button
            type="button"
            onClick={handleHealing}
            disabled={!isValidAmount}
            className={`min-h-[48px] py-2.5 px-3 rounded-[2px] flex items-center justify-center gap-2 font-mono text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer select-none active:scale-95 ${
              isValidAmount
                ? 'bg-[#2B593F] hover:bg-[#346F4E] text-[#EDE4D3] border-[#2B593F] shadow-hard'
                : 'bg-[#1C1814] text-[#6B6155] border-[#EDE4D3]/10 cursor-not-allowed opacity-50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C8A24A]" />
            <span>Cura {isValidAmount ? `(+${parsedAmount})` : ''}</span>
          </button>
        </div>

        {/* Footer Actions: Reset or Cancel */}
        <div className="pt-2 border-t border-[#EDE4D3]/10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onResetHp();
              onClose();
            }}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#DED2BC]/70 hover:text-[#C8A24A] transition-colors cursor-pointer py-1"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C8A24A]" />
            <span>Restaurar Total (40 PV)</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="text-[11px] font-mono text-[#DED2BC]/50 hover:text-[#EDE4D3] cursor-pointer py-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};
