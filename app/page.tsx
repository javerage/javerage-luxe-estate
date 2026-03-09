import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import propertiesData from "@/lib/data/properties.json";

export default function Home() {
  const { featured, newInMarket } = propertiesData;

  return (
    <div className="min-h-screen bg-clear-day">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-nordic leading-tight">
              Find your <span className="relative inline-block">
                <span className="relative z-10 font-medium">sanctuary</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
              </span>.
            </h1>
            
            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-icons text-nordic/40 text-2xl group-focus-within:text-mosque transition-colors">search</span>
              </div>
              <input 
                className="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic shadow-soft placeholder-nordic/40 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg" 
                placeholder="Search by city, neighborhood, or address..." 
                type="text"
              />
              <button className="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20">
                Search
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
              <button className="whitespace-nowrap px-5 py-2 rounded-full bg-nordic text-white text-sm font-medium shadow-lg shadow-nordic/10 transition-transform hover:-translate-y-0.5">
                All
              </button>
              {['House', 'Apartment', 'Villa', 'Penthouse'].map((cat) => (
                <button key={cat} className="whitespace-nowrap px-5 py-2 rounded-full bg-white border border-nordic/5 text-nordic/60 hover:text-nordic hover:border-mosque/50 text-sm font-medium transition-all hover:bg-mosque/5">
                  {cat}
                </button>
              ))}
              <div className="w-px h-6 bg-nordic/10 mx-2"></div>
              <button className="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic font-medium text-sm hover:bg-black/5 transition-colors">
                <span className="material-icons text-base">tune</span> Filters
              </button>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="mb-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic">Featured Collections</h2>
              <p className="text-nordic/60 mt-1 text-sm">Curated properties for the discerning eye.</p>
            </div>
            <a className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity" href="#">
              View all <span className="material-icons text-sm">arrow_forward</span>
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map((prop) => (
              <div key={prop.id} className="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer">
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img 
                    alt={prop.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src={prop.image} 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic">
                    {prop.tag}
                  </div>
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
                      <span className="material-icons text-lg">king_bed</span> {prop.beds} Beds
                    </div>
                    <div className="flex items-center gap-2 text-nordic/60 text-sm">
                      <span className="material-icons text-lg">bathtub</span> {prop.baths} Baths
                    </div>
                    <div className="flex items-center gap-2 text-nordic/60 text-sm">
                      <span className="material-icons text-lg">square_foot</span> {prop.area} m²
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New in Market */}
        <section>
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl font-light text-nordic">New in Market</h2>
              <p className="text-nordic/60 mt-1 text-sm">Fresh opportunities added this week.</p>
            </div>
            <div className="hidden md:flex bg-white p-1 rounded-lg">
              <button className="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic text-white shadow-sm">All</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic/60 hover:text-nordic">Buy</button>
              <button className="px-4 py-1.5 rounded-md text-sm font-medium text-nordic/60 hover:text-nordic">Rent</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newInMarket.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white border border-nordic/10 hover:border-mosque hover:text-mosque text-nordic font-medium rounded-lg transition-all hover:shadow-md">
              Load more properties
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
