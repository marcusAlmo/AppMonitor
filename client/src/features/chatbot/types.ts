export type ChatPhase = 'Phase A - Triage' | 'Phase B - Troubleshoot' | 'Phase C - Ticket Generation' | 'Phase D - Devin Integration' | 'Phase E - Automated PR' | 'Phase F - Monitor';

export interface ChatMessageItem {
  id: string;
  sender: 'user' | 'ai' | 'system';
  content: string;
  timestamp: string;
  images?: string[];
  phase?: ChatPhase;
  ticketId?: string;
  isThinking?: boolean;
}

export interface ChatState {
  messages: ChatMessageItem[];
  currentPhase: ChatPhase;
  isProcessing: boolean;
  activeTicketId: string | null;
  sendMessage: (text: string, images?: string[]) => void;
  resetChat: () => void;
}
