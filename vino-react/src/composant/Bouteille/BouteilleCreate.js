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
  const [validerNom, setValiderNom] = React.useState({
    value: "",
    hasError: false,
  })
  const [validerQuantite, setvaliderQuantite] = React.useState({
    value: "",
    hasError: false,
  })
  const [validerType, setvaliderType] = React.useState({
    value: "",
    hasError: false,
  })


  useEffect(() => {

    dataBouteillesAPI();

    fetch(api_url + "types")
      .then((response) => response.json())
      .then((data) => {
        setTypes(data.types);

      });
  }, []);

  const onSuggestionsFetchRequested = ({ value }) => {
    setBouteilleSAQ(filtreBouteille(value));

  }

  const filtreBouteille = (value) => {
    const inputValue = value.trim().toLowerCase();

    // if (inputValue === "") {

    //     setBouteilleSAQ("")
    // }
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


  const onSuggestionsClearRequested = () => {
    setBouteilleSAQ([]);

  }

  const getSuggestionValue = (suggestion) => {
    return `${suggestion.nom} `;
  }

  const renderSuggestion = (suggestion) => (
    <div className='suggestion__wrapper' onClick={() => choisirBouteille(suggestion)}>
      <div className="suggestion_recherche">
        <img src={`${suggestion.url_img} `} />
        <p>{`${suggestion.nom} `}</p>
      </div>
    </div>
  );

  const choisirBouteille = (uneBouteille) => {
    uneBouteille.quantite = "1"
    setBouteilleSelectionnee(uneBouteille);
    setBouteilleValeur(uneBouteille)
    setEstActive(true);


    // ajouterBouteilleSAQ(uneBouteille);
  }


  const onChange = (e, { newValue }) => {
    setRechercheBouteille(newValue);
  }

  const inputProps = {
    placeholder: "Entrez au moins 2 characteres",
    value: rechercheBouteille,
    onChange
  };

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

  const dataBouteillesAPI = () => {
    fetch(api_url + "bouteillessaq")
      .then((response) => response.json())
      .then((data) => {
        setBouteilleSAQ(data.bouteillessaq)
        setDataSAQ(data.bouteillessaq)
      })
  }



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


  // const ajouterBouteille = () => {
  //   bouteilleValeur.cellier_id = idCellier;
  //   PostCellierHasBouteille(bouteilleValeur);
  // }

  function handleBlurNom() {

    //valider nom
    let validerCharactere;
    validerCharactere = bouteilleValeur.nom.length
    if (validerCharactere == 0) {
      const hasError = true
      setValiderNom((prevState) => ({ ...prevState, hasError }))
    } else {
      const hasError = false
      setValiderNom((prevState) => ({ ...prevState, hasError }))
    }

  }

  function handleBlurType() {
    if (bouteilleValeur.type_id == "") {
      const hasError = true;
      setvaliderType((prevState) => ({ ...prevState, hasError }))
    } else {
      const hasError = false;
      setvaliderType((prevState) => ({ ...prevState, hasError }))
    }
  }

  function handleBlurQuantite() {
    if (bouteilleValeur.quantite == "") {
      const hasError = true
      setvaliderQuantite((prevState) => ({ ...prevState, hasError }))
    } else {
      const hasError = false
      setvaliderQuantite((prevState) => ({ ...prevState, hasError }))
    }
  }

  const ajouterBouteille = () => {
    bouteilleValeur.cellier_id = idCellier;

    if (bouteilleValeur.nom == "" || bouteilleValeur.quantite == "" || bouteilleValeur.type_id == "") {
      const hasError = true
      // if(bouteilleValeur.nom != ""){
      //   const hasError = false
      //   setValiderNom((prevState) => ({ ...prevState, hasError }))
      // }
      // if(bouteilleValeur.quantite!=""){
      //   const hasError = false
      //   setvaliderQuantite((prevState) => ({ ...prevState, hasError }))
      // }
      // if(bouteilleValeur.type_id==""){
      //   const hasError = false
      //   setvaliderType((prevState) => ({ ...prevState, hasError }))
      // }
      setValiderNom((prevState) => ({ ...prevState, hasError }))
      setvaliderQuantite((prevState) => ({ ...prevState, hasError }))
      setvaliderType((prevState) => ({ ...prevState, hasError }))

    } else {
      PostCellierHasBouteille(bouteilleValeur)
        .then(() => {
          setConfirmationMessage({
            display: true,
            message: "Bouteille ajoutée avec succès.",
          });
        })
        .catch((error) => {
          setConfirmationMessage({
            display: true,
            message: "Erreur lors de l'ajout de la bouteille.",
          });
          console.log(error);
        });
    }
  };


  async function PostCellierHasBouteille(bouteilleValeur) {
    console.log(bouteilleValeur, "lo que vou agregar antes del");
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
  }

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
        {/* {estActive && (<button type="subtmit" > quitar </button>)} */}

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
            onBlur={handleBlurNom}
            readOnly={estActive}

          />
          <label className="form__label">Nom</label>
          {validerNom.hasError && <p className="erreurChamps"> Veuillez Compléter ce Champ</p>}
        </div>

        <div className="ajouter__bouteille--form--row">
          <select
            value={bouteilleValeur.type_id}
            name="type_id"
            onChange={handleChange}
            onBlur={handleBlurType}
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
        {validerType.hasError && <p className="erreurChamps"> Veuillez selecctionez le type du vin </p>}


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
              onBlur={handleBlurQuantite}
            />
            <label className="form__label">Quantité</label>
            {validerQuantite.hasError && <p className="erreurChamps"> Veuillez Compléter ce Champ</p>}
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


