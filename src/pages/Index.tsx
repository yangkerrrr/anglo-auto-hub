import { Link } from "react-router-dom";
import { ArrowRight, Shield, Banknote, Car, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { initialCarListings } from "@/data/carListings";

const Index = () => {
  // Get featured cars (first 6 available)
  const featuredCars = initialCarListings.filter((car) => !car.sold).slice(0, 6);

  const benefits = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every vehicle undergoes thorough inspection before sale",
    },
    {
      icon: Banknote,
      title: "Flexible Finance",
      description: "Finance with all major banks. No driver's license needed",
    },
    {
      icon: Car,
      title: "Wide Selection",
      description: "Premium pre-owned vehicles from top manufacturers",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative hero-gradient text-primary-foreground overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative py-20 md:py-32">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-fade-in">
              Welcome to Anglo Auto
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up">
              Find Your Perfect
              <span className="block text-accent">Pre-Owned Vehicle</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl animate-slide-up stagger-1">
              Great prices on quality pre-owned vehicles. Finance available with all major banks. 
              No driver's license needed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-2">
              <Link to="/showroom">
                <Button variant="hero" size="xl">
                  Browse Inventory
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="heroOutline" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-primary-foreground/10 animate-fade-in stagger-3">
              {[
                "Quality Pre-Owned",
                "Bank Finance Available",
                "Trade-ins Welcome",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className={`flex items-start gap-4 p-6 bg-card rounded-xl border border-border shadow-sm animate-slide-up stagger-${index + 1}`}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Showroom</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
              Featured Vehicles
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our hand-picked selection of premium pre-owned vehicles. 
              Quality assured with full service history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/showroom">
              <Button size="lg">
                View All Vehicles
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-primary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Next Car?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Visit our showroom at 35 Belgravia Road, Athlone or give us a call. 
            We're here to help you find the perfect vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0216971063">
              <Button variant="hero" size="lg">
                Call 021 697 1063
              </Button>
            </a>
            <Link to="/showroom">
              <Button variant="heroOutline" size="lg">
                Browse Online
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
