import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Send,
  ThumbsUp,
  ThumbsDown,
  Compass,
  MessageCircle,
  ArrowRight,
  Phone,
  Maximize2,
  Minimize2,
  Minus,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { getSmartAssistantResponse, HIMYATRA_PACKAGES } from '../lib/chatbotEngine';

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
    } catch {
      /* ignore malformed json */
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < remaining.length) {
    parts.push({ type: 'text', content: remaining.slice(lastIndex) });
  }
  return parts.length ? parts : [{ type: 'text', content: text }];
}

/* ─── Interactive Mini Package Card ─── */
function PackageCard({ data, onSelectPackage, onBookPackage }) {
  const pkgData = HIMYATRA_PACKAGES.find(p => p.id === data.pkgId) || data;
  const whatsappMsg = encodeURIComponent(
    `Hi HimYatra! I saw "${pkgData.title}" (${pkgData.price || data.price}/person) on your AI Assistant. Please share full itinerary and booking availability.`
  );

  const handleOpenDetails = () => {
    if (onSelectPackage) {
      onSelectPackage(pkgData);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set('pkg', pkgData.id || data.pkgId);
      window.history.pushState({}, '', `?${params}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const handleBook = () => {
    if (onBookPackage) {
      onBookPackage(pkgData);
    } else {
      const el = document.getElementById('packages');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-900/90 border border-teal-500/30 hover:border-teal-400/50 rounded-2xl p-3.5 my-2.5 space-y-2.5 shadow-lg shadow-teal-950/40 transition group">
      {/* Badge & Price Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-1">
            {pkgData.badge || data.badge || 'HimYatra Curated'}
          </span>
          <h4 className="font-bold text-sm text-white leading-snug group-hover:text-teal-300 transition-colors">
            {pkgData.title || data.title}
          </h4>
        </div>
      </div>

      {/* Meta Row */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
        <span className="flex items-center gap-1 text-slate-300 font-medium">
          <Calendar className="w-3.5 h-3.5 text-teal-400" />
          {pkgData.duration || data.duration}
        </span>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block -mb-0.5">Starting</span>
          <span className="font-black text-sm text-teal-300 font-['Outfit']">
            {pkgData.price || data.price}
            <span className="text-[10px] text-slate-400 font-normal"> / person</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={handleOpenDetails}
          className="text-xs font-bold py-2 px-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-teal-500/20 active:scale-95"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <a
          href={`https://wa.me/917619917057?text=${whatsappMsg}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold py-2 px-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-900/30 active:scale-95 text-center"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

/* ─── Typing Indicator ─── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 rounded-2xl border border-white/5 max-w-[140px] animate-pulse">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-teal-400"
            style={{
              animation: 'chatbotDotBounce 1.2s infinite',
              animationDelay: `${i * 0.18}s`
            }}
          />
        ))}
      </div>
      <span className="text-[11px] text-teal-300 font-medium">Planning...</span>
    </div>
  );
}

/* ─── Message Bubble ─── */
function MessageBubble({ msg, onFeedback, onSelectPackage, onBookPackage }) {
  const isUser = msg.role === 'user';
  const parts = isUser ? [{ type: 'text', content: msg.content }] : parsePackageCards(msg.content);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-chatFadeIn`}>
      <div className={`max-w-[88%] sm:max-w-[82%] space-y-1.5 ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && (
          <div className="flex items-center gap-2 ml-1">
            <div className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <Compass className="w-3 h-3 text-teal-400" />
            </div>
            <span className="text-[11px] font-bold text-teal-400">HimYatra AI</span>
            <span className="text-[10px] text-slate-500">• Travel Specialist</span>
          </div>
        )}

        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-sm shadow-md shadow-teal-900/30'
              : 'bg-slate-900/95 text-slate-200 border border-white/10 rounded-bl-sm shadow-xl'
          }`}
        >
          {parts.map((part, i) =>
            part.type === 'card' ? (
              <PackageCard
                key={i}
                data={part.data}
                onSelectPackage={onSelectPackage}
                onBookPackage={onBookPackage}
              />
            ) : (
              <div key={i} className="whitespace-pre-wrap font-sans text-[13px] sm:text-sm">
                {part.content}
              </div>
            )
          )}
        </div>

        {/* Helpful Feedback (assistant only) */}
        {!isUser && (
          <div className="flex items-center gap-2 mt-1 ml-1 text-slate-500 text-[11px]">
            <span>Helpful?</span>
            <button
              onClick={() => onFeedback?.(msg.id, 'up')}
              className={`p-1 rounded-lg transition cursor-pointer ${
                msg.feedback === 'up'
                  ? 'bg-teal-500/20 text-teal-400'
                  : 'text-slate-500 hover:text-teal-400 hover:bg-white/5'
              }`}
              title="Helpful reply"
            >
              <ThumbsUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => onFeedback?.(msg.id, 'down')}
              className={`p-1 rounded-lg transition cursor-pointer ${
                msg.feedback === 'down'
                  ? 'bg-rose-500/20 text-rose-400'
                  : 'text-slate-500 hover:text-rose-400 hover:bg-white/5'
              }`}
              title="Not helpful"
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
export default function AIChatbot({ onSelectPackage, onBookPackage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgIdCounter, setMsgIdCounter] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const WELCOME_MSG = `Namaste! 🙏 Main **HimYatra Assistant** hoon.
Himalayan trips, honeymoon packages, fixed-route cabs, ya Char Dham Yatra ke bare mein kuch bhi poochiye!

Aapke liye main best itineraries aur budget estimates instantly taiyar kar sakta hoon. Aap kahan ghoomna chahte hain?`;

  const QUICK_TOPICS = [
    { label: '💑 Honeymoon Packages', query: 'Show me best honeymoon packages for couple' },
    { label: '🛕 Char Dham Yatra 2026', query: 'Char Dham yatra dates, registration and helicopter booking' },
    { label: '🚖 Cab Rental Fares', query: 'What are your fixed cab rental fares from Delhi to Manali?' },
    { label: '🏔️ Spiti Valley 4x4', query: 'Tell me about Spiti Valley 4x4 circuit itinerary and best time' },
    { label: '👨‍👩‍👧 Family Tours', query: 'Suggest best peaceful family packages with comfortable stays' },
    { label: '🌤️ Best Time to Visit', query: 'What is the best time to visit Himachal and Uttarakhand?' }
  ];

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 0,
          role: 'assistant',
          content: WELCOME_MSG,
          feedback: null
        }
      ]);
      setMsgIdCounter(1);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const nextId = useCallback(() => {
    setMsgIdCounter((prev) => prev + 1);
    return msgIdCounter + 1;
  }, [msgIdCounter]);

  const handleFeedback = useCallback((msgId, type) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, feedback: m.feedback === type ? null : type } : m
      )
    );
  }, []);

  // Send message with Dual-Engine (Serverless Claude + Instant Standalone AI Engine)
  const sendMessage = useCallback(
    async (text) => {
      if (!text || !text.trim() || isTyping) return;

      const userText = text.trim();
      const userMsgId = nextId();
      const userMsg = { id: userMsgId, role: 'user', content: userText, feedback: null };
      const updatedMessages = [...messages, userMsg];

      setMessages(updatedMessages);
      setInput('');
      setIsTyping(true);

      // Natural typing delay
      await new Promise((r) => setTimeout(r, 400));

      let assistantReply = '';

      try {
        // Try serverless endpoint with 3.5s timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({ role: m.role, content: m.content }))
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.reply && !data.reply.includes('not configured')) {
            assistantReply = data.reply;
          }
        }
      } catch (e) {
        // Fallback to standalone intelligence engine
      }

      // If serverless is unavailable or returned default fallback, use smart engine
      if (!assistantReply) {
        assistantReply = getSmartAssistantResponse(userText);
      }

      const botMsgId = nextId();
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: 'assistant',
          content: assistantReply,
          feedback: null
        }
      ]);

      setIsTyping(false);
    },
    [messages, isTyping, nextId]
  );

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

  const handleTalkToHuman = () => {
    const summary = messages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .slice(-3)
      .join(' | ');
    const text = encodeURIComponent(
      `Hi HimYatra Desk! I am chatting on your website. My enquiry: ${summary || 'I need help planning a Himalayan trip'}. Please assist me!`
    );
    window.open(`https://wa.me/917619917057?text=${text}`, '_blank');
  };

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @keyframes chatbotDotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-7px); opacity: 1; }
        }
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-chatFadeIn {
          animation: chatFadeIn 0.25s ease-out both;
        }
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-chatSlideUp {
          animation: chatSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes pulseTealGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(13, 148, 136, 0.4), 0 8px 25px rgba(0,0,0,0.4); }
          50% { box-shadow: 0 0 28px rgba(20, 184, 166, 0.7), 0 8px 30px rgba(0,0,0,0.5); }
        }
        .teal-launcher-glow {
          animation: pulseTealGlow 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* ── Minimized Floating Dock Pill ── */}
      {isOpen && isMinimized && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[9999] animate-chatSlideUp">
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900/95 border border-teal-500/50 text-white shadow-2xl backdrop-blur-xl hover:bg-slate-800 transition cursor-pointer group"
          >
            <div className="w-6 h-6 rounded-full bg-teal-500 text-slate-950 flex items-center justify-center font-black">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs text-left">
              <div className="font-bold flex items-center gap-1.5">
                <span>HimYatra Assistant</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] text-teal-300">Chat minimized • Click to resume</div>
            </div>
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-300 transition-colors ml-1" />
          </button>
        </div>
      )}

      {/* ── Main Chat Window (Adjustable, Full-featured & Responsive) ── */}
      {isOpen && !isMinimized && (
        <div
          className={`fixed z-[9999] flex flex-col bg-slate-950 border border-teal-500/30 shadow-2xl shadow-black/80 overflow-hidden animate-chatSlideUp transition-all duration-300 ${
            isMaximized
              ? 'inset-3 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[680px] sm:h-[84vh] sm:max-h-[820px] rounded-3xl'
              : 'inset-x-2 bottom-2 top-14 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[410px] sm:h-[600px] rounded-2xl sm:rounded-3xl'
          }`}
        >
          {/* Glass Header */}
          <div className="relative flex items-center justify-between px-4 sm:px-5 py-3.5 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-inner">
                  <Compass className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-['Outfit'] font-black text-sm tracking-tight">
                  <span>HimYatra AI Assistant</span>
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-md font-mono">
                    24/7
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-teal-100 font-medium">
                  <span>Pahadi Travel Specialist</span>
                  <span>•</span>
                  <span className="text-emerald-300 font-semibold">Online</span>
                </div>
              </div>
            </div>

            {/* Adjustable Controls: Minimize, Maximize/Restore, Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                title="Minimize chat"
                aria-label="Minimize"
              >
                <Minus className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMaximized(!isMaximized)}
                className="hidden sm:flex w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white items-center justify-center transition cursor-pointer"
                title={isMaximized ? 'Restore standard size' : 'Expand window'}
                aria-label="Resize"
              >
                {isMaximized ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition cursor-pointer ml-1"
                title="Close chat"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Navigation Ribbon */}
          <div className="px-3 py-1.5 bg-slate-900 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-[11px]">
            <span className="text-slate-400 font-semibold shrink-0">Explore:</span>
            <button
              onClick={() => handleScrollToSection('packages')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 transition shrink-0 cursor-pointer"
            >
              📦 Packages
            </button>
            <button
              onClick={() => handleScrollToSection('cab-rental')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 transition shrink-0 cursor-pointer"
            >
              🚖 Cab Calculator
            </button>
            <button
              onClick={() => handleScrollToSection('chardham')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 transition shrink-0 cursor-pointer"
            >
              🛕 Char Dham
            </button>
            <button
              onClick={() => handleScrollToSection('custom-trip')}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-teal-500/20 text-slate-300 hover:text-teal-300 transition shrink-0 cursor-pointer"
            >
              🗺️ Custom Trip
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-teal-700 scrollbar-track-transparent">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                onFeedback={handleFeedback}
                onSelectPackage={onSelectPackage}
                onBookPackage={onBookPackage}
              />
            ))}

            {isTyping && <TypingIndicator />}

            {/* Quick Topic Prompts (Always helpful for one-tap answers) */}
            {messages.length <= 2 && !isTyping && (
              <div className="pt-2 animate-chatFadeIn space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>Frequently Asked Questions:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {QUICK_TOPICS.map((topic, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => sendMessage(topic.query)}
                      className="text-left p-2.5 rounded-xl bg-slate-900/90 hover:bg-teal-950/60 border border-white/10 hover:border-teal-400/40 text-xs text-slate-200 hover:text-teal-200 transition cursor-pointer flex items-center justify-between group"
                    >
                      <span>{topic.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-300 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Direct Human WhatsApp Desk */}
          <div className="px-3.5 py-2 border-t border-white/5 bg-slate-900/70 shrink-0 flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Need personalized dates or customized quote?
            </span>
            <button
              type="button"
              onClick={handleTalkToHuman}
              className="w-full sm:w-auto px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk to Human on WhatsApp</span>
            </button>
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSubmit}
            className="p-3 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl shrink-0"
          >
            <div className="flex items-center gap-2 bg-slate-900 rounded-2xl px-3 py-2 border border-white/15 focus-within:border-teal-400 transition shadow-inner">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything (e.g. Honeymoon package, Cab fares, Char Dham)..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
                maxLength={500}
                disabled={isTyping}
                aria-label="Ask HimYatra AI"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold flex items-center justify-center transition cursor-pointer shrink-0 shadow-md shadow-teal-500/20 active:scale-95"
                aria-label="Send query"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-1 mt-1.5">
              <span>Verified Local Himalayan Guidance</span>
              <span>Direct Founder Support: +91 76199 17057</span>
            </div>
          </form>
        </div>
      )}

      {/* ── Single Floating Launch Button (Clean & Never Overlapping) ── */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[9998] flex items-center gap-3">
          {/* Subtle Desktop Invitation Chip */}
          <div
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-teal-500/40 text-white shadow-xl backdrop-blur-md cursor-pointer hover:border-teal-400 transition animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <div className="text-xs">
              <span className="font-bold text-teal-300">Plan Trip with AI</span>
              <span className="text-slate-400 ml-1.5 text-[11px]">Honeymoon, Cabs & Yatra</span>
            </div>
          </div>

          {/* Main Round Floating Button */}
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-tr from-teal-600 to-teal-400 text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-108 active:scale-95 cursor-pointer teal-launcher-glow group"
            aria-label="Open AI Mountain Guide"
            title="Chat with HimYatra AI Assistant"
          >
            <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-500 drop-shadow" />

            {/* Glowing Online Notification Dot */}
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-emerald-200 animate-ping" />
            </span>
          </button>
        </div>
      )}
    </>
  );
}
