import './favoritos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favoritos(){

    const[filmes, setFilmes] = useState([]);
    var empty;

    useEffect(() =>{
        async function loadFilmes(){
            const minhaLista = localStorage.getItem("@primeflix");
            let filmesSalvos = JSON.parse(minhaLista);
            setFilmes(filmesSalvos);
        }
        loadFilmes();
    }, [])

    function removeFavorito(filme){
        if (window.confirm("Deseja remover o favorito?")){
            filmes.map((filmeItem) => {
                if(filmeItem.id == filme){
                    console.log("Achei");
                    var index = filmes.indexOf(filmeItem);
                    filmes.splice(index, 1);
                    window.location.reload();
                }
            })
            setFilmes(filmes);
            localStorage.setItem("@primeflix", JSON.stringify(filmes));
            alert("Filme removido com sucesso!")

        }
    }

    if(filmes.length > 0){
        console.log("Há filmes");
        return(
            filmes.map((filme) =>{
                return(
                    <div className='lista-filmes-favoritos'>
                        <h1>{filme.title}</h1>
                        <img src={"https://image.tmdb.org/t/p/original/" + filme.poster_path}></img>
                        <h3>Data de lançamento: {filme.release_date}</h3>
                        <div className='area-botoes'>
                            <Link className='link-to-details' to={`/filme/${filme.id}`}>Ver detalhes</Link>
                            <button onClick={() => removeFavorito(filme.id)}>Remover</button>
                        </div>
                    </div>
                );
            })
            )
        }else{
        console.log("Não há filmes");
        return(
            <div className='lista-sem-filmes'>
                <h1>Não há filmes salvos</h1>
                <Link to="/" className="link-to-home">Voltar para a Página Inicial</Link>
            </div>
        )
    }
    
}

export default Favoritos;