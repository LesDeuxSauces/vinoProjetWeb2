import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./Bouteille.css";

export default  function BouteilleList() {
    const [bouteilles, setBouteiller] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/bouteille")
            .then((reponse) => reponse.json())
            .then((data) => {
                setBouteiller(data.bouteilles);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="Bouteille">
            <h2> bouteilles </h2>
            <div>
                {bouteilles.length > 0 ? (
                    <div>
                        {bouteilles.map((uneBouteille) => (
                            <div key={uneBouteille.id} className="une_bouteille">
                                <p>{uneBouteille.nom}</p>
                                <p>{uneBouteille.format}</p>
                                <p>{uneBouteille.prix}</p>
                                <p>{uneBouteille.description}</p>
                                <p>{uneBouteille.anne}</p>
                                <p>{uneBouteille.code_saq}</p>
                                <p>{uneBouteille.url_saq}</p>
                                <p>{uneBouteille.url_img}</p>
                                <p>{uneBouteille.pays_id}</p>
                                <p>{uneBouteille.types_id}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aucun bouteille trouvé</p>
                )}
            </div>
            <Link to={'/bouteille/create'}> Ajouter une bouteille </Link>
        </div>
    );
}


