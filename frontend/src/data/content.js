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
      cz: "Edukační programy probíhají buď přímo u vás ve škole či školce, nebo venku v přírodě. Záleží na programu, který si vyberete.",
      en: "Educational programmes take place either directly at your school or kindergarten, or outdoors in nature, depending on the programme you choose.",
    },
    atSchool: {
      title: { cz: "Přijedeme za vámi", en: "We come to you" },
      text:  { cz: "S vybraným programem přijedu přímo do vaší školy nebo školky a přivezu s sebou vše potřebné.", en: "I come directly to your school or kindergarten with the selected programme and bring everything needed." },
      image: EDU_IMG.kinder,
    },
    outdoors: {
      title: { cz: "Vyrazíme do přírody", en: "Out into nature" },
      text:  { cz: "Za venkovním programem přijedete vy za mnou, přímo do přírody. Programy probíhají v Liberci–Rudolfově. Autobusová linka č. 18 vás doveze na zastávku Rudolfov (u České chalupy), odkud se společně vydáme za přírodním dobrodružstvím.", en: "For outdoor programmes, you come to me in nature in Liberec–Rudolfov. Bus no. 18 goes to Rudolfov (u České chalupy), where our outdoor adventure begins." },
      image: EDU_IMG.forestPath,
    },
  },
  offer: {
    label: { cz: "Nabídka programů", en: "Our programmes" },
    title: { cz: "Vyberte si program", en: "Choose a programme" },
    text:  { cz: "Každý program přizpůsobíme věku dětí i vašim přáním — tématem, délkou i místem.", en: "We tailor each programme to the children's age and your wishes — theme, length and place." },
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
      perex: { cz: "Co by se stalo, kdyby z lesa zmizely houby, housenky nebo staré stromy? Program dětem představuje princip biodiverzity a vzájemné propojenosti organismů v lese.", en: "What would happen if fungi, caterpillars or old trees disappeared from the forest? The programme introduces biodiversity and the interconnectedness of forest organisms." },
      mainImage: EDU_IMG.forest, gallery: [EDU_IMG.forestPath],
      mainText: {
        cz: "Co by se stalo, kdyby z lesa zmizely houby? Vadilo by něčemu, kdyby v něm nebyly housenky? A potřebuje les opravdu staré stromy, spadané listí nebo drobné živočichy? Vydejme se společně do lesa, ve kterém má každý své místo. Prostřednictvím příběhu, her, pozorování a badatelských aktivit děti postupně odhalí, že rostliny, živočichové, houby i další organismy nežijí každý sám za sebe, ale jsou propojeni spletitou sítí vztahů. Program dětem představuje princip biodiverzity a vzájemné propojenosti organismů a vede je k vnímání přírody jako pestrého celku, ve kterém může mít význam i to, co na první pohled vypadá nepotřebně.",
        en: "An interactive forest journey developing children's curiosity and attention. Children learn to recognise trees and animals, discover their life cycles and interconnections. The programme emphasises active movement and sensory perception of nature.",
      },
      targetGroup: { cz: "Děti MŠ a I. st. ZŠ", en: "Kindergarten and primary school children" },
      location:    { cz: "Přímo u vás ve škole; v průběhu jednoho dne minimálně pro 3 třídy/skupiny.", en: "At your school; at least 3 classes/groups during one day." },
      duration:    { cz: "45 minut pro každou třídu", en: "45 minutes per class" },
      capacity:    { cz: "", en: "" },
      age:         { cz: "MŠ a I. st. ZŠ", en: "Kindergarten and primary school" },
      price:       { cz: "5 100 Kč / 3 třídy", en: "CZK 5,100 / 3 classes" },
      season:      { cz: "", en: "" },
      materials:   { cz: "Veškeré potřebné pomůcky a materiály přivezu s sebou.", en: "All necessary aids and materials are provided." },
      blocks: [
        { id: "b-taj-1", type: "text", heading: { cz: "Jak program probíhá?", en: "How does the programme work?" }, text: { cz: "Program probíhá v jedné vyhrazené učebně přímo ve vaší škole. Pro každou třídu je připraven samostatný program v délce 1 vyučovací hodiny (45 minut). Obsah i náročnost aktivit přizpůsobuji věku dětí.", en: "The programme takes place in one dedicated classroom at your school. Each class has a separate 45-minute session and activities are adapted to the children’s age." }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-vajicko", slug: "o-vajicku-se-vsim-vsudy", categoryId: "cat-edu",
      status: "published", featured: true, order: 2, publishFrom: "", publishTo: "",
      title: { cz: "O vajíčku se vším všudy", en: "All about the egg" },
      perex: { cz: "Na návštěvu tentokrát nepřijedeme sami – společnost nám bude dělat živá slepička, kterou si děti budou moci zblízka pozorovat. Společně se vydáme na cestu za tajemstvím slepičího vajíčka.", en: "This time we will not come alone — a live hen will join us, and the children will explore the mystery of a chicken egg." },
      mainImage: EDU_IMG.nest, gallery: [],
      mainText: {
        cz: "Na návštěvu tentokrát nepřijedeme sami – společnost nám bude dělat živá slepička, kterou si děti budou moci zblízka pozorovat. Společně se vydáme na cestu za tajemstvím slepičího vajíčka.",
        en: "This time we will not come alone — a live hen will join us, and the children can observe her up close. Together we will explore the mystery of a chicken egg.",
      },
      targetGroup: { cz: "", en: "" },
      location:    { cz: "", en: "" },
      duration:    { cz: "", en: "" },
      capacity:    { cz: "", en: "" },
      age:         { cz: "", en: "" },
      price:       { cz: "", en: "" },
      season:      { cz: "", en: "" },
      materials:   { cz: "", en: "" },
      blocks: [
        { id: "b-vaj-1", type: "text", heading: { cz: "Na co se společně podíváme?", en: "What will we explore together?" }, text: { cz: "Kde bere vajíčko svou sílu? Kdo snáší ta nejmenší vajíčka? Proč mají ptáci tak pevné skořápky? A co se děje uvnitř vajíčka?", en: "Where does an egg get its strength? Who lays the smallest eggs? Why are shells so strong? And what happens inside?" }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-dolesa", slug: "do-lesa-na-pozorovanou", categoryId: "cat-edu",
      status: "published", featured: true, order: 3, publishFrom: "", publishTo: "",
      title: { cz: "Do lesa na pozorovanou", en: "Into the forest to observe" },
      perex: { cz: "Co se právě teď děje v lese? Kdo se tu schovává, co zrovna roste a podle čeho poznáme, že tu bylo zvíře, i když ho vůbec nevidíme?", en: "What is happening in the forest right now? Who is hiding here, what is growing, and how can we tell an animal has been here even if we cannot see it?" },
      mainImage: EDU_IMG.observe, gallery: [],
      mainText: {
        cz: "Vydejme se do lesa na pozorovanou. Budeme objevovat život lesa takový, jaký je právě teď.",
        en: "Let’s head into the forest to observe. We will discover forest life exactly as it is right now.",
      },
      targetGroup: { cz: "", en: "" },
      location:    { cz: "", en: "" },
      duration:    { cz: "", en: "" },
      capacity:    { cz: "", en: "" },
      age:         { cz: "", en: "" },
      price:       { cz: "", en: "" },
      season:      { cz: "", en: "" },
      materials:   { cz: "", en: "" },
      blocks: [
        { id: "b-dol-1", type: "text", heading: { cz: "Na co se společně podíváme?", en: "What will we explore together?" }, text: { cz: "Co se právě teď děje v lese? Kdo se tu schovává? Co slyšíš, co cítíš, co vidíš? A kdo tu vlastně žije?", en: "What is happening in the forest right now? Who is hiding here? What can you hear, smell, see? And who lives here?" }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-skola-liberec", slug: "skola-v-prirode-liberec", categoryId: "cat-skola",
      status: "published", featured: true, order: 1, publishFrom: "", publishTo: "",
      title: { cz: "Škola v přírodě", en: "School in nature" },
      perex: { cz: "Dopřejte dětem několik dní, během kterých se příroda stane místem pro objevování, poznávání i společné zážitky.", en: "Give children several days in which nature becomes a place for discovery, learning and shared experiences." },
      mainImage: EDU_IMG.mountains, gallery: [EDU_IMG.forestPath, EDU_IMG.forest],
      mainText: {
        cz: "Školy v přírodě probíhají v Liberci–Rudolfově. Ubytování a stravování je zajištěno v České chalupě, odkud máme přírodu a les doslova na dosah. Pro děti je zajištěno ubytování a celodenní stravování a každý den také dopolední a odpolední programový blok. Společně se vydáme ven, budeme pozorovat, bádat, objevovat a prostřednictvím her a praktických aktivit poznávat přírodu kolem nás. Náplň programu přizpůsobím věku dětí, délce pobytu i aktuálnímu ročnímu období.",
        en: "Schools in nature take place in Liberec–Rudolfov. Accommodation and meals are provided at Česká chalupa, with nature and forest close at hand. Children have full-board accommodation and morning and afternoon programme blocks every day. The programme is adapted to the children’s age, length of stay and the current season.",
      },
      targetGroup: { cz: "", en: "" },
      location:    { cz: "Liberec–Rudolfov; ubytování a stravování v České chalupě", en: "Liberec–Rudolfov; accommodation and meals at Česká chalupa" },
      duration:    { cz: "", en: "" },
      capacity:    { cz: "", en: "" },
      age:         { cz: "", en: "" },
      price:       { cz: "Individuální — podle počtu dětí a délky pobytu", en: "Individual — based on the number of children and length of stay" },
      season:      { cz: "", en: "" },
      materials:   { cz: "", en: "" },
      blocks: [

      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-venec-miru", slug: "vazani-adventnich-vencu-na-miru", categoryId: "cat-workshop",
      status: "published", featured: true, order: 1, publishFrom: "", publishTo: "",
      title: { cz: "Vázání adventních věnců na míru", en: "Custom advent wreath making" },
      perex: { cz: "Chcete si s kolegyněmi, kamarádkami nebo celým týmem užít příjemný společný čas provoněný chvojím a vánoční atmosférou?", en: "Enjoy a pleasant shared time with colleagues, friends or your whole team, scented with greenery and Christmas atmosphere." },
      mainImage: EDU_IMG.wreath, gallery: [EDU_IMG.wreathMake],
      mainText: {
        cz: "Objednejte si skupinový workshop vázání adventních věnců, během kterého si každý vytvoří svůj vlastní originální věnec a na chvíli zpomalí v předvánočním shonu. Workshop je vhodný pro pracovní kolektivy, skupiny přátel i jako součást firemního předvánočního setkání či teambuildingu. Přijedu za vámi a přivezu vše potřebné k tvorbě. Společně si ukážeme, jak správně uvázat korpus z čerstvého chvojí, a poté už bude prostor pro vlastní kreativitu a zdobení. Každý účastník si na závěr odnese vlastnoručně vytvořený adventní věnec.",
        en: "Book a group advent-wreath workshop where everyone creates an original wreath and takes a break from the pre-Christmas rush. The workshop is suitable for work teams, groups of friends, company gatherings or team-building. I come to you and bring everything needed for making the wreaths.",
      },
      targetGroup: { cz: "Pracovní kolektivy, skupiny přátel, firemní setkání či teambuilding", en: "Work teams, groups of friends, company gatherings or team-building" },
      location:    { cz: "Přijedu za vámi", en: "I come to you" },
      duration:    { cz: "", en: "" },
      capacity:    { cz: "", en: "" },
      age:         { cz: "", en: "" },
      price:       { cz: "Individuální — podle počtu účastníků a zvoleného materiálu", en: "Individual — based on participant count and selected materials" },
      season:      { cz: "Advent / předvánoční období", en: "Advent / pre-Christmas season" },
      materials:   { cz: "Veškeré potřebné materiály k tvorbě přivezu s sebou.", en: "All necessary materials are provided." },
      blocks: [],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
    {
      id: "prog-venec-chaloupka", slug: "vazani-adventnich-vencu-ceska-chaloupka", categoryId: "cat-workshop",
      status: "published", featured: true, order: 2, publishFrom: "", publishTo: "",
      title: { cz: "Vázání adventních věnců na České chalupě", en: "Advent wreath making at Česká chalupa" },
      perex: { cz: "Nalaďme se společně na vánoční atmosféru. Vytvoříme si společně krásný adventní věnec.", en: "Let’s get into the Christmas atmosphere together and create a beautiful advent wreath." },
      mainImage: EDU_IMG.wreathMake, gallery: [EDU_IMG.wreath],
      mainText: {
        cz: "Nalaďme se společně na vánoční atmosféru. Vytvoříme si společně krásný adventní věnec.",
        en: "Let’s get into the Christmas atmosphere together and create a beautiful advent wreath.",
      },
      targetGroup: { cz: "Rodiny, skupiny přátel, firmy", en: "Families, groups of friends, companies" },
      location:    { cz: "Česká chaloupka v přírodě", en: "Czech cottage in nature" },
      duration:    { cz: "", en: "" },
      capacity:    { cz: "10–15 osob", en: "10–15 people" },
      age:         { cz: "", en: "" },
      price:       { cz: "", en: "" },
      season:      { cz: "", en: "" },
      materials:   { cz: "", en: "" },
      blocks: [
        { id: "b-ch-1", type: "text", heading: { cz: "Občerstvení", en: "Refreshments" }, text: { cz: "Na přání můžeme zajistit i drobné občerstvení.", en: "On request we can also arrange light refreshments." }, image: "", caption: { cz: "", en: "" } },
      ],
      ctas: [contactCta()], attachments: [], seo: { title: { cz: "", en: "" }, description: { cz: "", en: "" } },
    },
  ],
};
