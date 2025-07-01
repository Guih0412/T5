import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface Pet {
  id: number;
  nome: string;
  genero: string;
  raca: string;
  tipo: string;
  donoNome: string; // supondo que sua API já retorne esse campo
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ListarPets: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const petsPorPagina = 2;

  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Função para buscar os pets da API
  const buscarPets = async () => {
    setLoading(true);
    setErro(null);
    try {
      const res = await fetch("http://localhost:3000/pets"); // sua rota de pets
      if (!res.ok) throw new Error("Erro ao buscar pets");
      const data: Pet[] = await res.json();

      setPets(data);
      setStep(1); // volta para a primeira página após recarregar
    } catch (err: any) {
      setErro(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  // Buscar pets quando o modal abrir
  useEffect(() => {
    if (show) {
      buscarPets();
    } else {
      setPets([]);
      setErro(null);
      setLoading(false);
      setStep(1);
    }
  }, [show]);

  const totalPages = Math.ceil(pets.length / petsPorPagina);

  const next = () => {
    setStep((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const back = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const start = (step - 1) * petsPorPagina;
  const end = start + petsPorPagina;
  const petsPagina = pets.slice(start, end);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Lista de Pets</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody" style={{ minHeight: 200 }}>
        {loading && <Spinner animation="border" />}
        {erro && <p style={{ color: "red" }}>{erro}</p>}
        {!loading && !erro && pets.length === 0 && <p>Nenhum pet encontrado.</p>}

        {!loading && !erro && petsPagina.map((pet) => (
          <div
            key={pet.id}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
            }}
          >
            <p><strong>ID:</strong> {pet.id}</p> {/* <-- aqui */}
            <p><strong>Nome do Pet:</strong> {pet.nome}</p>
            <p><strong>Gênero:</strong> {pet.genero}</p>
            <p><strong>Raça:</strong> {pet.raca}</p>
            <p><strong>Tipo:</strong> {pet.tipo}</p>
            <p><strong>Nome do Dono:</strong> {pet.donoNome}</p>
          </div>
        ))}
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
          disabled={end >= pets.length || loading}
        >
          Próximo ➡
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ListarPets;
