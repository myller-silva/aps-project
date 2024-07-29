// pages/home.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'; // Ajuste o caminho conforme necessário

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Verifique se o token está presente no localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirecione para a página de login se não houver token
      router.push('/login');
      return;
    }

    // Se o token estiver presente, tente buscar os usuários
    // const buscarUsuarios = async () => {
    //   try {
    //     const resposta = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuario`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     setUsuarios(resposta.data);
    //   } catch (err) {
    //     setErro(err.message);
    //     // Opcional: redirecionar para o login em caso de falha na autenticação
    //     router.push('/login');
    //   } finally {
    //     setCarregando(false);
    //   }
    // };
    // buscarUsuarios();
  }, [router]);

  // if (carregando) return <p>Carregando...</p>;
  // if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Página Inicial</h1>
      </main>
    </div>
  );
};

export default Home;
