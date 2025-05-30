# Mascotinho motivacional – gamificado

Um aplicativo web interativo onde seu mascote evolui conforme você cumpre hábitos diários. Acompanhe seu progresso, ganhe XP, altere o humor do pet e veja animações em tempo real com integração Lottie.


## Funcionalidades

- Cadastro e login de usuários
- Criação e checklist de hábitos
- Geração de XP e evolução de nível
- Mascote com humor dinâmico (feliz, triste, motivado)
- permitir a troca de mascote com 3 pets disponíveis com Lottie


## Tecnologias utilizadas

### **Frontend**
- React.js (com Vite)
- Lottie para animações
- Axios para requisições
- CSS

### **Backend**
- Node.js + Express
- MongoDB (via Mongoose)
- JWT para autenticação
- Dotenv para configuração segura


## Organização do Projeto

- `client/`: Frontend React
- `server/`: Backend Node + Express
- `src/assets/lottie`: Arquivos `.json` para animações
- Autenticação protegida com middleware
- Rotas RESTful (habits, user, mascot, mood)


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


## XP
- adicionei recompensas ou conquistas visuais para cada nível
- histórico de hábitos 
- remoção de hábitos completos caso queira
- exibi "Subiu de nível" apenas quando 4 hábitos forem concluídos e o nível realmente subir
- backend para garantir que só 1 nível seja ganho por vez
- o mascote muda para "motivado" ao subir de nível

## Cluster - Banco de dados 

O banco foi criado no meu cluster gratuito do MongoDB Atlas. A coleção users armazena os dados dos usuários, como nome, e-mail, XP, nível, humor, hábitos e nome do mascote. A conexão é feita de forma segura usando variáveis de ambiente e o Mongoose no backend.

