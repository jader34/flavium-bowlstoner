import React, { useState, useEffect } from 'react';
import { TabId } from './TabBar';
import { Printer, X, ChevronRight, Bookmark } from 'lucide-react';

interface NavigationSidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

interface NavSectionItem {
  id: string;
  label: string;
  tab: TabId | 'all';
}

const SECTION_ITEMS: NavSectionItem[] = [
  // Ficha
  { id: 'sec-capa', label: '1. Capa do Dossiê', tab: 'ficha' },
  { id: 'sec-atributos', label: '2. Atributos', tab: 'ficha' },
  { id: 'sec-combate', label: '3. Combate', tab: 'ficha' },
  { id: 'sec-dano-turno', label: '4. Dano por Turno', tab: 'ficha' },
  { id: 'sec-pericias', label: '5. Perícias', tab: 'ficha' },
  { id: 'sec-magia-tracos', label: '6. Magia & Traços', tab: 'ficha' },
  { id: 'sec-equipamento', label: '7. Equipamento', tab: 'ficha' },

  // Crônica
  { id: 'sec-personalidade', label: '8. Personalidade', tab: 'cronica' },
  { id: 'sec-dossie-casa', label: '9. Dossiê da Casa', tab: 'cronica' },
  { id: 'sec-jail', label: '10. Jail Bowlstoner', tab: 'cronica' },
  { id: 'sec-louis', label: '11. Louis Lulo', tab: 'cronica' },
  { id: 'sec-reputacoes', label: '12. Duas Reputações', tab: 'cronica' },
  { id: 'sec-missao', label: '13. A Missão', tab: 'cronica' },
  { id: 'sec-mesa-negociacao', label: '14. Mesa de Negociação', tab: 'cronica' },

  // Palavras
  { id: 'sec-dialogos', label: '15. Diálogos', tab: 'palavras' },
  { id: 'sec-frases', label: '16. Frases de Atuação', tab: 'palavras' },
  { id: 'sec-comparativo', label: '17. Tabela Comparativa', tab: 'palavras' },

  // Fora das abas
  { id: 'sec-segredo', label: '18. O Segredo Lacrado', tab: 'all' },
];

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  activeTab,
  onTabChange,
  mobileMenuOpen,
  onCloseMobileMenu,
}) => {
  const [activeSection, setActiveSection] = useState<string>('sec-capa');

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const item of SECTION_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, itemTab: TabId | 'all') => {
    if (itemTab !== 'all' && itemTab !== activeTab) {
      onTabChange(itemTab);
    }
    onCloseMobileMenu();

    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter items visible in current tab plus the universal secret
  const currentNavItems = SECTION_ITEMS.filter(
    (item) => item.tab === activeTab || item.tab === 'all'
  );

  return (
    <>
      {/* Mobile Modal Drawer (When triggered from top bar) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end no-print">
          <div
            className="bg-[#EDE4D3] border-t-2 border-[#8C1C13] shadow-2xl rounded-t-[4px] max-h-[80vh] flex flex-col p-4 space-y-3 overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Índice de seções do dossiê"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#14110E]/15">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#8C1C13]" />
                <span className="font-display text-base text-[#14110E] font-bold">
                  Índice de Seções da Mesa
                </span>
              </div>
              <button
                type="button"
                onClick={onCloseMobileMenu}
                className="min-h-[48px] min-w-[48px] flex items-center justify-center text-[#14110E] hover:bg-[#DED2BC] rounded-[2px] active:scale-90"
                aria-label="Fechar índice"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-1.5 pr-1 flex-1">
              {SECTION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.tab)}
                  className={`w-full min-h-[48px] text-left px-3 py-2 text-xs font-mono rounded-[2px] transition-colors flex items-center justify-between active:scale-[0.99] touch-manipulation cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-[#14110E] text-[#EDE4D3] font-bold shadow-sm'
                      : 'hover:bg-[#DED2BC] text-[#14110E] bg-[#F7F2E8]/60 border border-[#14110E]/10'
                  }`}
                >
                  <span className="truncate">{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50 shrink-0" />
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-[#14110E]/15 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrint}
                className="min-h-[48px] px-3 py-2 text-xs font-mono text-[#14110E] bg-[#DED2BC] rounded-[2px] border border-[#14110E]/20 flex items-center gap-2 active:scale-95"
              >
                <Printer className="w-4 h-4 text-[#8C1C13]" />
                <span>Imprimir Ficha</span>
              </button>
              <span className="text-[10px] font-mono text-[#6B6155]">D&D 5e · Nível 5</span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Fixed Sidebar */}
      <aside
        className="hidden lg:block w-64 shrink-0 no-print"
        aria-label="Navegação lateral do Dossiê"
      >
        <div className="sticky top-16 p-4 bg-[#F7F2E8] border border-[#14110E]/20 rounded-[2px] shadow-hard space-y-4">
          <div className="border-b border-[#14110E]/15 pb-2.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#8C1C13] block font-bold">
              ARQUIVO NOBILIÁRQUICO
            </span>
            <h3 className="font-display text-base text-[#14110E]">
              Índice do Dossiê
            </h3>
            <span className="text-[10px] font-serif text-[#6B6155]">
              Documento Oficial № 004
            </span>
          </div>

          <nav className="space-y-1 text-xs font-mono max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
            {currentNavItems.map((item) => {
              const isSelected = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.tab)}
                  className={`w-full min-h-[44px] text-left px-2.5 py-1.5 rounded-[2px] transition-all flex items-center justify-between group cursor-pointer active:scale-95 touch-manipulation ${
                    isSelected
                      ? 'bg-[#14110E] text-[#EDE4D3] font-bold shadow-sm'
                      : 'text-[#14110E] hover:bg-[#DED2BC]/60 hover:text-[#8C1C13]'
                  }`}
                  aria-current={isSelected ? 'location' : undefined}
                >
                  <span className="truncate">{item.label}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSelected
                        ? 'bg-[#C8A24A]'
                        : 'bg-transparent group-hover:bg-[#8C1C13]'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#14110E]/15 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-[44px] px-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#14110E] hover:text-[#8C1C13] transition-colors cursor-pointer active:scale-95"
              title="Imprimir dossiê completo"
            >
              <Printer className="w-3.5 h-3.5 text-[#8C1C13]" />
              <span>Imprimir Dossiê</span>
            </button>
            <span className="text-[10px] font-mono text-[#6B6155]">D&D 5e</span>
          </div>
        </div>
      </aside>
    </>
  );
};
