// pages/estoques.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; 
import styles from '../../styles/Estoque.module.css';

const Estoques = () => {
  const [estoques, setEstoques] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [novoLojaId, setNovoLojaId] = useState('');
  const [novoProdutoId, setNovoProdutoId] = useState('');
  const [novaQuantidade, setNovaQuantidade] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchEstoques = async () => {
      try {
        const [estoquesResponse, produtosResponse, lojasResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/estoque`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/loja`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        ]);

        setEstoques(estoquesResponse.data);
        setProdutos(produtosResponse.data);
        setLojas(lojasResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEstoques();
  }, [router]);

  const handleCreateStock = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/estoque`, {
        lojaId: novoLojaId,
        produtoId: novoProdutoId,
        quantidade: novaQuantidade
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNovoLojaId('');
      setNovoProdutoId('');
      setNovaQuantidade('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/estoque`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEstoques(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Estoques</h1>

        <h2>Criar Novo Estoque</h2>
        <form onSubmit={handleCreateStock}>
          <div className={styles.formGroup}>
            <label>Loja:</label>
            <select
              value={novoLojaId}
              onChange={(e) => setNovoLojaId(e.target.value)}
              required
            >
              <option value="">Selecione a Loja</option>
              {lojas.map(loja => (
                <option key={loja.id} value={loja.id}>{loja.nome}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Produto:</label>
            <select
              value={novoProdutoId}
              onChange={(e) => setNovoProdutoId(e.target.value)}
              required
            >
              <option value="">Selecione o Produto</option>
              {produtos.map(produto => (
                <option key={produto.id} value={produto.id}>{produto.nome}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Quantidade:</label>
            <input
              type="number"
              value={novaQuantidade}
              onChange={(e) => setNovaQuantidade(e.target.value)}
              required
            />
          </div>
          <button className={styles.createButton} type="submit">Criar Estoque</button>
        </form>

        <h2>Lista de Estoques</h2>
        <ul className={styles.stockList}>
          {estoques.map(estoque => (
            <li key={estoque.id} className={styles.stockItem}>
              <p><strong>Loja:</strong> {lojas.find(loja => loja.id === estoque.lojaId)?.nome}</p>
              <p><strong>Produto:</strong> {produtos.find(produto => produto.id === estoque.produtoId)?.nome}</p>
              <p><strong>Quantidade:</strong> {estoque.quantidade}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Estoques;
