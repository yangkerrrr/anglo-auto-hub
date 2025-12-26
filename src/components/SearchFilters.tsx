import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarListing } from "@/data/carListings";

interface SearchFiltersProps {
  cars: CarListing[];
  onFilterChange: (filteredCars: CarListing[]) => void;
}

const SearchFilters = ({ cars, onFilterChange }: SearchFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [make, setMake] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [bodyType, setBodyType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const makes = useMemo(() => {
    const uniqueMakes = [...new Set(cars.map((car) => car.make))].sort();
    return uniqueMakes;
  }, [cars]);

  const bodyTypes = useMemo(() => {
    const uniqueTypes = [...new Set(cars.map((car) => car.bodyType))].sort();
    return uniqueTypes;
  }, [cars]);

  // Compute filtered cars
  const filteredCars = useMemo(() => {
    let filtered = cars.filter((car) => !car.sold);

    // Search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (car) =>
          car.title.toLowerCase().includes(term) ||
          car.make.toLowerCase().includes(term) ||
          car.model.toLowerCase().includes(term)
      );
    }

    // Make filter
    if (make && make !== "all") {
      filtered = filtered.filter((car) => car.make === make);
    }

    // Price range filter
    if (priceRange && priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((car) => car.price >= min && car.price <= max);
    }

    // Body type filter
    if (bodyType && bodyType !== "all") {
      filtered = filtered.filter((car) => car.bodyType === bodyType);
    }

    return filtered;
  }, [searchTerm, make, priceRange, bodyType, cars]);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange(filteredCars);
  }, [filteredCars, onFilterChange]);

  const clearFilters = () => {
    setSearchTerm("");
    setMake("all");
    setPriceRange("all");
    setBodyType("all");
  };

  const hasActiveFilters = searchTerm || make !== "all" || priceRange !== "all" || bodyType !== "all";

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      {/* Search bar */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search make, model, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="icon"
          className="h-12 w-12 shrink-0"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border animate-fade-in">
          <Select value={make} onValueChange={setMake}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              {makes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Price</SelectItem>
              <SelectItem value="0-200000">Under R200,000</SelectItem>
              <SelectItem value="200000-400000">R200,000 - R400,000</SelectItem>
              <SelectItem value="400000-600000">R400,000 - R600,000</SelectItem>
              <SelectItem value="600000-1000000">R600,000 - R1,000,000</SelectItem>
              <SelectItem value="1000000-10000000">Over R1,000,000</SelectItem>
            </SelectContent>
          </Select>

          <Select value={bodyType} onValueChange={setBodyType}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Body Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {bodyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Active filters */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive hover:text-destructive">
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
