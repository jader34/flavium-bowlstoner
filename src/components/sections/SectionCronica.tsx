import React from 'react';
import { CHARACTER_DATA } from '../../data/character';
import { ReputationCard } from '../ReputationCard';
import { CollapsibleCard } from '../CollapsibleCard';
import { ScrollText } from 'lucide-react';

export const SectionCronica: React.FC = () => {
  const { personality, houseDossier, patriarch, counterpart, reputations, mission, negotiationDynamics } = CHARACTER_DATA;

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ============================================================== */}
      {/* SEÇÃO 8: PERSONALIDADE                                         */}
      {/* ============================================================== */}
      <section
        id="sec-personalidade"
        aria-labelledby="personalidade-heading"
        className="p-5 sm:p-8 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-4"
      >
        <div className="border-b border-[#14110E]/20 pb-2 flex items-baseline justify-between flex-wrap gap-1">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
              PARTE V // CONDUTA & PERFIL PSICOLÓGICO
            </span>
            <h2 id="personalidade-heading" className="font-display text-2xl text-[#14110E]">
              Personalidade Aristocrática
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6B6155]">ARQUÉTIPO: NOBRE DE VALERIUM</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#8C1C13] block">
              TRAÇOS DE PERSONALIDADE
            </span>
            <p className="font-serif text-base text-[#14110E] mt-1 leading-relaxed">
              {personality.traits}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 bg-[#EDE4D3] border border-[#C8A24A]/40 rounded-[2px]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#C8A24A] block">
              IDEAIS
            </span>
            <p className="font-serif text-base text-[#14110E] mt-1 leading-relaxed">
              {personality.ideals}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#6B6155] block">
              LIGAÇÕES
            </span>
            <p className="font-serif text-base text-[#14110E] mt-1 leading-relaxed">
              {personality.bonds}
            </p>
          </div>

          <div className="p-3.5 sm:p-4 bg-[#EDE4D3] border border-[#8C1C13]/30 rounded-[2px]">
            <span className="text-[10px] font-mono uppercase font-bold text-[#8C1C13] block">
              DEFEITOS
            </span>
            <p className="font-serif text-base text-[#14110E] mt-1 leading-relaxed">
              {personality.flaws}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 9: DOSSIÊ DA CASA BOWLSTONER (COLAPSÁVEL)                */}
      {/* ============================================================== */}
      <CollapsibleCard
        id="sec-dossie-casa"
        title={houseDossier.title}
        subtitle={houseDossier.subtitle}
        badge="ARQUIVO RESTRITO"
        accent="gold"
        defaultOpen={false}
      >
        <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-[#14110E]/90 text-justify">
          {houseDossier.paragraphs.map((p, idx) => (
            <p key={idx} className="indent-6">
              {p}
            </p>
          ))}
        </div>
        <div className="pt-4 mt-4 border-t border-[#14110E]/15 flex items-center justify-between text-[11px] font-mono text-[#6B6155] flex-wrap gap-2">
          <span>REGISTRO: CHANCELARIA REAL DE VALERIUM</span>
          <span>ESTADO: NÃO ARQUIVADO (PENDENTE DE EMBARGO)</span>
        </div>
      </CollapsibleCard>

      {/* ============================================================== */}
      {/* SEÇÃO 10 & 11: JAIL BOWLSTONER & LOUIS LULO (COLAPSÁVEIS)       */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Seção 10: Jail Bowlstoner */}
        <CollapsibleCard
          id="sec-jail"
          title={patriarch.name}
          subtitle={patriarch.role}
          badge="FORTALEZA DOS CARANDIRUS"
          accent="blood"
          defaultOpen={false}
        >
          <div className="space-y-3 font-serif text-base leading-relaxed text-[#14110E]">
            <p>{patriarch.biography}</p>
            <p className="italic text-[#8C1C13] bg-[#8C1C13]/5 p-3 rounded-[2px] border-l-2 border-[#8C1C13]">
              {patriarch.condemnation}
            </p>

            {/* Citação Famosa */}
            <div className="mt-4 p-4 bg-[#EDE4D3] border border-[#14110E]/20 rounded-[2px]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B6155] block">
                MANIFESTO DO PATRIARCA:
              </span>
              <blockquote className="font-display text-base sm:text-lg text-[#8C1C13] mt-1 leading-snug">
                “{patriarch.famousQuote}”
              </blockquote>
            </div>

            <p className="mt-3 font-serif text-sm text-[#6B6155] leading-relaxed">
              {patriarch.statusClosing}
            </p>

            <div className="pt-3 border-t border-[#14110E]/15 text-[10px] font-mono text-[#6B6155] flex justify-between">
              <span>REGIME: PRISÃO ESPECIAL NOBILIÁRQUICA</span>
              <span>ORDENS: ATIVAS</span>
            </div>
          </div>
        </CollapsibleCard>

        {/* Seção 11: Louis Lulo (Paleta Invertida) */}
        <CollapsibleCard
          id="sec-louis"
          title={counterpart.name}
          subtitle={counterpart.role}
          badge="SETE FORJAS"
          accent="ink"
          defaultOpen={false}
          className="!bg-[#14110E] !text-[#EDE4D3]"
        >
          <div className="space-y-3 font-serif text-base leading-relaxed text-[#EDE4D3]/90">
            <p>{counterpart.biography}</p>
            <p className="italic text-[#DED2BC] bg-[#1C1814] p-3 rounded-[2px] border-l-2 border-[#C8A24A]">
              {counterpart.contradictions}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-serif mt-3">
              <div className="p-2.5 bg-[#1C1814] rounded-[2px] border border-[#EDE4D3]/10">
                <span className="font-mono text-[10px] text-[#C8A24A] uppercase block">Qualidade:</span>
                <p className="text-[#EDE4D3]/90">{counterpart.quality}</p>
              </div>
              <div className="p-2.5 bg-[#1C1814] rounded-[2px] border border-[#EDE4D3]/10">
                <span className="font-mono text-[10px] text-[#C8A24A] uppercase block">Defeito:</span>
                <p className="text-[#EDE4D3]/90">{counterpart.flaw}</p>
              </div>
              <div className="p-2.5 bg-[#1C1814] rounded-[2px] border border-[#EDE4D3]/10">
                <span className="font-mono text-[10px] text-[#9BB7C4] uppercase block">Medo Secreto:</span>
                <p className="text-[#EDE4D3]/90">{counterpart.secretFear}</p>
              </div>
              <div className="p-2.5 bg-[#1C1814] rounded-[2px] border border-[#EDE4D3]/10">
                <span className="font-mono text-[10px] text-[#9BB7C4] uppercase block">Objetivo:</span>
                <p className="text-[#EDE4D3]/90">{counterpart.objective}</p>
              </div>
            </div>

            <div className="p-2 bg-[#1C1814] border border-[#EDE4D3]/10 rounded-[2px] text-xs font-serif text-[#DED2BC]">
              <strong className="text-[#C8A24A] font-mono mr-1">Mania:</strong>
              {counterpart.quirk}
            </div>

            <div className="pt-3 border-t border-[#EDE4D3]/15 text-[10px] font-mono text-[#DED2BC]/60 flex justify-between">
              <span>BASE: LIGA DOS FERREIROS</span>
              <span>COMISSÕES ATIVAS: 14</span>
            </div>
          </div>
        </CollapsibleCard>
      </div>

      {/* ============================================================== */}
      {/* SEÇÃO 12: DUAS REPUTAÇÕES (INTERATIVAS)                        */}
      {/* ============================================================== */}
      <section id="sec-reputacoes" aria-labelledby="reputacoes-heading" className="space-y-4">
        <div className="border-b border-[#14110E]/20 pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
              PARTE VI // VERSÕES & NARRATIVAS OFICIAIS
            </span>
            <h2 id="reputacoes-heading" className="font-display text-2xl text-[#14110E]">
              Duas Reputações: Discurso Público vs. Adversários
            </h2>
          </div>
          <span className="text-xs font-mono text-[#6B6155]">
            Toque nos botões para alternar as versões
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ReputationCard
            personName="Flavium Bowlstoner"
            role="Conselheiro Nobre & Sucessor"
            publicView={reputations.flavium.publicView}
            criticsView={reputations.flavium.criticsView}
            accentColor="blood"
          />

          <ReputationCard
            personName="Louis Lulo"
            role="Líder Sindical & Representante Popular"
            publicView={reputations.louis.publicView}
            criticsView={reputations.louis.criticsView}
            accentColor="gold"
          />

          <ReputationCard
            personName="Jail Bowlstoner"
            role="Comandante Preso nos Carandirus"
            publicView={reputations.jail.publicView}
            criticsView={reputations.jail.criticsView}
            accentColor="ink"
          />
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 13: A MISSÃO (COLAPSÁVEL)                                */}
      {/* ============================================================== */}
      <CollapsibleCard
        id="sec-missao"
        title={mission.title}
        subtitle="DUCADO DE ASFORD // DELEGAÇÃO CONJUNTA"
        badge="CRISE COMERCIAL"
        accent="blood"
        defaultOpen={false}
      >
        <div className="space-y-5">
          <p className="font-serif text-base sm:text-lg leading-relaxed text-[#14110E]/90 text-justify">
            {mission.context}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-[#EDE4D3] border border-[#8C1C13]/30 rounded-[2px]">
              <span className="font-mono text-xs uppercase font-bold text-[#8C1C13] block">
                A PERSPECTIVA DE FLÁVIUM (CAPITAL & NOBREZA)
              </span>
              <p className="font-serif text-sm text-[#14110E] mt-1.5 leading-relaxed">
                {mission.flaviumRole}
              </p>
            </div>

            <div className="p-3.5 bg-[#EDE4D3] border border-[#C8A24A]/50 rounded-[2px]">
              <span className="font-mono text-xs uppercase font-bold text-[#C8A24A] block">
                A PERSPECTIVA DE LOUIS (GUILDAS & TRABALHO)
              </span>
              <p className="font-serif text-sm text-[#14110E] mt-1.5 leading-relaxed">
                {mission.louisRole}
              </p>
            </div>
          </div>

          {/* Ordem Real em Destaque Tipográfico */}
          <div className="p-4 sm:p-6 bg-[#14110E] text-[#EDE4D3] border border-[#C8A24A] rounded-[2px] text-center space-y-2 shadow-hard-ink">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A24A] block font-bold">
              DECRETO REAL DA COROA DE VALERIUM
            </span>
            <blockquote className="font-display text-lg sm:text-2xl text-[#EDE4D3] italic max-w-3xl mx-auto leading-relaxed">
              “{mission.royalDecree}”
            </blockquote>
            <p className="font-serif text-xs text-[#DED2BC]/70 italic pt-1">
              {mission.royalFootnote}
            </p>
          </div>
        </div>
      </CollapsibleCard>

      {/* ============================================================== */}
      {/* SEÇÃO 14: MESA DE NEGOCIAÇÃO — COMO A DUPLA FUNCIONA           */}
      {/* ============================================================== */}
      <section
        id="sec-mesa-negociacao"
        aria-labelledby="mesa-heading"
        className="p-5 sm:p-8 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-6"
      >
        <div className="border-b border-[#14110E]/20 pb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
            PARTE VIII // PROTOCOLO DE CONVIVÊNCIA
          </span>
          <h2 id="mesa-heading" className="font-display text-2xl sm:text-3xl text-[#14110E]">
            Mesa de Negociação — Como a Dupla Funciona
          </h2>
          <p className="text-xs font-serif text-[#6B6155] mt-1">
            Dinâmica operacional de Flávium e Louis diante dos desafios da campanha
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {negotiationDynamics.map((item, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px] flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="font-display text-lg text-[#14110E] border-b border-[#14110E]/15 pb-1.5 mb-3">
                  {item.situation}
                </h3>

                <div className="space-y-3 font-serif text-sm leading-relaxed">
                  <div className="p-3 bg-[#F7F2E8] border border-[#8C1C13]/20 rounded-[2px]">
                    <span className="font-mono text-[10px] text-[#8C1C13] uppercase font-bold block mb-1">
                      Flávium:
                    </span>
                    <p className="text-[#14110E]">{item.flaviumAction}</p>
                  </div>

                  <div className="p-3 bg-[#F7F2E8] border border-[#C8A24A]/30 rounded-[2px]">
                    <span className="font-mono text-[10px] text-[#C8A24A] uppercase font-bold block mb-1">
                      Louis:
                    </span>
                    <p className="text-[#14110E]">{item.louisAction}</p>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#6B6155] pt-2 border-t border-[#14110E]/10">
                DISPONIBILIDADE: EM CAMPO
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
