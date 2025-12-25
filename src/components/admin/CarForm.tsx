import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarListing } from "@/data/carListings";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CarFormProps {
  initialData?: CarListing;
  onSubmit: (data: Omit<CarListing, "id" | "createdAt">) => void;
  isEditing?: boolean;
}

const CarForm = ({ initialData, onSubmit, isEditing = false }: CarFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    make: initialData?.make || "",
    model: initialData?.model || "",
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    imageUrl: initialData?.imageUrl || "",
    fuelType: initialData?.fuelType || "Petrol",
    transmission: initialData?.transmission || "Automatic",
    bodyType: initialData?.bodyType || "Sedan",
    color: initialData?.color || "",
    description: initialData?.description || "",
    features: initialData?.features?.join(", ") || "",
    sold: initialData?.sold || false,
  });
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);

  const handleGetAIPrice = async () => {
    if (!formData.make || !formData.model || !formData.year) {
      toast({
        title: "Missing information",
        description: "Please fill in make, model, and year first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingPrice(true);
    try {
      const params = new URLSearchParams({
        make: formData.make,
        model: formData.model,
        year: formData.year.toString(),
        mileage: formData.mileage.toString(),
        fuelType: formData.fuelType,
        transmission: formData.transmission,
        bodyType: formData.bodyType,
        color: formData.color,
      });

      const response = await fetch(`https://server.yingnetwork.online/api/recommend-price?${params}`);
      
      if (!response.ok) {
        throw new Error("Failed to get price recommendation");
      }

      const data = await response.json();
      
      if (data.recommendedPrice) {
        setFormData({ ...formData, price: data.recommendedPrice });
        toast({
          title: "Price recommended",
          description: `AI suggests R${data.recommendedPrice.toLocaleString()}${data.confidence ? ` (${Math.round(data.confidence * 100)}% confidence)` : ""}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not get price recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingPrice(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      features: formData.features.split(",").map((f) => f.trim()).filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Make *</label>
          <Input
            placeholder="e.g., Mercedes Benz"
            value={formData.make}
            onChange={(e) => setFormData({ ...formData, make: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Model *</label>
          <Input
            placeholder="e.g., C300 AMG"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Full Title *</label>
        <Input
          placeholder="e.g., 2019 Mercedes Benz C300 AMG Auto, with FSH"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Year *</label>
          <Input
            type="number"
            min={1990}
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
            required
          />
        </div>
      <div>
        <label className="block text-sm font-medium mb-2">Price (R) *</label>
        <div className="flex gap-2">
          <Input
            type="number"
            min={0}
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
            required
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleGetAIPrice}
            disabled={isLoadingPrice}
          >
            {isLoadingPrice ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="ml-1">AI Price</span>
          </Button>
        </div>
      </div>
        <div>
          <label className="block text-sm font-medium mb-2">Mileage (km) *</label>
          <Input
            type="number"
            min={0}
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image URL *</label>
        <Input
          type="url"
          placeholder="https://example.com/image.jpg"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Fuel Type</label>
          <Select
            value={formData.fuelType}
            onValueChange={(value) => setFormData({ ...formData, fuelType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Transmission</label>
          <Select
            value={formData.transmission}
            onValueChange={(value) => setFormData({ ...formData, transmission: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="DSG">DSG</SelectItem>
              <SelectItem value="CVT">CVT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Body Type</label>
          <Select
            value={formData.bodyType}
            onValueChange={(value) => setFormData({ ...formData, bodyType: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="Hatchback">Hatchback</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Coupe">Coupe</SelectItem>
              <SelectItem value="Bakkie">Bakkie</SelectItem>
              <SelectItem value="Double Cab">Double Cab</SelectItem>
              <SelectItem value="Wagon">Wagon</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <Input
            placeholder="e.g., Silver"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          placeholder="Describe the vehicle condition, history, etc."
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Features (comma separated)</label>
        <Input
          placeholder="e.g., Leather Seats, Navigation, Sunroof"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        />
      </div>

      <Button type="submit" className="w-full">
        {isEditing ? "Update Vehicle" : "Add Vehicle"}
      </Button>
    </form>
  );
};

export default CarForm;
