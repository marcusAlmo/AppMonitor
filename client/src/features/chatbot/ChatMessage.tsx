import React from 'react';
import type { ChatMessageItem } from './types';
import { AuroraCage, Badge } from '../../components/ui';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { Bot, User as UserIcon, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export interface ChatMessageProps {
  message: ChatMessageItem;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  if (isSystem) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full my-3 p-2 bg-stone-200/60 dark:bg-stone-900 border-y border-stone-300 dark:border-stone-800 text-[10px] font-mono text-stone-600 dark:text-stone-400 flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-stone-500" />
          {message.content}
        </span>
        <span>{message.timestamp}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={clsx('flex gap-3 my-4 max-w-4xl font-mono text-xs', isUser ? 'ml-auto flex-row-reverse' : 'mr-auto')}
    >
      {/* Avatar */}
      <div
        className={clsx(
          'w-7 h-7 border flex items-center justify-center shrink-0 rounded-none font-bold text-[10px]',
          isUser
            ? 'border-stone-900 bg-stone-900 text-stone-50 dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
            : 'border-teal-600 bg-teal-950 text-teal-400 dark:border-teal-400'
        )}
      >
        {isUser ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Bubble Body */}
      <div className="flex flex-col max-w-xl">
        <div className="flex items-center gap-2 mb-1 text-[10px] text-stone-500 font-mono">
          <span className="font-bold text-stone-900 dark:text-stone-100">{isUser ? 'YOU' : 'APPMONITOR AI'}</span>
          <span>{message.timestamp}</span>
          {message.phase && <Badge variant="ai-active">{message.phase}</Badge>}
        </div>

        {message.isThinking ? (
          <AuroraCage palette="ai-active" className="p-4 border border-teal-500/50">
            <div className="flex items-center gap-3 text-teal-700 dark:text-teal-300 font-mono">
              <span className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-ping" />
              <span>{message.content}</span>
            </div>
          </AuroraCage>
        ) : (
          <div
            className={clsx(
              'p-4 border rounded-none leading-relaxed',
              isUser
                ? 'bg-stone-900 text-stone-50 border-stone-900 dark:bg-stone-100 dark:text-stone-900 dark:border-stone-100'
                : 'bg-stone-50 text-stone-900 border-stone-900 dark:bg-stone-900 dark:text-stone-100 dark:border-stone-400'
            )}
          >
            <div className="prose prose-sm dark:prose-invert max-w-none font-sans text-xs">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            {/* Images attached */}
            {message.images && message.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-stone-300 dark:border-stone-700">
                {message.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Attached screenshot ${i}`}
                    className="max-h-48 border border-stone-900 dark:border-stone-400 object-cover"
                  />
                ))}
              </div>
            )}

            {/* Ticket Link if generated */}
            {message.ticketId && (
              <div className="mt-3 pt-3 border-t border-dashed border-stone-400 dark:border-stone-600 flex items-center justify-between font-mono text-[10px]">
                <span>AUTOMATED TICKET DISPATCH:</span>
                <Link
                  to={`/tickets/${message.ticketId}`}
                  className="px-2.5 py-1 bg-teal-600 text-white font-bold border border-teal-800 hover:bg-teal-700 uppercase"
                >
                  VIEW TICKET {message.ticketId} &rarr;
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
