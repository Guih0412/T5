import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CadastrarProduto from "../components/produto/cadastrarProduto";
import ListarProduto from "../components/produto/listarProduto";
import AtualizarProduto from "../components/produto/atualizarProduto";
import ExcluirProduto from "../components/produto/excluirProduto";
import BuscarProdutoPorCodigo from "../components/produto/buscarProdutoPorCodigo";

export default function Produto() {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalListagem, setMostrarModalListagem] = useState(false);
  const [mostrarModalAtualizacao, setMostrarModalAtualizacao] = useState(false);
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [mostrarModalBuscaCodigo, setMostrarModalBuscaCodigo] = useState(false);

  const cardStyle = {
    borderColor: "#5c4033",
    backgroundColor: "rgb(255, 161, 106)",
    transition: "transform 0.2s",
    cursor: "pointer",
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  };

  return (
    <div className="container-fluid mt-5 text-center">
      <div className="d-flex align-items-center justify-content-center gap-3 title mt-5">
        <img src="/produto.png" style={{ width: "70px" }} />
        <h1 style={{ fontSize: "300%" }}>Menu de Produtos</h1>
      </div>

      <hr className="line" />

      <div className="row justify-content-center">
        {/* Card - Cadastrar Produto */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Cadastro de Produto
              </h5>
              <p className="card-text text-center subtitleCard">
                Informe corretamente os dados do produto para realizar seu cadastro
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalCadastro(true)}
                >
                  📝 Cadastrar Produto
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Cadastrar Produto */}
        <CadastrarProduto
          show={mostrarModalCadastro}
          onHide={() => setMostrarModalCadastro(false)}
        />

        {/* Card - Listar Produto */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Listagem de Produtos
              </h5>
              <p className="card-text text-center subtitleCard">
                Confira a lista completa dos produtos cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalListagem(true)}
                >
                  📋 Listar Produtos
                </Button>

                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalBuscaCodigo(true)}
                >
                  🔍 Buscar Produto
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Listar Produtos */}
        <ListarProduto
          show={mostrarModalListagem}
          onHide={() => setMostrarModalListagem(false)}
        />

        {/* Modal - Buscar Produto por Código */}
        <BuscarProdutoPorCodigo
          show={mostrarModalBuscaCodigo}
          onHide={() => setMostrarModalBuscaCodigo(false)}
        />
      </div>

      <div className="row justify-content-center">
        {/* Card - Atualizar Produto */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Atualização de Produto
              </h5>
              <p className="card-text text-center subtitleCard">
                Edite os dados dos produtos que já estão cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalAtualizacao(true)}
                >
                  🔄 Atualizar Produto
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Atualizar Produto */}
        <AtualizarProduto
          show={mostrarModalAtualizacao}
          onHide={() => setMostrarModalAtualizacao(false)}
        />

        {/* Card - Excluir Produto */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Exclusão de Produto
              </h5>
              <p className="card-text text-center subtitleCard">
                Exclua um produto do sistema de forma simples e rápida.
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalExclusao(true)}
                >
                  ❌ Excluir Produto
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Excluir Produto */}
        <ExcluirProduto
          show={mostrarModalExclusao}
          onHide={() => setMostrarModalExclusao(false)}
        />
      </div>
    </div>
  );
}
