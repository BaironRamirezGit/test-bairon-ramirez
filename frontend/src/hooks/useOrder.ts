import { useState, useEffect } from "react";
import api from "../utils/api";

export interface Order {
  id?: number;
  id_product: number;
  id_user?:number;
  quantity: number;
  status?: string;
}

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las órdenes
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/v1/orders");
      setOrders(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al obtener órdenes");
    } finally {
      setLoading(false);
    }
  };

  // Crear una orden (Solo clientes)
  const createOrder = async (orderData: Order) => {
    setLoading(true);
    setError(null);
    try {
      await api.post("/api/v1/orders", orderData);
      fetchOrders(); // Recargar órdenes después de crear
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear la orden");
    } finally {
      setLoading(false);
    }
  };

  // Obtener detalles de una orden específica
  const getOrderById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/api/v1/orders/${id}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al obtener la orden");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
    getOrderById,
  };
};
