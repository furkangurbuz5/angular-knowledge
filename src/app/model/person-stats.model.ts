import { Person } from './person.model';

export interface StatItem {
  label: string;
  count: number;
  percentage: number;
}

export interface PersonStats {
  totalPersons: number;
  carStats: StatItem[];
  countryStats: StatItem[];
  bankStats: StatItem[];
  cityStats: StatItem[];
}

export function calculatePersonStats(persons: Person[]): PersonStats {
  const totalPersons = persons.length;

  const calculateDistribution = (key: keyof Person): StatItem[] => {
    const counts: Record<string, number> = {};
    persons.forEach((person) => {
      const value = person[key];
      counts[value] = (counts[value] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([label, count]) => ({
        label,
        count,
        percentage: totalPersons > 0 ? (count / totalPersons) * 100 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .filter((item) => {
        return item.percentage >= 0.5
      });
  };

  return {
    totalPersons,
    carStats: calculateDistribution('car'),
    countryStats: calculateDistribution('countryOfOrigin'),
    bankStats: calculateDistribution('bank'),
    cityStats: calculateDistribution('city'),
  };
}
