// Content data — centralized for easy admin/CMS editing later.
// Each text uses { cz, en } objects. Replace photo URLs by editing arrays.

// All garden/nature Unsplash IDs verified (see /tmp checks)
const PHOTOS = {
  hero:      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1800&q=80",
  garden1:   "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=1400&q=80", // herb garden
  garden2:   "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1400&q=80", // garden gazebo path
  garden3:   "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80", // misty forest
  garden4:   "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1400&q=80", // autumn forest
  garden5:   "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1400&q=80", // vineyard hills
  garden6:   "https://images.unsplash.com/photo-1521334884684-d80222895322?w=1400&q=80", // indoor plants/terrace
  garden7:   "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?w=1400&q=80", // peat pots seedlings
  garden8:   "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1400&q=80", // seedlings tray
  kids:      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80", // kids (vzdelavani)
  portrait:  "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=900&q=80",
};

export const HERO_BG = PHOTOS.hero;

export const nav = {
  portfolio: { cz: "Portfolio", en: "Portfolio" },
  nabidka:   { cz: "Nabídka", en: "Services" },
  about:     { cz: "O ateliéru", en: "About" },
  vzdelavani:{ cz: "Vzdělávání", en: "Education" },
  kontakt:   { cz: "Kontakt", en: "Contact" },
};

export const home = {
  eyebrow:  { cz: "Zahradní ateliér · Praha", en: "Garden studio · Prague" },
  headline: { cz: "Zahrady,<br>které <em>dýchají.</em>", en: "Gardens<br>that <em>breathe.</em>" },
  sub:      {
    cz: "Tvoříme prostory, kde se příroda setkává s architekturou. Každá zahrada je jedinečný příběh — navržený s péčí, realizovaný s precizností.",
    en: "We create spaces where nature meets architecture. Each garden is a unique story — designed with care, realised with precision."
  },
  cta:      { cz: "Zobrazit portfolio", en: "View portfolio" },
};

export const projects = [
  {
    id: 1,
    title: { cz: "Vila Průhonice", en: "Vila Průhonice" },
    location: { cz: "Praha — západ · 2024", en: "Prague West · 2024" },
    cover: PHOTOS.garden3,
    text: {
      cz: "Klidná rezidenční zahrada s důrazem na celoroční strukturu, přírodní materiály a jemné propojení domu s okolím.",
      en: "A calm residential garden with year-round structure, natural materials and a soft connection between house and surroundings."
    },
    gallery: [PHOTOS.garden3, PHOTOS.garden2, PHOTOS.garden1, PHOTOS.garden4, PHOTOS.garden7],
  },
  {
    id: 2,
    title: { cz: "Terasa nad Prahou", en: "Terrace above Prague" },
    location: { cz: "Vinohrady · 2024", en: "Vinohrady · 2024" },
    cover: PHOTOS.garden4,
    text: {
      cz: "Městská terasa navržená jako zelený pokoj s výhledem, měkkou výsadbou a jednoduchou údržbou.",
      en: "An urban terrace designed as a green room with a view, soft planting and easy maintenance."
    },
    gallery: [PHOTOS.garden8, PHOTOS.garden7, PHOTOS.garden4, PHOTOS.garden2, PHOTOS.garden1],
  },
  {
    id: 3,
    title: { cz: "Moderní záhon", en: "Modern flower bed" },
    location: { cz: "Brno · 2023", en: "Brno · 2023" },
    cover: PHOTOS.garden2,
    text: {
      cz: "Výsadba založená na rytmu, textuře a postupném proměňování během roku.",
      en: "Planting built on rhythm, texture and gradual seasonal change."
    },
    gallery: [PHOTOS.garden2, PHOTOS.garden9, PHOTOS.garden3, PHOTOS.garden1, PHOTOS.garden4],
  },
  {
    id: 4,
    title: { cz: "Lesní zahrada Sázava", en: "Forest garden Sázava" },
    location: { cz: "Střední Čechy · 2023", en: "Central Bohemia · 2023" },
    cover: PHOTOS.garden5,
    text: {
      cz: "Přírodně laděná zahrada na okraji lesa, která pracuje se stínem, kameny a měkkými přechody do krajiny.",
      en: "A natural garden on the edge of a forest, working with shade, stones and soft transitions to the landscape."
    },
    gallery: [PHOTOS.garden5, PHOTOS.garden7, PHOTOS.garden6, PHOTOS.garden3, PHOTOS.garden2],
  },
  {
    id: 5,
    title: { cz: "Zenová zahrada", en: "Zen garden" },
    location: { cz: "Praha — Dejvice · 2022", en: "Prague — Dejvice · 2022" },
    cover: PHOTOS.garden6,
    text: {
      cz: "Komorní zahrada pro odpočinek, kde hraje hlavní roli ticho, rytmus a detail.",
      en: "An intimate garden for rest, where silence, rhythm and detail play the main role."
    },
    gallery: [PHOTOS.garden7, PHOTOS.garden4, PHOTOS.garden2, PHOTOS.garden8, PHOTOS.garden1],
  },
  {
    id: 6,
    title: { cz: "Letní rezidence", en: "Summer residence" },
    location: { cz: "Průhonice · 2022", en: "Průhonice · 2022" },
    cover: PHOTOS.garden1,
    text: {
      cz: "Venkovní prostor pro letní život, stolování a dlouhé večery v zeleni.",
      en: "An outdoor space for summer living, dining and long evenings in greenery."
    },
    gallery: [PHOTOS.garden4, PHOTOS.garden3, PHOTOS.garden1, PHOTOS.garden8, PHOTOS.garden2],
  },
];

export const services = {
  pageEyebrow: { cz: "Jak pracujeme", en: "How we work" },
  pageTitle:   { cz: "Nabídka", en: "Services" },
  introTitle:  { cz: "Jasný proces.<br>Precizní výsledek.", en: "Clear process.<br>Precise outcome." },
  introText:   {
    cz: "Každá spolupráce prochází čtyřmi fázemi. Každou řídíme osobně — od prvního setkání až po finální realizaci. Zákazník vždy ví, kde se nachází a co ho čeká.",
    en: "Every collaboration moves through four phases. We guide each one personally — from first meeting through final realisation. You always know where you stand and what comes next."
  },
  ctaTitle: { cz: "Rádi byste věděli<br><em>co vás to bude stát?</em>", en: "Wondering<br><em>what it might cost?</em>" },
  ctaBtn:   { cz: "Nezávazná konzultace", en: "Free consultation" },
};

export const processList = [
  {
    num: "01",
    sub:   { cz: "Úvod", en: "Opening" },
    title: { cz: "Úvodní konzultace", en: "Initial consultation" },
    desc:  {
      cz: "Setkáme se přímo u vás. Prohlédneme pozemek, popovídáme si o vašich přáních, životním stylu i o tom, jak zahradu skutečně používáte. Bez spěchu, bez formulářů.",
      en: "We meet at your property. We walk the land, talk about your wishes, your lifestyle and how you actually use the garden. Unhurried, informal."
    },
    detail: { cz: "Délka: cca 90 minut · Na místě · Zdarma pro projekty nad 500 000 Kč", en: "Duration: approx 90 minutes · On site · Complimentary for larger projects" },
    img: PHOTOS.garden2,
  },
  {
    num: "02",
    sub:   { cz: "Vize", en: "Vision" },
    title: { cz: "Návrh konceptu", en: "Concept design" },
    desc:  {
      cz: "Vytvoříme vizuální příběh vaší zahrady — nálady, materiály, kompozice. Pracujeme s moodboardy, skicami a referenčními fotografiemi.",
      en: "We create a visual story for your garden — moods, materials, compositions. We work with moodboards, sketches and references."
    },
    detail: { cz: "Prezentace konceptu · Dvě kola revizí · Výstup: PDF + fyzická prezentace", en: "Concept presentation · Two revision rounds · Output: PDF + physical presentation" },
    img: PHOTOS.garden3,
  },
  {
    num: "03",
    sub:   { cz: "Projekt", en: "Project" },
    title: { cz: "Detailní projekt", en: "Detailed design" },
    desc:  {
      cz: "Technická dokumentace pro realizaci: půdorysy, řezy, výsadba, osvětlení, závlaha, zpevněné plochy. Výběr rostlin s ohledem na lokalitu, sezónnost a údržbu.",
      en: "Technical documentation for realisation: plans, sections, planting, lighting, irrigation, hard landscaping."
    },
    detail: { cz: "Kompletní dokumentace · Seznam materiálů a rostlin · Podklady pro dodavatele", en: "Full documentation · Plant and material schedules · Tender documentation" },
    img: PHOTOS.garden4,
  },
  {
    num: "04",
    sub:   { cz: "Realizace", en: "Realisation" },
    title: { cz: "Spolupráce při realizaci", en: "Realisation support" },
    desc:  {
      cz: "Jsme přítomni při klíčových fázích stavby. Komunikujeme s dodavateli, dohlížíme na kvalitu a řešíme situace na místě. Vaše zahrada vzniká přesně tak, jak byla navržena.",
      en: "We are present at key construction stages. We oversee quality and handle on-site decisions. Your garden takes shape exactly as designed."
    },
    detail: { cz: "Autorský dozor · Kontrolní dny · Závěrečná přejímka · Péče po realizaci", en: "Design supervision · Site visits · Final handover · Aftercare" },
    img: PHOTOS.garden7,
  },
];

export const about = {
  eyebrow: { cz: "Kdo jsme", en: "Who we are" },
  title:   { cz: "O ateliéru", en: "About" },
  hero:    PHOTOS.garden1,
  portrait:PHOTOS.portrait,
  caption: { cz: "Zakladatelka ateliéru · Praha", en: "Studio founder · Prague" },
  h2:      { cz: "Zahrada není<br>výsledek. Je to<br>živý organismus.", en: "A garden isn't<br>an outcome. It is<br>a living organism." },
  highlight:{ cz: "„Věřím, že venkovní prostor může změnit způsob, jakým žijeme. Mění náladu, rytmus dne i to, jak se cítíme doma.“", en: "“I believe outdoor space can change the way we live. It shifts mood, daily rhythm, and how we feel at home.”" },
  body1:   {
    cz: "Atelier Venku jsem založila po více než deseti letech práce v krajinné architektuře. Pracovala jsem na projektech od soukromých rezidencí po veřejné parky, v Čechách i v zahraničí. Vždy mě ale nejvíce přitahoval lidský rozměr práce — setkání s klientem, porozumění jeho každodennímu životu.",
    en: "I founded Atelier Venku after more than ten years in landscape architecture. I worked on projects ranging from private residences to public parks, in the Czech Republic and abroad. What always drew me most was the human dimension — meeting a client, understanding their everyday life."
  },
  body2: {
    cz: "Pracuji s malým týmem, ve kterém si každý projekt od začátku do konce podržuji pod osobní záštitou. Nevytvářím šablony. Nevyrábím zahrady „ve stylu“. Hledám to, co je pro konkrétní místo a konkrétního člověka to pravé.",
    en: "I work with a small team, personally overseeing each project from beginning to end. I don't create templates. I don't produce gardens 'in a style'. I look for what is right for each specific place and each specific person."
  },
  philosophyLabel: { cz: "Filozofie", en: "Philosophy" },
  philosophyTitle: { cz: "Méně, ale lépe.<br>Pomaleji, ale déle.", en: "Less, but better.<br>Slower, but longer." },
  philosophyText:  {
    cz: "Navrhujeme zahrady, které nespěchají. Rostliny volíme tak, aby byly krásné v každém ročním období — a aby vydržely bez zbytečné péče. Materiály, které stárnou důstojně. Prostory, které se s vámi mění.",
    en: "We design gardens that don't rush. We select plants to be beautiful in every season — and to endure without excessive maintenance. Materials that age with dignity. Spaces that change as you change."
  },
};

export const vzdelavani = {
  badge:   { cz: "Venku · vzdělávání", en: "Outside · education" },
  title:   { cz: "Vzdělávání<br>venku a hravě.", en: "Education<br>outside, playfully." },
  sub:     {
    cz: "Programy a materiály pro děti, školy i rodiče — citlivě, hravě a pořád v duchu přírody.",
    en: "Programmes and materials for children, schools and parents — gentle, playful and always close to nature."
  },
  introTitle: { cz: "Děti se učí lépe,<br>když mají hlínu pod nehty.", en: "Children learn better<br>with soil under their nails." },
  introText:  {
    cz: "Naše programy propojují zahradničení, přírodovědu a kreativní myšlení. Jsou navrženy tak, aby byly zábavné i smysluplné — pro děti ve věku 4–14 let.",
    en: "Our programmes blend gardening, nature science and creative thinking. They're designed to be fun and meaningful — for children aged 4–14."
  },
  programs: [
    {
      icon: "leaf",
      title: { cz: "Výukové programy", en: "Educational programmes" },
      text:  { cz: "Interaktivní lekce přímo v zahradě. Pro mateřské školy, základní školy a dětské skupiny. Vždy šité na míru věku a prostoru.", en: "Interactive lessons directly in the garden. For kindergartens, schools and children's groups. Always tailored." },
      tag:   { cz: "4–14 let", en: "ages 4–14" },
    },
    {
      icon: "book",
      title: { cz: "E-booky & pracovní listy", en: "E-books & worksheets" },
      text:  { cz: "Digitální materiály pro domácí vzdělávání i výuku. Přehledné, krásně ilustrované a prakticky zaměřené.", en: "Digital materials for home learning and class. Clear, beautifully illustrated, practical." },
      tag:   { cz: "PDF ke stažení", en: "PDF download" },
    },
    {
      icon: "house",
      title: { cz: "Zahradní dílny", en: "Garden workshops" },
      text:  { cz: "Sezónní workshopy pro rodiny. Výsadba, kompostování, pozorování přírody. Vše v klidném prostředí zahrady.", en: "Seasonal workshops for families. Planting, composting, observing nature. In a calm garden setting." },
      tag:   { cz: "Sezónně", en: "Seasonal" },
    },
  ],
  ctaTitle: { cz: "Zájem o spolupráci?", en: "Interested in collaborating?" },
  ctaText:  { cz: "Napište nám — rádi připravíme program přímo pro vaši třídu, skupinu nebo rodinu.", en: "Write to us — we'd love to prepare a programme for your class, group or family." },
  ctaBtn:   { cz: "Napište nám", en: "Write to us" },
};

export const kontakt = {
  eyebrow: { cz: "Začněme", en: "Let's begin" },
  title:   { cz: "Kontakt", en: "Contact" },
  h2:      { cz: "Domluvme si<br>konzultaci.", en: "Let's arrange<br>a consultation." },
  intro:   { cz: "Rádi si s vámi sedneme a popovídáme o vašem prostoru. Bez závazků. Bez formulářů. Stačí napsat nebo zavolat.", en: "We'd love to sit down with you and talk about your space. No obligations. No forms. Just write or call." },
  email:   "ahoj@ateliervenku.cz",
  phone:   "+420 777 123 456",
  studio:  { cz: "Praha — Žižkov", en: "Prague — Žižkov" },
  instagram:"@ateliervenku",
  formLabels: {
    name:    { cz: "Vaše jméno", en: "Your name" },
    email:   { cz: "E-mail", en: "Email" },
    topic:   { cz: "Co vás přivádí?", en: "What brings you here?" },
    message: { cz: "Zpráva (volitelné)", en: "Message (optional)" },
    send:    { cz: "Odeslat", en: "Send" },
    sending: { cz: "Odesílám…", en: "Sending…" },
    sent:    { cz: "Děkujeme. Ozveme se vám brzy.", en: "Thank you. We'll be in touch soon." },
  },
  topicOptions: [
    { value: "", label: { cz: "Vyberte prosím…", en: "Please select…" } },
    { value: "new",   label: { cz: "Nová zahrada", en: "New garden" } },
    { value: "reno",  label: { cz: "Rekonstrukce zahrady", en: "Garden renovation" } },
    { value: "terrace",label:{ cz: "Terasa / střešní zahrada", en: "Terrace / roof garden" } },
    { value: "other", label: { cz: "Jiné", en: "Other" } },
  ],
};
