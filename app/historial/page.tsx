import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HistorialPage() {
  // Traemos los pedidos de la base de datos ordenados por fecha
  const pedidos = await prisma.pedido.findMany({
    orderBy: { fechaHora: "desc" },
    include: {
      cliente: true,
      lineas: true, // Incluimos las líneas para poder sumar cuántos bultos llevan
    },
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
          <Link href="/" className="block px-4 py-2.5 rounded-md bg-green-50 text-green-700 font-semibold transition-colors">
            📝 Toma de Pedidos
          </Link>
          <Link href="/historial" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            📦 Historial Albaranes
          </Link>
          <Link href="/clientes" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            🏢 Clientes
          </Link>
          <Link href="/catalogo" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            🍎 Catálogo
          </Link>
        </nav>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-gray-800">Historial de Pedidos</h1>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Fecha y Hora</th>
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold text-center">Bultos</th>
                  <th className="px-6 py-4 font-semibold text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pedidos.map((pedido) => (
                  <tr key={pedido.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {new Intl.DateTimeFormat("es-ES", {
                        day: "2-digit", month: "2-digit", year: "numeric",
                        hour: "2-digit", minute: "2-digit"
                      }).format(pedido.fechaHora)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{pedido.cliente.nombreNegocio}</div>
                      <div className="text-xs text-gray-500">Ref: {pedido.id.split("-")[0].toUpperCase()}</div>
                    </td>
                    <td className="px-6 py-4 text-center font-medium text-gray-800">
                      {pedido.lineas.reduce((suma, linea) => suma + linea.cantidad, 0)} uds.
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/albaran/${pedido.id}`} 
                        className="text-green-700 hover:text-green-900 font-bold bg-green-50 px-4 py-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                      >
                        Ver PDF
                      </Link>
                    </td>
                  </tr>
                ))}
                
                {pedidos.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                      No hay pedidos registrados todavía.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

          </div>
        </div>
      </main>
    </div>
  );
}