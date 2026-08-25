export function formatMealTime(timestamp: number, tzOffsetMin: number): string {
  const utcMs = timestamp * 1000;
  const offsetMs = tzOffsetMin * 60 * 1000;

  const localDate = new Date(utcMs + offsetMs);

  return localDate.toUTCString().slice(0, -4);
}
