import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const TOPPINGS = [
  { id: 1, name: 'Pepperoni' },
  { id: 2, name: 'Mantar' },
  { id: 3, name: 'Zeytin' },
  { id: 4, name: 'Soğan' },
  { id: 5, name: 'Mısır' },
  { id: 6, name: 'Sucuk' },
  { id: 7, name: 'Jalapeno' },
  { id: 8, name: 'Biber' },
  { id: 9, name: 'Domates' },
  { id: 10, name: 'Sosis' },
];

const SIZES = [
  { id: 'small', name: 'Küçük', price: 50 },
  { id: 'medium', name: 'Orta', price: 75 },
  { id: 'large', name: 'Büyük', price: 100 },
];

const OrderPizza = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: '',
    size: 'medium',
    toppings: [],
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToppingChange = (toppingId) => {
    setFormData(prev => {
      const toppings = prev.toppings.includes(toppingId)
        ? prev.toppings.filter(id => id !== toppingId)
        : [...prev.toppings, toppingId];
      return { ...prev, toppings };
    });
  };

  const isFormValid = () => {
    return (
      formData.name.length >= 3 &&
      formData.toppings.length >= 4 &&
      formData.toppings.length <= 10 &&
      formData.size
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://reqres.in/api/pizza', formData);
      console.log('Sipariş özeti:', response.data);
      history.push('/success');
    } catch (error) {
      console.error('Sipariş hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-pizza-beige py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-satisfy text-pizza-red text-center mb-8">
          Pizza Sipariş Formu
        </h1>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-lg">
          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-pizza-dark-gray font-barlow mb-2">
              İsim
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              minLength={3}
              required
              className="w-full p-2 border border-pizza-light-gray rounded focus:outline-none focus:border-pizza-yellow"
              placeholder="İsminizi girin (en az 3 karakter)"
            />
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h2 className="text-pizza-dark-gray font-barlow mb-2">Pizza Boyutu</h2>
            <div className="flex gap-4">
              {SIZES.map(size => (
                <label key={size.id} className="flex items-center">
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={formData.size === size.id}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-pizza-light-gray">{size.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toppings Selection */}
          <div className="mb-6">
            <h2 className="text-pizza-dark-gray font-barlow mb-2">
              Malzemeler (4-10 arası seçim yapın)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {TOPPINGS.map(topping => (
                <label key={topping.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.toppings.includes(topping.id)}
                    onChange={() => handleToppingChange(topping.id)}
                    className="mr-2"
                  />
                  <span className="text-pizza-light-gray">{topping.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label htmlFor="notes" className="block text-pizza-dark-gray font-barlow mb-2">
              Notlar
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border border-pizza-light-gray rounded focus:outline-none focus:border-pizza-yellow"
              rows="3"
              placeholder="Özel isteklerinizi buraya yazabilirsiniz"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full bg-pizza-yellow text-pizza-dark-gray font-roboto-condensed py-3 rounded transition-all ${
              !isFormValid() || isSubmitting
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-opacity-90'
            }`}
          >
            {isSubmitting ? 'Sipariş Gönderiliyor...' : 'Sipariş Ver'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPizza;
