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
  