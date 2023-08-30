import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

// Initialize OpenAI API with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// A simple GET route to test if the server is running
router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" });
});

// POST route to generate text (or image, if OpenAI API for DALL-E becomes available)
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Create a text-based design. Replace with image API call if available in the future.
    const response = await openai.createCompletion({
      model: "text-davinci-002", // Replace with your desired GPT-3 model
      prompt: prompt,
      max_tokens: 100
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export default router;
