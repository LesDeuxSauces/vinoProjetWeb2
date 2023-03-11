import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Cellier.css';

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

      return(
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
    <div>
      cellier fonctionne {location.state.data}
      {/* {showCelliers()} */}
    </div>

  );
}

export default CellierList;