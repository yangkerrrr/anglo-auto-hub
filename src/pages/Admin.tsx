import { useState } from "react";
import { Plus, Pencil, Trash2, Car, Eye, EyeOff, Search, RefreshCw, Database } from "lucide-react";
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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarForm from "@/components/admin/CarForm";
import AdminAuth from "@/components/admin/AdminAuth";
import { useCars, Car as CarType } from "@/hooks/useCars";

const Admin = () => {
  const { cars, loading, error, fetchCars, addCar, updateCar, deleteCar, toggleSoldStatus, initializeTable } = useCars();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingCar, setEditingCar] = useState<CarType | null>(null);
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

  const handleAddCar = async (carData: Omit<CarType, "id" | "createdAt">) => {
    try {
      await addCar(carData);
      setIsAddDialogOpen(false);
    } catch {
      // Error handled in hook
    }
  };

  const handleEditCar = async (carData: Omit<CarType, "id" | "createdAt">) => {
    if (!editingCar) return;
    try {
      await updateCar(editingCar.id, { ...carData, id: editingCar.id, createdAt: editingCar.createdAt });
      setIsEditDialogOpen(false);
      setEditingCar(null);
    } catch {
      // Error handled in hook
    }
  };

  const handleDeleteCar = async (id: string) => {
    try {
      await deleteCar(id);
    } catch {
      // Error handled in hook
    }
  };

  const handleToggleSoldStatus = async (id: string) => {
    try {
      await toggleSoldStatus(id);
    } catch {
      // Error handled in hook
    }
  };

  const availableCount = cars.filter((c) => !c.sold).length;
  const soldCount = cars.filter((c) => c.sold).length;

  return (
    <AdminAuth>
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
            <div className="flex gap-2">
              <Button variant="outline" onClick={initializeTable} title="Initialize database table">
                <Database className="h-4 w-4" />
                Init DB
              </Button>
              <Button variant="outline" onClick={fetchCars} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
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
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-destructive text-sm">{error}</p>
              <p className="text-muted-foreground text-xs mt-1">
                Make sure to click "Init DB" first to create the cars table in your Neon database.
              </p>
            </div>
          )}

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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
              <p className="text-muted-foreground mt-2">Loading vehicles...</p>
            </div>
          )}

          {/* Table */}
          {!loading && (
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
                            onClick={() => handleToggleSoldStatus(car.id)}
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
                <p className="text-muted-foreground text-sm mt-1">
                  Click "Init DB" to create the table, then add your first vehicle.
                </p>
              </div>
            )}
          </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
    </AdminAuth>
  );
};

export default Admin;
