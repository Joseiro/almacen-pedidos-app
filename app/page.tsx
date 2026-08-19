import BuscadorClientes from "@/components/BuscadorClientes";

export default function Home() {
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
          <a href="#" className="block px-4 py-2.5 rounded-md bg-green-50 text-green-700 font-semibold transition-colors">
            📝 Toma de Pedidos
          </a>
          <a href="#" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            📦 Historial Albaranes
          </a>
          <a href="#" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            🏢 Clientes
          </a>
          <a href="#" className="block px-4 py-2.5 rounded-md text-gray-600 hover:bg-gray-100 font-medium transition-colors">
            🍎 Catálogo y Precios
          </a>
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
            
            <BuscadorClientes />
            
          </div>
        </div>

      </main>

    </div>
  );
}