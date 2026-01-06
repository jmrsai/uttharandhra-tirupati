
export const AUDIO_TRACKS = (lang: string) => [
  { id: 'aud1', title: 'Sri Venkateswara Suprabhatam', category: lang === 'te' ? 'మంత్రాలు' : 'Hymns', duration: '28:32', src: '/' },
  { id: 'aud2', title: 'Govinda Namalu', category: lang === 'te' ? 'జపాలు' : 'Chants', duration: '15:45', src: '/' },
  { id: 'aud3', title: 'Annamacharya Keerthanalu', category: lang === 'te' ? 'భక్తి గీతాలు' : 'Devotional', duration: '42:11', src: '/' },
];

export const VIDEOS = [
  { id: 'vid1', title: 'Nitya Kalyanotsavam Highlights', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=abcdef123456' },
  { id: 'vid2', title: 'Vaikuntha Ekadashi Special Darshan', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=abcdef123456' },
];

export const BOOKS = (lang: string) => [
  { id: 'book1', title: 'The Legend of Tirumala', author: 'Devasthanam Publications', coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400', pdfUrl: '/' },
  { id: 'book2', title: 'Srinivasa Vaibhavam', author: 'Acharya Veda Vyasa', coverImage: 'https://images.unsplash.com/photo-1519682337058-e9a3c321b28b?auto=format&fit=crop&q=80&w=400', pdfUrl: '/' },
  { id: 'book3', title: lang === 'te' ? 'క్షేత్ర చరిత్ర' : 'Temple History', author: 'Local Historians', coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400', pdfUrl: '/' },
];
