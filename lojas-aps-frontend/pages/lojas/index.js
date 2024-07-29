// pages/lojas.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Lojas.module.css';

const Lojas = () => {
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreAddress, setNewStoreAddress] = useState('');
  const [editStoreName, setEditStoreName] = useState('');
  const [editStoreAddress, setEditStoreAddress] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchLojas = async () => {
      const lojas_api = `${process.env.NEXT_PUBLIC_API_URL}/loja`
      try {
        const response = await axios.get(`${lojas_api}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLojas(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLojas();
  }, [router]);

  const handleCreateStore = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        nome: newStoreName,
        endereco: newStoreAddress
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNewStoreName('');
      setNewStoreAddress('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLojas(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditStore = async (storeId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        id:storeId,
        nome: editStoreName,
        endereco: editStoreAddress
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditing(null);
      setEditStoreName('');
      setEditStoreAddress('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLojas(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Lojas</h1>

        <h2>Create New Store</h2>
        <form onSubmit={handleCreateStore}>
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              type="text"
              value={newStoreName}
              onChange={(e) => setNewStoreName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Endereço:</label>
            <input
              type="text"
              value={newStoreAddress}
              onChange={(e) => setNewStoreAddress(e.target.value)}
              required
            />
          </div>
          <button className={styles.createButton} type="submit">Create Store</button>
        </form>

        <h2>Stores List</h2>
        <ul className={styles.storeList}>
          {lojas.map(store => (
            <li key={store.id} className={styles.storeItem}>
              {editing === store.id ? (
                <div>
                  <h3>Edit Store</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleEditStore(store.id); }}>
                    <div className={styles.formGroup}>
                      <label>Nome:</label>
                      <input
                        type="text"
                        value={editStoreName}
                        onChange={(e) => setEditStoreName(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Endereço:</label>
                      <input
                        type="text"
                        value={editStoreAddress}
                        onChange={(e) => setEditStoreAddress(e.target.value)}
                        required
                      />
                    </div>
                    <button className={styles.editButton} type="submit">Update Store</button>
                  </form>
                </div>
              ) : (
                <div>
                  <p><strong>Nome:</strong> {store.nome}</p>
                  <p><strong>Endereço:</strong> {store.endereco}</p>
                  <button className={styles.editButton} onClick={() => { setEditStoreName(store.nome); setEditStoreAddress(store.endereco); setEditing(store.id); }}>
                    Edit
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Lojas;
