"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrder } from "../../hooks/useOrder";
import { useProducts } from "../../hooks/useProducts";
import { getUser } from "../../utils/auth";

export default function OrdersPage() {
  const { orders, loading, error, createOrder, getOrderById } = useOrder();
  const { products, loading: loadingProducts } = useProducts();
  const [newOrder, setNewOrder] = useState({ id_product: "", quantity: 1 });
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null); // Para manejar errores al crear órdenes
  const router = useRouter();

  const user = getUser();
  if (!user) return <p className="text-center text-gray-500 mt-5">Cargando...</p>;

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOrderError(null);

    if (!newOrder.id_product) {
      setOrderError("Debes seleccionar un producto.");
      return;
    }

    try {
      await createOrder(newOrder);
      setNewOrder({ id_product: "", quantity: 1 });
    } catch (err) {
      setOrderError("Error al crear la orden. Inténtalo de nuevo.");
      console.error("Error al crear la orden:", err);
    }
  };

  const fetchOrderDetails = async (orderId: number) => {
    setLoadingDetails(true);
    try {
      const details = await getOrderById(orderId);
      setOrderDetails(details);
      setSelectedOrder(orderId);
    } catch (err) {
      console.error("Error al obtener los detalles de la orden:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Órdenes</h1>

      <button
        onClick={() => router.push("/dashboard")}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
      >
        ⬅ Volver al Dashboard
      </button>

      {user.role === "client" && (
        <form onSubmit={handleCreateOrder} className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex flex-col gap-3">
            <select
              value={newOrder.id_product}
              onChange={(e) => setNewOrder({ ...newOrder, id_product: e.target.value })}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Seleccione un producto</option>
              {loadingProducts ? (
                <option disabled>Cargando productos...</option>
              ) : (
                products?.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ${product.price}
                  </option>
                ))
              )}
            </select>

            <input
              type="number"
              placeholder="Cantidad"
              min="1"
              value={newOrder.quantity}
              onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 1 })}
              className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Crear Orden
            </button>

            {orderError && <p className="text-red-500 text-sm">{orderError}</p>}
          </div>
        </form>
      )}

      {loading && <p className="text-gray-500">Cargando órdenes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4">
        {orders?.map((order) => (
          <li
            key={order.id}
            onClick={() => fetchOrderDetails(order.id)}
            className="p-3 bg-gray-50 border rounded-lg mb-2 shadow-sm cursor-pointer hover:bg-gray-100 transition"
          >
            <span className="font-semibold">Orden #{order.id}</span> -{" "}
            <span className="font-semibold">Id producto #{order.id_product}</span> -{" "}
            <span className="font-semibold">Cantidad #{order.quantity}</span> -{" "}
            <span className="text-gray-600">Estado: {order.status}</span>
          </li>
        ))}
      </ul>

      {selectedOrder && (
        <div className="mt-4 p-4 bg-gray-200 rounded shadow">
          <h2 className="text-lg font-semibold">Detalles de la Orden #{selectedOrder}</h2>
          {loadingDetails ? (
            <p className="text-gray-600">Cargando detalles...</p>
          ) : orderDetails ? (
            <div>
              <p><strong>ID Producto:</strong> {orderDetails.id_product}</p>
              <p><strong>ID Usuario:</strong> {orderDetails.id_user}</p>
              <p><strong>Cantidad:</strong> {orderDetails.quantity}</p>
              <p><strong>Estado:</strong> {orderDetails.status}</p>
              <p><strong>Fecha de Creación:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p className="text-red-500">No se pudo obtener la información.</p>
          )}
        </div>
      )}
    </div>
  );
}
