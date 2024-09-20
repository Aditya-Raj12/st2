const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;


const GEMINI_API_KEY = "AIzaSyBT7EsgKI5igL7eXcH_Z0bVKwOzMkPW7XY";


app.use(express.static("public"));


app.use(express.json());
app.get("/questions", (req, res) => {
  const filePath = path.join(__dirname, "public", "questions.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to load questions" });
    }
    res.json(JSON.parse(data));
  });
});


app.post("/evaluate", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Question: ${question}\nAnswer: ${answer}\nEvaluate the question and answer and give me the response in 2 lines`;

    const result = await model.generateContent(prompt);
    const evaluation = result.response.text();

    res.json({ evaluation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while evaluating the answer." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
