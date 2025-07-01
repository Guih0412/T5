import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ServicoPorRaca {
  id: number;
  raca: string;
  quantidade: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ServicosPorRaca: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const dados: ServicoPorRaca[] = [
    { id: 1, raca: "Golden Retriever", quantidade: 210 },
    { id: 2, raca: "Sphynx", quantidade: 150 },
    { id: 3, raca: "Shih Tzu", quantidade: 120 },
    { id: 4, raca: "Angorá", quantidade: 90 },
    { id: 5, raca: "Calopsita", quantidade: 70 },
    { id: 6, raca: "Chinchila", quantidade: 50 },
  ];

  const totalPages = Math.ceil(dados.length / itensPorPagina);

  const start = (step - 1) * itensPorPagina;
  const end = start + itensPorPagina;
  const dadosPagina = dados.slice(start, end);

  const next = () => {
    setStep((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Consumo de Serviços por Raça</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {dadosPagina.map((item) => (
          <div
            key={item.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
              color: "rgb(69,32,23)",
            }}
          >
            <p><strong>Raça:</strong> {item.raca}</p>
            <p><strong>Quantidade de serviços:</strong> {item.quantidade}</p>
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
          disabled={end >= dados.length}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServicosPorRaca;
