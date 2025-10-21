import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct } from '../service/productService';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function EditProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, 'products', productId!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setFormData({
          title: data.title,
          price: data.price.toString(),
          description: data.description,
          category: data.category,
        });
      }
    };
    fetchProduct();
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProduct(productId!, {
      ...formData,
      price: parseFloat(formData.price),
    });
    navigate(`/products/${productId}`);
  };

  return (
    <div className='container' style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input name='title' placeholder='Title' value={formData.title} onChange={handleChange} className='form-control mb-3' required />
        <input name='price' placeholder='Price' value={formData.price} onChange={handleChange} className='form-control mb-3' required />
        <textarea name='description' placeholder='Description' value={formData.description} onChange={handleChange} className='form-control mb-3' />
        <input name='category' placeholder='Category' value={formData.category} onChange={handleChange} className='form-control mb-3' />
        <button type='submit' className='btn btn-success w-100'>Save Changes</button>
      </form>
    </div>
  );
}
