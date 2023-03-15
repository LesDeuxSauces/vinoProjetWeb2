import './Accueil.css';
import React, { useState, useEffect } from 'react';
import logoVino from '../../img/vinoLogo-rouge.svg';
import { Link } from 'react-router-dom';

export default function Accueil() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 5000); // Rediriger vers la page de connexion après 5 secondes
  }, []);

  if (redirect) {
    window.location.replace('/Connexion');
  }

  return (
    <div className="pageAccueil">
      <div className="logo">
        <img src={logoVino} alt="logo Vino"></img>
      </div>
      <div className="titreAccueil">
        <h1>Bienvenue sur Vino</h1>
        <h2>Votre cellier à portée de main</h2>
      </div>
    </div>
  );
}