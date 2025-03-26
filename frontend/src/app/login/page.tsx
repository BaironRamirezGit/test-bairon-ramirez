"use client";

import { useState } from "react";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const response = await loginUser(formData);

    if (response.success) {
      localStorage.setItem("token", response.token);
      setMessage("Inicio de sesión exitoso. Redirigiendo...");
      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setMessage(response.message);
      setSuccess(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

        {message && (
          <div className={`p-2 mb-4 text-center rounded-lg ${success ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="login"
            placeholder="Usuario"
            value={formData.login}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/register")}
            className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}
