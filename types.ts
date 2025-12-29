
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export interface DarshanTiming {
  period: string;
  time: string;
  description: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

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
  category: 'Song' | 'Podcast' | 'Sloka';
  src: string; // URL to audio file
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  pdfUrl: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
}

export interface SevaItem {
  id: string;
  name: string;
  time: string;
  description: string;
  availability: string;
}

export interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  type: 'Suggestion' | 'Issue';
  message: string;
  date: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  category: 'General' | 'Festival' | 'Seva' | 'Timing';
  timestamp: string;
  isRead: boolean;
}
