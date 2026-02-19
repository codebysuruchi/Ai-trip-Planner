import express from "express";
import cors from "cors";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
// dotenv.config({ path: ".env.local" }); // explicitly load .env.local
dotenv.config(); 

const app = express();
// app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ai-trip-planner-beige-two.vercel.app"
  ]
}));

app.use(express.json());
// dotenv.config({ path: "../.env.local" });


// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post("/generate-trip", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-flash",
//     });

//     console.log(model);
//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     res.json({ success: true, text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: "AI failed" });
//   }
// });

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


app.post("/generate-trip", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;

    res.json({ success: true, text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "AI failed" });
  }
});

// console.log(genAI);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// console.log("Loaded API Key:", process.env.GEMINI_API_KEY);
// console.log(req.body);

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config(); 

// const app = express();
// app.use(cors());
// app.use(express.json());


// if (!process.env.GEMINI_API_KEY) {
//   console.error("❌ GEMINI_API_KEY missing");
//   process.exit(1);
// }

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// app.post("/generate-trip", async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     const model = genAI.getGenerativeModel({
//       model: "gemini-1.5-pro",
//     });

//     const result = await model.generateContent(prompt);
//     const text = result.response.text();

//     res.json({
//       success: true,
//       text,
//     });
//   } catch (error) {
//     console.error("❌ Gemini Error:", error);
//     res.status(500).json({
//       success: false,
//       error: "AI failed",
//     });
//   }
// });

// app.listen(5000, () => {
//   console.log("✅ Server running on http://localhost:5000");
// });
