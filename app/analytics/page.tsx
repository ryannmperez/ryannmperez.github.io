'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Visit {
  id: number;
  ip: string;
  page: string;
  user_agent?: string;
  referer?: string;
  country?: string;
  city?: string;
  timestamp: string;
}

interface AnalyticsSummary {
  total_visits: number;
  unique_visitors: number;
  visits_today: number;
  visits_this_week: number;
  visits_this_month: number;
  top_pages: { page: string; count: number }[];
  top_referrers: { referer: string; count: number }[];
  visits_by_day: { date: string; count: number }[];
  recent_visits: Visit[];
  unique_ips: { ip: string; visits: number; last_visit: string; pages: string }[];
}

function AnalyticsContent() {
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = secret ? `/api/analytics?secret=${secret}` : '/api/analytics';
        const res = await fetch(url);
        if (!res.ok) {
          if (res.status === 401) {
            setError('Unauthorized. Please provide a valid secret.');
          } else {
            setError('Failed to fetch analytics data.');
          }
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError('Failed to connect to analytics API.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [secret]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">No data available.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Visitor Analytics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard label="Total Visits" value={data.total_visits} />
          <StatCard label="Unique Visitors" value={data.unique_visitors} />
          <StatCard label="Today" value={data.visits_today} />
          <StatCard label="This Week" value={data.visits_this_week} />
          <StatCard label="This Month" value={data.visits_this_month} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Visits by Day */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Visits by Day (Last 30 Days)</h2>
            <div className="space-y-2">
              {data.visits_by_day.slice(0, 14).map((day) => (
                <div key={day.date} className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm w-24">{day.date}</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{
                        width: `${Math.max(5, (day.count / Math.max(...data.visits_by_day.map(d => d.count))) * 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-white text-sm w-8 text-right">{day.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Top Pages</h2>
            <div className="space-y-2">
              {data.top_pages.map((page) => (
                <div key={page.page} className="flex items-center justify-between">
                  <span className="text-gray-300 truncate flex-1">{page.page}</span>
                  <span className="text-blue-400 font-medium ml-4">{page.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unique IPs Table */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Unique Visitors by IP</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-400 font-medium">IP Address</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Visits</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Last Visit</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Pages Visited</th>
                </tr>
              </thead>
              <tbody>
                {data.unique_ips.map((visitor) => (
                  <tr key={visitor.ip} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 px-4 text-white font-mono text-sm">{visitor.ip}</td>
                    <td className="py-3 px-4 text-blue-400">{visitor.visits}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {new Date(visitor.last_visit).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-300 text-sm truncate max-w-xs">
                      {visitor.pages}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Visits */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold text-white mb-4">Recent Visits</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-400 font-medium">Time</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">IP</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Page</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Location</th>
                  <th className="py-3 px-4 text-gray-400 font-medium">Referer</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_visits.map((visit) => (
                  <tr key={visit.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-3 px-4 text-gray-400 text-sm whitespace-nowrap">
                      {new Date(visit.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-white font-mono text-sm">{visit.ip}</td>
                    <td className="py-3 px-4 text-blue-400">{visit.page}</td>
                    <td className="py-3 px-4 text-gray-300 text-sm">
                      {visit.city && visit.country ? `${visit.city}, ${visit.country}` : visit.country || '-'}
                    </td>
                    <td className="py-3 px-4 text-gray-400 text-sm truncate max-w-xs">
                      {visit.referer || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="text-3xl font-bold text-white">{value.toLocaleString()}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading...</div>
      </div>
    }>
      <AnalyticsContent />
    </Suspense>
  );
}
