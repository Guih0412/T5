import { RequestHandler } from 'express'
import { prisma } from '../models/prisma/client'

const criar: RequestHandler = async (req, res) => {
  try {
    const { nome, genero, raca, tipo, clienteId } = req.body;

    if (!clienteId) {
      res.status(400).json({ erro: 'clienteId é obrigatório' });
      return;
    }

    const pet = await prisma.pet.create({
      data: {
        nome,
        genero,
        raca,
        tipo,
        clienteId, // aqui liga o pet ao cliente pelo id
      },
    });

    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao criar pet' });
  }
};

const listar: RequestHandler = async (req, res) => {
  try {
    // Busca os pets incluindo o cliente (dono) relacionado
    const pets = await prisma.pet.findMany({
      include: {
        cliente: true,  // inclui o objeto cliente inteiro
      }
    })

    // Mapeia para enviar os dados com donoNome no lugar certo
    const petsComDonoNome = pets.map(pet => ({
      id: pet.id,
      nome: pet.nome,
      genero: pet.genero,
      raca: pet.raca,
      tipo: pet.tipo,
      donoNome: pet.cliente.nome, // pega o nome do cliente dono
    }))

    res.json(petsComDonoNome)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao listar pets' })
  }
}

const buscarPorId: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: Number(id) },
    })
    if (!pet) {
      res.status(404).json({ erro: 'Pet não encontrado' })
      return
    }
    res.json(pet)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar pet' })
  }
}

const atualizar: RequestHandler = async (req, res) => {
  const { id } = req.params
  const data = req.body
  try {
    const pet = await prisma.pet.update({
      where: { id: Number(id) },
      data,
    })
    res.json(pet)
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao atualizar pet' })
  }
}

const deletar: RequestHandler = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.pet.delete({ where: { id: Number(id) } })
    res.status(204).end()
  } catch (err) {
    console.error(err)
    res.status(400).json({ erro: 'Erro ao deletar pet' })
  }
}

export default {
  criar,
  listar,
  buscarPorId,
  atualizar,
  deletar,
}
