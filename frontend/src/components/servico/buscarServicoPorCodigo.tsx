import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

const BuscarServicoPorId: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [idBusca, setIdBusca] = useState("");
  const [servicoEncontrado, setServicoEncontrado] = useState<Servico | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdBusca(e.target.value);
  };

  const buscarServico = async () => {
    setLoading(true);
    setErro(null);
    setServicoEncontrado(null);

    try {
      const id = Number(idBusca);
      if (isNaN(id) || id <= 0) {
        setErro("ID inválido");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3000/servicos/${id}`);

      if (res.status === 404) {
        setErro("Serviço não encontrado");
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error("Erro ao buscar serviço");

      const data: Servico = await res.json();
      setServicoEncontrado(data);
      setStep(2);
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const voltar = () => {
    setStep(1);
    setIdBusca("");
    setServicoEncontrado(null);
    setErro(null);
  };

  const fechar = () => {
    setStep(1);
    setIdBusca("");
    setServicoEncontrado(null);
    setErro(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Serviço por ID</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Digite o ID do serviço</Form.Label>
              <Form.Control
                type="text"
                value={idBusca}
                onChange={handleChange}
                placeholder="ID"
                disabled={loading}
              />
            </Form.Group>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </>
        )}

        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" />
          </div>
        )}

        {step === 2 && servicoEncontrado && (
          <>
            <p><strong>ID:</strong> {servicoEncontrado.id}</p>
            <p><strong>Nome:</strong> {servicoEncontrado.nome}</p>
            <p><strong>Preço:</strong> R$ {servicoEncontrado.preco.toFixed(2).replace(".", ",")}</p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            variant="primary"
            style={{
              backgroundColor: "rgb(69,32,23)",
              borderColor: "rgb(69,32,23)",
              marginRight: "auto",
            }}
            onClick={buscarServico}
            disabled={!idBusca.trim() || loading}
          >
            Buscar
          </Button>
        )}

        {step === 2 && (
          <Button
            style={{
              backgroundColor: "rgb(69,32,23)",
              borderColor: "rgb(69,32,23)",
              marginRight: "auto",
            }}
            onClick={voltar}
            disabled={loading}
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={fechar}
          disabled={loading}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarServicoPorId;
