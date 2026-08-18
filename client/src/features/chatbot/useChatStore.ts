import { create } from 'zustand';
import type { ChatState, ChatMessageItem } from './types';
import { useTicketsStore } from '../tickets/useTicketsStore';

const INITIAL_MESSAGES: ChatMessageItem[] = [
  {
    id: 'msg-01',
    sender: 'system',
    content: 'SYSTEM SESSION INIT: AI Autonomous Resolution Agent v4.1 Ready. Ask a question or submit screenshot data.',
    timestamp: '11:45:02 AM',
  },
  {
    id: 'msg-02',
    sender: 'ai',
    content: "Greetings. I am the AppMonitor Technical Support AI. How can I assist you with your system implementation or bug resolution today?",
    timestamp: '11:45:03 AM',
    phase: 'Phase A - Triage',
  },
];

export const useChatStore = create<ChatState>((set) => ({
  messages: INITIAL_MESSAGES,
  currentPhase: 'Phase A - Triage',
  isProcessing: false,
  activeTicketId: null,

  sendMessage: (text: string, images?: string[]) => {
    const userMsg: ChatMessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      images,
    };

    const thinkingMsg: ChatMessageItem = {
      id: `msg-think-${Date.now()}`,
      sender: 'ai',
      content: 'Analyzing issue logs and screenshot visual tokens...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      isThinking: true,
      phase: 'Phase A - Triage',
    };

    set((state) => ({
      messages: [...state.messages, userMsg, thinkingMsg],
      isProcessing: true,
      currentPhase: 'Phase A - Triage',
    }));

    // Simulate AI Phase A & B execution workflow
    setTimeout(() => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m.id === thinkingMsg.id
            ? {
                ...m,
                isThinking: false,
                content:
                  "I've categorized this as a **Frontend State Synchronization & React 19 Render Boundary Issue**. Attempting interactive resolution based on Knowledge Base Article KB-104.",
                phase: 'Phase B - Troubleshoot',
              }
            : m
        ),
        currentPhase: 'Phase B - Troubleshoot',
      }));

      // Simulate Phase C & D ticket dispatch if issue is technical/complex
      setTimeout(() => {
        const ticketId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
        
        // Dispatch to Ticket store
        useTicketsStore.getState().createTicketFromChat({
          id: ticketId,
          title: text.length > 50 ? text.substring(0, 50) + '...' : text,
          description: text,
          category: 'Frontend Bug',
          priority: 'high',
          tenantId: 't-acme-99',
          tenantName: 'Acme Corp',
        });

        const ticketGeneratedMsg: ChatMessageItem = {
          id: `msg-ticket-${Date.now()}`,
          sender: 'ai',
          content: `Automated troubleshooting limit reached. **${ticketId}** generated in Ticket Board. Invoking **Devin AI Engineer** to analyze repo, reproduce, and auto-submit PR to \`develop\` branch.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          phase: 'Phase D - Devin Integration',
          ticketId,
        };

        set((state) => ({
          messages: [...state.messages, ticketGeneratedMsg],
          isProcessing: false,
          currentPhase: 'Phase D - Devin Integration',
          activeTicketId: ticketId,
        }));
      }, 2500);
    }, 2000);
  },

  resetChat: () => {
    set({
      messages: INITIAL_MESSAGES,
      currentPhase: 'Phase A - Triage',
      isProcessing: false,
      activeTicketId: null,
    });
  },
}));
