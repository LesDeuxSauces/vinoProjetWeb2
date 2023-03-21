import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Cellier.css';
import imageBouteille from '../../img/AlbertBichot-Chablis.png';
import iconeAjouter from '../../img/icone-ajout.svg';
import iconeModifier from '../../img/icone-modifier.svg';
import iconeSupprimer from '../../img/icone-supprimer.svg';
import iconeInfos from '../../img/icone-infos.svg';
import iconeNbrBouteille from '../../img/icone-nbr-bouteille.svg';
import Modal from '../Modal/Modal';



export default function CellierShow() {
  const navigate = useNavigate();
  const [cellier, setCellier] = useState({});
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false
  });
  const [flip, setFlip] = useState({}); // pour la carte tournante
  const { id } = useParams();
  const idCellier = id;
  const idBouteilleRef = useRef();
  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    })
  }
  useEffect(() => {
    const fetchCellier = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/cellier/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setCellier(data);
      console.log(data);
    };

    fetchCellier();
  }, [id]);



  /**
   *  Fonction qui permet d'afficher la carte pour chacune des bouteilles
   * @returns  liste des bouteilles
   */
  function afficherBouteilles() {
    let listeBouteilles = null;
    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      listeBouteilles = cellier.bouteilles.map((bouteille) => {
        // console.log(bouteille);
        return (
          <li className="" key={bouteille.id}>
            <div
              className={`flip-container ${flip[bouteille.id] ? "hover" : ""}`}
              onClick={() => handleFlip(bouteille.id)}
            >
              <div className="bouteille__carte--tourner">
                <div className="bouteille__carte--avant bouteille__carte">
                  <div className="bouteille__icones">

                    <img className='bouteille__modifier' src={iconeModifier} alt="Modifier la bouteille" onClick={(evt) => handleModifier(evt, bouteille.id)} />
                    <img className='bouteille__supprimer' src={iconeSupprimer} alt="Supprimer la bouteille" onClick={(evt) => handleDelete(evt, bouteille.id)} />
                  </div>
                  <img src={imageBouteille} alt="Image de la bouteille" className="bouteille__img" />
                  {/* <img src={bouteille.url_img} alt="Image de la bouteille" className="bouteille__img" /> */}
                  <div>
                    <div className="bouteille__infos">
                      <p className="bouteille__nom">{bouteille.nom}</p>
                      <div className="bouteille__infos--quantite">
                        <button className="bouteille__infos--bouton" value="down" onClick={(evt) => handleQuantite(evt, bouteille.id, bouteille.pivot.quantite, false)}>-</button>
                        {/* <img src={iconeNbrBouteille} alt="Nombre de bouteilles" className="icone-nbr-bouteille" />  */}
                        <p className="bouteille__quantite">({bouteille.pivot.quantite})</p>
                        <button className="bouteille__infos--bouton" value="up" onClick={(evt) => handleQuantite(evt, bouteille.id, bouteille.pivot.quantite, true)}>+</button>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="bouteille__carte--arriere bouteille__carte">
                  <p><strong>・Type:</strong> {getTypeNom(bouteille.type_id)}</p>
                  <p><strong>・Millésime:</strong> {bouteille.annee}</p>
                  <p><strong>・Format:</strong> {bouteille.format} ml</p>
                  <p><strong>・Pays:</strong> {bouteille.pays}</p>
                  <p><strong>・Prix:</strong> {bouteille.prix.toFixed(2)} $</p>
                  <img src={iconeInfos} alt="icone infos" className="icone-infos" />
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
    const token = localStorage.getItem('token');
            return fetch('http://127.0.0.1:8000/api/cellier/' + idCellier, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            })
              .then(response => response.json())
              .then(data => {
                setCellier(data);
              });
  }

  /**
 * Fonction qui permet de retourner la carte
 * @param {*} id 
 */
  function handleFlip(id) { // prend en parametre le id de la bouteille
    setFlip((prevFlip) => ({ // on utilise la fonction setFlip pour modifier le state. (prevFlip est l'état précédent de flip.))
      ...prevFlip, // on copie l'état précédent de flip
      [id]: !prevFlip[id], // mise à jour de la propriété avec la clé "id" en inversant la valeur précédente
    }));
  }


  /**
   *  Fonction qui permet de supprimer une bouteille
   * @param {*} evt  événement
   * @param {*} id  id de la bouteille
   */
  function handleDelete(evt, id) {
    evt.stopPropagation(); // on stoppe la propagation de l'événement
    setDialog({
      message: "Êtes-vous certain de vouloir supprimer cet item ?",
      isLoading: true,
    });
    idBouteilleRef.current = id;
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
          'Content-type': 'application/json'
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('une erreur est survenue');
          } else {
            updateBouteilles();
          }
        })
        .catch((evt) => {
          console.log(evt);
        });
    } else {
      handleDialog("", false);
    }
  }

  function handleQuantite(evt, id, quantite, bool) {
    evt.stopPropagation(); // on stoppe la propagation de l'événement

    let cellier_id = idCellier;
    let bouteille_id = id;
    let nouvelleQuantite;

    if (bool == false){
      nouvelleQuantite = (quantite - 1);
    } else if (bool == true){
      nouvelleQuantite = (quantite + 1);
    }

    const token = localStorage.getItem('token');
    let url = `//127.0.0.1:8000/api/celliers_has_bouteilles?cellier_id=${cellier_id}&bouteille_id=${bouteille_id}&quantite=${nouvelleQuantite}`;

    fetch(url, {
      method: "PUT",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('une erreur est survenue');
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


  return (
    <div className="container">
      <div className="recherche">
        <h1>Mon cellier</h1>
        <div className="recherche__wrapper">
          <input type="text" name="recherche" id="recherche" placeholder="&#x1F50E;&#xFE0E;" />
          <img className="recherche__icone" src="./img/magnifying-glass-11-svgrepo-com.svg" alt="" />
        </div>
      </div>
      <div className="filtre">
        <button className="filtre__btn">Type</button>
        <button className="filtre__btn">Favoris</button>
        <button className="filtre__btn">Nouveautés</button>
        <button className="filtre__btn">Vide</button>
        <button className="filtre__btn">Nombre</button>
      </div>
      <ul className="bouteille">
        {afficherBouteilles()}
      </ul>
      <div className="bouteille__ajouter">
        <Link to={'/bouteille/create/' + idCellier}><img className='bouteille__ajouter--hover' src={iconeAjouter} alt="" /></Link>
      </div>
      <Link to="/Cellier" className="cellier__btn--style ajout__btn--position cellier__btn--retour">Retour à la liste des celliers</Link>
      {dialog.isLoading && <Modal onDialog={confirmation} message={dialog.message} />}
    </div>
  );
}