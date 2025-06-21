import OpenAI from 'openai';

// Initialize OpenAI client with better error handling
let openai = null;

try {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
    console.warn('⚠️  OpenAI API key not configured. Please set OPENAI_API_KEY in your .env file.');
  } else {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    console.log('✅ OpenAI client initialized successfully');
  }
} catch (error) {
  console.error('❌ Failed to initialize OpenAI client:', error.message);
}

export const generateChatResponse = async (userMessage, conversationHistory = []) => {
  // If OpenAI is not configured, return fallback response immediately
  if (!openai) {
    console.log('Using fallback response - OpenAI not configured');
    const fallbackResponses = [
      "Hey love! 💜 I'm having a tiny technical moment, but I'm still here for you! Tell me what kind of merch you're dreaming about today? ✨",
      "Oops, my connection got a bit shaky! But don't worry, I've got amazing recommendations for you! What's catching your eye? 💜",
      "Technical difficulties can't stop me from helping you find the perfect pieces! What are you in the mood for? ✨"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  try {
    // Build conversation context
    const messages = [
      {
        role: 'system',
        content: `You are Taylor Swift's AI assistant for her merchandise store. You're enthusiastic, friendly, and slightly flirty in a fan-appropriate way. You love helping fans find perfect merch and you're genuinely excited about the products. 

Key personality traits:
- Use lots of purple hearts (💜), sparkles (✨), and exclamation points
- Be encouraging and supportive 
- Create urgency around products ("limited edition", "almost sold out")
- Match Taylor's warm, genuine personality
- Keep responses short and conversational (2-3 sentences max)
- Use words like "gorgeous", "amazing", "perfect", "love"
- Reference Taylor's songs/eras subtly when relevant
- Always try to guide toward making a purchase

Available product categories: apparel (hoodies, cardigans), music (vinyl records), accessories (bags, scarves, phone cases).

When users ask about products, be enthusiastic and mention specific benefits. Create emotional connection.`
      }
    ];

    // Add conversation history
    for (let i = 0; i < conversationHistory.length; i += 2) {
      if (conversationHistory[i]) {
        messages.push({ role: 'user', content: conversationHistory[i] });
      }
      if (conversationHistory[i + 1]) {
        messages.push({ role: 'assistant', content: conversationHistory[i + 1] });
      }
    }

    // Add current message
    messages.push({ role: 'user', content: userMessage });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
      max_tokens: 150,
      temperature: 0.8,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Fallback responses if OpenAI fails
    const fallbackResponses = [
      "Hey love! 💜 I'm having a tiny technical moment, but I'm still here for you! Tell me what kind of merch you're dreaming about today? ✨",
      "Oops, my connection got a bit shaky! But don't worry, I've got amazing recommendations for you! What's catching your eye? 💜",
      "Technical difficulties can't stop me from helping you find the perfect pieces! What are you in the mood for? ✨"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};