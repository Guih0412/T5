import React from "react";
import { Link } from "react-router-dom";

type Props = {
  tema: string;
  botoes: string[]; 
};

export default function Footer(props: Props) {
  const tema = props.tema;

  return (
    <footer className="text-center mt-5" style={{ backgroundColor: tema }}>
      <div className="container py-4">
        <div className="mb-3 title">
          <Link
            to="/clientes"
            className="mx-2"
            style={{ color: "#5c4033", textDecoration: "none" }}
          >
            Clientes
          </Link>
          <Link
            to="/pets"
            className="mx-2"
            style={{ color: "#5c4033", textDecoration: "none" }}
          >
            Pets
          </Link>
          <Link
            to="/produtos"
            className="mx-2"
            style={{ color: "#5c4033", textDecoration: "none" }}
          >
            Produtos
          </Link>
          <Link
            to="/servicos"
            className="mx-2"
            style={{ color: "#5c4033", textDecoration: "none" }}
          >
            Serviços
          </Link>
        </div>
        <hr className="line" />
        <div className="text-center title" style={{ fontSize: "0.9rem" }}>
          © 2025 Copyright: Pet Lovers
        </div>
      </div>
    </footer>
  );
}
