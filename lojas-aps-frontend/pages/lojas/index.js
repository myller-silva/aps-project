import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Lojas.module.css';

const Lojas = () => {
  const [lojas, setLojas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [editando, setEditando] = useState(null);
  const [novoNomeLoja, setNovoNomeLoja] = useState('');
  const [novoEnderecoLoja, setNovoEnderecoLoja] = useState('');
  const [editarNomeLoja, setEditarNomeLoja] = useState('');
  const [editarEnderecoLoja, setEditarEnderecoLoja] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const buscarLojas = async () => {
      const lojas_api = `${process.env.NEXT_PUBLIC_API_URL}/loja`;
      try {
        const response = await axios.get(lojas_api, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLojas(response.data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarLojas();
  }, [router]);

  const handleCriarLoja = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        nome: novoNomeLoja,
        endereco: novoEnderecoLoja
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNovoNomeLoja('');
      setNovoEnderecoLoja('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLojas(response.data);
    } catch (err) {
      setErro(err.message);
    }
  };

  const handleEditarLoja = async (lojaId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        id: lojaId,
        nome: editarNomeLoja,
        endereco: editarEnderecoLoja
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditando(null);
      setEditarNomeLoja('');
      setEditarEnderecoLoja('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLojas(response.data);
    } catch (err) {
      setErro(err.message);
    }
  };

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Lojas</h1>

        <h2>Criar Nova Loja</h2>
        <form onSubmit={handleCriarLoja}>
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              type="text"
              value={novoNomeLoja}
              onChange={(e) => setNovoNomeLoja(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Endereço:</label>
            <input
              type="text"
              value={novoEnderecoLoja}
              onChange={(e) => setNovoEnderecoLoja(e.target.value)}
              required
            />
          </div>
          <button className={styles.createButton} type="submit">Criar Loja</button>
        </form>

        <h2>Lista de Lojas</h2>
        <ul className={styles.storeList}>
          {lojas.map(loja => (
            <li key={loja.id} className={styles.storeItem}>
              {editando === loja.id ? (
                <div>
                  <h3>Editar Loja</h3>
                  <form onSubmit={(e) => { e.preventDefault(); handleEditarLoja(loja.id); }}>
                    <div className={styles.formGroup}>
                      <label>Nome:</label>
                      <input
                        type="text"
                        value={editarNomeLoja}
                        onChange={(e) => setEditarNomeLoja(e.target.value)}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label>Endereço:</label>
                      <input
                        type="text"
                        value={editarEnderecoLoja}
                        onChange={(e) => setEditarEnderecoLoja(e.target.value)}
                        required
                      />
                    </div>
                    <button className={styles.editButton} type="submit">Atualizar Loja</button>
                  </form>
                </div>
              ) : (
                <div>
                  <p><strong>Nome:</strong> {loja.nome}</p>
                  <p><strong>Endereço:</strong> {loja.endereco}</p>
                  <button className={styles.editButton} onClick={() => { setEditarNomeLoja(loja.nome); setEditarEnderecoLoja(loja.endereco); setEditando(loja.id); }}>
                    Editar
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
