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
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Guide</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
      <div className="prose prose-lg prose-slate max-w-none
        prose-headings:font-bold
        prose-h1:text-4xl prose-h1:bg-gradient-to-r prose-h1:from-purple-600 prose-h1:to-pink-600 prose-h1:bg-clip-text prose-h1:text-transparent prose-h1:mb-6 prose-h1:mt-0
        prose-h2:text-3xl prose-h2:text-gray-800 prose-h2:border-b-2 prose-h2:border-purple-200 prose-h2:pb-2 prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:text-purple-700 prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base prose-p:mb-4
        prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-700
        prose-strong:text-gray-900 prose-strong:font-bold prose-strong:bg-yellow-100 prose-strong:px-1 prose-strong:rounded
        prose-ul:my-4 prose-ul:space-y-2
        prose-ol:my-4 prose-ol:space-y-2
        prose-li:text-gray-700 prose-li:leading-relaxed
        prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-code:text-sm prose-code:bg-purple-100 prose-code:text-purple-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4
        prose-hr:border-purple-200 prose-hr:my-8
        prose-table:w-full prose-table:border-collapse prose-table:my-6
        prose-thead:bg-purple-100
        prose-th:bg-purple-100 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:text-gray-800 prose-th:border prose-th:border-purple-200
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
