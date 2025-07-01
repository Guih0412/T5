import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const BuscarProdutoPorCodigo: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [codigoBusca, setCodigoBusca] = useState("");
  const [produtoEncontrado, setProdutoEncontrado] = useState<{
    nome: string;
    preco: string;
    estoque: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoBusca(e.target.value);
  };

  const buscarProduto = () => {
    // Simulação de busca
    const produto = {
      nome: "Ração Golden",
      preco: "89.90",
      estoque: "12",
    };
    setProdutoEncontrado(produto);
    setStep(2);
  };

  const voltar = () => {
    setStep(1);
    setCodigoBusca("");
    setProdutoEncontrado(null);
  };

  const fechar = () => {
    setStep(1);
    setCodigoBusca("");
    setProdutoEncontrado(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Produto por Código</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o código do produto</Form.Label>
            <Form.Control
              type="text"
              value={codigoBusca}
              onChange={handleChange}
              placeholder="Código"
            />
          </Form.Group>
        )}

        {step === 2 && produtoEncontrado && (
          <>
            <p><strong>Nome:</strong> {produtoEncontrado.nome}</p>
            <p><strong>Preço:</strong> R$ {produtoEncontrado.preco}</p>
            <p><strong>Estoque:</strong> {produtoEncontrado.estoque} unidades</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            variant="primary"
            style={{
              backgroundColor: "rgb(69,32,23)",
              borderColor: "rgb(69,32,23)",
              marginRight: "auto",
            }}
            onClick={buscarProduto}
            disabled={!codigoBusca.trim()}
          >
            Buscar
          </Button>
        )}

        {step === 2 && (
          <Button
            style={{
              backgroundColor: "rgb(69,32,23)",
              borderColor: "rgb(69,32,23)",
              marginRight: "auto",
            }}
            onClick={voltar}
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={fechar}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarProdutoPorCodigo;
