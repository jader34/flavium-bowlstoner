/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabBar, TabId } from './components/TabBar';
import { NavigationSidebar } from './components/NavigationSidebar';
import { MobileCombatBar } from './components/MobileCombatBar';
import { HpModal } from './components/HpModal';
import { SectionFicha } from './components/sections/SectionFicha';
import { SectionCronica } from './components/sections/SectionCronica';
import { SectionPalavras } from './components/sections/SectionPalavras';
import { SectionSegredo } from './components/sections/SectionSegredo';

export default function App() {
  const maxHp = 40;
  const [activeTab, setActiveTab] = useState<TabId>('ficha');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHpModalOpen, setIsHpModalOpen] = useState(false);
  const [lastChangeText, setLastChangeText] = useState<string | null>(null);

  // Pontos de Vida (PV): persistência no localStorage
  const [currentHp, setCurrentHp] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('flavium_current_hp');
      return saved ? parseInt(saved, 10) : maxHp;
    } catch {
      return maxHp;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('flavium_current_hp', currentHp.toString());
    } catch {
      // storage unavailable
    }
  }, [currentHp]);

  const handleApplyDamage = (amount: number) => {
    const nextHp = Math.max(0, currentHp - amount);
    setCurrentHp(nextHp);
    setLastChangeText(`-${amount} PV de dano (${nextHp}/${maxHp})`);
  };

  const handleApplyHealing = (amount: number) => {
    const nextHp = Math.min(maxHp, currentHp + amount);
    setCurrentHp(nextHp);
    setLastChangeText(`+${amount} PV de cura (${nextHp}/${maxHp})`);
  };

  const handleResetHp = () => {
    setCurrentHp(maxHp);
    setLastChangeText(`Restaurado para o máximo (${maxHp}/${maxHp})`);
  };

  // Modo Mesa (Tabletop Mode): high contrast, larger font, preserved in localStorage
  const [isTabletopMode, setIsTabletopMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('flavium_tabletop_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('flavium_tabletop_mode', isTabletopMode.toString());
    } catch {
      // storage unavailable
    }
  }, [isTabletopMode]);

  const toggleTabletopMode = () => {
    setIsTabletopMode((prev) => !prev);
  };

  const handleNavigateToDamage = () => {
    if (activeTab !== 'ficha') {
      setActiveTab('ficha');
    }
    setTimeout(() => {
      const el = document.getElementById('sec-dano-turno');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  return (
    <div
      className={`min-h-screen bg-parchment-texture text-[#14110E] flex flex-col font-body selection:bg-[#C8A24A]/30 ${
        isTabletopMode ? 'tabletop-mode' : ''
      }`}
    >
      {/* Top Banner Notice */}
      <header className="border-b border-[#14110E]/15 bg-[#DED2BC] py-1 px-3 text-center no-print">
        <p className="text-[10px] sm:text-[11px] font-mono tracking-widest text-[#6B6155] uppercase truncate">
          CHANCELARIA REAL DE VALERIUM · ARQUIVO NOBILIÁRQUICO CONFIDENCIAL
        </p>
      </header>

      {/* Main Tab Bar Navigation (Fixed Top Segmented Control) */}
      <div className="no-print sticky top-0 z-30 shadow-sm">
        <TabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isTabletopMode={isTabletopMode}
          onToggleTabletopMode={toggleTabletopMode}
          onToggleIndexMenu={() => setMobileMenuOpen(true)}
        />
      </div>

      {/* Main Page Layout Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 flex gap-8">
        {/* Desktop Fixed Sidebar Navigation & Mobile Drawer */}
        <NavigationSidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          mobileMenuOpen={mobileMenuOpen}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />

        {/* Content Area */}
        <div className="flex-1 min-w-0 space-y-8 sm:space-y-12">
          {/* Active Tab Panel */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
            className="focus:outline-none"
          >
            {activeTab === 'ficha' && (
              <SectionFicha
                currentHp={currentHp}
                onOpenHpModal={() => setIsHpModalOpen(true)}
              />
            )}
            {activeTab === 'cronica' && <SectionCronica />}
            {activeTab === 'palavras' && <SectionPalavras />}
          </div>

          {/* Seção 18: O Segredo — Sempre presente no final da página, fora das abas */}
          <div className="pt-8 border-t-2 border-[#14110E]/20">
            <div className="mb-3 text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C1C13] font-bold">
                APÊNDICE CONFIDENCIAL // FORA DO DOSSIÊ PÚBLICO
              </span>
            </div>
            <SectionSegredo />
          </div>
        </div>
      </main>

      {/* Persistent Mobile Combat Bar (CA 15 · PV · INIC +3 · PERC 18 · DANO) */}
      <MobileCombatBar
        currentHp={currentHp}
        maxHp={maxHp}
        onOpenHpModal={() => setIsHpModalOpen(true)}
        onNavigateToDamage={handleNavigateToDamage}
      />

      {/* Modal / Dialog de Ajuste de PV (Dano ou Cura) */}
      <HpModal
        isOpen={isHpModalOpen}
        onClose={() => setIsHpModalOpen(false)}
        currentHp={currentHp}
        maxHp={maxHp}
        onApplyDamage={handleApplyDamage}
        onApplyHealing={handleApplyHealing}
        onResetHp={handleResetHp}
        lastChangeText={lastChangeText}
      />

      {/* Document Footer */}
      <footer className="mt-12 sm:mt-16 border-t border-[#14110E]/20 bg-[#DED2BC] py-6 sm:py-8 px-4 text-center text-xs font-mono text-[#6B6155] space-y-2 no-print">
        <div className="flex items-center justify-center gap-2 text-sm font-display text-[#14110E]">
          <span>Casa Bowlstoner</span>
          <span>·</span>
          <span>Valerium acima de tudo, Bane acima de todos</span>
        </div>
        <p className="max-w-2xl mx-auto font-serif text-xs sm:text-[13px] text-[#6B6155] leading-relaxed">
          Dossiê oficial de Flavium Bowlstoner — Humano (Variante) · Ladino 3 (Faca da Alma) / Patrulheiro 2 · Nível 5.
          Campanha de sátira política medieval em D&D 5ª Edição.
        </p>
        <p className="text-[10px] opacity-75">
          Documento preparado para uso em mesa presencial. Todos os dados preservados nos termos das leis de Valerium.
        </p>
      </footer>
    </div>
  );
}
