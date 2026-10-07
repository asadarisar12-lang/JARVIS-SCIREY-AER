import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles, RefreshCw, Copy, Check, Activity } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'assistant',
    text: 'Hello! I am Asad Ali\'s interactive AI Assistant. Ask me anything about Asad\'s projects, AI Agent engineering, filmmaking techniques, speed ramping, or his current cybersecurity journey!',
    timestamp: 'Just now',
  },
];

const PRESET_PROMPTS = [
  'What AI skills does Asad specialize in?',
  'How does Asad implement speed ramping in videos?',
  'Tell me about Asad\'s AI projects and agentic workflows.',
  'What did Asad achieve at the ICA NJIO Olympiad?',
];

export const AIChatbotPreview: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateAnswer = (userQuestion: string): string => {
    const q = userQuestion.toLowerCase();
    
    if (q.includes('skill') || q.includes('specialize') || q.includes('tech stack')) {
      return 'Asad Ali specializes in AI & Machine Learning, Agentic Workflows, AI Chatbots, Prompt Engineering, Fullstack Vibe Coding, 4K Filmmaking, Speed Ramping, DaVinci/Premiere Post-Production, and Direct-Response UGC Ads. He is also actively mastering Ethical Hacking and Penetration Testing!';
    }
    if (q.includes('speed ramp') || q.includes('video') || q.includes('film') || q.includes('cinemat')) {
      return 'In filmmaking, Asad uses custom velocity curves, beat-sync audio design, and dynamic focal speed ramping. He blends 4K color grading with visual hooks to achieve ultra-high retention for short-form reels, TikToks, and cinematic commercials.';
    }
    if (q.includes('agent') || q.includes('system') || q.includes('workflow') || q.includes('project')) {
      return 'Asad designs multi-agent architectures, autonomous tool-calling pipelines, conversational streaming systems, and full-stack web prototypes with reactive user interfaces and optimized prompt chains.';
    }
    if (q.includes('olympiad') || q.includes('ica') || q.includes('njio') || q.includes('medal') || q.includes('award') || q.includes('achieve')) {
      return 'Asad won the prestigious Silver Medal at the National Junior Informatics & Innovation Olympiad (ICA NJIO) along with the official Certificate of Participation for distinction in algorithmic reasoning and computational logic!';
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('collaborate')) {
      return 'You can reach Asad directly at asadarisar69@gmail.com or by using the contact form at the bottom of this portfolio!';
    }

    return `Thanks for your inquiry regarding "${userQuestion}"! Asad combines deep artificial intelligence expertise with cinematic visual production and modern code architectures to deliver exceptional digital outcomes. Feel free to contact him at asadarisar69@gmail.com!`;
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyText = generateAnswer(messageText);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="bg-[#121214] text-white rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[520px]">
      
      {/* Chat Header with Audio Visualizer Simulation */}
      <div className="px-4 py-3 bg-[#18181B] border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Bot className="w-4 h-4 text-slate-950" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#18181B] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white font-display">Asad AI Assistant</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                Live Engine
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>Realtime Interactive Pipeline</span>
            </div>
          </div>
        </div>

        {/* Audio Visualizer Waves Indicator & Reset */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded bg-black/40 border border-slate-800">
            <span className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="w-1 h-4 bg-cyan-400 rounded-full animate-pulse delay-75" />
            <span className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse delay-150" />
            <span className="w-1 h-5 bg-cyan-400 rounded-full animate-pulse delay-100" />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs flex items-center gap-1 font-mono cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[10px]">Reset</span>
          </motion.button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#0F0F11]">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`flex gap-2.5 group ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed relative ${
                  msg.sender === 'user'
                    ? 'bg-white text-slate-950 font-medium rounded-tr-none shadow-md'
                    : 'bg-[#1C1C20] text-slate-200 border border-slate-800 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-between gap-3 mt-1.5">
                  <div
                    className={`text-[9px] font-mono ${
                      msg.sender === 'user' ? 'text-slate-600' : 'text-slate-500'
                    }`}
                  >
                    {msg.timestamp}
                  </div>

                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-cyan-300 text-[10px] flex items-center gap-1 cursor-pointer font-mono"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-2.5 justify-start items-center"
          >
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
              <Bot className="w-3.5 h-3.5 animate-spin" />
            </div>
            <div className="bg-[#1C1C20] rounded-2xl rounded-tl-none px-4 py-2.5 border border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce delay-200" />
              <span className="text-[10px] font-mono ml-1 text-cyan-300">Asad AI synthesizing response...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-3 py-2 bg-[#18181B] border-t border-slate-800/80 overflow-x-auto flex items-center gap-1.5">
        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1 flex-shrink-0">
          <Sparkles className="w-3 h-3 text-cyan-400" /> Prompt:
        </span>
        {PRESET_PROMPTS.map((prompt, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSend(prompt)}
            className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-slate-800 text-slate-300 hover:text-white hover:bg-white/10 hover:border-cyan-500/40 whitespace-nowrap transition-all flex-shrink-0 font-mono cursor-pointer"
          >
            {prompt}
          </motion.button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#18181B] border-t border-slate-800 flex items-center gap-2"
      >
        <input
          type="text"
          id="chatbot-interactive-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Asad's AI Assistant about skills, speed ramping, AI agents..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          id="chatbot-send-btn"
          disabled={!input.trim() || isTyping}
          className="p-2.5 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </motion.button>
      </form>

    </div>
  );
};
