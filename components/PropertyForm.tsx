'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { Property } from '@/lib/types';
import Image from 'next/image';
import PropertyMap from './PropertyMap';
import ImageUpload from './ImageUpload';

interface PropertyFormProps {
  initialData?: Partial<Property>;
  isEdit?: boolean;
}

export default function PropertyForm({ initialData, isEdit = false }: PropertyFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    location: initialData?.location || '',
    price: initialData?.price || 0,
    beds: initialData?.beds || 0,
    baths: initialData?.baths || 0,
    area: initialData?.area || 0,
    category: initialData?.category || 'House',
    status: initialData?.status || 'Active',
    type: initialData?.type || 'FOR SALE',
    period: initialData?.period || '',
    description: initialData?.description || '',
    year_built: initialData?.year_built || new Date().getFullYear(),
    parking: initialData?.parking || 0,
    amenities: initialData?.amenities || [],
    is_featured: initialData?.is_featured || false,
    tag: initialData?.tag || '',
  });

  const AMENITIES_LIST = [
    'Swimming Pool', 'Garden', 'Air Conditioning', 'Smart Home', 'Wifi', 
    'Parking', 'Gym', 'Central Heating & Cooling', 'Electric Vehicle Charging',
    'Private Gym', 'Wine Cellar'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const slug = isEdit ? initialData?.slug : generateSlug(formData.title);

    const propertyData = {
      ...formData,
      images,
      slug,
    };

    try {
      if (isEdit) {
        const { error } = await supabase
          .from('properties')
          .update(propertyData)
          .eq('id', initialData?.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('properties')
          .insert([propertyData]);
        if (error) throw error;
      }

      router.push('/admin/properties');
      router.refresh();
    } catch (error: any) {
      alert('Error saving property: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start mb-20">
      <div className="xl:col-span-8 space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#D9ECC8]/30 flex items-center gap-3 bg-gradient-to-r from-[#D9ECC8]/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-[#D9ECC8] flex items-center justify-center text-[#19322F]">
              <span className="material-icons text-lg">info</span>
            </div>
            <h2 className="text-xl font-bold text-[#19322F]">Basic Information</h2>
          </div>
          <div className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="title">Property Title *</label>
              <input 
                required
                id="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all"
                placeholder="e.g. Modern Penthouse with Ocean View"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="price">Price *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input 
                    required
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full pl-7 pr-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="status">Status</label>
                <select 
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all cursor-pointer"
                >
                  <option value="Active">Active (Online)</option>
                  <option value="Pending">Pending</option>
                  <option value="Sold">Sold</option>
                  <option value="Archived">Archived (Offline)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="category">Property Type</label>
                <select 
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all cursor-pointer"
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="type">Listing Type</label>
                <select 
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all cursor-pointer"
                >
                  <option value="FOR SALE">For Sale</option>
                  <option value="FOR RENT">For Rent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="period">Rental Period (if applicable)</label>
                <input 
                  id="period"
                  type="text"
                  value={formData.period}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all"
                  placeholder="e.g. mo, yr"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#D9ECC8]/30 flex items-center gap-3 bg-gradient-to-r from-[#D9ECC8]/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-[#D9ECC8] flex items-center justify-center text-[#19322F]">
              <span className="material-icons text-lg">description</span>
            </div>
            <h2 className="text-xl font-bold text-[#19322F]">Description</h2>
          </div>
          <div className="p-8">
            <textarea 
              id="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all min-h-[200px] resize-y"
              placeholder="Describe the property features, neighborhood, and unique selling points..."
            ></textarea>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-[#D9ECC8]/30 flex justify-between items-center bg-gradient-to-r from-[#D9ECC8]/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#D9ECC8] flex items-center justify-center text-[#19322F]">
                <span className="material-icons text-lg">image</span>
              </div>
              <h2 className="text-xl font-bold text-[#19322F]">Gallery</h2>
            </div>
          </div>
          <div className="p-8">
            <ImageUpload 
              existingImages={images} 
              onUploadComplete={(urls) => setImages(urls)} 
            />
          </div>
        </div>
      </div>

      <div className="xl:col-span-4 space-y-8">
        {/* Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#D9ECC8]/30 flex items-center gap-3 bg-gradient-to-r from-[#D9ECC8]/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-[#D9ECC8] flex items-center justify-center text-[#19322F]">
              <span className="material-icons text-lg">place</span>
            </div>
            <h2 className="text-lg font-bold text-[#19322F]">Location</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#19322F] mb-1.5" htmlFor="location">Address *</label>
              <input 
                required
                id="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-md border-gray-200 focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all text-sm"
                placeholder="Street Address, City, Zip"
              />
            </div>
            <div className="relative h-48 w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group">
              <PropertyMap location={formData.location || 'New Listing'} />
              {!formData.location && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-gray-100/50 backdrop-blur-[1px]">
                  <span className="bg-white/90 text-[#19322F] px-3 py-1.5 rounded shadow-sm backdrop-blur-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-icons text-sm text-[#006655]">map</span> Preview
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#D9ECC8]/30 flex items-center gap-3 bg-gradient-to-r from-[#D9ECC8]/10 to-transparent">
            <div className="w-8 h-8 rounded-full bg-[#D9ECC8] flex items-center justify-center text-[#19322F]">
              <span className="material-icons text-lg">straighten</span>
            </div>
            <h2 className="text-lg font-bold text-[#19322F]">Details</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block" htmlFor="area">Area (m²)</label>
                <input 
                  id="area"
                  type="number"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded border-gray-200 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all text-sm"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block" htmlFor="year_built">Year Built</label>
                <input 
                  id="year_built"
                  type="number"
                  value={formData.year_built}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded border-gray-200 bg-gray-50 focus:bg-white focus:ring-1 focus:ring-[#006655] focus:border-[#006655] transition-all text-sm"
                  placeholder="YYYY"
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="space-y-4">
              {[
                { label: 'Bedrooms', id: 'beds', icon: 'bed' },
                { label: 'Bathrooms', id: 'baths', icon: 'bathtub' },
                { label: 'Parking', id: 'parking', icon: 'directions_car' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#19322F] flex items-center gap-2">
                    <span className="material-icons text-gray-400 text-sm">{item.icon}</span> {item.label}
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, [item.id]: Math.max(0, (prev as any)[item.id] - 1) }))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 border-r border-gray-100"
                    >-</button>
                    <input 
                      type="text" 
                      readOnly
                      value={(formData as any)[item.id]}
                      className="w-10 text-center border-none bg-transparent text-[#19322F] p-0 focus:ring-0 text-sm font-medium"
                    />
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, [item.id]: (prev as any)[item.id] + 1 }))}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 text-gray-600 border-l border-gray-100"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Amenities</h3>
              <div className="grid grid-cols-1 gap-2">
                {AMENITIES_LIST.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2.5 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="w-4 h-4 text-[#006655] border-gray-300 rounded focus:ring-[#006655]" 
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#19322F] transition-colors">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky top-24 space-y-3">
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg bg-[#006655] hover:bg-[#19322F] text-white font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span className="material-icons text-lg">{isSubmitting ? 'sync' : 'save'}</span>
            {isSubmitting ? 'Saving...' : 'Save Property'}
          </button>
          <button 
            type="button"
            onClick={() => router.back()}
            className="w-full py-3 rounded-lg border border-gray-300 bg-white text-[#19322F] hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
