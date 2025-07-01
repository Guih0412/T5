import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const ExcluirServico: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const next = () => {
    setErro(null);
    if (!id.trim()) {
      setErro("Informe um ID válido");
      return;
    }
    setStep(2);
  };

  const back = () => {
    setStep(1);
    setId("");
    setErro(null);
    onHide();
  };

  const handleConfirm = async () => {
    setErro(null);
    setLoading(true);

    const idNum = Number(id);
    if (isNaN(idNum) || idNum <= 0) {
      setErro("ID inválido");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/servicos/${idNum}`, {
        method: "DELETE",
      });

      if (res.status === 404) {
        setErro("Serviço não encontrado");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        throw new Error("Erro ao excluir serviço");
      }

      alert("Serviço excluído com sucesso!");
      setStep(1);
      setId("");
      setLoading(false);
      onHide();
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido");
      setLoading(false);
    }
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
              <Form.Label>Digite o ID do serviço a ser excluído</Form.Label>
              <Form.Control
                type="text"
                value={id}
                onChange={handleChange}
                disabled={loading}
                placeholder="ID do serviço"
              />
            </Form.Group>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </Form>
        )}

        {step === 2 && (
          <>
            <p>
              Tem certeza que deseja excluir o serviço com ID <strong>{id}</strong>?
              <br />
              Essa ação não poderá ser desfeita.
            </p>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </>
        )}
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={() => {
              setErro(null);
              setStep(1);
            }}
            disabled={loading}
          >
            ⬅ Voltar
          </Button>
        )}
        {step === 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
            disabled={loading || !id.trim()}
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
            🗑️ Excluir
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ExcluirServico;
