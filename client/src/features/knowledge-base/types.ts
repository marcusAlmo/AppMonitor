export interface KBArticle {
  id: string;
  title: string;
  category: 'Setup' | 'API & Auth' | 'React 19 Hooks' | 'Troubleshooting' | 'Devin Workflows';
  description: string;
  content: string;
  lastUpdated: string;
  readTime: string;
}
