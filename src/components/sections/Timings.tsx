
import { Clock, Sunrise, Sunset, Zap } from 'lucide-react';

const timingsData = {
  en: {
    title: 'Temple Timings',
    timings: [
      { icon: Sunrise, name: 'Suprabhata Seva', time: '4:30 AM - 5:00 AM' },
      { icon: Clock, name: 'Sarva Darshan', time: '6:00 AM - 9:00 PM' },
      { icon: Zap, name: 'Special Pooja', time: '10:00 AM - 12:00 PM' },
      { icon: Sunset, name: 'Ekantha Seva', time: '9:30 PM' },
    ],
  },
  te: {
    title: 'ఆలయ సమయాలు',
    timings: [
      { icon: Sunrise, name: 'సుప్రభాత సేవ', time: 'ఉదయం 4:30 - 5:00' },
      { icon: Clock, name: 'సర్వ దర్శనం', time: 'ఉదయం 6:00 - రాత్రి 9:00' },
      { icon: Zap, name: 'ప్రత్యేక పూజ', time: 'ఉదయం 10:00 - మధ్యాహ్నం 12:00' },
      { icon: Sunset, name: 'ఏకాంత సేవ', time: 'రాత్రి 9:30' },
    ],
  },
};

const Timings = ({ lang }: { lang: string }) => {
  const { title, timings } = timingsData[lang] || timingsData.en;

  return (
    <section id="timings" className="py-20 bg-[#fff8f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal-on-scroll">
          <h2 className="text-4xl font-bold text-[#800000]">{title}</h2>
          <div className="w-24 h-1 bg-[#FF9933] mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timings.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center reveal-on-scroll transform hover:scale-105 transition-transform duration-300">
              <item.icon className="w-16 h-16 text-[#FF9933] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#800000] mb-2">{item.name}</h3>
              <p className="text-gray-600 text-lg">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timings;
