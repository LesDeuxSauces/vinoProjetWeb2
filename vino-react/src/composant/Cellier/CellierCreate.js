import './Cellier.css';
import React, { useState, useEffect } from "react";

export default function CellierCreate() { // on crée un composant pour créer un cellier
  const [nom, setNom] = useState(''); // on crée un état pour le nom du cellier

  function handleSubmit(evt) { // gestion de l'envoi du formulaire
    evt.preventDefault(); // empêche le rechargement de la page
    const data = { nom }; // on crée un objet avec les données du formulaire

    fetch('http://127.0.0.1:8000/api/cellier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(reponse => reponse.json())
      .then(data => {
        console.log(data); // on affiche les données reçues
      })
      .catch(error => console.error(error));
  }

  function handleNomChange(evt) { // gestion de la modification du nom du cellier
    setNom(evt.target.value); // on met à jour l'état du nom du cellier
  }

  return ( // on retourne le formulaire
    <div>
      <h1>Créer un nouveau cellier</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom : <input type="text" id="nom" name="nom" value={nom} onChange={handleNomChange} required /></label>
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}