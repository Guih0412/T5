import { RequestHandler } from 'express'
import * as clienteService from '../services/clienteService'

// Função para converter string em data ISO (ou undefined se inválida)
function toISODateString(dateStr?: string) {
  if (!dateStr) return undefined
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

const criar: RequestHandler = async (req, res) => {
  const data = req.body

  if (data.rgEmissao) data.rgEmissao = toISODateString(data.rgEmissao)
  if (data.cpfEmissao) data.cpfEmissao = toISODateString(data.cpfEmissao)

  try {
    const cliente = await clienteService.criarCliente(data)
    res.status(201).json(cliente)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao criar cliente' })
  }
}

const listar: RequestHandler = async (req, res) => {
  try {
    const clientes = await clienteService.listarClientes()
    res.json(clientes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao listar clientes' })
  }
}

const buscarPorId: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const cliente = await clienteService.buscarClientePorId(Number(id))
    if (!cliente) {
      res.status(404).json({ erro: 'Cliente não encontrado' })
      return
    }
    res.json(cliente)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar cliente' })
  }
}

const atualizar: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = req.body

  if (data.rgEmissao) data.rgEmissao = toISODateString(data.rgEmissao)
  if (data.cpfEmissao) data.cpfEmissao = toISODateString(data.cpfEmissao)

  try {
    const cliente = await clienteService.atualizarCliente(Number(id), data)
    res.json(cliente)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao atualizar cliente' })
  }
}

const deletar: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    await clienteService.deletarCliente(Number(id))
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao deletar cliente' })
  }
}

export default {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar,
}
