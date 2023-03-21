import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Cellier.css";


export default function CellierUpdate() {
  const api_url = "http://127.0.0.1:8000/api/";
  const { idCellier } = useParams(); // idCellier est le paramètre passé dans l'URL

  console.log(idCellier);

  const navigate = useNavigate();
  const [cellierValeur, setCellierValeur] = useState({
    nom: "",
  });

  async function fetchCellier() {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(api_url + `cellier/${idCellier}`, { headers: entete });
    const data = await response.json();
    console.log(data);
    setCellierValeur((precedantState) => ({
      ...precedantState,
      nom: data.cellier.nom || '',
    }));
  }

  useEffect(() => {
    fetchCellier();
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;

    const nouvellesValeurs = {
      ...cellierValeur,
      [name]: value,
    };
    setCellierValeur(nouvellesValeurs);
  }

  async function modifierCellier() {
    putCellier(cellierValeur, idCellier);
  }

  async function putCellier(cellierValeur, idCellier) {
    const entete = new Headers();
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);
    const response = await fetch(`${api_url}cellier/${idCellier}`, {
      method: "PUT",
      body: JSON.stringify(cellierValeur),
      headers: entete,
    });
    navigate("/cellier");
  }
  console.log("cellierValeur:", cellierValeur);

  return (
    <div>
      <div className="cellier__titre">Modifier le cellier</div>
      <form className="cellier__form" onSubmit={handleSubmit}>
        <div className="form__group field input__ajouterCellier">
          <input
            placeholder="Nom"
            className="form__field"
            id="nom"
            name="nom"
            type="text"
            value={cellierValeur.nom}
            onChange={handleChange}
            required
          />
          <label className="form__label">Nom</label>
        </div>
        <div className="cellier__btn--div">
          <button
            className="cellier__btn--style cellier__btn--creer"
            type="submit"
            onClick={modifierCellier}
          >
            Enregistrer
          </button>
          <Link
            to="/Cellier"
            className="cellier__btn--style cellier__btn--retour"
          >
            Retour à la liste des celliers
          </Link>
        </div>
      </form>
    </div>
  );
}
