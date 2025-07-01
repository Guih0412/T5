import { prisma } from '../models/prisma/client'

export async function registrarConsumo(data: any) {
  return prisma.consumo.create({ data })
}

export async function listarConsumos() {
  return prisma.consumo.findMany({
    include: {
      cliente: true,
      pet: true,
      produto: true,
      servico: true,
    },
  })
}

// Relatórios

export async function topClientesPorQuantidade() {
  return prisma.consumo.groupBy({
    by: ['clienteId'],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: 'desc' } },
    take: 10,
    include: { cliente: true },
  })
}

export async function topClientesPorValor() {
  return prisma.consumo.groupBy({
    by: ['clienteId'],
    _sum: { valorTotal: true },
    orderBy: { _sum: { valorTotal: 'desc' } },
    take: 5,
    include: { cliente: true },
  })
}

export async function produtosMaisConsumidos() {
  const produtos = await prisma.consumo.groupBy({
    by: ['produtoId'],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: 'desc' } },
    where: { produtoId: { not: null } },
  })

  const servicos = await prisma.consumo.groupBy({
    by: ['servicoId'],
    _sum: { quantidade: true },
    orderBy: { _sum: { quantidade: 'desc' } },
    where: { servicoId: { not: null } },
  })

  return { produtos, servicos }
}

export async function consumoPorTipoERaca() {
  return prisma.$queryRaw`
    SELECT p.tipo, p.raca, 
      SUM(c.quantidade) as total_quantidade
    FROM Consumo c
    JOIN Pet p ON c.petId = p.id
    WHERE c.produtoId IS NOT NULL OR c.servicoId IS NOT NULL
    GROUP BY p.tipo, p.raca
    ORDER BY total_quantidade DESC
  `
}
