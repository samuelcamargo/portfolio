export async function chatWithGemini(prompt: string) {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error('Chave da API Gemini não encontrada');
    return 'Desculpe, o serviço não está configurado corretamente.';
  }

  try {
    console.log('Iniciando chat com Gemini...');
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
                  text: prompt
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