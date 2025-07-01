import { Router } from 'express'

// Importar os controllers
import clienteController from './controllers/clienteController'
import petController from './controllers/petController'
import produtoController from './controllers/produtoController'
import servicoController from './controllers/servicoController'


const router = Router()


// Rotas de Cliente
router.post('/clientes', clienteController.criar)
router.get('/clientes', clienteController.listar)
router.get('/clientes/:id', clienteController.buscarPorId)
router.put('/clientes/:id', clienteController.atualizar)
router.delete('/clientes/:id', clienteController.deletar)

// Rotas de Pet
router.post('/pets', petController.criar)
router.get('/pets', petController.listar)
router.get('/pets/:id', petController.buscarPorId)
router.put('/pets/:id', petController.atualizar)
router.delete('/pets/:id', petController.deletar)

// Rotas de Produto
router.post('/produtos', produtoController.criar)
router.get('/produtos', produtoController.listar)
router.get('/produtos/:id', produtoController.buscarPorId)
router.put('/produtos/:id', produtoController.atualizar)
router.delete('/produtos/:id', produtoController.deletar)

// Rotas de Serviço
router.post('/servicos', servicoController.criar)
router.get('/servicos', servicoController.listar)
router.get('/servicos/:id', servicoController.buscarPorId)
router.put('/servicos/:id', servicoController.atualizar)
router.delete('/servicos/:id', servicoController.deletar)



export default router
