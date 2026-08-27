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
    <>
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
    </>
  );
}