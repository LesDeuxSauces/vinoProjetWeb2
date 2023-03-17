import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Cellier.css';
import imageBouteille from '../../img/AlbertBichot-Chablis.png';
import iconeAjouter from '../../img/icone-ajout.svg';

export default function CellierShow() {
  const navigate = useNavigate();
  const [cellier, setCellier] = useState({});
  const { id } = useParams();
  const idCellier = id;

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



  function handleAjouteBouteille(evt) {
    evt.preventDefault();
    // on va avoiir ici le code pour ajouter une bouteille
  }


  function handleDelete(e, id) {
    let cellier_id = idCellier;
    let bouteille_id = id;
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
          navigate('/cellier');
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }


  function afficherBouteilles() {
    let listeBouteilles = null;

    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      listeBouteilles = cellier.bouteilles.map((bouteille) => (
        <Link to={`/bouteille/${bouteille.id}`} key={bouteille.id}>
          <li className="bouteille__carte" key={bouteille.id}>
            <div className="bouteille__carte--top">
              <div className="bouteille__carte--quantite">
                <img src="" alt="" />
              </div>
              <img src={imageBouteille} alt="Image de la bouteille" className="bouteille__img" />
            </div>
            <div className="bouteille__carte--bottom">
              <p className="bouteille__nom">{bouteille.nom} ({bouteille.pivot.quantite})</p>
              <p className="bouteille__type">{bouteille.type}</p>
              <p className="bouteille__annee">{bouteille.annee}</p>
              <p className="bouteille__format">{bouteille.format} ml</p>
              <p className="bouteille__prix">{bouteille.prix.toFixed(2)} $</p>
              <p className="bouteille__supprimer" onClick={(e) => handleDelete(e, bouteille.id)}>Supprimer</p>
            </div>
          </li>
        </Link>
      ));
    } else {
      listeBouteilles = <p>Aucune bouteille disponible</p>;
    }

    return listeBouteilles;
  }


  return (
    <div className="container">
      <div className="recherche">
        <h1>Mon cellier</h1>
        <div className="recherche__wrapper">
          <input type="text" name="recherche" id="recherche" placeholder="&#x1F50E;&#xFE0E;" />
          {/* <img className="recherche__icone" src="./img/magnifying-glass-11-svgrepo-com.svg" alt="" /> */}
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



    </div>

  );
}

