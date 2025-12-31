
import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { NotificationContext } from '../context/NotificationContext';

const Donation: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const { language } = useContext(LanguageContext);
  const { showNotification } = useContext(NotificationContext);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !amount) {
      showNotification(language === 'en' ? 'Please fill in all fields' : 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి');
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
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Sri Surabhi Goseva',
        description: 'Donation',
        order_id: order.id,
        handler: async function (response: any) {
          console.log('Payment successful (Razorpay response):', response);
          alert('Payment processing... Please wait.');

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
              console.log('Backend verification successful:', verificationResult);
              alert('Donation Successful and Verified! Thank you for your support.');
              setName('');
              setEmail('');
              setAmount('');
            } else {
              console.error('Backend verification failed:', verificationResult);
              alert(`Donation successful, but verification failed: ${verificationResult.message || 'Unknown error'}. Please contact support.`);
            }
          } catch (error) {
            console.error('Error during backend verification:', error);
            alert('An error occurred during payment verification. Please contact support.');
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
          color: '#3399cc',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error creating order:', error);
      showNotification(language === 'en' ? 'Failed to create order. Please try again.' : 'ఆర్డర్ సృష్టించడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.');
    }
  };

  return (
    <div className="donation-container">
      <h2>{language === 'en' ? 'Make a Donation' : 'విరాళం ఇవ్వండి'}</h2>
      <form onSubmit={handleDonate}>
        <div className="form-group">
          <label htmlFor="name">{language === 'en' ? 'Name' : 'పేరు'}</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">{language === 'en' ? 'Email' : 'ఇమెయిల్'}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">{language === 'en' ? 'Amount (INR)' : 'మొత్తం (INR)'}</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>{language === 'en' ? 'Donation Type' : 'విరాళం రకం'}</label>
          <div>
            <input
              type="radio"
              id="one-time"
              name="donationType"
              value="one-time"
              checked={donationType === 'one-time'}
              onChange={() => setDonationType('one-time')}
            />
            <label htmlFor="one-time">{language === 'en' ? 'One-Time' : 'ఒకసారి'}</label>
          </div>
          <div>
            <input
              type="radio"
              id="monthly"
              name="donationType"
              value="monthly"
              checked={donationType === 'monthly'}
              onChange={() => setDonationType('monthly')}
            />
            <label htmlFor="monthly">{language === 'en' ? 'Monthly' : 'నెలవారీ'}</label>
          </div>
        </div>
        <button type="submit">{language === 'en' ? 'Donate Now' : 'ఇప్పుడే విరాళం ఇవ్వండి'}</button>
      </form>
    </div>
  );
};

export default Donation;
