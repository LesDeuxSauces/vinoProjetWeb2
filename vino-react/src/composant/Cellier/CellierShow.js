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

export default function CellierShow() {
  const navigate = useNavigate();
  const [cellier, setCellier] = useState({});
  const [clickCountType, setClickCountType] = useState(1);
  const [clickCountQuantite, setClickCountQuantite] = useState(1);
  const [clickCountMillesime, setClickCountMillesime] = useState(1);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    produit: "",
  });
  const [flip, setFlip] = useState({}); // pour la carte tournante
  const { id } = useParams();
  const idCellier = id;
  const idBouteilleRef = useRef();
  const nomBouteilleRef = useRef();
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

  useEffect(() => {
    fetchCellier();
  }, [id]);

  const fetchCellier = async (filtre) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8000/api/cellier/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    switch (filtre) {
      case "type":
        if (clickCountType === 1) {
          data.bouteilles.sort((a, b) => {
            return a.type_id - b.type_id;
          });
          setCellier(data);
        } else if (clickCountType === 2) {
          data.bouteilles.sort((a, b) => {
            return b.type_id - a.type_id;
          });
          setCellier(data);
        }
        break;

      case "quantite":
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

      case "millesime":
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
        setCellier(data);
    }
  };

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

  /**
   *  gestionnaire d'evenement pour pouvoir mettre à jour la valeur de la recherche lorsque l'utilisateur tape dans le champ de recherche
   * @param {*} evt  événement
   */
  function handleRecherche(evt) {
    setRechercheValeur(evt.target.value);
  }

  /**
   *  Fonction qui permet d'afficher la carte pour chacune des bouteilles
   * @returns  liste des bouteilles
   */
  function afficherBouteilles() {
    let listeBouteilles = null;
    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      listeBouteilles = cellier.bouteilles
        .filter((bouteille) => {
          // filtre les bouteilles selon la recherche de l'utilisateur
          const recherche = rechercheValeur.toLowerCase(); // recherche de l'utilisateur, je converti la valeur en string pour pouvoir utiliser la méthode startsWith et includes
          const annee = bouteille.annee
            ? bouteille.annee.toString().toLowerCase()
            : "";
          // const typeNom = getTypeNom(bouteille.type_id) ? getTypeNom(bouteille.type_id).toLowerCase() : "";
          // const format = bouteille.format ? bouteille.format.toString().toLowerCase() : "";
          // const pays = bouteille.pays ? bouteille.pays.toLowerCase() : "";
          // const prix = bouteille.prix ? bouteille.prix.toString().toLowerCase() : "";

          return (
            // retourne les bouteilles qui correspondent à la recherche
            rechercheValeur === "" ||
            bouteille.nom.toLowerCase().includes(recherche) ||
            annee.startsWith(recherche)
            // prix.startsWith(recherche) ||
            // typeNom.startsWith(recherche) ||
            // format.startsWith(recherche) ||
            // pays.startsWith(recherche)
          );
        })
        .map((bouteille) => {
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
                          onClick={(evt) => handleModifier(evt, bouteille.id)}
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
                        bouteille.code_saq ? bouteille.url_img : bouteillePerso
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
                      <strong>・Type:</strong> {getTypeNom(bouteille.type_id)}
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
        });
    } else {
      listeBouteilles = <p>Aucune bouteille disponible</p>;
    }
    return listeBouteilles;
  }

  /**
   *  Fonction qui permet de retourner le nom du type de vin
   * @param {*} type_id  id du type de vin
   * @returns  nom du type de vin
   */
  function getTypeNom(type_id) {
    switch (type_id) {
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

  async function updateBouteilles() {
    const token = localStorage.getItem("token");
    return fetch("http://127.0.0.1:8000/api/cellier/" + idCellier, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCellier(data);
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
          console.log(evt);
        });
    } else {
      handleDialog("", false);
    }
  };

  function handleQuantite(evt, id, quantite, bool) {
    evt.stopPropagation(); // on stoppe la propagation de l'événement

    let cellier_id = idCellier;
    let bouteille_id = id;
    let nouvelleQuantite;

    quantite = parseInt(quantite, 10); // conversion la quantité en nombre entier
    if (bool == false) {
      nouvelleQuantite = quantite - 1;
    } else if (bool == true) {
      nouvelleQuantite = quantite + 1;
    }

    const token = localStorage.getItem("token");
    let url = `//127.0.0.1:8000/api/celliers_has_bouteilles?cellier_id=${cellier_id}&bouteille_id=${bouteille_id}&quantite=${nouvelleQuantite}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("une erreur est survenue");
        } else {
          updateBouteilles();
        }
      })
      .catch((evt) => {
        console.log(evt);
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

  function handleFilterType() {
    setClickCountType(clickCountType + 1);
    if (clickCountType >= 3) {
      setClickCountType(1);
      fetchCellier();
    }
    const filtre = "type";
    fetchCellier(filtre);
  }

  function handleFilterQuantite() {
    setClickCountQuantite(clickCountQuantite + 1);
    if (clickCountQuantite >= 3) {
      setClickCountQuantite(1);
      fetchCellier();
    }
    const filtre = "quantite";
    fetchCellier(filtre);
  }

  function handleFilterMillesime() {
    setClickCountMillesime(clickCountMillesime + 1);
    if (clickCountMillesime >= 3) {
      setClickCountMillesime(1);
      fetchCellier();
    }
    const filtre = "millesime";
    fetchCellier(filtre);
  }

  return (
    <div className="container">
      <div className="recherche">
        <h1>Mon cellier</h1>
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
        <button className="filtre__btn" onClick={handleFilterType}>
          Type
        </button>
        <button className="filtre__btn" onClick={handleFilterMillesime}>
          Millésime
        </button>
        <button className="filtre__btn" onClick={handleFilterQuantite}>
          Quantité
        </button>
      </div>

      <button onClick={handleFlipAll}>
        <img
          className="cellier__cartes--iconeRotation"
          src={iconeFlip}
          alt="tourner toutes les cartes du cellier"
        />
      </button>

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
