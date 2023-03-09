import './Accueil.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logoVino from '../../img/vinoLogo-rouge.svg';

export default class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="pageAccueil">
                <div className="logo">
                    <img src={logoVino} ></img>
                </div>
                <div className="titreAccueil">
                    <h1>
                        Votre cellier à portée de main
                    </h1>
                </div>
                <div className="boutonsDiv">
                    <div>
                        <Link to="/Cellier" ><button className="btn btnConnexion">Se connecter</button></Link>
                    </div>
                    <div>
                        <Link to="/Cellier" ><button className="btn btnInscription">S'inscrire</button></Link>
                    </div>
                </div>
            </div>
        );
    }
}
