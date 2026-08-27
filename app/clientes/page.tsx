import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ModalNuevoCliente from "@/components/ModalNuevoCliente";
import ModalEditarCliente from "@/components/ModalEditarCliente";

export default async function ClientesPage() {
  // Traemos los clientes y contamos cuántos pedidos tiene cada uno
  const clientes = await prisma.cliente.findMany({
    orderBy: { nombreNegocio: 'asc' },
    include: {
      _count: {
        select: { pedidos: true }
      }
    }
  });

  return (
    <>

      {/* --- CONTENIDO PRINCIPAL --- */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-gray-800">Directorio de Clientes</h1>

          <ModalNuevoCliente />
          
        </header>

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Negocio</th>
                  <th className="px-6 py-4 font-semibold">Contacto</th>
                  <th className="px-6 py-4 font-semibold">Dirección</th>
                  <th className="px-6 py-4 font-semibold text-center">Pedidos</th>
                  <th className="px-6 py-4 font-semibold text-center">Estado</th>
                  <th className="px-6 py-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clientes.map((cliente) => (
                  <tr key={cliente.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-base">{cliente.nombreNegocio}</div>
                      <div className="text-xs text-gray-500 mt-1">CIF/NIF: {cliente.cifNif || 'No especificado'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-800">📞 {cliente.telefono}</div>
                    </td>
                    <td className="px-6 py-4">
                      {cliente.direccionEntrega || <span className="text-gray-400 italic">Recogida en almacén</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-100">
                        {cliente._count.pedidos}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {cliente.activo ? (
                        <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">ACTIVO</span>
                      ) : (
                        <span className="text-xs font-bold bg-red-100 text-red-800 px-2 py-1 rounded">INACTIVO</span>
                      )}
                    </td>
                    {/* NUEVA COLUMNA DE ACCIONES */}
                    <td className="px-6 py-4 text-center">
                      <ModalEditarCliente cliente={cliente} />
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