export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  images: string[];
  tag?: string;
  type?: string;
  period?: string;
  is_featured: boolean;
  amenities: string[];
  created_at: string;
  status: 'Active' | 'Pending' | 'Sold' | 'Archived';
  category: 'House' | 'Apartment' | 'Villa' | 'Penthouse' | 'Commercial';
  description?: string;
  year_built?: number;
  parking?: number;
  owner_id?: string;
}
