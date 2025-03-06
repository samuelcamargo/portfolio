import { GoogleGenerativeAI } from '@google/generative-ai';

const PERSONAL_CONTEXT = `
Informações sobre Samuel Camargo:

Cargo Atual: Gerente de TI na Campsoft
Localização: Barueri - São Paulo - BR
Contato: samuelcamargo1@gmail.com | +55 (11) 91481-0664

Formação Acadêmica:
1. Pós-graduação em Inteligência Artificial aplicada aos Negócios
   - Instituição: Universidade Anhembi Morumbi
   - Período: 2024-2025
   - Foco: IA e Machine Learning

2. MBA em Gestão de Projetos
   - Instituição: Universidade Anhembi Morumbi
   - Período: 2023-2024 (concluido)
   - Foco: Metodologias ágeis e gestão

3. Graduação em Gestão de TI
   - Instituição: Estácio
   - Período: 2013-2016 (concluido)
   - Foco: Gestão estratégica de tecnologia

4. Bacharel em Sistemas da Informação
   - Instituição: Universidade Bandeirante de São Paulo
   - Período: 2009-2012
   - Foco: Desenvolvimento de sistemas

Certificações:
- AWS Certified Cloud Practitioner
- Professional Scrum Master I (PSM I)
- PHP 8 Certified Engineer

Experiência Profissional:
1. Gerente de TI - Campsoft (2023-Presente)
   - Liderança de equipes técnicas
   - Gestão de projetos com Scrum
   - Documentação estratégica
   - Otimização de processos

2. Líder Técnico - Campsoft (2020-2023)
   - Gerenciamento de equipes
   - Arquitetura de sistemas
   - Code review
   - Mentoria técnica

3. Programador Full Stack - Campsoft (2020)
   - Desenvolvimento back-end e front-end
   - Integrações com APIs
   - Manutenção de sistemas

Habilidades Técnicas:
- Backend: PHP, Laravel, Node.js
- Frontend: TypeScript, React, Next.js
- DevOps: Docker, Git, CI/CD
- Cloud: AWS, Digital Ocean
- Banco de Dados: MySQL, PostgreSQL
- Arquitetura: DDD, Clean Architecture, SOLID

Idiomas:
- Português (Nativo)
- Inglês (Avançado)

Perfil Profissional:
Profissional com mais de 10 anos de experiência em desenvolvimento de software e gestão de equipes. 
Especializado em arquitetura de sistemas, metodologias ágeis e liderança técnica. 
Forte atuação em projetos full stack com foco em qualidade e boas práticas de desenvolvimento.
`;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('API key não configurada');
    return Response.json(
      { error: 'API key não configurada' },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const context = `
      Você é um assistente virtual que representa Samuel Camargo.
      Use o contexto abaixo para responder perguntas sobre Samuel.
      Se a pergunta for sobre Samuel ou sua carreira, use APENAS as informações fornecidas no contexto.
      Se a pergunta for sobre outros assuntos, você pode usar seu conhecimento geral para responder.
      Mantenha um tom profissional mas amigável.
      Responda sempre em Português.

      ${PERSONAL_CONTEXT}

      Pergunta do usuário: ${prompt}
    `;

    try {
      console.log('Iniciando geração de conteúdo com gemini-2.0-flash...');
      const result = await model.generateContent(context);
      console.log('Conteúdo gerado com sucesso');
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        console.error('Resposta vazia do modelo');
        return Response.json(
          { error: 'Não foi possível gerar uma resposta. Por favor, tente novamente.' },
          { status: 500 }
        );
      }
      
      console.log('Resposta gerada com sucesso');
      return Response.json({ text });
    } catch (modelError) {
      console.error('Erro na geração de conteúdo:', modelError);
      return Response.json(
        { error: 'Erro ao gerar resposta. Por favor, tente novamente.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erro ao processar mensagem:', error);
    return Response.json(
      { error: 'Erro ao processar mensagem. Por favor, tente novamente.' },
      { status: 500 }
    );
  }
} 