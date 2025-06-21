import React, { useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Message } from '../types';
import ProductCard from './ProductCard';

interface ChatMessageProps {
  message: Message;
  onAddToCart?: (productId: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onAddToCart }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const handlePlayAudio = () => {
    if (!message.audioUrl) return;

    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    } else {
      const newAudio = new Audio(message.audioUrl);
      newAudio.onended = () => setIsPlaying(false);
      newAudio.onpause = () => setIsPlaying(false);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
        message.isBot 
          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
          : 'bg-gray-200 text-gray-800'
      }`}>
        <div className="flex items-start gap-2">
          {message.isBot && (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-sm">✨</span>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm leading-relaxed">{message.text}</p>
            
            {message.audioUrl && message.isBot && (
              <button
                onClick={handlePlayAudio}
                className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                <Volume2 size={14} />
                <span className="text-xs">Voice</span>
              </button>
            )}
            
            {message.product && (
              <div className="mt-3">
                <ProductCard 
                  product={message.product} 
                  onAddToCart={onAddToCart}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className={`text-xs mt-1 ${message.isBot ? 'text-white/70' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;