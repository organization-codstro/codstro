import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY!,
});

export const generateGptContent = async (prompt: string): Promise<string> => {
  try {
    const response = await openai.responses.create({
      model: "gpt-5.2", // 원하는 최신 GPT 모델
      input: prompt,
    });

    return response.output_text ?? "";
  } catch (error) {
    console.error("OpenAI GPT Error:", error);
    return "AI 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};
