import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Inscription.css";
import logoVino from "../../img/vinoLogo-rouge.svg";

export default function Inscription(props) {
  const api_url = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    //
  }, []);

  async function registerUser(userObject) {
    let entete = new Headers();
    entete.append("Content-Type", "application/json");

    const response = await fetch(api_url + "register", {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: entete,
    });

    if (response.status === 422 || response.status === 401) {
      const errorData = await response.json();
      const errors = await errorData.errors;
      setErreur(errors);
    } else {
      return navigate("/connexion");
    }
  }

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setErreur("");
    registerUser({ name: name, email: email, password: password });
  };

  return (
    <section>
      <div>
        <div className="inscription__header">
          <Link to="/">
            <img
              className="logo__inscription--hover"
              src={logoVino}
              alt="Vino Logo"
            />
          </Link>
          <div className="inscription__titre">Créer un compte</div>
        </div>

        <form className="inscription__form" onSubmit={submitHandler}>
          <div className="form__group field">
            <input
              placeholder="Email"
              className="form__field"
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={nameChangeHandler}
            />
            <label className="form__label">Nom</label>
            {erreur && (<p className="erreurs">{erreur.name}</p>)}
          </div>
          <div className="form__group field">
            <input
              placeholder="Email"
              className="form__field"
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={emailChangeHandler}
            />
            <label className="form__label">Courriel</label>
            {erreur && (<p className="erreurs">{erreur.email}</p>)}
          </div>
          <div className="form__group field">
            <input
              placeholder="Mot de passe"
              className="form__field"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={passwordChangeHandler}
            />
            <label className="form__label">Mot de passe</label>
            {erreur && (<p className="erreurs">{erreur.password}</p>)}
          </div>
          <div className="inscription__bouton">
            <button className="inscription__bouton--btn" type="submit">
              S'inscrire
            </button>
            <p>
              Déjà inscrit ?{" "}
              <Link to="/connexion" className="">
                Cliquez ici
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
