import React from 'react';

export interface Temple { 
    id: string;
    name: string;
    description: string;
    location: string;
    timings: string;
    poojas: string[];
    image: string;
    mapUrl: string;
    accommodation: string;
    nearbyTemples: string[];
  }

  export interface AudioItem {
    id: string;
    title: string;
    artist: string;
    src: string;
    image: string;
    category: string;
    duration: string;
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

  export interface NavItem {
    label: string;
    path: string;
    icon: React.ReactNode;
  }

  export interface SevaItem {
    id: string;
    name: string;
    time: string;
    description: string;
    availability: string;
  }
