import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import API_BASE_URL from './apiConfig';

export default function StripeCheckout() {
  const { authTokens } = useContext(AuthContext);

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stripe/checkout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens?.access}`,
        },
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();
      // Redirect to Stripe checkout URL
      window.location.href = data.checkout_url;
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  return (
    <button onClick={handleCheckout}>
      Upgrade to Premium
    </button>
  );
}