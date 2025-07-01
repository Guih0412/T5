import { prisma } from '../models/prisma/client'

export async function criarProduto(data: any) {
  return prisma.produto.create({ data })
}

export async function listarProdutos() {
  return prisma.produto.findMany()
}

export async function atualizarProduto(id: number, data: any) {
  return prisma.produto.update({
    where: { id },
    data,
  })
}

export async function deletarProduto(id: number) {
  return prisma.produto.delete({
    where: { id },
  })
}
