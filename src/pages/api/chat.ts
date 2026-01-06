import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

export const runtime = 'edge';

const openai = createOpenAI({
  // baseURL: 'https://api.groq.com/openai/v1',
  // apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4-turbo-preview'),
    messages,
  });

  return result.toTextStreamResponse();
}
