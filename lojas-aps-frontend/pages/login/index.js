import Link from "next/link";
import styles from "../../styles/login.module.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Importar useRouter
import Botao from "../../components/Botao";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState(""); 
  const [erro, setErro] = useState("");
  const router = useRouter(); // Inicializar useRouter

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const login_uri = `${API_URL}/auth/token`;
      const resposta = await axios.post(login_uri, { 
        email: email,
        senha: senha,
      });

      const token = resposta.data.token;
      // Armazene o token conforme necessário (ex: localStorage, context, etc.)
      localStorage.setItem("token", token);

      // Redirecionar para a página inicial após o login bem-sucedido
      router.push("/home"); // Alterar para a rota desejada
    } catch (error) {
      setErro("Falha ao fazer login\n");
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className={styles.login_box}>
      <h2>Entrar</h2>
      {erro && <p className={styles.error}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.user_box}>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </div>
        <div className={styles.user_box}>
          <input
            type="password"
            name="senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <label>Senha</label>
        </div>
        <div className={styles.botoes}> 
          <Botao text = "Entrar" ></Botao>
          {/* <button type="submit">Entrar</button> */}
          <Link href="/signup">Cadastrar-se</Link>
        </div>
      </form>
    </div>
  );
}
