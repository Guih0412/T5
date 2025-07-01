import { prisma } from '../models/prisma/client'

export async function criarServico(data: any) {
  return prisma.servico.create({ data })
}

export async function listarServicos() {
  return prisma.servico.findMany()
}

export async function atualizarServico(id: number, data: any) {
  return prisma.servico.update({
    where: { id },
    data,
  })
}

export async function deletarServico(id: number) {
  return prisma.servico.delete({
    where: { id },
  })
}
