import React from 'react';
import { useHistory } from 'react-router-dom';

const Success = ({ orderSummary }) => {
  const history = useHistory();

  if (!orderSummary) {
    history.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-600 mb-4">
              Siparişiniz Alındı!
            </h1>
            <p className="text-xl text-gray-600">
              Siparişiniz başarıyla alındı. Lezzetli pizzanız hazırlanıyor!
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-semibold mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Sipariş No:</span>
                <span className="font-medium">{orderSummary.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tarih:</span>
                <span className="font-medium">
                  {new Date(orderSummary.orderDate).toLocaleString('tr-TR')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pizza Boyutu:</span>
                <span className="font-medium">{orderSummary.size}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hamur:</span>
                <span className="font-medium">{orderSummary.doughType}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Malzemeler:</span>
                <span className="font-medium text-right">
                  {orderSummary.toppings.join(', ')}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Adet:</span>
                <span className="font-medium">{orderSummary.quantity}</span>
              </div>
              
              {orderSummary.note && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Not:</span>
                  <span className="font-medium">{orderSummary.note}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold">Toplam:</span>
                <span className="text-lg font-bold text-green-600">
                  {orderSummary.totalPrice.toFixed(2)}₺
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => history.push('/')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded transition-all"
            >
              Anasayfaya Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
