import "./EspaceMembre.css";
import { Route, Routes, BrowserRouter, useNavigate, Link, json, } from "react-router-dom";
import React, { useEffect, useState } from "react";
import bouteillePerso from '../../img/bouteille-perso.png';
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";


export default function EspaceMembre() {
  const api_url = "http://127.0.0.1:8000/api/";
  const id = localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [userValeur, setuserValeur] = useState({
    name: "",
    email: "",
    password: "",
    user_id: id,
  });

  const [confirmationMessage, setConfirmationMessage] = useState({
    display: false,
    message: "",
  });

  const [validerNom, setValiderNom] = useState("");
  const [contenuBody, setContenuBody] = useState("");
  const [bouteilles, setBouteilles] = useState([]);
  const [formulaireInfos, setFormulaire] = useState("");
  const [afficheFormulaire, setAfficheFormulaire] = useState(false); // nouvel état pour gérer l'affichage du formulaire de modifiication des infos



  useEffect(() => {
    fetchUser();
    getBouteilles("bouteilles");

    if (confirmationMessage.display) {
      setTimeout(() => {
        navigate("/espacemembre");
      }, 2000);
    }
  }, [confirmationMessage, navigate]);


  /**
   * Récupérer les informations de l'utilisateur connecté
   *
   * @function
   */
  async function fetchUser() {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(api_url + `user/${id}`, { headers: entete });
    const data = await response.json();

    setuserValeur((precedantState) => ({
      ...precedantState,
      name: data[0].name || '',
      email: data[0].email || '',
      password: data[0].password || '',
      user_id: data[0].id || '',
    }));

    const infosUser = afficherInfos(userValeur);
    setFormulaire(infosUser);
  }



  /**
 *  Affiche le message rétroactif pour l'utilisateur
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


  const getBouteilles = async (choix) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem("user_id");
    let url;

    if (choix === "bouteilles") {
      url = api_url + "user/" + user_id + '/bouteilles';
    } else if (choix === "archives") {
      url = api_url + "user/" + user_id + '/archives';
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    const bouteilles = await response.json();
    setBouteilles(bouteilles);

    const contenu = afficherContenu(bouteilles, choix);
    setContenuBody(contenu);
  };


  /**
* Afficher la liste complète de toutes les bouteilles de l'utilisateur connecté peu importe le cellier
*
* @function
*/
  const afficherBouteilles = () => {
    getBouteilles("bouteilles");
  }

  /**
  * Afficher la liste de toutes les bouteilles archivées ou vides de l'utilisateur connecté peu importe le cellier
  *
  * @function
  */
  const afficherArchives = () => {
    getBouteilles("archives");
  };


  /**
*  Fonction qui permet d'afficher les informations choisies par l'utilisateur (Infos, Bouteilles, Archives ou Notes)
* @returns  contenuBody
*/
  function afficherContenu(bouteilles, choix) {

    return (
      <div className="espaceMembre__contenu">
        <div className="espaceMembre__contenu--wrapper">
          <h3 className="espaceMembre__contenu--titre">Liste des {choix}</h3>
          <div className="espaceMembre__contenu--liste">
            {bouteilles.length > 0 ? (
              <div>
                {bouteilles.map((uneBouteille) => (
                  <div key={uneBouteille.id} className="espaceMembre__contenu--item">
                    <img src={ uneBouteille.code_saq ? uneBouteille.url_img : bouteillePerso} alt="Image de la bouteille" className="bouteille__img" />
                    <p className="bouteille__nom">{uneBouteille.nom}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>Aucune bouteille trouvée</p>
            )}
          </div>
        </div>
      </div>
    );
  }


  /**
   *  Fonction qui permet d'afficher les informations choisies par l'utilisateur (Infos, Bouteilles, Archives ou Notes)
   * @returns  contenuBody
   */
  function afficherInfos(userValeur) {

    return (
      <div className="espaceMembre__infos">
        <div className="espaceMembre__infos--wrapper">
          <h3 className="espaceMembre__infos--titre">Informations personnelles</h3>
          <div className="espaceMembre__infos--infos">
            <div className="espaceMembre__infos">
              <p className="espaceMembre__infos--nom">Nom : {userValeur.name} </p>
              <p className="espaceMembre__infos--courriel">Courriel : {userValeur.email}</p>
            </div>
            <button className="espaceMembre__infos--btn" onClick={modifierInfos}>
              Modifier
            </button>
          </div>
        </div>
      </div>
    );
  }


  /**
   *  Fonction qui permet d'afficher les informations choisies par l'utilisateur (Infos, Bouteilles, Archives ou Notes)
   * @returns  contenuBody
   */
  function FormulaireInfos({ userValeur, handleChange, handleSubmit, modifierUser, confirmerInfos, confirmationMessage }) {
    return (
      <div>
        <div className="ajouter__bouteille--titre ">
          <h3>Modifier les informations personnelles</h3>
        </div>
        <form className="ajouter__bouteille--form" onSubmit={handleSubmit}>
          <div className="ajouter__bouteille--form--row">
            <div className="form__group field">
              <input
                placeholder="Nom"
                className="form__field"
                id="name"
                name="name"
                type="text"
                value={userValeur.name}
                onChange={handleChange}
              />
              <label className="form__label">Nom</label>
              {validerNom && <p className="erreurChamps">  Champ obligatoire</p>}
            </div>
            <div className="form__group field">
              <input
                placeholder="Courriel"
                className="form__field"
                id="email"
                name="email"
                type="text"
                value={userValeur.email}
                onChange={handleChange}
              />
              <label className="form__label">Courriel</label>
            </div>

            <div className="form__group field">
              <input
                placeholder="Mot de passe"
                className="form__field"
                id="password"
                name="password"
                type="password"
                value={userValeur.password}
                onChange={handleChange}
              />
              <label className="form__label">Mot de passe</label>
            </div>
          </div>
          <div className="cellier__btn--div">
            <button
              className="inscription__bouton--btn"
              type="submit"
              onClick={modifierUser}
            >
              Modifier les informations
            </button>

          </div>
        </form>
        {confirmationMessage.display && (<ModalInfos message={confirmationMessage.message} />)}
      </div>
    );
  }


  /**
   * Affiche le formulaire pour modifier les informations personnelles de l'utilisateur
   *
   * @function
   */
  const modifierInfos = () => {
    setAfficheFormulaire(true); // Affiche le formulaire
  };


  function handleSubmit(evt) {
    evt.preventDefault();
    modifierUser();
  }


  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    setuserValeur((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }


  async function modifierUser() {
    const user_id = localStorage.getItem("user_id");
    const response = await putUser(userValeur, user_id);
    const res = await response.json()
    if (res.status == 422) {
      setValiderNom(res.status)

    } else {
      showMessage(
        <span>
          Vous avez bien modifié les informations de :
          <br />
          <span className="modalInfos__nom--message">{userValeur.name}</span>
        </span>
      );
    }
  }
  

  async function putUser(userValeur, id) {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);

    const queryParams = new URLSearchParams({
      user_id: id,
      name: userValeur.name,
      email: userValeur.email,
      password: userValeur.password,
    });

    const response = await fetch(`${api_url}user/${id}?${queryParams.toString()}`, {
      method: "PUT",
      headers: entete,
    });

    return response;
  }


  useEffect(() => {
    if (confirmationMessage.display) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [confirmationMessage, navigate]);


  return (
    <>
      <div>
        <h1 className="espaceMembre">Espace Membre</h1>
        <div className="espaceMembre__filtres">
          <button className="espaceMembre__filtres--btn" onClick={afficherBouteilles}>Bouteilles</button>
          <button className="espaceMembre__filtres--btn" onClick={afficherArchives}>Archives</button>
        </div>
        {afficheFormulaire ? (
          <FormulaireInfos
            userValeur={userValeur}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            modifierUser={modifierUser}
            confirmationMessage={confirmationMessage}
          />
        ) : (
          afficherInfos(userValeur)
        )}

        {contenuBody}
      </div>
    </>
  );
}

