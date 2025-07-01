import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const ExcluirPet: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [cpfCliente, setCpfCliente] = useState("");
  const [rgPet, setRgPet] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cpfCliente") setCpfCliente(value);
    else if (name === "rgPet") setRgPet(value);
  };

  const next = () => {
    if (step < 3) setStep(step + 1);
  };

  const back = () => {
    if (step === 1) {
      onHide();
      setStep(1);
      setCpfCliente("");
      setRgPet("");
    } else {
      setStep(step - 1);
    }
  };

  const handleConfirm = () => {
    alert("Pet excluído com sucesso!");
    onHide();
    setStep(1);
    setCpfCliente("");
    setRgPet("");
  };

  return (
    <Modal show={show} onHide={back} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Excluir Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o CPF do cliente dono do pet</Form.Label>
            <Form.Control
              type="text"
              name="cpfCliente"
              value={cpfCliente}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        {step === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o RG do pet a ser excluído</Form.Label>
            <Form.Control
              type="text"
              name="rgPet"
              value={rgPet}
              onChange={handleChange}
            />
          </Form.Group>
        )}

        {step === 3 && (
          <p>
            Tem certeza que deseja excluir o pet com RG <strong>{rgPet}</strong> do cliente com CPF <strong>{cpfCliente}</strong>?
            <br />
            Essa ação não poderá ser desfeita.
          </p>
        )}
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
            disabled={
              (step === 1 && !cpfCliente.trim()) ||
              (step === 2 && !rgPet.trim())
            }
          >
            Próximo ➡
          </Button>
        )}
        {step === 3 && (
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

export default ExcluirPet;
