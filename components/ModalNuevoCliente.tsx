"use client";

import { useState } from "react";
import { crearCliente } from "@/actions/clientes";

export default function ModalNuevoCliente() {
  const [isOpen, setIsOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(formData: FormData) {
    setGuardando(true);
    const respuesta = await crearCliente(formData);
    setGuardando(false);

    if (respuesta.success) {
      setIsOpen(false); // Cerramos el modal si todo ha ido bien
    } else {
      alert(respuesta.error);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors"
      >
        + Nuevo Cliente
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Alta de Nuevo Cliente</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Negocio *</label>
                <input required type="text" name="nombreNegocio" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Ej: Frutería Paco" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono *</label>
                  <input required type="tel" name="telefono" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Ej: 600123456" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">CIF / NIF</label>
                  <input type="text" name="cifNif" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Ej: B12345678" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección de Entrega</label>
                <input type="text" name="direccionEntrega" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Calle, número, ciudad..." />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={guardando} className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-400">
                  {guardando ? "Guardando..." : "Guardar Cliente"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}