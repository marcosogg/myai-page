export interface Tool {
  id: string;
  name: string;
  description: string;
  categories: string[];
  url: string;
  logo?: string;
  status: 'active' | 'inactive';
  featured: boolean;
}