import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/users.module.css';

// Obtenha a URL da API da variável de ambiente
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const resposta = await axios.get(`${API_URL}/usuario`);
        setUsuarios(resposta.data);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuarios();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className={styles.container}>
      <h1>Lista de Usuários</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
