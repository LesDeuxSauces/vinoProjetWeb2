import React, { useEffect, useState } from "react";
import "./Admin.css"
import { useNavigate, Link, } from "react-router-dom";
import adminIcon from "../Admin/assets/icon-admin.svg"


export default function Admin() {
    let compteurAjoute = 0
    let compteurErreur = 0
    const api_url = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();
    const [message, setMessage] = useState('Mis à jour de la Base de Données')
    const [compteur, setCompteur] = useState(0);
    const [chargement, setChargement] = useState(false)
    const [bouteilles, setBouteilles] = useState();
    const [celliers, setCelliers] = useState();
    const [nouveaute, setNouveaute] = useState([]);
    const [messageProgresse,setMessageProgresse]= useState(' ')

    useEffect(() => {
        // fetch pour obtenir toutes les bouteilles à la base de donnée 
        fetch(api_url + 'bouteillescompletes')
            .then((response) => response.json())
            .then((data) => {
                setBouteilles(data.bouteilles.length)
            })
        // fetch pour obtenir touts les celliers 
        fetch(api_url + 'cellierscompletes')
            .then((response) => response.json())
            .then((data) => {
                setCelliers(data.length)
            })
    }, [chargement])

     /**
     * Fonction qui permet faire le mis à jour sur la base de données avec toutes les bouteilles
     * * @returns {Promise<void>} Une promesse qui se résout et renvoie toutes les bouteilles de la SAQ.
     */
    async function misaJourSAQComplete() {
        setMessageProgresse('Cette mise à jour peut prendre 15 minutes Veuillez patienter ')
        setCompteur(0)
        setNouveaute('');
        setChargement(true)
        const response = await fetch(api_url + "misajoursaqcomplete")
        const res = await response.json()
        let value = JSON.parse(res)

        const petiteQuantite = 200; // cantidad de elementos por sub-arreglo
        for (let i = 0; i < value.length; i += petiteQuantite) {
            const quantite = value.slice(i, i + petiteQuantite); // obtener un sub-arreglo de tamaño petiteQuantite
            await fetchAndUpdateBouteilles(quantite);
        }
        // fetchAndUpdateBouteilles(value);
    }

    /**
     * Fonction qui permet faire le mis à jour sur la base de données avec les dernières bouteilles
     * * @returns {Promise<void>} Une promesse qui se résout et renvoie les dernières bouteilles de la SAQ.
     */
    async function misaJourSAQDerniere() {
        setMessageProgresse('Mis à jour en cours')
        setCompteur(0)
        setNouveaute('');
        setChargement(true)
        const response = await fetch(api_url + "misajoursaqderniere")
        const res = await response.json()
        let value = JSON.parse(res)
        fetchAndUpdateBouteilles(value);
    }

/**
 * Récupère les informations des bouteilles et met à jour l'état avec les nouvelles données.
 *
 * @param {Array} value Un tableau contenant les objets bouteille à ajouter 
 * @returns {Promise<void>} Une promesse qui se résout une fois que toutes les opérations de récupération et de mise à jour sont terminées.
 */
    async function fetchAndUpdateBouteilles(value) {
        const promises = value.map(async (vin) => {
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(vin),
            };

            try {
                const misAjour = await fetch("http://127.0.0.1:8000/api/scraping", options);
                const responseMisAJour = await misAjour.json();

                if (responseMisAJour.status == 200) {
                    setNouveaute((dernierBouteille) => [...dernierBouteille, responseMisAJour.bouteilleSAQ,]);
                    compteurAjoute++;
                } else {
                    compteurErreur++;
                }
            } catch (error) {
                console.error("Ha ocurrido un error:", error);
            }
        });

        try {
            await Promise.all(promises);
            setChargement(false);

            if (compteurAjoute > 0) {
                setMessage("Bouteilles ajoutées");
                setCompteur(compteurAjoute);
            } else {
                setMessage("Mise à jour effectuée, aucune bouteille n'a été ajoutée");
            }
        } catch (error) {
            console.error("Ha ocurrido un error:", error);
        }
    }




    return (
        <section className="admin-pannel">

            <h2>ADMIN PANNEL</h2>

            <div className="card-admin">
                <div className="infos-admin">
                    <div className="image-admin">
                        <img src={adminIcon} />
                    </div>
                    <div className="info-admin">
                        <div>
                            <p className="name-admin">
                                Base de données
                            </p>
                            <p className="function-admin">
                                Admin
                            </p>
                        </div>
                        <div className="stats-admin">
                            <p className="flex-admin flex-col-admin">
                                Bouteilles
                                <span className="state-value-admin">
                                    {bouteilles}
                                </span>
                            </p>
                            <p className="flex-admin">
                                Celliers
                                <span className="state-value-admin">
                                    {celliers}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <button onClick={misaJourSAQDerniere} className="btn-misajour request-admin" >
                    <span className="button_top">  Ajout "Nouveautés SAQ"
                    </span>
                </button>
                <button onClick={misaJourSAQComplete} className="btn-misajour request-admin" >
                    <span className="button_top">  Mise à jour complète des bouteilles 
                    </span>
                </button>
            </div>

            <div className="barre__chargement">
                {chargement && chargement ? (
                    <>
                        <p className="texte_chargeur">{messageProgresse}</p>
                        <div className="chargeur_bd"></div>
                    </>

                ) : (
                    <p className="message_ajoute"> {message && message} <span> {compteur > 0 && compteur} </span>  </p>
                )}
            </div>
            <section className="wrapper_card_adminV">
                {nouveaute && nouveaute.map((vin) => (
                    <article className="card_adminV">
                        <div className="card_adminV_img">
                            <img src={vin.url_img} />
                        </div>
                        <div className="card_adminV_nom">
                            <span className="card_adminV_span">{vin.nom}</span>
                        </div>
                    </article>
                )
                )}
            </section>
        </section>
    )

}