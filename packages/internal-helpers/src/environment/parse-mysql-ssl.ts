/**
 * Parse MySQL SSL env variable into a value suitable for mysql2 `createPool({ ssl })`.
 *
 * Supported inputs (as strings):
 * - 'true'  => {}
 * - 'false' => undefined
 * - JSON    => parsed object (e.g. {"rejectUnauthorized":true,"ca":"..."})
 */
export function parseMysqlSslEnv(raw?: string): unknown {
  if (typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (trimmed === '') return undefined;

  const lower = trimmed.toLowerCase();
  if (lower === 'true') return {};
  if (lower === 'false') return undefined;

  try {
    return JSON.parse(trimmed);
  } catch {
    return trimmed;
  }
}
