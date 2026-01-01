
import React, { useState, useContext } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NotificationContext } from '../context/NotificationContext';
import { IndianRupee, User, Mail, HeartHandshake } from 'lucide-react';

const Donation: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const { t } = useLanguage();
  const { showNotification } = useContext(NotificationContext);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !amount) {
        showNotification(t('donation.fill_all_fields'), 'error');
      return;
    }

    try {
      const response = await fetch('/api/donations/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Number(amount) * 100 }), // Amount in paise
      });

      const order = await response.json();
      if (!response.ok) {
        throw new Error(order.message || 'Failed to create order');
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Sri Surabhi Goseva',
        description: 'Donation',
        order_id: order.id,
        handler: async function (response: any) {
          showNotification(t('donation.processing'), 'info');

          try {
            const verificationResponse = await fetch('/api/donations/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verificationResult = await verificationResponse.json();

            if (verificationResponse.ok) {
                showNotification(t('donation.success'), 'success');
              setName('');
              setEmail('');
              setAmount('');
            } else {
                showNotification(`${t('donation.verification_failed')}: ${verificationResult.message || 'Unknown error'}`, 'error');
            }
          } catch (error) {
            console.error('Error during backend verification:', error);
            showNotification(t('donation.verification_error'), 'error');
          }
        },
        prefill: {
          name: name,
          email: email,
        },
        notes: {
          donationType: donationType,
        },
        theme: {
          color: '#1A202C',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      showNotification(t('donation.order_failed'), 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <HeartHandshake className="w-16 h-16 mx-auto text-accent mb-4" />
      <h1 className="text-4xl font-bold font-header text-primary">{t('donation.title')}</h1>
      <p className="text-secondary mt-2 text-lg">{t('donation.subtitle')}</p>
    </div>

    <div className="bg-base-100 p-8 md:p-12 rounded-3xl shadow-lg border border-neutral/20">
      <form onSubmit={handleDonate} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-secondary uppercase tracking-wider">{t('donation.amount_inr')}</label>
            <div className="flex gap-2">
              {['101', '251', '501', '1001'].map(val => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${amount === val ? 'bg-primary text-white scale-105' : 'bg-neutral/20 text-secondary hover:bg-neutral/30'}`}>
                  ₹{val}
                </button>
              ))}
            </div>
            <div className="relative">
              <IndianRupee className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-neutral" />
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={t('donation.enter_amount')}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral/30 bg-white focus:ring-2 focus:ring-accent outline-none font-medium text-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-secondary uppercase tracking-wider mb-2" htmlFor="name">{t('donation.name')}</label>
              <div className="relative">
                <User className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-neutral" />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral/30 bg-white focus:ring-2 focus:ring-accent outline-none"
                  placeholder={t('donation.your_name')}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-secondary uppercase tracking-wider mb-2" htmlFor="email">{t('donation.email')}</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 -translate-y-1/2 w-5 h-5 text-neutral" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-neutral/30 bg-white focus:ring-2 focus:ring-accent outline-none"
                  placeholder={t('donation.your_email')}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
            <label className="block text-sm font-bold text-secondary uppercase tracking-wider mb-3">{t('donation.type')}</label>
            <div className="flex gap-4 p-2 bg-neutral/10 rounded-xl">
                <button type="button" onClick={() => setDonationType('one-time')} className={`w-full py-3 rounded-lg font-bold transition-all ${donationType === 'one-time' ? 'bg-primary text-white' : 'text-secondary hover:bg-white/50'}`}>
                    {t('donation.one_time')}
                </button>
                <button type="button" onClick={() => setDonationType('monthly')} className={`w-full py-3 rounded-lg font-bold transition-all ${donationType === 'monthly' ? 'bg-primary text-white' : 'text-secondary hover:bg-white/50'}`}>
                    {t('donation.monthly')}
                </button>
            </div>
        </div>

        <div className="pt-6">
          <button type="submit" className="w-full bg-accent text-primary font-bold py-5 rounded-2xl text-lg hover:bg-primary hover:text-white transition-all shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3">
            <HeartHandshake className="w-6 h-6" />
            {t('donation.donate_now')}
          </button>
        </div>
        <p className="text-center text-xs text-neutral tracking-wide pt-4">{t('donation.secure_payment')}</p>
      </form>
    </div>
  </div>
  );
};

export default Donation;
