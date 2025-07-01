import { RequestHandler } from 'express'
import { prisma } from '../models/prisma/client'

const criar: RequestHandler = async (req, res) => {
  try {
    const data = req.body
    const produto = await prisma.produto.create({ data })
    res.status(201).json(produto)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao criar produto' })
  }
}

const listar: RequestHandler = async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany()
    res.json(produtos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao listar produtos' })
  }
}

const buscarPorId: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const produto = await prisma.produto.findUnique({
      where: { id: Number(id) },
    })

    if (!produto) {
      res.status(404).json({ erro: 'Produto não encontrado' })
      return
    }

    res.json(produto)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar produto' })
  }
}

const atualizar: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data,
    })
    res.json(produto)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao atualizar produto' })
  }
}

const deletar: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.produto.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao deletar produto' })
  }
}

export default {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar,
}
