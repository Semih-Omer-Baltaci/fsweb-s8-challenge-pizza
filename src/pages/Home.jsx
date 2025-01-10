import React from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  return (
    <div className="min-h-screen bg-pizza-beige">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-satisfy text-pizza-red mb-6">
            Teknolojik Yemekler
          </h1>
          <p className="text-xl font-barlow text-pizza-dark-gray mb-8">
            En lezzetli pizzalar, en hızlı teslimat!
          </p>
          <button
            onClick={() => history.push('/order')}
            className="bg-pizza-yellow hover:bg-opacity-90 text-pizza-dark-gray font-roboto-condensed py-4 px-8 rounded-lg text-xl transition-all"
          >
            Sipariş Ver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
