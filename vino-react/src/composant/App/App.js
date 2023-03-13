import './App.css';
import React from 'react';
import Entete from '../Entete/Entete';
import BouteilleList from '../Bouteille/BouteilleList';
import BouteilleShow from '../Bouteille/BouteilleShow';
import BouteilleCreate from '../Bouteille/BouteilleCreate';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import Inscription from '../Inscription/Inscription';
import CellierList from '../Cellier/CellierList';
import CellierCreate from '../Cellier/CellierCreate';
import CellierShow from '../Cellier/CellierShow';
import Connexion from '../Connexion/Connexion';
import { useLocation } from 'react-router-dom';

function AppRoutes() {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/connexion' || location.pathname === '/inscription' || location.pathname === '/Connexion' || location.pathname === '/Inscription') {
    return (
      <Routes className="AppBody">
        <Route path="/" element={<Accueil />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/cellier" element={<CellierList />} />
        <Route path="/cellier/:id" element={<CellierShow />} />
        <Route path="/cellier/create" element={<CellierCreate />} />
        <Route path="/bouteille" element={<BouteilleList />} />
        <Route path="/bouteille/create/:idCellier" element={<BouteilleCreate />} />
        <Route path="/bouteille/:id" element={<BouteilleShow />} />
      </Routes>
    );
  } else {
    return (
      <>
        <Entete />
        <Routes className="AppBody">
          <Route path="/" element={<Accueil />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/cellier" element={<CellierList />} />
          <Route path="/cellier/:id" element={<CellierShow />} />
          <Route path="/cellier/create" element={<CellierCreate />} />
          <Route path="/bouteille" element={<BouteilleList />} />
          <Route path="/bouteille/create/:idCellier" element={<BouteilleCreate />} />
          <Route path="/bouteille/:id" element={<BouteilleShow />} />
        </Routes>
      </>
    );
  }
}

export default function App() {
  return (
    <Router id="App">
      <AppRoutes />
    </Router>
  );
}
