import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru' | 'az';

const translations = {
  en: {
    nav: { home: "Home", atmosphere: "Atmosphere", artOfLiving: "Art of Living", residences: "Residences", floorPlans: "Floor Plans", contact: "Schedule a Visit", residentPortal: "Resident Portal" },
    hero: { subtitle: "Baku, Azerbaijan", title: "Royal Park" },
    footer: { desc: "", rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Use", cookies: "Cookies" },
    legal: {
      title: "Legal Information",
      data_protection_title: "International Data Protection",
      data_protection_p1: "If you are accessing this website from outside Azerbaijan, please note that your information may be transferred and processed in Azerbaijan.",
      data_protection_p2: "We ensure that appropriate safeguards are in place to protect your data in accordance with international data protection standards.",
      rights_title: "Your Rights",
      rights_p1: "Depending on your location, you may have the right to:",
      rights_li1: "request access to your personal data",
      rights_li2: "request correction or deletion",
      rights_li3: "withdraw consent at any time",
      rights_p2: "To exercise your rights, please contact us at: ",
      cookies_title: "Cookies & Consent",
      cookies_p1: "By using this website, you consent to the use of cookies in accordance with this policy.",
      cookies_p2: "You may control or disable cookies through your browser settings.",
      cookies_p3: "Some features of the website may not function properly without cookies."
    },
    home: {
      atm_title: "The Atmosphere of Absolute Silence",
      atm_desc: "Discover a sanctuary in the heart of Baku. Royal Park is designed for those who appreciate the rare luxury of true quietness.",
      atm_btn: "Discover the Lifestyle",
      qual_title: "Uncompromising Quality",
      qual_desc: "Every detail in Royal Park is crafted with premium materials, ensuring a living experience that exceeds expectations.",
      f1_title: "Pure Environment", f1_desc: "Advanced air filtration and abundant green spaces.",
      f2_title: "Absolute Privacy", f2_desc: "State-of-the-art security and thoughtful architecture.",
      f3_title: "Organic Materials", f3_desc: "Built with natural stone, premium woods, and eco-friendly materials.",
      art_title: "The Art of Living",
      art_desc: "Every detail is crafted with the precision of an artist. We view our residences not just as living spaces, but as masterpieces of design and comfort.",
      art_btn: "View Gallery"
    },
    contact: {
      title: "Become part of Royal Park",
      desc: "Schedule a private viewing or request more information about Royal Park.",
      form_name: "Full Name",
      form_email: "Email Address",
      form_phone: "Phone Number",
      form_message: "Message",
      form_submit: "Send Inquiry",
      info_address: "Address",
      info_phone: "Phone",
      info_email: "Email",
      address_val: "Kənar dairəvi yol 10, Yeni Yasamal / AZ1070, Bakı, Azərbaycan"
    },
    residences: {
      clickToEnlarge: "Click to enlarge"
    }
  },
  ru: {
    nav: { home: "Главная", atmosphere: "Атмосфера", artOfLiving: "Искусство жизни", residences: "Резиденции", floorPlans: "Планировки", contact: "Запланировать визит", residentPortal: "Портал резидента" },
    hero: { subtitle: "Баку, Азербайджан", title: "Royal Park" },
    footer: { desc: "", rights: "Все права защищены.", privacy: "Privacy Policy", terms: "Terms of Use", cookies: "Cookies" },
    legal: {
      title: "Правовая информация",
      data_protection_title: "Международная защита данных",
      data_protection_p1: "Если вы заходите на этот веб-сайт из-за пределов Азербайджана, обратите внимание, что ваша информация может передаваться и обрабатываться в Азербайджане.",
      data_protection_p2: "Мы гарантируем наличие соответствующих мер безопасности для защиты ваших данных в соответствии с международными стандартами защиты данных.",
      rights_title: "Ваши права",
      rights_p1: "В зависимости от вашего местоположения вы можете иметь право:",
      rights_li1: "запросить доступ к вашим личным данным",
      rights_li2: "запросить исправление или удаление",
      rights_li3: "отозвать согласие в любое время",
      rights_p2: "Чтобы воспользоваться своими правами, свяжитесь с нами по адресу: ",
      cookies_title: "Файлы cookie и согласие",
      cookies_p1: "Используя этот веб-сайт, вы соглашаетесь на использование файлов cookie в соответствии с настоящей политикой.",
      cookies_p2: "Вы можете управлять файлами cookie или отключать их в настройках вашего браузера.",
      cookies_p3: "Некоторые функции веб-сайта могут работать неправильно без файлов cookie."
    },
    home: {
      atm_title: "Атмосфера абсолютной тишины",
      atm_desc: "Откройте для себя убежище в самом сердце Баку. Royal Park создан для тех, кто ценит редкую роскошь настоящей тишины.",
      atm_btn: "Узнать больше",
      qual_title: "Бескомпромиссное качество",
      qual_desc: "Каждая деталь в Royal Park создана из премиальных материалов, обеспечивая уровень жизни, превосходящий ожидания.",
      f1_title: "Чистая среда", f1_desc: "Передовая фильтрация воздуха и обилие зеленых зон.",
      f2_title: "Абсолютная приватность", f2_desc: "Современная система безопасности и продуманная архитектура.",
      f3_title: "Органические материалы", f3_desc: "Построено с использованием натурального камня, ценных пород дерева и экологичных материалов.",
      art_title: "Искусство жизни",
      art_desc: "Каждая деталь продумана с точностью художника. Мы рассматриваем наши резиденции не просто как жилые пространства, а как шедевры дизайна и комфорта.",
      art_btn: "Смотреть галерею"
    },
    contact: {
      title: "Стать частью Royal Park",
      desc: "Запланируйте индивидуальный просмотр или запросите дополнительную информацию о Royal Park.",
      form_name: "Полное имя",
      form_email: "Email адрес",
      form_phone: "Номер телефона",
      form_message: "Сообщение",
      form_submit: "Отправить запрос",
      info_address: "Адрес",
      info_phone: "Телефон",
      info_email: "Email",
      address_val: "Kənar dairəvi yol 10, Yeni Yasamal / AZ1070, Bakı, Azərbaycan"
    },
    residences: {
      clickToEnlarge: "Нажмите, чтобы увеличить"
    }
  },
  az: {
    nav: { home: "Ana Səhifə", atmosphere: "Atmosfer", artOfLiving: "Yaşamaq Sənəti", residences: "Rezidensiyalar", floorPlans: "Planlar", contact: "Görüş təyin edin", residentPortal: "Sakin portalı" },
    hero: { subtitle: "Bakı, Azərbaycan", title: "Royal Park" },
    footer: { desc: "", rights: "Bütün hüquqlar qorunur.", privacy: "Məxfilik Siyasəti", terms: "İstifadə Şərtləri", cookies: "Kuki Faylları" },
    legal: {
      title: "Hüquqi Məlumat",
      data_protection_title: "Məlumatların Beynəlxalq Qorunması",
      data_protection_p1: "Əgər bu veb-sayta Azərbaycandan kənardan daxil olursunuzsa, nəzərə alın ki, məlumatlarınız Azərbaycana ötürülə və orada emal edilə bilər.",
      data_protection_p2: "Məlumatlarınızın beynəlxalq standartlara uyğun qorunmasını təmin etmək üçün müvafiq təhlükəsizlik tədbirləri görürük.",
      rights_title: "Sizin Hüquqlarınız",
      rights_p1: "Yerləşdiyiniz yerdən asılı olaraq aşağıdakı hüquqlara malik ola bilərsiniz:",
      rights_li1: "şəxsi məlumatlarınıza çıxış tələb etmək",
      rights_li2: "məlumatların düzəldilməsini və ya silinməsini tələb etmək",
      rights_li3: "istənilən vaxt razılığınızı geri götürmək",
      rights_p2: "Hüquqlarınızdan istifadə etmək üçün bizimlə əlaqə saxlayın: ",
      cookies_title: "Kuki Faylları və Razılıq",
      cookies_p1: "Bu veb-saytdan istifadə etməklə, siz bu siyasətə uyğun olaraq kuki fayllarının istifadəsinə razılıq verirsiniz.",
      cookies_p2: "Brauzerinizin parametrləri vasitəsilə kuki fayllarını idarə edə və ya söndürə bilərsiniz.",
      cookies_p3: "Kuki faylları olmadan veb-saytın bəzi funksiyaları düzgün işləməyə bilər."
    },
    home: {
      atm_title: "Mütləq Sükut Atmosferi",
      atm_desc: "Bakının qəlbində əsl sığınacaq kəşf edin. Royal Park əsl sükutun nadir lüksünü qiymətləndirənlər üçün dizayn edilmişdir.",
      atm_btn: "Həyat Tərzini Kəşf Edin",
      qual_title: "Güzəştsiz Keyfiyyət",
      qual_desc: "Royal Park-da hər bir detal, gözləntiləri aşan yaşayış təcrübəsini təmin etmək üçün premium materiallarla hazırlanmışdır.",
      f1_title: "Təmiz Mühit", f1_desc: "Qabaqcıl hava filtrasiyası və geniş yaşıl sahələr.",
      f2_title: "Mütləq Məxfilik", f2_desc: "Müasir təhlükəsizlik sistemi və düşünülmüş memarlıq.",
      f3_title: "Orqanik Materiallar", f3_desc: "Təbii daş, premium ağac növləri və ekoloji təmiz materiallarla inşa edilmişdir.",
      art_title: "Yaşamaq Sənəti",
      art_desc: "Hər bir detal sənətkar dəqiqliyi ilə işlənmişdir. Biz rezidensiyalarımıza sadəcə yaşayış məkanı kimi deyil, dizayn və rahatlığın şah əsəri kimi baxırıq.",
      art_btn: "Qalereyaya Baxın"
    },
    contact: {
      title: "Royal Park-ın bir hissəsi olun",
      desc: "Özəl baxış təyin edin və ya Royal Park haqqında daha ətraflı məlumat əldə edin.",
      form_name: "Ad və Soyad",
      form_email: "E-poçt ünvanı",
      form_phone: "Telefon nömrəsi",
      form_message: "Mesajınız",
      form_submit: "Sorğunu Göndər",
      info_address: "Ünvan",
      info_phone: "Telefon",
      info_email: "E-poçt",
      address_val: "Kənar dairəvi yol 10, Yeni Yasamal / AZ1070, Bakı, Azərbaycan"
    },
    residences: {
      clickToEnlarge: "Böyütmək üçün klikləyin"
    }
  }
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('az');
  const t = translations[lang];

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
