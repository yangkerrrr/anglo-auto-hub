import { useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import SearchFilters from "@/components/SearchFilters";
import { initialCarListings, CarListing } from "@/data/carListings";

const Showroom = () => {
  const availableCars = initialCarListings.filter((car) => !car.sold);
  const [filteredCars, setFilteredCars] = useState<CarListing[]>(availableCars);

  const handleFilterChange = useCallback((cars: CarListing[]) => {
    setFilteredCars(cars);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 bg-secondary/30">
        <div className="container">
          {/* Page Header */}
          <div className="mb-8">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Our Inventory
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Cars for Sale
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Browse our selection of quality pre-owned vehicles. All cars come with 
              full service history and our quality guarantee.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <SearchFilters cars={availableCars} onFilterChange={handleFilterChange} />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCars.length}</span> vehicles
            </p>
          </div>

          {/* Cars Grid */}
          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <svg
                  className="h-12 w-12 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-2">No vehicles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Showroom;
