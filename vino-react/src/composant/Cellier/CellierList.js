import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cellier.css';

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
    <div>
      <h1>Celliers</h1>
      {celliers.length > 0 ? (
        <ul>
          {celliers.map(cellier => (
            <li key={cellier.id}>
              <Link to={"/cellier/" + cellier.id}>{cellier.nom}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun cellier trouvé</p>
      )}
      {/* <Link to="/cellier/create">Créer un nouveau cellier</Link> */}
    </div>
  );
}

export default CellierList;