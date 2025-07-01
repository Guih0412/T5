import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

interface Props {
  show: boolean;
  onHide: () => void;
}

const ListarProdutos: React.FC<Props> = ({ show, onHide }) => {
  const produtosPorPagina = 2;
  const [step, setStep] = useState(1);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const totalPages = Math.ceil(produtos.length / produtosPorPagina);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/produtos`);
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const data: Produto[] = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error(error);
      setProdutos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchProdutos();
    }
  }, [show]);

  const next = () => {
    if (step < totalPages) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const start = (step - 1) * produtosPorPagina;
  const end = start + produtosPorPagina;
  const produtosPagina = produtos.slice(start, end);

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Lista de Produtos</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modalBody">
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" />
          </div>
        ) : produtosPagina.length === 0 ? (
          <p>Nenhum produto encontrado.</p>
        ) : (
          produtosPagina.map((produto) => (
            <div
              key={produto.id}
              style={{
                marginBottom: "1rem",
                borderBottom: "1px solid #ddd",
                paddingBottom: "0.5rem",
              }}
            >
              <p><strong>ID:</strong> {produto.id}</p> {/* Aqui o id */}
              <p><strong>Nome:</strong> {produto.nome}</p>
              <p><strong>Preço:</strong> R${" "}{produto.preco.toFixed(2).replace(".", ",")}</p>
              <p><strong>Estoque:</strong> {produto.estoque} unidades</p>
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

export default ListarProdutos;
