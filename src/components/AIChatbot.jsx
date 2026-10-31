import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  Calendar,
  ChevronRight,
  ArrowLeft,
  Mail,
  MapPin,
  Languages
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { getSmartAssistantResponse, HIMYATRA_PACKAGES, detectLanguage } from '../lib/chatbotEngine';

/* ─── Package card parser ─── */
function parsePackageCards(text) {
  const parts = [];
  let remaining = text || '';
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

/* ─── Rich Text & Markdown Parser (Prevents raw markdown & URL display) ─── */
function FormattedMessage({ content }) {
  if (!content) return null;

  // Split lines to format lists and blocks cleanly
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 text-[13px] sm:text-sm font-sans leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-1" />;

        // Bullet points
        const isBullet = trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-');
        const textContent = isBullet ? trimmed.replace(/^[•*-]\s*/, '') : trimmed;

        // Parse bold: **bold** and links [label](url)
        const parsedNodes = renderInlineMarkdown(textContent);

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
              <div className="flex-1">{parsedNodes}</div>
            </div>
          );
        }

        return <div key={idx}>{parsedNodes}</div>;
      })}
    </div>
  );
}

// Inline Markdown Parser: parses **bold**, [text](url), and emails/phones
function renderInlineMarkdown(text) {
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|\+91\s*\d{5}\s*\d{5}|amitpatel42203@gmail\.com)/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold text: **something**
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white tracking-wide">
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Markdown link: [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={i}
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-teal-300 hover:text-teal-200 underline font-semibold transition inline-flex items-center gap-0.5"
        >
          {label}
        </a>
      );
    }

    // Phone clickable
    if (part.includes('+91 76199 17057') || part.includes('7619917057')) {
      return (
        <a
          key={i}
          href="tel:+917619917057"
          className="text-teal-300 font-bold hover:underline"
        >
          {part}
        </a>
      );
    }

    // Email clickable
    if (part.includes('amitpatel42203@gmail.com')) {
      return (
        <a
          key={i}
          href="mailto:amitpatel42203@gmail.com"
          className="text-teal-300 font-semibold hover:underline"
        >
          amitpatel42203@gmail.com
        </a>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

/* ─── Interactive Mini Package Card (Instant Open without Page Reload) ─── */
function PackageCard({ data, onSelectPackage, onBookPackage, onMinimizeChat }) {
  // Find full tour package with complete itinerary, hotelStay, meals, etc.
  const fullPkg = useMemo(() => {
    const pkgId = data.pkgId || data.id;
    return (
      TOUR_PACKAGES.find((p) => p.id === pkgId) ||
      HIMYATRA_PACKAGES.find((p) => p.id === pkgId) ||
      data
    );
  }, [data]);

  const whatsappMsg = encodeURIComponent(
    `Hi HimYatra! I saw "${fullPkg.title || data.title}" (${fullPkg.discountedPrice || fullPkg.price || data.price}/person) on your AI Assistant. Please share details and availability!`
  );

  // Instantly open details modal & minimize chat so user immediately sees the package modal!
  const handleOpenDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onSelectPackage) {
      onSelectPackage(fullPkg);
    } else {
      const params = new URLSearchParams(window.location.search);
      params.set('pkg', fullPkg.id || data.pkgId);
      window.history.pushState({}, '', `?${params}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }

    // Automatically minimize chat so the full modal is front and center!
    if (onMinimizeChat) {
      onMinimizeChat();
    }
  };

  const handleBook = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onBookPackage) {
      onBookPackage(fullPkg);
    }
    if (onMinimizeChat) {
      onMinimizeChat();
    }
  };

  return (
    <div className="bg-slate-900/95 border border-teal-500/30 hover:border-teal-400/60 rounded-2xl p-3.5 my-2.5 space-y-2.5 shadow-lg shadow-teal-950/40 transition group">
      {/* Badge & Title */}
      <div>
        <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 mb-1">
          {fullPkg.badge || data.badge || 'HimYatra Special'}
        </span>
        <h4 className="font-bold text-sm text-white leading-snug group-hover:text-teal-300 transition-colors">
          {fullPkg.title || data.title}
        </h4>
      </div>

      {/* Meta Row */}
      <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
        <span className="flex items-center gap-1 text-slate-300 font-medium">
          <Calendar className="w-3.5 h-3.5 text-teal-400" />
          {fullPkg.duration || data.duration}
        </span>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 block -mb-0.5">Starting</span>
          <span className="font-black text-sm text-teal-300 font-['Outfit']">
            {fullPkg.discountedPrice
              ? `₹${fullPkg.discountedPrice.toLocaleString('en-IN')}`
              : fullPkg.price || data.price}
            <span className="text-[10px] text-slate-400 font-normal"> / person</span>
          </span>
        </div>
      </div>

      {/* Action Buttons: Instant View Details & Direct WhatsApp */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={handleOpenDetails}
          className="text-xs font-bold py-2 px-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md shadow-teal-500/20 active:scale-95"
          title="Instant open full package itinerary modal"
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
      <span className="text-[11px] text-teal-300 font-medium">HimYatra AI...</span>
    </div>
  );
}

/* ─── Message Bubble ─── */
function MessageBubble({ msg, onFeedback, onSelectPackage, onBookPackage, onMinimizeChat }) {
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
            <span className="text-[11px] font-bold text-teal-400">HimYatra Assistant</span>
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
                onMinimizeChat={onMinimizeChat}
              />
            ) : (
              <FormattedMessage key={i} content={part.content} />
            )
          )}
        </div>

        {/* Feedback (assistant only) */}
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

  // Language mode: 'auto' | 'en' | 'hi'
  const [preferredLang, setPreferredLang] = useState('auto');

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgIdCounter, setMsgIdCounter] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const WELCOME_EN = `Hello! 🙏 I am your **HimYatra AI Travel Assistant**.
Ask me anything about Himalayan honeymoon specials, Char Dham 2026, fixed cab rentals, or custom tours!

I can generate tailor-made itineraries and pricing instantly. Where would you like to travel?`;

  const WELCOME_HI = `Namaste! 🙏 Main **HimYatra Assistant** hoon.
Himalayan trips, honeymoon packages, fixed-route cabs, ya Char Dham Yatra ke bare mein kuch bhi poochiye!

Aapke liye main best itineraries aur budget estimates instantly taiyar kar sakta hoon. Aap kahan ghoomna chahte hain?`;

  const QUICK_TOPICS_EN = [
    { label: '💑 Honeymoon Packages', query: 'Show me best honeymoon packages for couple in English' },
    { label: '🛕 Char Dham Yatra 2026', query: 'Char Dham yatra 2026 dates, registration and helicopter booking' },
    { label: '🚖 Cab Rental Fares', query: 'What are your fixed cab rental fares from Delhi to Manali?' },
    { label: '🏔️ Spiti Valley 4x4', query: 'Tell me about Spiti Valley 4x4 circuit itinerary and best time' },
    { label: '👨‍👩‍👧 Family Tours', query: 'Suggest best peaceful family packages with comfortable stays' },
    { label: '🌤️ Best Time to Visit', query: 'What is the best time to visit Himachal and Uttarakhand?' }
  ];

  const QUICK_TOPICS_HI = [
    { label: '💑 Honeymoon Packages', query: 'Honeymoon packages dikhao for couple' },
    { label: '🛕 Char Dham Yatra 2026', query: 'Char Dham yatra 2026 dates aur helicopter booking' },
    { label: '🚖 Cab Rental Fares', query: 'Delhi se Manali cab ka kitna kiraya hai?' },
    { label: '🏔️ Spiti Valley 4x4', query: 'Spiti Valley 4x4 package aur best time batao' },
    { label: '👨‍👩‍👧 Family Tours', query: 'Family ke liye best packages batao' },
    { label: '🌤️ Best Time to Visit', query: 'Himachal aur Uttarakhand ghoomne ka best time kab hai?' }
  ];

  const chatWindowRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Click outside to minimize on desktop
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !isMinimized && chatWindowRef.current && !chatWindowRef.current.contains(e.target)) {
        // Do not minimize if clicking the floating toggle button
        const isLaunchBtn = e.target.closest('[aria-label="Open AI Mountain Guide"]');
        if (!isLaunchBtn) {
          setIsMinimized(true);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMinimized]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeText = preferredLang === 'en' ? WELCOME_EN : WELCOME_HI;
      setMessages([
        {
          id: 0,
          role: 'assistant',
          content: welcomeText,
          feedback: null
        }
      ]);
      setMsgIdCounter(1);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, preferredLang]);

  // Keyboard shortcut: Esc to minimize/close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsMinimized(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  // Send message with Dual-Engine (Serverless + Instant Standalone Engine)
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

      // Natural quick typing delay
      await new Promise((r) => setTimeout(r, 350));

      let assistantReply = '';
      const chosenLang = preferredLang === 'auto' ? detectLanguage(userText) : preferredLang;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

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

      // If serverless is unavailable or returned fallback, use comprehensive local engine
      if (!assistantReply) {
        assistantReply = getSmartAssistantResponse(userText, chosenLang);
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
    [messages, isTyping, nextId, preferredLang]
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

  // Back to packages action requested by user
  const handleBackToPackages = () => {
    setIsMinimized(true);
    const el = document.getElementById('packages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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

  const toggleLanguage = () => {
    setPreferredLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const currentTopics = preferredLang === 'en' ? QUICK_TOPICS_EN : QUICK_TOPICS_HI;

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
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[9999] flex items-center gap-2 animate-chatSlideUp">
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
              <div className="text-[10px] text-teal-300">Click to resume conversation</div>
            </div>
            <Maximize2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-300 transition-colors ml-1" />
          </button>

          {/* Dismiss Pill Button */}
          <button
            type="button"
            onClick={() => {
              setIsMinimized(false);
              setIsOpen(false);
            }}
            className="w-9 h-9 rounded-full bg-slate-900/95 border border-white/20 hover:bg-rose-500 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer shadow-lg"
            title="Close assistant"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Main Chat Window (Adjusted for Laptop & Mobile) ── */}
      {isOpen && !isMinimized && (
        <div
          ref={chatWindowRef}
          className={`fixed z-[9999] flex flex-col bg-slate-950 border border-teal-500/40 shadow-2xl shadow-black/90 overflow-hidden animate-chatSlideUp transition-all duration-300 ${
            isMaximized
              ? 'inset-3 sm:inset-auto sm:bottom-4 sm:right-4 md:right-6 sm:w-[640px] sm:h-[min(640px,calc(100vh-80px))] sm:max-h-[calc(100vh-80px)] rounded-3xl'
              : 'inset-x-2 bottom-2 top-12 sm:inset-auto sm:bottom-4 sm:right-4 md:right-6 sm:w-[385px] md:w-[400px] sm:h-[min(510px,calc(100vh-80px))] sm:max-h-[calc(100vh-80px)] rounded-2xl sm:rounded-3xl'
          }`}
        >
          {/* Header with "← Back to Packages" button and Language Switcher */}
          <div className="relative px-3.5 sm:px-4 py-3 bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 text-white shadow-md border-b border-white/10 shrink-0">
            <div className="flex items-center justify-between gap-2">
              {/* Back to Packages Button (Direct answer to question 3!) */}
              <button
                type="button"
                onClick={handleBackToPackages}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-950/30 hover:bg-slate-950/50 text-white text-xs font-bold border border-white/20 transition cursor-pointer active:scale-95 shrink-0"
                title="Back to Packages on Website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Packages</span>
              </button>

              {/* Language Switcher Pill (Direct answer to question 4!) */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition cursor-pointer border border-white/20"
                title="Toggle English / Hindi"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{preferredLang === 'en' ? 'EN' : 'हिंदी'}</span>
              </button>

              {/* Controls: Minimize & Close */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  title="Minimize chat"
                  aria-label="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="hidden sm:flex w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white items-center justify-center transition cursor-pointer"
                  title={isMaximized ? 'Restore standard size' : 'Expand window'}
                  aria-label="Resize"
                >
                  {isMaximized ? (
                    <Minimize2 className="w-3.5 h-3.5" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition cursor-pointer"
                  title="Close chat"
                  aria-label="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Assistant Sub-Header */}
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-300 ring-1 ring-slate-950 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-bold leading-tight">HimYatra AI Assistant</div>
                <div className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span>Himalayan Specialist</span>
                  <span>•</span>
                  <span className="text-emerald-200">Online</span>
                </div>
              </div>
            </div>
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
                onMinimizeChat={() => setIsMinimized(true)}
              />
            ))}

            {isTyping && <TypingIndicator />}

            {/* Frequently Asked Questions Chips */}
            {messages.length <= 2 && !isTyping && (
              <div className="pt-1.5 animate-chatFadeIn space-y-2">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  <span>{preferredLang === 'en' ? 'Quick Questions:' : 'अक्सर पूछे जाने वाले सवाल:'}</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {currentTopics.map((topic, idx) => (
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

          {/* Direct WhatsApp & Back Navigation Bar */}
          <div className="px-3.5 py-2 border-t border-white/5 bg-slate-900/80 shrink-0 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleBackToPackages}
              className="text-[11px] font-bold text-slate-300 hover:text-teal-300 flex items-center gap-1.5 transition cursor-pointer py-1 px-2 rounded-lg hover:bg-white/5"
              title="Close chat and view packages on website"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-teal-400" />
              <span>{preferredLang === 'en' ? 'Back to Packages' : 'पैकेज पर जाएं'}</span>
            </button>

            <button
              type="button"
              onClick={handleTalkToHuman}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Talk to Human</span>
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
                placeholder={
                  preferredLang === 'en'
                    ? 'Ask about packages, cab fares, best time...'
                    : 'Honeymoon package, Cab fares, Char Dham poochiye...'
                }
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
              <span>Himalayan Tour Specialist</span>
              <span>amitpatel42203@gmail.com</span>
            </div>
          </form>
        </div>
      )}

      {/* ── Single Floating Launch Button ── */}
      {!isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-[9998] flex items-center gap-3">
          {/* Desktop Invitation Chip */}
          <div
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 border border-teal-500/40 text-white shadow-xl backdrop-blur-md cursor-pointer hover:border-teal-400 transition animate-in fade-in slide-in-from-right-4 duration-300"
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <div className="text-xs">
              <span className="font-bold text-teal-300">Plan Trip with AI</span>
              <span className="text-slate-400 ml-1.5 text-[11px]">Honeymoon & Cabs</span>
            </div>
          </div>

          {/* Main Floating Button */}
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
