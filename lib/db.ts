import { sql } from '@vercel/postgres';

// Initialize the database schema (run once)
export async function initializeSchema() {
  await sql`
    CREATE TABLE IF NOT EXISTS visits (
      id SERIAL PRIMARY KEY,
      ip TEXT NOT NULL,
      page TEXT NOT NULL,
      user_agent TEXT,
      referer TEXT,
      country TEXT,
      city TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Create indexes if they don't exist
  await sql`CREATE INDEX IF NOT EXISTS idx_visits_timestamp ON visits(timestamp)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_visits_ip ON visits(ip)`;
}

export interface Visit {
  id?: number;
  ip: string;
  page: string;
  user_agent?: string;
  referer?: string;
  country?: string;
  city?: string;
  timestamp?: string;
}

export async function logVisit(visit: Visit): Promise<void> {
  try {
    await sql`
      INSERT INTO visits (ip, page, user_agent, referer, country, city)
      VALUES (${visit.ip}, ${visit.page}, ${visit.user_agent || null}, ${visit.referer || null}, ${visit.country || null}, ${visit.city || null})
    `;
  } catch (error) {
    // If table doesn't exist, create it and retry
    if (String(error).includes('does not exist')) {
      await initializeSchema();
      await sql`
        INSERT INTO visits (ip, page, user_agent, referer, country, city)
        VALUES (${visit.ip}, ${visit.page}, ${visit.user_agent || null}, ${visit.referer || null}, ${visit.country || null}, ${visit.city || null})
      `;
    } else {
      throw error;
    }
  }
}

export interface VisitorSummary {
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

export async function getAnalyticsSummary(): Promise<VisitorSummary> {
  try {
    const [
      totalResult,
      uniqueResult,
      todayResult,
      weekResult,
      monthResult,
      topPagesResult,
      topReferrersResult,
      visitsByDayResult,
      recentVisitsResult,
      uniqueIpsResult,
    ] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM visits`,
      sql`SELECT COUNT(DISTINCT ip) as count FROM visits`,
      sql`SELECT COUNT(*) as count FROM visits WHERE DATE(timestamp) = CURRENT_DATE`,
      sql`SELECT COUNT(*) as count FROM visits WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '7 days'`,
      sql`SELECT COUNT(*) as count FROM visits WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days'`,
      sql`SELECT page, COUNT(*)::int as count FROM visits GROUP BY page ORDER BY count DESC LIMIT 10`,
      sql`SELECT referer, COUNT(*)::int as count FROM visits WHERE referer IS NOT NULL AND referer != '' GROUP BY referer ORDER BY count DESC LIMIT 10`,
      sql`SELECT DATE(timestamp)::text as date, COUNT(*)::int as count FROM visits WHERE timestamp >= CURRENT_TIMESTAMP - INTERVAL '30 days' GROUP BY DATE(timestamp) ORDER BY date DESC`,
      sql`SELECT * FROM visits ORDER BY timestamp DESC LIMIT 50`,
      sql`SELECT ip, COUNT(*)::int as visits, MAX(timestamp)::text as last_visit, STRING_AGG(DISTINCT page, ',') as pages FROM visits GROUP BY ip ORDER BY last_visit DESC LIMIT 100`,
    ]);

    return {
      total_visits: Number(totalResult.rows[0]?.count || 0),
      unique_visitors: Number(uniqueResult.rows[0]?.count || 0),
      visits_today: Number(todayResult.rows[0]?.count || 0),
      visits_this_week: Number(weekResult.rows[0]?.count || 0),
      visits_this_month: Number(monthResult.rows[0]?.count || 0),
      top_pages: topPagesResult.rows as { page: string; count: number }[],
      top_referrers: topReferrersResult.rows as { referer: string; count: number }[],
      visits_by_day: visitsByDayResult.rows as { date: string; count: number }[],
      recent_visits: recentVisitsResult.rows as Visit[],
      unique_ips: uniqueIpsResult.rows as { ip: string; visits: number; last_visit: string; pages: string }[],
    };
  } catch (error) {
    // If table doesn't exist, create it and return empty data
    if (String(error).includes('does not exist')) {
      await initializeSchema();
      return {
        total_visits: 0,
        unique_visitors: 0,
        visits_today: 0,
        visits_this_week: 0,
        visits_this_month: 0,
        top_pages: [],
        top_referrers: [],
        visits_by_day: [],
        recent_visits: [],
        unique_ips: [],
      };
    }
    throw error;
  }
}
