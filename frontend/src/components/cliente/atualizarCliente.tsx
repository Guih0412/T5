import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Cliente {
  idBusca: string;
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

const AtualizarCliente: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [cliente, setCliente] = useState<Cliente>({
    idBusca: "",
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buscarCliente = async () => {
    if (!cliente.idBusca) {
      alert("Digite um ID para buscar.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/clientes/${cliente.idBusca}`);
      if (!res.ok) throw new Error("Cliente não encontrado");

      const data = await res.json();

      setCliente({
        idBusca: cliente.idBusca,
        nome: data.nome,
        nomeSocial: data.nomeSocial,
        ddd: data.ddd,
        telefone: data.telefone,
        rg: data.rg,
        rgEmissao: data.rgEmissao,
        cpf: data.cpf,
        cpfEmissao: data.cpfEmissao,
        email: data.email,
      });
      setStep(2);
    } catch (error) {
      alert("Erro ao buscar cliente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
  };

  const back = () => {
    if (step > 2) setStep(step - 1);
  };

  const handleAtualizar = async () => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/clientes/${cliente.idBusca}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: cliente.nome,
          nomeSocial: cliente.nomeSocial,
          ddd: cliente.ddd,
          telefone: cliente.telefone,
          rg: cliente.rg,
          rgEmissao: cliente.rgEmissao,
          cpf: cliente.cpf,
          cpfEmissao: cliente.cpfEmissao,
          email: cliente.email,
        }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar cliente");

      alert("Cliente atualizado com sucesso!");
      setStep(1);
      setCliente({
        idBusca: "",
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
    } catch (error) {
      alert("Erro ao atualizar cliente.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    setStep(1);
    setCliente({
      idBusca: "",
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

  return (
    <Modal show={show} onHide={handleCancelar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Atualizar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {loading && (
          <div style={{ textAlign: "center", marginBottom: "1rem" }}>
            <Spinner animation="border" />
          </div>
        )}

        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Digite o ID do cliente a ser atualizado</Form.Label>
                <Form.Control
                  type="text"
                  name="idBusca"
                  value={cliente.idBusca}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>
              <Button
                style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                onClick={buscarCliente}
                disabled={loading || !cliente.idBusca}
              >
                Buscar
              </Button>
            </>
          )}

          {(step === 2 || step === 3 || step === 4) && (
            <>
              {step === 2 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      name="nome"
                      value={cliente.nome}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome Social</Form.Label>
                    <Form.Control
                      type="text"
                      name="nomeSocial"
                      value={cliente.nomeSocial}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                </>
              )}
              {step === 3 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>DDD</Form.Label>
                    <Form.Control
                      type="text"
                      name="ddd"
                      value={cliente.ddd}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefone"
                      value={cliente.telefone}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                </>
              )}
              {step === 4 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>RG</Form.Label>
                    <Form.Control
                      type="text"
                      name="rg"
                      value={cliente.rg}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Data Emissão RG</Form.Label>
                    <Form.Control
                      type="date"
                      name="rgEmissao"
                      value={cliente.rgEmissao}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                      type="text"
                      name="cpf"
                      value={cliente.cpf}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Data Emissão CPF</Form.Label>
                    <Form.Control
                      type="date"
                      name="cpfEmissao"
                      value={cliente.cpfEmissao}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={cliente.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Form.Group>
                </>
              )}
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && step < 4 && (
          <Button
            style={{ backgroundColor: "gray", borderColor: "gray", marginRight: "8px" }}
            onClick={back}
            disabled={loading}
          >
            ⬅ Voltar
          </Button>
        )}
        {step >= 2 && step < 4 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
            disabled={loading}
          >
            Próximo ➡
          </Button>
        )}
        {step === 4 && (
          <>
            <Button
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
              onClick={handleAtualizar}
              disabled={loading}
            >
              🔄 Atualizar
            </Button>
            <Button
              style={{ backgroundColor: "gray", borderColor: "gray" }}
              onClick={handleCancelar}
              disabled={loading}
            >
              Cancelar
            </Button>
          </>
        )}
        {step === 1 && (
          <Button
            style={{ backgroundColor: "gray", borderColor: "gray" }}
            onClick={handleCancelar}
            disabled={loading}
          >
            Cancelar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AtualizarCliente;
