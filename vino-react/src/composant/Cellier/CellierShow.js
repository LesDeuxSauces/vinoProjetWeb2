import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./Cellier.css";
import imageBouteille from "../../img/AlbertBichot-Chablis.png";
import iconeAjouter from "../../img/icone-ajout.svg";
import iconeModifier from "../../img/icone-modifier.svg";
import iconeSupprimer from "../../img/icone-supprimer.svg";
import iconeInfos from "../../img/icone-infos.svg";
import iconeNbrBouteille from "../../img/icone-nbr-bouteille.svg";
import Modal from "../Modal/Modal";
import logoSaq from "../../img/logo-saq-no-text.png";
import bouteillePerso from "../../img/bouteille-perso.png";
import ModalInfos from "../ModalInfos/ModalInfos";
import "../ModalInfos/ModalInfos.css";
import iconeFlip from "../../img/icone-flip.svg";
// import iconeBalai from "../../img/icone-balai.svg";
import "@fortawesome/fontawesome-free/css/all.css";

export default function CellierShow() {
  const navigate = useNavigate();
  const [cellier, setCellier] = useState({}); // création d'un state pour les celliers
  const [clickCountPrix, setClickCountPrix] = useState(1); // création d'un state pour le compteur de clic sur le bouton prix
  const [clickCountQuantite, setClickCountQuantite] = useState(1); // création d'un state pour le compteur de clic sur le bouton quantité
  const [clickCountMillesime, setClickCountMillesime] = useState(1); // création d'un state pour le compteur de clic sur le bouton millesime
  const [btnPrixClass, setBtnPrixClass] = useState("filtre__btn"); // création d'un state pour la classe du bouton prix
  const [btnQuantiteClass, setBtnQuantiteClass] = useState("filtre__btn"); // création d'un state pour la classe du bouton quantité
  const [btnMillesimeClass, setBtnMillesimeClass] = useState("filtre__btn"); // création d'un state pour la classe du bouton millesime
  const [arrowPrixDirection, setArrowPrixDirection] = useState("null"); // création d'un state pour la direction de la flèche du bouton prix 
  const [arrowQuantiteDirection, setArrowQuantiteDirection] = useState("null"); // création d'un state pour la direction de la flèche du bouton quantité
  const [arrowMillesimeDirection, setArrowMillesimeDirection] =
    useState("null");
  const [dialog, setDialog] = useState({ // création d'un state pour la boîte de dialogue
    message: "",
    isLoading: false,
    produit: "",
  });
  const [flip, setFlip] = useState({}); // création d'un state pour la rotation des cartes
  const { id } = useParams();
  const idCellier = id;
  const idBouteilleRef = useRef();
  const nomBouteilleRef = useRef();
  const nomCellierRef = useRef();
  const handleDialog = (message, isLoading, produit) => {
    setDialog({
      message,
      isLoading,
      produit,
    });
  };
  const [confirmationMessage, setConfirmationMessage] = useState({
    display: false,
    message: "",
  });
  const [rechercheValeur, setRechercheValeur] = useState(""); // ajout d'un nouvel état pour stocker la recherche de l'utilisateur
  const [flipAll, setFlipAll] = useState(false); //ajout d'un nouvel afin de retourner toutes les cartes du cellier
  const [bouteillesFiltrees, setBouteillesFiltrees] = useState([]); // ajout d'un nouvel état pour stocker les bouteilles filtrées
  // const [iconeBalaiVisible, setIconeBalaiVisible] = useState(false); // ajout d'un nouvel état pour gerer l'affichage de l'icone du balai afin de reinitialiser les tri / recherche

  useEffect(() => {
    fetchCellier();
  }, [id]);

  useEffect(() => {
    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      // vérifie si le cellier contient des bouteilles
      const bouteillesfiltreesUtilisateur = cellier.bouteilles.filter(
        (bouteille) => {
          // filtre les bouteilles selon la recherche de l'utilisateur
          const recherche = rechercheValeur.toLowerCase();
          const annee = bouteille.annee
            ? bouteille.annee.toString().toLowerCase()
            : "";

          return (
            // retourne les bouteilles qui correspondent à la recherche
            rechercheValeur === "" ||
            bouteille.nom.toLowerCase().includes(recherche) ||
            annee.startsWith(recherche)
          );
        }
      );
      setBouteillesFiltrees(bouteillesfiltreesUtilisateur);
    } else {
      setBouteillesFiltrees([]);
    }
  }, [cellier.bouteilles, rechercheValeur]);

  const fetchCellier = async (filtre) => { // fonction pour récupérer les données du cellier
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/cellier/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    nomCellierRef.current = data.cellier.nom;
    switch (filtre) { // fonction pour trier les bouteilles selon le filtre choisi
      case "prix": // si le filtre choisi est le prix
        if (clickCountPrix === 1) {
          data.bouteilles.sort((a, b) => {
            return b.prix - a.prix;
          });
          setCellier(data);
        } else if (clickCountPrix === 2) {
          data.bouteilles.sort((a, b) => {
            return a.prix - b.prix;
          });
          setCellier(data);
        }
        break;

      case "quantite": // si le filtre choisi est la quantité
        if (clickCountQuantite === 1) {
          data.bouteilles.sort((a, b) => {
            return b.pivot.quantite - a.pivot.quantite;
          });
          setCellier(data);
        } else if (clickCountQuantite === 2) {
          data.bouteilles.sort((a, b) => {
            return a.pivot.quantite - b.pivot.quantite;
          });
          setCellier(data);
        }
        break;

      case "millesime": // si le filtre choisi est le millesime
        if (clickCountMillesime === 1) {
          data.bouteilles.sort((a, b) => {
            return b.annee - a.annee;
          });
          setCellier(data);
        } else if (clickCountMillesime === 2) {
          data.bouteilles.sort((a, b) => {
            return a.annee - b.annee;
          });
          setCellier(data);
        }
        break;

      default:
        setCellier(data); // si aucun filtre n'est choisi, on affiche les bouteilles dans l'ordre d'ajout
    }
  };

  /**
   *  Fonction qui permet d'afficher un message de confirmation
   * @param {*} message 
   */
  function showMessage(message) {
    setConfirmationMessage({
      display: true,
      message,
    });

    setTimeout(() => { // fonction qui permet d'afficher le message de confirmation pendant 2 secondes
      setConfirmationMessage({
        display: false,
        message: "",
      });
    }, 2000);
  }

  /**
   *  gestionnaire d'evenement pour pouvoir mettre à jour la valeur de la recherche lorsque l'utilisateur tape dans le champ de recherche
   * @param {*} evt  événement
   */
  function handleRecherche(evt) {
    setRechercheValeur(evt.target.value);
  }

  const rechargerPage = () => {
    // fonction qui permet de recharger la page suite au tri
    window.location.reload();
  };

  /**
   *  Fonction qui permet d'afficher la carte pour chacune des bouteilles
   * @returns  liste des bouteilles
   */
  function afficherBouteilles() {
    let listeBouteilles = null;
    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      const bouteillesFiltrees = cellier.bouteilles.filter((bouteille) => {
        // filtre les bouteilles selon la recherche de l'utilisateur
        const recherche = rechercheValeur.toLowerCase(); // recherche de l'utilisateur, je converti la valeur en string pour pouvoir utiliser la méthode startsWith et includes
        // const quantite = bouteille.pivot.quantite;
        const annee = bouteille.annee
          ? bouteille.annee.toString().toLowerCase()
          : "";
        const typeNom = getTypeNom(bouteille.type_id) ? getTypeNom(bouteille.type_id).toLowerCase() : "";
        // const format = bouteille.format ? bouteille.format.toString().toLowerCase() : "";
        // const pays = bouteille.pays ? bouteille.pays.toLowerCase() : "";
        // const prix = bouteille.prix ? bouteille.prix.toString().toLowerCase() : "";

        return (
          // retourne les bouteilles qui correspondent à la recherche
          (rechercheValeur === "" ||
            bouteille.nom.toLowerCase().includes(recherche) ||
            annee.startsWith(recherche) ||
            typeNom.startsWith(recherche))
          // prix.startsWith(recherche) ||
          // format.startsWith(recherche) ||
          // pays.startsWith(recherche)
        );
      });
      if (bouteillesFiltrees && bouteillesFiltrees.length > 0) { // si il y a des bouteilles qui correspondent à la recherche
        listeBouteilles = ( // affiche les bouteilles
          <>
            {bouteillesFiltrees.map((bouteille) => { // balayage de la liste des bouteilles
              // console.log(bouteille);
              return (
                <li className="" key={bouteille.id}>
                  <div
                    className={`flip-container ${
                      flip[bouteille.id] ? "hover" : ""
                    }`}
                    onClick={() => handleFlip(bouteille.id)}
                  >
                    <div className="bouteille__carte--tourner">
                      <div className="bouteille__carte--avant bouteille__carte">
                        <div className="bouteille__icones">
                          {bouteille.code_saq ? (
                            <a
                              href={bouteille.url_saq}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                className="bouteille__logoSaq"
                                src={logoSaq}
                                alt="Logo SAQ"
                              />
                            </a>
                          ) : (
                            <img
                              className="bouteille__modifier"
                              src={iconeModifier}
                              alt="Modifier la bouteille"
                              onClick={(evt) =>
                                handleModifier(evt, bouteille.id)
                              }
                            />
                          )}
                          <img
                            className="bouteille__supprimer"
                            src={iconeSupprimer}
                            alt="Supprimer la bouteille"
                            onClick={(evt) =>
                              handleDelete(evt, bouteille.id, bouteille.nom)
                            }
                          />
                        </div>

                        <img
                          src={
                            bouteille.code_saq
                              ? bouteille.url_img
                              : bouteillePerso
                          }
                          alt="bouteille cellier"
                          className="bouteille__img"
                        />
                        <div>
                          <div className="bouteille__infos">
                            <p className="bouteille__nom">{bouteille.nom}</p>
                            <div className="bouteille__infos--quantite">
                              <button
                                className="bouteille__infos--bouton"
                                value="down"
                                onClick={(evt) =>
                                  handleQuantite(
                                    evt,
                                    bouteille.id,
                                    bouteille.pivot.quantite,
                                    false
                                  )
                                }
                              >
                                -
                              </button>
                              {/* <img src={iconeNbrBouteille} alt="Nombre de bouteilles" className="icone-nbr-bouteille" />  */}
                              <p className="bouteille__quantite">
                                {bouteille.pivot.quantite}
                              </p>
                              <button
                                className="bouteille__infos--bouton"
                                value="up"
                                onClick={(evt) =>
                                  handleQuantite(
                                    evt,
                                    bouteille.id,
                                    bouteille.pivot.quantite,
                                    true
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bouteille__carte--arriere bouteille__carte">
                        <p>
                          <strong>・Type:</strong>{" "}
                          {getTypeNom(bouteille.type_id)}
                        </p>
                        <p>
                          <strong>・Millésime:</strong> {bouteille.annee}
                        </p>
                        <p>
                          <strong>・Format:</strong> {bouteille.format} ml
                        </p>
                        <p>
                          <strong>・Pays:</strong> {bouteille.pays}
                        </p>
                        <p>
                          <strong>・Prix:</strong>{" "}
                          {bouteille.prix ? bouteille.prix : ""} $
                        </p>
                        <img
                          src={iconeInfos}
                          alt="icone infos"
                          className="icone-infos"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </>
        );
      } else {
        listeBouteilles = <p>Aucune bouteille disponible</p>;
      }
    }
    // console.log(listeBouteilles);
    return listeBouteilles;
  }

  /**
   *  Fonction qui permet de retourner le nom du type de vin
   * @param {*} type_id  id du type de vin
   * @returns  nom du type de vin
   */
  function getTypeNom(type_id) {
    const typeConvertionNbr = parseInt(type_id, 10); // Convertit type_id en nombre afin d,afficher la valeur sur l'hébergeur en ligne
    switch (typeConvertionNbr) {
      case 1:
        return "Rouge";
      case 2:
        return "Blanc";
      case 3:
        return "Rosé";
      default:
        return "Inconnu";
    }
  }

  /**
   *  fonction pour mettre à jour la liste des bouteilles
   * @returns  liste des bouteilles
   */
  async function updateBouteilles() {
    const token = localStorage.getItem("token");
    return fetch("http://127.0.0.1:8000/api/cellier/" + idCellier, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json()) // on convertit la réponse en json
      .then((data) => { // on récupère les données
        setCellier(data); // on met à jour le state cellier
      });
  }

  /**
   * Fonction qui permet de retourner une carte
   * @param {*} id
   */
  function handleFlip(id) {
    // prend en parametre le id de la bouteille
    // on stoppe la propagation de l'événement
    setFlip((prevFlip) => ({
      // on utilise la fonction setFlip pour modifier le state. (prevFlip est l'état précédent de flip.))
      ...prevFlip, // on copie l'état précédent de flip
      [id]: !prevFlip[id], // mise à jour de la propriété avec la clé "id" en inversant la valeur précédente
    }));
  }

  /**
   * Fonction qui permet de retourner toutes les cartes
   */
  function handleFlipAll() {
    // j'utilise ci-dessous la fonction setFlipAll pour modifier l'état. (prevFlipAll est l'état précédent de flipAll.)
    setFlipAll((prevFlipAll) => !prevFlipAll);
    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      const newFlip = {};
      cellier.bouteilles.forEach((bouteille) => {
        newFlip[bouteille.id] = !flipAll;
      });
      setFlip(newFlip);
    }
  }

  /**
   *  Fonction qui permet de supprimer une bouteille
   * @param {*} evt  événement
   * @param {*} id  id de la bouteille
   */
  function handleDelete(evt, id, nom) {
    evt.stopPropagation(); // on stoppe la propagation de l'événement
    setDialog({
      message:
        "Êtes-vous certain de vouloir supprimer toutes les bouteilles de : ",
      isLoading: true,
      produit: nom,
    });
    idBouteilleRef.current = id;
    nomBouteilleRef.current = nom;
  }

  const confirmation = (choix) => {
    if (choix) {
      handleDialog("", false);
      let cellier_id = idCellier;
      let bouteille_id = idBouteilleRef.current;
      let url = `//127.0.0.1:8000/api/celliers_has_bouteilles?cellier_id=${cellier_id}&bouteille_id=${bouteille_id}`;

      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("une erreur est survenue");
          } else {
            updateBouteilles();
            showMessage(
              <span>
                Vous avez retiré de votre cellier:
                <br />
                <span className="modalInfos__nom--message">
                  {nomBouteilleRef.current}
                </span>
              </span>
            );
          }
        })
        .catch((evt) => {
          // console.log(evt);
        });
    } else {
      handleDialog("", false);
    }
  };

  /**
   *  Fonction qui permet de modifier la quantité d'une bouteille
   * @param {} evt  événement
   * @param {*} id  id de la bouteille
   * @param {*} quantite  quantité de la bouteille
   * @param {*} bool  vrai ou faux
   */
  function handleQuantite(evt, id, quantite, bool) {
    evt.stopPropagation(); // on stoppe la propagation de l'événement
  
    let cellier_id = idCellier; // id du cellier
    let bouteille_id = id; // id de la bouteille
    let nouvelleQuantite; // nouvelle quantité de la bouteille
  
    quantite = parseInt(quantite, 10); // conversion la quantité en nombre entier
    if (bool === false) { // si boolen est faux
      nouvelleQuantite = quantite - 1; // on soustrait 1 à la quantité sinon on ajout e  1
    } else if (bool === true) {
      nouvelleQuantite = quantite + 1;
    }
  
    const token = localStorage.getItem("token"); 
    let url = `//127.0.0.1:8000/api/celliers_has_bouteilles?cellier_id=${cellier_id}&bouteille_id=${bouteille_id}&quantite=${nouvelleQuantite}`; 
  
    fetch(url, {
      method: "PUT", // on utilise la méthode PUT pour modifier la quantité
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("une erreur est survenue");
        } else {
          setCellier((prevCellier) => { // on utilise la fonction setCellier pour modifier le state. (prevCellier est l'état précédent de cellier.)
            const updatedBouteilles = prevCellier.bouteilles.map((bouteille) => { // on parcourt le tableau de bouteilles
              if (bouteille.id === bouteille_id) { // si l'id de la bouteille est égal à l'id de la bouteille
                return {
                  ...bouteille, // on copie l'état précédent de la bouteille
                  pivot: { ...bouteille.pivot, quantite: nouvelleQuantite }, // on modifie la quantité de la bouteille
                };
              }
              return bouteille; // on retourne la bouteille
            });
  
            return { ...prevCellier, bouteilles: updatedBouteilles }; // on retourne le state modifié
          });
        }
      })
      .catch((evt) => {
        // console.log(evt);
      });
  }
  

  /**
   *  Fonction qui permet d'éditer une bouteille
   * @param {*} evt  événement
   * @param {*} id  id de la bouteille
   */
  function handleModifier(evt, id) {
    evt.stopPropagation();
    navigate(`/bouteille/${idCellier}/update/${id}`);
  }

  /**
   * fonction pour gérer le clic sur la croix et effacer le champ de recherche
   */
  function handleNettoyerRecherche() {
    setRechercheValeur("");
  }

  /**
   * Fonction qui, suite au clic sur un des filtres, change dynamiquement le filtrage et le visuel (fleches et background).
   */
  function handleFilterPrix() {
    const filtre = "prix"; // on définit le filtre
    fetchCellier(filtre); // on appelle la fonction fetchCellier avec le filtre en paramètre
    setClickCountPrix(clickCountPrix + 1); // on incrémente le compteur de clic

    switch (clickCountPrix) { // on change le visuel en fonction du compteur de clic
      case 1:
        setArrowPrixDirection("down");
        setBtnPrixClass("filtre__btn__negative");
        break;
      case 2:
        setArrowPrixDirection("up");
        setBtnPrixClass("filtre__btn__negative");
        break;
      case 3:
        setBtnPrixClass("filtre__btn");
        setArrowPrixDirection(null);
        setClickCountPrix(1);
        break;
      default:
        break;
    }
  }

  function handleFilterQuantite() {
    const filtre = "quantite";
    fetchCellier(filtre);
    setClickCountQuantite(clickCountQuantite + 1);

    switch (clickCountQuantite) {
      case 1:
        setArrowQuantiteDirection("down");
        setBtnQuantiteClass("filtre__btn__negative");
        break;
      case 2:
        setArrowQuantiteDirection("up");
        setBtnQuantiteClass("filtre__btn__negative");
        break;
      case 3:
        setBtnQuantiteClass("filtre__btn");
        setArrowQuantiteDirection(null);
        setClickCountQuantite(1);
        break;
      default:
        break;
    }
  }

  function handleFilterMillesime() {
    const filtre = "millesime";
    fetchCellier(filtre);
    setClickCountMillesime(clickCountMillesime + 1);

    switch (clickCountMillesime) {
      case 1:
        setArrowMillesimeDirection("down");
        setBtnMillesimeClass("filtre__btn__negative");
        break;
      case 2:
        setArrowMillesimeDirection("up");
        setBtnMillesimeClass("filtre__btn__negative");
        break;
      case 3:
        setArrowMillesimeDirection(null);
        setBtnMillesimeClass("filtre__btn");
        setClickCountMillesime(1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="recherche">
        <h1>{nomCellierRef.current}</h1>
        <div className="recherche__wrapper">
          <input
            type="text"
            name="recherche"
            id="recherche"
            placeholder="&#x1F50E;&#xFE0E;"
            value={rechercheValeur}
            onChange={handleRecherche}
          />
          {rechercheValeur && (
            <button
              className="recherche__nettoyer"
              onClick={handleNettoyerRecherche}
            >
              &#x2715;
            </button>
          )}
          <img
            className="recherche__icone"
            src="./img/magnifying-glass-11-svgrepo-com.svg"
            alt=""
          />
        </div>
      </div>
      <div className="filtre">
        <button
          className={`${btnMillesimeClass}`}
          onClick={handleFilterMillesime}
        >
          Millésime
          <span>
            <i className={`fa-solid fa-caret-${arrowMillesimeDirection}`} />
          </span>
        </button>
        <button
          className={`${btnQuantiteClass}`}
          onClick={handleFilterQuantite}
        >
          Quantité
          <span>
            <i className={`fa-solid fa-caret-${arrowQuantiteDirection}`} />
          </span>
        </button>
        <button className={`${btnPrixClass}`} onClick={handleFilterPrix}>
          Prix
          <span>
            <i className={`fa-solid fa-caret-${arrowPrixDirection}`} />
          </span>
        </button>
      </div>

      <div className="cellier__iconeGrp--position">
        {bouteillesFiltrees && bouteillesFiltrees.length > 0 && (
          <button onClick={handleFlipAll}>
            <img
              className="cellier__cartes--iconeRotation"
              src={iconeFlip}
              alt="tourner toutes les cartes du cellier"
            />
          </button>
        )}

        {/* {(iconeBalaiVisible || rechercheValeur !== "") && (
          <img
            className="bouteille__supprimer cellier__cartes--iconeBalais"
            src={iconeBalai}
            alt="Supprimer la bouteille"
            onClick={() => rechargerPage()}
          />
        )} */}
      </div>

      <ul className="bouteille">{afficherBouteilles()}</ul>

      <div className="bouteille__ajouter">
        <Link to={"/bouteille/create/" + idCellier}>
          <img
            className="bouteille__ajouter--hover"
            src={iconeAjouter}
            alt=""
          />
        </Link>
      </div>
      <Link
        to="/Cellier"
        className="cellier__btn--style ajout__btn--position cellier__btn--retour"
      >
        Retour à la liste des celliers
      </Link>
      {dialog.isLoading && (
        <Modal
          onDialog={confirmation}
          message={dialog.message}
          produit={dialog.produit}
        />
      )}
      {confirmationMessage.display && (
        <ModalInfos message={confirmationMessage.message} />
      )}
    </div>
  );
}
