import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Servico {
  id: number;
  nome: string;
  preco: string;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ListarServicos: React.FC<Props> = ({ show, onHide }) => {
  const servicosPorPagina = 2;

  const servicos: Servico[] = [
    { id: 1, nome: "Banho", preco: "45.00" },
    { id: 2, nome: "Tosa", preco: "60.00" },
    { id: 3, nome: "Consulta Veterinária", preco: "150.00" },
    { id: 4, nome: "Vacinação", preco: "85.00" },
    { id: 5, nome: "Higiene Bucal", preco: "40.00" },
    { id: 6, nome: "Hotel Pet Diário", preco: "100.00" },
  ];

  const [step, setStep] = useState(1);

  const totalPages = Math.ceil(servicos.length / servicosPorPagina);

  const start = (step - 1) * servicosPorPagina;
  const end = start + servicosPorPagina;
  const servicosPagina = servicos.slice(start, end);

  const next = () => {
    if (step < totalPages) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Lista de Serviços</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {servicosPagina.map((servico) => (
          <div
            key={servico.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
            }}
          >
            <p><strong>Nome:</strong> {servico.nome}</p>
            <p><strong>Preço:</strong> R$ {servico.preco}</p>
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

export default ListarServicos;
