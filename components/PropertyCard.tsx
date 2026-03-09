interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  image: string;
  type?: string;
  period?: string;
}

export default function PropertyCard({
  title,
  location,
  price,
  beds,
  baths,
  area,
  image,
  type,
  period
}: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
        />
        <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic">
          <span className="material-icons text-lg">favorite_border</span>
        </button>
        {type && (
          <div className={`absolute bottom-3 left-3 ${type === 'FOR RENT' ? 'bg-mosque/90' : 'bg-nordic/90'} text-white text-xs font-bold px-2 py-1 rounded`}>
            {type}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic">
            {formattedPrice}
            {period && <span className="text-sm font-normal text-nordic/60">/{period}</span>}
          </h3>
        </div>
        <h4 className="text-nordic font-medium truncate mb-1">{title}</h4>
        <p className="text-nordic/60 text-xs mb-4">{location}</p>
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-nordic/60 text-xs">
            <span className="material-icons text-sm text-mosque/80">king_bed</span> {beds}
          </div>
          <div className="flex items-center gap-1 text-nordic/60 text-xs">
            <span className="material-icons text-sm text-mosque/80">bathtub</span> {baths}
          </div>
          <div className="flex items-center gap-1 text-nordic/60 text-xs">
            <span className="material-icons text-sm text-mosque/80">square_foot</span> {area}m²
          </div>
        </div>
      </div>
    </article>
  );
}
