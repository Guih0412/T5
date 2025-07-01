import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Dono {
  id: number;
  nome: string;
}

interface PetEncontrado {
  id: number;
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
  donoNome: string;
}

const BuscarPetPorId: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [donoId, setDonoId] = useState("");
  const [petId, setPetId] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [dono, setDono] = useState<Dono | null>(null);
  const [petEncontrado, setPetEncontrado] = useState<PetEncontrado | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "donoId") setDonoId(value);
    else if (name === "petId") setPetId(value);
  };

  // Busca o dono pelo ID digitado
  const buscarDono = async () => {
    setErro(null);
    setLoading(true);
    setDono(null);
    try {
      const idNum = Number(donoId.trim());
      if (!idNum || idNum <= 0) throw new Error("ID do dono inválido");

      const res = await fetch(`http://localhost:3000/clientes/${idNum}`);
      if (!res.ok) throw new Error("Dono não encontrado");

      const data: Dono = await res.json();
      setDono(data);
      setStep(2);
    } catch (err: any) {
      setErro(err.message || "Erro ao buscar dono");
    } finally {
      setLoading(false);
    }
  };

  // Busca o pet pelo ID do pet e dono
  const buscarPet = async () => {
    setErro(null);
    setLoading(true);
    setPetEncontrado(null);
    try {
      const petIdNum = Number(petId.trim());
      if (!petIdNum || petIdNum <= 0) throw new Error("ID do pet inválido");
      if (!dono) throw new Error("Dono não selecionado");

      // Aqui sua API pode precisar do donoId e petId para garantir o relacionamento
      const res = await fetch(`http://localhost:3000/pets/${petIdNum}`);
      if (!res.ok) throw new Error("Pet não encontrado");

      const petData = await res.json();

      // Verifica se o pet pertence ao dono
      if (petData.clienteId !== dono.id) {
        throw new Error("Este pet não pertence ao dono informado");
      }

      // Monta o objeto esperado, adicionando o nome do dono
      const petCompleto: PetEncontrado = {
        id: petData.id,
        nome: petData.nome,
        genero: petData.genero,
        raca: petData.raca,
        tipo: petData.tipo,
        donoNome: dono.nome,
      };

      setPetEncontrado(petCompleto);
      setStep(3);
    } catch (err: any) {
      setErro(err.message || "Erro ao buscar pet");
    } finally {
      setLoading(false);
    }
  };

  const voltar = () => {
    setErro(null);
    if (step === 2) {
      setStep(1);
      setDono(null);
      setDonoId("");
    } else if (step === 3) {
      setStep(2);
      setPetEncontrado(null);
      setPetId("");
    }
  };

  const fechar = () => {
    setStep(1);
    setDono(null);
    setPetEncontrado(null);
    setDonoId("");
    setPetId("");
    setErro(null);
    setLoading(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Pet pelo ID do Dono e do Pet</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        {loading && <Spinner animation="border" />}

        {erro && <p style={{ color: "red" }}>{erro}</p>}

        {step === 1 && (
          <Form.Group className="mb-3">
            <Form.Label>Digite o ID do dono</Form.Label>
            <Form.Control
              type="text"
              name="donoId"
              value={donoId}
              onChange={handleChange}
              placeholder="ID do Dono"
              disabled={loading}
            />
          </Form.Group>
        )}

        {step === 2 && dono && (
          <>
            <p>Proprietário encontrado: <strong>{dono.nome}</strong> (ID: {dono.id})</p>
            <Form.Group className="mb-3">
              <Form.Label>Digite o ID do pet</Form.Label>
              <Form.Control
                type="text"
                name="petId"
                value={petId}
                onChange={handleChange}
                placeholder="ID do Pet"
                disabled={loading}
              />
            </Form.Group>
          </>
        )}

        {step === 3 && petEncontrado && (
          <>
            <p><strong>Nome do Pet:</strong> {petEncontrado.nome}</p>
            <p><strong>Gênero:</strong> {petEncontrado.genero}</p>
            <p><strong>Raça:</strong> {petEncontrado.raca}</p>
            <p><strong>Tipo:</strong> {petEncontrado.tipo}</p>
            <p><strong>Nome do Dono:</strong> {petEncontrado.donoNome}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            onClick={buscarDono}
            disabled={!donoId.trim() || loading}
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            Buscar Dono
          </Button>
        )}

        {step === 2 && (
          <>
            <Button
              onClick={voltar}
              disabled={loading}
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)", marginRight: "auto" }}
            >
              ⬅ Voltar
            </Button>
            <Button
              onClick={buscarPet}
              disabled={!petId.trim() || loading}
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            >
              Buscar Pet
            </Button>
          </>
        )}

        {step === 3 && (
          <Button
            onClick={voltar}
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          onClick={fechar}
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarPetPorId;
