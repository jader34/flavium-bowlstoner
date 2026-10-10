import React, { useState } from 'react';
import { CHARACTER_DATA } from '../../data/character';
import { Lock, Unlock, AlertTriangle, Eye, ShieldAlert } from 'lucide-react';

export const SectionSegredo: React.FC = () => {
  const { secret } = CHARACTER_DATA;
  const [isUnsealed, setIsUnsealed] = useState(false);

  return (
    <section
      id="sec-segredo"
      aria-labelledby="segredo-heading"
      className="p-6 sm:p-10 bg-[#14110E] text-[#EDE4D3] border-2 border-[#8C1C13] rounded-[2px] shadow-hard-ink space-y-6 relative overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute right-[-20px] top-[-20px] pointer-events-none opacity-5 font-mono text-[100px] font-bold text-[#8C1C13]">
        SIGILO
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8C1C13]/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#8C1C13] text-xs font-mono font-bold uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-[#8C1C13]" />
            <span>{secret.classification}</span>
          </div>
          <h2 id="segredo-heading" className="font-display text-3xl sm:text-4xl text-[#EDE4D3] mt-1">
            {secret.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsUnsealed(!isUnsealed)}
          aria-expanded={isUnsealed}
          aria-controls="secret-content"
          className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-2.5 font-mono text-xs font-bold rounded-[2px] transition-all bg-[#8C1C13] hover:bg-[#A32319] active:scale-95 text-[#EDE4D3] border border-[#C8A24A]/60 shadow-hard cursor-pointer touch-manipulation select-none"
        >
          {isUnsealed ? (
            <>
              <Unlock className="w-4 h-4 text-[#C8A24A]" />
              <span>Lacre Rompido (Ocultar)</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-[#C8A24A]" />
              <span>Romper Lacre de Segurança</span>
            </>
          )}
        </button>
      </div>

      {/* Summary Kicker */}
      <p className="font-serif text-base sm:text-lg italic text-[#C8A24A] leading-relaxed max-w-4xl">
        “{secret.summary}”
      </p>

      {/* Sealed vs Unsealed state */}
      {!isUnsealed ? (
        <div className="p-8 bg-[#1C1814] border border-[#8C1C13]/40 rounded-[2px] text-center space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#8C1C13]/20 border border-[#8C1C13] flex items-center justify-center text-[#8C1C13]">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl text-[#EDE4D3]">
            Documento Lacrado com Cera Imperial da Casa Bowlstoner
          </h3>
          <p className="font-serif text-sm text-[#DED2BC]/70 max-w-lg mx-auto leading-relaxed">
            Este apêndice contém os desdobramentos confidenciais da crise mercantil do Ducado de Asford. O conteúdo é reservado ao mestre de jogo ou ao jogador sob permissão expressa.
          </p>
          <button
            type="button"
            onClick={() => setIsUnsealed(true)}
            className="mt-2 text-xs font-mono text-[#C8A24A] underline hover:text-[#EDE4D3] cursor-pointer"
          >
            [Clique para abrir o envelope arquivístico]
          </button>
        </div>
      ) : (
        <div
          id="secret-content"
          className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#EDE4D3]/90 pt-2 animate-[fadeIn_0.3s_ease-out]"
        >
          {secret.paragraphs.map((p, idx) => (
            <p key={idx} className="indent-6 text-justify">
              {p}
            </p>
          ))}

          <div className="mt-6 pt-4 border-t border-[#8C1C13]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono text-[#DED2BC]/60">
            <span>REGISTRO № ASFORD-CRISIS-CONFIDENTIAL</span>
            <span className="text-[#8C1C13] font-bold">STATUS: DILIGÊNCIA CRÍTICA PENDENTE</span>
          </div>
        </div>
      )}
    </section>
  );
};
