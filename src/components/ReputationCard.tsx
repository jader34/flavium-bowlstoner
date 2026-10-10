import React, { useState } from 'react';
import { ShieldCheck, EyeOff } from 'lucide-react';

interface ReputationCardProps {
  personName: string;
  role: string;
  publicView: string;
  criticsView: string;
  accentColor?: 'blood' | 'gold' | 'ink';
}

export const ReputationCard: React.FC<ReputationCardProps> = ({
  personName,
  role,
  publicView,
  criticsView,
  accentColor = 'gold',
}) => {
  const [activeView, setActiveView] = useState<'public' | 'critics'>('public');

  const borderClass =
    accentColor === 'blood'
      ? 'border-[#8C1C13]/30'
      : accentColor === 'gold'
      ? 'border-[#C8A24A]/40'
      : 'border-[#14110E]/20';

  return (
    <div className={`p-4 bg-[#F7F2E8] border ${borderClass} rounded-[2px] shadow-hard relative flex flex-col justify-between`}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h4 className="font-display text-lg text-[#14110E] tracking-wide">
              {personName}
            </h4>
            <p className="text-xs font-serif text-[#6B6155]">{role}</p>
          </div>

          {/* Toggle Button */}
          <div className="flex items-center gap-1.5 p-1 bg-[#DED2BC] rounded-[2px] border border-[#14110E]/20 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveView('public')}
              className={`min-h-[48px] px-3 py-2 rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation ${
                activeView === 'public'
                  ? 'bg-[#14110E] text-[#EDE4D3] shadow-sm font-bold border border-[#14110E]'
                  : 'text-[#6B6155] hover:text-[#14110E] hover:bg-[#EDE4D3]'
              }`}
              aria-pressed={activeView === 'public'}
              aria-label={`Ver versão pública de ${personName}`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C8A24A]" />
              <span>Pública</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveView('critics')}
              className={`min-h-[48px] px-3 py-2 rounded-[2px] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 touch-manipulation ${
                activeView === 'critics'
                  ? 'bg-[#8C1C13] text-[#EDE4D3] shadow-sm font-bold border border-[#8C1C13]'
                  : 'text-[#6B6155] hover:text-[#14110E] hover:bg-[#EDE4D3]'
              }`}
              aria-pressed={activeView === 'critics'}
              aria-label={`Ver versão dos adversários de ${personName}`}
            >
              <EyeOff className="w-4 h-4 text-[#EDE4D3]" />
              <span>Adversários</span>
            </button>
          </div>
        </div>

        {/* Narrative Box with page-flip animation */}
        <div
          key={activeView}
          className="mt-3 p-3 min-h-[90px] border border-[#14110E]/10 rounded-[2px] bg-[#EDE4D3]/60 transition-all duration-200 animate-[fadeIn_0.25s_ease-in-out]"
        >
          <div className="text-[10px] uppercase font-mono tracking-wider mb-1 flex items-center gap-1.5">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${
                activeView === 'public' ? 'bg-[#C8A24A]' : 'bg-[#8C1C13]'
              }`}
            />
            <span className={activeView === 'public' ? 'text-[#14110E] font-bold' : 'text-[#8C1C13] font-bold'}>
              {activeView === 'public' ? 'Versão Oficial / Pública' : 'Versão dos Adversários & Bastidores'}
            </span>
          </div>
          <p className="font-serif text-sm leading-relaxed text-[#14110E] italic">
            “{activeView === 'public' ? publicView : criticsView}”
          </p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[#14110E]/10 flex items-center justify-between text-[10px] font-mono text-[#6B6155]">
        <span>REGISTRO № {personName.toUpperCase().slice(0, 3)}-5E</span>
        <span>STATUS: {activeView === 'public' ? 'HOMOLOGADO' : 'AUDITORIA INTERNA'}</span>
      </div>
    </div>
  );
};
