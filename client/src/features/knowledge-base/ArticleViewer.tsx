import React from 'react';
import type { KBArticle } from './types';
import ReactMarkdown from 'react-markdown';
import { Clock, Calendar, BookOpen } from 'lucide-react';
import { Badge } from '../../components/ui';

export interface ArticleViewerProps {
  article: KBArticle;
}

export const ArticleViewer: React.FC<ArticleViewerProps> = ({ article }) => {
  return (
    <article className="p-6 border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-900 space-y-4 font-mono">
      <div className="flex flex-wrap justify-between items-center gap-2 border-b border-stone-900/20 dark:border-stone-100/20 pb-4">
        <Badge variant="neutral">{article.category}</Badge>
        <div className="flex items-center gap-4 text-[10px] text-stone-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            UPDATED: {article.lastUpdated}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
        <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        <span className="text-[10px] font-bold text-stone-500 uppercase">{article.id}</span>
      </div>

      <div className="prose prose-stone dark:prose-invert max-w-none font-sans text-xs leading-relaxed">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </article>
  );
};
