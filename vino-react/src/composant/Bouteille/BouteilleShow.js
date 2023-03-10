import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Bouteille.css';

export default function BouteilleShow() {

    const [bouteille, setBouteille] = useState({});
    const { id } = useParams();

    console.log(id);

    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/bouteille/' + id)
            .then(reponse => reponse.json())
            .then((data) => {

                setBouteille(data.data);
                console.log(bouteille);
            })
            .catch(error => console.error(error))
    }, [])




    return (

        <div>
            <h2> bouteille {bouteille.nom} </h2>
            <div>
                <p><strong>Format:</strong>{bouteille.format}</p>
                <p><strong>prix:</strong>{bouteille.prix}</p>
                <p><strong>description:</strong>{bouteille.description}</p>
                <p><strong>annee:</strong>{bouteille.annee}</p>
                <p><strong>code saq: </strong>{bouteille.code_saq}</p>
                <p><strong>url saq:</strong>{bouteille.url_saq}</p>
                <p><strong>url img:</strong>{bouteille.url_img}</p>
                <p><strong>pays id:</strong>{bouteille.pays_id}</p>
                <p><strong>types id:</strong>{bouteille.type_id}</p>
            </div>
        </div>
    )


}