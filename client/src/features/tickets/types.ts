export type TicketStatus = 'open' | 'in-progress' | 'pr-raised' | 'merged' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface DevinSessionLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'command' | 'success' | 'warning';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  tenantId: string;
  tenantName: string;
  createdAt: string;
  updatedAt: string;
  devinActive: boolean;
  devinSessionId?: string;
  devinProgressPercent?: number;
  pullRequestUrl?: string;
  branchName?: string;
  logs: DevinSessionLog[];
}

export interface TicketsState {
  tickets: Ticket[];
  createTicketFromChat: (data: Partial<Ticket>) => Ticket;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  triggerDevinResolution: (id: string) => void;
}
