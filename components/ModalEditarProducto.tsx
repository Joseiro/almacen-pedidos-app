"use client";

import { useState } from "react";
import { editarProducto } from "@/actions/productos";

type Producto = {
  id: string;
  nombre: string;
  categoria: string;
  precioBase: number;
  tipoUnidad: string;
};

export default function ModalEditarProducto({ producto }: { producto: Producto }) {
  const [isOpen, setIsOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);

  async function handleSubmit(formData: FormData) {
    setGuardando(true);
    const respuesta = await editarProducto(formData);
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
        title="Editar Producto"
      >
        ✏️
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 text-left">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">Editar Producto</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-xl">×</button>
            </div>
            
            <form action={handleSubmit} className="p-6 space-y-4">
              <input type="hidden" name="id" value={producto.id} />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre del Producto *</label>
                <input required type="text" name="nombre" defaultValue={producto.nombre} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Categoría *</label>
                  <select required name="categoria" defaultValue={producto.categoria} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option value="Fruta">Fruta</option>
                    <option value="Verdura">Verdura</option>
                    <option value="Tubérculo">Tubérculo</option>
                    <option value="Legumbre">Legumbre</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Precio Base (€) *</label>
                  <input required type="number" step="0.01" min="0" name="precioBase" defaultValue={producto.precioBase} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Formato de Venta *</label>
                <select required name="tipoUnidad" defaultValue={producto.tipoUnidad} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white">
                    <option value="Kg">Kilo (Kg)</option>
                    <option value="Caja 5kg">Caja 5kg</option>
                    <option value="Caja 10kg">Caja 10kg</option>
                    <option value="Saco 10kg">Saco 10kg</option>
                    <option value="Saco 20kg">Saco 20kg</option>
                    <option value="Malla 2kg">Malla 2kg</option>
                    <option value="Unidad">Unidad suelta</option>
                </select>
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