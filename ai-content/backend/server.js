// server.js

// 1. dotenv-import
import "dotenv/config";

// 2. import all requirement
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3001;

// ⛔ use your API Key
const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

// Gemini API Endpoint
app.post("/api/generate-content", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ error: "Prompt is required in the request body." });
  }

  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: "Server configuration error: API Key not set." });
  }

  try {
    const model = "gemini-2.5-flash";

    const response = await ai.models.generateContent({
      model: model,
      contents: [prompt],
    });

    // sent to answer to react
    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate content from Gemini API." });
  }
});

// start the server
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
