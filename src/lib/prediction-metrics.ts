export function vipActive(expiresAt: string | undefined | null, now = Date.now()) {
  return Boolean(expiresAt && new Date(expiresAt).getTime() > now);
}
type Outcome = { status: string; kickoff: string; result_recorded_at?: string | null };
export function predictionMetrics(rows: Outcome[]) {
  const settled = rows.filter(r => ['won','lost','void'].includes(r.status));
  const won = settled.filter(r => r.status === 'won').length;
  const lost = settled.filter(r => r.status === 'lost').length;
  const months = new Map<string, { month:string; won:number; lost:number; void:number }>();
  for (const row of settled) {
    const month = (row.result_recorded_at ?? row.kickoff).slice(0,7);
    const group = months.get(month) ?? {month,won:0,lost:0,void:0};
    if (row.status === 'won') group.won++;
    if (row.status === 'lost') group.lost++;
    if (row.status === 'void') group.void++;
    months.set(month,group);
  }
  return {won,lost,void:settled.length-won-lost,pending:rows.filter(r => ['published','pending'].includes(r.status)).length,accuracy:won+lost ? Math.round(won/(won+lost)*100) : null,months:[...months.values()].sort((a,b)=>a.month.localeCompare(b.month))};
}