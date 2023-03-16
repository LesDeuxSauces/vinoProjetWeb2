// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Cellier.css';
// import iconeEdit from '../../img/edit-icone-blanc.svg';
// import iconeAjout from '../../img/icone-ajout.svg';
// import barilsDeVin from '../../img/barils-de-vin.svg';
// import bouteilleIcone from '../../img/bouteille-icone.svg';

// export default function CellierList() {
//   const [celliers, setCelliers] = useState([]); // création d'un state pour les celliers (array vide)
//   const [celliersSansBouteille, setCelliersSansBouteille] = useState([]); // création d'un state pour les celliers sans bouteilles

//   useEffect(() => {
//     fetch('http://127.0.0.1:8000/api/cellier_sans_bouteilles')
//       .then(reponse => reponse.json())
//       .then(data => {
//         setCelliersSansBouteille(data);
//       })
//       .catch(error => console.error(error));


//     fetch('http://127.0.0.1:8000/api/celliers_has_bouteilles/quantite')
//       .then(reponse => reponse.json())
//       .then(data => {
//         setCelliers(data);
//       })
//       .catch(error => console.error(error));
//   }, []);

//   const afficherCellier = () => {
//     const tousLesCelliers = [...celliers, ...celliersSansBouteille]; // en utilisant l'opérateur de décomposition içi je fusionne les deux tableaux (src: https://stackoverflow.com/questions/55607431/how-to-merge-two-array-of-objects-with-reactjs)

//     return tousLesCelliers.map(cellier => (
//       <Link to={"/cellier/" + cellier.id} key={cellier.id}>
//         <li className="cellier__carte">
//           <div className="cellier__carte__content">
//             <img className="cellier__carte--image" src={barilsDeVin} alt="Barils de vin" />
//             <p className="cellier__infos--quantite">
//               <img className='cellier__carte--image' src={bouteilleIcone} alt="Quantité" />
//               {cellier.total == undefined ? "x 0" : `x ${cellier.total}`}
//             </p>
//           </div>
//           <div className="cellier__infos">
//             <p className="cellier__infos--nom">{cellier.nom}</p>
//             <img className="cellier__infos--edit" src={iconeEdit} alt="Editer" />
//           </div>
//         </li>
//       </Link>
//     ));
//   };

    


//   return (
//     <div className="container">
//       <div className="cellier__titre">
//         <h1>Mes celliers</h1>
//       </div>
//       {(celliers.length > 0 || celliersSansBouteille.length > 0) ? (
//         <ul class="cellier">
//           {afficherCellier()}
//         </ul>
//       ) : (
//         <p>Aucun cellier trouvé</p>
//       )}
//       <div className="cellier__ajouter">
//         <Link to="/cellier/create">
//           <img className='cellier__ajouter_style' src={iconeAjout} alt="Ajouter" />
//         </Link>
//       </div>
//     </div>
//   );
// }



//Code authentification a ne pas effacer

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cellier.css";
import iconeEdit from "../../img/edit-icone-blanc.svg";
import iconeAjout from "../../img/icone-ajout.svg";

export default function CellierList(props) {
  const api_url = "http://127.0.0.1:8000/api/";
  const [celliers, setCelliers] = useState([]);

  useEffect(() => {
    fetchCellierUser(setCelliers);
  }, []);

  function showCelliers() {
    console.log(celliers);
    return celliers.map((cellier) => {
      return (
        <Link to={"/cellier/" + cellier.id}>
          <li className="cellier__carte" key={cellier.id}>
            <div className="cellier__infos">
              <p className="cellier__infos--nom">{cellier.nom}</p>
              <img
                className="cellier__infos--edit"
                src={iconeEdit}
                alt="Editer"
              />
            </div>
          </li>
        </Link>
      );
    });
  }

  async function fetchCellierUser() {
    let entete = new Headers();
    const token = localStorage.getItem('token');
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);

    const response = await fetch(api_url + "celliers", {
      method: "GET",
      headers: entete,
    });

    const celliers = await response.json();

    console.log("cellier:", celliers);
    setCelliers(celliers);
  }

  return (
    <div class="container">
      <div class="cellier__titre">
        <h1>Mes celliers</h1>
      </div>
      {celliers.length > 0 ? (
        <ul class="cellier">{showCelliers()}</ul>
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
