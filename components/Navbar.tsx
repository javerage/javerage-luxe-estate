import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-nordic/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-nordic flex items-center justify-center">
              <span className="material-icons text-white text-lg">apartment</span>
            </div>
            <span className="text-xl font-semibold tracking-tight text-nordic">LuxeEstate</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a className="text-mosque font-medium text-sm border-b-2 border-mosque px-1 py-1" href="#">Buy</a>
            <a className="text-nordic/70 hover:text-nordic font-medium text-sm hover:border-b-2 hover:border-nordic/20 px-1 py-1 transition-all" href="#">Rent</a>
            <a className="text-nordic/70 hover:text-nordic font-medium text-sm hover:border-b-2 hover:border-nordic/20 px-1 py-1 transition-all" href="#">Sell</a>
            <a className="text-nordic/70 hover:text-nordic font-medium text-sm hover:border-b-2 hover:border-nordic/20 px-1 py-1 transition-all" href="#">Saved Homes</a>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-nordic hover:text-mosque transition-colors">
              <span className="material-icons">search</span>
            </button>
            <button className="text-nordic hover:text-mosque transition-colors relative">
              <span className="material-icons">notifications_none</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
            </button>
            <button className="flex items-center gap-2 pl-2 border-l border-nordic/10 ml-2">
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
