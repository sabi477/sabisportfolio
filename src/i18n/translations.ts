export type Locale = "en" | "tr";

export const translations = {
  en: {
    // Window
    informationAbout: "Information about:",
    details: "Details",
    preview: "Preview",
    content: "Content",
    visitSite: "Visit Site",
    sayHi: "Say Hi!",
    comingSoon: "Coming Soon...",
    typeLabel: "Type:",

    // Trash
    trash: "Trash",
    trashMessage1: "Hey! You weren't supposed to look here...",
    trashMessage2: "This is just my bad ideas and half-finished drafts.",
    trashButton: "OK, I didn't see it 👀",

    // Photos
    photos: "Photos",
    allPhotos: "← All Photos",

    // Notes
    notesTitle: "Information about: Sabiha, sabihaecemylmaz@gmail.com",
    aboutMe: "About me",
    skills: "Skills",
    contact: "Contact",
    aboutText: "Hi, I'm Sabiha. Currently processing my journey as an AI & Data Engineering student at Akdeniz University. I don't just love technology; I treat it as a dataset to be optimized. From architecting software pipelines to mapping UI/UX experiences, I blend analytical rigour with visual storytelling. I'm driven by the goal of turning raw data into meaningful, creative outcomes that make a measurable difference.",
    iCanDo: "I can do...",
    getInTouch: "Get in touch",

    // Figma
    figma: "Figma",
    figmaMessage: "Oops! We're probably building something amazing here. Come back later.",
    ok: "Ok",

    // Error
    error: "Error",
    errorMessage1: "Sabi just lost her mind.",
    errorMessage2: "Shame she didn't have a hard drive copy.",
    errorButton: "Give up and go cry",

    // Spotify
    spotifyAll: "All",
    spotifyMusic: "Music",
    spotifyMadeFor: "Made for Sabi",
    spotifyShowAll: "Show all",
    spotifyAboutArtist: "About the artist",
    spotifyLikedSongs: "Liked Songs",
    spotifyTurkishPop: "Turkish pop 2000s...",
    spotifySpringInDesert: "Spring in the Desert",
    spotifyCanozan: "Canozan",
    spotifyPodcasts: "Podcasts",

    // Menu bar
    menuFile: "File",
    menuEdit: "Edit",
    menuView: "View",
    menuHistory: "History",
    menuBookmarks: "Bookmarks",
    menuDevelopment: "Development",
    menuWindow: "Window",
    menuHelp: "Help",

    // Dock
    dockPortfolio: "Portfolio",
    dockFigma: "Figma",
    dockSpotify: "Spotify",
    dockAlerts: "Alerts",
    dockNotes: "Notes",
    dockPhotos: "Photos",
    dockInstagram: "Instagram",
    dockMail: "Mail",
    dockTrash: "Trash",
  },
  tr: {
    // Window
    informationAbout: "Hakkında:",
    details: "Detaylar",
    preview: "Önizleme",
    content: "İçerik",
    visitSite: "Siteyi Ziyaret Et",
    sayHi: "Merhaba De!",
    comingSoon: "Çok Yakında...",
    typeLabel: "Tür:",

    // Trash
    trash: "Çöp Kutusu",
    trashMessage1: "Hey! Buraya bakmaman gerekiyordu...",
    trashMessage2: "Burada sadece kötü fikirlerim ve yarım kalmış taslaklarım var.",
    trashButton: "Tamam, görmedim 👀",

    // Photos
    photos: "Fotoğraflar",
    allPhotos: "← Tüm Fotoğraflar",

    // Notes
    notesTitle: "Hakkında: Sabiha, sabihaecemylmaz@gmail.com",
    aboutMe: "Hakkımda",
    skills: "Yetenekler",
    contact: "İletişim",
    aboutText: "Selam, ben Sabi — Akdeniz Üniversitesi'nde Yapay Zeka ve Veri Mühendisliği öğrencisiyim. Yazılım ve veri projelerinden UI/UX tasarımı ve içerik üretimine kadar, teknolojiyi yaratıcı çıktılara dönüştürmeyi seviyorum. Analitik düşünce ve görsel hikaye anlatıcılığına olan tutkumla; disiplinler arası çalışmaktan, inisiyatif almaktan ve ilham verip fark yaratan fikirleri hayata geçirmekten keyif alıyorum.",
    iCanDo: "Yapabildiklerim...",
    getInTouch: "İletişime geç",

    // Figma
    figma: "Figma",
    figmaMessage: "Oops! Burada muhtemelen harika bir şeyler yapıyoruz. Daha sonra tekrar gel.",
    ok: "Tamam",

    // Error
    error: "Hata",
    errorMessage1: "Sabi aklını kaybetti.",
    errorMessage2: "Sabi'nin sabit disk kopyası yokmuş.",
    errorButton: "Vazgeç ve ağla",

    // Spotify
    spotifyAll: "Tümü",
    spotifyMusic: "Müzik",
    spotifyMadeFor: "Sabi İçin Derlendi",
    spotifyShowAll: "Tümünü göster",
    spotifyAboutArtist: "Sanatçı hakkında",
    spotifyLikedSongs: "Beğenilen Şarkılar",
    spotifyTurkishPop: "Türkçe pop 2000'ler...",
    spotifySpringInDesert: "Çölde Bahar",
    spotifyCanozan: "Canozan",
    spotifyPodcasts: "Podcast'ler",

    // Menu bar
    menuFile: "Dosya",
    menuEdit: "Düzen",
    menuView: "Görüntü",
    menuHistory: "Geçmiş",
    menuBookmarks: "Yer İşaretleri",
    menuDevelopment: "Geliştirme",
    menuWindow: "Pencere",
    menuHelp: "Yardım",

    // Dock
    dockPortfolio: "Portföy",
    dockFigma: "Figma",
    dockSpotify: "Spotify",
    dockAlerts: "Uyarılar",
    dockNotes: "Notlar",
    dockPhotos: "Fotoğraflar",
    dockInstagram: "Instagram",
    dockMail: "Mail",
    dockTrash: "Çöp",
  },
} as const;

export type TranslationKey = keyof (typeof translations)["en"];
