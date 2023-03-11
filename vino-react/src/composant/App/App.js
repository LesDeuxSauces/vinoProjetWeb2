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

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    const pageAccueil = window.location.pathname === "/";
    const pageConnexion = window.location.pathname === "/connexion";
    return (
      <Router id="App">
        {pageAccueil ? null : <Entete />}
        <Routes className="AppBody">
          <Route path="/" element={<Accueil />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/cellier" element={<CellierList />} />
          <Route path="/cellier/:id" element={<CellierShow />} />
          <Route path="/cellier/create" element={<CellierCreate />} />
          <Route path="/bouteille" element={<BouteilleList />} />
          <Route path="/bouteille/create" element={<BouteilleCreate />} />
          <Route path="/bouteille/:id" element={<BouteilleShow />} />
        </Routes>
      </Router>
    );
  }

}

