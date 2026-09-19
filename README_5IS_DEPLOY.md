# Implantação — contrastes

Este pacote foi gerado pelo agente Forja a partir dos registros da Metodologia 5I’s. Antes de publicar, revise código, conteúdo, acessibilidade, políticas de dados e as hipóteses abaixo.

## 1. Rodar localmente

1. Descompacte o ZIP.
2. Abra a pasta no terminal.
3. Execute `npm install`.
4. Copie `.env.example` para `.env.local`.
5. Execute `npm run dev`.

## 2. Supabase

1. Crie um projeto em Supabase.
2. Abra **SQL Editor** e execute `supabase/schema.sql` caso esse arquivo exista.
3. Em **Project Settings → API**, copie a Project URL e a chave pública/anon.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em `.env.local`.
5. Confira as políticas RLS antes de inserir dados reais. Nunca coloque a service role key no navegador.

## 3. GitHub

```bash
git init
git add .
git commit -m "Implementação inicial — Metodologia 5I's"
git branch -M main
git remote add origin SEU_REPOSITORIO_GITHUB
git push -u origin main
```

## 4. Vercel

1. Importe o repositório GitHub na Vercel.
2. Framework: **Vite**.
3. Adicione as mesmas variáveis de ambiente usadas localmente.
4. Faça o deploy.
5. Teste desktop e mobile e revise rotas, autenticação, storage e banco.

## Hipóteses a validar
- A captura por câmera é opcional e utiliza a API nativa navigator.mediaDevices.getUserMedia com análise de brilho por frame para estimar o centro de massa do usuário caso não haja mouse/toque ativo.
- O p5.js será executado em modo instância para evitar conflitos com o ciclo de vida do React.

## Checagens recomendadas após a geração
- Executar npm run build para validar a ausência de erros de TypeScript.
- Garantir responsividade em telas móveis e desktop.
- Verificar se o sketch do p5.js limpa corretamente seus recursos ao desmontar o componente.
