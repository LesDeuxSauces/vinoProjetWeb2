import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Bouteille.css';

export default function BouteilleShow() {
  const [bouteille, setBouteille] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchBouteille = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/bouteille/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await response.json();
      setBouteille(data.data);
    };

    fetchBouteille();
  }, [id]);

  return (
    <div>
      <h2>bouteille {bouteille.nom}</h2>
      <div>
        <p>
          <strong>Format:</strong>
          {bouteille.format}
        </p>
        <p>
          <strong>prix:</strong>
          {bouteille.prix}
        </p>
        <p>
          <strong>description:</strong>
          {bouteille.description}
        </p>
        <p>
          <strong>annee:</strong>
          {bouteille.annee}
        </p>
        <p>
          <strong>code saq: </strong>
          {bouteille.code_saq}
        </p>
        <p>
          <strong>url saq:</strong>
          {bouteille.url_saq ? (
            <Link className='couleur__lien--noir' to={bouteille.url_saq}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bouteille.url_saq}
            </Link>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>url img:</strong>
          {bouteille.url_img ? (
            <img src={bouteille.url_img} alt={`Image de ${bouteille.nom}`} />
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>pays id:</strong>
          {bouteille.pays_id}
        </p>
        <p>
          <strong>types id:</strong>
          {bouteille.type_id}
        </p>
      </div>
    </div>
  );

}
