Q : how do I use Gemini API without installing Gemini's anything on my machine using "npm install @google/genai"
A : 
const API_KEY = "YOUR_GEMINI_API_KEY";
const MODEL = "gemini-1.5-flash"; // or gemini-1.5-pro
const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

async function askGemini(prompt) {
  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.error) {
      console.error("API Error:", data.error.message);
      return;
    }

    // Extract the text content from the response object
    const resultText = data.candidates[0].content.parts[0].text;
    console.log("Gemini:", resultText);
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

askGemini("Write a short poem about JavaScript without libraries.");
