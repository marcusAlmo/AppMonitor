import React, { useState } from 'react';
import { MOCK_KB_ARTICLES } from './mockArticles';
import { ArticleViewer } from './ArticleViewer';
import { BookOpen, Search } from 'lucide-react';

export const KnowledgeBasePage: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(MOCK_KB_ARTICLES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = MOCK_KB_ARTICLES.filter(
    (art) =>
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArticle = MOCK_KB_ARTICLES.find((art) => art.id === selectedArticleId) || MOCK_KB_ARTICLES[0];

  return (
    <div className="space-y-6 font-mono">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-stone-900 dark:border-stone-400 pb-4">
        <BookOpen className="w-6 h-6 text-stone-900 dark:text-stone-100" />
        <div>
          <h1 className="text-sm font-bold uppercase tracking-widest">KNOWLEDGE BASE & GUIDES</h1>
          <span className="text-[10px] text-stone-500">SELF-SERVICE TECHNICAL DOCUMENTATION</span>
        </div>
      </div>

      {/* Two-Column Search & Reader Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar List */}
        <div className="md:col-span-4 space-y-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides..."
              className="w-full pl-9 pr-3 py-2 bg-stone-50 dark:bg-stone-900 border border-stone-900 dark:border-stone-400 text-xs font-mono text-stone-900 dark:text-stone-100 focus:outline-none placeholder:text-stone-400"
            />
          </div>

          <div className="border border-stone-900 dark:border-stone-400 bg-stone-50 dark:bg-stone-950 divide-y divide-stone-200 dark:divide-stone-800">
            {filteredArticles.map((art) => {
              const isSelected = art.id === selectedArticleId;
              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full p-3 text-left transition-all duration-150 cursor-pointer flex flex-col gap-1 border-l-2 ${
                    isSelected
                      ? 'bg-stone-900 text-stone-50 dark:bg-stone-100 dark:text-stone-900 border-l-teal-500 font-semibold'
                      : 'border-l-transparent hover:bg-stone-200/70 dark:hover:bg-stone-900 hover:border-l-teal-400 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase font-bold opacity-75">{art.id}</span>
                    <span className="text-[9px] uppercase">{art.category}</span>
                  </div>
                  <span className="text-xs font-sans font-bold leading-tight">{art.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Article Content */}
        <div className="md:col-span-8">
          <ArticleViewer article={activeArticle} />
        </div>
      </div>
    </div>
  );
};
