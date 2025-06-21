import express from 'express';
import { generateChatResponse } from '../services/openai.js';
import { generateVoiceResponse } from '../services/elevenlabs.js';
import { mockProducts, searchProducts, getRandomProduct } from '../data/products.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Generate AI response
    const aiResponse = await generateChatResponse(message, conversationHistory);
    
    // Determine if we should recommend a product
    const shouldRecommendProduct = shouldTriggerProductRecommendation(message, aiResponse);
    let recommendedProduct = null;

    if (shouldRecommendProduct) {
      // Search for relevant products or get random one
      const searchResults = searchProducts(message);
      recommendedProduct = searchResults.length > 0 ? searchResults[0] : getRandomProduct();
    }

    // Generate voice response (optional - will fail gracefully if not configured)
    let audioUrl = null;
    try {
      audioUrl = await generateVoiceResponse(aiResponse);
    } catch (voiceError) {
      console.warn('Voice generation failed, continuing without audio:', voiceError.message);
    }

    const response = {
      message: aiResponse,
      audioUrl,
      product: recommendedProduct,
      shouldRecommendProduct
    };

    res.json(response);
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      details: error.message 
    });
  }
});

router.post('/voice', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioUrl = await generateVoiceResponse(text);
    res.json({ audioUrl });
  } catch (error) {
    console.error('Voice generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate voice',
      details: error.message 
    });
  }
});

// Helper function to determine if we should recommend a product
function shouldTriggerProductRecommendation(userMessage, aiResponse) {
  const productKeywords = [
    'hoodie', 'shirt', 'vinyl', 'record', 'bag', 'tote', 'scarf', 'cardigan',
    'phone case', 'merch', 'merchandise', 'clothes', 'clothing', 'accessories',
    'buy', 'purchase', 'shop', 'looking for', 'want', 'need', 'show me'
  ];

  const userLower = userMessage.toLowerCase();
  const aiLower = aiResponse.toLowerCase();

  return productKeywords.some(keyword => 
    userLower.includes(keyword) || aiLower.includes('recommend') || aiLower.includes('perfect')
  );
}

export default router;