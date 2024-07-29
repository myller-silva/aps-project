import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/login.module.css";
import { useRouter } from "next/router"; // Importar useRouter

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState(""); // Novo estado para o CPF
  const [erro, setErro] = useState("");
  const router = useRouter(); // Inicializar useRouter

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confirmarSenha) {
      setErro("Senhas não coincidem");
      return;
    }

    try {
      const uri_usuario = `${API_URL}/auth/signup`;
      const response = await axios.post(uri_usuario, {
        nome: nome,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha,
        cpf: cpf,
      });

      const token = response.data.token;
      // Armazene o token conforme necessário (ex: localStorage, context, etc.)
      localStorage.setItem("token", token);

      // Redirecione para a página inicial após o cadastro bem-sucedido
      router.push("/home"); // Alterar para a rota desejada
    } catch (error) {
      setErro("Falha ao se cadastrar\n");
      console.error("Erro ao se cadastrar:", error);
    }
  };

  return (
    <div className={styles.login_box}>
      <h2>Cadastro</h2>
      {erro && <p className={styles.error}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.user_box}>
          <input
            type="text"
            name="nome"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label>Nome</label>
        </div>
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
        <div className={styles.user_box}>
          <input
            type="password"
            name="confirmarSenha"
            required
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <label>Confirmar Senha</label>
        </div>
        <div className={styles.user_box}>
          <input
            type="text"
            name="cpf"
            required
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label>CPF</label>
        </div>

        <div className={styles.botoes}>
          <button type="submit">Enviar</button>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
