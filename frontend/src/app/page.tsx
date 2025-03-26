"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
          ¡Bienvenido a la plataforma!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Inicia sesión o regístrate para continuar
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition hover:bg-blue-700 hover:scale-105 w-full"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition hover:bg-green-700 hover:scale-105 w-full"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
}
