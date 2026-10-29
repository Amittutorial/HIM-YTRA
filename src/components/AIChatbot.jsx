import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Send, ThumbsUp, ThumbsDown, Compass, MessageCircle, ArrowRight, Phone } from 'lucide-react';

/* ─── Package card parser ─── */
function parsePackageCards(text) {
  const parts = [];
  let remaining = text;
  const regex = /:::PACKAGE_CARD:::(.*?):::END:::/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(remaining)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: remaining.slice(lastIndex, match.index) });
    }
    try {
      parts.push({ type: 'card', data: JSON.parse(match[1]) });
    } catch { /* skip bad JSON */ }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < remaining.length) {
    parts.push({ type: 'text', content: remaining.slice(lastIndex) });
  }
  return parts.length ? parts : [{ type: 'text', content: text }];
}

/* ─── Mini Package Card ─── */
function PackageCard({ data }) {
  const whatsappMsg = encodeURIComponent(`Hi HimYatra! I am interested in "${data.title}" (${data.price}/person). Please share details!`);
  return (
    <div className="bg-slate-800/80 border border-teal-500/20 rounded-2xl p-3.5 my-2 space-y-2">
      <div className="font-bold text-sm text-white leading-snug">{data.title}</div>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20 font-semibold">{data.duration}</span>
        <span className="font-bold text-teal-400">{data.price}/person</span>
      </div>
      <div className="flex gap-2 pt-1">
        <button
          onClick={() => {
            const params = new URLSearchParams(window.location.search);
            params.set('pkg', data.pkgId);
            window.history.pushState({}, '', `?${params}`);
            window.dispatchEvent(new PopStateEvent('popstate'));
          }}
          className="flex-1 text-xs font-semibold py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 flex items-center justify-center gap-1 transition cursor-pointer"
        >
          View Details <ArrowRight className="w-3 h-3" />
        </button>
        <a
          href={`https://wa.me/917619917057?text=${whatsappMsg}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 text-xs font-semibold py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1 transition"
        >
          WhatsApp <Phone className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex gap-1">
        {[0, 1, 2].map(i => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-teal-400"
            style={{
              animation: 'chatbotDotBounce 1.2s infinite',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400 ml-2">typing...</span>
    </div>
  );
}

/* ─── Message Bubble ─── */
function MessageBubble({ msg, onFeedback }) {
  const isUser = msg.role === 'user';
  const parts = isUser ? [{ type: 'text', content: msg.content }] : parsePackageCards(msg.content);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-chatFadeIn`}>
      <div className={`max-w-[85%] space-y-1 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* Avatar row */}
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <Compass className="w-3.5 h-3.5 text-teal-400" />
            </div>
            <span className="text-[10px] text-slate-500 font-medium">HimYatra</span>
          </div>
        )}

        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? 'bg-teal-500 text-white rounded-br-md'
            : 'bg-slate-800/90 text-slate-200 border border-white/5 rounded-bl-md'
        }`}>
          {parts.map((part, i) =>
            part.type === 'card'
              ? <PackageCard key={i} data={part.data} />
              : <span key={i} className="whitespace-pre-wrap">{part.content}</span>
          )}
        </div>

        {/* Feedback thumbs (assistant only) */}
        {!isUser && (
          <div className="flex items-center gap-1.5 mt-1 ml-1">
            <button
              onClick={() => onFeedback?.(msg.id, 'up')}
              className={`p-1 rounded-lg transition cursor-pointer ${
                msg.feedback === 'up' ? 'bg-teal-500/20 text-teal-400' : 'text-slate-600 hover:text-teal-400 hover:bg-white/5'
              }`}
              aria-label="Helpful"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => onFeedback?.(msg.id, 'down')}
              className={`p-1 rounded-lg transition cursor-pointer ${
                msg.feedback === 'down' ? 'bg-rose-500/20 text-rose-400' : 'text-slate-600 hover:text-rose-400 hover:bg-white/5'
              }`}
              aria-label="Not helpful"
            >
              <ThumbsDown className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   Main AIChatbot Component
   ══════════════════════════════════════════════════════════════════ */
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgIdCounter, setMsgIdCounter] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const WELCOME_MSG = "Namaste! 🙏 Main HimYatra Assistant hoon. Aap kahan ghoomna chahte hain — mountains, spiritual yatra, ya honeymoon trip? Batayein, main aapke liye best packages suggest karunga!";

  const QUICK_CHIPS = [
    { label: '📦 Packages', msg: 'Show me your best tour packages' },
    { label: '🚖 Cab Rentals', msg: 'What are your cab rental rates for Delhi to Manali?' },
    { label: '🛕 Char Dham', msg: 'Tell me about Char Dham Yatra packages and dates' },
    { label: '🗺️ Plan My Trip', msg: 'I want to plan a custom trip, help me choose' },
    { label: '🌤️ Best Time', msg: 'What is the best time to visit Himachal Pradesh?' },
    { label: '👤 Talk to Human', msg: 'I want to talk to a real person' },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      if (messages.length === 0) {
        const id = 0;
        setMessages([{ id, role: 'assistant', content: WELCOME_MSG, feedback: null }]);
        setMsgIdCounter(1);
      }
    }
  }, [isOpen]);

  const nextId = useCallback(() => {
    setMsgIdCounter(prev => prev + 1);
    return msgIdCounter;
  }, [msgIdCounter]);

  const handleFeedback = useCallback((msgId, type) => {
    setMessages(prev => prev.map(m =>
      m.id === msgId ? { ...m, feedback: m.feedback === type ? null : type } : m
    ));
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isTyping) return;

    const userMsg = { id: nextId(), role: 'user', content: text.trim(), feedback: null };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      // Build conversation for API (exclude feedback/id)
      const apiMessages = newMessages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      const reply = data.reply || 'Sorry, something went wrong. Please WhatsApp us for help! 🙏';

      setMessages(prev => [...prev, {
        id: nextId(),
        role: 'assistant',
        content: reply,
        feedback: null
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: nextId(),
        role: 'assistant',
        content: 'Sorry, network error. Please try again or WhatsApp us at YOUR_PHONE_NUMBER for immediate help! 🙏',
        feedback: null
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, nextId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleChip = (msg) => sendMessage(msg);

  const handleTalkToHuman = () => {
    const summary = messages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .join(' | ');
    const text = encodeURIComponent(`Hi HimYatra! I was chatting with your AI assistant. Here's what I need: ${summary}`);
    window.open(`https://wa.me/917619917057?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Keyframe animations */}
      <style>{`
        @keyframes chatbotDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-chatFadeIn {
          animation: chatFadeIn 0.3s ease-out both;
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chatSlideUp {
          animation: chatSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes chatGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(13,148,136,0.3); }
          50% { box-shadow: 0 0 30px rgba(13,148,136,0.5); }
        }
        .chatbot-glow {
          animation: chatGlow 3s ease-in-out infinite;
        }
      `}</style>

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[9999] sm:w-[380px] sm:h-[560px] flex flex-col bg-slate-950 sm:rounded-3xl sm:border sm:border-white/10 sm:shadow-2xl sm:shadow-teal-900/20 overflow-hidden animate-chatSlideUp">

          {/* Header — Glass-style */}
          <div className="relative flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-600/90 to-teal-500/90 backdrop-blur-xl border-b border-teal-400/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-tight">HimYatra Assistant</div>
                <div className="flex items-center gap-1.5 text-[11px] text-teal-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  Online • AI Travel Guide
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} onFeedback={handleFeedback} />
            ))}

            {isTyping && <TypingIndicator />}

            {/* Quick chips — show only after welcome message with no user messages */}
            {messages.length === 1 && messages[0].role === 'assistant' && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-2 animate-chatFadeIn">
                {QUICK_CHIPS.map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => handleChip(chip.msg)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-800/80 border border-teal-500/20 text-teal-300 hover:bg-teal-500/20 hover:border-teal-400/40 transition cursor-pointer whitespace-nowrap"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Talk to Human bar */}
          <div className="px-4 py-2 border-t border-white/5">
            <button
              onClick={handleTalkToHuman}
              className="w-full py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Talk to a Human on WhatsApp
            </button>
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-slate-950/80 backdrop-blur-md">
            <div className="flex items-center gap-2 bg-slate-900 rounded-2xl px-3 py-2 border border-white/10 focus-within:border-teal-500/40 transition">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                maxLength={500}
                disabled={isTyping}
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 disabled:text-slate-500 text-white flex items-center justify-center transition cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-1.5">
              <span className="text-[10px] text-slate-600">Powered by AI • Your data stays private</span>
            </div>
          </form>
        </div>
      )}

      {/* ── Floating Launch Button ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 z-[9998] w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer chatbot-glow group"
          aria-label="Open AI Travel Assistant"
        >
          <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500" />
          {/* Notification dot */}
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
        </button>
      )}
    </>
  );
}
