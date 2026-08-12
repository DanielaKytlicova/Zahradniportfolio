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
    gallery: [PHOTOS.garden2, PHOTOS.garden7, PHOTOS.garden3, PHOTOS.garden1, PHOTOS.garden4],
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

/* ============================================================
   VZDĚLÁVÁNÍ — nový systém (kategorie, programy, workshopy)
   Ukládá se pod klíčem `edu`, aby nekolidoval s dřívějším
   obsahem. Frontend zobrazuje pouze publikované položky
   a needuplňuje prázdná pole.
   ============================================================ */
const EDU_IMG = {
  hero:      "https://images.unsplash.com/photo-1606474226448-4aa808468efc?w=1600&q=80",
  kinder:    "https://images.unsplash.com/photo-1751158112093-b736fe920027?w=1200&q=80",
  forestPath:"https://images.unsplash.com/photo-1597201423947-3e0028337902?w=1200&q=80",
  forest:    "https://images.unsplash.com/photo-1566231270035-0aaca1fd2bbf?w=1200&q=80",
  nest:      "https://images.unsplash.com/photo-1772401750361-0a9baf3e45de?w=1200&q=80",
  observe:   "https://images.unsplash.com/photo-1565964249053-7f30b7cdba09?w=1200&q=80",
  mountains: "https://images.unsplash.com/photo-1764093260290-161c6f370479?w=1400&q=80",
  wreath:    "https://images.unsplash.com/photo-1612528910395-0297ec160cc8?w=1200&q=80",
  wreathMake:"https://images.unsplash.com/photo-1608308309134-f46435264ba8?w=1200&q=80",
  eduCat:    "https://images.unsplash.com/photo-1505635725851-c2cfe9e29112?w=1200&q=80",
};

const contactCta = () => ({
  id: "cta-" + Math.random().toString(36).slice(2, 8),
  label: { cz: "Napsat poptávku", en: "Send an enquiry" },
  type: "internal",
  value: "/kontakt",
  order: 1,
});

export const edu = {
  hero: {
    badge:   { cz: "Venku · vzdělávání", en: "Outdoors · education" },
    title:   { cz: "Poznávej přírodu<br>všemi smysly.", en: "Explore nature<br>with all your senses." },
    sub:     {
      cz: "Zážitkové programy, školy v přírodě a workshopy pro školky, školy i rodiny — venku, hravě a s ohledem k přírodě.",
      en: "Experiential programmes, schools in nature and workshops for kindergartens, schools and families — outdoors, playful and close to nature.",
    },
    bgImage: EDU_IMG.hero,
  },
  intro: {
    label: { cz: "Co nabízíme", en: "What we offer" },
    title: { cz: "Programy, které<br>probouzejí zvídavost.", en: "Programmes that<br>awaken curiosity." },
    text:  {
      cz: "Naše programy podporují aktivní pobyt v přírodě a přímé prožitky dětí. Rozvíjejí motoriku, smysly a spolupráci — a zároveň budují vztah k přírodě a ekologické povědomí.",
      en: "Our programmes support active time in nature and children's direct experiences. They develop motor skills, senses and cooperation — while building a relationship with nature and ecological awareness.",
    },
  },
  where: {
    label: { cz: "Kde programy probíhají", en: "Where programmes take place" },
    title: { cz: "U vás, nebo venku v přírodě.", en: "At your place, or out in nature." },
    intro: {
      cz: "Programy realizujeme buď přímo u vás ve škole či školce, nebo vyrazíme s dětmi ven — do lesa, k vodě, na louku.",
      en: "We run the programmes either directly at your school or kindergarten, or we head outdoors with the children — to the forest, water or meadow.",
    },
    atSchool: {
      title: { cz: "Přijedeme za vámi", en: "We come to you" },
      text:  { cz: "Program uskutečníme přímo ve vaší škole, školce nebo na vámi vybraném místě. Ideální, když nechcete nikam cestovat.", en: "We deliver the programme directly at your school, kindergarten or a place of your choice. Ideal when you'd rather not travel." },
      image: EDU_IMG.kinder,
    },
    outdoors: {
      title: { cz: "Vyrazíme do přírody", en: "Out into nature" },
      text:  { cz: "Sejdeme se venku — v lese v okolí Prahy nebo na domluveném místě. Pro skupiny z jiných regionů domluvíme lokalitu individuálně.", en: "We meet outside — in forests around Prague or an agreed location. For groups from other regions we arrange the location individually." },
      image: EDU_IMG.forestPath,
    },
  },
  offer: {
    label: { cz: "Nabídka programů", en: "Our programmes" },
    title: { cz: "Vyberte si program", en: "Choose a programme" },
    text:  { cz: "Každý program přizpůsobíme věku dětí i vašim přáním — tématem, délkou i místem.", en: "We tailor each programme to the children's age and your wishes — theme, length and place." },
  },
  benefits: {
    title: { cz: "Každý program dětem pomůže:", en: "Every programme helps children:" },
    items: [
      { cz: "Objevit kouzlo přírody", en: "Discover the magic of nature" },
      { cz: "Zapojit smysly a rozvíjet motoriku", en: "Engage the senses and develop motor skills" },
      { cz: "Rozvíjet týmovou spolupráci", en: "Develop teamwork" },
      { cz: "Podpořit kreativitu a samostatnost", en: "Support creativity and independence" },
      { cz: "Získat praktické dovednosti", en: "Gain practical skills" },
      { cz: "Zvýšit povědomí o ekologii a udržitelnosti", en: "Raise awareness of ecology and sustainability" },
    ],
  },
  collaboration: {
    title:    { cz: "Máte zájem o spolupráci?", en: "Interested in collaborating?" },
    text:     { cz: "Napište mi — ráda připravím program přímo pro vaši třídu nebo skupinu.", en: "Write to me — I'll gladly prepare a programme for your class or group." },
    btnLabel: { cz: "Napište mi", en: "Write to me" },
    btnType:  "internal",
    btnValue: "/kontakt",
  },
  materials: [],
  categories: [
    { id: "cat-edu",      slug: "edukacni-programy", name: { cz: "Edukační programy", en: "Educational programmes" }, description: { cz: "Interaktivní zážitkové programy v přírodě pro školky a školy.", en: "Interactive experiential programmes in nature for kindergartens and schools." }, image: EDU_IMG.eduCat,   order: 1, published: true },
    { id: "cat-skola",    slug: "skoly-v-prirode",   name: { cz: "Školy v přírodě",   en: "Schools in nature" },       description: { cz: "Několikadenní pobyty, kde se příroda stane učebnou i hřištěm.", en: "Multi-day stays where nature becomes a classroom and a playground." }, image: EDU_IMG.mountains, order: 2, published: true },
    { id: "cat-workshop", slug: "workshopy",         name: { cz: "Workshopy",          en: "Workshops" },               description: { cz: "Tvořivé dílny pro rodiny, přátele i firmy — sezónně laděné.", en: "Creative workshops for families, friends and companies — seasonal." }, image: EDU_IMG.wreath,    order: 3, published: true },
  ],
  programs: [
    {
      id: "prog-tajemstvi", slug: "tajemstvi-ziveho-lesa", categoryId: "cat-edu",
      status: "published", featured: true, order: 1, publishFrom: "", publishTo: "",
      title: { cz: "Tajemství živého lesa", en: "Secrets of the living forest" },
      perex: { cz: "Interaktivní cesta lesem, která probouzí zvídavost a smyslové vnímání přírody.", en: "An interactive forest journey awakening curiosity and sensory perception of nature." },
      mainImage: EDU_IMG.forest, gallery: [EDU_IMG.forestPath],
      mainText: {
        cz: "Interaktivní cesta lesem, která rozvíjí dětskou zvídavost a pozornost. Děti se učí rozpoznávat stromy a živočichy, poznávají jejich životní cykly a vzájemné propojení. Program klade důraz na aktivní pohyb a smyslové vnímání přírody.",
        en: "An interactive forest journey developing children's curiosity and attention. Children learn to recognise trees and animals, discover their life cycles and interconnections. The programme emphasises active movement and sensory perception of nature.",
      },
      targetGroup: { cz: "Děti MŠ, 1.–3. třída ZŠ", en: "Kindergarten, grades 1–3" },
      location:    { cz: "Lesy v okolí Prahy (pro jiné regiony lokalita dle domluvy)", en: "Forests around Prague (other regions by arrangement)" },
      duration:    { cz: "3 hodiny", en: "3 hours" },
      capacity:    { cz: "15–25 dětí", en: "15–25 children" },
      age:         { cz: "MŠ, 1.–3. třída ZŠ", en: "Kindergarten, grades 1–3" },
      price:       { cz: "Dle lokality a počtu účastníků — napište si o kalkulaci.", en: "Depends on location and group size — ask for a quote." },
      season:      { cz: "Celoročně", en: "Year-round" },
      materials:   { cz: "Veškeré pomůcky zajišťují lektoři.", en: "All materials are provided by the instructors." },
      blocks: [
        { id: "b-taj-1", type: "text", heading: { cz: "Na co se společně podíváme?", en: "What will we explore together?" }, text: { cz: "Co se stane, když z lesa zmizí stromy? Jak se les brání před škůdci? Jak les dýchá? A kde je vlastně nejšťastnější?", en: "What happens when the trees disappear? How does the forest defend itself? How does it breathe? And where is it happiest?" }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-vajicko", slug: "o-vajicku-se-vsim-vsudy", categoryId: "cat-edu",
      status: "published", featured: true, order: 2, publishFrom: "", publishTo: "",
      title: { cz: "O vajíčku se vším všudy", en: "All about the egg" },
      perex: { cz: "Objevování tajemství ptačích vajíček — od hnízda až po to, co se skrývá uvnitř.", en: "Discovering the secrets of birds' eggs — from the nest to what hides inside." },
      mainImage: EDU_IMG.nest, gallery: [],
      mainText: {
        cz: "Edukační cesta plná objevování tajemství ptačích vajíček. Děti se seznámí s různými druhy ptáků, jejich hnízdy a způsoby kladení vajíček. Program podporuje rozvoj pozornosti, paměti a logického myšlení.",
        en: "An educational journey full of discovering the secrets of birds' eggs. Children get to know different bird species, their nests and ways of laying eggs. The programme supports attention, memory and logical thinking.",
      },
      targetGroup: { cz: "Děti MŠ, 1.–3. třída ZŠ", en: "Kindergarten, grades 1–3" },
      location:    { cz: "Lesy v okolí Prahy (pro jiné regiony lokalita dle domluvy)", en: "Forests around Prague (other regions by arrangement)" },
      duration:    { cz: "3 hodiny", en: "3 hours" },
      capacity:    { cz: "15–25 dětí", en: "15–25 children" },
      age:         { cz: "MŠ, 1.–3. třída ZŠ", en: "Kindergarten, grades 1–3" },
      price:       { cz: "Dle lokality a počtu účastníků — napište si o kalkulaci.", en: "Depends on location and group size — ask for a quote." },
      season:      { cz: "Jaro", en: "Spring" },
      materials:   { cz: "Veškeré pomůcky zajišťují lektoři.", en: "All materials are provided by the instructors." },
      blocks: [
        { id: "b-vaj-1", type: "text", heading: { cz: "Na co se společně podíváme?", en: "What will we explore together?" }, text: { cz: "Kde bere vajíčko svou sílu? Kdo snáší ta nejmenší vajíčka? Proč mají ptáci tak pevné skořápky? A co se děje uvnitř vajíčka?", en: "Where does an egg get its strength? Who lays the smallest eggs? Why are shells so strong? And what happens inside?" }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-dolesa", slug: "do-lesa-na-pozorovanou", categoryId: "cat-edu",
      status: "published", featured: true, order: 3, publishFrom: "", publishTo: "",
      title: { cz: "Do lesa na pozorovanou", en: "Into the forest to observe" },
      perex: { cz: "Program zaměřený na pozorování, poslech a vnímání detailů, které se v lese právě dějí.", en: "A programme focused on observing, listening and noticing the details happening in the forest right now." },
      mainImage: EDU_IMG.observe, gallery: [],
      mainText: {
        cz: "Program zaměřený na rozvoj pozorovací schopnosti a vnímání detailů v přírodě. Děti se učí rozpoznávat stopy zvířat, poslouchat zvuky lesa a vnímat jeho vůně. Podporuje logické myšlení a schopnost propojovat přírodní jevy.",
        en: "A programme focused on observation skills and noticing detail in nature. Children learn to recognise animal tracks, listen to the sounds of the forest and sense its scents. It supports logical thinking and connecting natural phenomena.",
      },
      targetGroup: { cz: "1.–5. třída ZŠ", en: "Grades 1–5" },
      location:    { cz: "Lesy v okolí Prahy (pro jiné regiony lokalita dle domluvy)", en: "Forests around Prague (other regions by arrangement)" },
      duration:    { cz: "3 hodiny", en: "3 hours" },
      capacity:    { cz: "15–25 dětí", en: "15–25 children" },
      age:         { cz: "1.–5. třída ZŠ", en: "Grades 1–5" },
      price:       { cz: "Dle lokality a počtu účastníků — napište si o kalkulaci.", en: "Depends on location and group size — ask for a quote." },
      season:      { cz: "Celoročně", en: "Year-round" },
      materials:   { cz: "Veškeré pomůcky zajišťují lektoři.", en: "All materials are provided by the instructors." },
      blocks: [
        { id: "b-dol-1", type: "text", heading: { cz: "Na co se společně podíváme?", en: "What will we explore together?" }, text: { cz: "Co se právě teď děje v lese? Kdo se tu schovává? Co slyšíš, co cítíš, co vidíš? A kdo tu vlastně žije?", en: "What is happening in the forest right now? Who is hiding here? What can you hear, smell, see? And who lives here?" }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-skola-liberec", slug: "skola-v-prirode-liberec", categoryId: "cat-skola",
      status: "published", featured: true, order: 1, publishFrom: "", publishTo: "",
      title: { cz: "Škola v přírodě v Liberci", en: "School in nature in Liberec" },
      perex: { cz: "Několik dní, během kterých se příroda stane dětem učebnou, hřištěm i domovem.", en: "A few days in which nature becomes the children's classroom, playground and home." },
      mainImage: EDU_IMG.mountains, gallery: [EDU_IMG.forestPath, EDU_IMG.forest],
      mainText: {
        cz: "Škola v přírodě nabízí dětem možnost prožít několik dní v objetí přírody. Program je zaměřen na rozvoj samostatnosti, spolupráce a zodpovědnosti. Děti pracují s přírodními materiály, objevují krásy okolní krajiny a rozvíjejí smyslové vnímání. Programy vedeme zážitkovou formou s důrazem na aktivní zapojení dětí.",
        en: "A school in nature gives children the chance to spend several days embraced by nature. The programme focuses on independence, cooperation and responsibility. Children work with natural materials, discover the surrounding landscape and develop their senses. We lead the programmes experientially, with an emphasis on active involvement.",
      },
      targetGroup: { cz: "Děti MŠ, 1.–5. třída ZŠ", en: "Kindergarten, grades 1–5" },
      location:    { cz: "Liberec a okolí", en: "Liberec and surroundings" },
      duration:    { cz: "1 až 5 dní", en: "1 to 5 days" },
      capacity:    { cz: "25–30 dětí na den", en: "25–30 children per day" },
      age:         { cz: "MŠ, 1.–5. třída ZŠ", en: "Kindergarten, grades 1–5" },
      price:       { cz: "Dle délky pobytu a počtu účastníků — napište si o kalkulaci.", en: "Depends on length of stay and group size — ask for a quote." },
      season:      { cz: "Celoročně", en: "Year-round" },
      materials:   { cz: "Veškeré pomůcky zajišťují lektoři.", en: "All materials are provided by the instructors." },
      blocks: [
        { id: "b-sk-1", type: "text", heading: { cz: "Program přizpůsobíme vašemu přání", en: "We adapt the programme to your wishes" }, text: { cz: "Chcete poznat les trochu jinak? Dozvědět se víc o zvířatech nebo o bylinkách? Rádi vyjdeme vstříc a přizpůsobíme program vašim představám.", en: "Want to get to know the forest differently? Learn more about animals or herbs? We'll happily adapt the programme to your ideas." }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-venec-miru", slug: "vazani-adventnich-vencu-na-miru", categoryId: "cat-workshop",
      status: "published", featured: true, order: 1, publishFrom: "", publishTo: "",
      title: { cz: "Vázání adventních věnců na míru", en: "Custom advent wreath making" },
      perex: { cz: "Vyrobte si vlastní originální adventní věnec z jehličí a přírodních materiálů.", en: "Make your own original advent wreath from conifer and natural materials." },
      mainImage: EDU_IMG.wreath, gallery: [EDU_IMG.wreathMake],
      mainText: {
        cz: "Vytvořte si svůj vlastní originální adventní věnec a zútulněte si domov. Naše lektorky vám poradí s výběrem materiálů i technikou výroby. Přijďte si užít předvánoční atmosféru a odnést si domů nejen krásný věnec, ale i skvělé vzpomínky.",
        en: "Create your own original advent wreath and make your home cosy. Our instructors will advise on materials and technique. Come and enjoy the pre-Christmas atmosphere and take home not only a beautiful wreath but also lovely memories.",
      },
      targetGroup: { cz: "Jednotlivci, rodiny, skupiny", en: "Individuals, families, groups" },
      location:    { cz: "Atelier Venku v Praze", en: "Atelier Venku in Prague" },
      duration:    { cz: "3 hodiny", en: "3 hours" },
      capacity:    { cz: "8–10 osob", en: "8–10 people" },
      age:         { cz: "Od 8 let", en: "Ages 8+" },
      price:       { cz: "Individuální dle zvolených materiálů.", en: "Individual, based on chosen materials." },
      season:      { cz: "Podzim, zima", en: "Autumn, winter" },
      materials:   { cz: "Korpus věnce, jehličí, větvičky, šišky, skořice, sušené ovoce a další přírodní materiály jsou k dispozici.", en: "Wreath base, conifer, twigs, cones, cinnamon, dried fruit and other natural materials are provided." },
      blocks: [],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-venec-chaloupka", slug: "vazani-adventnich-vencu-ceska-chaloupka", categoryId: "cat-workshop",
      status: "published", featured: true, order: 2, publishFrom: "", publishTo: "",
      title: { cz: "Vázání adventních věnců na České chaloupce", en: "Advent wreath making at the Czech cottage" },
      perex: { cz: "Výroba adventního věnce v příjemném prostředí tradiční české chaloupky.", en: "Making an advent wreath in the pleasant setting of a traditional Czech cottage." },
      mainImage: EDU_IMG.wreathMake, gallery: [EDU_IMG.wreath],
      mainText: {
        cz: "Prožijte s námi předvánoční atmosféru v tradičním českém prostředí. Naučíte se vyrobit adventní věnec a odnesete si domů nejen krásnou dekoraci, ale i nezapomenutelné zážitky.",
        en: "Experience the pre-Christmas atmosphere with us in a traditional Czech setting. You'll learn to make an advent wreath and take home not only a beautiful decoration but also unforgettable memories.",
      },
      targetGroup: { cz: "Rodiny, skupiny přátel, firmy", en: "Families, groups of friends, companies" },
      location:    { cz: "Česká chaloupka v přírodě", en: "Czech cottage in nature" },
      duration:    { cz: "3 hodiny", en: "3 hours" },
      capacity:    { cz: "10–15 osob", en: "10–15 people" },
      age:         { cz: "Od 8 let", en: "Ages 8+" },
      price:       { cz: "Individuální dle zvolených materiálů.", en: "Individual, based on chosen materials." },
      season:      { cz: "Podzim, zima", en: "Autumn, winter" },
      materials:   { cz: "Korpus věnce, jehličí, větvičky, šišky, skořice, sušené ovoce a další přírodní materiály jsou k dispozici.", en: "Wreath base, conifer, twigs, cones, cinnamon, dried fruit and other natural materials are provided." },
      blocks: [
        { id: "b-ch-1", type: "text", heading: { cz: "Občerstvení", en: "Refreshments" }, text: { cz: "Na přání můžeme zajistit i drobné občerstvení.", en: "On request we can also arrange light refreshments." }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
  ],
};
