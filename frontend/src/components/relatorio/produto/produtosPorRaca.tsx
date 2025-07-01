import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface ProdutoPorRaca {
  id: number;
  raca: string;
  quantidade: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ProdutosPorRaca: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const dados: ProdutoPorRaca[] = [
    { id: 1, raca: "Labrador", quantidade: 180 },
    { id: 2, raca: "Persa", quantidade: 140 },
    { id: 3, raca: "Siamês", quantidade: 120 },
    { id: 4, raca: "Golden Retriever", quantidade: 100 },
    { id: 5, raca: "Poodle", quantidade: 90 },
    { id: 6, raca: "Maine Coon", quantidade: 70 },
  ];

  const totalPages = Math.ceil(dados.length / itensPorPagina);
  const start = (step - 1) * itensPorPagina;
  const end = start + itensPorPagina;
  const dadosPagina = dados.slice(start, end);

  const next = () => {
    if (step < totalPages) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Consumo de Produtos por Raça</Modal.Title>
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
            <p><strong>Quantidade Consumida:</strong> {item.quantidade}</p>
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

export default ProdutosPorRaca;
