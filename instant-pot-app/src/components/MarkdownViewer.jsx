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
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
      <div className="prose prose-lg prose-slate max-w-none
        prose-headings:font-bold
        prose-h1:text-4xl prose-h1:bg-gradient-to-r prose-h1:from-red-600 prose-h1:to-gray-800 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:mb-6 prose-h1:mt-0
        prose-h2:text-3xl prose-h2:text-gray-800 prose-h2:border-b-2 prose-h2:border-red-200 prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:text-red-700 prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4
        prose-a:text-red-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-red-700
        prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-red-100 prose-strong:px-1 prose-strong:rounded
        prose-ul:my-4 prose-ul:space-y-2
        prose-ol:my-4 prose-ol:space-y-2
        prose-li:text-gray-700 prose-li:leading-relaxed
        prose-blockquote:border-l-4 prose-blockquote:border-red-500 prose-blockquote:bg-red-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-code:text-sm prose-code:bg-red-100 prose-code:text-red-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
        prose-hr:border-red-200 prose-hr:my-8
        prose-table:w-full prose-table:border-collapse prose-table:my-6
        prose-thead:bg-red-100
        prose-th:bg-red-100 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-800 prose-th:border prose-th:border-red-200
        prose-td:p-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
        prose-tr:even:bg-gray-50">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
