export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  imageUrl: string;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  description: string;
  features: string[];
  sold: boolean;
  createdAt: string;
}

// Imported from angloauto.co.za - Currently available vehicles
export const initialCarListings: CarListing[] = [
  {
    id: "1",
    title: "2019 Mercedes Benz C300 AMG Auto, with FSH",
    make: "Mercedes Benz",
    model: "C300 AMG",
    year: 2019,
    price: 429999,
    mileage: 114000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/1-400x250.jpg",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Silver",
    description: "Stunning Mercedes Benz C300 AMG with full service history. Excellent condition inside and out.",
    features: ["AMG Package", "Leather Seats", "Navigation", "Bluetooth", "Cruise Control", "Parking Sensors"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "2",
    title: "2024 BMW X3 XDrive 2.0D MSPORT A/T",
    make: "BMW",
    model: "X3 MSPORT",
    year: 2024,
    price: 849999,
    mileage: 14000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/01-400x250.jpeg",
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Black",
    description: "Nearly new BMW X3 with balance of maintenance plan till 2029 or 100,000kms.",
    features: ["M Sport Package", "Panoramic Roof", "Heated Seats", "360 Camera", "Adaptive Cruise", "Harman Kardon"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "3",
    title: "2019 Ford Fiesta 1.0 EcoBoost Titanium Auto",
    make: "Ford",
    model: "Fiesta Titanium",
    year: 2019,
    price: 199999,
    mileage: 52000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/IMG_9430-400x250.jpg",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Hatchback",
    color: "Red",
    description: "Economical Ford Fiesta EcoBoost with full service history. Perfect city car.",
    features: ["Sync 3", "Apple CarPlay", "Rear Camera", "Cruise Control", "Alloy Wheels"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "4",
    title: "2016 Volkswagen Golf 7 1.4 TSI DSG RLINE",
    make: "Volkswagen",
    model: "Golf 7 RLINE",
    year: 2016,
    price: 229999,
    mileage: 152000,
    imageUrl: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=250&fit=crop",
    fuelType: "Petrol",
    transmission: "DSG",
    bodyType: "Hatchback",
    color: "White",
    description: "VW Golf 7 R-Line with full service history from VW. Well maintained.",
    features: ["R-Line Package", "DSG Transmission", "Touchscreen", "Bluetooth", "Sport Seats"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "5",
    title: "2020 Mercedes Benz CLA 200 AMG Auto",
    make: "Mercedes Benz",
    model: "CLA 200 AMG",
    year: 2020,
    price: 559999,
    mileage: 60000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/IMG_9225-400x250.jpg",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "White",
    description: "Beautiful Mercedes CLA 200 AMG with full service history from Mercedes Benz.",
    features: ["AMG Line", "MBUX System", "Ambient Lighting", "Keyless Entry", "LED Headlights"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "6",
    title: "2018 Volkswagen Polo 1.0 TSI Trendline",
    make: "Volkswagen",
    model: "Polo TSI",
    year: 2018,
    price: 179999,
    mileage: 135000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/1-4-400x250.jpeg",
    fuelType: "Petrol",
    transmission: "Manual",
    bodyType: "Hatchback",
    color: "Silver",
    description: "Reliable VW Polo with full service history. Economical and practical.",
    features: ["Air Conditioning", "Electric Windows", "Central Locking", "USB Port"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "7",
    title: "2019 Volkswagen Tiguan 2.0 TDI 4Motion DSG ALLSPACE RLINE",
    make: "Volkswagen",
    model: "Tiguan Allspace RLINE",
    year: 2019,
    price: 419999,
    mileage: 112000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/1-3-400x250.jpeg",
    fuelType: "Diesel",
    transmission: "DSG",
    bodyType: "SUV",
    color: "Grey",
    description: "Spacious 7-seater Tiguan Allspace R-Line with full service history.",
    features: ["7 Seats", "R-Line Package", "4Motion AWD", "Panoramic Roof", "Navigation"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "8",
    title: "2019 Volkswagen Tiguan 2.0 TDI 4Motion DSG Highline RLINE",
    make: "Volkswagen",
    model: "Tiguan Highline RLINE",
    year: 2019,
    price: 409999,
    mileage: 141000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/1-2-400x250.jpeg",
    fuelType: "Diesel",
    transmission: "DSG",
    bodyType: "SUV",
    color: "White",
    description: "VW Tiguan Highline R-Line with full service history from VW.",
    features: ["R-Line Package", "Highline Spec", "4Motion AWD", "Leather Interior", "Digital Cockpit"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "9",
    title: "2020 Mercedes Benz GLA 200 with FSH",
    make: "Mercedes Benz",
    model: "GLA 200",
    year: 2020,
    price: 359999,
    mileage: 93000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/12/1-1-400x250.jpeg",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "Black",
    description: "Compact luxury SUV with full service history. Great urban crossover.",
    features: ["MBUX System", "Reverse Camera", "Keyless Entry", "LED Lights", "Dual Zone Climate"],
    sold: false,
    createdAt: "2024-12-01"
  },
  {
    id: "10",
    title: "2020 Mercedes Benz CLA 45S 4 Matic+ Auto",
    make: "Mercedes Benz",
    model: "CLA 45S AMG",
    year: 2020,
    price: 909999,
    mileage: 25000,
    imageUrl: "https://angloauto.co.za/wp-content/uploads/2025/11/1-3-400x250.jpeg",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Grey",
    description: "High-performance CLA 45S AMG with full service history from Mercedes Benz. 421hp beast!",
    features: ["AMG Performance", "421hp", "4Matic+", "Track Pace App", "Performance Exhaust", "AMG Bucket Seats"],
    sold: false,
    createdAt: "2024-11-01"
  },
  {
    id: "11",
    title: "2021 Audi A3 Sedan 35 TFSI S-Line",
    make: "Audi",
    model: "A3 S-Line",
    year: 2021,
    price: 489999,
    mileage: 45000,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=250&fit=crop",
    fuelType: "Petrol",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Blue",
    description: "Stylish Audi A3 S-Line with virtual cockpit and premium features.",
    features: ["S-Line Package", "Virtual Cockpit", "MMI Navigation", "Bang & Olufsen", "Matrix LED"],
    sold: false,
    createdAt: "2024-11-15"
  },
  {
    id: "12",
    title: "2022 Toyota Fortuner 2.8 GD-6 4x4 VX Auto",
    make: "Toyota",
    model: "Fortuner VX",
    year: 2022,
    price: 749999,
    mileage: 38000,
    imageUrl: "https://images.unsplash.com/photo-1625231334168-30165a1c0001?w=400&h=250&fit=crop",
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "SUV",
    color: "White",
    description: "Legendary Toyota Fortuner VX with 4x4 capability. Perfect for adventure.",
    features: ["4x4 System", "7 Seats", "Leather Interior", "JBL Sound", "Terrain Management"],
    sold: false,
    createdAt: "2024-11-20"
  }
];
