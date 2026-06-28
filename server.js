const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Pre-programmed Assistant Logic
const botResponses = [
  { keywords: ['project', 'buildmart', 'weather', 'qr', 'stroke'], text: "Prekshak has built several cool projects! The featured ones are Buildmart (a full-stack E-commerce site), a Weather App, an AI QR Code Generator, and a Brain Stroke Detection system using ML. Check the Projects section for links!" },
  { keywords: ['experience', 'internship', 'deloitte', 'prinston', 'work'], text: "He completed a 4-month Fullstack Web Development Internship at Prinston Smart Engineers and a Data Analytics Job Simulation at Deloitte (via Forage)." },
  { keywords: ['education', 'degree', 'college', 'canara'], text: "He is currently pursuing a BE in Computer Science and Design at Canara Engineering College (2022–2026), maintaining a CGPA of 7.8." },
  { keywords: ['skills', 'tech', 'toolkit', 'languages', 'react', 'python', 'javascript'], text: "His toolkit includes JavaScript, Python, Java, React, Node.js, Express, MongoDB, HTML/CSS, SQL, and Machine Learning libraries!" },
  { keywords: ['contact', 'email', 'hire', 'linkedin', 'github'], text: "You can reach Prekshak via email at prekshakhs@gmail.com, or find him on LinkedIn and GitHub. There's also a contact form right here on the site!" },
  { keywords: ['hello', 'hi', 'hey', 'greetings'], text: "Hello! 👋 How can I help you learn more about Prekshak today?" },
  { keywords: ['bye', 'thanks', 'thank you'], text: "You're welcome! Feel free to ask if you have more questions." }
];

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const lowerInput = message.toLowerCase();
  let botReply = "I'm a simple bot so I didn't quite catch that. Try asking about his 'projects', 'experience', 'skills', or 'contact' info!";
  
  for (let rule of botResponses) {
    if (rule.keywords.some(kw => lowerInput.includes(kw))) {
      botReply = rule.text;
      break;
    }
  }

  // Simulate slight API delay for realism
  setTimeout(() => {
    res.json({ reply: botReply });
  }, 800 + Math.random() * 500);
});

// Fallback to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
