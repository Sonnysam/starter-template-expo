export const getInitials = (name: string | undefined | null, defaultChar = '?'): string => {
  if (!name) return defaultChar;
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return defaultChar;
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

export const formatName = (name: string | undefined | null): string => {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .map((p) => p[0].toUpperCase() + p.slice(1).toLowerCase())
    .join(' ');
};

export const formatNumber = (num: number): string => {
  if (num >= 1e9) return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  return String(num);
};

export const truncateText = (text: string, maxLength = 18): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
