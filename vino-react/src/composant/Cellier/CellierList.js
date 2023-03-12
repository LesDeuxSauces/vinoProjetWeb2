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
          <img className='cellier__ajouter_style' src={iconeAjout} alt="Ajouter" />
        </Link>
      </div>
    </div>
  );
}

// Code authentification a ne pas effacer

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Cellier.css";
// import iconeEdit from "../../img/edit-icone-blanc.svg";
// import iconeAjout from "../../img/icone-ajout.svg";

// function CellierList(props) {
//   const api_url = "http://127.0.0.1:8000/api/";
//   const location = useLocation();
//   const accessToken = location.state.data;
//   const [celliers, setCelliers] = useState([]);

//   useEffect(() => {
//     fetchCellierUser(accessToken, setCelliers);
//   }, []);

//   function showCelliers() {
//     return celliers.map((cellier) => {
//       return (
//         <Link to={"/cellier/" + cellier.id}>
//           <li className="cellier__carte" key={cellier.id}>
//             <div className="cellier__infos">
//               <p className="cellier__infos--nom">{cellier.nom}</p>
//               <img
//                 className="cellier__infos--edit"
//                 src={iconeEdit}
//                 alt="Editer"
//               />
//             </div>
//           </li>
//         </Link>
//       );
//     });
//   }

//   async function fetchCellierUser(accessToken) {
//     let entete = new Headers();
//     entete.append("Content-Type", "application/json");
//     entete.append("Authorization", "Bearer " + accessToken);

//     const response = await fetch(api_url + "celliers", {
//       method: "GET",
//       headers: entete,
//     });

//     const celliers = await response.json();

//     console.log("cellier:", celliers);
//     setCelliers(celliers);
//   }

//   return (
//     <div class="container">
//       <div class="cellier__titre">
//         <h1>Mes celliers</h1>
//       </div>
//       {celliers.length > 0 ? (
//         <ul class="cellier">{showCelliers()}</ul>
//       ) : (
//         <p>Aucun cellier trouvé</p>
//       )}
//       <div class="cellier__ajouter">
//         <Link to="/cellier/create">
//           <img src={iconeAjout} alt="Ajouter" />
//         </Link>
//       </div>
//     </div>
//   );
// }

export default CellierList;
