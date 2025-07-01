import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ListarServicos: React.FC<Props> = ({ show, onHide }) => {
  const servicosPorPagina = 2;
  const [step, setStep] = useState(1);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(servicos.length / servicosPorPagina);

  const fetchServicos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/servicos`);
      if (!res.ok) throw new Error("Erro ao buscar serviços");
      const data: Servico[] = await res.json();
      setServicos(data);
    } catch (error) {
      console.error(error);
      setServicos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchServicos();
    }
  }, [show]);

  const next = () => {
    if (step < totalPages) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const start = (step - 1) * servicosPorPagina;
  const end = start + servicosPorPagina;
  const servicosPagina = servicos.slice(start, end);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Lista de Serviços</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" />
          </div>
        ) : servicosPagina.length === 0 ? (
          <p>Nenhum serviço encontrado.</p>
        ) : (
          servicosPagina.map((servico) => (
            <div
              key={servico.id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ddd",
                paddingBottom: "0.5rem",
              }}
            >
              <p><strong>ID:</strong> {servico.id}</p>
              <p><strong>Nome:</strong> {servico.nome}</p>
              <p><strong>Preço:</strong> R${" "}{servico.preco.toFixed(2).replace(".", ",")}</p>
            </div>
          ))
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={back}
          disabled={step === 1 || loading}
        >
          ⬅ Voltar
        </Button>
        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={next}
          disabled={step === totalPages || loading}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListarServicos;
