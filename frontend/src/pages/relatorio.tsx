import React, { useState } from "react";
import { Button } from "react-bootstrap";

import ProdutoConsumoCliente from "../components/relatorio/produto/produtoConsumoCliente";
import ProdutoTop10ClientesQuantidade from "../components/relatorio/produto/produtoTop10ClientesQuantidade";
import ProdutosMaisConsumidos from "../components/relatorio/produto/produtosMaisConsumidos";
import ProdutosPorTipo from "../components/relatorio/produto/produtosPorTipo";
import ProdutosPorRaca from "../components/relatorio/produto/produtosPorRaca";
import ProdutoTop5ClientesValor from "../components/relatorio/produto/produtoTop5ClientesValor";

import ServicoConsumoCliente from "../components/relatorio/servico/servicoConsumoCliente";
import ServicoTop10ClientesQuantidade from "../components/relatorio/servico/servicoTop10ClientesQuantidade";
import ServicosMaisConsumidos from "../components/relatorio/servico/servicosMaisConsumidos";
import ServicosPorTipo from "../components/relatorio/servico/servicosPorTipo";
import ServicosPorRaca from "../components/relatorio/servico/servicosPorRaca";
import ServicoTop5ClientesValor from "../components/relatorio/servico/servicoTop5Clientes";

export default function Relatorio() {
  const [modalState, setModalState] = useState({
    mostrarModalProdutoConsumoCliente: false,
    mostrarModalProdutoTop10ClientesQuantidade: false,
    mostrarModalProdutoProdutosMaisConsumidos: false,
    mostrarModalProdutoProdutosPorTipo: false,
    mostrarModalProdutoProdutosPorRaca: false,
    mostrarModalProdutoTop5ClientesValor: false,

    mostrarModalServicoConsumoCliente: false,
    mostrarModalServicoTop10ClientesQuantidade: false,
    mostrarModalServicoProdutosMaisConsumidos: false,
    mostrarModalServicoProdutosPorTipo: false,
    mostrarModalServicoProdutosPorRaca: false,
    mostrarModalServicoTop5ClientesValor: false,
  });

  const openModal = (modalName: string) => {
    setModalState(prevState => ({ ...prevState, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModalState(prevState => ({ ...prevState, [modalName]: false }));
  };

  const cardStyle = {
    borderColor: "#5c4033",
    backgroundColor: "rgb(255, 161, 106)",
    transition: "transform 0.2s",
    cursor: "pointer",
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1.03)";
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div className="container-fluid mt-5 text-center">
      <div className="d-flex align-items-center justify-content-center gap-3 title mt-5">
        <img src="/cliente.png" style={{ width: "70px" }} />
        <h1 style={{ fontSize: "300%" }}>Menu de Relatórios</h1>
      </div>

      <hr className="line" />

      {/* Cards agrupados por linha */}

      {/* Linha: Consumo por Cliente */}
      <div className="row justify-content-center">
        <div className="col-md-3 col-sm-12 mb-4">
          <div className="card shadow" style={cardStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                Consumo por Cliente
              </h5>
              <p className="card-text text-center subtitleCard">
                Produtos e serviços mais consumidos por cliente
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalProdutoConsumoCliente")}>Produtos</Button>
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalServicoConsumoCliente")}>Serviços</Button>
              </div>
            </div>
          </div>
        </div>


        {/* Linha: Top 10 Quantidade e Mais Consumidos */}

        <div className="col-md-3 col-sm-12 mb-4">
          <div className="card shadow" style={cardStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>Top 10 Clientes (Qtd)</h5>
              <p className="card-text text-center subtitleCard">Ranking dos clientes que mais consumiram</p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalProdutoTop10ClientesQuantidade")}>Produtos</Button>
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalServicoTop10ClientesQuantidade")}>Serviços</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-sm-12 mb-4">
          <div className="card shadow" style={cardStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>Itens mais consumidos</h5>
              <p className="card-text text-center subtitleCard">Itens mais procurados pelos clientes em geral</p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalProdutoProdutosMaisConsumidos")}>Produtos</Button>
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalServicoProdutosMaisConsumidos")}>Serviços</Button>
              </div>
            </div>
          </div>
        </div>


        {/* Linha: Top 5 Valor, por Tipo, por Raça */}

        <div className="col-md-3 col-sm-12 mb-4">
          <div className="card shadow" style={cardStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <div className="card-body">
              <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>Top 5 Clientes (Valor)</h5>
              <p className="card-text text-center subtitleCard">Clientes que mais consumiram em valor total</p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalProdutoTop5ClientesValor")}>Produtos</Button>
                <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalServicoTop5ClientesValor")}>Serviços</Button>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-12 mb-4">
            <div className="card shadow" style={cardStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <div className="card-body">
                <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>Consumo por Tipo de Animal</h5>
                <p className="card-text text-center subtitleCard">Análise detalhada por tipo de pet</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalProdutoProdutosPorTipo")}>Produtos</Button>
                  <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalServicoProdutosPorTipo")}>Serviços</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-12 mb-4">
            <div className="card shadow" style={cardStyle} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <div className="card-body">
                <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>Consumo por Raça</h5>
                <p className="card-text text-center subtitleCard">Análise detalhada por raça de pet</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalProdutoProdutosPorRaca")}>Produtos</Button>
                  <Button variant="warning" className="mt-3 btn text-white" style={{ backgroundColor: "rgb(69,32,23)", borderColor: "rgb(69,32,23)" }} onClick={() => openModal("mostrarModalServicoProdutosPorRaca")}>Serviços</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modais */}
        <ProdutoConsumoCliente show={modalState.mostrarModalProdutoConsumoCliente} onHide={() => closeModal("mostrarModalProdutoConsumoCliente")} />
        <ServicoConsumoCliente show={modalState.mostrarModalServicoConsumoCliente} onHide={() => closeModal("mostrarModalServicoConsumoCliente")} />
        <ProdutoTop10ClientesQuantidade show={modalState.mostrarModalProdutoTop10ClientesQuantidade} onHide={() => closeModal("mostrarModalProdutoTop10ClientesQuantidade")} />
        <ServicoTop10ClientesQuantidade show={modalState.mostrarModalServicoTop10ClientesQuantidade} onHide={() => closeModal("mostrarModalServicoTop10ClientesQuantidade")} />
        <ProdutosMaisConsumidos show={modalState.mostrarModalProdutoProdutosMaisConsumidos} onHide={() => closeModal("mostrarModalProdutoProdutosMaisConsumidos")} />
        <ServicosMaisConsumidos show={modalState.mostrarModalServicoProdutosMaisConsumidos} onHide={() => closeModal("mostrarModalServicoProdutosMaisConsumidos")} />
        <ProdutoTop5ClientesValor show={modalState.mostrarModalProdutoTop5ClientesValor} onHide={() => closeModal("mostrarModalProdutoTop5ClientesValor")} />
        <ServicoTop5ClientesValor show={modalState.mostrarModalServicoTop5ClientesValor} onHide={() => closeModal("mostrarModalServicoTop5ClientesValor")} />
        <ProdutosPorTipo show={modalState.mostrarModalProdutoProdutosPorTipo} onHide={() => closeModal("mostrarModalProdutoProdutosPorTipo")} />
        <ServicosPorTipo show={modalState.mostrarModalServicoProdutosPorTipo} onHide={() => closeModal("mostrarModalServicoProdutosPorTipo")} />
        <ProdutosPorRaca show={modalState.mostrarModalProdutoProdutosPorRaca} onHide={() => closeModal("mostrarModalProdutoProdutosPorRaca")} />
        <ServicosPorRaca show={modalState.mostrarModalServicoProdutosPorRaca} onHide={() => closeModal("mostrarModalServicoProdutosPorRaca")} />
      </div>
    </div>
  );
}
