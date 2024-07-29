// pages/produtos.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Produto.module.css';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProdutos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, [router]);

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
        name: newProductName,
        price: newProductPrice
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewProductName('');
      setNewProductPrice('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProdutos(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Produtos</h1>

        <h2>Create New Product</h2>
        <form onSubmit={handleCreateProduct}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price:</label>
            <input
              type="number"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              required
            />
          </div>
          <button className={styles.createButton} type="submit">Create Product</button>
        </form>

        <h2>Products List</h2>
        <ul className={styles.productList}>
          {produtos.map(product => (
            <li key={product.id} className={styles.productItem}>
              <p><strong>Name:</strong> {product.name}</p>
              <p><strong>Price:</strong> ${product.price}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Produtos;
