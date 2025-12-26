import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Car {
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

interface DbCar {
  id: number;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  image_url: string;
  fuel_type: string;
  transmission: string;
  body_type: string;
  color: string;
  description: string;
  features: string[];
  sold: boolean;
  created_at: string;
}

const mapDbCarToCar = (dbCar: DbCar): Car => ({
  id: String(dbCar.id),
  title: dbCar.title,
  make: dbCar.make,
  model: dbCar.model,
  year: dbCar.year,
  price: Number(dbCar.price),
  mileage: dbCar.mileage,
  imageUrl: dbCar.image_url,
  fuelType: dbCar.fuel_type,
  transmission: dbCar.transmission,
  bodyType: dbCar.body_type,
  color: dbCar.color,
  description: dbCar.description,
  features: Array.isArray(dbCar.features) ? dbCar.features : [],
  sold: dbCar.sold,
  createdAt: dbCar.created_at,
});

export function useCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('cars', {
        method: 'GET',
      });

      if (error) throw error;
      
      const mappedCars = (data as DbCar[]).map(mapDbCarToCar);
      setCars(mappedCars);
    } catch (err) {
      console.error('Error fetching cars:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch cars');
    } finally {
      setLoading(false);
    }
  }, []);

  const addCar = async (car: Omit<Car, 'id' | 'createdAt'>) => {
    try {
      const { data, error } = await supabase.functions.invoke('cars', {
        method: 'POST',
        body: car,
      });

      if (error) throw error;
      
      const newCar = mapDbCarToCar(data as DbCar);
      setCars(prev => [newCar, ...prev]);
      
      toast({
        title: "Success",
        description: "Vehicle added successfully",
      });
      
      return newCar;
    } catch (err) {
      console.error('Error adding car:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to add vehicle',
        variant: "destructive",
      });
      throw err;
    }
  };

  const updateCar = async (id: string, car: Partial<Car>) => {
    try {
      const { data, error } = await supabase.functions.invoke(`cars?id=${id}`, {
        method: 'PUT',
        body: car,
      });

      if (error) throw error;
      
      const updatedCar = mapDbCarToCar(data as DbCar);
      setCars(prev => prev.map(c => c.id === id ? updatedCar : c));
      
      toast({
        title: "Success",
        description: "Vehicle updated successfully",
      });
      
      return updatedCar;
    } catch (err) {
      console.error('Error updating car:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to update vehicle',
        variant: "destructive",
      });
      throw err;
    }
  };

  const deleteCar = async (id: string) => {
    try {
      const { error } = await supabase.functions.invoke(`cars?id=${id}`, {
        method: 'DELETE',
      });

      if (error) throw error;
      
      setCars(prev => prev.filter(c => c.id !== id));
      
      toast({
        title: "Success",
        description: "Vehicle deleted successfully",
      });
    } catch (err) {
      console.error('Error deleting car:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to delete vehicle',
        variant: "destructive",
      });
      throw err;
    }
  };

  const toggleSoldStatus = async (id: string) => {
    const car = cars.find(c => c.id === id);
    if (!car) return;
    
    await updateCar(id, { ...car, sold: !car.sold });
  };

  const initializeTable = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('init-cars-table', {
        method: 'POST',
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Database table initialized",
      });
      
      return data;
    } catch (err) {
      console.error('Error initializing table:', err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to initialize table',
        variant: "destructive",
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return {
    cars,
    loading,
    error,
    fetchCars,
    addCar,
    updateCar,
    deleteCar,
    toggleSoldStatus,
    initializeTable,
  };
}
