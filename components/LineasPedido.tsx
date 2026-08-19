"use client";

import { useState } from "react";

// Datos de prueba temporales para el catálogo
const PRODUCTOS_MOCK = [
  { id: "101", nombre: "Tomate Pera", tipoUnidad: "Caja" },
  { id: "102", nombre: "Patata Monalisa", tipoUnidad: "Malla 5kg" },
  { id: "103", nombre: "Plátano de Canarias", tipoUnidad: "Caja" },
  { id: "104", nombre: "Lenteja Pardina", tipoUnidad: "Saco 10kg" },
];

export default function LineasPedido() {
  const [busqueda, setBusqueda] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState<any>(null);
  const [cantidad, setCantidad] = useState("1");
  const [notas, setNotas] = useState("");
  
  // Lista de productos ya añadidos al "carrito"
  const [lineas, setLineas] = useState<any[]>([]);

  // Filtrar el catálogo según lo que se escribe
  const productosFiltrados = busqueda === "" 
    ? [] 
    : PRODUCTOS_MOCK.filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  // Función para añadir una línea a la lista final
  const agregarLinea = () => {
    if (!productoSeleccionado || !cantidad || isNaN(Number(cantidad))) return;

    const nuevaLinea = {
      id: Math.random().toString(), // ID temporal para la vista
      producto: productoSeleccionado,
      cantidad: Number(cantidad),
    };

    setLineas([...lineas, nuevaLinea]);
    
    // Limpiar el formulario tras añadir
    setProductoSeleccionado(null);
    setBusqueda("");
    setCantidad("1");
  };

  const eliminarLinea = (id: string) => {
    setLineas(lineas.filter((linea) => linea.id !== id));
  };

  return (
    <div className="w-full mt-10">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        2. Productos del Pedido
      </h2>

      {/* --- FORMULARIO DE ENTRADA RÁPIDA --- */}
      <div className="flex gap-4 items-start mb-6">
        
        {/* Buscador de producto */}
        <div className="flex-1 relative">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Producto</label>
          {!productoSeleccionado ? (
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Ej: Tomate..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {productosFiltrados.length > 0 && (
                <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                  {productosFiltrados.map((p) => (
                    <li
                      key={p.id}
                      className="px-4 py-2 hover:bg-green-50 cursor-pointer text-sm border-b last:border-0"
                      onClick={() => {
                        setProductoSeleccionado(p);
                        setBusqueda("");
                      }}
                    >
                      <span className="font-semibold text-gray-800">{p.nombre}</span> 
                      <span className="text-gray-400 ml-2">({p.tipoUnidad})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-between border border-green-300 bg-green-50 rounded px-3 py-2">
              <span className="font-medium text-gray-800">{productoSeleccionado.nombre}</span>
              <button 
                onClick={() => setProductoSeleccionado(null)}
                className="text-xs text-red-600 hover:underline font-semibold ml-2"
              >
                ✕ Cancelar
              </button>
            </div>
          )}
        </div>

        {/* Cantidad */}
        <div className="w-24">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Cant.</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded px-3 py-2 text-center focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            disabled={!productoSeleccionado}
          />
        </div>

        {/* Unidad (Informativo, viene del producto) */}
        <div className="w-28">
          <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Unidad</label>
          <div className="border border-gray-100 bg-gray-50 rounded px-3 py-2 text-gray-500 text-center text-sm truncate h-[42px] flex items-center justify-center">
            {productoSeleccionado ? productoSeleccionado.tipoUnidad : "-"}
          </div>
        </div>

        {/* Botón Añadir */}
        <div className="pt-5">
          <button
            onClick={agregarLinea}
            disabled={!productoSeleccionado}
            className="bg-gray-800 hover:bg-black text-white px-6 py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors h-[42px]"
          >
            Añadir
          </button>
        </div>
      </div>

      {/* --- LISTA DEL PEDIDO (EL ALBARÁN VIRTUAL) --- */}
      {lineas.length > 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Producto</th>
                <th className="px-4 py-3 font-semibold text-center">Cantidad</th>
                <th className="px-4 py-3 font-semibold text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {lineas.map((linea) => (
                <tr key={linea.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{linea.producto.nombre}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-gray-800 text-lg">{linea.cantidad}</span> 
                    <span className="text-gray-400 ml-1 text-xs">{linea.producto.tipoUnidad}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => eliminarLinea(linea.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-400 text-sm">
          No hay productos en el pedido todavía.
        </div>
      )}

      {/* --- NOTAS Y CONFIRMACIÓN --- */}
      {lineas.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notas para el almacén (Opcional)</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows={2}
              placeholder="Ej: Quiere los plátanos un poco verdes..."
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
            />
          </div>
          
          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-lg shadow-sm transition-colors">
            Guardar Pedido y Generar Albarán
          </button>
        </div>
      )}
    </div>
  );
}