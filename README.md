## Mapeamento de Processos e Subprocessos

Este projeto foi desenvolvido como parte de um case técnico.

### Tecnologias Utilizadas
---

- **React** com **TypeScript**
- **Vite** para build e desenvolvimento
- **Zustand** para gerenciamento de estado global
- **Axios** para chamadas à API
- **Tailwind CSS** para estilização
- **React Flow** para visualização da hierarquia dos processos

### Funcionalidades
---

- Cadastro, atualização e exclusão de processos.
- Cadastro de áreas e associação de processos a áreas.
- Mapeamento de subprocessos com suporte a níveis infinitos (lazy loading e recursão).
- Visualização da hierarquia dos processos através de fluxo e gráficos.
- Sincronização do estado global via Zustand para refletir as atualizações de dados em toda a aplicação.


### Deploy
---
A aplicação já está publicada em: [case-front-zeta.vercel.app](https://case-front-zeta.vercel.app)


### Como Rodar localmente:
---
1. **Clone o repositório:**

   ```bash
   git clone https://github.com/VivianeBrenner/case-front.git
   cd case-front
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação:**

   Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

