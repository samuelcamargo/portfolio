import { Certificate } from '@/domain/types/about';

type SortDirection = 'az' | 'za' | 'newest' | 'oldest';

export const sortCertificates = (
  certificates: Certificate[],
  direction: SortDirection
): Certificate[] => {
  const sorted = [...certificates];

  switch (direction) {
    case 'az':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'za':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    default:
      return sorted;
  }
};

export const filterCertificatesByCategory = (
  certificates: Certificate[],
  category: string
): Certificate[] => {
  if (category === 'all') return certificates;
  return certificates.filter(cert => cert.category === category);
};

export const searchCertificates = (
  certificates: Certificate[],
  searchTerm: string
): Certificate[] => {
  if (!searchTerm) return certificates;
  
  const term = searchTerm.toLowerCase();
  return certificates.filter(cert => 
    cert.name.toLowerCase().includes(term) ||
    cert.category.toLowerCase().includes(term) ||
    cert.platform.toLowerCase().includes(term)
  );
}; 