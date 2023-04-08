import "./Connexion.css";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  Link,
  json,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import logoVino from "../../img/vinoLogo-rouge.svg";

/**
 * Composant de connexion utilisateur
 */

export default function Connexion() {
  const api_url = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    //
  }, []);

  async function loginUser(userObject) {
    let entete = new Headers();
    entete.append("Content-Type", "application/json");
    const response = await fetch(api_url + "login", {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: entete,
    });

    if (response.status === 422 || response.status === 401) {
      const errorData = await response.json();
      const errors = await errorData.errors;
      setErreur(errors);
    } else {
      const responseCode = await response.json();
      const token = responseCode.access_token;
      const user = responseCode.user;
      localStorage.setItem("token", token);
      localStorage.setItem("user", user.name);
      localStorage.setItem("user_id", user.id);
      localStorage.setItem("user_email", userObject.email);

      return navigate("/cellier"), response;
    }
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setErreur("");
    loginUser({ email: email, password: password });
  };

  return (
    <section>
      <div>
        <div className="connexion__header">
          <Link to="/">
            <img
              className="logo__connection--hover"
              src={logoVino}
              alt="Vino Logo"
            />
          </Link>
          <div className="connexion__titre">Connexion</div>
        </div>

        <form className="connexion__form" onSubmit={submitHandler}>
        {erreur && (<p className="erreurs">{erreur.message}</p>)}
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

          <div className="connexion__bouton">
            <button className="connexion__bouton--btn" type="submit">
              Se connecter
            </button>
            <p>
              Vous n'avez pas de compte ?{" "}
              <Link to="/inscription" className="">
                Cliquez ici
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
