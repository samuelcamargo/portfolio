const PERSONAL_CONTEXT = `
Informações sobre Samuel Camargo:

Cargo Atual: Gerente de TI na Campsoft (desde agosto de 2023)
Localização: Barueri - São Paulo - BR
Contato: samuelcamargo1@gmail.com, WhatsApp: +55 (11) 91481-0664

Formação Acadêmica:
- Pós-graduação em Inteligência Artificial Nos Negócios (Universidade Anhembi Morumbi, 2024-2025)
- MBA em Gestão de Projetos (Universidade Anhembi Morumbi, 2023-2024)
- Graduação em Gestão de TI (Estácio, 2013-2016)
- Bacharel em Sistemas da Informação (Universidade Bandeirante de São Paulo, 2009-2012)

Experiência Profissional:
1. Gerente de TI - Campsoft (2023-Presente)
   - Liderança de equipes técnicas
   - Gestão de projetos com metodologias ágeis (Scrum)
   - Documentação estratégica e otimização de processos

2. Líder Técnico - Campsoft (2020-2023)
   - Gerenciamento de equipes de desenvolvimento
   - Arquitetura de sistemas
   - Implementação de soluções e revisão de código

3. Programador Full Stack - Campsoft (2020)
   - Desenvolvimento back-end e front-end
   - PHP, JavaScript e integração com APIs

Principais Habilidades:
Backend: PHP, Laravel, Node.js, Express.js (Avançado)
Frontend: TypeScript, JavaScript, React, Next.js (Avançado)
DevOps: Docker, CI/CD, Git, Linux (Avançado)
Banco de Dados: MySQL (Avançado), MongoDB, PostgreSQL (Intermediário)
Arquitetura: Clean Architecture, SOLID, Design Patterns, DDD, TDD (Avançado)
Gestão: Scrum, Kanban, Liderança, Gestão de Times (Avançado)

Idiomas:
- Português (Nativo)
- Inglês (Profissional)
- Inglês Técnico (Profissional)

Perfil Profissional:
Sou um entusiasta da tecnologia que combina paixão por desenvolvimento com visão estratégica. Como Gerente de Desenvolvimento, lidero equipes técnicas em projetos complexos, mantendo-me ativamente envolvido na programação. Especializado em PHP, Laravel, TypeScript e Node.js, busco constantemente inovação e excelência técnica. Minha abordagem única une expertise em desenvolvimento, gestão ágil e implementação de soluções escaláveis, sempre com foco em entregar valor real aos projetos.
`;

export async function chatWithGemini(prompt: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Chave da API Gemini não encontrada');
    return 'Desculpe, o serviço não está configurado corretamente.';
  }

  try {
    console.log('Iniciando chat com Gemini...');
    
    // Adiciona o contexto pessoal à prompt do usuário
    const contextualizedPrompt = `
Você é um assistente virtual amigável e profissional que possui duas funções:

1. Responder perguntas gerais sobre qualquer assunto, utilizando seu conhecimento como IA.
2. Responder perguntas específicas sobre Samuel Camargo usando o contexto abaixo.

${PERSONAL_CONTEXT}

Instruções para responder:
1. Se a pergunta for sobre Samuel Camargo, use APENAS as informações do contexto acima
2. Se a pergunta for sobre outros assuntos, use seu conhecimento geral como IA
3. Se a pergunta sobre Samuel não puder ser respondida com as informações fornecidas, diga que não tem essa informação específica
4. Mantenha um tom profissional e amigável
5. Responda sempre em português

Pergunta do usuário: ${prompt}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: contextualizedPrompt
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resposta de erro:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Resposta completa:', data);
    
    const text = data.candidates[0].content.parts[0].text;
    console.log('Texto extraído:', text);
    
    return text;
  } catch (error) {
    console.error('Erro detalhado:', error);
    return 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.';
  }
} 