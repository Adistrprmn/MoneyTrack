// Helpers to compute date ranges for weekly / monthly / yearly summaries.

export function startOfWeek(date) {
  const d = new Date(date)
  const day = d.getDay() // 0 = Sunday
  const diff = (day === 0 ? -6 : 1) - day // move to Monday
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function endOfWeek(date) {
  const start = startOfWeek(date)
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  end.setHours(23, 59, 59, 999)
  return end
}

export function startOfMonth(date) {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}

export function endOfMonth(date) {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999)
}

export function startOfYear(date) {
  const d = new Date(date)
  return new Date(d.getFullYear(), 0, 1)
}

export function endOfYear(date) {
  const d = new Date(date)
  return new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999)
}

export function getRangeForPeriod(period, refDate = new Date()) {
  switch (period) {
    case 'weekly':
      return { start: startOfWeek(refDate), end: endOfWeek(refDate) }
    case 'yearly':
      return { start: startOfYear(refDate), end: endOfYear(refDate) }
    case 'monthly':
    default:
      return { start: startOfMonth(refDate), end: endOfMonth(refDate) }
  }
}

export function isWithinRange(dateStr, start, end) {
  const t = new Date(dateStr).getTime()
  return t >= start.getTime() && t <= end.getTime()
}
