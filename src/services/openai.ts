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

    console.log("Resposta da OpenAI:", completion); // <-- Log da resposta

    return completion.choices[0]?.message?.content ?? "Erro: resposta vazia";
  } catch (error) {
    console.error("Erro na OpenAI:", error); // <-- Log do erro
    return "Erro ao processar a resposta";
  }
};