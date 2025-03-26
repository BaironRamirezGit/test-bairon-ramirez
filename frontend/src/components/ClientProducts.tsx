"use client";

import { useProducts } from "../hooks/useProducts";

const ClientProducts = () => {
  const { products, loading, error } = useProducts();

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold">Productos Disponibles</h2>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="mt-4">
        {products.map((product) => (
          <li key={product.id} className="border p-2 rounded">
            <p><strong>{product.name}</strong></p>
            <p>💰 Precio: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientProducts;
