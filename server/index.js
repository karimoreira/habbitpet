const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

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

    user.xp += 1;

    if (user.xp >= 4) {
      user.xp = 0;
      user.level += 1;
      user.mood = "motivado";
    }

    await user.save();
    res.json({
      message: "XP atualizado!",
      xp: user.xp,
      level: user.level,
      mood: user.mood
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar XP' });
  }
});

app.put('/api/mascot/name', auth, async (req, res) => {
  try {
    const { petName } = req.body;
    const user = await User.findById(req.user.id);
    user.petName = petName;
    await user.save();
    res.json({ message: "Nome do mascote atualizado!", petName });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar nome do mascote' });
  }
});

app.post('/api/habit', auth, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.user.id);
    user.habits.push({ name });
    await user.save();
    res.json(user.habits);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar hábito' });
  }
});


app.post('/api/habit/:index/done', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const habitIndex = req.params.index;

    if (user.habits[habitIndex]) {
      user.habits[habitIndex].done = true;

      user.xp += 1;

      if (user.xp >= 4) {
        user.xp = 0;
        user.level += 1;
        user.mood = "motivado";
      }

      await user.save();
      res.json({
        xp: user.xp,
        level: user.level,
        mood: user.mood,
        habits: user.habits
      });
    } else {
      res.status(404).json({ message: 'Hábito não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao concluir hábito' });
  }
});

app.put('/api/mascot/mood', auth, async (req, res) => {
  try {
    const { mood } = req.body;
    const user = await User.findById(req.user.id);
    user.mood = mood;
    await user.save();
    res.json({ mood: user.mood });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar humor' });
  }
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
