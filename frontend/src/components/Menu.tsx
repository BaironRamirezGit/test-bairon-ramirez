"use client";

import { useRouter } from "next/navigation";

interface MenuProps {
  role: "admin" | "client";
}

const Menu: React.FC<MenuProps> = ({ role }) => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
      <ul className="flex flex-col sm:flex-row gap-4">
        <li>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
          >
            Inicio
          </button>
        </li>

        {role === "admin" && (
          <>
            <li>
              <button
                onClick={() => router.push("/orders")}
                className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-600 transition"
              >
                Ver Órdenes
              </button>
            </li>
          </>
        )}

        {role === "client" && (
          <>
            <li>
              <button
                onClick={() => router.push("/orders")}
                className="px-4 py-2 bg-green-700 rounded hover:bg-green-600 transition"
              >
                Mis Órdenes
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Menu;
