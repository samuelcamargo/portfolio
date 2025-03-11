# Portfólio - Samuel Camargo

## 🚀 Sobre o Projeto

Este é meu portfólio pessoal, desenvolvido com tecnologias modernas para apresentar meus projetos e habilidades como desenvolvedor Full Stack. O site foi construído com foco em performance, acessibilidade e design responsivo, incluindo um chatbot inteligente alimentado pelo Google Gemini AI e uma área administrativa protegida.

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router, Server Components e otimizações de performance
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Material-UI** - Framework de design para componentes React
- **Google Gemini AI** - API de inteligência artificial para o chatbot
- **JWT Authentication** - Autenticação segura com tokens
- **Cookies** - Gerenciamento de sessão via cookies
- **React Icons** - Biblioteca de ícones
- **Node.js** - Ambiente de execução JavaScript

## 📦 Dependências e Bibliotecas

### Core
```json
{
  "next": "14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "~5.5.0"
}
```

### UI e Estilização
```json
{
  "@mui/material": "^5.15.10",
  "@mui/icons-material": "^5.15.10",
  "@emotion/react": "^11.11.3",
  "@emotion/styled": "^11.11.0",
  "react-icons": "^5.4.0"
}
```

### Utilitários e Integrações
```json
{
  "@google/generative-ai": "^0.23.0",
  "js-cookie": "^3.0.5",
  "date-fns": "^4.1.0",
  "sharp": "^0.33.5"
}
```

## 📐 Arquitetura do Projeto

O projeto segue uma arquitetura moderna baseada no App Router do Next.js 14, com layouts específicos para diferentes seções:

### Layouts
- **Root Layout** - Layout principal com encapsulamento condicional para diferentes rotas
- **Dashboard Layout** - Layout específico para área administrativa
- **Auth Layout** - Layout para páginas de autenticação

### Autenticação

O sistema de autenticação implementa:
- Token JWT armazenado em cookies
- Middleware para proteção de rotas
- Contexto React para gerenciamento de estado de autenticação
- Redirecionamentos automáticos
- Verificação de autenticação em tempo real

### Contextos
- **AuthContext** - Gerencia estado de autenticação e tokens
- **ThemeProvider** - Gerencia tema da aplicação

### Componentes Especiais
- **ChatBot** - Assistente virtual com IA Gemini
- **ProjectCard** - Exibição de projetos do GitHub
- **RootLayoutWrapper** - Componente inteligente para aplicar layouts condicionalmente

## 🏗️ Estrutura do Projeto

```
portfolio/
├── public/             # Arquivos estáticos
├── src/
│   ├── app/            # Aplicação Next.js com App Router
│   │   ├── (auth)/     # Rotas de autenticação (grupo)
│   │   │   ├── login/  # Página de login
│   │   │   └── layout.tsx  # Layout específico de autenticação
│   │   ├── (dashboard)/# Rotas administrativas (grupo)
│   │   │   ├── dashboard/  # Dashboard principal
│   │   │   └── layout.tsx  # Layout específico do dashboard
│   │   ├── api/        # Rotas de API
│   │   │   └── chat/   # Endpoint do chatbot
│   │   ├── about/      # Página Sobre
│   │   ├── contact/    # Página Contato
│   │   ├── projects/   # Página de Projetos
│   │   ├── layout.tsx  # Layout raiz
│   │   └── page.tsx    # Página inicial
│   ├── contexts/       # Contextos React (AuthContext)
│   ├── presentation/   # Componentes de apresentação
│   │   ├── components/ # Componentes reutilizáveis
│   │   │   ├── layout/ # Componentes de layout (Headers, Footers)
│   │   │   └── ChatBot/# Componentes do chatbot
│   ├── services/       # Serviços e integrações externas
│   │   └── github.ts   # Integração com API do GitHub
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Funções utilitárias
│   ├── types.d.ts      # Definições de tipos globais
│   └── middleware.ts   # Middleware Next.js para controle de rotas
└── package.json
```

## 🌐 Middleware e Proteção de Rotas

O projeto utiliza o middleware do Next.js para:
- Proteger rotas do dashboard exigindo autenticação
- Redirecionar usuários já autenticados para o dashboard quando tentam acessar o login
- Permitir acesso público às rotas não protegidas

## 🤖 Chatbot com IA

O site conta com um assistente virtual inteligente powered by Google Gemini AI, que oferece:
- Respostas contextualizadas sobre meu perfil profissional
- Capacidade de responder perguntas gerais sobre tecnologia
- Interface amigável e responsiva
- Histórico de conversas
- Feedback visual de interações

### Configuração do Chatbot

1. Obtenha uma chave de API do Google Gemini
2. Configure a variável de ambiente:
```env
GEMINI_API_KEY=sua_chave_aqui
```

## 🛣️ Gerenciamento de Projetos

A seção de projetos apresenta:
- Integração automática com repositórios GitHub
- Filtragem de projetos relevantes
- Exibição de linguagens utilizadas
- Estatísticas de projetos (estrelas, forks)
- Layout responsivo com cards informativos

## 🚦 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/samuelcamargo/portfolio.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse `http://localhost:3000` no seu navegador

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run cleanup` - Limpa arquivos desnecessários e prepara para produção
- `npm run prod` - Realiza limpeza e inicia o servidor de produção
- `npm run generate-icons` - Gera ícones do site

## 🚀 Preparação para Produção

Para preparar o projeto para produção:

1. Execute a limpeza de arquivos temporários:
```bash
npm run cleanup
```

2. Verifique se não há erros no lint:
```bash
npm run lint
```

3. Gere a build de produção:
```bash
npm run build
```

4. Inicie o servidor de produção:
```bash
npm run start
```

Ou simplesmente use o comando unificado:
```bash
npm run prod
```

## 📱 Responsividade

O site é totalmente responsivo e se adapta aos seguintes breakpoints:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 📊 Analytics e Monitoramento

- Google Analytics integrado
- Microsoft Clarity (opcional)
- Logs de performance
- Monitoramento de erros

## 🔐 Segurança

- Autenticação via JWT
- Headers de segurança configurados
- Proteção de rotas via middleware
- Sanitização de inputs
- Variáveis de ambiente seguras

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Samuel Camargo**

* Github: [@samuelcamargo](https://github.com/samuelcamargo)
* LinkedIn: [@samuelcamargoti](https://linkedin.com/in/samuelcamargoti)
* Site: [samuelcamargo.dev](https://samuelcamargo.dev)

## 🤝 Contribuições

Contribuições, issues e pedidos de features são bem-vindos!
