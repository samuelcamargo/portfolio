# Portfólio - Samuel Camargo

## 🚀 Sobre o Projeto

Este é meu portfólio pessoal, desenvolvido com tecnologias modernas para apresentar meus projetos e habilidades como desenvolvedor Full Stack. O site foi construído com foco em performance, acessibilidade e design responsivo, incluindo um chatbot inteligente alimentado pelo Google Gemini AI.

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com SSR e otimizações de performance
- **React** - Biblioteca para construção de interfaces
- **TypeScript** - Adiciona tipagem estática ao JavaScript
- **Material-UI** - Framework de design para componentes React
- **Google Gemini AI** - API de inteligência artificial para o chatbot
- **React Icons** - Biblioteca de ícones
- **Node.js** - Ambiente de execução JavaScript

## 📦 Dependências e Bibliotecas

### Core
```json
{
  "next": "^14.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^5.3.3"
}
```

### UI e Estilização
```json
{
  "@mui/material": "^5.15.10",
  "@mui/icons-material": "^5.15.10",
  "@emotion/react": "^11.11.3",
  "@emotion/styled": "^11.11.0",
  "react-icons": "^5.0.1"
}
```

### Desenvolvimento
```json
{
  "@types/node": "^20.11.17",
  "@types/react": "^18.2.55",
  "@types/react-dom": "^18.2.19",
  "eslint": "^8.56.0",
  "eslint-config-next": "^14.1.0"
}
```

## ✨ Características

- Design responsivo e moderno
- Tema escuro
- Animações suaves
- Otimizado para SEO
- Performance otimizada
- Interface intuitiva
- Chatbot IA integrado
- Partículas interativas no background
- Lazy loading de componentes
- Analytics integrado

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
NEXT_PUBLIC_GEMINI_API_KEY=sua_chave_aqui
```

## 🚦 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/samuelcamargo/portfolio.git
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse `http://localhost:3000` no seu navegador

## 🏗️ Estrutura do Projeto

```
portfolio/
├── public/          # Arquivos estáticos
├── src/
│   ├── app/         # Rotas e páginas
│   ├── presentation/# Componentes da interface
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── styles/     # Estilos e temas
│   │   └── ChatBot/    # Componentes do chatbot
│   ├── services/   # Serviços e integrações
│   ├── domain/     # Regras de negócio
│   └── data/       # Camada de dados
└── package.json
```

## 📱 Responsividade

O site é totalmente responsivo e se adapta aos seguintes breakpoints:
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

## 🎨 Temas e Estilização

- Tema escuro moderno
- Gradientes sutis
- Animações suaves
- Paleta de cores consistente
- Partículas interativas

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter
- `npm run test` - Executa os testes
- `npm run generate-icons` - Gera ícones do site

## 📊 Analytics e Monitoramento

- Google Analytics integrado
- Microsoft Clarity (opcional)
- Logs de performance
- Monitoramento de erros

## 🔐 Segurança

- Headers de segurança configurados
- Proteção contra XSS
- Sanitização de inputs
- Variáveis de ambiente seguras
- Políticas de segurança CSP

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Samuel Camargo**

* Github: [@samuelcamargo](https://github.com/samuelcamargo)
* LinkedIn: [@samuelcamargoti](https://linkedin.com/in/samuelcamargoti)
* Site: [@samuelcamargoti](https://samuelcamargo.dev.br/)

## 🤝 Contribuições

Contribuições, issues e pedidos de features são bem-vindos!
