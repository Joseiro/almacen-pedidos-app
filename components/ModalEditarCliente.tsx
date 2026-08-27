"use client";

import { useState } from "react";
import { editarCliente } from "@/actions/clientes";

// Definimos qué datos necesita recibir el modal
type Cliente = {
  id: string;
  nombreNegocio: string;
  telefono: string;
  cifNif: string | null;
  direccionEntrega: string | null;
};

export default function ModalEditarCliente({ cliente }: { cliente: Cliente }) {
  const [isOpen, setIsOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(formData: FormData) {
    setGuardando(true);
    const respuesta = await editarCliente(formData);
    setGuardando(false);

    if (respuesta.success) {
      setIsOpen(false);
    } else {
      alert(respuesta.error);
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-gray-400 hover:text-blue-600 transition-colors p-1"
        title="Editar Cliente"
      >
        ✏️
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-left">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Editar Cliente</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-4">
              {/* ID Oculto para que lo lea el backend */}
              <input type="hidden" name="id" value={cliente.id} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Negocio *</label>
                <input required type="text" name="nombreNegocio" defaultValue={cliente.nombreNegocio} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono *</label>
                  <input required type="tel" name="telefono" defaultValue={cliente.telefono} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">CIF / NIF</label>
                  <input type="text" name="cifNif" defaultValue={cliente.cifNif || ""} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección de Entrega</label>
                <input type="text" name="direccionEntrega" defaultValue={cliente.direccionEntrega || ""} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={guardando} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:bg-gray-400">
                  {guardando ? "Actualizando..." : "Actualizar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}