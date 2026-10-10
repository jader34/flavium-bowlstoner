import React from 'react';
import { CHARACTER_DATA } from '../../data/character';
import { CoatOfArms } from '../CoatOfArms';
import { WaxSeal } from '../WaxSeal';
import { StatBar } from '../StatBar';
import { TurnDamageCalculator } from '../TurnDamageCalculator';
import { Shield, Heart, Zap, Footprints, Eye, Sparkles, BookOpen, Clock, Package } from 'lucide-react';

interface SectionFichaProps {
  currentHp?: number;
  onOpenHpModal?: () => void;
}

export const SectionFicha: React.FC<SectionFichaProps> = ({
  currentHp = 40,
  onOpenHpModal,
}) => {
  const { header, abilities, combat, skills, proficienciesFooter, magic, progressionTimeline, equipment } = CHARACTER_DATA;

  return (
    <div className="space-y-12">
      {/* ============================================================== */}
      {/* SEÇÃO 1: CAPA DO DOSSIÊ                                         */}
      {/* ============================================================== */}
      <section
        id="sec-capa"
        aria-labelledby="capa-heading"
        className="relative p-6 sm:p-10 bg-[#F7F2E8] border border-[#14110E]/25 rounded-[2px] shadow-hard"
      >
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8">
          {/* Coat of Arms */}
          <div className="flex flex-col items-center text-center shrink-0">
            <CoatOfArms size={130} />
            <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
              CASA BOWLSTONER // HERÁLDICA
            </span>
          </div>

          {/* Main Title & Titles */}
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="inline-block text-[11px] font-mono tracking-widest text-[#8C1C13] uppercase font-bold border-b border-[#8C1C13]/40 pb-0.5">
              {header.classification} · {header.dossierReference}
            </div>

            <h1
              id="capa-heading"
              className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#14110E] tracking-tight leading-none"
            >
              {header.fullName}
            </h1>

            <p className="font-serif italic text-base sm:text-lg text-[#6B6155] leading-snug">
              {header.officialTitle}
            </p>

            {/* Motto */}
            <div className="py-2.5 px-4 bg-[#EDE4D3] border border-[#C8A24A]/60 rounded-[2px] inline-block my-2">
              <span className="text-[10px] font-mono text-[#6B6155] uppercase block tracking-wider">
                LEMA OFICIAL DA DINASTIA:
              </span>
              <blockquote className="font-display text-lg sm:text-xl text-[#8C1C13] tracking-wide">
                “{header.motto}”
              </blockquote>
            </div>

            {/* Metadata in Mono */}
            <div className="pt-2 border-t border-[#14110E]/15">
              <p className="font-mono text-xs sm:text-sm text-[#14110E] leading-relaxed">
                {header.metadataLine}
              </p>
            </div>
          </div>

          {/* Wax Seal */}
          <div className="shrink-0 flex justify-center">
            <WaxSeal
              inscription={header.sealInscription}
              subtext={header.disclaimer}
            />
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 2: ATRIBUTOS                                             */}
      {/* ============================================================== */}
      <section id="sec-atributos" aria-labelledby="atributos-heading" className="space-y-4">
        <div className="flex items-end justify-between border-b border-[#14110E]/20 pb-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
              PARTE I // MECÂNICA BÁSICA
            </span>
            <h2 id="atributos-heading" className="font-display text-2xl text-[#14110E]">
              Atributos & Salvaguardas
            </h2>
          </div>
          <div className="text-[11px] font-mono text-[#6B6155] hidden sm:block">
            ★ Resistências proficientes: <span className="text-[#C8A24A] font-bold">DES (+6)</span> e <span className="text-[#C8A24A] font-bold">INT (+3)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {abilities.map((ability) => (
            <StatBar key={ability.abbr} ability={ability} />
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 3: COMBATE                                                */}
      {/* ============================================================== */}
      <section
        id="sec-combate"
        aria-labelledby="combate-heading"
        className="bg-dark-parchment text-[#EDE4D3] p-6 sm:p-8 rounded-[2px] border border-[#14110E] shadow-hard-ink space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EDE4D3]/15 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#9BB7C4] uppercase block">
              CADERNO DE CAMPO // VITALIDADE & MANOBRAS
            </span>
            <h2 id="combate-heading" className="font-display text-2xl text-[#C8A24A]">
              Estatísticas de Combate
            </h2>
          </div>
          <div className="text-xs font-mono text-[#DED2BC]/70">
            Armadura: <span className="text-[#EDE4D3] font-semibold">{combat.acFormula}</span>
          </div>
        </div>

        {/* Combat Vitals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div
            onClick={onOpenHpModal}
            role={onOpenHpModal ? "button" : undefined}
            tabIndex={onOpenHpModal ? 0 : undefined}
            onKeyDown={(e) => {
              if (onOpenHpModal && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onOpenHpModal();
              }
            }}
            className={`p-3 bg-[#1C1814] border border-[#8C1C13]/60 rounded-[2px] ${
              onOpenHpModal
                ? 'cursor-pointer hover:border-[#8C1C13] active:scale-95 transition-all group'
                : ''
            }`}
            title={onOpenHpModal ? "Toque para abrir box de dano ou cura" : undefined}
            aria-label={`Pontos de Vida: ${currentHp} de ${combat.hp}. Toque para ajustar.`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#DED2BC]">
                <Heart className="w-3.5 h-3.5 text-[#8C1C13] fill-[#8C1C13]/40" />
                <span>Pontos de Vida</span>
              </div>
              {onOpenHpModal && (
                <span className="text-[9px] font-mono text-[#C8A24A] opacity-75 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  Ajustar ✎
                </span>
              )}
            </div>
            <div className="font-mono text-2xl font-bold mt-1">
              <span
                className={
                  currentHp <= 10
                    ? 'text-[#8C1C13]'
                    : currentHp <= 20
                    ? 'text-[#C8A24A]'
                    : 'text-[#EDE4D3]'
                }
              >
                {currentHp}
              </span>{' '}
              <span className="text-xs text-[#6B6155]">/ {combat.hp}</span>
            </div>
            <div className="text-[10px] font-mono text-[#DED2BC]/60 flex items-center justify-between">
              <span>3d8 (Lad) + 2d10 (Pat)</span>
              {onOpenHpModal && (
                <span className="text-[#C8A24A] text-[9px] underline sm:hidden">Dano/Cura</span>
              )}
            </div>
          </div>

          <div className="p-3 bg-[#1C1814] border border-[#EDE4D3]/15 rounded-[2px]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#DED2BC]">
              <Shield className="w-3.5 h-3.5 text-[#C8A24A]" />
              <span>Classe Armadura</span>
            </div>
            <div className="font-mono text-2xl font-bold text-[#C8A24A] mt-1">
              {combat.ac}
            </div>
            <div className="text-[10px] font-mono text-[#DED2BC]/60">12 Couro + 3 DES</div>
          </div>

          <div className="p-3 bg-[#1C1814] border border-[#EDE4D3]/15 rounded-[2px]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#DED2BC]">
              <Zap className="w-3.5 h-3.5 text-[#9BB7C4]" />
              <span>Iniciativa</span>
            </div>
            <div className="font-mono text-2xl font-bold text-[#EDE4D3] mt-1">
              +{combat.initiative}
            </div>
            <div className="text-[10px] font-mono text-[#DED2BC]/60">Modificador de DES</div>
          </div>

          <div className="p-3 bg-[#1C1814] border border-[#EDE4D3]/15 rounded-[2px]">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#DED2BC]">
              <Footprints className="w-3.5 h-3.5 text-[#DED2BC]" />
              <span>Deslocamento</span>
            </div>
            <div className="font-mono text-lg font-bold text-[#EDE4D3] mt-1">
              {combat.speed}
            </div>
            <div className="text-[10px] font-mono text-[#DED2BC]/60">Base humana</div>
          </div>

          <div className="p-3 bg-[#1C1814] border border-[#C8A24A]/40 rounded-[2px] col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#DED2BC]">
              <Eye className="w-3.5 h-3.5 text-[#C8A24A]" />
              <span>Percepção Pass.</span>
            </div>
            <div className="font-mono text-2xl font-bold text-[#C8A24A] mt-1">
              {combat.passivePerception}
            </div>
            <div className="text-[10px] font-mono text-[#DED2BC]/60">10 + 8 (Especialização)</div>
          </div>
        </div>

        {/* Tabela de Ataques (Desktop Table & Mobile Stacked List) */}
        <div>
          <h3 className="font-mono text-xs text-[#DED2BC] uppercase tracking-wider mb-2">
            Ataques Principais & Ações Psiónicas
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto border border-[#EDE4D3]/20 rounded-[2px]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#1C1814] border-b border-[#EDE4D3]/20 text-[#DED2BC]">
                <tr>
                  <th className="p-3">Ataque</th>
                  <th className="p-3">Tipo / Alcance</th>
                  <th className="p-3">Acerto (Mesa)</th>
                  <th className="p-3">Dano Físico</th>
                  <th className="p-3 text-right">Composição do Dano</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EDE4D3]/10">
                {combat.attacks.map((atk) => (
                  <tr key={atk.id} className="hover:bg-[#1C1814]/70 transition-colors">
                    <td className="p-3 font-semibold text-[#EDE4D3]">
                      <span className="text-[#9BB7C4] mr-1.5">◆</span>
                      {atk.name}
                    </td>
                    <td className="p-3 text-[#DED2BC]/80">{atk.type}</td>
                    <td className="p-3">
                      <span className="font-bold text-[#C8A24A] bg-[#C8A24A]/10 px-2 py-0.5 rounded-[2px] border border-[#C8A24A]/30">
                        1d20 + {atk.bonus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-[#8C1C13] bg-[#8C1C13]/10 px-2 py-0.5 rounded-[2px] border border-[#8C1C13]/30">
                        {atk.damageFormula}
                      </span>
                    </td>
                    <td className="p-3 text-right text-[11px] text-[#DED2BC]/70 font-mono">
                      {atk.breakdown}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked List (Zero Horizontal Scroll) */}
          <div className="md:hidden space-y-3">
            {combat.attacks.map((atk) => (
              <div
                key={atk.id}
                className="p-3 bg-[#1C1814] border border-[#EDE4D3]/15 rounded-[2px] space-y-2 text-xs font-mono"
              >
                <div className="flex items-start justify-between gap-2 border-b border-[#EDE4D3]/10 pb-1.5">
                  <span className="font-bold text-sm text-[#EDE4D3]">
                    <span className="text-[#9BB7C4] mr-1">◆</span>
                    {atk.name}
                  </span>
                  <span className="text-[10px] text-[#DED2BC]/60 shrink-0">
                    {atk.type}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EDE4D3]/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#DED2BC]/60">
                    TESTE DE ACERTO:
                  </span>
                  <span className="font-bold text-base text-[#C8A24A] bg-[#C8A24A]/10 px-2 py-0.5 rounded-[2px] border border-[#C8A24A]/30">
                    1d20 + {atk.bonus}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-[#EDE4D3]/10">
                  <span className="text-[10px] uppercase tracking-wider text-[#DED2BC]/60">
                    DANO FÍSICO:
                  </span>
                  <span className="font-bold text-base text-[#8C1C13] bg-[#8C1C13]/10 px-2 py-0.5 rounded-[2px] border border-[#8C1C13]/30">
                    {atk.damageFormula}
                  </span>
                </div>

                <div className="pt-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#DED2BC]/50 block">
                    COMPOSIÇÃO:
                  </span>
                  <span className="text-[11px] text-[#DED2BC]/80 leading-tight block mt-0.5">
                    {atk.breakdown}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conta Expandida do +7 */}
        <div className="p-3.5 bg-[#1C1814] border border-[#C8A24A]/30 rounded-[2px]">
          <div className="text-xs font-mono text-[#C8A24A] font-bold mb-2 flex items-center justify-between">
            <span>Composição Expandida do Modificador de Dano (+7):</span>
            <span className="text-[10px] text-[#DED2BC]/70 font-normal">Soma cumulativa oficial</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
            {combat.modifierBreakdown.components.map((c, idx) => (
              <div key={idx} className="p-2 bg-[#14110E] border border-[#EDE4D3]/10 rounded-[2px]">
                <div className="flex items-baseline justify-between text-[#EDE4D3]">
                  <span>{c.name}</span>
                  <span className="font-bold text-[#C8A24A] text-sm">{c.value}</span>
                </div>
                <div className="text-[10px] font-serif text-[#6B6155] mt-1">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 4: DANO POR TURNO (DESTAQUE DO SITE)                     */}
      {/* ============================================================== */}
      <section id="sec-dano-turno" aria-labelledby="dano-heading">
        <TurnDamageCalculator />
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 5: PERÍCIAS                                              */}
      {/* ============================================================== */}
      <section
        id="sec-pericias"
        aria-labelledby="pericias-heading"
        className="p-6 sm:p-8 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#14110E]/20 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
              PARTE II // COMPETÊNCIAS & DIPLOMAS
            </span>
            <h2 id="pericias-heading" className="font-display text-2xl text-[#14110E]">
              Perícias & Talentos Práticos
            </h2>
          </div>
          <div className="text-xs font-mono text-[#6B6155]">
            Especializações destacadas em <span className="text-[#8C1C13] font-bold">Dourado / Rubro</span>
          </div>
        </div>

        {/* Desktop Skills Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border border-[#14110E]/20">
            <thead className="bg-[#DED2BC] text-[#14110E] border-b border-[#14110E]/20">
              <tr>
                <th className="p-2.5">Perícia</th>
                <th className="p-2.5">Termo em Inglês</th>
                <th className="p-2.5">Atributo</th>
                <th className="p-2.5">Modificador</th>
                <th className="p-2.5">Fonte da Capacitação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#14110E]/10 bg-[#EDE4D3]">
              {skills.map((s, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-[#FAF6EF] transition-colors ${
                    s.isExpertise
                      ? 'bg-[#C8A24A]/15 font-semibold'
                      : s.isProficient
                      ? 'bg-[#DED2BC]/30'
                      : ''
                  }`}
                >
                  <td className="p-2.5 flex items-center gap-2">
                    {s.isExpertise && (
                      <span className="text-[#8C1C13] font-bold" title="Especialização">★</span>
                    )}
                    {s.isProficient && !s.isExpertise && (
                      <span className="text-[#C8A24A]" title="Proficiente">●</span>
                    )}
                    <span className={s.isExpertise ? 'text-[#8C1C13] font-bold' : 'text-[#14110E]'}>
                      {s.name}
                    </span>
                  </td>
                  <td className="p-2.5 text-[#6B6155] italic font-serif text-[13px]">
                    ({s.nameEn})
                  </td>
                  <td className="p-2.5 text-[#6B6155] font-bold">{s.ability}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-1.5 py-0.5 rounded-[2px] font-bold ${
                        s.isExpertise
                          ? 'bg-[#8C1C13] text-[#EDE4D3]'
                          : s.isProficient
                          ? 'bg-[#C8A24A] text-[#14110E]'
                          : 'text-[#14110E]'
                      }`}
                    >
                      {s.modifier >= 0 ? `+${s.modifier}` : s.modifier}
                    </span>
                  </td>
                  <td className="p-2.5 text-[#6B6155]">{s.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked List (Zero Horizontal Scroll) */}
        <div className="md:hidden divide-y divide-[#14110E]/10 border border-[#14110E]/20 rounded-[2px] bg-[#EDE4D3] overflow-hidden">
          {skills.map((s, idx) => (
            <div
              key={idx}
              className={`p-3 flex items-center justify-between gap-3 ${
                s.isExpertise
                  ? 'bg-[#C8A24A]/15 font-semibold'
                  : s.isProficient
                  ? 'bg-[#DED2BC]/30'
                  : ''
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {s.isExpertise && (
                    <span className="text-[#8C1C13] font-bold" title="Especialização">★</span>
                  )}
                  {s.isProficient && !s.isExpertise && (
                    <span className="text-[#C8A24A]" title="Proficiente">●</span>
                  )}
                  <span className={`text-sm ${s.isExpertise ? 'text-[#8C1C13] font-bold' : 'text-[#14110E]'}`}>
                    {s.name}
                  </span>
                  <span className="text-xs font-serif text-[#6B6155] italic">
                    ({s.nameEn})
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#6B6155] flex items-center gap-1.5 mt-0.5">
                  <span className="font-bold text-[#14110E]">{s.ability}</span>
                  <span>·</span>
                  <span className="truncate">{s.source}</span>
                </div>
              </div>

              <div className="shrink-0">
                <span
                  className={`inline-block min-w-[38px] text-center px-2 py-1 text-sm font-mono font-bold rounded-[2px] ${
                    s.isExpertise
                      ? 'bg-[#8C1C13] text-[#EDE4D3]'
                      : s.isProficient
                      ? 'bg-[#C8A24A] text-[#14110E]'
                      : 'bg-[#DED2BC] text-[#14110E]'
                  }`}
                >
                  {s.modifier >= 0 ? `+${s.modifier}` : s.modifier}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé de Proficiências e Ferramentas */}
        <div className="pt-4 border-t border-[#14110E]/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block font-sans font-bold">
              FERRAMENTAS:
            </span>
            <p className="text-[#14110E] mt-1">{proficienciesFooter.tools.join(', ')}</p>
          </div>

          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block font-sans font-bold">
              IDIOMAS:
            </span>
            <p className="text-[#14110E] mt-1">{proficienciesFooter.languages.join(', ')}</p>
          </div>

          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block font-sans font-bold">
              ARMADURAS:
            </span>
            <p className="text-[#14110E] mt-1">{proficienciesFooter.armors.join(', ')}</p>
          </div>

          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block font-sans font-bold">
              ARMAS:
            </span>
            <p className="text-[#14110E] mt-1">{proficienciesFooter.weapons.join(', ')}</p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 6: MAGIA E TRAÇOS                                         */}
      {/* ============================================================== */}
      <section
        id="sec-magia-tracos"
        aria-labelledby="magia-heading"
        className="p-6 sm:p-8 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-8"
      >
        <div className="border-b border-[#14110E]/20 pb-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
            PARTE III // DOMÍNIOS ARCANOS & EVOLUÇÃO
          </span>
          <h2 id="magia-heading" className="font-display text-2xl text-[#14110E]">
            Magia de Patrulheiro & Linha do Tempo de Traços
          </h2>
        </div>

        {/* Conjuração Vitals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block">Atributo Conjurador</span>
            <span className="font-bold text-[#14110E] text-base">{magic.spellcastingAbility}</span>
          </div>

          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block">CD de Resistência</span>
            <span className="font-bold text-[#8C1C13] text-base">{magic.spellSaveDC}</span>
          </div>

          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block">Bônus Ataque Mágico</span>
            <span className="font-bold text-[#14110E] text-base">+{magic.spellAttackBonus}</span>
          </div>

          <div className="p-3 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <span className="text-[10px] text-[#6B6155] uppercase block">Espaços de 1º Nível</span>
            <span className="font-bold text-[#C8A24A] text-base">{magic.slotsLevel1} Espaços</span>
          </div>
        </div>

        {/* Magias Conhecidas */}
        <div className="space-y-3">
          <h3 className="font-display text-lg text-[#14110E] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8C1C13]" />
            <span>Magias Conhecidas</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {magic.spellsKnown.map((spell, idx) => (
              <div key={idx} className="p-4 bg-[#EDE4D3] border border-[#14110E]/20 rounded-[2px] space-y-2">
                <div className="flex items-baseline justify-between border-b border-[#14110E]/10 pb-1.5">
                  <h4 className="font-display text-base text-[#8C1C13]">{spell.name}</h4>
                  <span className="font-mono text-[10px] text-[#6B6155]">{spell.level}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] font-mono text-[#6B6155]">
                  <span>Tempo: {spell.castingTime}</span>
                  <span>·</span>
                  <span>Alcance: {spell.range}</span>
                  <span>·</span>
                  <span>Duração: {spell.duration}</span>
                </div>
                <p className="font-serif text-xs text-[#14110E] leading-relaxed">
                  {spell.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Linha do Tempo Vertical */}
        <div className="pt-4 border-t border-[#14110E]/20 space-y-4">
          <h3 className="font-display text-lg text-[#14110E] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C8A24A]" />
            <span>Linha do Tempo de Traços por Nível</span>
          </h3>

          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#C8A24A]/40">
            {progressionTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#14110E] border-2 border-[#C8A24A]" />

                <div className="p-3.5 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px] transition-all hover:border-[#8C1C13]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#14110E] text-[#EDE4D3] rounded-[2px]">
                      {item.classTag}
                    </span>
                    <h4 className="font-display text-base text-[#14110E]">{item.title}</h4>
                  </div>
                  <p className="font-serif text-xs leading-relaxed text-[#14110E]/90 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* SEÇÃO 7: EQUIPAMENTO                                           */}
      {/* ============================================================== */}
      <section
        id="sec-equipamento"
        aria-labelledby="equipamento-heading"
        className="p-6 sm:p-8 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-4"
      >
        <div className="border-b border-[#14110E]/20 pb-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6155]">
            PARTE IV // INVENTÁRIO DECLARADO
          </span>
          <h2 id="equipamento-heading" className="font-display text-2xl text-[#14110E]">
            Equipamento & Herança
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna 1: Equipamento de Aventura */}
          <div className="p-4 bg-[#EDE4D3] border border-[#14110E]/15 rounded-[2px]">
            <h3 className="font-display text-base text-[#8C1C13] border-b border-[#14110E]/15 pb-1.5 mb-3 flex items-center gap-2">
              <Package className="w-4 h-4 text-[#8C1C13]" />
              <span>Equipamento de Aventura</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono divide-y divide-[#14110E]/10">
              {equipment.adventuringGear.map((item, idx) => (
                <li key={idx} className="pt-1.5 first:pt-0 flex items-start justify-between gap-2">
                  <span className="font-semibold text-[#14110E]">{item.name}</span>
                  <span className="text-[11px] font-serif text-[#6B6155] text-right">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 2: Bloco Nobre */}
          <div className="p-4 bg-[#EDE4D3] border border-[#C8A24A]/40 rounded-[2px]">
            <h3 className="font-display text-base text-[#C8A24A] border-b border-[#14110E]/15 pb-1.5 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C8A24A]" />
              <span>Herança Nobre & Insígnias</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono divide-y divide-[#14110E]/10">
              {equipment.nobleInheritance.map((item, idx) => (
                <li key={idx} className="pt-1.5 first:pt-0 flex items-start justify-between gap-2">
                  <span className="font-semibold text-[#14110E]">{item.name}</span>
                  <span className="text-[11px] font-serif text-[#6B6155] text-right">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
