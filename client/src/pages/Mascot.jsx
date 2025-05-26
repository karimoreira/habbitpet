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

  if (!user) return <p>Carregando mascote...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🐾 Bem-vindo, {user.name}!</h2>
      <h3>🐶 Mascote: {user.petName}</h3>
      <p>😄 Humor: <strong>{user.mood}</strong></p>
      <p>⭐ XP: <strong>{user.xp}</strong></p>
      <p>🏅 Nível: <strong>{user.level}</strong></p>
    </div>
  );
}
