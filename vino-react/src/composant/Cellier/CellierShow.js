import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Cellier.css';
import imageBouteille from '../../img/AlbertBichot-Chablis.png';
import iconeAjouter from '../../img/icone-ajout.svg';


export default function CellierShow() {
  const [cellier, setCellier] = useState({});
  const { id } = useParams();
  // const [bouteilles, setBouteilles] = useState([]);
  const idCellier = id;
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cellier/' + id)
      .then(reponse => reponse.json())
      .then(data => {
        setCellier(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, [id]);



  function handleAjouteBouteille(evt) {
    evt.preventDefault();
    // on va avoiir ici le code pour ajouter une bouteille
  }



  function afficherBouteilles() {
    let listeBouteilles = null;

    if (cellier.bouteilles && cellier.bouteilles.length > 0) {
      listeBouteilles = cellier.bouteilles.map((bouteille) => (

        <li class="bouteille__carte" key={bouteille.id}>
          <div class="bouteille__carte--top">
            <div class="bouteille__carte--quantite">
              <img src="" alt="" />
            </div>
            <img src={imageBouteille} alt="Image de la bouteille" class="bouteille__img" />
          </div>
          <div class="bouteille__carte--bottom">
            <p class="bouteille__nom">{bouteille.nom} ({bouteille.pivot.quantite})</p>
            <p class="bouteille__type">{bouteille.type}</p>
            <p class="bouteille__annee">{bouteille.annee}</p>
            <p class="bouteille__format">{bouteille.format} ml</p>
            <p class="bouteille__prix">{bouteille.prix.toFixed(2)} $</p>
          </div>
        </li>

      ));
    } else {
      listeBouteilles = <p>Aucune bouteille disponible</p>;
    }

    return listeBouteilles;
  }


  return (
    <div class="container">
      <div class="recherche">
        <h1>Mon cellier</h1>
        <div class="recherche__wrapper">
          <input type="text" name="recherche" id="recherche" placeholder="&#x1F50E;&#xFE0E;" />
          {/* <img class="recherche__icone" src="./img/magnifying-glass-11-svgrepo-com.svg" alt="" /> */}
        </div>
      </div>
      <div class="filtre">
        <button class="filtre__btn">Type</button>
        <button class="filtre__btn">Favoris</button>
        <button class="filtre__btn">Nouveautés</button>
        <button class="filtre__btn">Vide</button>
        <button class="filtre__btn">Nombre</button>
      </div>
      <ul class="bouteille">
        {afficherBouteilles()}
      </ul>
      <div class="bouteille__ajouter">
        <Link to={'/bouteille/create/' + idCellier}><img className='bouteille__ajouter--hover' src={iconeAjouter} alt="" /></Link>
      </div>


        <Link to="/Cellier" className="cellier__btn--style ajout__btn--position cellier__btn--retour">Retour à la liste des celliers</Link>



    </div>

  );
}

