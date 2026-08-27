import Link from "next/link";
import "./globals.css"; // Asegúrate de que importa tus estilos globales

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased">
        <div className="flex h-screen overflow-hidden">
          
          {/* --- MENÚ LATERAL ÚNICO --- */}
          <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
            <div className="h-16 flex items-center px-6 border-b border-gray-200">
              <span className="text-xl font-black text-green-700 tracking-tight">
                Almacén<span className="text-gray-800">Pro</span>
              </span>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              <Link href="/" className="block px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition-colors">
                📝 Toma de Pedidos
              </Link>
              <Link href="/historial" className="block px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition-colors">
                📦 Historial Albaranes
              </Link>
              <Link href="/clientes" className="block px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition-colors">
                🏢 Clientes
              </Link>
              <Link href="/catalogo" className="block px-4 py-2.5 rounded-md text-gray-700 hover:bg-gray-100 font-medium transition-colors">
                🍎 Catálogo
              </Link>
            </nav>
          </aside>

          {/* --- CONTENIDO DINÁMICO (Aquí se inyecta cada página) --- */}
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}