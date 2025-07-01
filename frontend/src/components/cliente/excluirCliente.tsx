import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const ExcluirCliente: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const next = () => {
    setStep(2);
  };

  const back = () => {
    setStep(1);
    setId("");
    setErro(null);
    onHide();
  };

  const handleConfirm = async () => {
    if (!id) {
      setErro("Informe o ID para excluir");
      return;
    }

    setLoading(true);
    setErro(null);
    try {
      // Ajuste a URL para seu backend; assumindo rota /clientes/:id
      const response = await fetch(`http://localhost:3000/clientes/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir cliente");
      }

      alert("Cliente excluído com sucesso!");
      setStep(1);
      setId("");
      onHide();
    } catch (error: any) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={back} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Excluir Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Digite o ID do cliente a ser excluído</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={id}
                onChange={handleChange}
                placeholder="ID do cliente"
              />
            </Form.Group>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </Form>
        )}

        {step === 2 && (
          <p>
            Tem certeza que deseja excluir o cliente?
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
            disabled={loading}
          >
            ⬅ Voltar
          </Button>
        )}
        {step === 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
            disabled={!id || loading}
          >
            Próximo ➡
          </Button>
        )}
        {step === 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "🗑️ Excluir"}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirCliente;
