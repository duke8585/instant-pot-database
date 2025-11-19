import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownViewer = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}instant-pot-guide.md`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load guide');
        }
        return response.text();
      })
      .then(text => {
        setMarkdown(text);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="animate-pulse">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-3/4 mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-full"></div>
            <div className="h-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg w-full"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl shadow-xl p-6">
        <h3 className="text-red-800 font-bold text-lg mb-2 flex items-center gap-2">
          <span>⚠️</span> Error Loading Guide
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl shadow-lg flex items-center justify-center text-2xl">
          📖
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Complete Cooking Guide
        </h2>
      </div>

      <div className="prose prose-lg prose-slate max-w-none
        prose-headings:font-bold prose-headings:bg-gradient-to-r prose-headings:from-gray-900 prose-headings:to-gray-700 prose-headings:bg-clip-text prose-headings:text-transparent
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:pb-4 prose-h1:border-b-4 prose-h1:border-purple-200
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-indigo-200
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-purple-800
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
        prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-100 prose-strong:px-1
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4 prose-ol:space-y-2
        prose-li:text-gray-700 prose-li:leading-relaxed
        prose-code:text-sm prose-code:bg-purple-100 prose-code:text-purple-800 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-code:font-semibold
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-xl prose-pre:shadow-lg
        prose-table:w-full prose-table:border-2 prose-table:border-gray-300 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-md
        prose-th:bg-gradient-to-r prose-th:from-purple-100 prose-th:to-indigo-100 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-800 prose-th:border-b-2 prose-th:border-gray-300
        prose-td:p-3 prose-td:border-t prose-td:border-gray-200 prose-td:text-gray-700
        prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:my-6">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
