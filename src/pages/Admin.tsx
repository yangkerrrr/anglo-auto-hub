import { useState } from "react";
import { Plus, Pencil, Trash2, Car, Eye, EyeOff, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarForm from "@/components/admin/CarForm";
import { initialCarListings, CarListing } from "@/data/carListings";
import { Link } from "react-router-dom";

const Admin = () => {
  const { toast } = useToast();
  const [cars, setCars] = useState<CarListing[]>(initialCarListings);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCar, setEditingCar] = useState<CarListing | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleAddCar = (carData: Omit<CarListing, "id" | "createdAt">) => {
    const newCar: CarListing = {
      ...carData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setCars([newCar, ...cars]);
    setIsAddDialogOpen(false);
    toast({
      title: "Success!",
      description: "Vehicle added successfully.",
    });
  };

  const handleEditCar = (carData: Omit<CarListing, "id" | "createdAt">) => {
    if (!editingCar) return;
    const updatedCars = cars.map((car) =>
      car.id === editingCar.id
        ? { ...carData, id: editingCar.id, createdAt: editingCar.createdAt }
        : car
    );
    setCars(updatedCars);
    setIsEditDialogOpen(false);
    setEditingCar(null);
    toast({
      title: "Success!",
      description: "Vehicle updated successfully.",
    });
  };

  const handleDeleteCar = (id: string) => {
    setCars(cars.filter((car) => car.id !== id));
    toast({
      title: "Deleted",
      description: "Vehicle removed from inventory.",
    });
  };

  const toggleSoldStatus = (id: string) => {
    setCars(
      cars.map((car) =>
        car.id === id ? { ...car, sold: !car.sold } : car
      )
    );
    toast({
      title: "Status Updated",
      description: "Vehicle status has been updated.",
    });
  };

  const availableCount = cars.filter((c) => !c.sold).length;
  const soldCount = cars.filter((c) => c.sold).length;

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground">Manage your vehicle inventory</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4" />
                  Add Vehicle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Vehicle</DialogTitle>
                </DialogHeader>
                <CarForm onSubmit={handleAddCar} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Vehicles</p>
                  <p className="font-display text-2xl font-bold">{cars.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="font-display text-2xl font-bold">{availableCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <EyeOff className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sold</p>
                  <p className="font-display text-2xl font-bold">{soldCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">Vehicle</th>
                    <th className="text-left p-4 font-semibold text-sm">Year</th>
                    <th className="text-left p-4 font-semibold text-sm">Price</th>
                    <th className="text-left p-4 font-semibold text-sm">Mileage</th>
                    <th className="text-left p-4 font-semibold text-sm">Status</th>
                    <th className="text-right p-4 font-semibold text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCars.map((car) => (
                    <tr key={car.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={car.imageUrl}
                            alt={car.title}
                            className="h-12 w-16 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=100&h=75&fit=crop";
                            }}
                          />
                          <div>
                            <p className="font-semibold text-sm">{car.make}</p>
                            <p className="text-muted-foreground text-sm">{car.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{car.year}</td>
                      <td className="p-4 font-semibold text-sm">{formatPrice(car.price)}</td>
                      <td className="p-4 text-sm text-muted-foreground">
                        {car.mileage.toLocaleString()} km
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={car.sold ? "secondary" : "default"}
                          className={car.sold ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}
                        >
                          {car.sold ? "Sold" : "Available"}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleSoldStatus(car.id)}
                            title={car.sold ? "Mark as Available" : "Mark as Sold"}
                          >
                            {car.sold ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </Button>
                          <Dialog open={isEditDialogOpen && editingCar?.id === car.id} onOpenChange={(open) => {
                            setIsEditDialogOpen(open);
                            if (!open) setEditingCar(null);
                          }}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingCar(car);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Vehicle</DialogTitle>
                              </DialogHeader>
                              {editingCar && (
                                <CarForm
                                  initialData={editingCar}
                                  onSubmit={handleEditCar}
                                  isEditing
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Vehicle?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently remove "{car.make} {car.model}" from your inventory. This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteCar(car.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredCars.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No vehicles found</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
