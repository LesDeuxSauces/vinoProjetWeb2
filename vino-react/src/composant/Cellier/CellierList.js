import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Cellier.css';
import iconeEdit from '../../img/edit-icone-blanc.svg';
import iconeAjout from '../../img/icone-ajout.svg';

function CellierList(props) {

    const api_url = "http://127.0.0.1:8000/api/";
    const location = useLocation();
    const accessToken = location.state.data;
    const [celliers, setCelliers] = useState([]);


    useEffect(() => {
        fetchCellierUser(accessToken, setCelliers);
    }, []);

    function showCelliers() {
        return celliers.map((cellier) => {

            return (
                <div>
                    {/* Cellier */}
                </div>);
        });
    }

    async function fetchCellierUser(accessToken) {

        let entete = new Headers();
        entete.append("Content-Type", "application/json");
        entete.append("Authorization", "Bearer " + accessToken);

        const response = await fetch(api_url + "login", {
            method: "GET",
            // body: JSON.stringify(userObject),
            headers: entete,
        });

        const responseCode = await response.json();

        console.log("cellier:", responseCode);


    }

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

            <div>
                cellier fonctionne {location.state.data}
                {/* {showCelliers()} */}

            </div>
        </div>
    );
}

export default CellierList;