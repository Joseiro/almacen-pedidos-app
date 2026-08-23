import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

// Configuramos el adaptador de conexión antes de iniciar Prisma
const connectionString = process.env.DATABASE_URL
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Iniciando el volcado de datos (seed)...')

  // 1. Limpiar datos anteriores (opcional, pero útil para no duplicar)
  await prisma.lineaPedido.deleteMany()
  await prisma.pedido.deleteMany()
  await prisma.producto.deleteMany()
  await prisma.cliente.deleteMany()

  // 2. Crear Clientes
  const clientes = await Promise.all([
    prisma.cliente.create({
      data: {
        nombreNegocio: 'Frutería El Centro',
        cifNif: 'B12345678',
        telefono: '611223344',
        direccionEntrega: 'Calle Corrida 15, Gijón',
      },
    }),
    prisma.cliente.create({
      data: {
        nombreNegocio: 'Restaurante La Marina',
        cifNif: 'B87654321',
        telefono: '699887766',
        direccionEntrega: 'Paseo Marítimo 12, Ibiza',
      },
    }),
    prisma.cliente.create({
      data: {
        nombreNegocio: 'Supermercado Gràcia',
        cifNif: 'A11223344',
        telefono: '655443322',
        direccionEntrega: 'Carrer Gran de Gràcia 45, Barcelona',
      },
    }),
  ])
  console.log(`✅ Se han insertado ${clientes.length} clientes.`)

  // 3. Crear Productos (frutas, verduras, legumbres, patatas...)
  const productos = await Promise.all([
    prisma.producto.create({
      data: { nombre: 'Patata Monalisa', categoria: 'Tubérculo', precioBase: 0.85, tipoUnidad: 'Saco 20kg' },
    }),
    prisma.producto.create({
      data: { nombre: 'Tomate Pera', categoria: 'Verdura', precioBase: 1.20, tipoUnidad: 'Caja 5kg' },
    }),
    prisma.producto.create({
      data: { nombre: 'Lenteja Pardina', categoria: 'Legumbre', precioBase: 2.10, tipoUnidad: 'Saco 10kg' },
    }),
    prisma.producto.create({
      data: { nombre: 'Plátano Extra', categoria: 'Fruta', precioBase: 1.50, tipoUnidad: 'Caja 10kg' },
    }),
  ])
  console.log(`✅ Se han insertado ${productos.length} productos.`)

  console.log('¡Volcado de datos terminado con éxito!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })