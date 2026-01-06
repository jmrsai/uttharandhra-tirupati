
import { ExternalLink, MapPin, Phone } from 'lucide-react';

const Location = ({ lang }: { lang: string }) => (
  <section id="location" className="py-32 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="reveal-on-scroll opacity-0 translate-y-10">
          <div className="w-20 h-1 bg-[#FF9933] mb-10 rounded-full"></div>
          <h2 className="text-5xl md:text-7xl font-black text-[#800000] mb-12 tracking-tight">{lang === 'te' ? 'నిలయ చిరునామా' : 'Find Your Way'}</h2>
          <div className="space-y-12">
            <div className="flex gap-8 items-start group">
              <div className="w-20 h-20 bg-[#fdf2f2] text-[#800000] rounded-[32px] flex items-center justify-center shrink-0 shadow-xl group-hover:bg-[#800000] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                <MapPin size={40} />
              </div>
              <div>
                <h4 className="font-black text-2xl text-gray-900 mb-3 tracking-tight">Main Shrine Address</h4>
                <p className="text-gray-600 leading-relaxed font-bold text-xl opacity-90">
                  Utthandhra Tirumala,<br />
                  Main Road, Pendurthi,<br />
                  Visakhapatnam District,<br />
                  Andhra Pradesh - 531173
                </p>
              </div>
            </div>
            <div className="flex gap-8 items-start group">
              <div className="w-20 h-20 bg-[#fdf2f2] text-[#800000] rounded-[32px] flex items-center justify-center shrink-0 shadow-xl group-hover:bg-[#800000] group-hover:text-white transition-all duration-500 transform group-hover:-rotate-6">
                <Phone size={40} />
              </div>
              <div>
                <h4 className="font-black text-2xl text-gray-900 mb-3 tracking-tight">Inquiry Desk</h4>
                <p className="text-[#FF9933] font-black text-4xl tracking-tighter mb-1">+91 891 270XXXX</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-black uppercase tracking-widest">Available 6 AM - 9 PM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-16">
            <a 
              href="https://maps.app.goo.gl/BUg6rKXTbpuu2Uaz7" 
              target="_blank"
              className="bg-[#800000] text-white px-12 py-5 rounded-[28px] font-black text-lg hover:bg-[#b30000] transition-all shadow-[0_20px_40px_rgba(128,0,0,0.4)] flex items-center gap-3 transform hover:scale-105 active:scale-95"
            >
              Open in Navigation <ExternalLink size={24} />
            </a>
            <button className="bg-white text-[#800000] border-4 border-[#800000]/10 px-12 py-5 rounded-[28px] font-black text-lg hover:border-[#800000] transition-all shadow-md active:scale-95">
              Contact Secretary
            </button>
          </div>
        </div>
        <div className="reveal-on-scroll opacity-0 translate-y-10 h-[650px] rounded-[80px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(128,0,0,0.4)] relative border-[16px] border-white group">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.123456789012!2d83.197!3d17.8105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a39151555555555%3A0x6666666666666666!2sPendurthi!5e0!3m2!1sen!2sin!4v1710000000000"
            className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-1000"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute top-10 left-10 bg-white/95 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl flex items-center gap-5 group-hover:translate-x-2 transition-transform">
            <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,197,94,0.6)]"></div>
            <div>
              <span className="block text-lg font-black text-[#800000] uppercase tracking-wider leading-none">Temple Shrine</span>
              <span className="block text-sm text-gray-500 font-black mt-1 uppercase tracking-widest">Open Now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Location;
