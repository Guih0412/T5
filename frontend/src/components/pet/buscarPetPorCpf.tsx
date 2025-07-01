import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface PetEncontrado {
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
  donoNome: string;
}

const BuscarPetPorCPF: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [cpfBusca, setCpfBusca] = useState("");
  const [rgBusca, setRgBusca] = useState("");
  const [petEncontrado, setPetEncontrado] = useState<PetEncontrado | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "cpfBusca") setCpfBusca(value);
    else if (name === "rgBusca") setRgBusca(value);
  };

  const irParaRG = () => {
    setStep(2);
  };

  const buscarPet = () => {
    setPetEncontrado({
      nome: "Emilinha",
      genero: "Femêa",
      raca: "Pinscher",
      tipo: "Cachorro",
      donoNome: "Emily Armstrong",
    });
    setStep(3);
  };

  const voltar = () => {
    if (step === 2) {
      setStep(1);
      setRgBusca("");
    } else if (step === 3) {
      setStep(2);
      setPetEncontrado(null);
    }
  };

  const fechar = () => {
    setStep(1);
    setCpfBusca("");
    setRgBusca("");
    setPetEncontrado(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Pet por CPF</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o CPF do dono</Form.Label>
            <Form.Control
              type="text"
              name="cpfBusca"
              value={cpfBusca}
              onChange={handleChange}
              placeholder="CPF"
            />
          </Form.Group>
        )}

        {step === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o RG do Pet</Form.Label>
            <Form.Control
              type="text"
              name="rgBusca"
              value={rgBusca}
              onChange={handleChange}
              placeholder="RG do pet"
            />
          </Form.Group>
        )}

        {step === 3 && petEncontrado && (
          <>
            <p><strong>Nome do Pet:</strong> {petEncontrado.nome}</p>
            <p><strong>Gênero:</strong> {petEncontrado.genero}</p>
            <p><strong>Raça:</strong> {petEncontrado.raca}</p>
            <p><strong>Tipo:</strong> {petEncontrado.tipo}</p>
            <p><strong>Nome do Dono:</strong> {petEncontrado.donoNome}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            onClick={irParaRG}
            disabled={!cpfBusca.trim()}
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            Próximo
          </Button>
        )}

        {step === 2 && (
          <>
            <Button
              onClick={voltar}
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)", marginRight: "auto" }}
            >
              ⬅ Voltar
            </Button>
            <Button
              onClick={buscarPet}
              disabled={!rgBusca.trim()}
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            >
              Buscar Pet
            </Button>
          </>
        )}

        {step === 3 && (
          <Button
            onClick={voltar}
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          onClick={fechar}
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarPetPorCPF;
