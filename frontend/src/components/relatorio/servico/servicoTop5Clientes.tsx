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

const ServicoTop5ClientesValor: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const clientes: ClienteValor[] = [
    { id: 1, nome: "Fernando Badauí", valorConsumido: 1400 },
    { id: 2, nome: "Tico Santa Cruz", valorConsumido: 1300 },
    { id: 3, nome: "Digão Raimundo", valorConsumido: 1150 },
    { id: 4, nome: "Herbert Vianna", valorConsumido: 1000 },
    { id: 5, nome: "Marcelo Camelo", valorConsumido: 950 },
  ];

  const totalPages = Math.ceil(clientes.length / itensPorPagina);
  const start = (step - 1) * itensPorPagina;
  const end = start + itensPorPagina;
  const clientesPagina = clientes.slice(start, end);

  const next = () => {
    setStep((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Top 5 Clientes por Valor Consumido em Serviços</Modal.Title>
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

export default ServicoTop5ClientesValor;
