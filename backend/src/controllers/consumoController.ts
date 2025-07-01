import { Request, Response } from 'express'
import { prisma } from '../models/prisma/client'

export default {
  async registrar(req: Request, res: Response) {
    const data = req.body
    try {
      const consumo = await prisma.consumo.create({ data })
      res.status(201).json(consumo)
    } catch (err) {
      res.status(400).json({ erro: 'Erro ao registrar consumo' })
    }
  },

  async listar(req: Request, res: Response) {
    const consumos = await prisma.consumo.findMany({
      include: {
        cliente: true,
        pet: true,
        produto: true,
        servico: true,
      },
    })
    res.json(consumos)
  },

  async topClientesPorQuantidade(req: Request, res: Response) {
    try {
      const grupos = await prisma.consumo.groupBy({
        by: ['clienteId'],
        _sum: { quantidade: true },
        orderBy: { _sum: { quantidade: 'desc' } },
        take: 10,
      })

      // Buscar clientes dos ids retornados no groupBy
      const clienteIds = grupos.map(g => g.clienteId)
      const clientes = await prisma.cliente.findMany({
        where: { id: { in: clienteIds } }
      })

      // Juntar os dados dos clientes com as somas
      const resultado = grupos.map(g => ({
        cliente: clientes.find(c => c.id === g.clienteId),
        totalQuantidade: g._sum.quantidade,
      }))

      res.json(resultado)
    } catch (err) {
      console.error(err)
      res.status(500).json({ erro: 'Erro ao gerar relatório' })
    }
  },

  async topClientesPorValor(req: Request, res: Response) {
    try {
      const grupos = await prisma.consumo.groupBy({
        by: ['clienteId'],
        _sum: { valorTotal: true },
        orderBy: { _sum: { valorTotal: 'desc' } },
        take: 5,
      })

      const clienteIds = grupos.map(g => g.clienteId)
      const clientes = await prisma.cliente.findMany({
        where: { id: { in: clienteIds } }
      })

      const resultado = grupos.map(g => ({
        cliente: clientes.find(c => c.id === g.clienteId),
        totalValor: g._sum.valorTotal,
      }))

      res.json(resultado)
    } catch (err) {
      console.error(err)
      res.status(500).json({ erro: 'Erro ao gerar relatório' })
    }
  },

  // Relatório 5: Serviços ou produtos mais consumidos
  async produtosMaisConsumidos(req: Request, res: Response) {
    // Agrupa consumo por produtoId e servicoId, somando quantidades
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

    res.json({ produtos, servicos })
  },

  // Relatório 6: Serviços ou produtos mais consumidos por tipo e raça de pets
  async consumoPorTipoERaca(req: Request, res: Response) {
    const consumos = await prisma.$queryRaw`
      SELECT p.tipo, p.raca, 
        SUM(c.quantidade) as total_quantidade
      FROM Consumo c
      JOIN Pet p ON c.petId = p.id
      WHERE c.produtoId IS NOT NULL OR c.servicoId IS NOT NULL
      GROUP BY p.tipo, p.raca
      ORDER BY total_quantidade DESC
    `
    res.json(consumos)
  },
}
