export interface Project {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  previewColor: string;
  position: { x: number; y: number };
  iconImage?: string;
  gallery?: string[];
  link?: string;
  comingSoon?: boolean;
  /** Klasör içeriği gibi görünen proje/klasör adları (veri, database, python vb.) */
  folderItems?: string[];
}

export const projects: Project[] = [
  {
    id: "rotanova-v2",
    name: "ROTA 1",
    type: "UI/UX Design",
    category: "Website",
    description: "Seyahat acentesi web sitesinin ikinci versiyon UI/UX çalışması. Kapadokya temalı hero, destinasyonlar ve iletişim sayfaları.",
    previewColor: "#2d1b4e",
    position: { x: 10, y: 10 },
    iconImage: "/folderImages/folderImage1i.png",
    gallery: [
      "/Ekran Resmi 2026-02-25 06.42.47.png",
      "/Ekran Resmi 2026-02-25 06.43.34.png",
      "/Ekran Resmi 2026-02-25 06.43.52.png",
      "/Ekran Resmi 2026-02-25 06.44.15.png",
    ],
  },
  {
    id: "ieee-antalya",
    name: "IEEE ANTALYA",
    type: "Web Development",
    category: "Website",
    description: "IEEE Antalya Öğrenci Kolu için Next.js ile geliştirilmiş kulüp web sitesi. 3D görseller ve modern UI bileşenleriyle tasarlandı.",
    previewColor: "#0a1628",
    position: { x: 55, y: 8 },
    iconImage: "/folderImages/folderImage2i.png",
    gallery: [
      "/Ekran Resmi 2026-02-25 06.16.32.png",
      "/Ekran Resmi 2026-02-25 06.17.59.png",
      "/Ekran Resmi 2026-02-25 06.17.03.png",
    ],
    link: "https://ieeeakdeniz.vercel.app",
  },
  {
    id: "stage-visuals",
    name: "CRE-ATE",
    type: "Web Design",
    category: "Website",
    description: "Yatırım ve teknoloji odaklı bir şirket için modern web sitesi tasarımı ve geliştirmesi.",
    previewColor: "#3b82f6",
    position: { x: 25, y: 15 },
    iconImage: "/folderImages/folderImage3i.png",
    gallery: [
      "/Ekran Resmi 2026-02-25 05.46.49.png",
      "/Ekran Resmi 2026-02-25 05.57.40.png",
      "/Ekran Resmi 2026-02-25 05.59.01.png",
    ],
    link: "https://cre-ate-1.vercel.app",
  },
  {
    id: "fixpoint",
    name: "FIXPOINT",
    type: "UI/UX Design",
    category: "Website",
    description: "Klima servisi firması için tasarlanmış web sitesi UI/UX çalışması. Her sektörde varız!",
    previewColor: "#f9a8d4",
    position: { x: 40, y: 20 },
    iconImage: "/folderImages/folderImage4i.png",
    gallery: [
      "/grafikdunyasi26.png",
      "/MacBook Air - 1.png",
    ],
  },
  {
    id: "hypers-academy",
    name: "HYPERS REDESIGN",
    type: "UI/UX Design",
    category: "Website",
    description: "TypeScript ile geliştirilmiş, UI/UX odaklı bir eğitim platformu web sitesi redesign'ı. Tamamen eğlencesine yapılmış kişisel bir projedir.",
    previewColor: "#e53e3e",
    position: { x: 70, y: 18 },
    iconImage: "/folderImages/folderImage5i.png",
    gallery: [
      "/Ekran Resmi 2026-02-25 06.04.26.png",
      "/Ekran Resmi 2026-02-25 06.05.40.png",
      "/Ekran Resmi 2026-02-25 06.06.03.png",
    ],
    link: "https://hypers-newdesign.vercel.app",
  },
  {
    id: "mobile-app",
    name: "MOBILE APP",
    type: "Mobile Development",
    category: "React Native",
    description: "Bir mobil uygulama üzerinde çalışıyorum... Çok yakında sizlerle!",
    previewColor: "#333333",
    position: { x: 15, y: 32 },
    iconImage: "/folderImages/folderImage6i.png",
    gallery: ["/mobile-app-preview.png"],
    comingSoon: true,
  },
  {
    id: "art-gallery",
    name: "ART GALLERY",
    type: "Fine Art",
    category: "Painting & Drawing",
    description: "Teknolojiyle iç içe olsam da sanatın klasik formlarından kopamıyorum. Yağlıboya ve karakalem çalışmalarım, dijital dünyanın dışında kalan yaratıcı yanımı yansıtıyor.",
    previewColor: "#6b3fa0",
    position: { x: 35, y: 35 },
    iconImage: "/folderImages/folderImage10i.png",
    gallery: [
      "/e684fbcf-78d4-46b4-bedb-c699fe977bb8.JPG",
      "/IMG_6359.jpg",
      "/IMG_6358.jpg",
      "/IMG_6369.jpg",
    ],
  },
  {
    id: "data-projects",
    name: "VERİ & ML",
    type: "Data & AI",
    category: "Database & Python",
    description: "Veri mühendisliği ve analitik tarafım. Veritabanı tasarımları, ETL pipeline'ları, Python scriptleri ve makine öğrenmesi denemeleri burada.",
    previewColor: "#c6e6b3",
    position: { x: 55, y: 32 },
    iconImage: "/folderImages/folderImage8i.png",
    folderItems: [
      "database_projects",
      "python_scripts",
      "ml_experiments",
      "etl_pipelines",
      "sql_queries",
      "jupyter_notebooks",
    ],
  },
  {
    id: "marketplace-visuals",
    name: "MARKETPLACE VISUALS",
    type: "UI/UX Design",
    category: "Marketplace",
    description: "App Store ve Google Play için mobil uygulama mağaza görselleri oluşturuyorum. Kullanıcı deneyimini öne çıkaran, dikkat çekici ekran görüntüleri ve tanıtım tasarımları hazırlıyorum.",
    previewColor: "#f5d45e",
    position: { x: 75, y: 35 },
    iconImage: "/folderImages/folderImage9i.png",
    gallery: [
      "/Untitled design-31.png",
      "/Untitled design-21.png",
      "/Untitled design-26.png",
      "/Untitled design-27.png",
    ],
  },
  {
    id: "bilmok",
    name: "BİLMÖK",
    type: "Graphic Design",
    category: "Branding & Social Media",
    description: "BİLMÖK (Bilgisayar Mühendisliği Öğrenci Kongresi) için sosyal medya tasarımları, branding guide ve logo çalışmaları.",
    previewColor: "#e8d5b7",
    position: { x: 25, y: 50 },
    iconImage: "/folderImages/folderImage7i.png",
    gallery: [
      "/BİLMÖK SOCİAL MEDİA REFERENCES.png",
      "/BİLMÖK SOCİAL MEDİA REFERENCES-2.png",
      "/1.png",
      "/2.png",
    ],
  },
  {
    id: "secret-help",
    name: "???",
    type: "Easter Egg",
    category: "Secret",
    description: "Searching for a sign? This is it! You found the right file and maybe your next favorite partner. Don't be shy, drop a message and let's see what happens.",
    previewColor: "#8b6914",
    position: { x: 50, y: 48 },
    iconImage: "/folderImages/folderImage11i.png",
    link: "mailto:sabihaecemylmaz@gmail.com",
  },
  {
    id: "rotanova",
    name: "ROTA 2",
    type: "UI/UX Design",
    category: "Website",
    description: "Seyahat acentesi için tasarlanmış web sitesi UI/UX çalışması. Destinasyonlar, galeri ve SSS bölümleriyle zengin bir kullanıcı deneyimi.",
    previewColor: "#cc0000",
    position: { x: 70, y: 50 },
    iconImage: "/folderImages/folderImage12i.png",
    gallery: [
      "/new version.png",
    ],
  },
];
