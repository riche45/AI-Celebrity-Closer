import axios from 'axios';
import { ChatResponse, ApiError } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const sendMessage = async (message: string, conversationHistory: string[] = []): Promise<ChatResponse> => {
  try {
    const response = await api.post('/chat', {
      message,
      conversationHistory
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        error: 'Failed to send message',
        details: error.response?.data?.error || error.message
      };
      throw apiError;
    }
    throw { error: 'Unknown error occurred' } as ApiError;
  }
};

export const generateVoice = async (text: string): Promise<string> => {
  try {
    const response = await api.post('/voice', { text });
    return response.data.audioUrl;
  } catch (error) {
    console.error('Voice generation failed:', error);
    // Return empty string if voice generation fails
    return '';
  }
};