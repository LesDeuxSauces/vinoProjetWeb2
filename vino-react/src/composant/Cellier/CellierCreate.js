import "./Cellier.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function CellierCreate() {
  const navigate = useNavigate();
  const [nom, setNom] = useState(""); // on crée un état pour le nom du cellier
  const api_url = "http://127.0.0.1:8000/api/";

  function handleSubmit(evt) {
    // gestion de l'envoi du formulaire
    evt.preventDefault(); // empêche le rechargement de la page
    const data = { nom }; // on crée un objet avec les données du formulaire

    PostCreateCellierUser(data);

  }

  async function PostCreateCellierUser(data) {
    let entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);

    const response = await fetch(api_url + "celliers", {
      method: "POST",
      body: JSON.stringify(data),
      headers: entete,
    });

    const celliers = await response.json();

    console.log("celliers:", celliers);
    window.location.pathname = "/Cellier";
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
