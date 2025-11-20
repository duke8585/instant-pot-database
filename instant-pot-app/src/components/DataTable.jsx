import { useState, useEffect, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import Papa from 'papaparse';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState({});

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL;
    fetch(`${baseUrl}database.csv`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load database');
        }
        return response.text();
      })
      .then(text => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          }
        });
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const columns = useMemo(() => {
    if (data.length === 0) return [];

    return Object.keys(data[0]).map(key => {
      if (key === 'Source') {
        return {
          accessorKey: key,
          header: key,
          cell: info => {
            const source = info.getValue();
            // Parse markdown-style links: [text](url)
            const linkMatch = source.match(/\[([^\]]+)\]\(([^)]+)\)/);
            if (linkMatch) {
              const [, text, url] = linkMatch;
              return (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {text}
                </a>
              );
            }
            return source;
          },
          filterFn: 'includesString',
        };
      }
      return {
        accessorKey: key,
        header: key,
        cell: info => info.getValue(),
        filterFn: 'includesString',
      };
    });
  }, [data]);

  const filteredData = useMemo(() => {
    if (Object.keys(columnFilters).length === 0) return data;

    return data.filter(row => {
      return Object.entries(columnFilters).every(([key, value]) => {
        if (!value) return true;
        const cellValue = String(row[key] || '').toLowerCase();
        return cellValue.includes(value.toLowerCase());
      });
    });
  }, [data, columnFilters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiSort: true,
    enableSortingRemoval: false,
    maxMultiSortColCount: 3,
  });

  const handleColumnFilterChange = (columnId, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnId]: value
    }));
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setGlobalFilter('');
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="animate-pulse">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg"></div>
            <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
            <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg"></div>
            <div className="h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50/90 backdrop-blur-sm border-2 border-red-200 rounded-2xl shadow-xl p-6">
        <h3 className="text-red-800 font-bold text-lg mb-2 flex items-center gap-2">
          <span>⚠️</span> Error Loading Database
        </h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
      {/* Header with Search and Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cooking Times Database</h2>
        <p className="text-sm text-gray-600 mb-4">
          💡 <strong>Tip:</strong> Hold <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Shift</kbd> and click multiple column headers for hierarchical sorting
        </p>

        {/* Global Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder="Search all columns..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all shadow-sm hover:border-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 text-sm font-semibold text-purple-700 bg-purple-100 rounded-lg">
              {table.getFilteredRowModel().rows.length} of {data.length} rows
            </span>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              ✖️ Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto -mx-4 md:mx-0 rounded-xl">
        <div className="inline-block min-w-full align-middle">
          <div className="max-h-[600px] overflow-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-4 text-left text-xs font-bold text-gray-800 uppercase tracking-wider"
                      >
                        <div className="space-y-2">
                          {/* Column Header with Sort */}
                          <div
                            className={`flex items-center gap-2 ${
                              header.column.getCanSort() ? 'cursor-pointer select-none hover:text-purple-700 active:scale-95' : ''
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="truncate font-extrabold">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            {header.column.getIsSorted() && (
                              <div className="flex items-center gap-1">
                                <span className="text-red-600 font-bold text-base">
                                  {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                                </span>
                                {sorting.length > 1 && (
                                  <span className="text-xs font-bold text-white bg-red-600 rounded-full w-4 h-4 flex items-center justify-center">
                                    {header.column.getSortIndex() + 1}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Column Filter */}
                          <input
                            type="text"
                            value={columnFilters[header.column.id] || ''}
                            onChange={e => handleColumnFilterChange(header.column.id, e.target.value)}
                            placeholder={`Filter...`}
                            className="w-full px-2 py-1.5 text-xs border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 outline-none bg-white hover:border-gray-400 transition-colors"
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-4xl">🔍</span>
                        <p className="text-lg font-medium">No results found</p>
                        <p className="text-sm text-gray-400">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-150 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                      }`}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className="px-4 py-3.5 text-sm text-gray-700 whitespace-nowrap font-medium"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer with Stats */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>
          Click column headers to sort • Hold Shift + Click for multi-column sorting • Use column filters for specific searches • Use global search for quick filtering
        </p>
      </div>
    </div>
  );
};

export default DataTable;
