import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import feliz from "../lottie/feliz.json";
import triste from "../lottie/triste.json";
import motivado from "../lottie/motivado.json";

export default function Mascot() {
  const [user, setUser] = useState(null);
  const [newPetName, setNewPetName] = useState("");
  const [newHabit, setNewHabit] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const moodAnimations = { feliz, triste, motivado };

  useEffect(() => {
    fetchUserData();
  }, []);

  function fetchUserData() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/mascot", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }

  function handleHabitDone() {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/habit/done", {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          xp: res.data.xp,
          level: res.data.level,
          mood: res.data.mood,
        }));
      });
  }

  function handlePetNameChange() {
    const token = localStorage.getItem("token");
    axios
      .put("http://localhost:5000/api/mascot/name", { petName: newPetName }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser((prev) => ({ ...prev, petName: res.data.petName }));
        setNewPetName("");
        setShowNameInput(false);
      });
  }

  function handleAddHabit() {
    const token = localStorage.getItem("token");
    if (!newHabit) return;

    axios.post("http://localhost:5000/api/habit", { name: newHabit }, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setNewHabit("");
      fetchUserData();
    });
  }

  function handleToggleHabit(index) {
    const token = localStorage.getItem("token");
    axios.post(`http://localhost:5000/api/habit/${index}/done`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      fetchUserData();
    });
  }

function handleMoodChange(mood) {
  const token = localStorage.getItem("token");
  axios
    .put("http://localhost:5000/api/mascot/mood", { mood }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => {
      fetchUserData();
    });
}

  if (!user) return <p>Carregando mascote...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Bem vinde, {user.name}!</h2>

        <div style={styles.petBox}>
          <div style={{ width: 200, height: 200 }}>
            <Lottie animationData={moodAnimations[user.mood]} loop autoplay />
          </div>
          <div>
            <h3>Mascote: {user.petName}</h3>
            <p>Humor: <strong>{user.mood}</strong></p>
            <p>XP: <strong>{user.xp}</strong></p>
            <p>Nível: <strong>{user.level}</strong></p>
          </div>
        </div>

        <div style={styles.row}>
          <button onClick={handleHabitDone} style={styles.button}>Cumprir hábito</button>
          {!showNameInput && (
            <button onClick={() => setShowNameInput(true)} style={styles.buttonSmall}>
              Editar nome do mascote
            </button>
          )}
        </div>

        {showNameInput && (
          <div style={styles.row}>
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
        )}

        <div style={styles.row}>
          <input
            type="text"
            placeholder="Novo hábito"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddHabit} style={styles.button}>
            Adicionar hábito
          </button>
        </div>

        <h3 style={{ marginTop: "2rem" }}>Meus hábitos</h3>
        <ul style={styles.habitList}>
          {user.habits?.map((habit, index) => (
            <li key={index} style={styles.habitItem}>
              <label>
                <input
                  type="checkbox"
                  checked={habit.done}
                  onChange={() => handleToggleHabit(index)}
                />
                <span style={habit.done ? styles.habitDone : null}>
                  {habit.name}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <h3 style={{ marginTop: "2rem" }}>Alterar humor</h3>
        <div style={styles.row}>
          <button onClick={() => handleMoodChange("feliz")} style={styles.buttonSmall}>Feliz</button>
          <button onClick={() => handleMoodChange("triste")} style={styles.buttonSmall}>Triste</button>
          <button onClick={() => handleMoodChange("motivado")} style={styles.buttonSmall}>Motivado</button>
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
    minWidth: "320px",
    maxWidth: "500px",
  },
  petBox: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    margin: "1rem 0",
    justifyContent: "center",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#5cb85c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  buttonSmall: {
    padding: "8px 12px",
    backgroundColor: "#444",
    color: "#fff",
    border: "1px solid #5cb85c",
    borderRadius: "5px",
    fontSize: "0.9rem",
    cursor: "pointer",
    marginTop: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    width: "180px",
    marginRight: "0.5rem",
  },
  row: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  habitList: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
    textAlign: "left",
  },
  habitItem: {
    marginBottom: "0.5rem",
  },
  habitDone: {
    textDecoration: "line-through",
    color: "#aaa",
  },
};
