import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/home";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Footer from "./footer";
import Cliente from "../pages/cliente";
import Pet from "../pages/pet";
import Produto from "../pages/produto";
import Servico from "../pages/servico";
import Header from "./header";
import Relatorio from "../pages/relatorio";


export default function Roteador() {
    const navigate = useNavigate();

    function selecionarView(view: string) {
        navigate(`/${view.toLowerCase()}`);
    }

    const botoes = ['Home', 'Clientes', 'Pets', 'Produtos', 'Servicos','Relatorios'];

    return (
        <>
            <Header seletorView={selecionarView} tema="rgb(255, 123, 0)" botoes={botoes} />
            <Routes>
                <Route path="/" element={<Home tema="rgb(255, 123, 0)" />} />
                <Route path="/home" element={<Home tema="rgb(255, 123, 0)" />} />
                <Route path="/clientes" element={<Cliente />} />
                <Route path="/pets" element={<Pet/>}/>
                <Route path="/produtos" element={<Produto/>}/>
                <Route path="/servicos" element={<Servico/>}/>
                <Route path="/relatorios" element={<Relatorio/>}/>
            </Routes>

            <Footer botoes={botoes} tema="rgb(255,123,0)"/>
        </>
    );
}
