import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Servico {
  id?: number;
  nome: string;
  preco: string;
}

const CadastrarServico: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [servico, setServico] = useState<Servico>({
    nome: "",
    preco: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const next = () => {
    if (step < 2) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSalvar = async () => {
    try {
      const servicoComId = {
        ...servico,
      };

      const response = await fetch("http://localhost:3000/servicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(servicoComId),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar serviço");

      const servicoCriado = await response.json();

      alert(`📝 Serviço de ID ${servicoCriado.id} cadastrado com sucesso!`);
      resetForm();
      onHide();
    } catch (error) {
      console.error("Erro ao cadastrar serviço:", error);
      alert("❌ Erro ao cadastrar serviço.");
    }
  };

  const handleVoltar = () => {
    resetForm();
    onHide();
  };

  const resetForm = () => {
    setStep(1);
    setServico({
      nome: "",
      preco: "",
    });
  };

  return (
    <Modal show={show} onHide={handleVoltar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Cadastro de Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={servico.nome}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="text"
                  name="preco"
                  value={servico.preco}
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
        {step < 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleSalvar}
          >
            📝 Cadastrar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CadastrarServico;
