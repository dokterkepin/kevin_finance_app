import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: ''
});

export const openAI_Chat = async (prompt: string) => {
  const res = await client.chat.completions
    .create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'you are my financial assistant' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 1000,
    })
    .then((res) => res.choices[0].message.content)
    .catch((error) => `ChatGPT unable to find that answer ${error?.message}`)

  return res
};


