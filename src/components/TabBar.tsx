import React, { useRef } from 'react';
import { Scroll, Landmark, MessageSquareQuote, Sun, Moon, Menu } from 'lucide-react';

export type TabId = 'ficha' | 'cronica' | 'palavras';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  isTabletopMode?: boolean;
  onToggleTabletopMode?: () => void;
  onToggleIndexMenu?: () => void;
  className?: string;
}

interface TabItem {
  id: TabId;
  label: string;
  mobileLabel: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  {
    id: 'ficha',
    label: 'I. Ficha Nobiliárquica',
    mobileLabel: 'Ficha',
    sub: 'Atributos, Combate, Perícias (1–7)',
    icon: Scroll,
  },
  {
    id: 'cronica',
    label: 'II. Casa & Crônica',
    mobileLabel: 'Crônica',
    sub: 'Dossiê, Lulo & Missão (8–14)',
    icon: Landmark,
  },
  {
    id: 'palavras',
    label: 'III. Palavras & Balanço',
    mobileLabel: 'Palavras',
    sub: 'Diálogos, Frases & Tabela (15–17)',
    icon: MessageSquareQuote,
  },
];

export const TabBar: React.FC<TabBarProps> = ({
  activeTab,
  onTabChange,
  isTabletopMode = false,
  onToggleTabletopMode,
  onToggleIndexMenu,
  className = '',
}) => {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % TABS.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = TABS.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    onTabChange(TABS[newIndex].id);
    const buttons = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[newIndex]?.focus();
  };

  return (
    <nav
      className={`border-b border-[#14110E]/20 bg-[#DED2BC]/95 backdrop-blur-md sticky top-0 z-30 shadow-sm ${className}`}
      aria-label="Abas do Dossiê"
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1.5 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Mobile Index Menu Button */}
        {onToggleIndexMenu && (
          <button
            type="button"
            onClick={onToggleIndexMenu}
            className="lg:hidden min-h-[48px] min-w-[48px] flex items-center justify-center p-2 rounded-[2px] bg-[#EDE4D3] text-[#14110E] border border-[#14110E]/20 active:scale-95 transition-transform touch-manipulation cursor-pointer"
            aria-label="Abrir índice de seções"
            title="Índice de seções"
          >
            <Menu className="w-5 h-5 text-[#8C1C13]" />
          </button>
        )}

        {/* Segmented Control for Thumb Navigation */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Seções do Dossiê"
          className="flex-1 grid grid-cols-3 gap-1 sm:flex sm:justify-center sm:gap-2 p-1 bg-[#EDE4D3] rounded-[3px] border border-[#14110E]/15"
        >
          {TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onTabChange(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`min-h-[48px] px-2 sm:px-4 py-1.5 rounded-[2px] transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 cursor-pointer border active:scale-[0.98] select-none touch-manipulation ${
                  isActive
                    ? 'bg-[#14110E] text-[#EDE4D3] border-[#14110E] shadow-hard font-bold'
                    : 'bg-transparent text-[#14110E] border-transparent hover:border-[#14110E]/20 hover:bg-[#DED2BC]/50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-[#C8A24A]' : 'text-[#8C1C13]'
                  }`}
                />
                <div className="text-center sm:text-left leading-tight">
                  <span className="block font-display text-xs sm:text-sm tracking-wide">
                    <span className="sm:hidden">{tab.mobileLabel}</span>
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                  <span
                    className={`hidden lg:block text-[9px] font-mono mt-0.5 ${
                      isActive ? 'text-[#DED2BC]/75' : 'text-[#6B6155]'
                    }`}
                  >
                    {tab.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modo Mesa (Tabletop Mode) Toggle */}
        {onToggleTabletopMode && (
          <button
            type="button"
            onClick={onToggleTabletopMode}
            title={isTabletopMode ? 'Desativar Modo Mesa' : 'Ativar Modo Mesa (Maior contraste para jogo)'}
            aria-pressed={isTabletopMode}
            aria-label="Alternar Modo Mesa"
            className={`min-h-[48px] min-w-[48px] px-2.5 py-1.5 rounded-[2px] border text-xs font-mono flex items-center justify-center gap-1 cursor-pointer active:scale-95 transition-all shrink-0 touch-manipulation select-none ${
              isTabletopMode
                ? 'bg-[#C8A24A] text-[#14110E] border-[#14110E] font-bold shadow-hard'
                : 'bg-[#EDE4D3] text-[#14110E] border-[#14110E]/20 hover:border-[#C8A24A]'
            }`}
          >
            {isTabletopMode ? (
              <Sun className="w-4 h-4 text-[#8C1C13]" />
            ) : (
              <Moon className="w-4 h-4 text-[#6B6155]" />
            )}
            <span className="hidden md:inline">
              {isTabletopMode ? 'Modo Mesa: ON' : 'Modo Mesa'}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
};
