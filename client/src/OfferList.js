import React from 'react';

function OfferList({ offers, onOfferAccepted, onOfferRejected }) {
  const handleAccept = (offerId) => {
    fetch(`http://localhost:3001/api/offers/${offerId}/accept`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        onOfferAccepted(data);
      });
  };

  const handleReject = (offerId) => {
    fetch(`http://localhost:3001/api/offers/${offerId}/reject`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        onOfferRejected(data);
      });
  };

  return (
    <div>
      <h4>Offers</h4>
      <ul>
        {offers.map(offer => (
          <li key={offer.id}>
            ${offer.amount} - {offer.status}
            {offer.status === 'pending' && (
              <>
                <button onClick={() => handleAccept(offer.id)}>Accept</button>
                <button onClick={() => handleReject(offer.id)}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OfferList;
