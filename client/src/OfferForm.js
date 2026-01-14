import React, { useState } from 'react';

function OfferForm({ productId, onOfferMade }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/products/${productId}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseFloat(amount) }),
    })
      .then(res => res.json())
      .then(data => {
        onOfferMade(data);
        setAmount('');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Make an Offer</h4>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <button type="submit">Submit Offer</button>
    </form>
  );
}

export default OfferForm;
