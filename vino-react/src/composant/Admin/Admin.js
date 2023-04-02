import React, { useEffect, useState } from "react";
import "./Admin.css"
import { useNavigate, Link, } from "react-router-dom";
import adminIcon from "../Admin/assets/icon-admin.svg"


export default function Admin() {
    let compteurAjoute = 0
    let compteurErreur = 0
    const api_url = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();
    const [message, setMessage] = useState('Mis à jour de la Base de Donnée')
    const [compteur, setCompteur] = useState(0);
    // const [compteurErreur, setCompteurErreur] = useState(0);
    const [chargement, setChargement] = useState(false)
    const [bouteilles, setBouteilles] = useState();
    const [celliers, setCelliers] = useState();
    const [nouveaute, setNouveaute] = useState([]);

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
        console.log(nouveaute, "las nuevas");
    }, [chargement])

    async function misAJourBD() {
        setCompteur(0)
        setNouveaute('');
        setChargement(true)
        const response = await fetch(api_url + "misajoursaq")
        const res = await response.json()
        let value = JSON.parse(res)
        // console.log(res);
        console.log(value);

        // value.forEach(async vin => {
        //     let options = {
        //         method: "POST",
        //         headers: {
        //             "Content-type": "application/json",
        //             accept: "application/json",
        //         },
        //         body: JSON.stringify(vin),
        //     };

        //     // async await 
        //     const misAjour = await fetch("http://127.0.0.1:8000/api/scraping", options)
        //     const responseMisAJour = await misAjour.json();
        //     // console.log(responseMisAJour);
        //     // if (responseMisAJour.line == 760) {
        //     //     console.log("no se pudo agregar ");
        //     //     setMessage("Mise à jour effectuée, aucune bouteille n'a été ajoutée")
        //     //     setChargement(false)
        //     //     setCompteurErreur((prevCompteur) => prevCompteur + 1);
        //     // }
        //     if (responseMisAJour.status == 200) {

        //         console.log("agregada");
        //         setNouveaute(dernierBouteille => [...dernierBouteille, responseMisAJour.bouteilleSAQ])
        //         setMessage('Bouteilles ajoutées')
        //         setCompteurAjoute((compteurAjoute) => compteurAjoute + 1);
        //     } else {
        //         console.log("no se pudo agregar ");
        //         setMessage("Mise à jour effectuée, aucune bouteille n'a été ajoutée")

        //         setCompteurErreur((compteurErreur) => compteurErreur + 1);
        //         console.log(compteurErreur);
        //     }

        // });

        const promises = value.map(vin => {
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    accept: "application/json",
                },
                body: JSON.stringify(vin),
            };

            return fetch("http://127.0.0.1:8000/api/scraping", options)
                .then(misAjour => misAjour.json())
                .then(responseMisAJour => {
                    if (responseMisAJour.status == 200) {
                        console.log("agregada");
                        setNouveaute(dernierBouteille => [...dernierBouteille, responseMisAJour.bouteilleSAQ]);
                        compteurAjoute++

                    } else {
                        console.log("no se pudo agregar ");
                        compteurErreur++
                        // setCompteurErreur(compteurErreur + 1);
                        // setCompteurErreur(compteurErreur => compteurErreur + 1);
                    }
                });
        });

        Promise.all(promises)
            .then(() => {
                console.log("Todas las peticiones han sido completadas");
                console.log(compteurErreur, "errores");
                console.log(compteurAjoute, "ajoute");
                setChargement(false)
                if (compteurAjoute > 0) {
                    setMessage('Bouteilles ajoutées');
                    setCompteur(compteurAjoute)
                } else {
                    setMessage("Mise à jour effectuée, aucune bouteille n'a été ajoutée");
                }
            })
            .catch(error => {
                console.error("Ha ocurrido un error:", error);
            });







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

                <button onClick={misAJourBD} className="btn-misajour request-admin" >
                    <span className="button_top">  Mettre à jour
                    </span>
                </button>
            </div>

            {/* <div className="barre__chargement">
                <p className="texte_chargeur">Mis à jour en cours</p>
                <div className="chargeur_bd"></div>
            </div> */}
            <div className="barre__chargement">
                {chargement && chargement ? (
                    <>
                        <p className="texte_chargeur">Mis à jour en cours</p>
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