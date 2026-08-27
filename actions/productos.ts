"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearProducto(formData: FormData) {
  try {
    const nombre = formData.get("nombre") as string;
    const categoria = formData.get("categoria") as string;
    const precioBase = parseFloat(formData.get("precioBase") as string);
    const tipoUnidad = formData.get("tipoUnidad") as string;

    if (!nombre || !categoria || isNaN(precioBase) || !tipoUnidad) {
      return { success: false, error: "Todos los campos son obligatorios y el precio debe ser válido." };
    }

    await prisma.producto.create({
      data: {
        nombre,
        categoria,
        precioBase,
        tipoUnidad,
      },
    });

    // Recargamos la página del catálogo automáticamente
    revalidatePath("/catalogo"); 
    
    return { success: true };
  } catch (error) {
    console.error("Error al crear producto:", error);
    return { success: false, error: "No se pudo crear el producto." };
  }
}