import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Servico {
  id: number;
  nome: string;
  quantidade: number;
}

interface Cliente {
  id: number;
  nome: string;
  servicos: Servico[];
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ServicoConsumoCliente: React.FC<Props> = ({ show, onHide }) => {
  const [paginaCliente, setPaginaCliente] = useState(0);

  const clientes: Cliente[] = [
    {
      id: 1,
      nome: "Emily Armstrong",
      servicos: [
        { id: 1, nome: "Banho e Tosa", quantidade: 15 },
        { id: 2, nome: "Consulta Veterinária", quantidade: 8 },
        { id: 3, nome: "Vacinação", quantidade: 5 },
        { id: 4, nome: "Hidroterapia", quantidade: 3 },
        { id: 5, nome: "Adestramento", quantidade: 7 },
      ],
    },
    {
      id: 2,
      nome: "Chester Bennington",
      servicos: [
        { id: 6, nome: "Banho e Tosa", quantidade: 10 },
        { id: 7, nome: "Vacinação", quantidade: 12 },
        { id: 8, nome: "Consulta Veterinária", quantidade: 6 },
        { id: 9, nome: "Adestramento", quantidade: 9 },
        { id: 10, nome: "Hidroterapia", quantidade: 1 },
      ],
    },
    {
      id: 3,
      nome: "Mike Shinoda",
      servicos: [
        { id: 11, nome: "Banho e Tosa", quantidade: 20 },
        { id: 12, nome: "Consulta Veterinária", quantidade: 10 },
        { id: 13, nome: "Vacinação", quantidade: 4 },
        { id: 14, nome: "Hidroterapia", quantidade: 2 },
        { id: 15, nome: "Adestramento", quantidade: 8 },
      ],
    },
    {
      id: 4,
      nome: "Badaui",
      servicos: [
        { id: 16, nome: "Banho e Tosa", quantidade: 18 },
        { id: 17, nome: "Vacinação", quantidade: 7 },
        { id: 18, nome: "Consulta Veterinária", quantidade: 5 },
        { id: 19, nome: "Adestramento", quantidade: 10 },
        { id: 20, nome: "Hidroterapia", quantidade: 4 },
      ],
    },
    {
      id: 5,
      nome: "Marcelo Falcão",
      servicos: [
        { id: 21, nome: "Banho e Tosa", quantidade: 16 },
        { id: 22, nome: "Consulta Veterinária", quantidade: 9 },
        { id: 23, nome: "Vacinação", quantidade: 3 },
        { id: 24, nome: "Adestramento", quantidade: 11 },
        { id: 25, nome: "Hidroterapia", quantidade: 5 },
      ],
    },
    {
      id: 6,
      nome: "Tico Santa Cruz",
      servicos: [
        { id: 26, nome: "Banho e Tosa", quantidade: 14 },
        { id: 27, nome: "Vacinação", quantidade: 6 },
        { id: 28, nome: "Consulta Veterinária", quantidade: 8 },
        { id: 29, nome: "Adestramento", quantidade: 12 },
        { id: 30, nome: "Hidroterapia", quantidade: 3 },
      ],
    },
  ];

  const proximoCliente = () => {
    setPaginaCliente((prev) =>
      prev < clientes.length - 1 ? prev + 1 : prev
    );
  };

  const clienteAnterior = () => {
    setPaginaCliente((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const clienteAtual = clientes[paginaCliente];

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Serviços mais consumidos por Cliente</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        <h5>Cliente: {clienteAtual.nome}</h5>
        <hr />
        {clienteAtual.servicos.map((servico) => (
          <p key={servico.id} style={{ marginBottom: "0.5rem" }}>
            {servico.nome} ({servico.quantidade} vezes)
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

export default ServicoConsumoCliente;
