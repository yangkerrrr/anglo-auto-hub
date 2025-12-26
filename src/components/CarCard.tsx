import { Car } from "@/hooks/useCars";
import { Link } from "react-router-dom";
import { Gauge, Fuel, Settings2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarCardProps {
  car: Car;
}

const CarCard = ({ car }: CarCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("en-ZA").format(mileage) + " km";
  };

  return (
    <div className="card-automotive group">
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={car.imageUrl}
          alt={car.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=250&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Year badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
          {car.year}
        </div>

        {/* Price overlay on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-display font-bold">
            {formatPrice(car.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Make & Model */}
        <div className="mb-2">
          <span className="text-primary text-sm font-semibold uppercase tracking-wide">
            {car.make}
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {car.model}
        </h3>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Gauge className="h-4 w-4 text-primary" />
            <span className="text-sm">{formatMileage(car.mileage)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Fuel className="h-4 w-4 text-primary" />
            <span className="text-sm">{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Settings2 className="h-4 w-4 text-primary" />
            <span className="text-sm">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm">{car.bodyType}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xs text-muted-foreground">Price</span>
            <p className="font-display font-bold text-xl text-foreground">
              {formatPrice(car.price)}
            </p>
          </div>
          <Link to={`/car/${car.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
