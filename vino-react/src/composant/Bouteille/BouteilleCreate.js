import React, { useState, useEffect } from "react";
import "./Bouteille.css";
import { useParams } from 'react-router-dom';
export default function BouteilleCreate() {
    const { idCellier } = useParams();
   console.log(idCellier, "id del cellier");
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
        quantite:""
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

   async function ajouterBouteille(){
      
       bouteilleValeur.cellier_id = idCellier;
      console.log(bouteilleValeur);
    
        const options = {
            method: 'POST',
            headers: {'Content-type':'application/json',
            "accept" : "application/json",
            },
            body:JSON.stringify(bouteilleValeur)
        };
    
        fetch('http://127.0.0.1:8000/api/bouteille',options)
            .then(response => response.json())
            .then(data=>console.log(data))
            .catch(error=>{
                console.log(error);
            })

    }
   
    return (
        <div className="formbouteille">
            <h2>ajouter une bouteille</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nom">nom</label>
                <input
                    id="nom"
                    name="nom"
                    type="text"
                    value={bouteilleValeur.nom}
                    onChange={handleChange}
                />
                <label htmlFor="format">format</label>
                <input
                    id="format"
                    name="format"
                    type="text"
                    value={bouteilleValeur.format}
                    onChange={handleChange}
                />
                <label htmlFor="prix">prix</label>
                <input
                    id="prix"
                    name="prix"
                    type="text"
                    value={bouteilleValeur.prix}
                    onChange={handleChange}
                />
                <label htmlFor="description">description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={bouteilleValeur.description}
                    onChange={handleChange}
                />
                <label htmlFor="annee">annee</label>
                <input
                    id="annee"
                    name="annee"
                    type="text"
                    value={bouteilleValeur.annee}
                    onChange={handleChange}
                />
                <label htmlFor="code_saq">code de la saq</label>
                <input
                    id="code_saq"
                    name="code_saq"
                    type="text"
                    value={bouteilleValeur.code_saq}
                    onChange={handleChange}
                />
                <label htmlFor="url_saq">url de la saq</label>
                <input
                    id="url_saq"
                    name="url_saq"
                    type="text"
                    value={bouteilleValeur.url_saq}
                    onChange={handleChange}
                />
                <label htmlFor="url_img">url img</label>
                <input
                    id="url_img"
                    name="url_img"
                    type="text"
                    value={bouteilleValeur.url_img}
                    onChange={handleChange}
                />
                <label htmlFor="pays_id">pays id</label>
                <input
                    id="pays_id"
                    name="pays_id"
                    type="number"
                    value={bouteilleValeur.pays_id}
                    onChange={handleChange}
                />
                <label htmlFor="type_id">type id</label>
                <input
                    id="type_id"
                    name="type_id"
                    type="number"
                    value={bouteilleValeur.type_id}
                    onChange={handleChange}
                />
                <label htmlFor="quantite">quantite</label>
                <input
                    id="quantite"
                    name="quantite"
                    type="number"
                    value={bouteilleValeur.quantite}
                    onChange={handleChange}
                />
                <button type="submit" onClick={ajouterBouteille} >ajouter bouteille</button>
            </form>
        </div>
    );
}
