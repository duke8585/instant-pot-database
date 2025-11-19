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
            // Clean up ingredient names - remove parenthetical info for legumes/lentils but keep for vegetables
            const cleanedData = results.data.map(row => {
              const ingredient = row.Ingredient || '';
              const legumeKeywords = ['Lentil', 'Chickpea', 'Bean', 'Pea'];
              const isLegume = legumeKeywords.some(keyword => ingredient.includes(keyword));

              if (isLegume && ingredient.includes('(') && ingredient.includes(')')) {
                // Remove parenthetical info for legumes
                row.Ingredient = ingredient.replace(/\s*\([^)]*\)/g, '').trim();
              }

              return row;
            });
            setData(cleanedData);
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

    return Object.keys(data[0])
      .filter(key => key !== 'Source URL') // Hide Source URL column
      .map(key => {
        if (key === 'Source') {
          return {
            accessorKey: key,
            header: key,
            cell: info => {
              const source = info.getValue();
              const sourceUrl = info.row.original['Source URL'];
              if (sourceUrl && sourceUrl.trim()) {
                return (
                  <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {source}
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
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Database</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
      {/* Header with Search and Info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Cooking Times Database</h2>
        <p className="text-sm text-gray-600 mb-4">
          💡 <strong>Tip:</strong> Hold <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">Shift</kbd> and click multiple column headers for hierarchical sorting
        </p>

        {/* Global Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
            <input
              type="text"
              value={globalFilter ?? ''}
              onChange={e => setGlobalFilter(e.target.value)}
              placeholder="Search all columns..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {table.getFilteredRowModel().rows.length} of {data.length} rows
            </span>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="overflow-x-auto -mx-4 md:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="max-h-[600px] overflow-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                      >
                        <div className="space-y-2">
                          {/* Column Header with Sort */}
                          <div
                            className={`flex items-center gap-2 ${
                              header.column.getCanSort() ? 'cursor-pointer select-none hover:text-gray-900' : ''
                            }`}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <span className="truncate">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                            {header.column.getIsSorted() && (
                              <div className="flex items-center gap-1">
                                <span className="text-purple-600 font-bold text-base">
                                  {header.column.getIsSorted() === 'asc' ? '↑' : '↓'}
                                </span>
                                {sorting.length > 1 && (
                                  <span className="text-xs font-bold text-white bg-purple-600 rounded-full w-4 h-4 flex items-center justify-center">
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
                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No results found
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      {row.getVisibleCells().map(cell => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
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
