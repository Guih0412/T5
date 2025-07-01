import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Cliente {
  nome: string;
  nomeSocial: string;
  ddd: string;
  telefone: string;
  rg: string;
  rgEmissao: string;
  cpf: string;
  cpfEmissao: string;
  email: string;
}

const CadastrarCliente: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [cliente, setCliente] = useState<Cliente>({
    nome: "",
    nomeSocial: "",
    ddd: "",
    telefone: "",
    rg: "",
    rgEmissao: "",
    cpf: "",
    cpfEmissao: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const next = () => {
    setStep((prev) => (prev < 3 ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const resetarFormulario = () => {
    setStep(1);
    setCliente({
      nome: "",
      nomeSocial: "",
      ddd: "",
      telefone: "",
      rg: "",
      rgEmissao: "",
      cpf: "",
      cpfEmissao: "",
      email: "",
    });
    onHide();
  };

  const handleSalvar = async () => {
    try {
      const response = await fetch("http://localhost:3000/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cliente),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar cliente");
      }

      const clienteCadastrado = await response.json(); // <- pega o objeto criado com id

      alert(`✅ Cliente de ID ${clienteCadastrado.id} cadastrado com sucesso!`);
      resetarFormulario();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      alert("❌ Erro ao cadastrar cliente.");
    }
  };

  return (
    <Modal show={show} onHide={resetarFormulario} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Cadastro de Cliente</Modal.Title>
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
                  value={cliente.nome}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nome Social</Form.Label>
                <Form.Control
                  type="text"
                  name="nomeSocial"
                  value={cliente.nomeSocial}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>DDD</Form.Label>
                <Form.Control
                  type="text"
                  name="ddd"
                  value={cliente.ddd}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Telefone</Form.Label>
                <Form.Control
                  type="text"
                  name="telefone"
                  value={cliente.telefone}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {step === 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>RG</Form.Label>
                <Form.Control
                  type="text"
                  name="rg"
                  value={cliente.rg}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data Emissão RG</Form.Label>
                <Form.Control
                  type="date"
                  name="rgEmissao"
                  value={cliente.rgEmissao}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>CPF</Form.Label>
                <Form.Control
                  type="text"
                  name="cpf"
                  value={cliente.cpf}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Data Emissão CPF</Form.Label>
                <Form.Control
                  type="date"
                  name="cpfEmissao"
                  value={cliente.cpfEmissao}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={cliente.email}
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
        {step < 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
          >
            Próximo ➡
          </Button>
        )}
        {step === 3 && (
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

export default CadastrarCliente;
