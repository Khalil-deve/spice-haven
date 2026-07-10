import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// Import Database and Routes
import connectDB from "./backend/db";
import authRoutes from "./backend/routes/authRoutes";
import reservationRoutes from "./backend/routes/reservationRoutes";
import reviewRoutes from "./backend/routes/reviewRoutes";

// Connect to MongoDB
connectDB();


// Lazy-initialize Gemini SDK to prevent crashes on startup if API key is not set
let aiInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY environment variable is not configured.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

// REST API Endpoints
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", time: new Date().toISOString() });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);

// AI Chatbot Maitre D' Assistant
app.post("/api/gemini/chat", async (req: Request, res: Response) => {
  try {
    const { message, chatHistory } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required." });
      return;
    }

    const ai = getGeminiClient();
    
    // Formatting history for standard chats
    const formattedHistory = (chatHistory || []).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = `
You are Anwar, the legendary, soft-spoken, and infinitely charming Maitre D' and Sommelier of Spice Haven, a luxury Indian restaurant in London inspired by the grand mid-century Bombay Cafés.
Your personality is elegant, deeply knowledgeable about Indian culinary history, welcoming, and slightly poetic. Speak like a refined vintage host. Avoid generic robotic or modern customer support language. Use brief, hospitable paragraphs.
You can:
1. Recommend specific Spice Haven signature dishes (like our 24-hour slow-cooked Black Daal, Jackfruit Biryani, Gunpowder Potatoes, Spicy Lamb Chops, or Cardamom Pistachio Kulfi).
2. Answer questions about ingredients, spice levels, allergens, or beverage pairings (e.g., recommend our Viceroy's Punch or salted cumin lassi).
3. Offer tips on how to eat certain items (e.g., eating curry with hand-stretched garlic naan).
4. Be courteous, warm, and inviting.

Keep answers beautiful and relatively concise (under 120 words). Never use code blocks or technical jargon. Always stay in character as Anwar.
    `;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction,
        temperature: 0.8,
      },
      history: formattedHistory
    });

    const response = await chat.sendMessage({ message });
    res.json({ reply: response.text });
  } catch (err: any) {
    console.error("AI Assistant Error:", err.message);
    res.status(500).json({ 
      error: "AI Assistant temporarily resting.", 
      message: err.message,
      isApiKeyMissing: err.message.includes("GEMINI_API_KEY")
    });
  }
});

// AI Dish Recommendation Endpoint
app.post("/api/gemini/recommend", async (req: Request, res: Response) => {
  try {
    const { mood, diet, spiceTolerance } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Based on these preferences:
- Mood: "${mood || 'adventurous'}"
- Dietary Requirement: "${diet || 'none'}"
- Preferred Spice Level: "${spiceTolerance || 'medium'}"

Suggest three perfectly paired dishes from the "Spice Haven" menu. 
For each suggestion, provide:
1. Dish Name
2. A sensory, elegant description explaining why it matches their mood and requirements.
3. Recommended beverage pairing.

Return your response in structured JSON format. 
The schema must be an array of objects:
[
  {
    "dishName": "...",
    "reason": "...",
    "beverage": "..."
  }
]
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY" as any,
          items: {
            type: "OBJECT" as any,
            properties: {
              dishName: { type: "STRING" as any },
              reason: { type: "STRING" as any },
              beverage: { type: "STRING" as any }
            },
            required: ["dishName", "reason", "beverage"]
          }
        }
      }
    });

    const results = JSON.parse(response.text || "[]");
    res.json({ recommendations: results });
  } catch (err: any) {
    console.error("Dish Recommendation Error:", err.message);
    res.status(500).json({ 
      error: "Recommendations failed", 
      message: err.message,
      isApiKeyMissing: err.message.includes("GEMINI_API_KEY")
    });
  }
});

// AI Meal Planner Endpoint
app.post("/api/gemini/meal-planner", async (req: Request, res: Response) => {
  try {
    const { occasion, groupSize, preference } = req.body;
    const ai = getGeminiClient();

    const prompt = `
Create a bespoke Indian feast/set-menu program for:
- Occasion: "${occasion || 'Romantic Anniversary'}"
- Guest Count: ${groupSize || 2}
- Preference: "${preference || 'Chef Choice'}"

The plan must include:
1. Theme: A short poetic title/theme for the feast.
2. Appeticers (1-2 small plates)
3. Main Courses (2 signature curries or grills, along with bread/rice)
4. Dessert (1 classic sweet)
5. Service flow note (how it should be enjoyed)

Return the response in structured JSON:
{
  "theme": "...",
  "starters": ["..."],
  "mains": ["..."],
  "dessert": "...",
  "notes": "..."
}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT" as any,
          properties: {
            theme: { type: "STRING" as any },
            starters: { type: "ARRAY" as any, items: { type: "STRING" as any } },
            mains: { type: "ARRAY" as any, items: { type: "STRING" as any } },
            dessert: { type: "STRING" as any },
            notes: { type: "STRING" as any }
          },
          required: ["theme", "starters", "mains", "dessert", "notes"]
        }
      }
    });

    const results = JSON.parse(response.text || "{}");
    res.json({ planner: results });
  } catch (err: any) {
    console.error("Meal Planner Error:", err.message);
    res.status(500).json({ 
      error: "Meal planner failed", 
      message: err.message,
      isApiKeyMissing: err.message.includes("GEMINI_API_KEY")
    });
  }
});

// Integrate Vite middleware or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Spice Haven] Server listening on http://localhost:${PORT}`);
  });
}

startServer();
