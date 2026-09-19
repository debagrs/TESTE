# Contrastes - Obra de Arte Interativa

'Contrastes' é uma obra de arte interativa web desenvolvida em React, TypeScript e p5.js que explora o dualismo e o contraste político, social e filosófico através de partículas cromáticas polares. As partículas se misturam, tencionam, repelem e evoluem com a interação do usuário (mouse, toque e presença por câmera web opcional).

## Fundamentação Conceitual
Inspirada pelas reflexões de **Vilém Flusser** sobre a técnica e a imagem técnica, e **Yuk Hui** sobre a tecnodiversidad e cosmotécnica, esta obra propõe que o digital não seja um espaço de polarização cega (amigo vs. inimigo), mas um campo de negociação estética e dialética.

### Objetivos de Desenvolvimento Sustentável (ODS) Alinhados:
- **ODS 3:** Saúde e Bem-Estar (redução do estresse através da contemplação estética e mediação digital).
- **ODS 4:** Educação de Qualidade (pensamento crítico sobre mídias, polarização e algoritmos).
- **ODS 8:** Trabalho Decente e Crescimento Econômico (inovação tecnológica e criatividade).

## Tecnologias Utilizadas
- **React + Vite + TypeScript**: Arquitetura de Single Page Application moderna e tipada.
- **Tailwind CSS**: Estilização responsiva e design system imersivo.
- **p5.js**: Motor gráfico em modo instância para simulação física de partículas em canvas.
- **Lucide React**: Ícones vetoriais minimalistas.

## Como Executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Gere o build de produção:
   ```bash
   npm run build
   ```

## Estrutura do Projeto
- `src/components/`: Componentes modulares (Navbar, Canvas, Painéis, Manifesto).
- `src/constants/`: Paletas ideológicas e cromáticas.
- `src/hooks/`: Gerenciamento de estado e persistência local.
- `src/types.ts`: Contratos TypeScript do projeto.
