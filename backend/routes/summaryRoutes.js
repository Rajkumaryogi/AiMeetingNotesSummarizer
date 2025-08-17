import express from "express";
import { generateSummary } from "../services/aiService.js";
import { sendEmail } from "../services/emailService.js";

const router = express.Router();

// Generate AI Summary
router.post("/generate", async (req, res) => {
  try {
    const { transcript, instruction } = req.body;
    const summary = await generateSummary(transcript, instruction);
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send Email
router.post("/send", async (req, res) => {
  try {
    const { recipients, summary } = req.body;
    await sendEmail(recipients, summary);
    res.json({ message: "✅ Email sent successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
