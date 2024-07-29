// pages/home.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'; // Ajuste o caminho conforme necessário

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    // const fetchUsers = async () => {
    //   try {
    //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuario`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     });
    //     setUsers(response.data);
    //   } catch (err) {
    //     setError(err.message);
    //     // Opcional: redirecionar para o login em caso de falha na autenticação
    //     router.push('/login');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchUsers();
  }, [router]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h1>Home Page</h1>
      </main>
    </div>
  );
};

export default Home;
