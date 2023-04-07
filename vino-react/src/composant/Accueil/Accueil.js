import './Accueil.css';
import React, { useState, useEffect } from 'react';
import logoVino from '../../img/vinoLogo-rouge.svg';
import { Link } from 'react-router-dom';

export default function Accueil() {
  const [redirection, setRedirection] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRedirection(true);
    }, 2000); // Rediriger vers la page de connexion après 2 secondes
  }, []);

  if (redirection) {
    window.location.replace('/Connexion');
  }

  return (
    <div className="pageAccueil">
      <div className="logo">
        <img src={logoVino} alt="logo Vino"></img>
      </div>
      <div className="titreAccueil">
        <h1>Votre cellier à portée de main</h1>
      </div>
      <div className="center">
        <span className="loader"></span>
      </div>
    </div>
  );
}