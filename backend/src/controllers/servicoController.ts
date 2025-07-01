import { RequestHandler } from 'express'
import { prisma } from '../models/prisma/client'

const criar: RequestHandler = async (req, res) => {
  try {
    const data = req.body
    const servico = await prisma.servico.create({ data })
    res.status(201).json(servico)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao criar serviço' })
  }
}

const listar: RequestHandler = async (req, res) => {
  try {
    const servicos = await prisma.servico.findMany()
    res.json(servicos)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao listar serviços' })
  }
}

const buscarPorId: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const servico = await prisma.servico.findUnique({
      where: { id: Number(id) },
    })

    if (!servico) {
      res.status(404).json({ erro: 'Serviço não encontrado' })
      return
    }

    res.json(servico)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar serviço' })
  }
}

const atualizar: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const servico = await prisma.servico.update({
      where: { id: Number(id) },
      data,
    })
    res.json(servico)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao atualizar serviço' })
  }
}

const deletar: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.servico.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao deletar serviço' })
  }
}

export default {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar,
}
