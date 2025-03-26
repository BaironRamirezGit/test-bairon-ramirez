"use client";

import { useState, useEffect } from "react";
import api from "../utils/api";

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export const useProducts = (token?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/api/v1/products");
      setProducts(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  // Crear producto (Solo Admin)
  const createProduct = async (productData: { name: string; price: number; description?: string }) => {
    try {
      await api.post("/api/v1/products", productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear producto");
    }
  };

  // Actualizar producto (Solo Admin)
  const updateProduct = async (id: number, productData: Partial<Product>) => {
    try {
      await api.put(`/api/v1/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar producto");
    }
  };

  // Eliminar producto (Solo Admin)
  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/api/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar producto");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, createProduct, updateProduct, deleteProduct };
};
