import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../types/useAuth';
import { createProduct } from '../service/productService';

export default function CreateProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    await createProduct(user.uid, {
      ...formData,
      price: parseFloat(formData.price),
    });
    navigate('/');
  };

  return (
    <div className='container' style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input name='title' placeholder='Title' value={formData.title} onChange={handleChange} className='form-control mb-3' required />
        <input name='price' placeholder='Price' value={formData.price} onChange={handleChange} className='form-control mb-3' required />
        <textarea name='description' placeholder='Description' value={formData.description} onChange={handleChange} className='form-control mb-3' />
        <input name='category' placeholder='Category' value={formData.category} onChange={handleChange} className='form-control mb-3' />
        <button type='submit' className='btn btn-primary w-100'>Create</button>
      </form>
    </div>
  );
}
