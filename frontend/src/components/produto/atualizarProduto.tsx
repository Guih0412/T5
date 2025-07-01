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

const AtualizarProduto: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [produto, setProduto] = useState({
    idBusca: "",
    nome: "",
    preco: "",
    estoque: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Busca o produto pelo ID quando avançar da etapa 1
  const next = async () => {
    if (step === 1) {
      setErro(null);
      setLoading(true);

      const id = Number(produto.idBusca);
      if (isNaN(id) || id <= 0) {
        setErro("ID inválido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/produtos/${id}`);
        if (res.status === 404) {
          setErro("Produto não encontrado");
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Erro ao buscar produto");

        const data: Produto = await res.json();

        setProduto({
          idBusca: id.toString(),
          nome: data.nome,
          preco: data.preco.toString().replace(".", ","),
          estoque: data.estoque.toString(),
        });

        setStep(2);
      } catch (error: any) {
        setErro(error.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    } else if (step < 3) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step === 2) {
      // Voltar para etapa de busca limpa os dados (exceto idBusca)
      setProduto((prev) => ({
        ...prev,
        nome: "",
        preco: "",
        estoque: "",
      }));
      setErro(null);
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const resetForm = () => {
    setStep(1);
    setLoading(false);
    setErro(null);
    setProduto({
      idBusca: "",
      nome: "",
      preco: "",
      estoque: "",
    });
  };

  const handleAtualizar = async () => {
    setErro(null);
    setLoading(true);

    try {
      const id = Number(produto.idBusca);
      if (isNaN(id) || id <= 0) {
        setErro("ID inválido");
        setLoading(false);
        return;
      }

      // Converter preco para formato número com ponto decimal
      const precoFormatado = parseFloat(produto.preco.replace(",", "."));
      const estoqueFormatado = parseInt(produto.estoque);

      if (isNaN(precoFormatado) || isNaN(estoqueFormatado)) {
        setErro("Preço ou estoque inválido");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT", // ou PATCH conforme sua API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: produto.nome,
          preco: precoFormatado,
          estoque: estoqueFormatado,
        }),
      });

      if (!res.ok) {
        const erroJson = await res.json().catch(() => null);
        throw new Error(erroJson?.erro || "Erro ao atualizar produto");
      }

      alert("Produto atualizado com sucesso!");
      resetForm();
      onHide();
    } catch (error: any) {
      setErro(error.message || "Erro desconhecido");
      setLoading(false);
    }
  };

  const handleCancelar = () => {
    resetForm();
    onHide();
  };

  return (
    <Modal show={show} onHide={handleCancelar} centered size="lg">
      <Modal.Header closeButton className="modalHeader">
        <Modal.Title>Atualizar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Digite o ID do produto a ser atualizado</Form.Label>
                <Form.Control
                  type="text"
                  name="idBusca"
                  value={produto.idBusca}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="ID do produto"
                />
              </Form.Group>
              {erro && <p style={{ color: "red" }}>{erro}</p>}
            </>
          )}

          {(step === 2 || step === 3) && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={produto.nome}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>
              {step === 2 && (
                <Form.Group className="mb-3">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    type="text"
                    name="preco"
                    value={produto.preco}
                    onChange={handleChange}
                    disabled={loading}
                    placeholder="Ex: 12,50"
                  />
                </Form.Group>
              )}
              {step === 3 && (
                <Form.Group className="mb-3">
                  <Form.Label>Estoque</Form.Label>
                  <Form.Control
                    type="text"
                    name="estoque"
                    value={produto.estoque}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </Form.Group>
              )}
              {erro && <p style={{ color: "red" }}>{erro}</p>}
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "rgb(255, 161, 106)" }}>
        {step > 1 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={back}
            disabled={loading}
          >
            ⬅ Voltar
          </Button>
        )}
        {step < 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
            disabled={loading}
          >
            Próximo ➡
          </Button>
        )}
        {step === 3 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={handleAtualizar}
            disabled={loading}
          >
            🔄 Atualizar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AtualizarProduto;
