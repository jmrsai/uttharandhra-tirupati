
import React, { useState, useContext } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NotificationContext } from '../context/NotificationContext';
import { IndianRupee, User, Mail, HeartHandshake, Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const Donation: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const { t } = useLanguage();
  const { showNotification } = useContext(NotificationContext);

  const impactData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 700 },
    { name: 'Mar', value: 1200 },
    { name: 'Apr', value: 900 },
    { name: 'May', value: 1500 },
  ];

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
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-accent/30"
        >
          <HeartHandshake className="w-12 h-12 text-accent" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold font-header text-primary mb-6"
        >
          {t('donation.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-secondary/70 mt-2 text-xl font-light max-w-2xl mx-auto"
        >
          {t('donation.subtitle')}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl border border-neutral/10"
        >
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

            <div className="pt-8">
              <button type="submit" className="group relative w-full bg-primary text-white font-bold py-5 rounded-2xl text-xl hover:bg-secondary transition-all shadow-xl hover:shadow-primary/40 active:scale-[0.98] flex items-center justify-center gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 shimmer-bg"></div>
                <HeartHandshake className="w-8 h-8 group-hover:scale-110 transition-transform" />
                {t('donation.donate_now')}
              </button>
            </div>
            <p className="text-center text-xs text-neutral tracking-widest uppercase pt-6 font-bold flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              {t('donation.secure_payment')}
            </p>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-br from-primary to-secondary p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl"></div>
            <h3 className="text-3xl font-bold mb-6 flex items-center gap-4">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md"><TrendingUp className="w-8 h-8 text-accent" /></div>
              Donation Impact
            </h3>
            <p className="text-white/80 text-lg font-light leading-relaxed mb-10">
              Your contributions directly support the maintenance of the temple and the various social welfare activities conducted by the Devasthanam.
            </p>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={impactData}>
                  <defs>
                    <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F6E05E" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#F6E05E" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1A202C', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#F6E05E', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#F6E05E" strokeWidth={4} fill="url(#colorImpact)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
                <span className="block text-accent font-bold text-3xl mb-1">10k+</span>
                <span className="text-white/60 text-sm">Lives Touched</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10">
                <span className="block text-accent font-bold text-3xl mb-1">50+</span>
                <span className="text-white/60 text-sm">Social Events</span>
              </div>
            </div>
          </div>

          <div className="bg-base-100 p-10 rounded-[3rem] border border-neutral/10 shadow-xl">
            <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-4">
              <div className="bg-primary/5 p-3 rounded-2xl text-primary"><Sparkles className="w-7 h-7" /></div>
              Special Contribution
            </h3>
            <p className="text-neutral-content font-light leading-relaxed mb-6">
              For large donations or temple sponsorship, please contact the Devasthanam office directly.
            </p>
            <Link to="/contact" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Contact Office <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Donation;
