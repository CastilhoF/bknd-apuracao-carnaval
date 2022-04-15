export function FormatDateAndTime(date: Date): string {
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${monthIndex + 1}-${day} ${hours}:${minutes}:${seconds}`;
}
