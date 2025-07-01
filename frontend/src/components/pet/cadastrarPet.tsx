import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Dono {
  id: number;
  nome: string;
  // outros campos que quiser mostrar do dono
}

interface Pet {
  id?: number;
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
  donoId?: number; // FK para o dono
}

const CadastrarPet: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);

  const [donoIdInput, setDonoIdInput] = useState("");
  const [dono, setDono] = useState<Dono | null>(null);

  const [pet, setPet] = useState<Pet>({
    nome: "",
    genero: "",
    raca: "",
    tipo: "",
  });

  const [loadingDono, setLoadingDono] = useState(false);
  const [erroDono, setErroDono] = useState<string | null>(null);
  const [cadastrandoPet, setCadastrandoPet] = useState(false);

  // Buscar dono pelo ID digitado
  const buscarDono = async () => {
    const idNum = Number(donoIdInput.trim());
    if (isNaN(idNum) || idNum <= 0) {
      setErroDono("ID do dono inválido");
      return;
    }

    setLoadingDono(true);
    setErroDono(null);
    setDono(null);

    try {
      const res = await fetch(`http://localhost:3000/clientes/${idNum}`);
      if (!res.ok) throw new Error("Dono não encontrado");

      const data: Dono = await res.json();
      setDono(data);
      setStep(2);
    } catch (err: any) {
      setErroDono(err.message || "Erro ao buscar dono");
    } finally {
      setLoadingDono(false);
    }
  };

  const handleChangeDonoId = (e: ChangeEvent<HTMLInputElement>) => {
    setDonoIdInput(e.target.value);
    setErroDono(null);
  };

  const handleChangePet = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPet(prev => ({ ...prev, [name]: value }));
  };

  // Gerar ID aleatório para o pet (exemplo simples)
  const gerarIdPet = () => Math.floor(Math.random() * 1000000);


  const handleSalvarPet = async () => {
    if (!dono) {
      alert("Dono não selecionado");
      return;
    }

    // Aqui, envie clienteId (não donoId) e NÃO envie id, Prisma gera automático
    const petComClienteId = { ...pet, clienteId: dono.id };

    setCadastrandoPet(true);
    try {
      const res = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(petComClienteId),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar pet");

      const petCriado = await res.json();

      alert(`🐾 Pet cadastrado com sucesso! ID: ${petCriado.id}`);

      // Resetar tudo
      setStep(1);
      setDonoIdInput("");
      setDono(null);
      setPet({ nome: "", genero: "", raca: "", tipo: "" });
      onHide();
    } catch (err: any) {
      alert(err.message || "Erro ao cadastrar pet");
    } finally {
      setCadastrandoPet(false);
    }
  };

  const handleCancelar = () => {
    setStep(1);
    setDonoIdInput("");
    setDono(null);
    setPet({ nome: "", genero: "", raca: "", tipo: "" });
    setErroDono(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancelar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Cadastro de Pet</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Digite o ID do dono do pet</Form.Label>
              <Form.Control
                type="text"
                value={donoIdInput}
                onChange={handleChangeDonoId}
                placeholder="ID do Dono"
              />
            </Form.Group>
            {loadingDono && <Spinner animation="border" />}
            {erroDono && <p style={{ color: "red" }}>{erroDono}</p>}
            {dono && (
              <p style={{ color: "green" }}>
                Dono encontrado: <strong>{dono.nome}</strong> (ID: {dono.id})
              </p>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={pet.nome}
                onChange={handleChangePet}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gênero</Form.Label>
              <Form.Control
                type="text"
                name="genero"
                value={pet.genero}
                onChange={handleChangePet}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Raça</Form.Label>
              <Form.Control
                type="text"
                name="raca"
                value={pet.raca}
                onChange={handleChangePet}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="tipo"
                value={pet.tipo}
                onChange={handleChangePet}
              />
            </Form.Group>
          </>
        )}
      </Modal.Body>

      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step === 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={buscarDono}
            disabled={loadingDono || donoIdInput.trim() === ""}
          >
            Buscar Dono
          </Button>
        )}

        {step === 2 && (
          <>
            <Button
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
              onClick={() => setStep(1)}
              disabled={cadastrandoPet}
            >
              ⬅ Voltar
            </Button>
            <Button
              style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
              onClick={handleSalvarPet}
              disabled={
                cadastrandoPet ||
                !pet.nome.trim() ||
                !pet.genero.trim() ||
                !pet.raca.trim() ||
                !pet.tipo.trim()
              }
            >
              {cadastrandoPet ? "Salvando..." : "📝 Cadastrar Pet"}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CadastrarPet;
