
export const translations = {
  en: {
    "hero.title": "Sri Venkatadri Devasthanam",
    "nav.home": "Home",
    "nav.history": "Our History",
    "nav.sevas": "Sevas",
    "nav.donation": "Donation",
    "nav.videos": "Videos",
    "nav.audio": "Audio",
    "nav.library": "Library",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
  },
  te: {
    "hero.title": "శ్రీ వెంకటాద్రి దేవస్థానం",
    "nav.home": "హోమ్",
    "nav.history": "చరిత్ర",
    "nav.sevas": "సేవలు",
    "nav.donation": "విరాళం",
    "nav.videos": "వీడియోలు",
    "nav.audio": "ఆడియో",
    "nav.library": "గ్రంధాలయం",
    "nav.gallery": "గ్యాలరీ",
    "nav.contact": "సంప్రదించండి",
  },
};

export const getTranslator = (lang: string) => {
  const langKey = lang === 'te' ? 'te' : 'en';
  return (key: string) => {
    return translations[langKey][key] || key;
  };
};
