import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Cellier.css';

export default function CellierShow() {
  const [cellier, setCellier] = useState({});
  const { id } = useParams();
  const [bouteilles, setBouteilles] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cellier/' + id)
      .then(reponse => reponse.json())
      .then(data => {
        setCellier(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, [id]);



  function handleAjouteBouteille(evt) {
    evt.preventDefault();
    // on va avoiir ici le code pour ajouter une bouteille
  }



  function afficherBouteilles() {
    let listeBouteilles = null;

    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      listeBouteilles = cellier.bouteilles.map((bouteille) => (
        <li className="bouteille" key={bouteille.id}>
          <div>
            <strong>{bouteille.nom}</strong> ({bouteille.format} ml)
          </div>
          <div>Prix: {bouteille.prix} $ - Quantité: {bouteille.pivot.quantite}</div>
        </li>
      ));
    } else {
      listeBouteilles = <p>Aucune bouteille disponible</p>;
    }

    return listeBouteilles;
  }





  return (
    <div>
      <h1>Nom du Cellier : {cellier.nom}</h1>
      <div>
        <h2>Bouteilles</h2>
        <ul>
          {afficherBouteilles()}
        </ul>
      </div>

      {/* <h2>Ajouter une bouteille de vin à mon cellier</h2>
      <form onSubmit={handleAjouteBouteille}>
        <button type="submit">Ajouter</button>
      </form> */}

      <a href="/cellier">Retour au cellier</a>
    </div>
  );
}

