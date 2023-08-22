import { Suspense } from 'react';
import './header.css';
import { Link, Outlet } from 'react-router-dom';

function Header(){
    return(
        <Suspense fallback={<h1>Loading...</h1>}>
        <header>
            <Link className="logo" to="/">Prime Flix</Link>
            <Link className="favoritos" to="/favoritos">Meus Filmes</Link>
        </header>
        </Suspense>
    );
}

export default Header;