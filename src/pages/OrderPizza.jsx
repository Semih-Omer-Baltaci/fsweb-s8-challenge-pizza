import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const OrderPizza = ({ setOrderSummary }) => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [doughType, setDoughType] = useState('Hamur Kalınlığı');
  const [toppings, setToppings] = useState([]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const basePrice = 85.50;
  const toppingPrice = 5.00;
  const extraPrice = toppings.length * toppingPrice;
  const totalPrice = (basePrice * quantity) + extraPrice;

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleToppingChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setToppings([...toppings, value]);
    } else {
      setToppings(toppings.filter(topping => topping !== value));
    }
  };

  const isFormValid = () => {
    return size !== '' && 
           doughType !== 'Hamur Kalınlığı' && 
           toppings.length > 0 && 
           toppings.length <= 10;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }

    const orderData = {
      size,
      doughType,
      toppings,
      quantity,
      note,
      totalPrice,
      extraPrice,
      basePrice,
      orderDate: new Date().toISOString()
    };

    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await axios.post('https://reqres.in/api/pizza', orderData);
      const orderSummary = {
        id: response.data.id,
        orderDate: response.data.orderDate,
        size: response.data.size,
        doughType: response.data.doughType,
        toppings: response.data.toppings,
        quantity: response.data.quantity,
        note: response.data.note,
        totalPrice: response.data.totalPrice,
        status: 'success'
      };
      
      setOrderSummary(orderSummary);
      history.push('/success');
    } catch (error) {
      let errorMessage = 'Sipariş gönderilirken bir hata oluştu.';
      if (!navigator.onLine) {
        errorMessage = 'İnternet bağlantınızı kontrol edin.';
      } else if (error.response) {
        errorMessage = `Sunucu hatası: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Sunucuya ulaşılamıyor.';
      }
      setError(errorMessage);
      console.error('Sipariş hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Teknolojik Yemekler</h1>
        <div className="text-sm mb-8">
          <span>Anasayfa</span> - <span>Seçenekler</span> - <span>Sipariş Oluştur</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl mb-2">Position Absolute Acı Pizza</h2>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl">{basePrice.toFixed(2)}₺</span>
          <span className="text-gray-500">(200)</span>
        </div>

        <p className="text-gray-600 mb-8">
          Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurundan oluşan İtalyan kökenli lezzetli bir yemektir... Küçük bir pizzaya bazen pizzetta denir.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="mb-4">
              <label className="block mb-2">
                Boyut Seç <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="small" 
                    onChange={e => setSize(e.target.value)}
                    required 
                  />
                  <span className="ml-2">Küçük</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="medium" 
                    onChange={e => setSize(e.target.value)}
                    required
                  />
                  <span className="ml-2">Orta</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="size" 
                    value="large" 
                    onChange={e => setSize(e.target.value)}
                    required
                  />
                  <span className="ml-2">Büyük</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                Hamur Seç <span className="text-red-500">*</span>
              </label>
              <select 
                value={doughType}
                onChange={e => setDoughType(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="Hamur Kalınlığı" disabled>Hamur Kalınlığı</option>
                <option value="İnce">İnce</option>
                <option value="Orta">Orta</option>
                <option value="Kalın">Kalın</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Ek Malzemeler</label>
              <p className="text-sm text-gray-600 mb-2">En Fazla 10 malzeme seçebilirsiniz. 5₺</p>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input type="checkbox" value="pepperoni" onChange={handleToppingChange} />
                  <span className="ml-2">Pepperoni</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="domates" onChange={handleToppingChange} />
                  <span className="ml-2">Domates</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="sosis" onChange={handleToppingChange} />
                  <span className="ml-2">Sosis</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="mantar" onChange={handleToppingChange} />
                  <span className="ml-2">Mantar</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="kanada-jambonu" onChange={handleToppingChange} />
                  <span className="ml-2">Kanada Jambonu</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="sucuk" onChange={handleToppingChange} />
                  <span className="ml-2">Sucuk</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="tavuk-izgara" onChange={handleToppingChange} />
                  <span className="ml-2">Tavuk Izgara</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="jalapeno" onChange={handleToppingChange} />
                  <span className="ml-2">Jalapeno</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="sogan" onChange={handleToppingChange} />
                  <span className="ml-2">Soğan</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="sarimsak" onChange={handleToppingChange} />
                  <span className="ml-2">Sarımsak</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="biber" onChange={handleToppingChange} />
                  <span className="ml-2">Biber</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="sucuk" onChange={handleToppingChange} />
                  <span className="ml-2">Sucuk</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="ananas" onChange={handleToppingChange} />
                  <span className="ml-2">Ananas</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" value="kabak" onChange={handleToppingChange} />
                  <span className="ml-2">Kabak</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2">Sipariş Notu</label>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Siparişine eklemek istediğin bir not var mı?"
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => handleQuantityChange('decrease')}
                  className="w-8 h-8 bg-yellow-400 text-black font-bold rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange('increase')}
                  className="w-8 h-8 bg-yellow-400 text-black font-bold rounded"
                >
                  +
                </button>
              </div>
              <div>
                <div className="text-right">
                  <div>Seçimler: {extraPrice.toFixed(2)}₺</div>
                  <div className="font-bold">Toplam: {totalPrice.toFixed(2)}₺</div>
                </div>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}
            
            <button 
              type="submit" 
              className={`w-full bg-yellow-400 text-black py-3 rounded font-bold ${!isFormValid() || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? 'SİPARİŞ GÖNDERİLİYOR...' : 'SİPARİŞ VER'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPizza;
