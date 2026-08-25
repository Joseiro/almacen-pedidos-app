"use client";

import { useState } from "react";
import { guardarPedidoCompleto } from "@/actions/pedidos"; // Importamos la acción de servidor
import { useRouter } from "next/navigation";

// Definimos los tipos
type Cliente = { id: string; nombreNegocio: string; telefono: string; cifNif: string | null; direccionEntrega: string | null; };
type Producto = { id: string; nombre: string; categoria: string; precioBase: number; tipoUnidad: string; };

export default function FormularioNuevoPedido({ clientesBD, productosBD }: { clientesBD: Cliente[], productosBD: Producto[] }) {
  // Estado Global del Pedido
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [lineas, setLineas] = useState<any[]>([]);
  const [notas, setNotas] = useState("");
  const [guardando, setGuardando] = useState(false);
  const router = useRouter();

  // Estados locales para los buscadores
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [busquedaProducto, setBusquedaProducto] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [cantidad, setCantidad] = useState("1");

  // Filtros
  const clientesFiltrados = busquedaCliente === "" ? [] : clientesBD.filter((c) => c.nombreNegocio.toLowerCase().includes(busquedaCliente.toLowerCase()) || c.telefono.includes(busquedaCliente));
  const productosFiltrados = busquedaProducto === "" ? [] : productosBD.filter((p) => p.nombre.toLowerCase().includes(busquedaProducto.toLowerCase()));

  // Lógica del carrito
  const agregarLinea = () => {
    if (!productoSeleccionado || !cantidad || isNaN(Number(cantidad))) return;
    setLineas([...lineas, { id: Math.random().toString(), producto: productoSeleccionado, cantidad: Number(cantidad) }]);
    setProductoSeleccionado(null);
    setBusquedaProducto("");
    setCantidad("1");
  };

  // Enviar a la Base de Datos
  const handleGuardarPedido = async () => {
    if (!clienteSeleccionado || lineas.length === 0) return;
    
    setGuardando(true);
    
    // Llamamos a la función de backend
    const respuesta = await guardarPedidoCompleto(clienteSeleccionado.id, lineas, notas);
    
    setGuardando(false);

    if (respuesta.success) {
      // En lugar de hacer un alert, redirigimos a la pantalla del albarán
      router.push(`/albaran/${respuesta.pedidoId}`);
    } else {
      alert("Hubo un error al guardar el pedido.");
    }
  };

  return (
    <div className="space-y-10">
      
      {/* 1. SECCIÓN CLIENTE */}
      <div className="w-full max-w-md relative">
        <label className="block text-sm font-semibold text-gray-700 mb-1">1. Identificar Cliente</label>
        {!clienteSeleccionado ? (
          <div>
            <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Buscar por nombre o teléfono..." value={busquedaCliente} onChange={(e) => setBusquedaCliente(e.target.value)} />
            {clientesFiltrados.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                {clientesFiltrados.map((c) => (
                  <li key={c.id} className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b last:border-0" onClick={() => { setClienteSeleccionado(c); setBusquedaCliente(""); }}>
                    <div className="font-medium text-gray-800">{c.nombreNegocio}</div>
                    <div className="text-sm text-gray-500">📞 {c.telefono}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <div className="text-sm text-green-800 font-bold">Cliente Seleccionado:</div>
              <div className="text-lg text-gray-900">{clienteSeleccionado.nombreNegocio}</div>
            </div>
            <button onClick={() => setClienteSeleccionado(null)} className="text-sm bg-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 text-gray-600">Cambiar</button>
          </div>
        )}
      </div>

      {/* 2. SECCIÓN PRODUCTOS (Solo se muestra si hay cliente) */}
      {clienteSeleccionado && (
        <div className="w-full">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">2. Productos del Pedido</h2>
          <div className="flex gap-4 items-start mb-6">
            <div className="flex-1 relative">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Producto</label>
              {!productoSeleccionado ? (
                <div>
                  <input type="text" className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" placeholder="Ej: Tomate..." value={busquedaProducto} onChange={(e) => setBusquedaProducto(e.target.value)} />
                  {productosFiltrados.length > 0 && (
                    <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                      {productosFiltrados.map((p) => (
                        <li key={p.id} className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm border-b" onClick={() => { setProductoSeleccionado(p); setBusquedaProducto(""); }}>
                          <span className="font-semibold text-gray-800">{p.nombre}</span> <span className="text-gray-400 ml-2">({p.tipoUnidad})</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded px-3 py-2">
                  <span className="font-medium text-gray-800">{productoSeleccionado.nombre}</span>
                  <button onClick={() => setProductoSeleccionado(null)} className="text-xs text-red-600 hover:underline font-semibold ml-2">✕ Cancelar</button>
                </div>
              )}
            </div>
            <div className="w-24">
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Cant.</label>
              <input type="number" min="1" className="w-full border border-gray-300 rounded px-3 py-2 text-center focus:ring-2 focus:ring-green-500 focus:outline-none" value={cantidad} onChange={(e) => setCantidad(e.target.value)} disabled={!productoSeleccionado} />
            </div>
            <div className="pt-5">
              <button onClick={agregarLinea} disabled={!productoSeleccionado} className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded font-semibold disabled:opacity-50 h-[42px]">Añadir</button>
            </div>
          </div>

          {/* Carrito */}
          {lineas.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm mb-6">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500">
                  <tr><th className="px-4 py-3 font-semibold">Producto</th><th className="px-4 py-3 font-semibold text-center">Cantidad</th><th className="px-4 py-3 font-semibold text-center">Acción</th></tr>
                </thead>
                <tbody>
                  {lineas.map((linea) => (
                    <tr key={linea.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-800">{linea.producto.nombre}</td>
                      <td className="px-4 py-3 text-center"><span className="font-bold text-gray-800 text-lg">{linea.cantidad}</span> <span className="text-gray-400 ml-1 text-xs">{linea.producto.tipoUnidad}</span></td>
                      <td className="px-4 py-3 text-center"><button onClick={() => setLineas(lineas.filter(l => l.id !== linea.id))} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded">Quitar</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Notas y Botón de Guardar */}
          {lineas.length > 0 && (
            <div className="pt-6 border-t border-gray-200 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Notas para el almacén</label>
                <textarea className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none" rows={2} value={notas} onChange={(e) => setNotas(e.target.value)} />
              </div>
              <button 
                onClick={handleGuardarPedido} 
                disabled={guardando}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold text-lg py-4 rounded-lg shadow-sm transition-colors"
              >
                {guardando ? "Guardando..." : "Guardar Pedido y Generar Albarán"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}