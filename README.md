# Mascotinho motivacional – gamificado

Um aplicativo web interativo onde seu mascote evolui conforme você cumpre hábitos diários. Acompanhe seu progresso, ganhe XP, altere o humor do pet e veja animações em tempo real com integração Lottie.

---

## Funcionalidades

- Cadastro e login de usuários
- Criação e checklist de hábitos
- Geração de XP e evolução de nível
- Mascote com humor dinâmico (feliz, triste, motivado)
- Animações em tempo real com Lottie
- Personalização de nome do mascote

---

## Tecnologias utilizadas

### **Frontend**
- React.js (com Vite)
- Lottie para animações
- Axios para requisições
- CSS inline customizado

### **Backend**
- Node.js + Express
- MongoDB (via Mongoose)
- JWT para autenticação
- Dotenv para configuração segura

---

## Organização do Projeto

- `client/`: Frontend React
- `server/`: Backend Node + Express
- `src/assets/lottie`: Arquivos `.json` para animações
- Autenticação protegida com middleware
- Rotas RESTful (habits, user, mascot, mood)

---

## Imagens

<div align="center">

<tr>
<td align="center">
  <img src="https://raw.githubusercontent.com/karimoreira/habbitpet/master/client/src/assets/screenshots/motivadodog.png" width="200" />
</td>
<td align="center">
  <img src="https://raw.githubusercontent.com/karimoreira/habbitpet/master/client/src/assets/screenshots/triste.png" width="200" />
</td>
</tr>

<br />

<img src="https://raw.githubusercontent.com/karimoreira/habbitpet/master/client/src/assets/screenshots/mascote.png" width="700" />

</div>



