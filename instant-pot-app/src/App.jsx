import { useState } from 'react';
import MarkdownViewer from './components/MarkdownViewer';
import DataTable from './components/DataTable';

function App() {
  const [activeTab, setActiveTab] = useState('database');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Instant Pot Database
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Complete cooking times and guide for dried legumes and vegetables
              </p>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('database')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'database'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Database
              </button>
              <button
                onClick={() => setActiveTab('guide')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'guide'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Guide
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
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p>
              Data compiled from 50+ sources. Always start with shorter cooking times and adjust as needed.
            </p>
            <p className="mt-2">
              <a
                href="https://github.com/duke8585/instant-pot-database"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                View on GitHub
              </a>
            </p>
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

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;
