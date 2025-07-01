import React from "react";

type Props = {
  tema: string;
};

export default function Home(props: Props) {
  const cardStyle = {
    borderColor: "#5c4033",
    backgroundColor: "rgb(255, 161, 106)",
    transition: "transform 0.2s",
    cursor: "pointer",
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
  };

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-center gap-3 title mt-5">
        <img src="/icone.png" style={{ width: "70px" }} />
        <h1 style={{ fontSize: "300%" }}>Pet Lovers</h1>
      </div>

      <h4 className="subtitle mt-5">
        Seja bem-vindo à Pet Lovers, melhor sistema de gerenciamento de pet shops e clínicas veterinárias!
      </h4>
      <hr className="line" />
      <h5 className="subtitle mt-5">
        Explore os blocos abaixo, para ter acesso aos serviços que temos a oferecer em nosso pet shop
      </h5>

      <div className="container mt-5">
        <div className="row justify-content-center">

          <div className="col-md-3 col-sm-12 mb-4">
            <div
              className="card shadow"
              style={cardStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="card-body">
                <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                  Menu de Clientes
                </h5>
                <p className="card-text text-center subtitleCard">
                  Gerencie os dados e o histórico dos seus clientes com facilidade.
                </p>
                <div className="text-center mb-3">
                  <img src="cliente.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Cliente" />
                </div>
                <div className="d-flex justify-content-center">
                  <a href="/clientes" className="btn text-white" style={{ backgroundColor: "rgb(69,32,23)" }}>
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-12 mb-4">
            <div
              className="card shadow"
              style={cardStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="card-body">
                <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                  Menu de Pets
                </h5>
                <p className="card-text text-center subtitleCard">
                  Acompanhe todas as informações essenciais sobre os pets registrados.
                </p>
                <div className="text-center mb-3">
                  <img src="pet.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Cliente" />
                </div>
                <div className="d-flex justify-content-center">
                  <a href="/pets" className="btn text-white" style={{ backgroundColor: "rgb(69,32,23)" }}>
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-12 mb-4">
            <div
              className="card shadow"
              style={cardStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="card-body">
                <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                  Menu de Produtos
                </h5>
                <p className="card-text text-center subtitleCard">
                  Organize e controle os produtos disponíveis no seu estabelecimento.
                </p>
                <div className="text-center mb-3">
                  <img src="produto.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Cliente" />
                </div>
                <div className="d-flex justify-content-center">
                  <a href="/produtos" className="btn text-white" style={{ backgroundColor: "rgb(69,32,23)" }}>
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-sm-12 mb-4">
            <div
              className="card shadow"
              style={cardStyle}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <div className="card-body">
                <h5 className="card-title text-center titleCard" style={{ color: "rgb(69,32,23)" }}>
                  Menu de Serviços
                </h5>
                <p className="card-text text-center subtitleCard">
                  Administre os serviços oferecidos e seu agendamento de forma eficiente.
                </p>
                <div className="text-center mb-3">
                  <img src="servico.png" style={{ width: "70%" }} className="d-block mx-auto" alt="Cliente" />
                </div>
                <div className="d-flex justify-content-center">
                  <a href="/servicos" className="btn text-white" style={{ backgroundColor: "rgb(69,32,23)" }}>
                    Acessar
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
