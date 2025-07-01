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

const ServicoTop10ClientesQuantidade: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const clientes: Cliente[] = [
    { id: 1, nome: "Emily Armstrong", quantidade: 15 },
    { id: 2, nome: "Chester Bennington", quantidade: 14 },
    { id: 3, nome: "Mike Shinoda", quantidade: 13 },
    { id: 4, nome: "Cazuza", quantidade: 12 },
    { id: 5, nome: "Renato Russo", quantidade: 11 },
    { id: 6, nome: "Roberto Frejat", quantidade: 10 },
    { id: 7, nome: "Dinho Ouro Preto", quantidade: 9 },
    { id: 8, nome: "Pitty", quantidade: 8 },
    { id: 9, nome: "Rita Lee", quantidade: 7 },
    { id: 10, nome: "Chorão", quantidade: 6 },
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
        <Modal.Title>Top 10 Clientes por Quantidade de Serviços</Modal.Title>
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
            <p>
              <strong>Nome:</strong> {cliente.nome}
            </p>
            <p>
              <strong>Quantidade Consumida:</strong> {cliente.quantidade}
            </p>
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

export default ServicoTop10ClientesQuantidade;
