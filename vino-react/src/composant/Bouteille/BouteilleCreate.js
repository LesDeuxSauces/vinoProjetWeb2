import React, { useState, useEffect } from "react";
import "./Bouteille.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BouteilleCreate() {
    const { idCellier } = useParams();
    const [pays, setPays] = useState([]);
    const [types, setTypes] = useState([]);
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

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/pays")
            .then((response) => response.json())
            .then((data) => {
                setPays(data.pays);
                console.log(pays);
            });

        fetch("http://127.0.0.1:8000/api/types")
            .then((response) => response.json())
            .then((data) => {
                setTypes(data.types);
            });
    }, []);

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

    function ajouterBouteille() {
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

                <div className="form__group field">
                    <input
                        placeholder="Nom"
                        className="form__field"
                        id="nom"
                        name="nom"
                        type="text"
                        value={bouteilleValeur.nom}
                        onChange={handleChange}
                        required
                    />
                    <label className="form__label">Nom</label>
                </div>

                <div className="ajouter__bouteille--form--row">
                    <select
                        value={bouteilleValeur.type_id}
                        name="type_id"
                        onChange={handleChange}
                    >
                       <option value="" disabled selected> Séclectionner un type</option>
                        {types.map((value) => (
                            <option key={value.id} value={value.id}>
                                {" "}
                                {value.nom}
                            </option>
                        ))}
                    </select>

                    <div className="form__group field">
                        <input
                            placeholder="Millésime"
                            className="form__field"
                            id="annee"
                            name="annee"
                            type="number"
                            value={bouteilleValeur.annee}
                            onChange={handleChange}
                        />
                        <label className="form__label">Millésime</label>
                    </div>
                </div>
                <div className="ajouter__bouteille--form--row">
                    <select
                        value={bouteilleValeur.pays_id}
                        name="pays_id"
                        onChange={handleChange}
                    >
                          <option value="" disabled selected> Séclectionner un pays</option>
                        {pays.map((value) => (
                            <option key={value.id} value={value.id}>
                                {" "}
                                {value.nom}
                            </option>
                        ))}
                    </select>

                    <div className="form__group field">
                        <input
                            placeholder="Format 750ml, 1L"
                            className="form__field"
                            id="format"
                            name="format"
                            type="text"
                            value={bouteilleValeur.format}
                            onChange={handleChange}
                        />
                        <label className="form__label">Format 750ml, 1L</label>
                    </div>
                </div>
                <div className="ajouter__bouteille--form--row">
                    <div className="form__group field">
                        <input
                            placeholder="Prix"
                            className="form__field"
                            id="prix"
                            name="prix"
                            type="text"
                            value={bouteilleValeur.prix}
                            onChange={handleChange}
                        />
                        <label className="form__label">Prix</label>
                    </div>

                    <div className="form__group field">
                        <input
                            placeholder="Code SAQ"
                            className="form__field"
                            id="code_saq"
                            name="code_saq"
                            type="text"
                            value={bouteilleValeur.code_saq}
                            onChange={handleChange}
                        />
                        <label className="form__label">Code SAQ</label>
                    </div>

                    <div className="form__group field">
                        <input
                            placeholder="Quantité"
                            className="form__field"
                            id="quantite"
                            name="quantite"
                            type="number"
                            value={bouteilleValeur.quantite}
                            onChange={handleChange}
                        />
                        <label className="form__label">Quantité</label>
                    </div>
                </div>

                <div className="form__group field">
                    <input
                        placeholder="Description"
                        className="form__field"
                        id="description"
                        name="description"
                        type="text"
                        value={bouteilleValeur.description}
                        onChange={handleChange}
                    />
                    <label className="form__label" for="">
                        Description
                    </label>
                </div>

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
                    <Link
                        to="/Cellier"
                        className="cellier__btn--style cellier__btn--retour"
                    >
                        Retour à la liste des celliers
                    </Link>
                </div>
            </form>
        </div>
    );
}
