import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { useContent } from '../context/ContentContext';
import { ChatMessage } from '../types';
import { Send, User, Bot, X, Loader2 } from 'lucide-react';
// FIX: Changed import to a default import to resolve module resolution error.
import Logo from './Logo';

interface VirtualAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

// Ensure the API_KEY is available from the environment
const API_KEY = process.env.API_KEY;

const VirtualAssistant: React.FC<VirtualAssistantProps> = ({ isOpen, onClose }) => {
  const { content } = useContent();
  const assistantContent = content.assistant;
  
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (!API_KEY) {
        setError('API Key is missing. The assistant cannot be initialized.');
        return;
      }
      try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const chatSession = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: "You are Assistant K-YENE, a professional and friendly virtual assistant for K-YENE, a multi-sector holding company. Your goal is to help users by answering their questions about the company's activities in real estate, multiservices, mining, aviation, and agro-industry. Keep your answers concise, helpful, and in the user's language (French or English). Be polite and use a positive tone.",
            },
        });
        setChat(chatSession);
        setMessages([{ role: 'model', parts: [{ text: assistantContent.welcomeMessage }] }]);
        setError(null);
        setShowWhatsAppPrompt(false);
      } catch (e) {
        console.error("Failed to initialize Gemini:", e);
        setError("Could not initialize the assistant. Please try again later.");
      }
    }
  }, [isOpen, assistantContent.welcomeMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  useEffect(() => {
    if (isOpen) {
        inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      const result = await chat.sendMessageStream({ message: input });
      let text = '';
      
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: '' }] };
      setMessages(prev => [...prev, modelMessage]);

      for await (const chunk of result) {
        text += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { role: 'model', parts: [{ text }] };
          return newMessages;
        });
      }
    } catch (e) {
      console.error("Error sending message:", e);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "I'm sorry, I encountered an error. Please try again." }] };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    if (userMessageCount >= 2 && !showWhatsAppPrompt) {
        setShowWhatsAppPrompt(true);
    }
  }, [messages, showWhatsAppPrompt]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] sm:w-96 h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-40 transition-all duration-300 origin-bottom-right"
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0)', opacity: isOpen ? 1 : 0 }}
        role="dialog"
        aria-labelledby="assistant-title"
    >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
                <Logo className="h-6 w-auto text-slate-700" />
                <h2 id="assistant-title" className="font-bold text-slate-800">{assistantContent.title}</h2>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200" aria-label="Close chat">
                <X size={20} />
            </button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => {
                const isLastModelMessage = index === messages.length - 1 && msg.role === 'model';
                const showCursor = isLastModelMessage && isLoading;

                return (
                    <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                        {msg.role === 'model' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"><Bot size={18} className="text-red-600"/></div>}
                        <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${msg.role === 'user' ? 'bg-red-600 text-white rounded-br-lg' : 'bg-slate-100 text-slate-800 rounded-bl-lg'}`}>
                           <p className="text-sm leading-relaxed whitespace-pre-wrap">
                               {msg.parts[0].text}
                               {showCursor && <span className="typing-cursor"></span>}
                           </p>
                        </div>
                        {msg.role === 'user' && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"><User size={18} className="text-slate-600"/></div>}
                    </div>
                );
            })}
            
            {error && (
                <div className="p-3 bg-red-50 border-l-4 border-red-400 text-red-700 text-sm">{error}</div>
            )}
            {showWhatsAppPrompt && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-sm text-green-800 mb-3">{assistantContent.whatsappPrompt}</p>
                    <a href={assistantContent.whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
                        {assistantContent.whatsappButton}
                    </a>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={assistantContent.placeholder}
                    disabled={isLoading || !!error}
                    className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
                <button type="submit" disabled={isLoading || !input.trim() || !!error} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors">
                    {isLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Send size={18} />
                    )}
                </button>
            </div>
        </form>

        <style>{`
            @keyframes blink {
                50% { opacity: 0; }
            }
            .typing-cursor {
                display: inline-block;
                width: 1px;
                height: 1em;
                background-color: currentColor;
                animation: blink 1s step-end infinite;
                margin-left: 3px;
                position: relative;
                top: 2px;
            }
        `}</style>
    </div>
  );
};

export default VirtualAssistant;