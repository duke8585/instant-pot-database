import { useState } from 'react';
import MarkdownViewer from './components/MarkdownViewer';
import DataTable from './components/DataTable';

function App() {
  const [activeTab, setActiveTab] = useState('database');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-lg flex items-center justify-center text-4xl transform hover:scale-110 transition-transform">
                🍲
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Instant Pot Database
                </h1>
                <p className="mt-2 text-base text-gray-600 font-medium">
                  Complete cooking times and guide for dried legumes and vegetables
                </p>
              </div>
            </div>
            <div className="flex gap-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-xl shadow-md border border-gray-200/50">
              <button
                onClick={() => setActiveTab('database')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'database'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                📊 Database
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'guide'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                📖 Guide
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {activeTab === 'database' ? <DataTable /> : <MarkdownViewer />}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-700 font-medium mb-3">
              ⚡ Data compiled from 50+ sources. Always start with shorter cooking times and adjust as needed.
            </p>
            <p className="text-sm text-gray-600 mb-2">
              Made with ❤️ for pressure cooking enthusiasts
            </p>
            <a
              href="https://github.com/duke8585/instant-pot-database"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg hover:from-gray-900 hover:to-black transition-all shadow-md hover:shadow-lg font-medium"
            >
              <span>⭐</span>
              View on GitHub
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default App;
