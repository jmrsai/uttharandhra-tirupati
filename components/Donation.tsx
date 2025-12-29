
import React, { useState } from 'react';
import { Gift, Heart, CreditCard, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { logEvent } from '../firebase';

const Donation: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [donationType, setDonationType] = useState('General Hundi');
  const { t } = useLanguage();

  const handleDonate = () => {
    logEvent('donation_initiated', {
      amount: amount || '0',
      donor_name: name || 'Anonymous',
      donation_type: donationType
    });
    alert("This is a demo. In a real application, you would be redirected to a payment gateway.");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-saffron-700 font-header mb-4">{t('donation.title')}</h1>
        <p className="text-stone-600 max-w-2xl mx-auto text-lg">
          {t('donation.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-saffron-100">
          <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center gap-2">
            <Gift className="text-saffron-600" /> {t('donation.form_title')}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t('donation.type')}</label>
              <select 
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
                className="w-full rounded-md border-stone-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 p-2 border bg-stone-50"
              >
                <option>General Hundi</option>
                <option>Annaprasadam (Annadanam)</option>
                <option>Gosamrakshana (Gosala)</option>
                <option>Vidyadanam</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t('donation.amount')}</label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {['116', '516', '1116'].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`py-1 px-2 rounded border text-sm ${amount === val ? 'bg-saffron-100 border-saffron-500 text-saffron-800' : 'border-stone-200 hover:bg-stone-50'}`}
                  >
                    ₹ {val}
                  </button>
                ))}
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="w-full rounded-md border-stone-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t('donation.name')}</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full rounded-md border-stone-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">{t('donation.gothram')}</label>
              <input 
                type="text" 
                placeholder="Gothram"
                className="w-full rounded-md border-stone-300 shadow-sm focus:border-saffron-500 focus:ring-saffron-500 p-2 border"
              />
            </div>

            <button 
              onClick={handleDonate}
              className="w-full bg-saffron-600 text-white font-bold py-3 rounded-lg hover:bg-saffron-700 transition-colors shadow-md mt-4 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              {t('donation.submit')}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-saffron-500 to-red-600 text-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-bold mb-4">Scan & Pay (UPI)</h3>
            <div className="bg-white p-4 rounded-lg inline-block mx-auto mb-4">
               <div className="w-48 h-48 bg-stone-100 flex items-center justify-center border-2 border-stone-300 border-dashed rounded text-stone-400">
                 QR Code
               </div>
            </div>
            <p className="text-sm opacity-90">UPI ID: uttharandhratirupati@upi</p>
            <p className="text-xs mt-2 opacity-75">PhonePe / GPay / Paytm</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border border-stone-100">
            <h3 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-green-600" /> {t('donation.security_title')}
            </h3>
            <ul className="text-sm text-stone-600 space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('donation.sec1')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('donation.sec2')}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                {t('donation.sec3')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
