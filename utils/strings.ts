export const getInitials = (name: string | undefined | null, defaultChar: string = '?'): string => {
  if (!name) return defaultChar;

  const nameParts = name.split(' ').filter((part) => part.length > 0);

  if (nameParts.length === 0) return defaultChar;
  if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

  return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
};

export const formatName = (name: string | undefined | null): string => {
  if (!name) return '';

  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

export const truncateText = (text: string, maxLength: number = 20): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
