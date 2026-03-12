import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/server";
import { Property } from "@/lib/types";
import { notFound } from "next/navigation";
import PropertyDetailsMap from "@/components/PropertyDetailsMap";
import { getTranslations } from 'next-intl/server';
import Image from "next/image";

async function getPropertyBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'Active')
    .single();

  if (error || !data) {
    return null;
  }
  return data as Property;
}

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  const t = await getTranslations('PropertyDetails');
  const tCommon = await getTranslations('Common');

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="min-h-screen bg-[#EEF6F6] text-[#19322F] selection:bg-[#006655]/20 font-display antialiased">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl shadow-sm group">
              <Image 
                alt={property.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={property.images[0]} 
                width={800}
                height={500}
                priority
              />
              <div className="absolute top-4 left-4 flex gap-2">
                {property.is_featured && (
                  <span className="bg-[#006655] text-white text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">{tCommon('premium')}</span>
                )}
                <span className="bg-white/90 backdrop-blur text-[#19322F] text-xs font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">New</span>
              </div>
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#19322F] px-4 py-2 rounded-lg text-sm font-medium shadow-lg backdrop-blur transition-all flex items-center gap-2">
                <span className="material-icons text-sm">grid_view</span>
                {t('view_all_photos')}
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
              {property.images.map((img, idx) => (
                <div key={idx} className={`flex-none w-48 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer ring-offset-2 ring-offset-[#EEF6F6] snap-start transition-all ${idx === 0 ? 'ring-2 ring-[#006655]' : 'opacity-70 hover:opacity-100'}`}>
                  <Image 
                    alt={`${property.title} view ${idx + 1}`} 
                    className="w-full h-full object-cover" 
                    src={img} 
                    width={200}
                    height={150}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Info */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-[#006655]/5">
                <div className="mb-4">
                  <h1 className="text-4xl font-light text-[#19322F] mb-2">{formattedPrice}</h1>
                  <p className="text-[#19322F]/60 font-medium flex items-center gap-1">
                    <span className="material-icons text-[#006655] text-sm">location_on</span>
                    {property.location}
                  </p>
                </div>
                <div className="h-px bg-slate-100 my-6"></div>
                
                {/* Agent Info */}
                <div className="flex items-center gap-4 mb-6">
                  <Image 
                    alt="Sarah Jenkins" 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4TxUmdQRb2VMjuaNxLEwLorv_dgHzoET2_wL5toSvew6nhtziaR3DX-U69DBN7J74yO6oKokpw8tqEFutJf13MeXghCy7FwZuAxnoJel6FYcKeCRUVinpZtrNnkZvXd-MY5_2MAtRD7JP5BieHixfCaeAPW04jm-y-nvF3HIrwcZ_HRDk_MrNP5WiPV3u9zNrEgM-SQoWGh4xLVSV444aZAbVl03mjjsW5WBpIeodCyqJxprTDp6Q157D06VxcdUSCf-l9UKQT-w" 
                    width={56}
                    height={56}
                  />
                  <div>
                    <h3 className="font-semibold text-[#19322F]">Sarah Jenkins</h3>
                    <div className="flex items-center gap-1 text-xs text-[#006655] font-medium">
                      <span className="material-icons text-[14px]">star</span>
                      <span>{t('top_rated_agent')}</span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2 rounded-full bg-[#006655]/10 text-[#006655] hover:bg-[#006655] hover:text-white transition-colors">
                      <span className="material-icons text-sm">chat</span>
                    </button>
                    <button className="p-2 rounded-full bg-[#006655]/10 text-[#006655] hover:bg-[#006655] hover:text-white transition-colors">
                      <span className="material-icons text-sm">call</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-[#006655] hover:bg-[#005544] text-white py-4 px-6 rounded-lg font-medium transition-all shadow-lg shadow-[#006655]/20 flex items-center justify-center gap-2 group">
                    <span className="material-icons text-xl group-hover:scale-110 transition-transform">calendar_today</span>
                    {t('schedule_visit')}
                  </button>
                  <button className="w-full bg-transparent border border-[#19322F]/10 hover:border-[#006655] text-[#19322F]/80 hover:text-[#006655] py-4 px-6 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                    <span className="material-icons text-xl">mail_outline</span>
                    {t('contact_agent')}
                  </button>
                </div>
              </div>

              {/* Map Component */}
              <div className="bg-white p-2 rounded-xl shadow-sm border border-[#006655]/5">
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-100">
                   <PropertyDetailsMap location={property.location} />
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-40">
                    <div className="w-8 h-8 bg-[#006655] rounded-full border-4 border-white shadow-lg animate-bounce flex items-center justify-center">
                      <span className="material-icons text-white text-sm">home</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Features */}
          <div className="lg:col-span-8 lg:row-start-2 -mt-8 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#006655]/5">
              <h2 className="text-lg font-semibold mb-6 text-[#19322F]">{t('property_features')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center justify-center p-4 bg-[#006655]/5 rounded-lg border border-[#006655]/10">
                  <span className="material-icons text-[#006655] text-2xl mb-2">square_foot</span>
                  <span className="text-xl font-bold text-[#19322F]">{property.area}</span>
                  <span className="text-xs uppercase tracking-wider text-[#19322F]/50">{t('sqm_full')}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#006655]/5 rounded-lg border border-[#006655]/10">
                  <span className="material-icons text-[#006655] text-2xl mb-2">bed</span>
                  <span className="text-xl font-bold text-[#19322F]">{property.beds}</span>
                  <span className="text-xs uppercase tracking-wider text-[#19322F]/50">{t('bedrooms')}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#006655]/5 rounded-lg border border-[#006655]/10">
                  <span className="material-icons text-[#006655] text-2xl mb-2">shower</span>
                  <span className="text-xl font-bold text-[#19322F]">{property.baths}</span>
                  <span className="text-xs uppercase tracking-wider text-[#19322F]/50">{t('bathrooms')}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#006655]/5 rounded-lg border border-[#006655]/10">
                  <span className="material-icons text-[#006655] text-2xl mb-2">directions_car</span>
                  <span className="text-xl font-bold text-[#19322F]">2</span>
                  <span className="text-xs uppercase tracking-wider text-[#19322F]/50">{t('garage')}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#006655]/5">
              <h2 className="text-lg font-semibold mb-4 text-[#19322F]">{t('about_this_home')}</h2>
              <div className="prose prose-slate max-w-none text-[#19322F]/70 leading-relaxed">
                <p className="mb-4">
                  {t('description_p1', { location: property.location })}
                </p>
                <p>
                  {t('description_p2')}
                </p>
              </div>
              <button className="mt-4 text-[#006655] font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                {tCommon('read_more')}
                <span className="material-icons text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-[#006655]/5">
              <h2 className="text-lg font-semibold mb-6 text-[#19322F]">{t('amenities')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                {(property.amenities && property.amenities.length > 0 ? property.amenities : ['Smart Home System', 'Swimming Pool', 'Central Heating & Cooling', 'Electric Vehicle Charging', 'Private Gym', 'Wine Cellar']).map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-[#19322F]/70">
                    <span className="material-icons text-[#006655]/60 text-sm">check_circle</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#006655]/5 p-6 rounded-xl border border-[#006655]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-full text-[#006655] shadow-sm">
                  <span className="material-icons">calculate</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#19322F]">{t('estimated_payment')}</h3>
                  <p className="text-sm text-[#19322F]/60">
                    {t('starting_from', { amount: '$5,430', down_payment: '20' })}
                  </p>
                </div>
              </div>
              <button className="whitespace-nowrap px-4 py-2 bg-white border border-[#19322F]/10 rounded-lg text-sm font-semibold hover:border-[#006655] transition-colors text-[#19322F]">
                {t('calculate_mortgage')}
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-[#19322F]/50">
            © 2026 LuxeEstate Inc. {t('all_rights_reserved')}
          </div>
          <div className="flex gap-6">
            <span className="material-icons text-[#19322F]/40 hover:text-[#006655] cursor-pointer">facebook</span>
            <span className="material-icons text-[#19322F]/40 hover:text-[#006655] cursor-pointer">language</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
