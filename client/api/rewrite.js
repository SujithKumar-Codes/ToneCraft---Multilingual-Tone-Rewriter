import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, tone, language } = req.body;

  if (!text || !tone || !language) {
    return res
      .status(400)
      .json({ error: "Text, tone, and language are required" });
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent,
      {
        contents: [
          {
            parts: [
              {
                text: `Rewrite the following text in a ${tone} tone. 
                You MUST output only in ${language}. 
                Do not include English translations. 
                Text: "${text}"`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
      }
    );

    const rewrittenText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.status(200).json({ rewrittenText });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to rewrite text" });
  }
}


