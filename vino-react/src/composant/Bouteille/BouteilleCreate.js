import React, { useState, useEffect } from "react";
import "./Bouteille.css";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import iconeSupprimer from '../../img/icone-supprimer.svg';
import iconeBalai from '../../img/icone-balai.svg';
// component React Autosuggest 
// npm install react-autosuggest --save
import Autosuggest from 'react-autosuggest';
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";



export default function BouteilleCreate() {
  const api_url = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();
  const { idCellier } = useParams();
  const [pays, setPays] = useState([]);
  const [types, setTypes] = useState([]);
  const [bouteilleValeur, setBouteilleValeur] = React.useState({
    nom: "", format: "", prix: "", annee: "", code_saq: "", url_saq: "", url_img: "", pays: "", type_id: "", quantite: "",
  });
  const [dataSAQ, setDataSAQ] = useState([]);
  const [bouteilleSAQ, setBouteilleSAQ] = useState([]);
  const [rechercheBouteille, setRechercheBouteille] = useState('');
  const [bouteilleSelectionnee, setBouteilleSelectionnee] = useState({});
  const [estActive, setEstActive] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState({
    display: false,
    message: "",
  });

  const [validerNom, setValiderNom] = useState("")
  const [validerQuantite, setvaliderQuantite] = useState("")
  const [validerType, setvaliderType] = useState("")


  useEffect(() => {
    // 
    dataBouteillesAPI();
    fetch(api_url + "types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data.types);

      });
  }, []);

  /**
   * Obtenez les bouteilles de l’API et mettez à jour l’état de l’application avec les informations reçues.
   * @function
   */
  const dataBouteillesAPI = () => {
    fetch(api_url + "bouteillessaq")
      .then((response) => response.json())
      .then((data) => {
        setBouteilleSAQ(data.bouteillessaq)
        setDataSAQ(data.bouteillessaq)
      })
  }


  const onSuggestionsFetchRequested = ({ value }) => {
    setBouteilleSAQ(filtreBouteille(value));

  }
  /**
   * Filtre les bouteilles en fonction de la valeur de recherche saisie par l'utilisateur.
   *
   * @param {string} value La valeur de recherche saisie par l'utilisateur.
   * @returns {Array} Un tableau de bouteilles filtrées correspondant à la valeur de recherche
   */
  const filtreBouteille = (value) => {
    const inputValue = value.trim().toLowerCase();

    const inputLength = inputValue.length;
    if (inputLength >= 2) {

      let filtre = dataSAQ.filter((uneBouteille) => {
        let nomComplete = uneBouteille.nom
        if (nomComplete.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)) {
          return uneBouteille;
        }
      });
      return inputLength === 0 ? [] : filtre;
    } else {
      return [];
    }
  }

  /**
 * Efface les suggestions de bouteilles lorsque la demande est déclenchée.
 */
  const onSuggestionsClearRequested = () => {
    setBouteilleSAQ([]);
  }


  /**
   * Récupère la valeur d'une suggestion en fonction de l'objet suggéré.
   *
   * @param {Object} suggestion L'objet suggestion contenant les informations d'une bouteille.
   * @returns {string} La valeur de la suggestion à afficher.
   */
  const getSuggestionValue = (suggestion) => {
    return `${suggestion.nom} `;
  }


  /**
   * Rend une suggestion de bouteille sous forme d'élément JSX.
   *
   * @param {Object} suggestion L'objet suggestion contenant les informations d'une bouteille.
   * @returns {JSX.Element} L'élément JSX représentant la suggestion de bouteille nom et image.
   */
  const renderSuggestion = (suggestion) => (
    <div className='suggestion__wrapper' onClick={() => choisirBouteille(suggestion)}>
      <div className="suggestion_recherche">
        <img src={`${suggestion.url_img} `} />
        <p>{`${suggestion.nom} `}</p>
      </div>
    </div>
  );



  /**
   * Sélectionne une bouteille et met à jour l'état des variables associées au affichage et modification
   *
   * @param {Object} uneBouteille L'objet bouteille sélectionné (pour la suggestion).
   */
  const choisirBouteille = (uneBouteille) => {
    uneBouteille.quantite = "1"
    setBouteilleSelectionnee(uneBouteille);
    setBouteilleValeur(uneBouteille)
    setEstActive(true);
    setValiderNom(false)
    setvaliderType(false)
    setvaliderQuantite(false)
  }

  /**
   * Met à jour la valeur de la recherche de bouteille lorsqu'un changement est détecté.
   *
   * @param {Event} e L'événement déclenché par le changement.
   * @param {Object} param1 L'objet contenant la nouvelle valeur de la recherche.
   * @param {string} param1.newValue La nouvelle valeur de la recherche.
   */
  const onChange = (e, { newValue }) => {
    setRechercheBouteille(newValue);
  }


  /**
   * Les propriétés d'entrée pour le composant de saisie de la recherche de bouteille.
   * @type {Object}
   * @property {string} placeholder Le texte d'aide à afficher dans le champ de recherche.
   * @property {string} value La valeur actuelle du champ de recherche.
   * @property {Function} onChange La fonction à appeler lorsqu'un changement est détecté dans le champ de recherche.
   */
  const inputProps = {
    placeholder: "Entrez au moins 2 characteres",
    value: rechercheBouteille,
    onChange
  };


  /**
   * Fonction qui permet de selectionner une bouteille avec une enter sur le clavier 
   * @param {*} e event
   */
  const eventEnter = (e) => {
    if (e.key == "Enter") {
      let bouteilleActuel = dataSAQ.filter(b => b.nom == e.target.value.trim());
      let bouteille = {
        id: bouteilleActuel[0].id,
        nom: bouteilleActuel[0].nom,
      };
      choisirBouteille(bouteille);
    }
  }


  function handleSubmit(e) {
    /**
     * Empêche le comportement par défaut de qui recharge le site
     */
    e.preventDefault();
  }


  /**
   * Met à jour l'état de bouteilleValeur en fonction des modifications apportées dans les champs d'entrée.
   *
   * @param {Event} evt L'événement déclenché par le changement dans un champ d'entrée.
   */
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



  /**
   * Ajoutez une bouteille au cellier spécifié en utilisant la fonction PostCellierHasBouteille.
   *
   */
  const ajouterBouteille = async () => {
    bouteilleValeur.cellier_id = idCellier;

    const bouteilleExisteDeja = await verifierBouteilleExistante(bouteilleValeur.cellier_id, bouteilleValeur.id); // je vérifie si la bouteille existe déjà dans le cellier

    if (bouteilleExisteDeja) { // si la bouteille existe déjà, j'affiche un message d'erreur et je ne fais pas l'ajout
      setConfirmationMessage({
        display: true,
        message: "Cette bouteille existe déjà dans votre cellier.",
      });
    } else {
      PostCellierHasBouteille(bouteilleValeur); // si la bouteille n'existe pas, je fais l'ajout
    }
  };



  /**
   *  Vérifie si la bouteille existe déjà dans le cellier
   * @param {*} cellier_id  id du cellier
   * @param {*} bouteille_id  id de la bouteille
   * @returns  booleen, ici, true si la bouteille existe déjà
   */
  async function verifierBouteilleExistante(cellier_id, bouteille_id) {
    const token = localStorage.getItem("token");

    const reponse = await fetch(`${api_url}cellier/${cellier_id}`, { // je récupère les données du cellier
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (reponse.status === 200) {
      const data = await reponse.json();
      const bouteilles = data.bouteilles; // je récupère le tableau de bouteilles du cellier

      const bouteilleExistante = bouteilles.find( // je cherche si la bouteille avec le id spécifié existe dans le tableau bouteilles en utilisant la méthode find
        (bouteille) => bouteille.id === bouteille_id  // je compare l'id de la bouteille avec l'id de la bouteille que je veux ajouter
      );

      return bouteilleExistante !== undefined; // je retourne true si la bouteille existe déjà, sinon, je retourne false
    } else {
      throw new Error("Erreur lors de la vérification de l'existence de la bouteille.");
    }
  }

  /**
   * Effectuez une demande POST pour ajouter une nouvelle Bouteille (bouteille) au serveur.
   *
   * @async
   * @param {Object} bouteilleValeur - Un objet qui contient les informations de la Bouteille à ajouter.
   * @returns {Promise<void>}  met à jour l’état de l’application en fonction de la réponse du serveur.
   */
  async function PostCellierHasBouteille(bouteilleValeur) {

    let entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);

    const options = {
      method: "POST",
      body: JSON.stringify(bouteilleValeur),
      headers: entete,
    }

    const response = await fetch(api_url + "bouteille", options);
    const res = await response.json()
    // validation des erreurs 
    if (res.status === 422) {
      setValiderNom(res.errors.nom)
      setvaliderType(res.errors.type_id)
      setvaliderQuantite(res.errors.quantite)
    } else {
      setConfirmationMessage({
        display: true,
        message: "Bouteille ajoutée avec succès.",
      });

    }

  }
  /**
   * Réinitialise l'état des variables liées à la bouteille sélectionnée et désactive la sélection.
   */
  const enleverBouteille = () => {
    setEstActive(false);
    setBouteilleValeur({
      nom: "", format: "", prix: "", annee: "", code_saq: "", url_saq: "", url_img: "", pays: "", type_id: "", quantite: "",
    });
    setRechercheBouteille("")
  }

  useEffect(() => {
    if (confirmationMessage.display) {
      setTimeout(() => {
        navigate('/cellier/' + idCellier);
      }, 2000);
    }
  }, [confirmationMessage, navigate, idCellier]);


  return (
    <div>
      <div className="ajouter__bouteille--titre ">
        <h1>Ajouter un vin</h1>
      </div>
      <div className="recherche_bouteille_saq">
        <h2>Recherche SAQ </h2>
        <Autosuggest
          suggestions={bouteilleSAQ}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={eventEnter}
        />
        {estActive && <img
          className="bouteille__supprimer"
          src={iconeBalai}
          alt="Supprimer la bouteille"
          onClick={() => enleverBouteille()}
        />}


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
            readOnly={estActive}

          />
          <label className="form__label">Nom</label>
          {validerNom && <p className="erreurChamps">  Champ obligatoire</p>}
        </div>

        <div className="ajouter__bouteille--form--row">
          <select
            value={bouteilleValeur.type_id}
            name="type_id"
            onChange={handleChange}
            disabled={estActive}
          >
            <option value="" disabled > Type</option>
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
              readOnly={estActive}
              value={bouteilleValeur.annee}
              onChange={handleChange}
            />
            <label className="form__label">Millésime</label>
          </div>
        </div>
        {validerType && <p className="erreurChamps"> Champ type obligatoire </p>}


        <div className="form__group field">
          <input
            placeholder="Pays"
            className="form__field"
            id="pays"
            name="pays"
            type="text"
            readOnly={estActive}
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
              type="number"
              readOnly={estActive}
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
              type="number"
              readOnly={estActive}
              value={bouteilleValeur.prix}
              onChange={handleChange}
            />
            <label className="form__label">Prix</label>
          </div>

          <input
            placeholder="Code SAQ"
            className="form__field"
            id="code_saq"
            name="code_saq"
            type="hidden"
            value={bouteilleValeur.code_saq}
            onChange={handleChange}
          />

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
            {validerQuantite && <p className="erreurChamps"> Champ obligatoire </p>}
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

        <div className="cellier__btn--div">
          <button
            className="inscription__bouton--btn"
            type="submit"
            onClick={ajouterBouteille}

          >
            Ajouter
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


