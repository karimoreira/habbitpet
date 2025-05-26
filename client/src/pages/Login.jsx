import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/mascot");
    } catch (err) {
      alert("Login falhou");
    }
  }

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>🐾 Login</h2>
        <input
          placeholder="Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
        <p style={styles.link} onClick={() => navigate("/register")}>
          Não tem conta? Cadastre-se
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
     width: "100vw",   
    backgroundColor: "#1e1e1e",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    backgroundColor: "#2c2c2c",
    padding: "2rem",
    borderRadius: "10px",
    width: "300px",
    color: "#fff",
  },
  title: {
    textAlign: "center",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#5cb85c",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  link: {
    fontSize: "0.9rem",
    textAlign: "center",
    color: "#aaa",
    cursor: "pointer",
  },
};
