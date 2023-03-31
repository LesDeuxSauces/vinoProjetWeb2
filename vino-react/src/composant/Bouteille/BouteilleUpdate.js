import React, { useState, useEffect } from "react";
import "./Bouteille.css";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";


export default function BouteilleUpdate() {
  const api_url = "http://127.0.0.1:8000/api/";
  const { idCellier, id } = useParams();
  const navigate = useNavigate();
  const [pays, setPays] = useState([]);
  const [types, setTypes] = useState([{ types: [] }]);
  const [bouteilleValeur, setBouteilleValeur] = useState({
    nom: "",
    format: "",
    prix: "",
    annee: "",
    url_saq: "",
    url_img: "",
    pays: "",
    type_id: "",
    code_saq: "",
    // quantite: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState({
    display: false,
    message: "",
  });

  const [validerNom, setValiderNom] = useState("")




  async function fetchTypes() {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(api_url + "types", { headers: entete });
    const data = await response.json();
    setTypes(data);
  }


  async function fetchBouteille() {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(api_url + `bouteille/${id}`, { headers: entete });
    const data = await response.json();
    console.log("récupération du data de la bouteille:", data);
    setBouteilleValeur((precedantState) => ({
      ...precedantState,
      nom: data.data.nom || '',
      format: data.data.format || '',
      prix: data.data.prix || '',
      annee: data.data.annee || '',
      url_saq: data.data.url_saq || '',
      url_img: data.data.url_img || '',
      code_saq: data.data.code_saq || '',
      pays: data.data.pays || '',
      type_id: data.data.type_id || '',
    }));
  }


  useEffect(() => {
    fetchBouteille();
    fetchTypes();
  }, []);




  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    const nouvellesValeurs = {
      ...bouteilleValeur,
      [name]: value,
    };
    setBouteilleValeur(nouvellesValeurs);
  }

  
  
  async function modifierBouteille() {
    bouteilleValeur.cellier_id = idCellier;
    const response = await putCellierHasBouteille(bouteilleValeur, id);
    const res = await response.json()
    if (res.status == 422){
      setValiderNom(res.status)

    }else {
     
      showMessage(
        <span>
          Vous avez modifié la bouteille:
          <br />
          <span className="modalInfos__nom--message">{bouteilleValeur.nom}</span>
        </span>
      );
    }
  }
  
  async function putCellierHasBouteille(bouteilleValeur, id) {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(`${api_url}bouteille/${id}`, {
      method: "PUT",
      body: JSON.stringify(bouteilleValeur),
      headers: entete,
    });

    return response;
  }

  useEffect(() => {
    if (confirmationMessage.display) {
      setTimeout(() => {
        navigate("/cellier/" + idCellier);
      }, 2000);
    }
  }, [confirmationMessage, navigate, idCellier]);




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



  return (
    <div>
      <div className="ajouter__bouteille--titre ">
        <h1>Modifier la bouteille de Vin</h1>
      </div>
      <form className="ajouter__bouteille--form" onSubmit={handleSubmit}>
        <div className="form__group field">
          <input
            placeholder="Nom"
            className="form__field"
            id="nom"
            name="nom"
            type="text"
            value={bouteilleValeur.nom}
            onChange={handleChange}
            
          />
          <label className="form__label">Nom</label>
          {validerNom && <p className="erreurChamps">  Champ obligatoire</p>}
        </div>

        <div className="ajouter__bouteille--form--row">

          <select
            value={bouteilleValeur.type_id}
            name="type_id"
            onChange={handleChange}
          >
            <option value="" disabled>
              Type
            </option>
            {types && types.types && types.types.map((value) => (
              <option key={value.id} value={value.id}>
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


        <div className="form__group field">
          <input
            placeholder="Pays"
            className="form__field"
            id="pays"
            name="pays"
            type="text"
            value={bouteilleValeur.pays}
            onChange={handleChange}
          />

          <label className="form__label">Pays</label>
        </div>
        <div className="ajouter__bouteille--form--row">


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

        <input
          id="code_saq"
          name="code_saq"
          type="hidden"
          value={bouteilleValeur.code_saq}
          onChange={handleChange}
        />

        <div className="cellier__btn--div">
          <button
            className="inscription__bouton--btn"
            type="submit"
            onClick={modifierBouteille}
          >
            Modifier bouteille
          </button>

          <Link
            to="/Cellier"
            className="cellier__btn--style cellier__btn--retour"
          >
            Retour à la liste des celliers
          </Link>
        </div>
      </form>
      {confirmationMessage.display && (<ModalInfos message={confirmationMessage.message} />)}
    </div>
  );
}