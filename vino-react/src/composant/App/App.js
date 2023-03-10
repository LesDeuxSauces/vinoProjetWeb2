import './App.css';
import React from 'react';
import Entete from '../Entete/Entete';
import Footer from '../Footer/Footer';
import BouteilleList from '../Bouteille/BouteilleList';
import BouteilleShow from '../Bouteille/BouteilleShow';
import BouteilleCreate from '../Bouteille/BouteilleCreate';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import CellierList from '../Cellier/CellierList';
import CellierCreate from '../Cellier/CellierCreate';
import CellierShow from '../Cellier/CellierShow';

export default class App extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <Router id="App">
        <Entete />
        <Routes className="AppBody">
          <Route path="/" element={<Accueil />} />
          <Route path="/cellier" element={<CellierList />} />
          <Route path="/cellier/:id" element={<CellierShow />} />
          <Route path="/cellier/create" element={<CellierCreate />} />
          <Route path="/bouteille" element={<BouteilleList />} />
          <Route path="/bouteille/create" element={<BouteilleCreate />} />
          <Route path="/bouteille/:id" element={<BouteilleShow />} />
        </Routes>
        <Footer />
      </Router>
    );
  }

}

