import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("ToneCraft Backend Running ✅");
});

// API route to rewrite text
app.post("/api/rewrite", async (req, res) => {
  const { text, tone, language } = req.body;

  if (!text || !tone || !language) {
    return res
      .status(400)
      .json({ error: "Text, tone, and language are required" });
  }

  try {
    // Gemini API call
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
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
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    // Extract Gemini response
    const rewrittenText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    res.json({ rewrittenText });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Failed to rewrite text" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
