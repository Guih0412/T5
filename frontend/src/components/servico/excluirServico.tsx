import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const ExcluirServico: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [codigo, setCodigo] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigo(e.target.value);
  };

  const next = () => {
    setStep(2);
  };

  const back = () => {
    setStep(1);
    setCodigo("");
    onHide();
  };

  const handleConfirm = () => {
    alert("Serviço excluído com sucesso!");
    setStep(1);
    setCodigo("");
    onHide();
  };

  return (
    <Modal show={show} onHide={back} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Excluir Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Digite o código do serviço a ser excluído</Form.Label>
              <Form.Control
                type="text"
                name="codigo"
                value={codigo}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        )}

        {step === 2 && (
          <p>
            Tem certeza que deseja excluir o serviço?
            <br />
            Essa ação não poderá ser desfeita.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={() => setStep(1)}
          >
            ⬅ Voltar
          </Button>
        )}
        {step === 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
            disabled={!codigo}
          >
            Próximo ➡
          </Button>
        )}
        {step === 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleConfirm}
          >
            🗑️ Excluir
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirServico;
