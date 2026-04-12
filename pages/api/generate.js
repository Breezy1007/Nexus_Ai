export default async function handler(req, res) {
  const { prompt } = req.body;
  console.log("KEY exists:", !!process.env.GEMINI_API_KEY);
  if (!prompt) {
    return res.status(400).json({ error: "No prompt" });
  }
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );
    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data));
    const result = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    res.status(200).json({ result });
  } catch (err) {
    console.log("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
