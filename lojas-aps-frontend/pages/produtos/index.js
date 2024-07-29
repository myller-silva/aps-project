import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Produto.module.css';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [novoNomeProduto, setNovoNomeProduto] = useState('');
  const [novoPrecoProduto, setNovoPrecoProduto] = useState('');

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const buscarProdutos = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProdutos(response.data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, [router]);

  const handleCriarProduto = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
        nome: novoNomeProduto,
        preco: novoPrecoProduto
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNovoNomeProduto('');
      setNovoPrecoProduto('');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/produto`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProdutos(response.data);
    } catch (err) {
      setErro(err.message);
    }
  };

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Produtos</h1>

        <h2>Criar Novo Produto</h2>
        <form onSubmit={handleCriarProduto}>
          <div className={styles.formGroup}>
            <label>Nome:</label>
            <input
              type="text"
              value={novoNomeProduto}
              onChange={(e) => setNovoNomeProduto(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Preço:</label>
            <input
              type="number"
              value={novoPrecoProduto}
              onChange={(e) => setNovoPrecoProduto(e.target.value)}
              required
            />
          </div>
          <button className={styles.createButton} type="submit">Criar Produto</button>
        </form>

        <h2>Lista de Produtos</h2>
        <ul className={styles.productList}>
          {produtos.map(produto => (
            <li key={produto.id} className={styles.productItem}>
              <p><strong>Nome:</strong> {produto.nome}</p>
              <p><strong>Preço:</strong> R${produto.preco}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Produtos;
