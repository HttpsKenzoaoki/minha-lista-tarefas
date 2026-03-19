# Minha Lista de Tarefas (To-Do List)

Aplicação web para gerenciamento de tarefas (criar, listar, concluir e remover tarefas). O objetivo do projeto é praticar os conceitos aprendidos em **React**, **TypeScript** e **Vite**, incluindo componentização, gerenciamento de estado, manipulação de eventos e persistência (se aplicável).

## Objetivos do projeto

- Organizar tarefas do dia a dia em uma lista simples e objetiva.
- Exercitar boas práticas de desenvolvimento com React (componentes reutilizáveis e composição).
- Aplicar TypeScript para tipagem, legibilidade e redução de erros.
- Consolidar o uso do Vite para desenvolvimento rápido e build.

## Funcionalidades

- Adicionar uma nova tarefa
- Listar tarefas
- Marcar tarefa como concluída
- Remover tarefa
- (Opcional) Persistência em **localStorage**
- (Opcional) Filtro: todas / pendentes / concluídas

> Observação: a lista acima pode ser ajustada conforme o que está implementado no código do repositório.

## Como baixar ou clonar o projeto

### Opção 1 — Clonar com Git (recomendado)

1. Abra o terminal.
2. Execute:

```bash
git clone https://github.com/HttpsKenzoaoki/minha-lista-tarefas.git
```

3. Entre na pasta do projeto:

```bash
cd minha-lista-tarefas
```

### Opção 2 — Baixar como ZIP

1. Acesse o repositório no GitHub.
2. Clique em **Code** → **Download ZIP**.
3. Extraia o arquivo ZIP.
4. Abra a pasta extraída no seu editor (ex.: VS Code).

## Como executar o projeto localmente

> Pré-requisitos: **Node.js** (recomendado: versão LTS) e **npm** (ou yarn/pnpm).

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra o endereço exibido no terminal (normalmente):

- http://localhost:5173

### Build de produção (opcional)

```bash
npm run build
```

### Visualizar o build (opcional)

```bash
npm run preview
```

## Estrutura do projeto (resumo)

- `src/` — código-fonte (componentes, páginas, estilos)
- `public/` — arquivos públicos
- `package.json` — scripts e dependências

## Vídeo explicativo (obrigatório)

Grave um vídeo apresentando o projeto e inclua o link aqui.

- Link do vídeo: **(adicione aqui o link do YouTube/Drive)**

### Roteiro sugerido para o vídeo

1. Apresentação rápida (seu nome e objetivo do projeto).
2. Demonstração das funcionalidades (adicionar, concluir e remover tarefas).
3. Explicação da implementação:
   - Componentes principais
   - Estado (ex.: `useState`) e fluxo de dados (props)
   - Tipagens com TypeScript (interfaces/types)
   - Persistência (se tiver) com `localStorage`
4. Como rodar o projeto localmente.

## Licença

Defina a licença do projeto (ex.: MIT) ou remova esta seção se não for necessário.