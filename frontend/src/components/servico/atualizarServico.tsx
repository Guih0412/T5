import React, { useState, ChangeEvent } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: () => void;
}

interface Servico {
  id: number;
  nome: string;
  preco: number;
}

const AtualizarServico: React.FC<Props> = ({ show, onHide }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const [servico, setServico] = useState({
    idBusca: "",
    nome: "",
    preco: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServico((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Busca o serviço pelo ID quando avançar da etapa 1
  const next = async () => {
    if (step === 1) {
      setErro(null);
      setLoading(true);

      const id = Number(servico.idBusca);
      if (isNaN(id) || id <= 0) {
        setErro("ID inválido");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/servicos/${id}`);
        if (res.status === 404) {
          setErro("Serviço não encontrado");
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Erro ao buscar serviço");

        const data: Servico = await res.json();

        setServico({
          idBusca: id.toString(),
          nome: data.nome,
          preco: data.preco.toString().replace(".", ","),
        });

        setStep(2);
      } catch (error: any) {
        setErro(error.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    } else if (step < 2) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step === 2) {
      // Voltar para etapa de busca limpa os dados (exceto idBusca)
      setServico((prev) => ({
        ...prev,
        nome: "",
        preco: "",
      }));
      setErro(null);
      setStep(1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setLoading(false);
    setErro(null);
    setServico({
      idBusca: "",
      nome: "",
      preco: "",
    });
  };

  const handleAtualizar = async () => {
    setErro(null);
    setLoading(true);

    try {
      const id = Number(servico.idBusca);
      if (isNaN(id) || id <= 0) {
        setErro("ID inválido");
        setLoading(false);
        return;
      }

      // Converter preco para formato número com ponto decimal
      const precoFormatado = parseFloat(servico.preco.replace(",", "."));

      if (isNaN(precoFormatado)) {
        setErro("Preço inválido");
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:3000/servicos/${id}`, {
        method: "PUT", // ou PATCH conforme sua API
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: servico.nome,
          preco: precoFormatado,
        }),
      });

      if (!res.ok) {
        const erroJson = await res.json().catch(() => null);
        throw new Error(erroJson?.erro || "Erro ao atualizar serviço");
      }

      alert("Serviço atualizado com sucesso!");
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
        <Modal.Title>Atualizar Serviço</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modalBody">
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Digite o ID do serviço a ser atualizado</Form.Label>
                <Form.Control
                  type="text"
                  name="idBusca"
                  value={servico.idBusca}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="ID do serviço"
                />
              </Form.Group>
              {erro && <p style={{ color: "red" }}>{erro}</p>}
            </>
          )}

          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={servico.nome}
                  onChange={handleChange}
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                  type="text"
                  name="preco"
                  value={servico.preco}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="Ex: 12,50"
                />
              </Form.Group>

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
        {step < 2 && (
          <Button
            style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
            onClick={next}
            disabled={loading}
          >
            Próximo ➡
          </Button>
        )}
        {step === 2 && (
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

export default AtualizarServico;
