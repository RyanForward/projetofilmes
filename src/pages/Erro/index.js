import "./erro.css"
import { Link } from "react-router-dom";

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <Link to="/" className="link-to-home">Voltar para a Página Inicial</Link>
        </div>
    );
}

export default Erro;