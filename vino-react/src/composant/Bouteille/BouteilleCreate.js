import React, { useState, useEffect } from "react";
import "./Bouteille.css";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import iconeSupprimer from '../../img/icone-supprimer.svg';
import iconeBalai from '../../img/icone-balai.svg';
// component React Autosuggest 
// npm install react-autosuggest --save
import Autosuggest from 'react-autosuggest';



export default function BouteilleCreate() {
    const api_url = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();
    const { idCellier } = useParams();
    const [pays, setPays] = useState([]);
    const [types, setTypes] = useState([]);
    const [bouteilleValeur, setBouteilleValeur] = React.useState({
        nom: "",
        format: "",
        prix: "",
        annee: "",
        code_saq: "",
        url_saq: "",
        url_img: "",
        pays: "",
        type_id: "",
        quantite: "",
    });
    const [dataSAQ, setDataSAQ] = useState([]);
    const [bouteilleSAQ, setBouteilleSAQ] = useState([]);
    const [rechercheBouteille, setRechercheBouteille] = useState('');
    const [bouteilleSelectionnee, setBouteilleSelectionnee] = useState({});
    const [estActive, setEstActive] = useState(false);


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
        <div className='sugerencia' onClick={() => choisirBouteille(suggestion)}>
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


    const ajouterBouteille = () => {
        bouteilleValeur.cellier_id = idCellier;
        PostCellierHasBouteille(bouteilleValeur);

        // const options = {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json",
        //         accept: "application/json",
        //     },
        //     body: JSON.stringify(bouteilleValeur),
        // };

        // fetch("http://127.0.0.1:8000/api/bouteille", options)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data);
        //         navigate('/cellier/' + idCellier);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

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
        console.log(res);

        window.location.pathname = '/cellier/' + idCellier;
    }

    const enleverBouteille = () => {
        console.log("quita las cosas");
        setEstActive(false);
        setBouteilleValeur({
            nom: "", format: "", prix: "", annee: "", code_saq: "", url_saq: "", url_img: "", pays: "", type_id: "", quantite: "",
        });

        setRechercheBouteille("")



    }







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
                        readOnly={estActive}
                        required
                    />
                    <label className="form__label">Nom</label>
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
                            type="text"
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
                            type="text"
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
        </div>
    );
}


