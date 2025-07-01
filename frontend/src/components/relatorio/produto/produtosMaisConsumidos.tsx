import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ProdutosMaisConsumidos: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const itensPorPagina = 2;

  const produtos: Produto[] = [
    { id: 1, nome: "Ração Golden", quantidade: 500 },
    { id: 2, nome: "Shampoo Pet Clean", quantidade: 450 },
    { id: 3, nome: "Coleira Anti-pulgas", quantidade: 400 },
    { id: 4, nome: "Arranhador Luxo", quantidade: 350 },
    { id: 5, nome: "Aquário Mini", quantidade: 300 },
    { id: 6, nome: "Comedouro Inox", quantidade: 250 },
  ];

  const totalPages = Math.ceil(produtos.length / itensPorPagina);
  const start = (step - 1) * itensPorPagina;
  const end = start + itensPorPagina;
  const produtosPagina = produtos.slice(start, end);

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
        <Modal.Title>Produtos Mais Consumidos</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {produtosPagina.map((produto) => (
          <div
            key={produto.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
              color: "rgb(69,32,23)",
            }}
          >
            <p><strong>Produto:</strong> {produto.nome}</p>
            <p><strong>Quantidade Consumida:</strong> {produto.quantidade}</p>
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
          disabled={end >= produtos.length}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProdutosMaisConsumidos;
