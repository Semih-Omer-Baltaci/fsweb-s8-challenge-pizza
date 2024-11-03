import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';





const PizzaOrderForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      size: '',
      toppings: [],
      notes: '',
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    
    const pizzaSizes = [
      { id: 'small', label: 'Küçük' },
      { id: 'medium', label: 'Orta' },
      { id: 'large', label: 'Büyük' },
    ];
    
    const toppingOptions = [
      { id: 'pepperoni', label: 'Pepperoni' },
      { id: 'sausage', label: 'Sucuk' },
      { id: 'mushrooms', label: 'Mantar' },
      { id: 'olives', label: 'Zeytin' },
      { id: 'peppers', label: 'Biber' },
      { id: 'onions', label: 'Soğan' },
      { id: 'cheese', label: 'Ekstra Peynir' },
      { id: 'tomatoes', label: 'Domates' },
    ];
    
    useEffect(() => {
      const validateForm = () => {
        const nameValid = formData.name.length >= 3;
        const sizeValid = formData.size !== '';
        const toppingsValid = formData.toppings.length >= 4 && formData.toppings.length <= 10;
        
        setIsValid(nameValid && sizeValid && toppingsValid);
      };
      
      validateForm();
    }, [formData]);
    
    const handleNameChange = (e) => {
      setFormData({ ...formData, name: e.target.value });
    };
    
    const handleSizeChange = (value) => {
      setFormData({ ...formData, size: value });
    };
    
    const handleToppingChange = (topping) => {
      const updatedToppings = formData.toppings.includes(topping)
        ? formData.toppings.filter(t => t !== topping)
        : [...formData.toppings, topping];
        
      setFormData({ ...formData, toppings: updatedToppings });
    };
    
    const handleNotesChange = (e) => {
      setFormData({ ...formData, notes: e.target.value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!isValid) return;
      
      setIsSubmitting(true);
      setSubmitStatus('');
      
      try {
        const response = await fetch('https://reqres.in/api/pizza', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        const data = await response.json();
        console.log('Sipariş Özeti:', data);
        setSubmitStatus('success');
      } catch (error) {
        console.error('Sipariş hatası:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    };
    
    return (
      <Card className="w-full max-w-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">İsim (en az 3 karakter)</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleNameChange}
              minLength={3}
              required
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Boyut Seç</Label>
            <RadioGroup
              value={formData.size}
              onValueChange={handleSizeChange}
              className="flex flex-col space-y-2"
            >
              {pizzaSizes.map((size) => (
                <div key={size.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={size.id} id={size.id} />
                  <Label htmlFor={size.id}>{size.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Malzemeler (4-10 arası seçim yapın)</Label>
            <div className="grid grid-cols-2 gap-2">
              {toppingOptions.map((topping) => (
                <div key={topping.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={topping.id}
                    checked={formData.toppings.includes(topping.id)}
                    onCheckedChange={() => handleToppingChange(topping.id)}
                  />
                  <Label htmlFor={topping.id}>{topping.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Sipariş Notu</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={handleNotesChange}
              className="w-full"
              placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
            />
          </div>
          
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-100 text-green-800 rounded">
              Siparişiniz başarıyla oluşturuldu.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-100 text-red-800 rounded">
              Siparişiniz oluşturulurken bir hata oluştu.
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Sipariş Gönderiliyor...' : 'Sipariş Ver'}
          </Button>
        </form>
      </Card>
    );
  };

  export default PizzaOrderForm;

