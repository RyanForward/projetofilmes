import './filme.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import api from '../../services/api';

function Filme(){
  const{ id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);
  const [corLetra, setCorLetra] = useState();

  useEffect(() => {
    async function loadFilme(){
        let url = '/movie/' + id;
        await api.get(url, {
          params:{
            api_key: "b88d835693c6448c52ba38a442618fac",
            language:"pt-BR",
          }
        })
        .then((response) => {
          setFilme(response.data);
          if(response.data.vote_average > 7){
            setCorLetra('green')
          }else{
            setCorLetra('red')
          }
          setLoading(false)
          console.log(response.data);
        })
        .catch(() => {
          navigate("/", {replace: true});
          return;
          console.log("FILME NÃO ENCONTRADO");
        })
    }
    loadFilme();

    return () =>{
    console.log("Componente foi desmontado");
    }
  }, [navigate, id])

  function salvarfilme(){
    const minhaLista = localStorage.getItem("@primeflix");
    let filmesSalvos = JSON.parse(minhaLista) || [];
    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id == filme.id)
    if(hasFilme){
      toast.warn("Esse filme já está na sua lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com sucesso!");
  }

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando filme...</h1>
      </div>
    );
  }

  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={"https://image.tmdb.org/t/p/original/" + filme.backdrop_path}/>
      <h2>Sinopse</h2>
      <span>{filme.overview}</span>
      <strong className='avaliacao' style={{color: corLetra}}>Avaliação: {filme.vote_average} </strong>
      <h3>Data de lançamento: {filme.release_date}</h3>
      <div className='area-buttons'>
        <button onClick={salvarfilme}>Salvar</button>
        <button>
          <a target='blank' rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer`}>
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filme;