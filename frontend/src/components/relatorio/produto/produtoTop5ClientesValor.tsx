import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ClienteValor {
  id: number;
  nome: string;
  valorConsumido: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ProdutoTop5ClientesValor: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const clientes: ClienteValor[] = [
    { id: 1, nome: "Emily Armstrong", valorConsumido: 1200 },
    { id: 2, nome: "Chester Bennington", valorConsumido: 1100 },
    { id: 3, nome: "Mike Shinoda", valorConsumido: 900 },
    { id: 4, nome: "Joe Hahn", valorConsumido: 850 },
    { id: 5, nome: "Brad Delson", valorConsumido: 700 },
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
        <Modal.Title>Top 5 Clientes por Valor Consumido</Modal.Title>
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
            <p><strong>Valor Consumido:</strong> R$ {cliente.valorConsumido.toFixed(2)}</p>
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

export default ProdutoTop5ClientesValor;
