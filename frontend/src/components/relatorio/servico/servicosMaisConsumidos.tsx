import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Servico {
  id: number;
  nome: string;
  quantidade: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ServicosMaisConsumidos: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 3;

  const servicos: Servico[] = [
    { id: 1, nome: "Banho e Tosa", quantidade: 550 },
    { id: 2, nome: "Consulta Veterinária", quantidade: 520 },
    { id: 3, nome: "Vacinação", quantidade: 480 },
    { id: 4, nome: "Adestramento", quantidade: 400 },
    { id: 5, nome: "Hospedagem", quantidade: 350 },
    { id: 6, nome: "Passeio", quantidade: 320 },
  ];

  const totalPages = Math.ceil(servicos.length / itensPorPagina);

  const start = (step - 1) * itensPorPagina;
  const end = start + itensPorPagina;
  const servicosPagina = servicos.slice(start, end);

  const next = () => {
    setStep((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Serviços Mais Consumidos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {servicosPagina.map((servico) => (
          <div
            key={servico.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
              color: "rgb(69,32,23)",
            }}
          >
            <p><strong>Serviço:</strong> {servico.nome}</p>
            <p><strong>Quantidade Consumida:</strong> {servico.quantidade}</p>
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
          disabled={end >= servicos.length}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServicosMaisConsumidos;
