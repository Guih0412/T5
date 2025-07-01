import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Pet {
  id?: number;
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
  clienteId?: number;
}

const AtualizarPet: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [donoIdInput, setDonoIdInput] = useState("");
  const [petIdInput, setPetIdInput] = useState("");
  const [pet, setPet] = useState<Pet>({
    nome: "",
    genero: "",
    raca: "",
    tipo: "",
  });

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [petOriginal, setPetOriginal] = useState<Pet | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "donoIdInput") setDonoIdInput(value);
    else if (name === "petIdInput") setPetIdInput(value);
    else setPet((prev) => ({ ...prev, [name]: value }));
  };

  const next = async () => {
    setErro(null);

    if (step === 1) {
      const id = Number(donoIdInput);
      if (!id || id <= 0) return setErro("ID do dono inválido.");

      try {
        setCarregando(true);
        const res = await fetch(`http://localhost:3000/clientes/${id}`);
        if (!res.ok) throw new Error("Dono não encontrado.");
        setStep(2);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    else if (step === 2) {
      const petId = Number(petIdInput);
      if (!petId || petId <= 0) return setErro("ID do pet inválido.");

      try {
        setCarregando(true);
        const res = await fetch(`http://localhost:3000/pets/${petId}`);
        if (!res.ok) throw new Error("Pet não encontrado.");

        const data: Pet = await res.json();
        if (data.clienteId !== Number(donoIdInput)) {
          throw new Error("❌ Este pet não pertence ao dono informado.");
        }

        setPet(data);
        setPetOriginal(data); // para saber o id na hora de salvar
        setStep(3);
      } catch (err: any) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    }

    else if (step === 3) {
      setStep(4);
    }
  };

  const back = () => {
    setErro(null);
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetForm = () => {
    setStep(1);
    setDonoIdInput("");
    setPetIdInput("");
    setPet({ nome: "", genero: "", raca: "", tipo: "" });
    setErro(null);
    setPetOriginal(null);
  };

  const handleAtualizar = async () => {
    if (!petOriginal?.id) {
      alert("ID do pet não localizado.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/pets/${petOriginal.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pet, clienteId: Number(donoIdInput) }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar o pet.");

      alert("✅ Pet atualizado com sucesso!");
      resetForm();
      onHide();
    } catch (err: any) {
      alert(err.message || "Erro ao atualizar.");
    }
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
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {carregando && <Spinner animation="border" />}

        <Form>
          {step === 1 && (
            <Form.Group className="mb-3">
              <Form.Label>ID do Dono</Form.Label>
              <Form.Control
                type="text"
                name="donoIdInput"
                value={donoIdInput}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          {step === 2 && (
            <Form.Group className="mb-3">
              <Form.Label>ID do Pet</Form.Label>
              <Form.Control
                type="text"
                name="petIdInput"
                value={petIdInput}
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
