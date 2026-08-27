"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function crearCliente(formData: FormData) {
  try {
    const nombreNegocio = formData.get("nombreNegocio") as string;
    const telefono = formData.get("telefono") as string;
    const cifNif = formData.get("cifNif") as string | null;
    const direccionEntrega = formData.get("direccionEntrega") as string | null;

    if (!nombreNegocio || !telefono) {
      return { success: false, error: "El nombre y el teléfono son obligatorios." };
    }

    await prisma.cliente.create({
      data: {
        nombreNegocio,
        telefono,
        cifNif: cifNif || null,
        direccionEntrega: direccionEntrega || null,
      },
    });

    // Esta línea mágica le dice a Next.js que recargue los datos de la página
    revalidatePath("/clientes"); 
    
    return { success: true };
  } catch (error) {
    console.error("Error al crear cliente:", error);
    return { success: false, error: "No se pudo crear el cliente." };
  }
}