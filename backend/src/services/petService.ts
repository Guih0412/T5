import { prisma } from '../models/prisma/client'

export async function criarPet(data: any) {
  return prisma.pet.create({ data })
}

export async function listarPets() {
  return prisma.pet.findMany()
}

export async function atualizarPet(id: number, data: any) {
  return prisma.pet.update({
    where: { id },
    data,
  })
}

export async function deletarPet(id: number) {
  return prisma.pet.delete({
    where: { id },
  })
}
