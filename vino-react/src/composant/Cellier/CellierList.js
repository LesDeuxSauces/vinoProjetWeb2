import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cellier.css';
import iconeEdit from '../../img/edit-icone-blanc.svg';
import iconeAjout from '../../img/icone-ajout.svg';

function CellierList() {
  const [celliers, setCelliers] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/cellier')
      .then(reponse => reponse.json())
      .then(data => {
        setCelliers(data);
        // console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div class="container">
      <div class="cellier__titre">
        <h1>Mes celliers</h1>
      </div>
      {celliers.length > 0 ? (
        <ul class="cellier">
          {celliers.map(cellier => (
            <Link to={"/cellier/" + cellier.id}>
              <li class="cellier__carte" key={cellier.id}>
                <div class="cellier__infos">
                  <p class="cellier__infos--nom">{cellier.nom}</p>
                  <img class="cellier__infos--edit" src={iconeEdit} alt="Editer" />
                </div>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Aucun cellier trouvé</p>
      )}
      <div class="cellier__ajouter">
        <Link to="/cellier/create">
          <img src={iconeAjout} alt="Ajouter" />
        </Link>
      </div>
    </div>
  );
}

export default CellierList;