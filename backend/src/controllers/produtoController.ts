import { RequestHandler } from 'express'
import { prisma } from '../models/prisma/client'

const criar: RequestHandler = async (req, res) => {
  try {
    const data = req.body;

    // Conversões seguras
    const preco = parseFloat(data.preco.replace(",", "."));
    const estoque = parseInt(data.estoque);

    if (isNaN(preco) || isNaN(estoque)) {
      res.status(400).json({ erro: "Preço ou estoque inválido." });
      return;
    }

    const produto = await prisma.produto.create({
      data: {
        nome: data.nome,
        preco,
        estoque,
      },
    });

    res.status(201).json(produto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
};

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
  const { id } = req.params;
  const data = req.body;

  
  if (data.preco && typeof data.preco === 'string') {
    const precoConvertido = parseFloat(data.preco.replace(',', '.'));
    if (isNaN(precoConvertido)) {
      res.status(400).json({ erro: 'Preço inválido' });
    }
    data.preco = precoConvertido;
  }

  if (data.estoque && typeof data.estoque === 'string') {
    const estoqueConvertido = parseInt(data.estoque);
    if (isNaN(estoqueConvertido)) {
      res.status(400).json({ erro: 'Estoque inválido' });
      return;
    }
    data.estoque = estoqueConvertido;
  }

  try {
    const produto = await prisma.produto.update({
      where: { id: Number(id) },
      data,
    });

    res.json(produto);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao atualizar produto' });
  }
};

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
