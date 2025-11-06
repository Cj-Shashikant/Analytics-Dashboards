'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectFilteredBusinessData } from '@/redux/slices/filterSlice';

export default function FilterTestPage() {
  const importedData = useSelector((state: RootState) => state.importedData);
  const filters = useSelector(
    (state: RootState) => state.filter.businessDataFilters
  );
  const isActive = useSelector(
    (state: RootState) => state.filter.isBusinessDataFilterActive
  );
  const filtered = useSelector(selectFilteredBusinessData);

  const raw = importedData?.rawExcelData || [];

  const summary = {
    dataSource:
      raw && raw.length > 0
        ? 'Imported Excel (rawExcelData)'
        : 'Static businessData',
    rawCount: raw?.length || 0,
    filteredCount: filtered?.length || 0,
    isFilterActive: isActive,
  };

  const activeFilters = Object.entries(filters)
    .filter(([values]) => Array.isArray(values) && values.length > 0)
    .map(([key, values]) => `${key}: ${values.join(', ')}`);

  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h2 style={{ fontSize: 18, fontWeight: 600 }}>Filter Test</h2>
      <p style={{ color: '#555' }}>
        Live view of Excel-style filters and results.
      </p>

      <div style={{ display: 'grid', gap: 8, marginTop: 12 }}>
        <div
          style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Summary
          </div>
          <div style={{ fontSize: 13 }}>Data Source: {summary.dataSource}</div>
          <div style={{ fontSize: 13 }}>Imported Rows: {summary.rawCount}</div>
          <div style={{ fontSize: 13 }}>
            Filtered Rows: {summary.filteredCount}
          </div>
          <div style={{ fontSize: 13 }}>
            Filter Active: {String(summary.isFilterActive)}
          </div>
        </div>

        <div
          style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Active Filters
          </div>
          {activeFilters.length === 0 ? (
            <div style={{ fontSize: 13, color: '#6b7280' }}>
              No active selections
            </div>
          ) : (
            <ul
              style={{
                fontSize: 13,
                color: '#111827',
                listStyle: 'disc',
                paddingLeft: 16,
              }}
            >
              {activeFilters.map(f => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
        </div>

        <div
          style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Sample Results (Top 10)
          </div>
          {summary.filteredCount === 0 ? (
            <div style={{ fontSize: 13, color: '#6b7280' }}>No data</div>
          ) : (
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 12,
              }}
            >
              <thead>
                <tr>
                  {[
                    'Duration',
                    'Region',
                    'Client Types',
                    'Product Name',
                    'Insurer Name',
                    'Policy Type',
                    'LOB Name',
                    'Business Vertical',
                    'Revenue',
                  ].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: 6,
                        borderBottom: '1px solid #e5e7eb',
                        color: '#374151',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 10).map((row: any, idx: number) => (
                  <tr key={idx}>
                    <td style={{ padding: 6 }}>{row?.Duration ?? ''}</td>
                    <td style={{ padding: 6 }}>{row?.Region ?? ''}</td>
                    <td style={{ padding: 6 }}>
                      {row?.['Client Types'] ?? ''}
                    </td>
                    <td style={{ padding: 6 }}>
                      {row?.['Product Name'] ?? row?.['Product name'] ?? ''}
                    </td>
                    <td style={{ padding: 6 }}>
                      {row?.['Insurer Name'] ?? row?.['Insurer name'] ?? ''}
                    </td>
                    <td style={{ padding: 6 }}>{row?.['Policy Type'] ?? ''}</td>
                    <td style={{ padding: 6 }}>
                      {row?.['LOB Name'] ?? row?.['LOB name'] ?? ''}
                    </td>
                    <td style={{ padding: 6 }}>
                      {row?.['Business Vertical'] ??
                        row?.['Bussiness Vertical'] ??
                        ''}
                    </td>
                    <td style={{ padding: 6 }}>{row?.Revenue ?? ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div style={{ marginTop: 16, fontSize: 12, color: '#6b7280' }}>
        Tip: Open the Filters panel → enable “Excel Filters”, then select
        Duration, Region, Client Types etc. This page updates instantly.
      </div>
    </div>
  );
}
