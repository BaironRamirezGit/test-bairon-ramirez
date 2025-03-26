"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser, logout } from "../../utils/auth";
import Menu from "../../components/Menu";
import AdminProducts from "../../components/AdminProducts";
import ClientProducts from "../../components/ClientProducts";

export default function Dashboard() {
  const [user, setUser] = useState<{ role: string; token: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loggedUser = getUser();
    if (!loggedUser) {
      router.push("/login");
    } else {
      setUser(loggedUser);
    }
  }, []);

  if (!user) return <p className="text-center text-lg font-semibold mt-5">Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-4">Dashboard</h1>
        <p className="text-lg text-gray-600 text-center mb-6">
          Bienvenido, <span className="font-semibold">{user.role === "admin" ? "Administrador" : "Cliente"}</span>
        </p>

        {/* Menú basado en el rol */}
        <div className="mb-6">
          <Menu role={user.role} />
        </div>

        {/* Mostrar productos según el rol */}
        <div className="mb-6">
          {user.role === "admin" ? <AdminProducts token={user.token} /> : <ClientProducts />}
        </div>

        <div className="flex justify-center">
          <button 
            onClick={logout} 
            className="bg-red-500 text-white py-2 px-6 rounded-xl font-medium transition hover:bg-red-600 hover:scale-105"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
