import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Cellier.css";
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";


export default function CellierUpdate() {
  const api_url = "http://127.0.0.1:8000/api/";
  const { idCellier } = useParams();

  const navigate = useNavigate();
  const [cellierValeur, setCellierValeur] = useState({
    nom: "",
  });

  async function fetchCellier() {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(api_url + `cellier/${idCellier}`, { headers: entete });
    const data = await response.json();
    console.log(data);
    setCellierValeur((precedantState) => ({
      ...precedantState,
      nom: data.cellier.nom || '',
    }));
  }
  const [confirmationMessage, setConfirmationMessage] = useState({
    display: false,
    message: "",
  });
  


  useEffect(() => {
    fetchCellier();
  }, []);

  /**
   * Affiche le message de confirmation puis redirige vers la liste des celliers
   */
  useEffect(() => {
    if (confirmationMessage.display) {
      setTimeout(() => {
        navigate("/cellier");
      }, 3000);
    }
  }, [confirmationMessage]);


  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    const nouvellesValeurs = {
      ...cellierValeur,
      [name]: value,
    };
    setCellierValeur(nouvellesValeurs);
  }

  async function modifierCellier() {
    const response = await putCellier(cellierValeur, idCellier);
    if (response.ok) {
      showMessage(
        <span>
          Vous avez modifié le cellier: 
          <br />
          <span className="modalInfos__nom--message">{cellierValeur.nom}</span>
        </span>
      );
    } else {
      showMessage("Une erreur s'est produite lors de la modification");
    }
  }
  


  async function putCellier(cellierValeur, idCellier) {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(`${api_url}cellier/${idCellier}`, {
      method: "PUT",
      body: JSON.stringify(cellierValeur),
      headers: entete,
    });
    return response;
  }
  
/**
 *  Affiche un message de confirmation suite à la modification du cellier
 * @param {*} message  Message à afficher
 */
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
    }, 3000);
  }


  return (
    <div>
      <div className="cellier__titre">Modifier le cellier</div>
      <form className="cellier__form" onSubmit={handleSubmit}>
        <div className="form__group field input__ajouterCellier">
          <input
            placeholder="Nom"
            className="form__field"
            id="nom"
            name="nom"
            type="text"
            value={cellierValeur.nom}
            onChange={handleChange}
            required
          />
          <label className="form__label">Nom</label>
        </div>
        <div className="cellier__btn--div">
          <button
            className="cellier__btn--style cellier__btn--creer"
            type="submit"
            onClick={modifierCellier}
          >
            Enregistrer
          </button>
          <Link
            to="/Cellier"
            className="cellier__btn--style cellier__btn--retour"
          >
            Retour à la liste des celliers
          </Link>
        </div>
      </form>
      {confirmationMessage.display && (
        <ModalInfos message={confirmationMessage.message} />)}
    </div>
  );
}
