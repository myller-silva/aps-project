import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../../styles/login.module.css";

// Obtenha a URL da API da variável de ambiente
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup() {
  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState(""); // Novo estado para o CPF
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const uri_user = `${API_URL}/auth/signup`;
      const response = await axios.post(uri_user, {
        nome: nome,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        cpf:cpf,
      });

      const token = response.data.token;
      // Armazene o token conforme necessário (ex: localStorage, context, etc.)
      localStorage.setItem("token", token);

      // Redirecione ou faça qualquer outra ação após o sucesso
      console.log("Signup successful, token:", token);
    } catch (error) {
      setError("Failed to sign up\n");
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className={styles.login_box}>
      <h2>Sign Up</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.user_box}>
          <input
            type="text"
            name="name"
            required
            value={nome}
            onChange={(e) => setName(e.target.value)}
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
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </div>
        <div className={styles.user_box}>
          <input
            type="password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label>Confirm Password</label>
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
          <button type="submit">Submit</button>
          <Link href="login">Login</Link>
        </div>
      </form>
    </div>
  );
}
