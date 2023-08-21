import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css"

// https://api.themoviedb.org/3/movie/now_playing?api_key=b88d835693c6448c52ba38a442618fac

function Home(){
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
          api_key: "b88d835693c6448c52ba38a442618fac",
          language:"pt-BR",
          page: 1,
        }
      })
      // console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  if(loading){
    return(
      <div>
        <h1 className="loading">Carregando os filmes...</h1>
      </div>
    );
  }

  return(
    <div className="conteiner">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return(
            <article key={filme.id} className="filme">
              <strong>{filme.title}</strong>
              <img src={"https://image.tmdb.org/t/p/original/" + filme.poster_path}></img>
              <Link to={"/filme/" + filme.id} className="link">Acessar</Link> 
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;