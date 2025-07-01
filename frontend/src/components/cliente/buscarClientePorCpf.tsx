import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  ddd?: string;
  telefone: string;
  email: string;
  cpf?: string;
  cpfEmissao?: string;
  rg?: string;
  rgEmissao?: string;
  pets?: Array<{ id: number; nome: string; tipo: string; raca: string }>;
}

const BuscarClientePorID: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [idBusca, setIdBusca] = useState("");
  const [clienteEncontrado, setClienteEncontrado] = useState<Cliente | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIdBusca(e.target.value);
  };

  const buscarCliente = async () => {
    setErro(null);
    const idNum = Number(idBusca);
    if (isNaN(idNum) || idNum <= 0) {
      setErro("Por favor, digite um ID válido.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/clientes/${idNum}`);
      if (!res.ok) throw new Error("Cliente não encontrado");
      const data = await res.json();
      setClienteEncontrado(data);
      setStep(2);
    } catch (err) {
      setErro("Cliente não encontrado.");
      setClienteEncontrado(null);
      console.error(err);
    }
  };

  const voltar = () => {
    setStep(1);
    setIdBusca("");
    setClienteEncontrado(null);
    setErro(null);
  };

  const fechar = () => {
    setStep(1);
    setIdBusca("");
    setClienteEncontrado(null);
    setErro(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Cliente por ID</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Digite o ID do cliente</Form.Label>
              <Form.Control
                type="number"
                value={idBusca}
                onChange={handleChange}
                placeholder="ID do cliente"
                min={1}
              />
            </Form.Group>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </>
        )}

        {step === 2 && clienteEncontrado && (
          <>
            <p><strong>ID:</strong> {clienteEncontrado.id}</p>
            <p><strong>Nome:</strong> {clienteEncontrado.nome}</p>
            <p><strong>Nome Social:</strong> {clienteEncontrado.nomeSocial}</p>
            {clienteEncontrado.ddd && <p><strong>DDD:</strong> {clienteEncontrado.ddd}</p>}
            <p><strong>Telefone:</strong> {clienteEncontrado.telefone}</p>
            <p><strong>Email:</strong> {clienteEncontrado.email}</p>
            {clienteEncontrado.cpf && <p><strong>CPF:</strong> {clienteEncontrado.cpf}</p>}
            {clienteEncontrado.cpfEmissao && <p><strong>Data de Emissão do CPF:</strong> {clienteEncontrado.cpfEmissao}</p>}
            {clienteEncontrado.rg && <p><strong>RG:</strong> {clienteEncontrado.rg}</p>}
            {clienteEncontrado.rgEmissao && <p><strong>Data de Emissão do RG:</strong> {clienteEncontrado.rgEmissao}</p>}
            {clienteEncontrado.pets && clienteEncontrado.pets.length > 0 && (
              <div style={{ marginLeft: "1rem" }}>
                <strong>Pets:</strong>
                <ul>
                  {clienteEncontrado.pets.map(pet => (
                    <li key={pet.id}>
                      {pet.nome} ({pet.tipo} - {pet.raca})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            variant="primary"
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)", marginRight: "auto" }}
            onClick={buscarCliente}
            disabled={!idBusca}
          >
            Buscar
          </Button>
        )}

        {step === 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)", marginRight: "auto" }}
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

export default BuscarClientePorID;
