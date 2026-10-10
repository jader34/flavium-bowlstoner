/**
 * Dossiê Oficial Confidencial — Casa Bowlstoner
 * Dados canônicos do personagem Flavium Bowlstoner e crônica de campanha
 */

export interface AbilityScore {
  name: string;
  abbr: string;
  score: number;
  modifier: number;
  saveModifier: number;
  isSaveProficient: boolean;
  highlightBlood?: boolean;
}

export interface AttackAction {
  id: string;
  name: string;
  type: string;
  bonus: number;
  damageFormula: string;
  damageType: string;
  isPsionic: boolean;
  diceCount: number;
  diceSides: number;
  flatModifier: number;
  breakdown: string;
}

export interface SkillEntry {
  name: string;
  nameEn?: string;
  ability: string;
  modifier: number;
  source: string;
  isExpertise?: boolean;
  isProficient?: boolean;
}

export interface TraitLevel {
  level: number;
  classTag: string;
  title: string;
  description: string;
}

export interface DialogueLine {
  speaker: 'flavium' | 'louis';
  text: string;
}

export interface DialogueScene {
  id: string;
  title: string;
  subtitle: string;
  lines: DialogueLine[];
}

export interface ComparisonRow {
  dimension: string;
  flavium: string;
  louis: string;
}

export interface ReputationData {
  publicView: string;
  criticsView: string;
}

export const CHARACTER_DATA = {
  // Seção 1: Capa do Dossiê
  header: {
    fullName: "Flavium Bowlstoner",
    officialTitle: "Conselheiro Extraordinário dos Interesses Nobres e Defensor dos Valores Tradicionais",
    motto: "Valerium acima de tudo, Bane acima de todos",
    metadataLine: "Humano (Variante) · Ladino 3 (Faca da Alma) / Patrulheiro 2 · Nível total 5 · Nobre · Neutro Mau · Bônus de Proficiência +3",
    sealInscription: "PROPRIEDADE DA CASA BOWLSTONER — CIRCULAÇÃO RESTRITA",
    disclaimer: "Documento preparado pelo próprio biografado.",
    classification: "CONFIDENCIAL // ARQUIVO NOBILIÁRQUICO",
    dossierReference: "DOSSIÊ BOWLSTONER № 004-VALERIUM",
  },

  // Seção 2: Atributos
  abilities: [
    { name: "Força", abbr: "FOR", score: 8, modifier: -1, saveModifier: -1, isSaveProficient: false },
    { name: "Destreza", abbr: "DES", score: 16, modifier: 3, saveModifier: 6, isSaveProficient: true, highlightBlood: true },
    { name: "Constituição", abbr: "CON", score: 14, modifier: 2, saveModifier: 2, isSaveProficient: false },
    { name: "Inteligência", abbr: "INT", score: 10, modifier: 0, saveModifier: 3, isSaveProficient: true },
    { name: "Sabedoria", abbr: "SAB", score: 14, modifier: 2, saveModifier: 2, isSaveProficient: false },
    { name: "Carisma", abbr: "CAR", score: 12, modifier: 1, saveModifier: 1, isSaveProficient: false },
  ] as AbilityScore[],

  // Seção 3: Combate
  combat: {
    hp: 40,
    ac: 15,
    acFormula: "Couro batido (12) + DES (+3)",
    initiative: 3,
    speed: "30 ft (9 m)",
    passivePerception: 18,
    attacks: [
      {
        id: "psychic-blades-main",
        name: "Lâminas Psíquicas (arremesso 60 ft)",
        type: "Ação de Ataque",
        bonus: 6,
        damageFormula: "1d6 + 7 psíquico",
        damageType: "Psíquico",
        isPsionic: true,
        diceCount: 1,
        diceSides: 6,
        flatModifier: 7,
        breakdown: "+3 Destreza, +2 Duelismo, +2 Combate com Armas de Arremesso",
      },
      {
        id: "psychic-blades-bonus",
        name: "Lâmina Psíquica (ação bônus)",
        type: "Ação Bônus",
        bonus: 6,
        damageFormula: "1d4 + 7 psíquico",
        damageType: "Psíquico",
        isPsionic: true,
        diceCount: 1,
        diceSides: 4,
        flatModifier: 7,
        breakdown: "+3 Destreza, +2 Duelismo, +2 Combate com Armas de Arremesso",
      },
    ] as AttackAction[],
    modifierBreakdown: {
      total: "+7 no Dano",
      components: [
        { name: "Modificador de Destreza", value: "+3", desc: "Ataque com arma de acuidade" },
        { name: "Estilo de Luta: Duelismo", value: "+2", desc: "Patrulheiro 2 (ao empunhar apenas uma arma em uma mão)" },
        { name: "Estilo: Combate com Armas de Arremesso", value: "+2", desc: "Talento Iniciado em Combate (armas arremessadas)" },
      ],
    },
  },

  // Seção 4: Dano por Turno
  turnDamage: {
    baseFormula: "5d6 + 1d4 + 14 psíquico",
    baseMaxPotential: "48 dano médio máximo",
    breakdownLines: [
      { label: "Ataque Principal (Lâmina Psíquica)", formula: "1d6 + 7 psíquico", detail: "Ação de ataque arremessada" },
      { label: "Ação Bônus (Segunda Lâmina)", formula: "1d4 + 7 psíquico", detail: "Condicionado a ter a mão livre" },
      { label: "Ataque Furtivo (Sneak Attack)", formula: "2d6 psíquico", detail: "Ladino Nível 3 (com vantagem ou aliado a 5 ft)" },
      { label: "Marca do Caçador (Hunter's Mark)", formula: "2d6 concussivo/psíquico", detail: "1d6 em cada um dos 2 ataques bem-sucedidos" },
    ],
    mandatoryWarning: "No turno em que o personagem conjura ou move a Marca, ele perde a lâmina bônus e 1d6, caindo para cerca de 3d6 + 7.",
  },

  // Seção 5: Perícias
  skills: [
    { name: "Furtividade", nameEn: "Stealth", ability: "DES", modifier: 9, source: "Ladino + Especialização", isExpertise: true },
    { name: "Percepção", nameEn: "Perception", ability: "SAB", modifier: 8, source: "Ladino + Especialização", isExpertise: true },
    { name: "Prestidigitação", nameEn: "Sleight of Hand", ability: "DES", modifier: 6, source: "Ladino", isProficient: true },
    { name: "Intuição", nameEn: "Insight", ability: "SAB", modifier: 5, source: "Ladino / SAB", isProficient: true },
    { name: "Persuasão", nameEn: "Persuasion", ability: "CAR", modifier: 4, source: "Nobre", isProficient: true },
    { name: "Sobrevivência", nameEn: "Survival", ability: "SAB", modifier: 5, source: "Patrulheiro", isProficient: true },
    { name: "História", nameEn: "History", ability: "INT", modifier: 3, source: "Nobre", isProficient: true },
    { name: "Acrobacia", nameEn: "Acrobatics", ability: "DES", modifier: 3, source: "Atributo puro" },
    { name: "Adestrar Animais", nameEn: "Animal Handling", ability: "SAB", modifier: 2, source: "Atributo puro" },
    { name: "Arcanismo", nameEn: "Arcana", ability: "INT", modifier: 0, source: "Atributo puro" },
    { name: "Atletismo", nameEn: "Athletics", ability: "FOR", modifier: -1, source: "Atributo puro" },
    { name: "Enganação", nameEn: "Deception", ability: "CAR", modifier: 1, source: "Atributo puro" },
    { name: "Intimidação", nameEn: "Intimidation", ability: "CAR", modifier: 1, source: "Atributo puro" },
    { name: "Investigação", nameEn: "Investigation", ability: "INT", modifier: 0, source: "Atributo puro" },
    { name: "Medicina", nameEn: "Medicine", ability: "SAB", modifier: 2, source: "Atributo puro" },
    { name: "Natureza", nameEn: "Nature", ability: "INT", modifier: 0, source: "Atributo puro" },
    { name: "Performance", nameEn: "Performance", ability: "CAR", modifier: 1, source: "Atributo puro" },
    { name: "Religião", nameEn: "Religion", ability: "INT", modifier: 0, source: "Atributo puro" },
  ] as SkillEntry[],

  proficienciesFooter: {
    tools: ["Ferramentas de ladrão", "Baralho"],
    languages: ["Comum", "Élfico", "Silvestre"],
    armors: ["Armaduras leves", "Armaduras médias", "Escudos"],
    weapons: ["Armas simples", "Armas marciais"],
  },

  // Seção 6: Magia e Traços
  magic: {
    spellcastingAbility: "Sabedoria",
    spellSaveDC: 13,
    spellAttackBonus: 5,
    slotsLevel1: 2,
    spellsKnown: [
      {
        name: "Marca do Caçador (Hunter's Mark)",
        level: "1º Nível (Adivinhação)",
        castingTime: "1 Ação Bônus",
        range: "90 ft",
        duration: "Concentração, até 1 hora",
        description: "Você escolhe uma criatura à vista. Até o feitiço acabar, você causa 1d6 adicional de dano ao alvo sempre que acertá-lo com um ataque armado, e tem vantagem em testes de Sabedoria (Percepção ou Sobrevivência) para encontrá-lo. Se o alvo cair a 0 PV antes da magia expirar, você pode usar uma ação bônus em um turno posterior para marcar uma nova criatura.",
      },
      {
        name: "Curar Ferimentos (Cure Wounds)",
        level: "1º Nível (Evocação)",
        castingTime: "1 Ação",
        range: "Toque",
        duration: "Instantânea",
        description: "Uma criatura que você toca recupera um número de pontos de vida igual a 1d8 + seu modificador de habilidade de conjuração (Sabedoria +2 = 1d8 + 2 PV). Esta magia não possui efeito em mortos-vivos ou constructos.",
      },
    ],
  },

  progressionTimeline: [
    {
      level: 1,
      classTag: "Ladino 1",
      title: "Especialização, Ataque Furtivo & Gíria de Ladrão",
      description: "Especialização dobra o bônus de proficiência em Furtividade (+9) e Percepção (+8). Ataque Furtivo (Sneak Attack) confere 2d6 de dano adicional uma vez por turno quando há vantagem ou um aliado adjacente. Gíria de Ladrão (Thieves' Cant) permite comunicação em dialeto codificado.",
    },
    {
      level: 2,
      classTag: "Ladino 2",
      title: "Ação Ardilosa (Cunning Action)",
      description: "Permite realizar Disparada (Dash), Desengajar (Disengage) ou Esconder (Hide) como uma ação bônus em cada um dos seus turnos.",
    },
    {
      level: 3,
      classTag: "Ladino 3",
      title: "Faca da Alma (Soulknife) & Mira Firme",
      description: "Lâminas Psíquicas (Psychic Blades): manifesta lâminas de energia pura ao atacar (1d6 arremesso 60 ft e 1d4 como ação bônus). Poder Psiónico: 6 dados de Energia Psiónica d6 (Psi-Bolstered Knack para somar a perícias fracassadas; Sussurros Psíquicos / Psychic Whispers para telepatia com aliados). Mira Firme (Steady Aim - opcional Tasha): usa ação bônus sem mover-se para ganhar vantagem no próximo ataque.",
    },
    {
      level: 4,
      classTag: "Patrulheiro 1",
      title: "Inimigo Favorito & Explorador Nato",
      description: "Inimigo Favorito confere vantagens em testes para rastrear e recordar informações sobre alvos específicos. Explorador Nato garante navegação aprimorada e benefícios de marcha e sobrevivência.",
    },
    {
      level: 5,
      classTag: "Patrulheiro 2",
      title: "Estilo de Luta: Duelismo & Conjuração",
      description: "Estilo de Luta Duelismo concede +2 de dano em ataques corpo a corpo e com armas de uma mão. Acesso à conjuração de Patrulheiro (CD 13, Ataque Mágico +5, 2 espaços de 1º nível).",
    },
    {
      level: 0,
      classTag: "Talento Humano Variante",
      title: "Iniciado em Combate → Combate com Armas de Arremesso",
      description: "Garante o estilo Thrown Weapon Fighting: sacar uma arma arremessada como parte do próprio ataque e adicionar +2 nas rolagens de dano arremessadas (acumulando com Duelismo nas Lâminas Psíquicas).",
    },
  ] as TraitLevel[],

  // Seção 7: Equipamento
  equipment: {
    adventuringGear: [
      { name: "Couro batido", detail: "Armadura leve, CA 12 + DES (+3) = 15" },
      { name: "Espada curta", detail: "1d6 perfurante, acuidade, leve" },
      { name: "2 adagas", detail: "1d4 perfurante, acuidade, leve, arremesso 20/60" },
      { name: "Arco curto + 20 flechas", detail: "1d6 perfurante, munição 80/320" },
      { name: "Ferramentas de ladrão", detail: "Gazuas e chaves de mola especializadas" },
      { name: "Pacote de assaltante", detail: "Mochila, saco de dormir, pederneira, corda de 50 pés, rações" },
    ],
    nobleInheritance: [
      { name: "Roupas finas", detail: "Alfaiataria aristocrática de corte nobre de Valerium" },
      { name: "Anel de sinete", detail: "Brasão da Casa Bowlstoner gravado em ouro heráldico" },
      { name: "Pergaminho de linhagem", detail: "Árvore genealógica comprovando privilégios e títulos" },
      { name: "Bolsa com 25 po", detail: "Moedas de ouro gravadas com a efígie da Coroa" },
      { name: "Baralho", detail: "Cartas ilustradas para distração e apostas de salão" },
    ],
  },

  // Seção 8: Personalidade
  personality: {
    traits: "Fala com uma calma que desarma; trata estranhos como se fossem súditos — e se corrige.",
    ideals: "Nobreza obriga. Privilégio é dívida, não licença.",
    bonds: "A casa da família caiu; esconde as lâminas na mente porque foi desarmado em público uma vez.",
    flaws: "Subestima quem não tem nome de família.",
  },

  // Seção 9: Dossiê da Casa Bowlstoner
  houseDossier: {
    title: "Dossiê Histórico da Casa Bowlstoner",
    subtitle: "Registro Nobiliárquico Oficial // Manuscrito de Arquivo Restrito",
    paragraphs: [
      "Uma das famílias mais influentes de Valerium, com fortuna historicamente construída em vastas propriedades rurais, contratos militares de suprimento, alianças na corte real e relações privilegiadas cultivadas ao longo de sucessivas dinastias.",
      "A liturgia pública da casa é marcada por inflamados discursos sobre honra, patriotismo, disciplina e sacrifício supremo, sempre emoldurados por armaduras ornamentadas, estandartes dourados e águias imperiais estilizadas.",
      "E, por trás disso, a política sempre funcionou como um rendoso negócio hereditário: parentes estrategicamente alocados em cargos de fiscalização e comando, aliados agraciados com contratos de exclusividade altamente lucrativos, e qualquer tentativa de investigação ou auditoria imediatamente denunciada como conspiração dos inimigos da pátria para enfraquecer as instituições de Valerium.",
      "Episódios controversos acumulam-se nos arquivos da Coroa: contratos superfaturados de fornecimento para a Guarda Real, o misterioso desaparecimento de dotações orçamentárias destinadas à defesa das fronteiras setentrionais, e uma notável coleção particular de artefatos mágicos adquiridos em períodos de severa crise econômica e calamidade pública. A explicação oficial apresentada pela assessoria jurídica da família é sempre e invariavelmente a mesma: perseguição política implacável.",
    ],
  },

  // Seção 10: Jail Bowlstoner, o Patriarca
  patriarch: {
    name: "Jail Bowlstoner",
    role: "O Patriarca & Antigo Comandante",
    location: "Atualmente na Fortaleza dos Carandirus",
    biography: "Antigo comandante militar que passou décadas consolidando uma intrincada rede de lealdades e favores na alta nobreza. Nutre a convicção inabalável de que o reino carece de um líder enérgico, capaz de enquadrar inimigos internos e expurgar entraves burocráticos que apenas atrapalham os verdadeiros patriotas. Seu modelo de governança informal se resume a duas premissas inflexíveis: lealdade acima de tudo e obediência em primeiro lugar.",
    condemnation: "Condenado formalmente e encarcerado na célebre Fortaleza dos Carandirus por crimes contra a Fazenda Real e insubordinação de alta patente. A linhagem Bowlstoner jamais aceitou nem reconheceu a legitimidade da sentença judicial.",
    famousQuote: "Eu não estou preso. Estou temporariamente impedido de exercer minha liberdade por uma decisão manifestamente questionável.",
    statusClosing: "Mesmo detrás das grades fortificadas, Jail continua despachando cartas diárias, emitindo diretrizes políticas rigorosas e distribuindo ordens aos seus partidários. Seu maior projeto de vida é retornar triunfante ao poder; seu segundo maior projeto é convencer a corte e a plebe de que, em rigor, jamais perdeu o controle sobre ele.",
  },

  // Seção 11: Louis Lulo, o Contraponto
  counterpart: {
    name: "Louis Lulo",
    role: "Grande Companheiro dos Trabalhadores Livres e Presidente Honorário da Liga dos Ferreiros",
    origin: "Filho de trabalhadores das lendárias Sete Forjas",
    biography: "Ferreiro de ofício que despontou na história ao liderar a célebre Greve das Sete Forjas, paralisando a engrenagem militar de uma região inteira. Durante as semanas de paralisação, descobriu com assombro que seu verdadeiro dom não residia no manuseio da bigorna ou do fole, mas na capacidade hipnótica de convencer milhares de homens rudes de que compartilhavam o mesmo destino comum.",
    contradictions: "Com o passar dos anos e a consolidação do prestígio, passou a frequentar com assiduidade os mesmos banquetes senhoriais que antes denunciava da tribuna popular, instituiu comissões burocráticas para fiscalizar outras comissões previamente criadas, e refinou uma habilidade oratória impressionante para explicar detalhadamente por que concessões amargas e decisões impopulares eram estritamente indispensáveis para o bem coletivo dos próprios operários.",
    quality: "Extremamente carismático e de uma persuasão envolvente que desconcerta adversários letrados.",
    flaw: "Acredita piamente que quase todo problema estrutural do mundo se resolve com uma ampla aliança política, uma rodada de negociação interminável ou a instituição de uma nova comissão mista.",
    secretFear: "Tornar-se exatamente o tipo de governante arrogante e acomodado que passou a juventude combatendo nas praças públicas.",
    objective: "Impedir que a crise comercial deixe os trabalhadores sem emprego, alimentos e ferramentas de trabalho.",
    quirk: "Chamar praticamente qualquer pessoa pelo vocativo 'companheiro', inclusive nobres de linhagem que acabaram de desembainhar a espada para ameaçar sua vida.",
  },

  // Seção 12: Duas Reputações
  reputations: {
    flavium: {
      publicView: "Patriota, empresário, defensor da liberdade e representante legítimo dos interesses da família.",
      criticsView: "Um homem que nasceu a três passos do poder e passou a vida inteira tentando convencer os outros de que chegou lá sozinho.",
    },
    louis: {
      publicView: "Um homem do povo que enfrentou a nobreza e deu voz aos trabalhadores.",
      criticsView: "Um orador capaz de transformar qualquer problema em um discurso de quarenta minutos e qualquer discurso em uma oportunidade para convocar outra assembleia.",
    },
    jail: {
      publicView: "Antigo comandante militar e patriota injustiçado que dedicou a vida a defender as instituições e a ordem de Valerium.",
      criticsView: "Um chefe faccioso que transformou lealdade pessoal em moeda política e usou o exército como extensão do próprio clã.",
    },
  },

  // Seção 13: A Missão
  mission: {
    title: "A Crise de Asford & A Delegação Real",
    context: "O Ducado de Asford foi repentinamente derrubado, e a imposição de um severo embargo marítimo interrompeu as rotas comerciais vitais de Valerium. O bloqueio ameaça desencadear uma calamidade generalizada: escassez iminente de alimentos básicos, ligas metálicas para a indústria bélica, medicamentos fitoterápicos e componentes mágicos essenciais para as defesas do reino. A Coroa necessita fechar acordos urgentes com parceiros alternativos antes que o desabastecimento degenere em insurreição civil.",
    flaviumRole: "Representa os grandes detentores de capital, a oligarquia mercantil e os nobres investidores. Enxerga a comitiva como a oportunidade de ouro para arrebatar novos contratos de fornecimento com margens dilatadas e demonstrar à corte que a Casa Bowlstoner permanece imprescindível à soberania nacional.",
    louisRole: "Representa a massa de artífices, as guildas corporativas e as vilas operárias. Seu compromisso é garantir que os custos da reconstrução e os sacrifícios fiscais do embargo não sejam descarregados sobre as costas dos trabalhadores que já vivem no limiar da miséria.",
    compromise: "Diante do impasse absoluto e ciente de que nenhum tratado ganharia legitimidade sem o aval de ambos os polos de influência, o monarca expediu um decreto conjunto: Flávium nomeado Conselheiro Especial para Relações Comerciais, e Louis investido como Representante Extraordinário das Guildas e dos Povos Livres.",
    royalDecree: "Vossas Excelências deverão cooperar pela prosperidade de Valerium. Quaisquer conflitos pessoais deverão ser resolvidos fora dos horários oficiais da missão.",
    royalFootnote: "O rei evidentemente não conhece os dois muito bem.",
  },

  // Seção 14: Mesa de Negociação — Como a Dupla Funciona
  negotiationDynamics: [
    {
      situation: "Numa Negociação Oficial",
      flaviumAction: "Flávium busca a maior vantagem econômica possível e a apresenta publicamente como uma retumbante vitória histórica do reino.",
      louisAction: "Louis exige contrapartidas para os trabalhadores, acusa os comerciantes de ganância desenfreada e, minutos depois, pede permissão para examinar pessoalmente o vinho servido durante a reunião.",
    },
    {
      situation: "Diante de Pessoas Pobres",
      flaviumAction: "Flávium indaga prontamente quais recursos materiais seriam necessários e se a solução para a miséria poderia ser contratada de alguma empresa ligada a seus conhecidos.",
      louisAction: "Louis senta-se no chão, ouve longas histórias de sofrimento com semblante emocionado e promete levar com veemência os problemas à próxima mesa de debate.",
    },
    {
      situation: "Em Momento de Perigo Extremo",
      flaviumAction: "Flávium tenta de imediato negociar uma saída financeira vantajosa com os agressores.",
      louisAction: "Louis tenta discursar para convencer os inimigos armados de que lutar contra eles seria uma péssima decisão política para as classes trabalhadoras. Se nada funcionar, ambos olham para os outros aventureiros e esperam que alguém resolva o problema.",
    },
  ],

  // Seção 15: Diálogos
  dialogues: [
    {
      id: "dialogue-dinheiro",
      title: "I. Dinheiro",
      subtitle: "Durante a primeira conferência orçamentária da comitiva",
      lines: [
        { speaker: "flavium", text: "Precisamos pensar na sustentabilidade econômica do acordo." },
        { speaker: "louis", text: "Concordo. Comecemos pelos trabalhadores." },
        { speaker: "flavium", text: "Eu estava pensando nos investidores." },
        { speaker: "louis", text: "Eu sei, companheiro. Esse é o problema." },
      ],
    },
    {
      id: "dialogue-familia",
      title: "II. Família Bowlstoner",
      subtitle: "À margem dos arquivos da intendência de suprimentos",
      lines: [
        { speaker: "louis", text: "Flávium, você não acha estranho que todos os contratos militares terminem nas mãos dos seus parentes?" },
        { speaker: "flavium", text: "Não vejo o que há de estranho em uma família de competência comprovada." },
        { speaker: "louis", text: "E como comprovaram essa competência?" },
        { speaker: "flavium", text: "Por meio dos contratos militares." },
        { speaker: "louis", text: "Entendi. O contrato prova a competência e a competência garante o contrato." },
        { speaker: "flavium", text: "Finalmente estamos chegando a algum entendimento." },
      ],
    },
    {
      id: "dialogue-negociacao",
      title: "III. Negociação Fracassada",
      subtitle: "Após a ruptura das conversas diplomáticas com os emissários de Asford",
      lines: [
        { speaker: "flavium", text: "A proposta foi rejeitada por razões políticas." },
        { speaker: "louis", text: "Sua proposta oferecia dois barris de trigo por uma mina inteira." },
        { speaker: "flavium", text: "E ainda assim eles rejeitaram. É uma demonstração preocupante de radicalismo." },
      ],
    },
  ] as DialogueScene[],

  // Seção 16: Frases para Interpretar
  quotes: {
    analysisNote: "Flávium raramente mente de forma direta, prefere responder outra pergunta, mudar de assunto ou apresentar uma versão tecnicamente verdadeira e extremamente conveniente.",
    flaviumQuotes: [
      "Não estamos falando de privilégios. Estamos falando de vantagens competitivas historicamente consolidadas.",
      "Meu pai é um homem injustiçado. E, mesmo que não fosse, isso não vem ao caso.",
      "A família Bowlstoner jamais abandonará Valerium. Naturalmente, Valerium deverá reconhecer o custo disso.",
      "É curioso como chamam de corrupção quando somos nós, mas de articulação política quando são eles.",
      "Eu não sou contra o povo. Sou contra decisões tomadas por pessoas que não compreendem a complexidade dos interesses do povo.",
    ],
    louisQuotes: [
      "Companheiros, o reino é uma grande forja. Alguns trabalham diante do fogo, outros ficam com as armas prontas. E há aqueles que levam o crédito pela espada sem nunca terem segurado um martelo.",
      "A riqueza não cai do céu. Embora, conhecendo a nobreza, eu não duvide que tentem cobrar imposto até da chuva.",
      "O problema não é que os ricos tenham dinheiro. O problema é que sempre conseguem convencer os pobres de que precisam de mais.",
      "Eu não prometi resolver todos os problemas. Prometi criar as condições políticas para que pudéssemos formar uma comissão que estudasse a possibilidade de resolvê-los.",
      "Flávium, meu companheiro, você chama isso de liberdade econômica. O trabalhador chama de não ter dinheiro para comprar o jantar.",
    ],
  },

  // Seção 17: Tabela Comparativa Final
  comparativeTable: [
    {
      dimension: "Origem",
      flavium: "Nobreza influente",
      louis: "Família de trabalhadores",
    },
    {
      dimension: "Principal poder",
      flavium: "Dinheiro, contatos e influência",
      louis: "Carisma, alianças e apoio popular",
    },
    {
      dimension: "Objetivo",
      flavium: "Restaurar a Casa Bowlstoner",
      louis: "Defender os trabalhadores",
    },
    {
      dimension: "Maior virtude",
      flavium: "Ambição e capacidade de negociação",
      louis: "Empatia e capacidade de mobilização",
    },
    {
      dimension: "Maior defeito",
      flavium: "Nepotismo disfarçado de mérito",
      louis: "Populismo disfarçado de solução",
    },
    {
      dimension: "Relação com a verdade",
      flavium: "Versões convenientes",
      louis: "Narrativas politicamente úteis",
    },
    {
      dimension: "Maior medo",
      flavium: "Perder o prestígio familiar",
      louis: "Perder a confiança do povo",
    },
    {
      dimension: "Estilo de humor",
      flavium: "Arrogância e justificativas absurdas",
      louis: "Discursos, promessas e contradições",
    },
    {
      dimension: "Relação entre eles",
      flavium: "Aliado útil, inimigo ideológico",
      louis: "Adversário privilegiado, aliado necessário",
    },
  ] as ComparisonRow[],

  // Seção 18: O Segredo (fora das abas, lacrado)
  secret: {
    title: "Apêndice Lacrado // O Esquema do Embargo Comercial",
    classification: "SIGILO MÁXIMO // LACRE ARQUIVÍSTICO",
    summary: "A Casa Bowlstoner pode ter algo a ver com o embargo comercial de Asford, não por ter provocado a queda do ducado, mas porque alguém da família pode estar lucrando com a crise.",
    paragraphs: [
      "Flávium pode descobrir documentos indicando que um grupo de comerciantes ligado à sua família começou a comprar estoques de mercadorias pouco antes do embargo — se as rotas continuarem fechadas, essas mercadorias valerão uma fortuna.",
      "Louis, por outro lado, descobre que uma guilda de trabalhadores foi contratada para transportar cargas misteriosas durante a noite, sem saber quem era o verdadeiro destinatário.",
      "As duas pistas parecem independentes até que os registros mencionam a mesma organização comercial.",
      "Agora Flávium tem um problema: investigar pode limpar o nome da família, mas também revelar algo comprometedor. E Louis tem outro: expor o esquema pode derrubar comerciantes influentes, mas também prejudicar justamente os trabalhadores que dependem deles.",
      "Nenhum dos dois sabe se o outro será capaz de colocar os interesses de Valerium acima dos próprios.",
    ],
  },
};
