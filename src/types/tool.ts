export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  logo?: string;
  status: 'active' | 'inactive';
  featured: boolean;
}