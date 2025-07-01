import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Pet {
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
}

const AtualizarPet: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [cpfDono, setCpfDono] = useState("");
  const [rgPet, setRgPet] = useState("");
  const [pet, setPet] = useState<Pet>({
    nome: "",
    genero: "",
    raca: "",
    tipo: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cpfDono") {
      setCpfDono(value);
    } else if (name === "rgPet") {
      setRgPet(value);
    } else {
      setPet((prevPet) => ({
        ...prevPet,
        [name]: value,
      }));
    }
  };

  const next = () => {
    setStep((prev) => (prev < 4 ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetForm = () => {
    setStep(1);
    setCpfDono("");
    setRgPet("");
    setPet({
      nome: "",
      genero: "",
      raca: "",
      tipo: "",
    });
  };

  const handleAtualizar = () => {
    alert("Pet atualizado com sucesso!");
    resetForm();
    onHide();
  };

  const handleCancelar = () => {
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancelar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Atualizar Pet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {step === 1 && (
            <Form.Group className="mb-3">
              <Form.Label>Digite o CPF do dono do pet</Form.Label>
              <Form.Control
                type="text"
                name="cpfDono"
                value={cpfDono}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {step === 2 && (
            <Form.Group className="mb-3">
              <Form.Label>Digite o RG do pet</Form.Label>
              <Form.Control
                type="text"
                name="rgPet"
                value={rgPet}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {(step === 3 || step === 4) && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={pet.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gênero</Form.Label>
                <Form.Control
                  type="text"
                  name="genero"
                  value={pet.genero}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Raça</Form.Label>
                <Form.Control
                  type="text"
                  name="raca"
                  value={pet.raca}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  name="tipo"
                  value={pet.tipo}
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
        {step < 4 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 4 && (
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

export default AtualizarPet;
