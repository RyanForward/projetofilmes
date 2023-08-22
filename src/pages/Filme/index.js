import './filme.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '../../services/api';

function Filme(){
  const{ id } = useParams();
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
          if(response.data.vote_average > 6){
            setCorLetra('green')
          }else{
            setCorLetra('red')
          }
          setLoading(false)
          console.log(response.data);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO");
        })
    }
    loadFilme();

    return () =>{
    console.log("Componente foi desmontado");
    }
  }, [])


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
      
      </div>
    </div>
  )
}

export default Filme;