import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from 'react';
import Header from "./components/Header";

const Home = lazy(() => import('./pages/Home/index'))
const Filme = lazy(() => import("./pages/Filme/index"))
const Favoritos = lazy(() => import("./pages/Favoritos/index"))
const Erro = lazy(() => import("./pages/Erro/index"))

function RoutesApp(){
    return(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/filme/:id" element={<Filme/>}/>
        <Route path="/favoritos" element={<Favoritos/>}/>
        
        <Route path="*" element={<Erro/>}/>
    </Routes>
    </BrowserRouter>
    )
}

export default RoutesApp;