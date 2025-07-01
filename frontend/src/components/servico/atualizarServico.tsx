import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const AtualizarServico: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [servico, setServico] = useState({
    codigoBusca: "",
    codigo: "",
    nome: "",
    preco: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const next = () => {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetAndClose = () => {
    setStep(1);
    setServico({
      codigoBusca: "",
      codigo: "",
      nome: "",
      preco: "",
    });
    onHide();
  };

  const handleAtualizar = () => {
    alert("Serviço atualizado com sucesso!");
    resetAndClose();
  };

  return (
    <Modal show={show} onHide={resetAndClose} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Atualizar Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {step === 1 && (
            <Form.Group className="mb-3">
              <Form.Label>Digite o código do serviço a ser atualizado</Form.Label>
              <Form.Control
                type="text"
                name="codigoBusca"
                value={servico.codigoBusca}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  value={servico.codigo}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={servico.nome}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {step === 3 && (
            <Form.Group className="mb-3">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                name="preco"
                value={servico.preco}
                onChange={handleChange}
              />
            </Form.Group>
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
        {step < 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleAtualizar}
          >
            🔄 Atualizar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AtualizarServico;
