import FormularioNuevoPedido from "@/components/FormularioNuevoPedido";
import { prisma } from "@/lib/prisma"; // 1. Importamos nuestro conector
import Link from "next/link";

// 2. Convertimos la página en asíncrona para poder usar "await"
export default async function Home() {
  // 3. Traemos todos los clientes activos ordenados alfabéticamente
  const clientesDeBaseDeDatos = await prisma.cliente.findMany({
    where: { activo: true },
    orderBy: { nombreNegocio: 'asc' }
  });
  
  // Traemos los productos activos
  const productosDeBaseDeDatos = await prisma.producto.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* --- MENÚ LATERAL (SIDEBAR) --- */}
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
        <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
          Usuario: Recepción (Turno 1)
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Cabecera */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm z-10">
          <h1 className="text-2xl font-bold text-gray-800">Nuevo Pedido</h1>
        </header>

        {/* Zona de Trabajo */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 min-h-full p-6">
            
            {/* Llamamos al súper-componente pasándole los datos reales */}
            <FormularioNuevoPedido 
              clientesBD={clientesDeBaseDeDatos} 
              productosBD={productosDeBaseDeDatos} 
            />
            
          </div>
        </div>

      </main>

    </div>
  );
}