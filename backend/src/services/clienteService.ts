import { prisma } from '../models/prisma/client'

export async function criarCliente(data: any) {
  return prisma.cliente.create({ data })
}

export async function listarClientes() {
  return prisma.cliente.findMany({ include: { pets: true } })
}

export async function buscarClientePorId(id: number) {
  return prisma.cliente.findUnique({
    where: { id },
    include: { pets: true },
  })
}

export async function atualizarCliente(id: number, data: any) {
  return prisma.cliente.update({
    where: { id },
    data,
  })
}

export async function deletarCliente(id: number) {
  return prisma.cliente.delete({
    where: { id },
  })
}
