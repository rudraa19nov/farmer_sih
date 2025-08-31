import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'en' 
        ? 'Hello! I\'m your AI farming assistant. Ask me anything about crops, weather, diseases, or farming techniques in Kerala.'
        : 'ഹലോ! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായിയാണ്. കേരളത്തിലെ വിളകൾ, കാലാവസ്ഥ, രോഗങ്ങൾ, അല്ലെങ്കിൽ കൃഷി സാങ്കേതികതകൾ എന്നിവയെക്കുറിച്ച് എന്തും ചോദിക്കുക.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (language === 'ml') {
      if (input.includes('നെല്ല്') || input.includes('rice')) {
        return 'നെല്ല് കൃഷിക്ക് കേരളത്തിലെ കാലാവസ്ഥ വളരെ അനുകൂലമാണ്. മൺസൂൺ സമയത്ത് നടീൽ നടത്തുകയും, ശരിയായ വളപ്രയോഗം നടത്തുകയും ചെയ്യുക. രോഗ നിയന്ത്രണത്തിന് ജൈവ കീടനാശിനികൾ ഉപയോഗിക്കുക.';
      }
      return 'നിങ്ങളുടെ ചോദ്യത്തിന് കൂടുതൽ വിവരങ്ങൾ ആവശ്യമാണ്. ദയവായി കൂടുതൽ വിശദമായി ചോദിക്കുക.';
    }

    if (input.includes('rice') || input.includes('paddy')) {
      return 'Rice cultivation in Kerala is best during the monsoon season. Ensure proper water management, use disease-resistant varieties, and apply organic fertilizers. Watch out for blast disease and brown plant hopper.';
    }
    
    if (input.includes('coconut')) {
      return 'Coconut palms thrive in Kerala\'s coastal climate. Regular watering, proper fertilization with organic matter, and pest control are essential. Watch for red palm weevil and apply neem-based treatments.';
    }
    
    if (input.includes('pepper') || input.includes('spice')) {
      return 'Black pepper grows well in Kerala\'s hill regions. Ensure good drainage, provide support structures, and maintain proper spacing. Apply organic compost and watch for quick wilt disease.';
    }
    
    if (input.includes('weather') || input.includes('rain')) {
      return 'Kerala receives heavy monsoon rains from June to September. Plan your planting accordingly, ensure proper drainage, and protect crops during heavy rainfall periods.';
    }

    return 'I can help you with information about crops, weather, diseases, fertilizers, and farming techniques specific to Kerala. Please ask me a specific question about farming.';
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  const quickQuestions = [
    'Best time to plant rice in Kerala?',
    'How to prevent coconut diseases?',
    'Current weather suitable for planting?',
    'Organic fertilizer recommendations',
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('chatTitle')}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('chatSubtitle')}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.sender === 'user' ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                  <div className="p-2 rounded-full bg-blue-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(question)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={language === 'en' ? 'Ask your farming question...' : 'നിങ്ങളുടെ കൃഷി ചോദ്യം ചോദിക്കുക...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-lg transition-colors ${
                  isListening 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;