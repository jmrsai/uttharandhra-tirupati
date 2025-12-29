
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'te';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.sevas': 'Sevas',
    'nav.donation': 'E-Hundi',
    'nav.videos': 'Videos',
    'nav.audio': 'Audio',
    'nav.library': 'Library',
    'nav.gallery': 'Gallery',
    'nav.login': 'Login',
    'hero.title': 'Uttharandhra Tirupati',
    'hero.subtitle': 'Om Namo Venkatesaya! The divine abode of Sri Venkateswara Swamy in Pendurthi.',
    'hero.badge': 'Divine Shrine',
    'hero.book_sevas': 'View Sevas',
    'hero.e_hundi': 'E-Hundi',
    'status.open': 'Currently Open',
    'status.closed': 'Currently Closed',
    'greeting.morning': 'Good Morning! Have a blessed day.',
    'greeting.afternoon': 'Good Afternoon.',
    'greeting.evening': 'Good Evening.',
    'greeting.night': 'Good Night.',
    'panchangam.title': "Today's Panchangam",
    'panchangam.tithi': 'Tithi',
    'panchangam.nakshatra': 'Nakshatra',
    'panchangam.rahu': 'Rahu Kalam',
    'panchangam.day': 'Day',
    'history.summary_title': 'Temple History',
    'history.read_more': 'Read Full History',
    'news.title': 'Latest News & Events',
    'news.read_more': 'Read More',
    'timings.title': 'Darshan Timings',
    'address.title': 'Temple Address & Location',
    'address.get_directions': 'Get Directions on Google Maps',
    'address.parking_note': '* Note: During festivals, parking is arranged 500m away from temple.',
    'music.tooltip': 'Listen to Mantra ✨',
    'audio.title': 'Devotional Songs & Podcasts',
    'audio.subtitle': 'Listen to Suprabhatham, Govinda Namalu and spiritual discourses.',
    'audio.more': 'For More Songs',
    'audio.more_desc': 'Full collection of Annamayya and Ramadasu Keerthanas coming soon.',
    'audio.notify': 'Get Notified',
    'library.title': 'E-Library',
    'library.subtitle': 'Read or download spiritual books, stotras, and vrata kalpas in PDF format.',
    'library.download': 'Download PDF',
    'gallery.title': 'Photo Gallery',
    'gallery.download_wallpaper': 'Download as Wallpaper',
    'donation.title': 'E-Hundi',
    'donation.subtitle': 'Your contributions are used for the Lord\'s sevas, Annadanam, and temple development.',
    'donation.form_title': 'Enter Donation Details',
    'donation.type': 'Donation Type',
    'donation.amount': 'Amount (₹)',
    'donation.name': 'Devotee Name',
    'donation.gothram': 'Gothram (Optional)',
    'donation.submit': 'Offer Contribution',
    'donation.security_title': 'Security & Trust',
    'donation.sec1': 'Your donations are directly credited to the temple account.',
    'donation.sec2': 'Receipts will be sent for donations above ₹ 5000.',
    'donation.sec3': 'Secure online payment gateway.',
    'history.page_title': 'History of Venkatadri',
    'history.page_subtitle': 'Divine glory of Pendurthi shrine, known as Uttharandhra Tirupati',
    'history.legend_title': 'Temple Legend (Sthala Puranam)',
    'history.legend_desc1': 'Lord Venkateswara, the Lord of the Universe, manifested in this Kali Yuga for the sake of his devotees.',
    'history.legend_desc2': 'It is believed that Lord Varaha Lakshmi Narasimha Swamy of Simhachalam placed one foot on Pendurthi Venkatadri and the other in Simhachalam. The footprints can still be seen on the hill.',
    'history.construct_title': 'Construction & History',
    'history.construct_desc': 'Recognizing the significance of this hill, local elders and the Panchavati Committee met Sri Chinna Jeeyar Swamy, who blessed the construction of this temple.',
    'history.year1': '1995: Foundation stone laid with blessings of Sri Chinna Jeeyar Swamy.',
    'history.year2': 'May 17, 1997: Temple consecration and idol installation performed by Swamiji.',
    'history.significance_title': 'Current Highlights',
    'history.significance_desc': 'Since its inception, all festivals are celebrated grandly. Alivelu Mangamma, Govindaraja Swamy, and Kalyana Venkateswara Swamy temples were also established.',
    'history.dhanur_title': 'Dhanurmasa Significance:',
    'history.dhanur_desc': 'Every year during Dhanurmasam, thousands of devotees participate in collective Tiruppavai recitation.',
    'sevas.title': 'Arjitha Sevas',
    'sevas.subtitle': 'Daily and Weekly rituals performed at the temple.',
    'feedback.title': 'Feedback & Suggestions',
    'feedback.subtitle': 'Your feedback helps us improve the divine experience for all devotees.',
    'feedback.name': 'Your Name',
    'feedback.email': 'Your Email',
    'feedback.type': 'Feedback Type',
    'feedback.type_suggestion': 'Suggestion',
    'feedback.type_issue': 'Report an Issue',
    'feedback.message': 'Your Message',
    'feedback.submit': 'Send Feedback',
    'feedback.success': 'Thank you! Your feedback has been submitted successfully.'
  },
  te: {
    'nav.home': 'హోమ్',
    'nav.history': 'చరిత్ర',
    'nav.sevas': 'సేవలు',
    'nav.donation': 'ఈ-హుండీ',
    'nav.videos': 'వీడియోలు',
    'nav.audio': 'ఆడియో',
    'nav.library': 'గ్రంథాలయం',
    'nav.gallery': 'గ్యాలరీ',
    'nav.login': 'లాగిన్',
    'hero.title': 'ఉత్తరాంధ్ర తిరుపతి',
    'hero.subtitle': 'ఓం నమో వేంకటేశాయ! పెందుర్తి శ్రీ వెంకటేశ్వర స్వామి వారి సన్నిధి.',
    'hero.badge': 'దివ్య క్షేత్రం',
    'hero.book_sevas': 'సేవలు చూడండి',
    'hero.e_hundi': 'ఈ-హుండీ',
    'status.open': 'ప్రస్తుతం తెరిచి ఉంది',
    'status.closed': 'ప్రస్తుతం మూసి ఉంది',
    'greeting.morning': 'శుభోదయం! ఉదయకాలపు శుభాకాంక్షలు.',
    'greeting.afternoon': 'మధ్యాహ్న శుభాకాంక్షలు.',
    'greeting.evening': 'శుభ సాయంత్రం.',
    'greeting.night': 'శుభ రాత్రి.',
    'panchangam.title': 'నేటి పంచాంగం',
    'panchangam.tithi': 'తిథి',
    'panchangam.nakshatra': 'నక్షత్రం',
    'panchangam.rahu': 'రాహుకాలం',
    'panchangam.day': 'వరం',
    'history.summary_title': 'ఆలయ చరిత్ర',
    'history.read_more': 'పూర్తి చరిత్ర చదవండి',
    'news.title': 'తాజా వార్తలు & విశేషాలు',
    'news.read_more': 'ఇంకా చదవండి',
    'timings.title': 'దర్శన వేళలు',
    'address.title': 'ఆలయ చిరునామా & లొకేషన్',
    'address.get_directions': 'Google Maps లో దిశలు పొందండి',
    'address.parking_note': '* భక్తులు గమనించగలరు: పండుగ రోజుల్లో పార్కింగ్ సౌకర్యం ఆలయానికి 500 మీటర్ల దూరంలో ఏర్పాటు చేయబడుతుంది.',
    'music.tooltip': 'మంత్రాన్ని వినండి ✨',
    'audio.title': 'భక్తి గీతాలు & పాడ్‌కాస్ట్‌లు',
    'audio.subtitle': 'వెంకటేశ్వర స్వామి సుప్రభాతం, గోవింద నామాలు మరియు ప్రవచనాలు వినండి.',
    'audio.more': 'మరిన్ని కీర్తనల కోసం',
    'audio.more_desc': 'అన్నమయ్య, రామదాసు కీర్తనల పూర్తి సేకరణ త్వరలో అందుబాటులోకి రానుంది.',
    'audio.notify': 'నోటిఫికేషన్ పొందండి',
    'library.title': 'గ్రంథాలయం',
    'library.subtitle': 'ఆధ్యాత్మిక పుస్తకాలు, స్తోత్రాలు మరియు వ్రత కల్పాలను PDF రూపంలో చదవండి లేదా డౌన్‌లోడ్ చేసుకోండి.',
    'library.download': 'PDF డౌన్‌లోడ్',
    'gallery.title': 'ఫోటో గ్యాలరీ',
    'gallery.download_wallpaper': 'వాల్‌పేపర్‌గా డౌన్‌లోడ్ చేయండి',
    'donation.title': 'ఈ-హుండీ (E-Hundi)',
    'donation.subtitle': 'మీ కానుకలు స్వామివారి సేవలకు, అన్నదానానికి మరియు ఆలయ అభివృద్ధికి ఉపయోగించబడతాయి.',
    'donation.form_title': 'వివరాలు నమోదు చేయండి',
    'donation.type': 'విరాళం రకం',
    'donation.amount': 'మొత్తం (₹)',
    'donation.name': 'భక్తుని పేరు',
    'donation.gothram': 'గోత్రం (Optional)',
    'donation.submit': 'కానుక సమర్పించండి',
    'donation.security_title': 'సెక్యూరిటీ & నమ్మకం',
    'donation.sec1': 'మీ విరాళాలు నేరుగా ఆలయ ఖాతాలో జమ అవుతాయి.',
    'donation.sec2': 'రూ. 5000 పైన విరాళాలకు రసీదు పంపబడును.',
    'donation.sec3': 'సురక్షితమైన ఆన్‌లైన్ పేమెంట్ గేట్‌వే.',
    'history.page_title': 'వెంకటాద్రి చరిత్ర',
    'history.page_subtitle': 'ఉత్తరాంధ్ర తిరుపతిగా ప్రసిద్ధి చెందిన పెందుర్తి క్షేత్ర వైభవం',
    'history.legend_title': 'స్థల పురాణం',
    'history.legend_desc1': 'అఖిలాండ కోటి బ్రహ్మాండనాయకుడు, వైకుంఠనాధుడు భక్తుల కోసం అనేక అవతారాలు దాలుస్తూ కలియుగంలో వేంకటేశ్వరస్వామిగా అవతరించాడు.',
    'history.legend_desc2': 'శ్రీమన్నారాయణుని అవతారాల్లో ఒకటైన సింహాచలం వరాహలక్ష్మి నరసింహస్వామి ఒకపాదం పెందుర్తి వెంకటాద్రిపై మోపి మరొకపాదం సింహాచలంలో మోపినట్లుగా ఇక్కడి స్థల పురాణం. నేటికీ స్వామివారి పాదముద్ర కొండమీద వున్నది.',
    'history.construct_title': 'ఆలయ నిర్మాణం & చరిత్ర',
    'history.construct_desc': 'ఈ కొండ విశిష్టతను గుర్తించిన స్థానిక పెద్దలు, పంచవటి కమిటి వారు కలసి పరమహంస పరివ్రాజక రామానుజ శ్రీమన్నారాయణ చినజీయరుస్వామి వారిని కలువగా, వారు ఈ కొండమీద శ్రీవేంకటేశ్వరస్వామి వారి ఆలయం నిర్మించమని అనుగ్రహించారు.',
    'history.year1': '1995: శ్రీ చిన్నజీయరు స్వామి వారి మంగళాశాసనములతో శంఖుస్థాపన.',
    'history.year2': '17-05-1997: శ్రీ స్వామివారి చేతుల మీదుగా ఆలయ ప్రతిష్ఠ మరియు విగ్రహ ఆవిష్కరణ.',
    'history.significance_title': 'ప్రస్తుత విశేషాలు',
    'history.significance_desc': 'నాటి నుండి శ్రీశ్రీశ్రీ జీయరుస్వామి వారి ఆశీస్సులతో, వెంకటాద్రి ఆలయములో అన్ని ఉత్సవాలు అతి వైభవముగా జరుగుతున్నాయి.',
    'history.dhanur_title': 'ధనుర్మాస విశిష్టత:',
    'history.dhanur_desc': 'ధనుర్మాసంలో మరెక్కడా లేనివిధంగా నిత్యం వేలాదిమంది భక్తులచేత సామూహికంగా "తిరుప్పావై" పారాయణ గావించబడుతోంది.',
    'sevas.title': 'ఆర్జిత సేవలు',
    'sevas.subtitle': 'శ్రీవారికి జరిగే నిత్య, వార మరియు విశేష సేవలు.',
    'feedback.title': 'అభిప్రాయం & సూచనలు',
    'feedback.subtitle': 'మీ అభిప్రాయాలు భక్తులకు మరింత మెరుగైన ఆధ్యాత్మిక అనుభవాన్ని అందించడంలో మాకు సహాయపడతాయి.',
    'feedback.name': 'మీ పేరు',
    'feedback.email': 'మీ ఈమెయిల్',
    'feedback.type': 'అభిప్రాయ రకం',
    'feedback.type_suggestion': 'సూచన',
    'feedback.type_issue': 'సమస్యను నివేదించండి',
    'feedback.message': 'మీ సందేశం',
    'feedback.submit': 'అభిప్రాయాన్ని పంపండి',
    'feedback.success': 'ధన్యవాదాలు! మీ అభిప్రాయం విజయవంతంగా సమర్పించబడింది.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
