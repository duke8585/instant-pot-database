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
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 max-w-4xl mx-auto">
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
