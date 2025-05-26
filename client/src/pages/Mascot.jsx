import { useEffect, useState } from "react";
import axios from "axios";

export default function Mascot() {
  const [user, setUser] = useState(null);
  const [newPetName, setNewPetName] = useState("");

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

  function handlePetNameChange() {
    const token = localStorage.getItem("token");

    axios
      .put("http://localhost:5000/api/mascot/name", { petName: newPetName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser((prev) => ({ ...prev, petName: res.data.petName }));
        setNewPetName("");
      })
      .catch((err) => {
        console.error("Erro ao atualizar nome do pet", err);
      });
  }

  if (!user) return <p>Carregando mascote...</p>;

  function getPetEmoji(mood) {
  switch (mood) {
    case "triste":
      return "😢";
    case "motivado":
      return "💪";
    case "feliz":
    default:
      return "🐶";
  }
}


  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2>🐾 Bem-vindo, {user.name}!</h2>

      <div style={styles.petBox}>
        <div style={styles.petEmoji}>{getPetEmoji(user.mood)}</div>
        <div>
          <h3>Mascote: {user.petName}</h3>
          <p>Humor: <strong>{user.mood}</strong></p>
          <p>XP: <strong>{user.xp}</strong></p>
          <p>Nível: <strong>{user.level}</strong></p>
        </div>
      </div>

      <button onClick={handleHabitDone} style={styles.button}>
        Cumprir hábito
      </button>

      <div style={styles.nameChange}>
        <input
          type="text"
          placeholder="Novo nome do mascote"
          value={newPetName}
          onChange={(e) => setNewPetName(e.target.value)}
          style={styles.input}
        />
        <button onClick={handlePetNameChange} style={styles.button}>
          Atualizar nome
        </button>
      </div>
    </div>
  </div>
);
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    color: "#fff",
  },
  card: {
    backgroundColor: "#2c2c2c",
    padding: "2rem",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    minWidth: "320px"
  },
  petBox: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "1rem 0",
    justifyContent: "center",
  },
  petEmoji: {
    fontSize: "4rem",
    animation: "bounce 1.5s infinite",
  },
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
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    width: "180px",
    marginRight: "0.5rem",
  },
  nameChange: {
    marginTop: "1.5rem",
  },
};
