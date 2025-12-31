
export const TELUGU_TITHIS = [
  "అమావాస్య", "శుక్ల పాడ్యమి", "శుక్ల విదియ", "శుక్ల తదియ", "శుక్ల చవితి", "శుక్ల పంచమి", "శుక్ల షష్ఠి", "శుక్ల సప్తమి", "శుక్ల అష్టమి", "శుక్ల నవమి", "శుక్ల దశమి", "శుక్ల ఏకాదశి", "శుక్ల ద్వాదశి", "శుక్ల త్రయోదశి", "శుక్ల చతుర్దశి", 
  "పౌర్ణమి", "కృష్ణ పాడ్యమి", "కృష్ణ విదియ", "కృష్ణ తదియ", "కృష్ణ చవితి", "కృష్ణ పంచమి", "కృష్ణ షష్ఠి", "కృష్ణ సప్తమి", "కృష్ణ అష్టమి", "కృష్ణ నవమి", "కృష్ణ దశమి", "కృష్ణ ఏకాదశి", "కృష్ణ ద్వాదశి", "కృష్ణ త్రయోదశి", "కృష్ణ చతుర్దశి"
];

export const ENGLISH_TITHIS = [
  "Amavasya", "Shukla Padyami", "Shukla Vidiya", "Shukla Thadiya", "Shukla Chavithi", "Shukla Panchami", "Shukla Shashti", "Shukla Saptami", "Shukla Ashtami", "Shukla Navami", "Shukla Dashami", "Shukla Ekadashi", "Shukla Dwadashi", "Shukla Trayodashi", "Shukla Chaturdashi",
  "Pournami", "Krishna Padyami", "Krishna Vidiya", "Krishna Thadiya", "Krishna Chavithi", "Krishna Panchami", "Krishna Shashti", "Krishna Saptami", "Krishna Ashtami", "Krishna Navami", "Krishna Dashami", "Krishna Ekadashi", "Krishna Dwadashi", "Krishna Trayodashi", "Krishna Chaturdashi"
];

export const TELUGU_NAKSHATRAS = ["అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆర్ద్ర", "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వఫల్గుణి", "ఉత్తరఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ", "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం", "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"];
export const ENGLISH_NAKSHATRAS = ["Ashwini", "Bharani", "Krithika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushyami", "Ashlesha", "Makha", "Pubba", "Uttara", "Hastha", "Chitra", "Swathi", "Vishakha", "Anuradha", "Jyeshta", "Moola", "Poorvashada", "Uttarashada", "Shravanam", "Dhanishta", "Shathabhisham", "Poorvabhadra", "Uttarabhadra", "Revathi"];

export const TELUGU_WEEKDAYS = ["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"];
export const ENGLISH_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const RAHU_KALAM_TIMES = [
    "04:30 PM - 06:00 PM", // Sunday
    "07:30 AM - 09:00 AM", // Monday
    "03:00 PM - 04:30 PM", // Tuesday
    "12:00 PM - 01:30 PM", // Wednesday
    "01:30 PM - 03:00 PM", // Thursday
    "10:30 AM - 12:00 PM", // Friday
    "09:00 AM - 10:30 AM"  // Saturday
];

export function calculatePanchangam(date: Date, lang: 'en' | 'te' = 'te') {
  const start = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
  const D = (date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

  const normalize = (v: number) => { v %= 360; return v < 0 ? v + 360 : v; };
  const toRad = (d: number) => d * (Math.PI / 180);

  const sunML = normalize(280.460 + 0.98564736 * D);
  const sunMA = normalize(357.529 + 0.98560028 * D);
  const sunEL = normalize(sunML + 1.915 * Math.sin(toRad(sunMA)) + 0.020 * Math.sin(toRad(2 * sunMA)));
  const moonML = normalize(218.316 + 13.176396 * D);
  const moonMA = normalize(134.963 + 13.064993 * D);
  const moonEL = normalize(moonML + 6.289 * Math.sin(toRad(moonMA)));

  let angleDiff = normalize(moonEL - sunEL);
  const tithiIdx = Math.floor(angleDiff / 12);
  const tithiName = lang === 'te' ? TELUGU_TITHIS[tithiIdx % 30] : ENGLISH_TITHIS[tithiIdx % 30];
  const nakshatraIdx = Math.floor(moonEL / 13.333333);
  const nakshatraName = lang === 'te' ? TELUGU_NAKSHATRAS[nakshatraIdx % 27] : ENGLISH_NAKSHATRAS[nakshatraIdx % 27];

  const day = date.getDay();
  const weekday = lang === 'te' ? TELUGU_WEEKDAYS[day] : ENGLISH_WEEKDAYS[day];
  const rahuKalam = RAHU_KALAM_TIMES[day];

  return {
    tithi: tithiName,
    nakshatra: nakshatraName,
    rahuKalam: rahuKalam,
    weekday: weekday,
    date: date.toLocaleDateString(lang === 'te' ? 'te-IN' : 'en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  };
}
