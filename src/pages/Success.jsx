import React from 'react';
import { useHistory } from 'react-router-dom';

const Success = () => {
  const history = useHistory();

  return (
    <div className="min-h-screen bg-pizza-beige">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-satisfy text-pizza-red mb-6">
            Siparişiniz Alındı!
          </h1>
          <p className="text-xl font-barlow text-pizza-dark-gray mb-8">
            Siparişiniz başarıyla alındı. Lezzetli pizzanız hazırlanıyor!
          </p>
          <button
            onClick={() => history.push('/')}
            className="bg-pizza-yellow hover:bg-opacity-90 text-pizza-dark-gray font-roboto-condensed py-3 px-6 rounded transition-all"
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
