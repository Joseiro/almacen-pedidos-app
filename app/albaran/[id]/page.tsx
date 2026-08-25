import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BotonesImprimir from "@/components/BotonesImprimir";

// 1. El tipo de params ahora es una Promesa
export default async function AlbaranPage({ params }: { params: Promise<{ id: string }> }) {
    // 2. Esperamos a que Next.js lea la URL
  const parametrosResueltos = await params;
  // 3. Ahora sí, le pasamos el ID real a Prisma
  const pedido = await prisma.pedido.findUnique({
    where: { id: parametrosResueltos.id },
    include: {
      cliente: true,
      lineas: {
        include: { producto: true }
      }
    }
  });

  // Si alguien pone un ID falso en la URL, devolvemos un error 404
  if (!pedido) {
    return notFound();
  }

  // Calculamos el total (opcional, por si quieres mostrar importes)
  const total = pedido.lineas.reduce((suma, linea) => suma + (linea.cantidad * linea.precioHistorico), 0);

  // 2. Pintamos el diseño del folio A4
  return (
    <div className="min-h-screen bg-gray-100 p-8 print:p-0 print:bg-white">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-sm print:shadow-none print:p-0">
        
        <BotonesImprimir />

        {/* --- CABECERA DEL ALBARÁN --- */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">ALBARÁN DE ENTREGA</h1>
            <p className="text-gray-500 mt-1">Ref: {pedido.id.split('-')[0].toUpperCase()}</p>
            <p className="text-gray-500">Fecha: {pedido.fechaHora.toLocaleDateString('es-ES')}</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-green-700">AlmacénPro</h2>
            <p className="text-gray-600">Polígono Industrial, Nave 4</p>
            <p className="text-gray-600">Gijón, Asturias</p>
          </div>
        </div>

        {/* --- DATOS DEL CLIENTE --- */}
        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg print:border-gray-300">
          <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Datos del Cliente</h3>
          <p className="text-lg font-bold text-gray-900">{pedido.cliente.nombreNegocio}</p>
          <p className="text-gray-700">CIF/NIF: {pedido.cliente.cifNif || 'No especificado'}</p>
          <p className="text-gray-700">Teléfono: {pedido.cliente.telefono}</p>
          <p className="text-gray-700">Dirección: {pedido.cliente.direccionEntrega || 'Recogida en almacén'}</p>
        </div>

        {/* --- LÍNEAS DE PRODUCTOS --- */}
        <table className="w-full text-left mb-8 border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800 text-gray-800">
              <th className="py-3 font-bold uppercase text-sm">Producto</th>
              <th className="py-3 font-bold uppercase text-sm text-center">Cantidad</th>
              <th className="py-3 font-bold uppercase text-sm text-right">Precio Ud.</th>
              <th className="py-3 font-bold uppercase text-sm text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.lineas.map((linea) => (
              <tr key={linea.id} className="border-b border-gray-200 text-gray-700">
                <td className="py-4 font-medium">{linea.producto.nombre}</td>
                <td className="py-4 text-center">{linea.cantidad} {linea.producto.tipoUnidad}</td>
                <td className="py-4 text-right">{linea.precioHistorico.toFixed(2)} €</td>
                <td className="py-4 text-right font-medium">{(linea.cantidad * linea.precioHistorico).toFixed(2)} €</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* --- NOTAS Y TOTALES --- */}
        <div className="flex justify-between items-end border-t border-gray-200 pt-8 mt-8">
          <div className="w-1/2">
            {pedido.notasEmpleado && (
              <div>
                <h4 className="text-sm font-bold text-gray-500 uppercase mb-1">Notas del pedido:</h4>
                <p className="text-gray-700 bg-yellow-50 p-3 rounded border border-yellow-200 text-sm">
                  {pedido.notasEmpleado}
                </p>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-sm uppercase font-bold mb-1">Total a cobrar</p>
            <p className="text-3xl font-black text-gray-900">{total.toFixed(2)} €</p>
          </div>
        </div>

      </div>
    </div>
  );
}