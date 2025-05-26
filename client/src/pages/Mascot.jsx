import { useEffect, useState } from "react";
import axios from "axios";

export default function Mascot() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/mascot", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  function handleHabitDone() {
    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:5000/api/habit/done", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          xp: res.data.xp,
          level: res.data.level,
          mood: res.data.mood,
        }));
      })
      .catch((err) => {
        console.error("Erro ao cumprir hábito", err);
      });
  }

  if (!user) return <p>Carregando mascote...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🐾 Bem-vindo, {user.name}!</h2>
      <h3>🐶 Mascote: {user.petName}</h3>
      <p>😄 Humor: <strong>{user.mood}</strong></p>
      <p>⭐ XP: <strong>{user.xp}</strong></p>
      <p>🏅 Nível: <strong>{user.level}</strong></p>
      <button onClick={handleHabitDone} style={styles.button}>
        Cumprir hábito
      </button>
    </div>
  );
}

const styles = {
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#5cb85c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
