import "./EspaceMembre.css";
import {
    Route,
    Routes,
    BrowserRouter,
    useNavigate,
    Link,
    json,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import bouteillePerso from '../../img/bouteille-perso.png';
import etoiles from '../../img/star_rating.png';

export default function EspaceMembre() {
    const api_url = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();

    const [contenuBody, setContenuBody] = useState("Sélectionner une option");
    // const [celliers, setCelliers] = useState("");
    // const [bouteilles, setBouteilles] = useState("");

    useEffect(() => {
        //
    }, []);

    /**
     * Afficher les informations personnelles de l'utilisateur connecté
     *
     * @function
     */
    const afficherInfos = () => {
        console.log('Infos');

        const userInfos = {
            name: localStorage.getItem("user"),
            user_id: localStorage.getItem("user_id"),
            user_email: localStorage.getItem("user_email")
        }

        const content = afficherContenu(userInfos);


        setContenuBody(content);
    };

    /**
     * Afficher la liste complète de toutes les bouteilles de l'utilisateur connecté peu importe le cellier
     *
     * @function
     */
    const afficherBouteilles = () => {
        console.log('Bouteilles');
        let id = 1;
        const Bouteilles = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/api/cellier/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const bouteilles = await response.json();

            setContenuBody(bouteilles);
        };
    }

    /**
     * Afficher la liste de toutes les bouteilles archivées ou vides de l'utilisateur connecté peu importe le cellier
     *
     * @function
     */
    const afficherArchives = () => {
        console.log('Archives');
        setContenuBody("Archives");
    };

    /**
     * Afficher la liste de toutes les notes données sur toutes bouteilles de l'utilisateur connecté peu importe le cellier
     *
     * @function
     */
    const afficherNotes = () => {
        console.log('Notes');
        setContenuBody("Notes");
    };

    /**
     *  Fonction qui permet d'afficher les informations choisies par l'utilisateur (Infos, Bouteilles, Archives ou Notes)
     * @returns  contenuBody
     */
    function afficherContenu(contenu) {
        // let contenuBody = null;
        // if (contenuBody && contenuBody.length > 0) {

        return (
            <div>
                <h3>{contenu.name}</h3>
                <h3>{contenu.user_id}</h3>
                <h3>{contenu.user_email}</h3>
            </div>
        );

        // } else {
        //   contenuBody = <p>Contenu non disponible</p>;
        // }
        // return contenuBody;
    }



    return (
        <div>
            <h1 className="espaceMembre">Espace Membre</h1>
            <div className="espaceMembre__filtres">
                <button className="espaceMembre__filtres--btn" onClick={afficherInfos}>Infos</button>
                <button className="espaceMembre__filtres--btn" onClick={afficherBouteilles}>Bouteilles</button>
                <button className="espaceMembre__filtres--btn" onClick={afficherArchives}>Archives</button>
            </div>
            {/* <div className="espaceMembre__body">
        {contenuBody}
      </div> */}
            <div className="espaceMembre__infos">
                <div className="espaceMembre__infos--wrapper">
                    <div className="espaceMembre__infos">
                    <p className="espaceMembre__infos--nom">Nom : </p>
                    <p className="espaceMembre__infos--courriel">Courriel :</p>
                    <p className="espaceMembre__infos--mdp">Mot de passe : </p>
                    </div>
                    <button className="espaceMembre__infos--btn">
                        Modifier
                    </button>
                </div>
            </div>

            {/* <div className="espaceMembre__bouteilles">
                <div className="espaceMembre__bouteilles--wrapper">
                    <h3 className="espaceMembre__bouteilles--titre">Liste des bouteilles</h3>
                    <div className="espaceMembre__bouteilles--liste">
                    </div>
                </div>
            </div> */}

            <div className="espaceMembre__archives">
                <div className="espaceMembre__archives--wrapper">
                    <h3 className="espaceMembre__archives--titre">Liste des archives</h3>
                    <div className="espaceMembre__archives--liste">
                        <div className="espaceMembre__archives--item">
                        <img src={bouteillePerso} alt="Image de la bouteille" className="bouteille__img" />
                        <p className="bouteille__nom">Nom de la bouteille de vin</p>
                        <img src={etoiles} alt="Note de la bouteille" className="bouteille__note" />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
