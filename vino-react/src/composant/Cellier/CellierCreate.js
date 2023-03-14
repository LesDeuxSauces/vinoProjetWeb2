import "./Cellier.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function CellierCreate() {
    const [nom, setNom] = useState(""); // on crée un état pour le nom du cellier

    function handleSubmit(evt) {
        // gestion de l'envoi du formulaire
        evt.preventDefault(); // empêche le rechargement de la page
        const data = { nom }; // on crée un objet avec les données du formulaire

        fetch("http://127.0.0.1:8000/api/cellier", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((reponse) => reponse.json())
            .then((data) => {
                console.log(data);
                // Rediriger l'utilisateur vers la page de liste des celliers
                window.location.pathname = "/Cellier"; // on redirige l'utilisateur vers la page de liste des celliers
            })
            .catch((error) => console.error(error));
    }

    function handleNomChange(evt) {
        // gestion de la modification du nom du cellier
        setNom(evt.target.value); // on met à jour l'état du nom du cellier
    }

    return (
        <div>
            <div className="cellier__titre">Créer un nouveau Cellier</div>
            <form className="cellier__form" onSubmit={handleSubmit}>
            
                <div className="form__group field input__ajouterCellier ">
                    <input
                        placeholder="Nom"
                        className="form__field "
                        id="nom"
                        name="nom"
                        type="text"
                        value={nom}
                        onChange={handleNomChange}
                        
                    />
                    <label className="form__label">Nom</label>
                </div>
             
                <div className="cellier__btn--div">
                    <button
                        className="cellier__btn--style cellier__btn--creer"
                        type="submit"
                    >
                        Créer votre cellier
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
