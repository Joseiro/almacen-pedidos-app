import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ModalNuevoProducto from "@/components/ModalNuevoProducto";
import ModalEditarProducto from "@/components/ModalEditarProducto";

export default async function CatalogoPage() {
  // Traemos los productos ordenados alfabéticamente
  const productos = await prisma.producto.findMany({
    orderBy: { nombre: 'asc' },
  });

  return (
    <>

      {/* --- CONTENIDO PRINCIPAL --- */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-gray-800">Catálogo de Productos</h1>
          <ModalNuevoProducto />
        </header>

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Producto</th>
                  <th className="px-6 py-4 font-semibold">Categoría</th>
                  <th className="px-6 py-4 font-semibold text-right">Precio Base</th>
                  <th className="px-6 py-4 font-semibold text-center">Tipo Unidad</th>
                  <th className="px-6 py-4 font-semibold text-center">Estado</th>
                  <th className="px-6 py-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {productos.map((producto) => (
                  <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900 text-base">
                      {producto.nombre}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {producto.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-gray-900 text-lg">
                      {producto.precioBase.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-700">
                      {producto.tipoUnidad}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {producto.activo ? (
                        <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">ACTIVO</span>
                      ) : (
                        <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">INACTIVO</span>
                      )}
                    </td>
                    {/* NUEVA COLUMNA DE ACCIONES */}
                    <td className="px-6 py-4 text-center">
                      <ModalEditarProducto producto={producto} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
    </>
  );
}