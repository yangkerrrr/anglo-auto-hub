import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, Mail, Gauge, Fuel, Settings2, Calendar, Palette, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCars } from "@/hooks/useCars";

const CarDetail = () => {
  const { id } = useParams();
  const { cars, loading } = useCars();
  const car = cars.find((c) => c.id === id);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            <p className="text-muted-foreground mt-2">Loading vehicle details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <Link to="/showroom">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Showroom
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const specs = [
    { icon: Gauge, label: "Mileage", value: formatMileage(car.mileage) },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Calendar, label: "Year", value: car.year.toString() },
    { icon: Palette, label: "Color", value: car.color },
    { icon: MapPin, label: "Body Type", value: car.bodyType },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 bg-secondary/30">
        <div className="container">
          {/* Breadcrumb */}
          <Link
            to="/showroom"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Showroom
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="space-y-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                <img
                  src={car.imageUrl}
                  alt={car.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop";
                  }}
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                  {car.make}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                  {car.model}
                </h1>
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold text-primary">
                    {formatPrice(car.price)}
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-card p-4 rounded-lg border border-border"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <spec.icon className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {spec.label}
                      </span>
                    </div>
                    <p className="font-semibold">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-display font-bold text-lg mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {car.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-display font-bold text-lg mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-sm">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="bg-card p-6 rounded-xl border border-border">
                <h3 className="font-display font-bold text-lg mb-4">
                  Interested in this vehicle?
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:0216971063" className="flex-1">
                    <Button className="w-full" size="lg">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </Button>
                  </a>
                  <a href="mailto:info@angloauto.co.za" className="flex-1">
                    <Button variant="outline" className="w-full" size="lg">
                      <Mail className="h-4 w-4" />
                      Email Us
                    </Button>
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  35 Belgravia Road, Athlone, Cape Town
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CarDetail;
