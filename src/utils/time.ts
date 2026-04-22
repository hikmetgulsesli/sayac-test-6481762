export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  
  const isToday = date.toDateString() === now.toDateString();
  const time = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) {
    return `Bugün, ${time}`;
  }
  return `${date.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}, ${time}`;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
