import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CadastrarPet from "../components/pet/cadastrarPet";
import ListarPet from "../components/pet/listarPet";
import AtualizarPet from "../components/pet/atualizarPet";
import ExcluirPet from "../components/pet/excluirPet";
import BuscarPetPorCPF from "../components/pet/buscarPetPorCpf";

export default function Pet() {
  const [mostrarModalCadastro, setMostrarModalCadastro] = useState(false);
  const [mostrarModalListagem, setMostrarModalListagem] = useState(false);
  const [mostrarModalAtualizacao, setMostrarModalAtualizacao] = useState(false);
  const [mostrarModalExclusao, setMostrarModalExclusao] = useState(false);
  const [mostrarModalBuscaCPF, setMostrarModalBuscaCPF] = useState(false);

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
        <img src="/pet.png" style={{ width: "70px" }} />
        <h1 style={{ fontSize: "300%" }}>Menu de Pets</h1>
      </div>

      <hr className="line" />

      <div className="row justify-content-center">
        {/* Card - Cadastrar Pet */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Cadastro de Pet
              </h5>
              <p className="card-text text-center subtitleCard">
                Informe corretamente os dados do pet para realizar seu cadastro
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalCadastro(true)}
                >
                  📝 Cadastrar Pet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Cadastrar Pet */}
        <CadastrarPet
          show={mostrarModalCadastro}
          onHide={() => setMostrarModalCadastro(false)}
        />

        {/* Card - Listar Pet */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Listagem de Pets
              </h5>
              <p className="card-text text-center subtitleCard">
                Confira a lista completa dos pets cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalListagem(true)}
                >
                  📋 Listar Pets
                </Button>

                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalBuscaCPF(true)}
                >
                  🔍 Buscar Pet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Listar Pets */}
        <ListarPet
          show={mostrarModalListagem}
          onHide={() => setMostrarModalListagem(false)}
        />

        {/* Modal - Buscar Pet por CPF */}
        <BuscarPetPorCPF
          show={mostrarModalBuscaCPF}
          onHide={() => setMostrarModalBuscaCPF(false)}
        />
      </div>

      <div className="row justify-content-center">
        {/* Card - Atualizar Pet */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Atualização de Pet
              </h5>
              <p className="card-text text-center subtitleCard">
                Edite os dados dos pets que já estão cadastrados no sistema
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalAtualizacao(true)}
                >
                  🔄 Atualizar Pet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Atualizar Pet */}
        <AtualizarPet
          show={mostrarModalAtualizacao}
          onHide={() => setMostrarModalAtualizacao(false)}
        />

        {/* Card - Excluir Pet */}
        <div
          className="col-md-3 col-sm-12 mb-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="card shadow" style={cardStyle}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Exclusão de Pet
              </h5>
              <p className="card-text text-center subtitleCard">
                Exclua um pet do sistema de forma simples e rápida.
              </p>
              <div className="d-flex justify-content-center">
                <Button
                  variant="warning"
                  className="mt-3 btn text-white"
                  style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }}
                  onClick={() => setMostrarModalExclusao(true)}
                >
                  ❌ Excluir Pet
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal - Excluir Pet */}
        <ExcluirPet
          show={mostrarModalExclusao}
          onHide={() => setMostrarModalExclusao(false)}
        />
      </div>
    </div>
  );
}
