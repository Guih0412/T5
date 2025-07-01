import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";


interface Pet {
  id: number;
  nome: string;
  tipo: string;
  raca: string;
}

interface Cliente {
  id: number;
  nome: string;
  nomeSocial: string;
  ddd: string;
  telefone: string;
  email: string;
  cpf: string;
  cpfEmissao: string;
  rg: string;
  rgEmissao: string;
  pets?: Pet[];
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ListarClientes: React.FC<Props> = ({ show, onHide }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const clientesPorPagina = 2;
  const totalPages = Math.ceil(clientes.length / clientesPorPagina);
  const start = (step - 1) * clientesPorPagina;
  const end = start + clientesPorPagina;
  const clientesPagina = clientes.slice(start, end);

  useEffect(() => {
    if (show) {
      setStep(1); // reinicia a página quando modal abre
      setLoading(true);
      setErro(null);

      fetch("http://localhost:3000/clientes") // ajuste se sua porta/backend for diferente
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar clientes");
          return res.json();
        })
        .then((data) => setClientes(data))
        .catch((err) => setErro(err.message))
        .finally(() => setLoading(false));
    }
  }, [show]);

  const next = () => setStep((prev) => (prev < totalPages ? prev + 1 : prev));
  const back = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Lista de Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" /> Carregando...
          </div>
        ) : erro ? (
          <p style={{ color: "red" }}>Erro: {erro}</p>
        ) : clientesPagina.length === 0 ? (
          <p>Nenhum cliente encontrado.</p>
        ) : (
          clientesPagina.map((cliente) => (
            <div key={cliente.id} style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}>
              <p><strong>ID:</strong> {cliente.id}</p>
              <p><strong>Nome:</strong> {cliente.nome}</p>
              <p><strong>Nome Social:</strong> {cliente.nomeSocial}</p>
              <p><strong>DDD:</strong> {cliente.ddd}</p>
              <p><strong>Telefone:</strong> {cliente.telefone}</p>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>CPF:</strong> {cliente.cpf}</p>
              <p><strong>Data de Emissão do CPF:</strong> {cliente.cpfEmissao}</p>
              <p><strong>RG:</strong> {cliente.rg}</p>
              <p><strong>Data de Emissão do RG:</strong> {cliente.rgEmissao}</p>
              {cliente.pets && cliente.pets.length > 0 && (
                <div style={{ marginLeft: "1rem" }}>
                  <strong>Pets:</strong>
                  <ul>
                    {cliente.pets.map((pet: any) => (
                      <li key={pet.id}>
                        {pet.nome} ({pet.tipo} - {pet.raca})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )))
        }
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
          disabled={end >= clientes.length || loading}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListarClientes;
