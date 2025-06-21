# AI Celebrity Closer

A conversational AI assistant prototype that impersonates celebrity voices (Taylor Swift example) to welcome fans and increase product conversions for e-commerce stores.

## Features

- 🎭 Celebrity-impersonated chatbot with Taylor Swift persona
- 🔊 Voice responses using ElevenLabs API
- 🛍️ Smart product recommendations based on conversation
- 📱 Mobile-first responsive design
- ✨ Beautiful animations and micro-interactions
- 🎯 Conversion-focused conversation flow
- 🚀 Clean, extensible codebase for Shopify plugin development

## Tech Stack

- **Frontend**: React + Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js + Express
- **AI Services**: OpenAI GPT-4, ElevenLabs Voice API
- **Icons**: Lucide React

## Quick Start

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `ELEVENLABS_API_KEY`: Your ElevenLabs API key (optional)
   - `ELEVENLABS_VOICE_ID`: Voice ID for celebrity voice (optional)

3. **Start the development servers:**
   ```bash
   npm run dev
   ```

   This starts both the React frontend (port 5173) and Express backend (port 3001).

## Configuration

### Required APIs

- **OpenAI API**: Required for generating celebrity-style responses
- **ElevenLabs API**: Optional for voice generation (app works without it)

### Voice Setup

1. Sign up for ElevenLabs account
2. Create or clone a celebrity voice
3. Get your Voice ID from the ElevenLabs dashboard
4. Add credentials to `.env` file

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatBot.tsx     # Main chatbot interface
│   ├── ChatMessage.tsx # Individual message component
│   └── ProductCard.tsx # Product recommendation card
├── data/               # Mock data
│   └── products.ts     # Shopify product mockups
├── types/              # TypeScript definitions
├── utils/              # API utilities
└── App.tsx            # Main app component

server/
├── routes/            # API routes
├── services/          # External API integrations
├── data/             # Shared product data
└── index.js          # Express server
```

## Features Demo

1. **Welcome Message**: Enthusiastic greeting in celebrity voice
2. **Product Inquiry**: Ask about hoodies, vinyl, accessories
3. **Smart Recommendations**: AI suggests relevant products
4. **Voice Responses**: Hear celebrity voice responses (if configured)
5. **Add to Cart**: Simulate purchase with celebration message

## Customization

### Changing Celebrity Persona

1. Edit the system prompt in `server/services/openai.js`
2. Update product names and descriptions in `src/data/products.ts`
3. Configure ElevenLabs voice to match your celebrity
4. Adjust UI colors and branding in components

### Adding Products

Add new products to the `mockProducts` array in `src/data/products.ts`:

```javascript
{
  id: 'unique-id',
  name: 'Product Name',
  price: 29,
  originalPrice: 39, // Optional sale price
  image: 'https://example.com/image.jpg',
  description: 'Product description',
  category: 'apparel|music|accessories',
  inStock: true,
  urgencyMessage: 'Limited time offer! ⏰'
}
```

## Deployment

The app is designed to be easily deployable and extensible into a Shopify plugin:

1. **Frontend**: Deploy to Vercel, Netlify, or similar
2. **Backend**: Deploy to Railway, Render, or similar
3. **Environment**: Update API URLs for production

## Future Enhancements

- Shopify API integration
- Multiple celebrity personas
- Advanced analytics and conversion tracking
- A/B testing for different conversation flows
- Real-time inventory integration
- Payment processing integration

## Contributing

This is a prototype designed to demonstrate the potential of celebrity AI assistants in e-commerce. Feel free to extend and customize for your specific use case.

## License

MIT License - feel free to use this code for your projects!