import Database from 'better-sqlite3';
import path from 'path';

// Database path - stored in project root
const DB_PATH = path.join(process.cwd(), 'visitors.db');

// Singleton database connection
let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initializeSchema(db);
  }
  return db;
}

function initializeSchema(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT NOT NULL,
      page TEXT NOT NULL,
      user_agent TEXT,
      referer TEXT,
      country TEXT,
      city TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_visits_timestamp ON visits(timestamp);
    CREATE INDEX IF NOT EXISTS idx_visits_ip ON visits(ip);
    CREATE INDEX IF NOT EXISTS idx_visits_page ON visits(page);
  `);
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

export function logVisit(visit: Visit): void {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO visits (ip, page, user_agent, referer, country, city)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(visit.ip, visit.page, visit.user_agent, visit.referer, visit.country, visit.city);
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

export function getAnalyticsSummary(): VisitorSummary {
  const db = getDb();

  const total_visits = db.prepare('SELECT COUNT(*) as count FROM visits').get() as { count: number };

  const unique_visitors = db.prepare('SELECT COUNT(DISTINCT ip) as count FROM visits').get() as { count: number };

  const visits_today = db.prepare(`
    SELECT COUNT(*) as count FROM visits
    WHERE date(timestamp) = date('now')
  `).get() as { count: number };

  const visits_this_week = db.prepare(`
    SELECT COUNT(*) as count FROM visits
    WHERE timestamp >= datetime('now', '-7 days')
  `).get() as { count: number };

  const visits_this_month = db.prepare(`
    SELECT COUNT(*) as count FROM visits
    WHERE timestamp >= datetime('now', '-30 days')
  `).get() as { count: number };

  const top_pages = db.prepare(`
    SELECT page, COUNT(*) as count
    FROM visits
    GROUP BY page
    ORDER BY count DESC
    LIMIT 10
  `).all() as { page: string; count: number }[];

  const top_referrers = db.prepare(`
    SELECT referer, COUNT(*) as count
    FROM visits
    WHERE referer IS NOT NULL AND referer != ''
    GROUP BY referer
    ORDER BY count DESC
    LIMIT 10
  `).all() as { referer: string; count: number }[];

  const visits_by_day = db.prepare(`
    SELECT date(timestamp) as date, COUNT(*) as count
    FROM visits
    WHERE timestamp >= datetime('now', '-30 days')
    GROUP BY date(timestamp)
    ORDER BY date DESC
  `).all() as { date: string; count: number }[];

  const recent_visits = db.prepare(`
    SELECT * FROM visits
    ORDER BY timestamp DESC
    LIMIT 50
  `).all() as Visit[];

  const unique_ips = db.prepare(`
    SELECT
      ip,
      COUNT(*) as visits,
      MAX(timestamp) as last_visit,
      GROUP_CONCAT(DISTINCT page) as pages
    FROM visits
    GROUP BY ip
    ORDER BY last_visit DESC
    LIMIT 100
  `).all() as { ip: string; visits: number; last_visit: string; pages: string }[];

  return {
    total_visits: total_visits.count,
    unique_visitors: unique_visitors.count,
    visits_today: visits_today.count,
    visits_this_week: visits_this_week.count,
    visits_this_month: visits_this_month.count,
    top_pages,
    top_referrers,
    visits_by_day,
    recent_visits,
    unique_ips,
  };
}
