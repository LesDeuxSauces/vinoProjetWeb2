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
    const api_url = "http://127.0.0.1:8000/api/user/";
    const navigate = useNavigate();

    const [contenuBody, setContenuBody] = useState("");
    const [userInfos, setUserInfos] = useState({
        name: localStorage.getItem("user"),
        user_id: localStorage.getItem("user_id"),
        user_email: localStorage.getItem("user_email")
    });

    const [bouteilles, setBouteilles] = useState([]);
    const [formulaireInfos, setFormulaire] = useState("");

    useEffect(() => {
        Bouteilles("bouteilles");
        const infos = afficherInfos(userInfos);
        setFormulaire(infos);
    }, []);


    /**
     * Afficher la liste complète de toutes les bouteilles de l'utilisateur connecté peu importe le cellier
     *
     * @function
     */
    const afficherBouteilles = () => {
        Bouteilles("bouteilles");
    }

    /**
    * Afficher la liste de toutes les bouteilles archivées ou vides de l'utilisateur connecté peu importe le cellier
    *
    * @function
    */
    const afficherArchives = () => {
        Bouteilles("archives");
    };


    const Bouteilles = async (choix) => {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem("user_id");
        let url;

        if (choix === "bouteilles") {
            url = api_url + user_id + '/bouteilles';
        } else if (choix === "archives") {
            url = api_url + user_id + '/archives';
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
     * Afficher la liste de toutes les notes données sur toutes bouteilles de l'utilisateur connecté peu importe le cellier
     *
     * @function
     */
    const afficherNotes = () => {
        console.log('Notes');
        setContenuBody("Notes");
    };


    /**
     * Affiche le formulaire pour modifier les informations personnelles de l'utilisateur
     *
     * @function
     */
    const modifierInfos = () => {
        console.log('Modifier infos');
        const formulaire = afficherFormulaire(userInfos);
        setFormulaire(formulaire);
    };



    /**
     * Affiche le formulaire pour modifier les informations personnelles de l'utilisateur
     *
     * @function
     */
    const confirmerInfos = () => {
        console.log('Modifier infos');
        const formulaire = afficherInfos(userInfos);
        setFormulaire(formulaire);
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
                                        <img src={uneBouteille.url_img} alt="Image de la bouteille" className="bouteille__img" />
                                        <p className="bouteille__nom">{uneBouteille.nom}</p>
                                        <img src={etoiles} alt="Note de la bouteille" className="bouteille__note" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Aucun bouteille trouvé</p>
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
    function afficherFormulaire(userInfos) {

        return (
            <div className="espaceMembre__formulaire">
                <div className="espaceMembre__formulaire--wrapper">
                    <h3 className="espaceMembre__formulaire--titre">Modifier les informations personnelles</h3>
                    <form className="espaceMembre__formulaire--form">
                        <div>
                            <label> Nom : <input type="text" name="name" id="name" value={userInfos.name} /></label>
                            <label> Courriel : <input type="text" name="email" id="email" value={userInfos.user_email} /></label>
                            <label> Nouveau mot de passe : <input type="password" name="password" id="password" /></label>
                            <label> Confirmer mot de passe : <input type="password" name="password_confirmation" id="password_confirmation" /></label>
                        </div>
                        <button type="submit" className="espaceMembre__infos--btn" onClick={confirmerInfos} >Confirmer</button>
                    </form>
                </div>
            </div>
        );
    }
    /**
     *  Fonction qui permet d'afficher les informations choisies par l'utilisateur (Infos, Bouteilles, Archives ou Notes)
     * @returns  contenuBody
     */
    function afficherInfos(userInfos) {

        return (
            <div className="espaceMembre__infos">
                <div className="espaceMembre__infos--wrapper">
                    <h3 className="espaceMembre__infos--titre">Informations personnelles</h3>
                    <div className="espaceMembre__infos--infos">
                        <div className="espaceMembre__infos">
                            <p className="espaceMembre__infos--nom">Nom : {userInfos.name} </p>
                            <p className="espaceMembre__infos--courriel">Courriel : {userInfos.user_email}</p>
                        </div>
                        <button className="espaceMembre__infos--btn" onClick={modifierInfos}>
                            Modifier
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div>
            <h1 className="espaceMembre">Espace Membre</h1>
            <div className="espaceMembre__filtres">
                <button className="espaceMembre__filtres--btn" onClick={afficherBouteilles}>Bouteilles</button>
                <button className="espaceMembre__filtres--btn" onClick={afficherArchives}>Archives</button>
            </div>

            {/* <div className="espaceMembre__infos">
                <div className="espaceMembre__infos--wrapper">
                    <div className="espaceMembre__infos">
                        <p className="espaceMembre__infos--nom">Nom : {userInfos.name} </p>
                        <p className="espaceMembre__infos--courriel">Courriel : {userInfos.user_email}</p>
                    </div>
                    <button className="espaceMembre__infos--btn" onClick={modifierInfos}>
                        Modifier
                    </button>
                </div>
                <div className="espaceMembre__formulaire">
                    {formulaireInfos}
                </div>
            </div> */}
            {formulaireInfos}
            {contenuBody}
        </div>
    );
}
