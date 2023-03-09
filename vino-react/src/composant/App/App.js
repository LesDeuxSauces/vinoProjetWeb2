import logo from './foto.jpg';
import './App.css';
import React from 'react';
import Entete from '../Entete/Entete';
import Footer from '../Footer/Footer';
import Cellier from '../Cellier/CellierList';
import Bouteille from '../Bouteille/Bouteille';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';

export default class App extends React.Component {

    constructor() {
        
    }

    render() {
        return (
            <Router id="App">
                <Entete />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/cellier" element={<Cellier />} />
                    <Route path="/bouteille/:id" element={<Bouteille />} />
                </Routes>
                <Footer />
            </Router>
        );
    }

}

