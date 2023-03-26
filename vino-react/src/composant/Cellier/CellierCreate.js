import "./Cellier.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, json, redirect } from "react-router-dom";
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";

export default function CellierCreate() {
  const navigate = useNavigate();
  const [nom, setNom] = useState(""); // on crée un état pour le nom du cellier
  const api_url = "http://127.0.0.1:8000/api/";
  const [confirmationMessage, setConfirmationMessage] = useState({
    display: false,
    message: "",
  });
  const [nomValider,setNomValider]=useState('');

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

    const res = await response.json()
    if (res.status == 422){
      setNomValider(res.errors.nom)
      console.log(res.errors.nom);
    }

    if (!response.ok) {
      throw json(
        { message: "Impossible de créer le cellier." },
        { status: 500 }
      );
    }

    showMessage("Cellier créé avec succès!");
    setTimeout(() => {
      navigate("/Cellier");
    }, 2000);
  }





  function handleNomChange(evt) {
    // gestion de la modification du nom du cellier
    setNom(evt.target.value); // on met à jour l'état du nom du cellier
  }

  function showMessage(message) {
    setConfirmationMessage({
      display: true,
      message,
    });

    setTimeout(() => {
      setConfirmationMessage({
        display: false,
        message: "",
      });
    }, 2000);
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
          {nomValider && <p className="erreurChamps">  Champ obligatoire</p>}
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
      {confirmationMessage.display && <ModalInfos message={confirmationMessage.message} />}
    </div>
  );
}
