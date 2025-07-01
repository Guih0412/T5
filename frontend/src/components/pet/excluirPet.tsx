import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const ExcluirPet: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [clienteId, setClienteId] = useState("");
  const [petId, setPetId] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "clienteId") setClienteId(value);
    else if (name === "petId") setPetId(value);
    setErro(null);
  };

  const next = () => {
    setStep(step + 1);
  };

  const back = () => {
    if (step === 1) {
      fechar();
    } else {
      setStep(step - 1);
    }
  };

  const fechar = () => {
    setStep(1);
    setClienteId("");
    setPetId("");
    setErro(null);
    setLoading(false);
    onHide();
  };

  const handleExcluirPet = async () => {
    setLoading(true);
    setErro(null);

    try {
      const petIdNum = Number(petId);
      const clienteIdNum = Number(clienteId);

      if (!petIdNum || !clienteIdNum) throw new Error("IDs inválidos");

      // (opcional) Buscar o pet antes para confirmar que pertence ao cliente
      const petRes = await fetch(`http://localhost:3000/pets/${petIdNum}`);
      if (!petRes.ok) throw new Error("Pet não encontrado");

      const petData = await petRes.json();
      if (petData.clienteId !== clienteIdNum) {
        throw new Error("Este pet não pertence ao cliente informado.");
      }

      // Deleta o pet
      const deleteRes = await fetch(`http://localhost:3000/pets/${petIdNum}`, {
        method: "DELETE",
      });

      if (!deleteRes.ok) throw new Error("Erro ao excluir o pet.");

      alert("✅ Pet excluído com sucesso!");
      fechar();
    } catch (err: any) {
      setErro(err.message || "Erro ao excluir pet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Excluir Pet</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {loading && <Spinner animation="border" />}

        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>ID do Cliente dono do pet</Form.Label>
            <Form.Control
              type="text"
              name="clienteId"
              value={clienteId}
              onChange={handleChange}
              disabled={loading}
            />
          </Form.Group>
        )}

        {step === 2 && (
          <Form.Group className="mb-3">
            <Form.Label>ID do Pet a ser excluído</Form.Label>
            <Form.Control
              type="text"
              name="petId"
              value={petId}
              onChange={handleChange}
              disabled={loading}
            />
          </Form.Group>
        )}

        {step === 3 && (
          <p>
            Tem certeza que deseja excluir o pet de ID <strong>{petId}</strong> do cliente <strong>{clienteId}</strong>?<br />
            Essa ação não poderá ser desfeita.
          </p>
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            onClick={back}
            disabled={loading}
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            ⬅ Voltar
          </Button>
        )}

        {step < 3 && (
          <Button
            onClick={next}
            disabled={
              loading ||
              (step === 1 && !clienteId.trim()) ||
              (step === 2 && !petId.trim())
            }
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            Próximo ➡
          </Button>
        )}

        {step === 3 && (
          <Button
            onClick={handleExcluirPet}
            disabled={loading}
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            🗑️ Excluir
          </Button>
        )}

        <Button
          onClick={fechar}
          disabled={loading}
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirPet;
