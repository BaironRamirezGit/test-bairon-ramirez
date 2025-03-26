"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

interface AdminProductsProps {
  token: string;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ token }) => {
  const { products, loading, error, createProduct, updateProduct, deleteProduct } = useProducts(token);
  const [newProduct, setNewProduct] = useState({ name: "", price: 1, description: "" });
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleCreate = () => {
    if (!newProduct.name || newProduct.price <= 0) return;
    createProduct(newProduct);
    setNewProduct({ name: "", price: 1, description: "" });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold">Administrar Productos</h2>

      {/* Crear Producto */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 mr-2"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          className="border p-2 mr-2"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <button className="bg-green-500 text-white px-4 py-2" onClick={handleCreate}>
          Agregar Producto
        </button>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Lista de productos con opciones de editar/eliminar */}
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-2 rounded flex justify-between">
            <div>
              <p><strong>{product.name}</strong></p>
              <p>💰 Precio: ${product.price}</p>
            </div>
            <div>
            <button className="bg-blue-500 text-white px-2 py-1 mr-2" onClick={() => setSelectedProduct(product)}>
                📄 Ver Detalles
              </button>
              <button className="bg-yellow-500 text-white px-2 py-1 mr-2" onClick={() => updateProduct(product.id, { name: product.name+' edit', price:500 })}>
                ✏️ Editar
              </button>
              <button className="bg-red-500 text-white px-2 py-1" onClick={() => deleteProduct(product.id)}>
                🗑 Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Mostrar detalles del producto seleccionado */}
      {selectedProduct && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h3 className="text-lg font-bold">Detalles del Producto</h3>
          <p><strong>ID:</strong> {selectedProduct.id}</p>
          <p><strong>Nombre:</strong> {selectedProduct.name}</p>
          <p><strong>Precio:</strong> ${selectedProduct.price}</p>
          <p><strong>Descripción:</strong> {selectedProduct.description || "No disponible"}</p>
          <button className="mt-2 bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setSelectedProduct(null)}>
            Cerrar Detalles
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
