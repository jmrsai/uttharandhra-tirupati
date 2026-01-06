
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = ({ lang }: { lang: string }) => {
  return (
    <section id="contact" className="py-20 bg-[#fff8f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 reveal-on-scroll">
          <h2 className="text-4xl font-bold text-[#800000]">{lang === 'te' ? 'మమ్మల్ని సంప్రదించండి' : 'Contact Us'}</h2>
          <div className="w-24 h-1 bg-[#FF9933] mx-auto mt-4"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-lg reveal-on-scroll">
            <h3 className="text-2xl font-bold text-[#800000] mb-6">{lang === 'te' ? 'విచారణ ఫారం' : 'Inquiry Form'}</h3>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">{lang === 'te' ? 'పేరు' : 'Name'}</label>
                <input type="text" id="name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">{lang === 'te' ? 'ఇమెయిల్' : 'Email'}</label>
                <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">{lang === 'te' ? 'సందేశం' : 'Message'}</label>
                <textarea id="message" rows={4} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9933]"></textarea>
              </div>
              <button type="submit" className="bg-[#800000] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#a04040] transition-colors">{lang === 'te' ? 'సందేశం పంపండి' : 'Send Message'}</button>
            </form>
          </div>
          <div className="reveal-on-scroll">
            <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-[#800000] mb-6">{lang === 'te' ? 'సంప్రదింపు వివరాలు' : 'Contact Details'}</h3>
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-[#FF9933] mr-4" />
                <p className="text-gray-700">Utthandhra Tirumala, Srikakulam District, Andhra Pradesh</p>
              </div>
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-[#FF9933] mr-4" />
                <p className="text-gray-700">info@utthandhratirumala.com</p>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-[#FF9933] mr-4" />
                <p className="text-gray-700">+91 123 456 7890</p>
              </div>
            </div>
            <div className="h-64 md:h-80 rounded-lg shadow-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.833979782292!2d83.8961914148809!3d18.3242239873469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3c9b4f2cffffff%3A0x6bced4e8a8a2a7b8!2sArasavalli%20Surya%20Narayana%20Swamy%20Temple!5e0!3m2!1sen!2sin!4v1620727025816!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border:0 }} 
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
