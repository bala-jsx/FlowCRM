import Groq from "groq-sdk";

// Initialize Groq
// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// ================= AI INSIGHTS =================
export const generateInsights = async (leads, tasks) => {
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // ✅ now read at runtime
  });

  try {
    const prompt = `
You are a CRM assistant.

Leads:
${JSON.stringify(leads)}

Tasks:
${JSON.stringify(tasks)}

Analyze the data and return insights in JSON format ONLY.

Format:
[
  {
    "title": "Short title",
    "type": "priority | followup | warning | opportunity",
    "description": "Short actionable insight"
  }
]
Keep it short, concise and structured.
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Insights Error:", error);
    throw new Error("Failed to generate insights");
  }
};

// ================= MESSAGE GENERATOR =================
export const generateMessage = async (lead, type) => {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // ✅ now read at runtime
  });

  try {
    const prompt = `
You are a sales assistant.

Generate a professional ${type} follow-up message.

Lead details:
Name: ${lead.name}
Budget: ${lead.budget}
Authority: ${lead.authority}
Timeline: ${lead.timeline}
Status: ${lead.status}

Instructions:
- Keep it short
- Be persuasive
- Be natural
- Include a clear call to action

${type === "email" ? "- Include a subject line" : ""}
${type === "whatsapp" ? "- Keep tone casual and friendly" : ""}
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Message Generation Error:", error);
    throw new Error("Failed to generate message");
  }
};