import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import { supabase } from "@/lib/supabase";
import { Property } from "@/lib/types";
import Link from "next/link";
import HomeFilters from "@/components/HomeFilters";
import { getTranslations } from 'next-intl/server';

// Server-side fetching functions
async function getFeaturedProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .eq('status', 'Active');
  
  if (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }
  return data as Property[];
}

async function getNewInMarketProperties(limit: number = 4, filters: any = {}) {
  let query = supabase
    .from('properties')
    .select('*', { count: 'exact' })
    .eq('is_featured', false)
    .eq('status', 'Active')
    .order('created_at', { ascending: false });

  if (filters.query) {
    query = query.or(`title.ilike.%${filters.query}%,location.ilike.%${filters.query}%`);
  }
  if (filters.location) {
    query = query.ilike('location', `%${filters.location}%`);
  }
  if (filters.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.propertyType && filters.propertyType !== 'Any Type') {
    query = query.eq('category', filters.propertyType);
  }
  if (filters.beds && filters.beds > 0) {
    query = query.gte('beds', filters.beds);
  }
  if (filters.baths && filters.baths > 0) {
    query = query.gte('baths', filters.baths);
  }
  if (filters.amenities) {
    const amenitiesList = filters.amenities.split(',');
    query = query.contains('amenities', amenitiesList);
  }

  const { data, error, count } = await query.limit(limit);

  if (error) {
    console.error('Error fetching new properties:', error);
    return { data: [], count: 0 };
  }
  return { data: data as Property[], count: count || 0 };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ 
    limit?: string; 
    query?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    propertyType?: string;
    beds?: string;
    baths?: string;
    amenities?: string;
  }>;
}) {
  const params = await searchParams;
  const limit = Number(params.limit) || 4;
  const nextLimit = limit + 4;

  const tHero = await getTranslations('Hero');
  const tFilters = await getTranslations('Filters');
  const tHome = await getTranslations('Home');
  const tCommon = await getTranslations('Common');
  const tNavbar = await getTranslations('Navbar');

  // Determine if any filter is active (ignoring the pagination limit)
  const isFiltered = Object.keys(params).some(key => 
    key !== 'limit' && params[key as keyof typeof params] !== undefined
  );

  const featured = await getFeaturedProperties();
  const { data: newInMarket, count } = await getNewInMarketProperties(limit, params);
  
  const hasMore = count > limit;

  return (
    <div className="min-h-screen bg-clear-day">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic leading-tight">
              {tHero('title_start')}
              <span className="relative inline-block">
                <span className="relative z-10 font-medium">{tHero('sanctuary')}</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
              </span>
              {tHero('title_end')}
            </h1>
            
            <HomeFilters />
          </div>
        </section>

        {/* Featured Collections - Hidden when filters are applied to focus on search results */}
        {!isFiltered && featured.length > 0 && (
          <section className="mb-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-light text-nordic">{tHome('featured_collections')}</h2>
                <p className="text-nordic/60 mt-1 text-sm">{tHome('featured_subtitle')}</p>
              </div>
              <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#">
                {tCommon('view_all')} <span className="material-icons text-sm">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featured.map((prop) => (
                <Link key={prop.id} href={`/property/${prop.slug}`}>
                  <div className="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer h-full">
                    <div className="aspect-[4/3] w-full overflow-hidden relative">
                      <img 
                        alt={prop.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={prop.images[0]} 
                      />
                      {prop.tag && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic">
                          {prop.tag === 'Premium' ? tCommon('premium') : prop.tag}
                        </div>
                      )}
                      <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic hover:bg-mosque hover:text-white transition-all">
                        <span className="material-icons text-xl">favorite_border</span>
                      </button>
                      <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                    </div>
                    <div className="p-6 relative">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-medium text-nordic group-hover:text-mosque transition-colors">{prop.title}</h3>
                          <p className="text-nordic/60 text-sm flex items-center gap-1 mt-1">
                            <span className="material-icons text-sm">place</span> {prop.location}
                          </p>
                        </div>
                        <span className="text-xl font-semibold text-mosque">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(prop.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 mt-6 pt-6 border-t border-nordic/5">
                        <div className="flex items-center gap-2 text-nordic/60 text-sm">
                          <span className="material-icons text-lg">king_bed</span> {prop.beds} {tCommon('beds')}
                        </div>
                        <div className="flex items-center gap-2 text-nordic/60 text-sm">
                          <span className="material-icons text-lg">bathtub</span> {prop.baths} {tCommon('baths')}
                        </div>
                        <div className="flex items-center gap-2 text-nordic/60 text-sm">
                          <span className="material-icons text-lg">square_foot</span> {prop.area} {tCommon('sqm')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Results Section */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic">
                {isFiltered ? tHome('search_results') : tHome('new_in_market')}
              </h2>
              <p className="text-nordic/60 mt-1 text-sm">
                {isFiltered 
                  ? tHome('results_found', { count }) 
                  : tHome('new_in_market_subtitle')}
              </p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic text-white shadow-sm">{tFilters('all')}</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic/60 hover:text-nordic">{tNavbar('buy')}</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic/60 hover:text-nordic">{tNavbar('rent')}</button>
            </div>
          </div>
          
          {newInMarket.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newInMarket.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
              <span className="material-icons text-nordic/20 text-6xl mb-4">search_off</span>
              <h3 className="text-xl font-medium text-nordic">{tHome('no_results')}</h3>
              <p className="text-nordic/60 mt-2">{tHome('no_results_subtitle')}</p>
            </div>
          )}

          {hasMore && (
            <div className="mt-12 text-center">
              <Link 
                href={`/?${new URLSearchParams({...params, limit: nextLimit.toString()}).toString()}`} 
                scroll={false}
                className="inline-block px-8 py-3 bg-white border border-nordic/10 hover:border-mosque hover:text-mosque text-nordic font-medium rounded-lg transition-all hover:shadow-md"
              >
                {tHome('load_more')}
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
