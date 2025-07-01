import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Cliente {
  id: number;
  nome: string;
  quantidade: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ProdutoTop10ClientesQuantidade: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const clientes: Cliente[] = [
    { id: 1, nome: "Emily Armstrong", quantidade: 50 },
    { id: 2, nome: "Chester Bennington", quantidade: 48 },
    { id: 3, nome: "Mike Shinoda", quantidade: 45 },
    { id: 4, nome: "Fernando Badauí", quantidade: 40 },
    { id: 5, nome: "Tico Santa Cruz", quantidade: 38 },
    { id: 6, nome: "Marcelo Falcão", quantidade: 36 },
    { id: 7, nome: "Tales de Polli", quantidade: 30 },
    { id: 8, nome: "Carlo Alexandre", quantidade: 28 },
    { id: 9, nome: "Armandinho", quantidade: 25 },
    { id: 10, nome: "Cazuza", quantidade: 20 },
  ];

  const totalPages = Math.ceil(clientes.length / itensPorPagina);
  const start = (step - 1) * itensPorPagina;
  const end = start + itensPorPagina;
  const clientesPagina = clientes.slice(start, end);

  const next = () => {
    if (step < totalPages) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Top 10 Clientes por Quantidade de Produtos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {clientesPagina.map((cliente) => (
          <div
            key={cliente.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
              color: "rgb(69,32,23)",
            }}
          >
            <p><strong>Nome:</strong> {cliente.nome}</p>
            <p><strong>Quantidade Consumida:</strong> {cliente.quantidade}</p>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={back}
          disabled={step === 1}
        >
          ⬅ Voltar
        </Button>
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={next}
          disabled={end >= clientes.length}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProdutoTop10ClientesQuantidade;
