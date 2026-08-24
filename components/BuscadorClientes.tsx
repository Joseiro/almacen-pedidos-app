"use client"; // Esto le dice a Next.js que este componente usa interactividad (estado)

import { useState } from "react";

// Definimos qué forma tiene el dato que nos llega de la base de datos
type Cliente = {
  id: string;
  nombreNegocio: string;
  telefono: string;
  cifNif: string | null;
  direccionEntrega: string | null;
};

export default function BuscadorClientes({ clientesBD }: { clientesBD: Cliente[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);

  // Ahora filtramos sobre la lista real que viene por Props
  const clientesFiltrados = busqueda === "" 
    ? [] 
    : clientesBD.filter((cliente) =>
        cliente.nombreNegocio.toLowerCase().includes(busqueda.toLowerCase()) ||
        cliente.telefono.includes(busqueda)
      );

  return (
    <div className="w-full max-w-md mb-8 relative">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        1. Identificar Cliente
      </label>
      
      {!clienteSeleccionado ? (
        <div>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            placeholder="Buscar por nombre o teléfono..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          
          {/* Menú desplegable de sugerencias */}
          {clientesFiltrados.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
              {clientesFiltrados.map((cliente) => (
                <li
                  key={cliente.id}
                  className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-0"
                  onClick={() => {
                    setClienteSeleccionado(cliente);
                    setBusqueda(""); // Limpiamos el buscador
                  }}
                >
                  <div className="font-medium text-gray-800">{cliente.nombreNegocio}</div>
                  <div className="text-sm text-gray-500">📞 {cliente.telefono}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        // Lo que se muestra cuando ya hemos seleccionado a un cliente
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div>
            <div className="text-sm text-green-800 font-bold">Cliente Seleccionado:</div>
            <div className="text-lg text-gray-900">{clienteSeleccionado.nombreNegocio}</div>
            <div className="text-sm text-gray-600">Tel: {clienteSeleccionado.telefono}</div>
          </div>
          <button 
            onClick={() => setClienteSeleccionado(null)}
            className="text-sm bg-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 text-gray-600 transition-colors"
          >
            Cambiar
          </button>
        </div>
      )}
    </div>
  );
}