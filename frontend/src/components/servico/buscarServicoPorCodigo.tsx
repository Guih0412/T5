import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

const BuscarServicoPorCodigo: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [codigoBusca, setCodigoBusca] = useState("");
  const [servicoEncontrado, setServicoEncontrado] = useState<{
    nome: string;
    preco: string;
  } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoBusca(e.target.value);
  };

  const buscarServico = () => {
    // Simulação de busca
    const servico = {
      nome: "Banho e Tosa",
      preco: "59.90",
    };
    setServicoEncontrado(servico);
    setStep(2);
  };

  const voltar = () => {
    setStep(1);
    setCodigoBusca("");
    setServicoEncontrado(null);
  };

  const fechar = () => {
    setStep(1);
    setCodigoBusca("");
    setServicoEncontrado(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Serviço por Código</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o código do serviço</Form.Label>
            <Form.Control
              type="text"
              value={codigoBusca}
              onChange={handleChange}
              placeholder="Código"
            />
          </Form.Group>
        )}

        {step === 2 && servicoEncontrado && (
          <>
            <p><strong>Nome:</strong> {servicoEncontrado.nome}</p>
            <p><strong>Preço:</strong> R$ {servicoEncontrado.preco}</p>
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
            disabled={!codigoBusca}
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
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={fechar}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarServicoPorCodigo;
