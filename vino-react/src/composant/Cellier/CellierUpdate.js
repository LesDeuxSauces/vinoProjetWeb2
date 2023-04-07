import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Cellier.css";
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";


/**
 *  Composant permettant de modifier un cellier
 */
export default function CellierUpdate() {
  const api_url = "http://127.0.0.1:8000/api/";
  const { idCellier } = useParams();

  const navigate = useNavigate();
  const [cellierValeur, setCellierValeur] = useState({
    nom: "",
  });
  const [nomValider, setNomValider] = useState('');

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
      nom: data.cellier.nom || '', // on modifie la valeur de la propriété nom
    }));
  }
  const [confirmationMessage, setConfirmationMessage] = useState({ // on crée un état pour le message de confirmation
    display: false,
    message: "",
  });



  useEffect(() => {
    fetchCellier();
  }, []);

  /**
   * Affiche le message de confirmation puis redirige vers la liste des celliers
   */
  useEffect(() => { // on affiche le message de confirmation
    if (confirmationMessage.display) {
      setTimeout(() => {
        navigate("/cellier");
        window.location.reload(); // on recharge la page pour afficher le nouveau cellier
      }, 2000);  // on attend 2 secondes avant de rediriger vers la liste des celliers
    }
  }, [confirmationMessage]);


  /**
   * @param {*} evt  événement de soumission du formulaire
   */
  function handleSubmit(evt) {
    evt.preventDefault();
  }


  /**
   *  
   * @param {*} evt  événement de modification d'un champ du formulaire
   */
  function handleChange(evt) {
    const { target } = evt;  // on récupère l'élément qui a déclenché l'événement
    const { name, value } = target; // on récupère le nom et la valeur du champ modifié

    const nouvellesValeurs = { 
      ...cellierValeur, 
      [name]: value, 
    };
    setCellierValeur(nouvellesValeurs); // on met à jour l'état avec les nouvelles valeurs
  }


  /**
   * Envoie les données du formulaire au serveur
   */
  async function modifierCellier() {
    const response = await putCellier(cellierValeur, idCellier);
    const res = await response.json()

    if (res.status == 422) {
      setNomValider(res.errors.nom)
    } else {
      showMessage(
        <span>
          Vous avez modifié le cellier:
          <br />
          <span className="modalInfos__nom--message">{cellierValeur.nom}</span>
        </span>
      );
    }
  }


/**
 *  Envoie les données du formulaire au serveur
 * @param {*} cellierValeur  Valeurs du formulaire
 * @param {*} idCellier  Identifiant du cellier à modifier
 * @returns 
 */
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
    }, 2000);
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

          />
          <label className="form__label">Nom</label>
          {nomValider && <p className="erreurChamps">  Champ obligatoire</p>}
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
