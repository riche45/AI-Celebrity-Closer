import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Heart, Mic } from 'lucide-react';
import { Message, Product } from '../types';
import { sendMessage, generateVoice } from '../utils/api';
import { getRandomProduct } from '../data/products';
import ChatMessage from './ChatMessage';

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: "Hey gorgeous! 💜 It's me! I'm SO excited you're here! I've got some amazing new pieces I think you'll absolutely love. What are you in the mood for today? Maybe something cozy like a hoodie, or are you thinking more accessories? ✨",
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessage(inputText, conversationHistory);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        isBot: true,
        timestamp: new Date(),
        audioUrl: response.audioUrl,
        product: response.product
      };

      setMessages(prev => [...prev, botMessage]);
      setConversationHistory(prev => [...prev, inputText, response.message]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! Something went wrong on my end. But don't worry, I'm still here for you! Try asking me about our amazing products! 💕",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendVoiceNote = async () => {
    if (isGeneratingVoice || isLoading) return;

    setIsGeneratingVoice(true);

    try {
      // Get a random product to recommend
      const product = getRandomProduct();
      
      // Create personalized voice message
      const voiceMessage = `Hey love! 💜 I have the PERFECT recommendation for you today! Check out our ${product.name} - it's absolutely gorgeous and only $${product.price}! This ${product.description.toLowerCase()} is one of my personal favorites because it's so versatile and stylish. You can wear it anywhere and you'll look amazing! Plus, ${product.urgencyMessage?.replace(/[💜✨🎵👜🍂]/g, '').trim() || "it's flying off the shelves"}! Don't wait too long because I know this is going to sell out fast. Click add to cart now and treat yourself - you deserve it! ✨`;

      // Generate voice audio
      const audioUrl = await generateVoice(voiceMessage);

      const voiceNoteMessage: Message = {
        id: Date.now().toString(),
        text: voiceMessage,
        isBot: true,
        timestamp: new Date(),
        audioUrl: audioUrl || undefined,
        product: product
      };

      setMessages(prev => [...prev, voiceNoteMessage]);
      setConversationHistory(prev => [...prev, "voice recommendation", voiceMessage]);
    } catch (error) {
      console.error('Voice note error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        text: "Oops! I'm having trouble with my voice right now, but I still have amazing recommendations for you! Let me know what you're looking for! 💜",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  const handleAddToCart = (productId: string) => {
    const successMessage: Message = {
      id: Date.now().toString(),
      text: "OMG YES! 🎉 I'm so excited for you! That's going to look absolutely AMAZING on you! I just know you're going to get so many compliments. You have such great taste! 💜✨",
      isBot: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, successMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg">Taylor's AI Assistant</h1>
            <p className="text-sm text-white/80 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Online • Ready to help you shop!
            </p>
          </div>
          <Heart className="ml-auto text-pink-200" size={24} />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onAddToCart={handleAddToCart}
          />
        ))}
        {(isLoading || isGeneratingVoice) && (
          <div className="flex justify-start mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-2xl">
              <div className="flex items-center gap-2">
                {isGeneratingVoice && <Mic size={16} className="animate-pulse" />}
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                {isGeneratingVoice && <span className="text-xs ml-1">Creating voice note...</span>}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-purple-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tell me what you're looking for..."
            className="flex-1 px-4 py-3 rounded-full border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/90"
            disabled={isLoading || isGeneratingVoice}
          />
          <button
            onClick={handleSendVoiceNote}
            disabled={isGeneratingVoice || isLoading}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative"
            title="Send voice recommendation 🎤"
          >
            <Mic size={20} className={isGeneratingVoice ? 'animate-pulse' : ''} />
            {isGeneratingVoice && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
            )}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading || isGeneratingVoice}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;