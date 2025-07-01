import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

const BuscarProdutoPorCodigo: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [codigoBusca, setCodigoBusca] = useState("");
  const [produtoEncontrado, setProdutoEncontrado] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCodigoBusca(e.target.value);
  };

  const buscarProduto = async () => {
    setLoading(true);
    setErro(null);
    setProdutoEncontrado(null);

    try {
      const id = Number(codigoBusca);
      if (isNaN(id) || id <= 0) {
        setErro("ID inválido");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3000/produtos/${id}`);

      if (res.status === 404) {
        setErro("Produto não encontrado");
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error("Erro ao buscar produto");

      const data: Produto = await res.json();
      setProdutoEncontrado(data);
      setStep(2);
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const voltar = () => {
    setStep(1);
    setCodigoBusca("");
    setProdutoEncontrado(null);
    setErro(null);
  };

  const fechar = () => {
    setStep(1);
    setCodigoBusca("");
    setProdutoEncontrado(null);
    setErro(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={fechar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Buscar Produto por Código</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        {step === 1 && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Digite o código do produto</Form.Label>
              <Form.Control
                type="text"
                value={codigoBusca}
                onChange={handleChange}
                placeholder="Código"
                disabled={loading}
              />
            </Form.Group>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
          </>
        )}

        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" />
          </div>
        )}

        {step === 2 && produtoEncontrado && (
          <>
            <p><strong>ID:</strong> {produtoEncontrado.id}</p>
            <p><strong>Nome:</strong> {produtoEncontrado.nome}</p>
            <p><strong>Preço:</strong> R$ {produtoEncontrado.preco.toFixed(2).replace(".", ",")}</p>
            <p><strong>Estoque:</strong> {produtoEncontrado.estoque} unidades</p>
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
            onClick={buscarProduto}
            disabled={!codigoBusca.trim() || loading}
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
            disabled={loading}
          >
            ⬅ Voltar
          </Button>
        )}

        <Button
          style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
          onClick={fechar}
          disabled={loading}
        >
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BuscarProdutoPorCodigo;
