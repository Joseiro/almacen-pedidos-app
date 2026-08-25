"use server"; // Esta directiva es clave: asegura que este código SOLO se ejecuta en el servidor

import { prisma } from "@/lib/prisma";

export async function guardarPedidoCompleto(clienteId: string, lineas: any[], notas: string) {
  try {
    // Usamos Prisma para crear el Pedido y sus Líneas en una sola transacción
    const nuevoPedido = await prisma.pedido.create({
      data: {
        clienteId: clienteId,
        notasEmpleado: notas,
        // Prisma permite hacer inserciones anidadas súper limpias
        lineas: {
          create: lineas.map((linea) => ({
            productoId: linea.producto.id,
            cantidad: linea.cantidad,
            precioHistorico: linea.producto.precioBase, // Congelamos el precio actual
          })),
        },
      },
    });

    return { success: true, pedidoId: nuevoPedido.id };
  } catch (error) {
    console.error("Error al guardar el pedido:", error);
    return { success: false, error: "No se pudo guardar el pedido en la base de datos." };
  }
}