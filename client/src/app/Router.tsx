import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppShell } from '../components/layout/AppShell';
import { LoginPage } from '../features/auth/LoginPage';
import { RoleGuard } from '../features/auth/RoleGuard';
import { ChatPage } from '../features/chatbot/ChatPage';
import { TicketBoardPage } from '../features/tickets/TicketBoardPage';
import { TicketDetailPage } from '../features/tickets/TicketDetailPage';
import { KnowledgeBasePage } from '../features/knowledge-base/KnowledgeBasePage';
import { StatusBoardPage } from '../features/status-board/StatusBoardPage';
import { ChatReviewPage } from '../features/chat-review/ChatReviewPage';
import { ApiCostsDashboard } from '../features/api-costs/ApiCostsDashboard';
import { PartnerListPage } from '../features/admin/PartnerListPage';

export const AppRouter: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <RoleGuard>
              <AppShell />
            </RoleGuard>
          }
        >
          <Route path="/" element={<Navigate to="/tickets" replace />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/tickets" element={<TicketBoardPage />} />
          <Route path="/tickets/:id" element={<TicketDetailPage />} />
          <Route path="/kb" element={<KnowledgeBasePage />} />
          <Route path="/status" element={<StatusBoardPage />} />

          {/* Admin & Partner protected routes */}
          <Route
            path="/admin/chat-review"
            element={
              <RoleGuard allowedRoles={['admin', 'partner']}>
                <ChatReviewPage />
              </RoleGuard>
            }
          />
          <Route
            path="/admin/api-costs"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <ApiCostsDashboard />
              </RoleGuard>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <RoleGuard allowedRoles={['admin']}>
                <PartnerListPage />
              </RoleGuard>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/tickets" replace />} />
      </Routes>
    </AnimatePresence>
  );
};
