
import React from 'react';
import { Home, Video, Music, BookOpen, Image as ImageIcon, Flower, Gift, ScrollText } from 'lucide-react';
import { DarshanTiming, NewsItem, VideoItem, AudioItem, BookItem, GalleryItem, NavItem, SevaItem } from '../types';

export const YOUTUBE_CONFIG = {
  API_KEY: '', 
  CHANNEL_HANDLE: '@ramanujampendurthi1012', 
  CHANNEL_ID: '', 
};

export const getNavItems = (t: (key: string) => string): NavItem[] => [
  { label: t('nav.home'), path: '/', icon: <Home className="w-5 h-5" /> },
  { label: t('nav.history'), path: '/history', icon: <ScrollText className="w-5 h-5" /> },
  { label: t('nav.sevas'), path: '/sevas', icon: <Flower className="w-5 h-5" /> },
  { label: t('nav.donation'), path: '/donation', icon: <Gift className="w-5 h-5" /> },
  { label: t('nav.videos'), path: '/videos', icon: <Video className="w-5 h-5" /> },
  { label: t('nav.audio'), path: '/audio', icon: <Music className="w-5 h-5" /> },
  { label: t('nav.library'), path: '/library', icon: <BookOpen className="w-5 h-5" /> },
  { label: t('nav.gallery'), path: '/gallery', icon: <ImageIcon className="w-5 h-5" /> },
];

export const SCROLL_NEWS = (lang: string) => lang === 'te' ? [
  "శ్రీ వెంకటాద్రి పెందుర్తి ఆలయంలో నిత్య అన్నదాన కార్యక్రమం ప్రారంభం.",
  "ఈ శనివారం స్వామివారికి విశేష పుష్పాలంకరణ సేవ.",
  "భక్తుల సౌకర్యార్థం ఆన్‌లైన్ ద్వారా సేవ టిక్కెట్ల బుకింగ్ త్వరలో.",
  "తిరుమల తరహాలో ప్రతి రోజూ సుప్రభాత సేవ ఉదయం 6 గంటలకు."
] : [
  "Daily Annadanam program started at Sri Venkatadri Pendurthi Temple.",
  "Special Pushpalamkarana Seva for Swamy this Saturday.",
  "Online Seva ticket booking facility coming soon.",
  "Suprabhatha Seva daily at 6:00 AM like in Tirumala."
];

export const DARSHAN_TIMINGS = (lang: string): DarshanTiming[] => [
  { 
    period: lang === 'te' ? 'సుప్రభాతం' : 'Suprabhatham', 
    time: '06:00 AM - 06:30 AM', 
    description: lang === 'te' ? 'స్వామివారి మేల్కొలుపు సేవ' : 'Waking up ceremony' 
  },
  { 
    period: lang === 'te' ? 'సర్వ దర్శనం' : 'Sarva Darshanam', 
    time: '07:30 AM - 12:30 PM', 
    description: lang === 'te' ? 'సాధారణ భక్తులకు దర్శనం' : 'Public Darshan' 
  },
  { 
    period: lang === 'te' ? 'విరామం' : 'Break', 
    time: '12:30 PM - 04:00 PM', 
    description: lang === 'te' ? 'ఆలయం మూసివేయబడును' : 'Temple remains closed' 
  },
  { 
    period: lang === 'te' ? 'సాయంకాల దర్శనం' : 'Evening Darshan', 
    time: '04:00 PM - 08:00 PM', 
    description: lang === 'te' ? 'సర్వ దర్శనం' : 'Public Darshan' 
  },
];

export const SEVAS = (lang: string): SevaItem[] => [
  { 
    id: '1', 
    name: lang === 'te' ? 'సుప్రభాతం' : 'Suprabhatham', 
    time: '06:00 AM', 
    description: lang === 'te' ? 'గోవిందుని మేల్కొలుపు సేవ.' : 'Morning ritual for Lord Govinda.', 
    availability: 'Daily' 
  },
  { 
    id: '2', 
    name: lang === 'te' ? 'తోమాల సేవ' : 'Thomala Seva', 
    time: '06:30 AM', 
    description: lang === 'te' ? 'పుష్పాలతో స్వామివారి అలంకరణ.' : 'Floral decoration of the Lord.', 
    availability: 'Daily' 
  },
  { 
    id: '4', 
    name: lang === 'te' ? 'కళ్యాణోత్సవం' : 'Kalyanotsavam', 
    time: '10:00 AM', 
    description: lang === 'te' ? 'స్వామి వారి కళ్యాణం.' : 'Celestial wedding of the Lord.', 
    availability: 'Saturday Only' 
  },
];

export const NEWS_ITEMS = (lang: string): NewsItem[] => [
  {
    id: 1,
    title: lang === 'te' ? 'వార్షిక బ్రహ్మోత్సవాలు' : 'Annual Brahmotsavams',
    date: '2024-05-20',
    description: lang === 'te' ? 'వచ్చే నెలలో జరగబోయే వార్షిక బ్రహ్మోత్సవాల ఏర్పాట్లు ఘనంగా జరుగుతున్నాయి.' : 'Arrangements for upcoming Annual Brahmotsavams are in full swing.',
    image: 'https://picsum.photos/id/1047/400/250',
  },
  {
    id: 2,
    title: lang === 'te' ? 'నిత్య అన్నదానం' : 'Daily Annadanam',
    date: '2024-05-15',
    description: lang === 'te' ? 'భక్తుల విరాళాలతో నిత్య అన్నదాన కార్యక్రమం కొనసాగుతోంది.' : 'Daily Annadanam program continues with the help of devotees contributions.',
    image: 'https://picsum.photos/id/292/400/250',
  },
];

export const VIDEOS: VideoItem[] = [
  {
    id: 'gYWVjDzJERE',
    title: 'Sri Venkatadri Devasthanam - Special Rituals & Sevas',
    thumbnail: 'https://img.youtube.com/vi/gYWVjDzJERE/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/gYWVjDzJERE', 
  },
  {
    id: 'QFwYbYbYLS0',
    title: 'Uttharandhra Tirupati - Divine Darshan & Live Events',
    thumbnail: 'https://img.youtube.com/vi/QFwYbYbYLS0/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/QFwYbYbYLS0', 
  }
];

export const AUDIO_TRACKS = (lang: string): AudioItem[] => [
  { 
    id: '1', 
    title: lang === 'te' ? 'శ్రీ వెంకటేశ్వర సుప్రభాతం' : 'Sri Venkateswara Suprabhatham', 
    duration: '21:30', 
    category: 'Sloka', 
    src: 'https://www.tirumala.org/OtherSankeertans/01%20SRI%20VENKATESWARA%20SUPRABHATHAM/01%20SUPRABHATHAM.mp3' 
  },
  { 
    id: '2', 
    title: lang === 'te' ? 'గోవింద నామాలు' : 'Govinda Namalu', 
    duration: '10:45', 
    category: 'Song', 
    src: 'https://www.tirumala.org/OtherSankeertans/00%20GOVINDA%20NAMALU/00%20GOVINDA%20NAMALU.mp3' 
  },
  { 
    id: '3', 
    title: lang === 'te' ? 'ఓం నమో నారాయణాయ' : 'Om Namo Narayanaya', 
    duration: '06:15', 
    category: 'Sloka', 
    src: 'https://www.tirumala.org/OtherSankeertans/01%20SRI%20VENKATESWARA%20SUPRABHATHAM/05%20OM%20NAMO%20NARAYANAYA.mp3' 
  },
  { 
    id: '4', 
    title: lang === 'te' ? 'భజ గోవిందం' : 'Bhaja Govindam', 
    duration: '31:22', 
    category: 'Sloka', 
    src: 'https://www.tirumala.org/OtherSankeertans/31%20BHAJA%20GOVINDAM/01%20BHAJA%20GOVINDAM.mp3' 
  },
];

export const BOOKS = (lang: string): BookItem[] => [
  { id: '1', title: lang === 'te' ? 'తిరుమల చరిత్ర' : 'History of Tirumala', author: 'TTD Publications', coverImage: 'https://picsum.photos/id/24/300/450', pdfUrl: '#' },
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: '1', src: 'https://drive.google.com/uc?export=view&id=1FrJYgJOYsF6Mr8E_syOPYlQMLMUNphas', alt: 'Temple Alankaram', category: 'Ritual' },
  { id: '2', src: 'https://drive.google.com/uc?export=view&id=1jAriql4tDfjvZpupaAKPHsSUPU7Yn0H6', alt: 'Main Gopuram', category: 'Architecture' },
  { id: '3', src: 'https://drive.google.com/uc?export=view&id=1Kbvp7xT5K4ZflPZ6K2vWOnyDx_wvsQxh', alt: 'Sri Venkateswara Swamy', category: 'Deity' },
  { id: '4', src: 'https://drive.google.com/uc?export=view&id=1cZkAqOkJrOOhay2q_pGj8Ua7OuLUYBDW', alt: 'Golden Vimaanam', category: 'Temple' },
  { id: '5', src: 'https://drive.google.com/uc?export=view&id=1J9ZB3NkaQsl3cHmL3OmdKhk0rsvyi-TU', alt: 'Festival Pandal', category: 'Event' },
  { id: '6', src: 'https://drive.google.com/uc?export=view&id=133dZrOSKMw6VtV5EEJs24tvbTx8gOlNo', alt: 'Pushpa Alankaram', category: 'Ritual' },
  { id: '7', src: 'https://drive.google.com/uc?export=view&id=1RVNLgtnqAUDTGiLxtl1JP93XESIpzLxu', alt: 'Night Illumination', category: 'Temple' },
  { id: '8', src: 'https://drive.google.com/uc?export=view&id=18q_RkoxMkhb5Ed3PD8k7qAWHZEIqFgxC', alt: 'Garuda Vahanam', category: 'Ritual' },
  { id: '9', src: 'https://drive.google.com/uc?export=view&id=10x_rNFWen6lDdyiXSNPpvOP4b-UQyI2y', alt: 'Temple Corridor', category: 'Architecture' },
  { id: '10', src: 'https://drive.google.com/uc?export=view&id=1pj8X93ae1j5n0uIxt0jttPb8xJxPtIR-', alt: 'Deepotsavam', category: 'Ritual' },
  { id: '11', src: 'https://drive.google.com/uc?export=view&id=1LeGF2VQZTdAxu1BT8yVZMHOoMJgdR5zD', alt: 'Hill View', category: 'Scenery' },
  { id: '12', src: 'https://drive.google.com/uc?export=view&id=1izB4TLuuLQ__lh1bbSq10gElI0fSKFyn', alt: 'Alivelu Mangamma', category: 'Deity' },
  { id: '13', src: 'https://drive.google.com/uc?export=view&id=11l8ACmJrznioS1J5pXJcH7HHDn9FPkva', alt: 'Kalyanotsavam', category: 'Event' },
  { id: '14', src: 'https://drive.google.com/uc?export=view&id=1Hnje_5bZ-ogPN-3gRv0mPSVBjg6kUYsi', alt: 'Temple Entrance', category: 'Architecture' },
  { id: '15', src: 'https://drive.google.com/uc?export=view&id=18VTFT71avoQRaeCvNNKfMVYnVJ3LTXm9', alt: 'Abhishekam', category: 'Ritual' },
  { id: '16', src: 'https://drive.google.com/uc?export=view&id=1wOEAaFAwiExHhdawpntnp3-KlX4eDdSA', alt: 'Golden Archway', category: 'Architecture' },
  { id: '17', src: 'https://drive.google.com/uc?export=view&id=1cjhgcJ8a3G3l6n0TcRGsUy8jc3UzNXiI', alt: 'Devotional Prayer', category: 'Ritual' },
  { id: '18', src: 'https://drive.google.com/uc?export=view&id=10rcyQ-rvLYdznjXadNbet3x02aFxQD1j', alt: 'Temple Panorama', category: 'Temple' },
];
