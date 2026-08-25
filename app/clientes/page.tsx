import Link from "next/link";
import { prisma } from "@/lib/prisma";

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
    <div className="flex h-screen bg-gray-50">
      
      {/* --- MENÚ LATERAL --- */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <span className="text-xl font-black text-green-700 tracking-tight">
            Almacén<span className="text-gray-800">Pro</span>
          </span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            📝 Toma de Pedidos
          </Link>
          <Link href="/historial" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            📦 Historial Albaranes
          </Link>
          {/* Este botón ahora sale marcado en verde */}
          <Link href="/clientes" className="block px-4 py-2.5 rounded-md bg-green-50 text-green-700 font-semibold transition-colors">
            🏢 Clientes
          </Link>
        </nav>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-gray-800">Directorio de Clientes</h1>
          <button className="bg-gray-800 hover:bg-black text-white px-5 py-2 rounded-lg font-medium shadow-sm transition-colors">
            + Nuevo Cliente
          </button>
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
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </main>
    </div>
  );
}