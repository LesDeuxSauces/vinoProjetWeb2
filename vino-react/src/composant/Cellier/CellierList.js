import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Cellier.css";
import iconeEdit from "../../img/edit-icone-blanc.svg";
import iconeAjout from "../../img/icone-ajout.svg";
import barilsDeVin from '../../img/barils-de-vin.svg';
import bouteilleIcone from '../../img/bouteille-icone.svg';

export default function CellierList(props) {
  const api_url = "http://127.0.0.1:8000/api/"; // url de l'api
  const [celliers, setCelliers] = useState([]); // création d'un state pour les celliers

  useEffect(() => { // fonction qui s'exécute au chargement de la page
    fetchCellierUser(setCelliers); // appel de la fonction qui récupère les celliers de l'utilisateur
  }, []); // le tableau vide indique que la fonction ne doit s'exécuter qu'une seule fois

  /**
   * Récupérer les celliers de l'utilisateur
   */
  async function fetchCellierUser() {
    let entete = new Headers();
    const token = localStorage.getItem("token"); // récupérer le token de l'utilisateur
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token); // ajoute le token dans l'entête de la requête

    const responseCelliers = await fetch(api_url + "celliers", { // requête pour récupérer les celliers
      method: "GET",
      headers: entete,
    });
    const celliersData = await responseCelliers.json();

    // Récupérer les quantités de bouteilles pour chaque cellier
    const responseQuantite = await fetch(api_url + "celliers_has_bouteilles/quantite", { // requête pour récupérer les liste des celliers qui possèdent au moins une bouteille, de la table celliers_has_bouteilles (qui contient les quantités de bouteilles)
      method: "GET",
      headers: entete,
    }
    );
    const quantiteData = await responseQuantite.json();

    console.log('les celliers de celliers_has_bouteilles:', quantiteData);

    // Fusionner les données de tous les celliers avec ceux qui ont des bouteilles
    const celliersAvecQuantite = celliersData.map((cellier) => { // boucle qui parcourt le tableau des celliers
      const quantiteCellier = quantiteData.find(
        (quantite) => quantite.id === cellier.id // boucle qui parcourt le tableau des celliers qui possèdent au moins une bouteille et qui compare l'id du cellier avec l'id du cellier qui possède au moins une bouteille
      );
      return {
        ...cellier, // avec l'operateur de decomposition, je récupère toutes les propriétés du cellier (id, nom, user_id) pour y ajouter la propriété quantite
        total: quantiteCellier ? quantiteCellier.total : 0, // si la quantité existe, je l'ajoute à la propriété quantite, sinon je lui donne la valeur 0
      };
    });

    console.log("cellier:", celliersAvecQuantite);
    setCelliers(celliersAvecQuantite);
  }


  function afficheCelliers() { // fonction qui affiche les celliers
    console.log(celliers);
    return celliers.map((cellier) => { // boucle qui parcourt le tableau des celliers avec la propriété quantité pour l'affichage de la donnée
      return (
        <Link to={"/cellier/" + cellier.id} key={cellier.id}>
          <li className="cellier__carte">
            <div className="cellier__carte__content">
              <img className="cellier__carte--image" src={barilsDeVin} alt="Barils de vin" />
              <p className="cellier__infos--quantite">
                <img className='cellier__carte--image' src={bouteilleIcone} alt="Quantité" />
                {`x ${cellier.total}`}
              </p>
            </div>
            <div className="cellier__infos">
              <p className="cellier__infos--nom">{cellier.nom}</p>
              <img className="cellier__infos--edit" src={iconeEdit} alt="Editer" />
            </div>
          </li>
        </Link>
      );
    });
  }


  return (
    <div class="container">
      <div class="cellier__titre">
        <h1>Mes celliers</h1>
      </div>
      {celliers.length > 0 ? (
        <ul class="cellier">{afficheCelliers()}</ul>
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








// // *****************************************************************
// //Code authentification a ne pas effacer

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./Cellier.css";
// import iconeEdit from "../../img/edit-icone-blanc.svg";
// import iconeAjout from "../../img/icone-ajout.svg";

// export default function CellierList(props) {
//   const api_url = "http://127.0.0.1:8000/api/";
//   const [celliers, setCelliers] = useState([]);

//   useEffect(() => {
//     fetchCellierUser(setCelliers);
//   }, []);

//   function showCelliers() {
//     console.log(celliers);
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

//   async function fetchCellierUser() {
//     let entete = new Headers();
//     const token = localStorage.getItem('token');
//     entete.append("Content-Type", "application/json");
//     entete.append("Authorization", "Bearer " + token);

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
