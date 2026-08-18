import React, { useState } from 'react';
import { useChatStore } from './useChatStore';
import { ChatPhaseIndicator } from './ChatPhaseIndicator';
import { ChatMessage } from './ChatMessage';
import { ImageUploadZone } from './ImageUploadZone';
import { Button } from '../../components/ui';
import { Send, RotateCcw, Bot } from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { messages, currentPhase, isProcessing, sendMessage, resetChat } = useChatStore();
  const [inputText, setInputText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && selectedImages.length === 0) return;

    sendMessage(inputText, selectedImages);
    setInputText('');
    setSelectedImages([]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 font-mono">
      {/* Header bar */}
      <div className="p-4 border-b border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <div>
            <h1 className="text-xs font-bold uppercase tracking-wider">AI ASSISTANT // AUTOMATED RESOLUTION</h1>
            <span className="text-[9px] text-stone-500">LLM Engine: Claude Sonnet 4.6 + Devin Agent Bridge</span>
          </div>
        </div>
        <Button variant="dashed" size="sm" onClick={resetChat} className="gap-1 text-[10px]">
          <RotateCcw className="w-3 h-3" />
          RESET CHAT SESSION
        </Button>
      </div>

      {/* Workflow Phase Bar */}
      <ChatPhaseIndicator currentPhase={currentPhase} />

      {/* Message Feed */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-stone-100/30 dark:bg-stone-950/50">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* Input Console */}
      <form onSubmit={handleSend} className="p-4 border-t border-stone-900 dark:border-stone-400 bg-stone-100 dark:bg-stone-900 flex flex-col gap-3">
        <ImageUploadZone selectedImages={selectedImages} onImagesChange={setSelectedImages} />

        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isProcessing}
            placeholder="Type your technical question or paste error logs..."
            className="flex-1 px-4 py-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-900 dark:border-stone-400 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-stone-100 placeholder:text-stone-400"
          />
          <Button type="submit" variant="primary" size="md" isLoading={isProcessing} className="gap-2 shrink-0">
            <Send className="w-3.5 h-3.5" />
            SEND
          </Button>
        </div>
      </form>
    </div>
  );
};
