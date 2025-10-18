import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { faqs, searchFAQ, type FAQEntry } from '../data/faq';

type Msg = {
  id: string;
  author: 'user' | 'bot';
  text: string;
  faqId?: string;
};

const starterSuggestions = [
  'What is Alterd?',
  'Are your pieces customisable?',
  'Do you ship pan-India?',
  'How long will my order take?'
];

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36).slice(4);
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([{
    id: uuid(),
    author: 'bot',
    text: 'Hi! I can answer questions about Alterd. Try asking about shipping, returns, or what we offer.'
  }]);

  const listRef = useRef<HTMLDivElement | null>(null);

  const topFAQs = useMemo<FAQEntry[]>(() => {
    // Simple curated order: place 4 commonly useful items first
    const important = new Set([
      'what-is-alterd',
      'are-your-pieces-customisable',
      'do-you-ship-pan-india',
      'how-long-will-my-order-take'
    ]);
    const primary = faqs.filter(f => important.has(f.id));
    const rest = faqs.filter(f => !important.has(f.id));
    return [...primary, ...rest].slice(0, 6);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  const answerFromFAQ = (query: string) => {
    const results = searchFAQ(query, 3);
    if (!results.length) {
      const tips = starterSuggestions.map(q => `• ${q}`).join('\n');
      return {
        text: `I couldn't find an exact answer for that. You can try rephrasing or ask one of these:\n${tips}`,
        faqId: undefined
      };
    }

    const best = results[0].entry;
    // Optional: add a small footer hint
    const related = results
      .slice(1)
      .map(r => `• ${r.entry.question}`)
      .join('\n');

    const footer = related ? `\n\nRelated:\n${related}` : '';
    return {
      text: `${best.answer}${footer}`,
      faqId: best.id
    };
  };

  const handleSend = () => {
    const q = input.trim();
    if (!q) return;

    const userMsg: Msg = { id: uuid(), author: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate quick thinking delay
    setTimeout(() => {
      const reply = answerFromFAQ(q);
      const botMsg: Msg = { id: uuid(), author: 'bot', text: reply.text, faqId: reply.faqId };
      setMessages(prev => [...prev, botMsg]);
    }, 120);
  };

  const handleSuggestionClick = (q: string) => {
    setInput(q);
    setTimeout(() => handleSend(), 0);
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-dark-text text-dark-bg px-4 py-3 shadow-lg hover:bg-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-dark-text/40"
        aria-label="Open FAQ chat"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline text-sm font-medium">Ask Alterd</span>
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[60] w-[90vw] max-w-[380px] border border-dark-border bg-dark-bg-elevated shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-dark-bg-secondary border-b border-dark-border">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-full bg-dark-text text-dark-bg">
                <Bot size={16} />
              </div>
              <div>
                <div className="text-sm font-semibold text-dark-text">Alterd Assistant</div>
                <div className="text-xs text-dark-text-secondary">Ask me about products, shipping, or returns</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-dark-bg-hover text-dark-text"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={listRef} className="max-h-[50vh] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.author === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={
                    m.author === 'user'
                      ? 'max-w-[80%] rounded-2xl bg-dark-text text-dark-bg px-3 py-2 text-sm'
                      : 'max-w-[80%] rounded-2xl bg-dark-bg-secondary text-dark-text px-3 py-2 text-sm'
                  }
                >
                  {m.text.split('\n').map((line, i) => (
                    <p key={i} className="whitespace-pre-wrap">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {/* Quick suggestions when short thread */}
            {messages.length <= 2 && (
              <div className="pt-1">
                <div className="text-xs text-dark-text-secondary mb-2">Quick questions</div>
                <div className="flex flex-wrap gap-2">
                  {topFAQs.slice(0, 4).map(f => (
                    <button
                      key={f.id}
                      onClick={() => handleSuggestionClick(f.question)}
                      className="text-xs px-2.5 py-1.5 border border-dark-border-light hover:bg-dark-bg-hover text-dark-text"
                    >
                      {f.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-dark-border p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSend();
                }}
                placeholder="Ask a question…"
                className="flex-1 rounded-full border border-dark-border-light bg-dark-bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-dark-text/30 text-dark-text placeholder:text-dark-text-muted"
              />
              <button
                type="button"
                onClick={handleSend}
                className="p-2 rounded-full bg-dark-text text-dark-bg hover:bg-dark-text-secondary disabled:opacity-50"
                disabled={!input.trim()}
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
