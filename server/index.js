const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

const auth = require('./middleware/authMiddleware');
const User = require('./models/User');

app.get('/api/mascot', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar mascote' });
  }
});

app.post('/api/habit/done', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.xp += 10;

    if (user.xp >= 100) {
      user.xp = 0;
      user.level += 1;
      user.mood = "motivado"; 
    }

    await user.save();
    res.json({ message: "XP atualizado!", xp: user.xp, level: user.level, mood: user.mood });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar XP' });
  }
});
