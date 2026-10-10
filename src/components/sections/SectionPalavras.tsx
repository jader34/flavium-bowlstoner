import React from 'react';
import { CHARACTER_DATA } from '../../data/character';
import { Quote, MessageSquare, GitCompare, Sparkles } from 'lucide-react';

export const SectionPalavras: React.FC = () => {
  const { dialogues, quotes, comparativeTable } = CHARACTER_DATA;

  return (
    <div className="space-y-12">
      {/* ============================================================== */}
      {/* SEÇÃO 15: DIÁLOGOS (FORMATO ROTEIRO TEATRAL)                   */}
      {/* ============================================================== */}
      <section
        id="sec-dialogos"
        aria-labelledby="dialogos-heading"
        className="p-6 sm:p-10 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-8"
      >
        <div className="border-b border-[#14110E]/20 pb-3">
          <div className="flex items-center gap-2 text-[#8C1C13] text-xs font-mono font-bold uppercase tracking-widest">
            <MessageSquare className="w-4 h-4" />
            <span>ROTEIRO DRAMÁTICO // TRANSCRIÇÃO DAS AUDIÊNCIAS</span>
          </div>
          <h2 id="dialogos-heading" className="font-display text-3xl text-[#14110E] mt-1">
            Diálogos Oficiais da Comitiva
          </h2>
          <p className="font-serif text-xs text-[#6B6155] mt-0.5">
            Transcrito literalmente conforme ata da Chancelaria (Louis à esquerda, Flávium à direita, sem subterfúgios)
          </p>
        </div>

        <div className="space-y-8">
          {dialogues.map((scene) => (
            <div
              key={scene.id}
              className="p-5 sm:p-6 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px] space-y-4"
            >
              <div className="border-b border-[#14110E]/15 pb-2">
                <h3 className="font-display text-xl text-[#14110E]">{scene.title}</h3>
                <span className="font-mono text-xs text-[#6B6155] italic">
                  {scene.subtitle}
                </span>
              </div>

              {/* Script layout: Louis on the left, Flavium on the right, theatrical typographic layout */}
              <div className="space-y-4 pt-2">
                {scene.lines.map((line, idx) => {
                  const isFlavium = line.speaker === 'flavium';

                  return (
                    <div
                      key={idx}
                      className={`flex flex-col max-w-xl ${
                        isFlavium ? 'ml-auto text-right items-end' : 'mr-auto text-left items-start'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-mono uppercase tracking-widest font-bold ${
                          isFlavium ? 'text-[#8C1C13]' : 'text-[#C8A24A]'
                        }`}
                      >
                        {isFlavium ? 'FLÁVIUM BOWLSTONER' : 'LOUIS LULO'}
                      </span>
                      <p className="font-serif text-sm sm:text-base text-[#14110E] mt-0.5 leading-relaxed italic">
                        “{line.text}”
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 16: FRASES PARA INTERPRETAR                              */}
      {/* ============================================================== */}
      <section
        id="sec-frases"
        aria-labelledby="frases-heading"
        className="p-6 sm:p-10 bg-[#EDE4D3] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-8"
      >
        <div className="border-b border-[#14110E]/20 pb-3">
          <div className="flex items-center gap-2 text-[#8C1C13] text-xs font-mono font-bold uppercase tracking-widest">
            <Quote className="w-4 h-4" />
            <span>GUIA DE ATUAÇÃO & VOCABULÁRIO</span>
          </div>
          <h2 id="frases-heading" className="font-display text-3xl sm:text-4xl text-[#14110E] mt-1">
            Frases Notáveis para Interpretação
          </h2>
          <p className="font-serif text-sm text-[#6B6155] mt-1">
            Repertório de citações canônicas para uso em sessões de mesa
          </p>
        </div>

        {/* Linha de Análise Obrigatória */}
        <div className="p-4 bg-[#F7F2E8] border border-[#8C1C13]/40 rounded-[2px] shadow-sm">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C1C13] font-bold block mb-1">
            DIRETRIZ EDITORIAL DE INTERPRETAÇÃO:
          </span>
          <p className="font-serif text-sm sm:text-base text-[#14110E] italic leading-relaxed">
            {quotes.analysisNote}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Citações de Flávium */}
          <div className="space-y-4">
            <div className="border-b border-[#8C1C13]/30 pb-2">
              <span className="text-[10px] font-mono text-[#8C1C13] uppercase tracking-widest font-bold">
                REPERTÓRIO ARISTOCRÁTICO
              </span>
              <h3 className="font-display text-2xl text-[#8C1C13]">
                Flávium Bowlstoner
              </h3>
            </div>

            <div className="space-y-4">
              {quotes.flaviumQuotes.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F7F2E8] border border-[#14110E]/15 rounded-[2px] shadow-hard"
                >
                  <blockquote className="font-serif text-base sm:text-lg text-[#14110E] italic leading-snug">
                    “{q}”
                  </blockquote>
                  <span className="block text-[10px] font-mono text-[#8C1C13] text-right mt-2 uppercase font-semibold">
                    — FLÁVIUM BOWLSTONER
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Citações de Louis */}
          <div className="space-y-4">
            <div className="border-b border-[#C8A24A]/40 pb-2">
              <span className="text-[10px] font-mono text-[#C8A24A] uppercase tracking-widest font-bold">
                REPERTÓRIO POPULAR & SINDICAL
              </span>
              <h3 className="font-display text-2xl text-[#14110E]">
                Louis Lulo
              </h3>
            </div>

            <div className="space-y-4">
              {quotes.louisQuotes.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#F7F2E8] border border-[#14110E]/15 rounded-[2px] shadow-hard"
                >
                  <blockquote className="font-serif text-base sm:text-lg text-[#14110E] italic leading-snug">
                    “{q}”
                  </blockquote>
                  <span className="block text-[10px] font-mono text-[#C8A24A] text-right mt-2 uppercase font-semibold">
                    — LOUIS LULO
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 17: TABELA COMPARATIVA FINAL                             */}
      {/* ============================================================== */}
      <section
        id="sec-comparativo"
        aria-labelledby="comparativo-heading"
        className="p-6 sm:p-10 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-6"
      >
        <div className="border-b border-[#14110E]/20 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <div className="flex items-center gap-2 text-[#8C1C13] text-xs font-mono font-bold uppercase tracking-widest">
              <GitCompare className="w-4 h-4" />
              <span>BALANÇO POLÍTICO FINAL</span>
            </div>
            <h2 id="comparativo-heading" className="font-display text-3xl text-[#14110E] mt-1">
              Tabela Comparativa: Flávium vs. Louis
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6B6155]">9 DIMENSÕES ESTRATÉGICAS</span>
        </div>

        {/* Desktop Comparative Table */}
        <div className="hidden md:block overflow-x-auto border border-[#14110E]/20 rounded-[2px]">
          <table className="w-full text-left font-serif text-sm">
            <thead className="bg-[#14110E] text-[#EDE4D3] font-mono text-xs border-b border-[#14110E]">
              <tr>
                <th className="p-3 w-1/4 uppercase tracking-wider">Dimensão</th>
                <th className="p-3 w-[37.5%] text-[#8C1C13] uppercase tracking-wider">
                  Flávium Bowlstoner
                </th>
                <th className="p-3 w-[37.5%] text-[#C8A24A] uppercase tracking-wider">
                  Louis Lulo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14110E]/10 bg-[#EDE4D3]">
              {comparativeTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF6EF] transition-colors">
                  <td className="p-3 font-mono text-xs font-bold text-[#14110E] bg-[#DED2BC]/50">
                    {row.dimension}
                  </td>
                  <td className="p-3 text-[#14110E] leading-relaxed">
                    {row.flavium}
                  </td>
                  <td className="p-3 text-[#14110E] leading-relaxed">
                    {row.louis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List (Zero Horizontal Scroll) */}
        <div className="md:hidden space-y-3">
          {comparativeTable.map((row, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px] shadow-sm space-y-2 text-xs font-serif"
            >
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#14110E] bg-[#DED2BC] px-2 py-1 rounded-[1px] border border-[#14110E]/10 flex items-center justify-between">
                <span>{row.dimension}</span>
                <span className="text-[9px] text-[#6B6155] font-normal">DIMENSÃO #{idx + 1}</span>
              </div>

              <div className="p-2 bg-[#F7F2E8] border border-[#8C1C13]/25 rounded-[2px]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#8C1C13] block mb-0.5">
                  Flávium Bowlstoner:
                </span>
                <p className="text-[#14110E] leading-relaxed font-serif">
                  {row.flavium}
                </p>
              </div>

              <div className="p-2 bg-[#F7F2E8] border border-[#C8A24A]/40 rounded-[2px]">
                <span className="font-mono text-[10px] uppercase font-bold text-[#C8A24A] block mb-0.5">
                  Louis Lulo:
                </span>
                <p className="text-[#14110E] leading-relaxed font-serif">
                  {row.louis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
