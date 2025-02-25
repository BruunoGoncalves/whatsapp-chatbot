import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Defina sua chave de API no .env
});

export const getOpenAICompletion = async (input: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: input }],
    });

    return completion.choices[0]?.message?.content ?? "Erro: resposta vazia";
  } catch (error) {
    console.log(`Error completing input: ${error}`);
    return "Erro ao processar a resposta";
  }
};

