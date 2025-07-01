import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const CadastrarProduto: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [produto, setProduto] = useState({
    codigo: "",
    nome: "",
    preco: "",
    estoque: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const next = () => {
    if (step < 2) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSalvar = () => {
    alert("Produto cadastrado com sucesso!");
    resetForm();
    onHide();
  };

  const handleVoltar = () => {
    resetForm();
    onHide();
  };

  const resetForm = () => {
    setStep(1);
    setProduto({
      codigo: "",
      nome: "",
      preco: "",
      estoque: "",
    });
  };

  return (
    <Modal show={show} onHide={handleVoltar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Cadastro de Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  value={produto.codigo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={produto.nome}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="text"
                  name="preco"
                  value={produto.preco}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estoque</Form.Label>
                <Form.Control
                  type="text"
                  name="estoque"
                  value={produto.estoque}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={back}
          >
            ⬅ Voltar
          </Button>
        )}
        {step < 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleSalvar}
          >
            📝 Cadastrar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CadastrarProduto;
