import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CadastrarServico from "../components/servico/cadastrarServico";
import ListarServico from "../components/servico/listarServico";
import AtualizarServico from "../components/servico/atualizarServico";
import ExcluirServico from "../components/servico/excluirServico";
import BuscarServicoPorCodigo from "../components/servico/buscarServicoPorCodigo";

export default function Servico() {
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
        <img src="/servico.png" style={{ width: "70px" }} />
        <h1 style={{ fontSize: "300%" }}>Menu de Serviços</h1>
      </div>

      <hr className="line" />

      <div className="row justify-content-center">
        {/* Card - Cadastrar Serviço */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Cadastro de Serviço
              </h5>
              <p className="card-text text-center subtitleCard">
                Informe corretamente os dados do serviço para realizar seu cadastro
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalCadastro(true)}
                >
                  📝 Cadastrar Serviço
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Cadastrar Serviço */}
        <CadastrarServico
          show={mostrarModalCadastro}
          onHide={() => setMostrarModalCadastro(false)}
        />

        {/* Card - Listar Serviço */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Listagem de Serviços
              </h5>
              <p className="card-text text-center subtitleCard">
                Confira a lista completa dos serviços cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalListagem(true)}
                >
                  📋 Listar Serviços
                </Button>

                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalBuscaCodigo(true)}
                >
                  🔍 Buscar Serviço
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Listar Serviços */}
        <ListarServico
          show={mostrarModalListagem}
          onHide={() => setMostrarModalListagem(false)}
        />

        {/* Modal - Buscar Serviço por Código */}
        <BuscarServicoPorCodigo
          show={mostrarModalBuscaCodigo}
          onHide={() => setMostrarModalBuscaCodigo(false)}
        />
      </div>

      <div className="row justify-content-center">
        {/* Card - Atualizar Serviço */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Atualização de Serviço
              </h5>
              <p className="card-text text-center subtitleCard">
                Edite os dados dos serviços que já estão cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalAtualizacao(true)}
                >
                  🔄 Atualizar Serviço
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Atualizar Serviço */}
        <AtualizarServico
          show={mostrarModalAtualizacao}
          onHide={() => setMostrarModalAtualizacao(false)}
        />

        {/* Card - Excluir Serviço */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Exclusão de Serviço
              </h5>
              <p className="card-text text-center subtitleCard">
                Exclua um serviço do sistema de forma simples e rápida.
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalExclusao(true)}
                >
                  ❌ Excluir Serviço
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Excluir Serviço */}
        <ExcluirServico
          show={mostrarModalExclusao}
          onHide={() => setMostrarModalExclusao(false)}
        />
      </div>
    </div>
  );
}
