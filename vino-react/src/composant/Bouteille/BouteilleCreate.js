import React, { useState, useEffect } from "react";
import "./Bouteille.css";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function BouteilleCreate() {
  const { idCellier } = useParams();
  const [bouteilleValeur, setBouteilleValeur] = React.useState({
    nom: "",
    format: "",
    prix: "",
    description: "",
    annee: "",
    code_saq: "",
    url_saq: "",
    url_img: "",
    pays_id: "",
    type_id: "",
    quantite: "",
  });

  function handleSubmit(e) {
    /**
     * Empêche le comportement par défaut de qui recharge le site
     */
    e.preventDefault();
  }

  function handleChange(evt) {
    /**
     * e.target est l'élément qui a exécuté l'événement nom
     *  identifie l'entrée et value décrit la valeur actuelle.
     */

    const { target } = evt;
    const { name, value } = target;

    /**
     * clone l'état actuel ...
     * remplace uniquement la valeur de l'entrée  qui a exécuté l'événement
     */

    const nouvellesValeurs = {
      ...bouteilleValeur,
      [name]: value,
    };
    /**
     * mis à jour des valeurs dans le state
     */
    setBouteilleValeur(nouvellesValeurs);
  }

  async function ajouterBouteille() {
    bouteilleValeur.cellier_id = idCellier;
    console.log(bouteilleValeur);

    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(bouteilleValeur),
    };

    fetch("http://127.0.0.1:8000/api/bouteille", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.pathname = "/Cellier/" + idCellier;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div class="ajouter__bouteille--titre ">
        <h1>Ajouter un Vin</h1>
      </div>
      <form className="ajouter__bouteille--form" onSubmit={handleSubmit}>
        <div>
          <h2>Personnalisé</h2>
        </div>
        <input
          id="nom"
          name="nom"
          type="text"
          placeholder="Nom"
          value={bouteilleValeur.nom}
          onChange={handleChange}
          required
        />
        <div className="ajouter__bouteille--form--row">
          <input
            id="type_id"
            name="type_id"
            type="number"
            placeholder="Type"
            value={bouteilleValeur.type_id}
            onChange={handleChange}
          />
          <input
            id="annee"
            name="annee"
            type="text"
            placeholder="Millésime"
            value={bouteilleValeur.annee}
            onChange={handleChange}
          />
        </div>
        <div className="ajouter__bouteille--form--row">
          <input
            id="pays_id"
            name="pays_id"
            type="number"
            placeholder="Origine"
            value={bouteilleValeur.pays_id}
            onChange={handleChange}
          />
          <input
            id="format"
            name="format"
            type="text"
            placeholder="Format 750ml, 1L"
            value={bouteilleValeur.format}
            onChange={handleChange}
          />
        </div>
        <div className="ajouter__bouteille--form--row" >

          <input
            id="prix"
            name="prix"
            type="text"
            placeholder="Prix"
            value={bouteilleValeur.prix}
            onChange={handleChange}
          />

          <input
            id="code_saq"
            name="code_saq"
            type="text"
            placeholder="Code Saq"
            value={bouteilleValeur.code_saq}
            onChange={handleChange}
          />

          <input
            id="quantite"
            name="quantite"
            type="number"
            placeholder="Quantité"
            value={bouteilleValeur.quantite}
            onChange={handleChange}
          />
        </div>

        <input
          id="description"
          name="description"
          type="text"
          placeholder="Description"
          value={bouteilleValeur.description}
          onChange={handleChange}
        />

        <input
          id="url_saq"
          name="url_saq"
          type="hidden"
          value={bouteilleValeur.url_saq}
          onChange={handleChange}
        />

        <input
          id="url_img"
          name="url_img"
          type="hidden"
          value={bouteilleValeur.url_img}
          onChange={handleChange}
        />

        <div className="cellier__btn--div">
          <button
            className="inscription__bouton--btn"
            type="submit"
            onClick={ajouterBouteille}
          >
            ajouter bouteille
          </button>
          <Link to="/Cellier" className="cellier__btn--style cellier__btn--retour">Retour à la liste des celliers</Link>
        </div>
      </form>
    </div>
  );
}
