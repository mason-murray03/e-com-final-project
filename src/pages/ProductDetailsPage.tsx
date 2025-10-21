import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { deleteProduct } from '../service/productService';
import type { Product } from '../types/Product'
import { Link } from 'react-router-dom';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, 'products', productId!);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data()

        setProduct({
            id: snap.id,
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            image: data.image ?? '',
            rating: data.rating ?? 0,
            createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(),
            updatedAt: data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
        });
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;
    await deleteProduct(productId!);
    alert('Product deleted.');
    navigate('/');
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className='container' style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <img src={product.image} alt={product.title} className='img-fluid rounded mb-4' style={{maxHeight:'300px', objectFit:'cover'}}/>
      <h2>{product.title}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <button
        onClick={handleDelete}
        className='btn btn-danger mt-4 w-100'
      >
        Delete Product
      </button>

      <Link to={`/products/edit/${product.id}`} className="btn btn-warning mt-4 w-100">Edit</Link>
    </div>
  );
}
