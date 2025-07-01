import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
}

interface Cliente {
  id: number;
  nome: string;
  produtos: Produto[];
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ProdutoConsumoCliente: React.FC<Props> = ({ show, onHide }) => {
  const clientes: Cliente[] = [
    {
      id: 1,
      nome: "Emily Armstrong",
      produtos: [
        { id: 1, nome: "Ração Golden", quantidade: 150 },
        { id: 2, nome: "Shampoo Pet Clean", quantidade: 120 },
        { id: 3, nome: "Coleira Anti-pulgas", quantidade: 80 },
        { id: 4, nome: "Arranhador Luxo", quantidade: 75 },
        { id: 5, nome: "Aquário Mini", quantidade: 50 },
      ],
    },
    {
      id: 2,
      nome: "Chester Bennington",
      produtos: [
        { id: 6, nome: "Comedouro Inox", quantidade: 40 },
        { id: 7, nome: "Brinquedo Pet", quantidade: 60 },
        { id: 8, nome: "Ração Premium", quantidade: 90 },
        { id: 9, nome: "Bebedouro Automático", quantidade: 30 },
        { id: 10, nome: "Areia para Gatos", quantidade: 45 },
      ],
    },
    {
      id: 3,
      nome: "Mike Shinoda",
      produtos: [
        { id: 11, nome: "Cama Pet Conforto", quantidade: 25 },
        { id: 12, nome: "Escova para Cães", quantidade: 35 },
        { id: 13, nome: "Shampoo Pet Clean", quantidade: 55 },
        { id: 14, nome: "Coleira Anti-pulgas", quantidade: 60 },
        { id: 15, nome: "Arranhador Luxo", quantidade: 40 },
      ],
    },
    {
      id: 4,
      nome: "Badaui",
      produtos: [
        { id: 16, nome: "Ração Golden", quantidade: 100 },
        { id: 17, nome: "Aquário Mini", quantidade: 20 },
        { id: 18, nome: "Comedouro Inox", quantidade: 10 },
        { id: 19, nome: "Bebedouro Automático", quantidade: 15 },
        { id: 20, nome: "Areia para Gatos", quantidade: 25 },
      ],
    },
    {
      id: 5,
      nome: "Marcelo Falcão",
      produtos: [
        { id: 21, nome: "Cama Pet Conforto", quantidade: 30 },
        { id: 22, nome: "Escova para Cães", quantidade: 20 },
        { id: 23, nome: "Brinquedo Pet", quantidade: 45 },
        { id: 24, nome: "Ração Premium", quantidade: 70 },
        { id: 25, nome: "Shampoo Pet Clean", quantidade: 35 },
      ],
    },
    {
      id: 6,
      nome: "Tico Santa Cruz",
      produtos: [
        { id: 26, nome: "Coleira Anti-pulgas", quantidade: 50 },
        { id: 27, nome: "Arranhador Luxo", quantidade: 55 },
        { id: 28, nome: "Aquário Mini", quantidade: 40 },
        { id: 29, nome: "Comedouro Inox", quantidade: 35 },
        { id: 30, nome: "Bebedouro Automático", quantidade: 25 },
      ],
    },
  ];

  const [paginaCliente, setPaginaCliente] = useState(0);

  const clienteAtual = clientes[paginaCliente];

  const proximoCliente = () => {
    if (paginaCliente < clientes.length - 1) {
      setPaginaCliente(paginaCliente + 1);
    }
  };

  const clienteAnterior = () => {
    if (paginaCliente > 0) {
      setPaginaCliente(paginaCliente - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Produtos mais consumidos por Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        <h5>Cliente: {clienteAtual.nome}</h5>
        <hr />
        {clienteAtual.produtos.map((produto) => (
          <p key={produto.id} style={{ marginBottom: "0.5rem" }}>
            {produto.nome} ({produto.quantidade} unidades)
          </p>
        ))}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={clienteAnterior}
          disabled={paginaCliente === 0}
        >
          ⬅ Anterior
        </Button>
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={proximoCliente}
          disabled={paginaCliente === clientes.length - 1}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProdutoConsumoCliente;
