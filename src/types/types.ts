
export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

export interface AudioItem {
  id: string;
  title: string;
  duration: string;
  category: string;
  src: string;
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  pdfUrl: string;
}
